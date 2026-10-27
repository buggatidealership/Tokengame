#!/usr/bin/env python3
"""Pull the public EZ sheet and update ez-data.js (the SHEET rows only).

    python3 ez/tools/sync_sheet.py            # dry run: download, check, report, change nothing
    python3 ez/tools/sync_sheet.py --write    # same, then rewrite the SHEET block in ez-data.js
    python3 ez/tools/sync_sheet.py --file x.csv [--write]   # use a local CSV instead of the URL

The CSV link lives in ez/tools/sheet_url.txt (a Google Sheet shared "anyone with the link: viewer";
the script turns a normal sheet link into its CSV export link). It is kept out of ez-data.js on purpose:
ez-data.js ships with every published page, and the sheet also holds the prompts. Columns are matched by header name,
so column order and extra columns (e.g. PROMPT) don't matter; extra columns are never copied.
Exit code 0 = fine, 1 = blocked (nothing written), 2 = finished with warnings worth a look (written or not).
"""
import csv, io, json, re, sys, urllib.request, os, ssl

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "..", "ez-data.js")

def read_data():
    return open(DATA, encoding="utf8").read()

def js_array(src, name):
    m = re.search(r"var " + name + r"=(\[[^\n]*\]);", src) or re.search(r"var " + name + r"=(\[.*?\n\]);", src, re.S)
    if not m:
        sys.exit("could not find var %s in ez-data.js" % name)
    return json.loads(m.group(1)), m

URL_FILE = os.path.join(HERE, "sheet_url.txt")

def csv_url(src, override=None):
    u = override or (open(URL_FILE, encoding="utf8").read().strip() if os.path.exists(URL_FILE) else "")
    if not u:
        return ""
    m = re.search(r"docs\.google\.com/spreadsheets/d/([A-Za-z0-9_-]{20,})", u)
    if m and "/d/e/" not in u and "export" not in u and "output=csv" not in u:
        gid = re.search(r"[#&?]gid=(\d+)", u)
        u = "https://docs.google.com/spreadsheets/d/%s/export?format=csv&gid=%s" % (m.group(1), gid.group(1) if gid else "0")
    return u

def fetch(u):
    ctx = ssl.create_default_context(cafile=os.environ.get("SSL_CERT_FILE") or ("/root/.ccr/ca-bundle.crt" if os.path.exists("/root/.ccr/ca-bundle.crt") else None))
    req = urllib.request.Request(u, headers={"User-Agent": "ez-sync"})
    with urllib.request.urlopen(req, context=ctx, timeout=30) as r:
        body = r.read().decode("utf8")
    if body.lstrip().startswith("<"):
        sys.exit("BLOCKED: got a web page, not CSV. Is the sheet shared 'Anyone with the link: Viewer'?")
    return body

NUM = re.compile(r"^[+-]?\d+(\.\d+)?$")

# ---- round-keyed maps in ez-data.js (FILMS, STILLS, PREFILMS, RECEIPTS, CARDS): found and split with a scanner that knows
# strings and nesting, so a value with braces or commas inside is never cut. Anything it cannot read safely (a
# comment inside the map, a key that is not a round number) makes it refuse to rewrite that map.
ROUND_MAPS = ("FILMS", "STILLS", "PREFILMS", "RECEIPTS", "CARDS")

def _scan(text, i, close):
    """index of the bracket that closes at depth 0 starting at text[i], or -1"""
    depth, q = 0, None
    while i < len(text):
        c = text[i]
        if q:
            if c == "\\": i += 2; continue
            if c == q: q = None
        elif c in "\"'`": q = c
        elif c in "{[(": depth += 1
        elif c in "}])":
            depth -= 1
            if depth == 0: return i
        i += 1
    return -1

def find_map(src, name):
    m = re.search(r"\b(?:var|let|const)\s+" + name + r"\s*=\s*\{", src)
    if not m: return None
    a = m.end() - 1; b = _scan(src, a, "}")
    return (a + 1, b) if b > 0 else None

def split_map(body):
    """[(key, value_text)] or None when the map holds something the sync should not touch"""
    parts, depth, q, cur, i = [], 0, None, "", 0
    while i < len(body):
        c = body[i]
        if q:
            cur += c
            if c == "\\" and i + 1 < len(body): cur += body[i + 1]; i += 2; continue
            if c == q: q = None
        elif c in "\"'`": q = c; cur += c
        elif body.startswith("/*", i) or body.startswith("//", i): return None
        elif c in "{[(": depth += 1; cur += c
        elif c in "}])": depth -= 1; cur += c
        elif c == "," and depth == 0: parts.append(cur); cur = ""
        else: cur += c
        i += 1
    parts.append(cur)
    out = []
    for p in parts:
        if not p.strip(): continue
        m = re.match(r"^\s*[\"']?(\d+)[\"']?\s*:(.*)$", p, re.S)
        if not m: return None
        out.append((str(int(m.group(1))), m.group(2).strip()))
    return out

def clean(v):
    v = (v or "").strip().replace("−", "-").replace("%", "").replace(",", ".").strip()
    return v[1:] if v.startswith("+") else v

# Rounds struck from the record, by (ticker, call date): skipped whatever the ROUND cell says,
# even while the row is still in the sheet.
VOID = {("STZ", "10/06/26"): "calls were submitted after the earnings report (owner, 2026-10-07)",
        ("SAP", "10/21/26"): "calls came in around 6 pm, after SAP released its results in Europe (owner, 2026-10-22; SAP released at 22:05 CEST, 16:05 New York); removed from the sheet, LMT and SPOT moved down to R41 and R42",
        # owner, 2026-10-13: TSMC's Q3 round is now the sheet's "TSMC" row (call 10/14); the 2330.TW row is gone, so the
        # old voids of the "TSMC" rows (2026-10-09, when TSMC was a stray duplicate of 2330.TW) are dropped. Aeon and Alcoa
        # were removed from the sheet on purpose. None of the three had calls.
        ("2330.TW", "10/14/26"): "replaced by the sheet's TSMC row (owner, 2026-10-13)",
        ("8267.T", "10/12/26"): "removed from the sheet by the owner (2026-10-13)",
        ("AA", "10/15/26"): "removed from the sheet by the owner (2026-10-13)",
        ("9602.T", "10/14/26"): "Toho: no calls made (predictions cost money); removed from the sheet by the owner (2026-10-14)"}

MONTHS = {m: i + 1 for i, m in enumerate(("jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"))}

def day(d):
    """A call date as (year, month, day), however it is typed: 10/06/26, 10/6/26, 10-06-26, 10.06.2026, 2026-10-06,
    Oct 6, 2026 or 6 Oct 2026 (month first, as the sheet uses). "" for an empty cell, None if it cannot be read."""
    d = (d or "").strip()
    if not d:
        return ""
    m = re.match(r"^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$", d)
    if m:
        return (int(m.group(1)) % 100, int(m.group(2)), int(m.group(3)))
    m = re.match(r"^(\d{1,2})[-/.](\d{1,2})[-/.](\d{2}|\d{4})$", d)
    if m:
        return (int(m.group(3)) % 100, int(m.group(1)), int(m.group(2)))
    m = re.match(r"^([A-Za-z]{3})[a-z]*\.?\s+(\d{1,2}),?\s+(\d{2}|\d{4})$", d)
    if m and m.group(1).lower() in MONTHS:
        return (int(m.group(3)) % 100, MONTHS[m.group(1).lower()], int(m.group(2)))
    m = re.match(r"^(\d{1,2})\s+([A-Za-z]{3})[a-z]*\.?,?\s+(\d{2}|\d{4})$", d)
    if m and m.group(2).lower() in MONTHS:
        return (int(m.group(3)) % 100, MONTHS[m.group(2).lower()], int(m.group(1)))
    return None

def _days(t):
    import datetime
    try:
        return datetime.date(2000 + t[0], t[1], t[2]).toordinal()
    except ValueError:
        return None

# Owner-set round numbers, by (ticker, call date), used until the sheet carries them itself. Once the sheet has the
# same number the override is a no-op and can be removed. Printed on every run so it is never silent.
ROUND_OVERRIDES = {}   # e.g. {("LEVI", "10/07/26"): 15}; the 2026-10-09 ones were dropped once "EZ Official 2" carried the numbers
# Graded values the owner chose to keep after the sheet changed them, by (ticker, call date) and column. While the sheet
# differs, the sync prints a KEEP note and writes the kept value instead of raising a RECORD EDIT on every run.
KEEP = {}   # e.g. {("GS", "10/12/26"): {"ACTUAL MOVE (%)": ("-0.27", "why")}}; R22 GS used it until the owner chose the sheet's -0.21 (2026-10-14)
# (2026-10-23: R80 Intel and R45 AmEx were kept here until the owner fixed rows 80 and 45 in the sheet the same day.)

VOID_KEYS = {(t, day(d)): why for (t, d), why in VOID.items()}
VOID_TICKERS = {t for (t, d) in VOID}
OVERRIDE_KEYS = {(t, day(d)): n for (t, d), n in ROUND_OVERRIDES.items()}
KEEP_KEYS = {(t, day(d)): c for (t, d), c in KEEP.items()}


def main():
    args = sys.argv[1:]
    write = "--write" in args
    src = read_data()
    header, _ = js_array(src, "SHEET_HEADER")
    old, sheet_m = js_array(src, "SHEET")
    tickers = set(re.findall(r'"?([\w.]+)"?:"', re.search(r"var TICKERS=\{(.*?)\};", src).group(1)))

    if "--file" in args:
        body = open(args[args.index("--file") + 1], encoding="utf8").read(); where = "local file"
    else:
        u = csv_url(src, args[args.index("--url") + 1] if "--url" in args else None)
        if not u:
            sys.exit("BLOCKED: ez/tools/sheet_url.txt is missing or empty. Paste the public sheet link there first.")
        body = fetch(u); where = u

    rows = list(csv.reader(io.StringIO(body)))
    want = [h.strip().upper() for h in header]
    hi = next((i for i, r in enumerate(rows) if {"ROUND", "TICKER"} <= {c.strip().upper() for c in r}), None)
    if hi is None:
        sys.exit("BLOCKED: no header row with ROUND and TICKER found.")
    got = [c.strip().upper() for c in rows[hi]]
    OPTIONAL = {"REPORT TIME", "SECTOR", "INDUSTRY GROUP", "THEMES", "MAG 7"}   # metadata columns the sheet may not have yet; never part of the graded record
    missing = [h for h in want if h not in got and h not in OPTIONAL]
    if missing:
        sys.exit("BLOCKED: sheet is missing columns: %s" % ", ".join(missing))
    col = {h: got.index(h) for h in want if h in got}
    for h in want:
        if h not in col:
            print("NOTE: the sheet has no %s column yet (optional)." % h)

    problems, warnings, new = [], [], []
    seen = {}
    for r in rows[hi + 1:]:
        g = lambda h: (r[col[h]] if col[h] < len(r) else "") if h in col else ""
        rn, tk = g("ROUND").strip(), g("TICKER").strip()
        # a note after the ticker, e.g. "AA (Alcoa)" or "8267.T (AEON)": keep the ticker, report the note
        mt = re.match(r"^([^\s(]+)\s*\((.*)\)\s*$", tk)
        if mt:
            tk = mt.group(1)
        tk = tk.upper()
        cd = g("CALL DATE (T-1)").strip(); dd = day(cd)
        if (tk, dd) in VOID_KEYS:
            print("VOID: %s (call date %s) is struck from the record: %s. Skipped." % (tk, cd, VOID_KEYS[(tk, dd)])); continue
        if not rn and not tk:
            continue
        if dd is None:
            problems.append("R%s %s call date '%s' is not a date the sync can read (use MM/DD/YY)" % (rn, tk, cd)); continue
        if tk in VOID_TICKERS and dd:
            reads = [dd] + ([(dd[0], dd[2], dd[1])] if dd[2] <= 12 else [])   # also day-first, in case it was typed 06/10/26
            near = [vd for (vt, vd) in VOID_KEYS if vt == tk and isinstance(vd, tuple)
                    for x in reads if _days(x) is not None and abs(_days(x) - _days(vd)) <= 31]
            if near:
                problems.append("R%s %s called %s looks like the struck %s round; check the date, or remove the row" % (rn, tk, cd, tk)); continue
        if mt and mt.group(1).upper() not in tickers:
            warnings.append("R%s ticker cell '%s': used %s; add the name to TICKERS" % (rn, g("TICKER").strip(), tk))
        if not re.match(r"^\d+$", rn) or not tk:
            warnings.append("skipped a row that has no round number or ticker: %s" % r[:3]); continue
        rn = str(int(rn))
        if (tk, dd) in OVERRIDE_KEYS and str(OVERRIDE_KEYS[(tk, dd)]) != rn:
            print("OVERRIDE: %s (call date %s) is R%s in the sheet; the site uses R%s (owner). Drop the override once the sheet says R%s." % (tk, cd, rn, OVERRIDE_KEYS[(tk, dd)], OVERRIDE_KEYS[(tk, dd)]))
            rn = str(OVERRIDE_KEYS[(tk, dd)])
        if rn in seen:
            problems.append("round %s appears twice (%s and %s); give one of them another number" % (rn, seen[rn], tk.upper()))
        seen[rn] = tk.upper()
        out = []
        for h in want:
            v = g(h).strip()
            if v in ("-", "\u2013", "\u2014", "N/A", "n/a", "NA"):
                v = ""   # "-" means the model didn't take part in that round
            if h.endswith(" DIR"):
                v = v.upper()
                if v not in ("", "UP", "DOWN"):
                    problems.append("R%s %s is '%s' (must be UP, DOWN or empty)" % (rn, h, v))
            elif h.endswith("(%)"):
                v = clean(v)
                if v and not NUM.match(v):
                    problems.append("R%s %s is '%s' (not a number)" % (rn, h, g(h)))
            elif h == "REPORT TIME":
                v = {"BMO": "BMO", "BEFORE OPEN": "BMO", "PRE": "BMO", "PRE-MARKET": "BMO", "PREMARKET": "BMO",
                     "AMC": "AMC", "AFTER CLOSE": "AMC", "POST": "AMC", "POST-MARKET": "AMC", "POSTMARKET": "AMC",
                     "DURING": "DURING", "DMH": "DURING", "INTRADAY": "DURING", "MARKET HOURS": "DURING", "": ""}.get(v.upper(), "?" + v)
                if v.startswith("?"):
                    problems.append("R%s REPORT TIME is '%s' (use BMO, AMC or DURING)" % (rn, v[1:]))
            elif h == "TICKER":
                v = tk
            elif h == "ROUND":
                v = rn
            kept = KEEP_KEYS.get((tk, dd), {}).get(h)
            if kept and v != kept[0]:
                print("KEEP: R%s %s %s is %r in the sheet; the site keeps %r (%s)." % (rn, tk, h, v, kept[0], kept[1]))
                v = kept[0]
            out.append(v)
        for m in ("GPT", "KIMI", "CLAUDE", "GROK"):
            if m + " DIR" in col:
                d, mg = out[want.index(m + " DIR")], out[want.index(m + " MAG (%)")]
                # (2026-10-27) the direction carries the sign: a size typed with a minus ("DOWN", "-1.2", R53 and R54 Grok) would read
                # as UP when graded; keep the size alone and say so
                if d and mg.strip()[:1] in ("-", "\u2212"):
                    mg = mg.strip()[1:].strip(); out[want.index(m + " MAG (%)")] = mg
                    warnings.append("R%s %s size has a minus sign in the sheet (%s %s): the site keeps %s; the direction gives the sign" % (rn, m, d, "-" + mg, mg))
                if bool(d) != bool(mg):
                    # a half-typed call in a round not graded yet is a call still being entered (owner, 2026-10-20):
                    # leave it out until both cells are filled, and say so. In a graded round it stays a problem.
                    if not out[want.index("ACTUAL MOVE (%)")]:
                        out[want.index(m + " DIR")] = out[want.index(m + " MAG (%)")] = ""
                        warnings.append("R%s %s has a direction or a size but not both: left out until both are filled" % (rn, m))
                    else:
                        problems.append("R%s %s has a direction or a size but not both" % (rn, m))
        if tk not in tickers:
            warnings.append("R%s ticker %s has no company name in TICKERS (add it once)" % (rn, tk))
        new.append(out)

    # every model that makes a call needs an entry (logo) in MODELS
    known = set(re.findall(r"\b([A-Z]+):\{name:", re.search(r"var MODELS=\{(.*?)\n\};", src, re.S).group(1)))
    for m in ("GPT", "KIMI", "CLAUDE", "GROK"):
        if m + " DIR" in col and any(r[want.index(m + " DIR")] for r in new) and m not in known:
            problems.append("%s makes calls in the sheet but has no entry in MODELS in ez-data.js (add its name and logo first)" % m)
    # what changed
    oldby = {r[0]: r for r in old}
    act = want.index("ACTUAL MOVE (%)")
    report = []
    # Rounds are matched by identity (ticker + call date), not by number, so a renumbered sheet is read as moves:
    # each round keeps its own data and its own film. A number that is reused for a different round is never mixed up
    # with the round that used to hold it. Moving an ungraded round is fine; moving a graded one changes its public
    # link, so it is a record edit. If the identity changed but the number stayed (e.g. a ticker typo fixed), the row
    # is compared with the old row under that number, as an edit.
    ident = lambda row: (row[1], day(row[2]))
    # the same round (ticker + call date) twice is a copy-paste slip, never a move: block it (--allow-edits cannot)
    for rows_, place in ((new, "the sheet"), (old, "the site")):
        byid = {}
        for row in rows_:
            byid.setdefault(ident(row), []).append(row[0])
        for (t, d), ns in byid.items():
            if len(ns) > 1:
                problems.append("SAME ROUND TWICE in %s: R%s are all %s called %s; delete the extra row" % (place, " and R".join(ns), t, "%d/%d/%02d" % (d[1], d[2], d[0]) if isinstance(d, tuple) else d))
    oldbyid = {ident(o): o for o in old}
    newids = {ident(r) for r in new}
    renum, consumed, leftover = {}, set(), []
    for r in new:
        o = oldbyid.get(ident(r))
        if o and o[0] != r[0]:
            renum[o[0]] = r[0]; consumed.add(o[0])
            rest = [(want[i], o[i] if i < len(o) else "", r[i]) for i in range(1, len(want)) if want[i] not in OPTIONAL and (o[i] if i < len(o) else "") != r[i]]
            if o[act] != "":
                problems.append("RECORD EDIT: R%s %s was already graded and moved to R%s%s  (round links change; confirm on purpose, then rerun with --allow-edits)"
                                % (o[0], r[1], r[0], (": " + "; ".join("%s %r -> %r" % d for d in rest)) if rest else ""))
            else:
                report.append("MOVED      R%s -> R%s %s%s" % (o[0], r[0], r[1], ("; result in: market %s%%" % r[act]) if r[act] != "" and o[act] == "" else "")
                              + ("".join("; %s %r -> %r" % d for d in rest if d[0] != "ACTUAL MOVE (%)")))
            continue
        if not o:
            oo = oldby.get(r[0])
            if oo and ident(oo) not in newids and oo[0] not in consumed:
                o = oo                       # same number, new identity: an edit of that round
            else:
                leftover.append(r); continue
        consumed.add(o[0])
        diffs = [(want[i], o[i] if i < len(o) else "", r[i]) for i in range(len(want)) if (o[i] if i < len(o) else "") != r[i]]
        meta = [d for d in diffs if d[0] in OPTIONAL]
        diffs = [d for d in diffs if d[0] not in OPTIONAL]
        if meta and not diffs:
            report.append("DETAILS    R%s %s: %s" % (r[0], r[1], "; ".join("%s %r -> %r" % d for d in meta))); continue
        if not diffs:
            continue
        if o[act] != "":
            problems.append("RECORD EDIT: R%s was already graded and changed: %s  (the site promises 'never edited'; confirm on purpose, then rerun with --allow-edits)"
                            % (r[0], "; ".join("%s %r -> %r" % d for d in diffs)))
        elif r[act] != "":
            other = [d for d in diffs if d[0] != "ACTUAL MOVE (%)"]
            report.append("RESULT IN  R%s %s: market %s%%%s" % (r[0], r[1], r[act], "".join("; %s %r -> %r" % d for d in other)))
        else:
            report.append("UPDATED    R%s %s: %s" % (r[0], r[1], "; ".join("%s %r -> %r" % d for d in diffs)))
    # a round that moved AND had its call date (or ticker) fixed in the same edit: pair what is left by ticker, but only
    # when the ticker leaves exactly one candidate on each side; everything else is a new round or a missing one
    olds_left = [o for o in old if o[0] not in consumed and ident(o) not in VOID_KEYS]
    for r in leftover:
        cands = [o for o in olds_left if o[1] == r[1]]
        if len(cands) == 1 and sum(1 for x in leftover if x[1] == r[1]) == 1:
            o = cands[0]; olds_left.remove(o); consumed.add(o[0])
            if o[0] != r[0]:
                renum[o[0]] = r[0]
            ch = [(want[i], o[i] if i < len(o) else "", r[i]) for i in range(1, len(want)) if want[i] not in OPTIONAL and (o[i] if i < len(o) else "") != r[i]]
            what = ("R%s -> R%s %s" % (o[0], r[0], r[1])) if o[0] != r[0] else ("R%s %s" % (r[0], r[1]))
            if o[act] != "":
                problems.append("RECORD EDIT: %s was already graded and changed: %s  (confirm on purpose, then rerun with --allow-edits)" % (what, "; ".join("%s %r -> %r" % d for d in ch)))
            else:
                report.append("MOVED+EDIT %s: %s" % (what, "; ".join("%s %r -> %r" % d for d in ch)))
        else:
            report.append("NEW ROUND R%s %s" % (r[0], r[1]))
    for o in old:
        if o[0] not in consumed:
            if ident(o) in VOID_KEYS:
                report.append("VOIDED     R%s %s: removed from the site" % (o[0], o[1]))
            else:
                problems.append("R%s %s is in the site but missing from the sheet" % (o[0], o[1]))
    # every round-keyed map follows its round when it moves; an entry whose round is gone is dropped (and reported)
    remaps, gone, spans = {}, [], []
    targets = set(renum.values())
    for name in ROUND_MAPS:
        span = find_map(src, name)
        if not span:
            if renum and re.search(r"\b" + name + r"\s*=", src):
                problems.append("%s in ez-data.js has a format the sync cannot re-number safely; move its entries by hand" % name)
            continue
        body_ = src[span[0]:span[1]]
        odd = re.search(r"\n\s*(?:var|let|const|function)\s", body_) or any(not (b2 <= span[0] or a2 >= span[1]) for a2, b2 in spans)
        spans.append(span)
        items = None if odd else split_map(body_)
        if items is None:
            if renum: problems.append("%s in ez-data.js has a format the sync cannot re-number safely; move its entries by hand" % name)
            continue
        for k, _ in items:
            if k not in oldby and k in targets and k not in renum:
                problems.append("%s has an entry on R%s, which no round holds; a moved round would inherit it. Remove or move it by hand" % (name, k))
        out = {}
        for k, v in items:
            if k in renum: nk = renum[k]
            elif k in oldby and k not in consumed: gone.append((name, k)); continue
            else: nk = k
            if nk in out:
                problems.append("%s: two entries would land on R%s (old R%s collides); check the round numbers and %s" % (name, nk, k, name))
            out[nk] = v
        if [k for k, _ in items] != list(out) or any(renum.get(k) for k, _ in items):
            remaps[name] = (span, out, "\n" in src[span[0]:span[1]])
        for k, _ in items:
            if k in renum: report.append("%-10s R%s -> R%s" % (name, k, renum[k]))
    will_write = write and not [p for p in problems if not ("--allow-edits" in args and p.startswith("RECORD EDIT"))]
    for name, k in gone:
        warnings.append("%s entry for old R%s has no round any more; it %s dropped" % (name, k, "is" if will_write else "would be"))
    def keys(name):
        if name in remaps: return set(remaps[name][1])
        fs = find_map(src, name)
        return set(k for k, _ in (split_map(src[fs[0]:fs[1]]) or [])) if fs else set()
    # a round has its film (FILMS) or, for the smaller names, a picture (STILLS; owner, 2026-10-23)
    films = keys("FILMS") | keys("STILLS")
    for r in new:
        if r[act] != "" and r[0] not in films:
            warnings.append("R%s %s is graded but has no film or picture yet (the card opens on its stats)" % (r[0], r[1]))

    # standings after the update (same rules as the site)
    tally = {}
    for r in new:
        if r[act] == "":
            continue
        a = float(r[act]); calls = []
        for m in ("GPT", "KIMI", "CLAUDE", "GROK"):
            if m + " DIR" not in col: continue
            d, mg = r[want.index(m + " DIR")], r[want.index(m + " MAG (%)")]
            if d and mg:
                v = (-1 if d == "DOWN" else 1) * float(mg); ok = (v > 0) == (a > 0)
                calls.append((m, ok, abs(v - a)))
        right = [c for c in calls if c[1]]
        best = min([c[2] for c in right]) if right else None
        for m, ok, off in calls:
            t = tally.setdefault(m, [0, 0, 0, 0.0]); t[1] += 1; t[3] += off
            if ok: t[2] += 1
            if ok and abs(off - best) < 1e-9: t[0] += 1

    print("Source:", where)
    print("Rows in sheet:", len(new), "| graded:", sum(1 for r in new if r[act] != ""))
    edits = any(p.startswith("RECORD EDIT") for p in problems)
    blocked = [p for p in problems if not ("--allow-edits" in args and p.startswith("RECORD EDIT"))]
    print("\nChanges:" if report else ("\nChanges: only the record edit below" if edits else ("\nChanges: blocked, see PROBLEM below" if blocked else "\nChanges: none (site already matches the sheet)")))
    for x in report: print("  " + x)
    if tally:
        print("\nStandings after this update (rounds won | right direction | avg miss):")
        for m, t in sorted(tally.items(), key=lambda kv: (-kv[1][0], kv[1][3] / kv[1][1])):
            print("  %-7s %d won | %d/%d | %.2f pts" % (m, t[0], t[2], t[1], t[3] / t[1]))
    for x in warnings: print("WARNING:", x)
    blocking = [p for p in problems if not ("--allow-edits" in args and p.startswith("RECORD EDIT"))]
    for x in problems: print("PROBLEM:", x)
    if blocking:
        print("\nNothing written. Fix the problems above (or confirm record edits with --allow-edits).")
        sys.exit(1)
    if write and report or write and "--allow-edits" in args:
        src2 = src
        for name, (span, out, nl) in sorted(remaps.items(), key=lambda kv: -kv[1][0][0]):
            keys = sorted(out, key=int)
            body = ("\n" + ",\n".join(" %s:%s" % (k, out[k]) for k in keys) + "\n") if nl else ",".join("%s:%s" % (k, out[k]) for k in keys)
            src2 = src2[:span[0]] + body + src2[span[1]:]
        m2 = re.search(r"var SHEET=(\[[^\n]*\]);", src2) or re.search(r"var SHEET=(\[.*?\n\]);", src2, re.S)
        rows_sorted = sorted(new, key=lambda r: int(r[0]))
        body_js = "[\n" + ",\n".join(" " + json.dumps(r, ensure_ascii=False, separators=(",", ":")) for r in rows_sorted) + "\n]"
        src2 = src2[:m2.start(1)] + body_js + src2[m2.end(1):]
        # never write a file the pages cannot load: check it with node when node is there
        import shutil, subprocess, tempfile
        if shutil.which("node"):
            with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf8") as tf:
                tf.write(src2); tmp = tf.name
            ok = subprocess.run(["node", "--check", tmp], capture_output=True, text=True)
            os.unlink(tmp)
            if ok.returncode != 0:
                print("\nPROBLEM: the new ez-data.js would not load (%s). Nothing written." % ok.stderr.strip().splitlines()[-1:])
                sys.exit(1)
        open(DATA, "w", encoding="utf8").write(src2)
        print("\nWROTE ez-data.js")
    elif write:
        print("\nNothing to write.")
    sys.exit(2 if warnings else 0)

if __name__ == "__main__":
    main()
