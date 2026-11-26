#!/usr/bin/env python3
"""Season 2 data for the EZ Terminal (owner, 2026-11-23: "It should show season 2 because obviously that's the live one. But...
an obvious filter for you to go back to season 1"). Reads the owner's sheet (every row after Season 1's last round, 112),
writes ez/s2-data.js: S2_HEADER and S2_SHEET in the sheet's own shape, so ez-data.js's build() derives Season 2's rounds,
open trades and upcoming list exactly as it does Season 1's. Nothing is typed by hand but the overrides below.
Usage (from ez/): python3 tools/site/make_s2.py [--check]   (--check: print what would change, write nothing)"""
import csv, io, json, os, sys, urllib.request
EZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SHEET = 'https://docs.google.com/spreadsheets/d/1HE0z8uxuGa0sAbsnm6ZkPjU5bCLwGlq4EUjeCOROlIE/export?format=csv&gid=352731177'
SEASON1_LAST = 112
# Season 2's five, the sheet's own column names (its Gemini size column reads "Gemin MAG (%)")
AIS = [('GPT', 'GPT DIR', 'GPT MAG (%)'), ('CLAUDE', 'CLAUDE DIR', 'CLAUDE MAG (%)'), ('GROK', 'GROK DIR', 'GROK MAG (%)'),
       ('GEMINI', 'GEMINI DIR', ('GEMINI MAG (%)', 'GEMIN MAG (%)')), ('QWEN', 'QWEN DIR', 'QWEN MAG (%)')]
# the moves the posted close video used (owner, 2026-11-23: the numbers on the posted video), where the sheet now differs
MOVE = {'INTU': '-12.79', 'ESTC': '-2.20'}
# names; the sheet writes Zoom as ZOOM (its market ticker is ZM)
NAME = {'INTU': 'Intuit', 'KEYS': 'Keysight', 'ESTC': 'Elastic', 'ZOOM': 'Zoom', 'SMTC': 'Semtech', 'SYM': 'Symbotic', 'MDT': 'Medtronic',
        'ADI': 'Analog Devices', 'DELL': 'Dell', 'WDAY': 'Workday', 'AMBA': 'Ambarella', 'HPQ': 'HP', 'ADSK': 'Autodesk'}
# GICS sectors (the sheet's Season 2 rows carry none, and row 113 carries NVIDIA's)
SECTOR = {'INTU': 'Information Technology', 'KEYS': 'Information Technology', 'ESTC': 'Information Technology', 'ZOOM': 'Information Technology',
          'SMTC': 'Information Technology', 'SYM': 'Industrials', 'MDT': 'Health Care', 'ADI': 'Information Technology', 'DELL': 'Information Technology',
          'WDAY': 'Information Technology', 'AMBA': 'Information Technology', 'HPQ': 'Information Technology', 'ADSK': 'Information Technology'}
# report times, checked 2026-11-23 (Zoom, Semtech, Medtronic, Analog Devices, Ambarella: their own notices; Dell, Workday, HP, Autodesk:
# earnings calendars; Symbotic: an estimate). est = only "after the close" known, so the time is the usual 4:05 pm New York
REPORT = {'ZOOM': ['2026-11-23T21:05:00Z', 1, 'after the close'], 'SMTC': ['2026-11-23T21:05:00Z', 1, 'after the close'],
          'SYM': ['2026-11-23T21:05:00Z', 1, 'after the close'], 'MDT': ['2026-11-24T11:45:00Z', 0, 'before the open'],
          'ADI': ['2026-11-24T12:00:00Z', 0, 'before the open'], 'DELL': ['2026-11-24T21:05:00Z', 1, 'after the close'],
          'WDAY': ['2026-11-24T21:05:00Z', 1, 'after the close'], 'AMBA': ['2026-11-24T21:05:00Z', 1, 'after the close'],
          'HPQ': ['2026-11-24T21:05:00Z', 1, 'after the close'], 'ADSK': ['2026-11-24T21:05:00Z', 1, 'after the close']}
HEAD = ['ROUND', 'TICKER', 'CALL DATE (T-1)'] + [x for a in AIS for x in (a[0] + ' DIR', a[0] + ' MAG (%)')] + ['RESOLUTION DATE/TIME', 'ACTUAL MOVE (%)', 'SECTOR']

def feed():
    """the Feed's posts (owner, 2026-11-26): every logged Season 2 call from data/s2-calls/calls.csv, in the AI's own words; the
    page grades each from the round's move in S2_SHEET, so a post's outcome always matches the board"""
    import csv, re
    P = os.path.join(EZ, 'data', 's2-calls', 'calls.csv')
    if not os.path.exists(P): return []
    out = []
    for r in csv.DictReader(open(P, newline='')):
        t = next((r[k] for k in ('why', 'take', 'thesis', 'lessons_entry', 'other_reasoning') if r.get(k, '').strip()), '')
        t = re.sub(r'\s*\[(cut off|hidden)\]\s*', '\u2026', t).strip()
        if not t: continue
        out.append({'r': int(r['round']), 't': r['ticker'], 'm': r['model'].upper(), 'sd': r['side'], 'sz': r['size_pct'], 'cf': r['confidence_pct'], 'q': t, 'c': r['called']})
    return out

def main():
    text = urllib.request.urlopen(SHEET, timeout=60).read().decode('utf-8')
    rows = list(csv.reader(io.StringIO(text)))
    H = [h.strip().upper() for h in rows[0]]
    def col(k):
        for n in (k if isinstance(k, tuple) else (k,)):
            if n in H: return H.index(n)
        raise SystemExit('PROBLEM: the sheet has no column ' + str(k))
    C = {k: col(k) for k in ['ROUND', 'TICKER', 'CALL DATE (T-1)', 'RESOLUTION DATE/TIME', 'ACTUAL MOVE (%)']}
    for m, d, g in AIS: C[m + 'D'], C[m + 'M'] = col(d), col(g)
    out, notes = [], []
    LOG = {}  # the calls log (data/s2-calls/calls.csv, transcribed from the owner's screenshots) fills a call the sheet does not have yet
    lp = os.path.join(EZ, 'data', 's2-calls', 'calls.csv')
    if os.path.exists(lp):
        for x in csv.DictReader(open(lp)):
            LOG[(int(x['round']), x['ticker'].upper(), x['model'].upper())] = ('UP' if x['side'] == 'LONG' else 'DOWN', ('%g' % float(x['size_pct'])))
    for r in rows[1:]:
        r = r + [''] * (len(H) - len(r)); g = lambda i: r[i].strip()
        try: n = int(g(C['ROUND']))
        except ValueError: continue
        t = g(C['TICKER']).upper()
        if n <= SEASON1_LAST or not t: continue
        if t not in NAME: raise SystemExit(f'PROBLEM: R{n} {t} has no name in make_s2.py NAME (add it, its logo and its report time)')
        mv = g(C['ACTUAL MOVE (%)'])
        if t in MOVE and mv and mv != MOVE[t]: notes.append(f'R{n} {t}: the sheet reads {mv}, the site keeps {MOVE[t]} (the posted video)'); mv = MOVE[t]
        row = [str(n), t, g(C['CALL DATE (T-1)'])]
        for m, _, _ in AIS:
            dr, mg = g(C[m + 'D']).upper(), g(C[m + 'M']).lstrip('+-− ')
            lg = LOG.get((n, t, m))
            if not dr and not mg and lg: dr, mg = lg; notes.append(f'R{n} {t} {m}: the sheet is empty, the site takes the calls log ({dr} {mg})')
            elif lg and dr and (dr, mg) != lg and float(mg or 0) != float(lg[1]): notes.append(f'R{n} {t} {m}: the sheet reads {dr} {mg}, the calls log {lg[0]} {lg[1]} (the sheet wins)')
            if (dr == '') != (mg == ''): raise SystemExit(f'PROBLEM: R{n} {t} {m}: side "{dr}" with size "{mg}"')
            if dr and dr not in ('UP', 'DOWN'): raise SystemExit(f'PROBLEM: R{n} {t} {m}: side "{dr}"')
            row += [dr, mg]
        if mv and not any(row[3 + 2 * i] for i in range(len(AIS))): raise SystemExit(f'PROBLEM: R{n} {t} has a move and no calls')
        out.append(row + [g(C['RESOLUTION DATE/TIME']), mv, SECTOR.get(t, '')])
    js = ('/* Season 2, from the owner\'s sheet (rows after 112), written by tools/site/make_s2.py; never edit by hand */\n'
          'var S2_HEADER=' + json.dumps(HEAD) + ';\nvar S2_SHEET=[\n' + ',\n'.join(' ' + json.dumps(r) for r in out) + '];\n'
          'var S2_NAME=' + json.dumps(NAME) + ';\nvar S2_REPORT=' + json.dumps(REPORT) + ';\n'
          'var S2_FEED=' + json.dumps(feed()) + ';\n')
    path = os.path.join(EZ, 's2-data.js'); old = open(path).read() if os.path.exists(path) else ''
    graded = sum(1 for r in out if r[-2]); calls = sum(1 for r in out if not r[-2] and any(r[3 + 2 * i] for i in range(len(AIS))))
    for x in notes: print('KEEP' if 'keeps' in x else 'LOG', x)
    if js == old: print('Season 2: no changes (%d rounds, %d graded, %d with calls in)' % (len(out), graded, calls)); return
    print('Season 2: CHANGES (%d rounds, %d graded, %d with calls in)' % (len(out), graded, calls))
    if '--check' in sys.argv: return
    open(path, 'w').write(js); print('written', path)

if __name__ == '__main__': main()
