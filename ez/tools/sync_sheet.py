#!/usr/bin/env python3
"""Pull the public EZ sheet and update ez-data.js (the SHEET rows only).

    python3 ez/tools/sync_sheet.py            # dry run: download, check, report, change nothing
    python3 ez/tools/sync_sheet.py --write    # same, then rewrite the SHEET block in ez-data.js
    python3 ez/tools/sync_sheet.py --file x.csv [--write]   # use a local CSV instead of the URL

The CSV comes from SHEET_CSV_URL in ez-data.js (a Google Sheet shared "anyone with the link: viewer";
the script turns a normal sheet link into its CSV export link). Columns are matched by header name,
so column order and extra columns (e.g. PROMPT) don't matter; extra columns are never copied.
Exit code 0 = fine, 1 = blocked (nothing written), 2 = written but with warnings worth a look.
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

def csv_url(src, override=None):
    u = override or re.search(r'var SHEET_CSV_URL="([^"]*)"', src).group(1)
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
def clean(v):
    v = (v or "").strip().replace("−", "-").replace("%", "").replace(",", ".").strip()
    return v[1:] if v.startswith("+") else v

def main():
    args = sys.argv[1:]
    write = "--write" in args
    src = read_data()
    header, _ = js_array(src, "SHEET_HEADER")
    old, sheet_m = js_array(src, "SHEET")
    tickers = set(re.findall(r'(\w+):"', re.search(r"var TICKERS=\{(.*?)\};", src).group(1)))
    films = set(re.findall(r"(\d+):\{f:", re.search(r"var FILMS=\{(.*?)\};", src, re.S).group(1)))

    if "--file" in args:
        body = open(args[args.index("--file") + 1], encoding="utf8").read(); where = "local file"
    else:
        u = csv_url(src, args[args.index("--url") + 1] if "--url" in args else None)
        if not u:
            sys.exit("BLOCKED: SHEET_CSV_URL in ez-data.js is empty. Paste the public sheet link there first.")
        body = fetch(u); where = u

    rows = list(csv.reader(io.StringIO(body)))
    want = [h.strip().upper() for h in header]
    hi = next((i for i, r in enumerate(rows) if {"ROUND", "TICKER"} <= {c.strip().upper() for c in r}), None)
    if hi is None:
        sys.exit("BLOCKED: no header row with ROUND and TICKER found.")
    got = [c.strip().upper() for c in rows[hi]]
    OPTIONAL = {"REPORT TIME"}   # metadata columns the sheet may not have yet; never part of the graded record
    missing = [h for h in want if h not in got and h not in OPTIONAL]
    if missing:
        sys.exit("BLOCKED: sheet is missing columns: %s" % ", ".join(missing))
    col = {h: got.index(h) for h in want if h in got}
    for h in want:
        if h not in col:
            print("NOTE: the sheet has no %s column yet (optional)." % h)

    problems, warnings, new = [], [], []
    seen = set()
    for r in rows[hi + 1:]:
        g = lambda h: (r[col[h]] if col[h] < len(r) else "") if h in col else ""
        rn, tk = g("ROUND").strip(), g("TICKER").strip().upper()
        if not rn and not tk:
            continue
        if not re.match(r"^\d+$", rn) or not tk:
            warnings.append("skipped a row that has no round number or ticker: %s" % r[:3]); continue
        if rn in seen:
            problems.append("round %s appears twice" % rn)
        seen.add(rn)
        out = []
        for h in want:
            v = g(h).strip()
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
            out.append(v)
        for m in ("GPT", "KIMI", "CLAUDE", "GROK"):
            if m + " DIR" in col:
                d, mg = out[want.index(m + " DIR")], out[want.index(m + " MAG (%)")]
                if bool(d) != bool(mg):
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
    for r in new:
        o = oldby.get(r[0])
        if not o:
            report.append("NEW ROUND R%s %s" % (r[0], r[1])); continue
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
            report.append("RESULT IN  R%s %s: market %s%%" % (r[0], r[1], r[act]))
        else:
            report.append("UPDATED    R%s %s: %s" % (r[0], r[1], "; ".join("%s %r -> %r" % d for d in diffs)))
    for rn in oldby:
        if rn not in {r[0] for r in new}:
            problems.append("R%s is in the site but missing from the sheet" % rn)
    for r in new:
        if r[act] != "" and r[0] not in films:
            warnings.append("R%s %s is graded but has no film yet (site shows 'Film soon')" % (r[0], r[1]))

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
    print("\nChanges:" if report else ("\nChanges: only the record edit below" if edits else "\nChanges: none (site already matches the sheet)"))
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
        body_js = "[\n" + ",\n".join(" " + json.dumps(r, ensure_ascii=False).replace(", ", ",") for r in new) + "\n]"
        src2 = src[:sheet_m.start(1)] + body_js + src[sheet_m.end(1):]
        open(DATA, "w", encoding="utf8").write(src2)
        print("\nWROTE ez-data.js")
    elif write:
        print("\nNothing to write.")
    sys.exit(2 if warnings else 0)

if __name__ == "__main__":
    main()
