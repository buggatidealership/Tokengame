#!/usr/bin/python3
"""Season 2 data for the season-system mockups: /usr/bin/python3 prep.py -> data.js (window.S2DATA).
Reads ez/data/s2-calls/calls.csv (the 15 calls, verbatim reasons, outcomes). The words are the AI's own 'why' field, verbatim;
Gemini's Intuit line is cut where the owner's screenshot hid the end ('[hidden]'), marked with an ellipsis. Key clauses: Intuit's from
the feed teaser's data (dopa/w6/fl/data.json, 'hl'), Keysight's and Elastic's picked here as verbatim substrings (checked below)."""
import csv, json, os
H = os.path.dirname(os.path.abspath(__file__)); EZ = os.path.abspath(os.path.join(H, '../../../..'))
rows = list(csv.DictReader(open(os.path.join(EZ, 'data/s2-calls/calls.csv'))))
fl = json.load(open(os.path.join(EZ, 'tools/concepts/dopa/w6/fl/data.json')))
HL = {('INTU', p['name'].upper()): p['hl'] for p in fl['feed']}
HL.update({('KEYS', 'GPT'): 'Test gear orders ran ahead of shipments.', ('KEYS', 'CLAUDE'): 'took in more orders than it shipped',
  ('KEYS', 'GROK'): 'washout not deep enough to re-anchor ownership', ('KEYS', 'GEMINI'): 'Supply constraints capping FY27 revenue conversion',
  ('KEYS', 'QWEN'): 'the bar is low tonight', ('ESTC', 'GPT'): 'Annual cloud sales grew 27%', ('ESTC', 'CLAUDE'): 'Elastic fell 27% in three weeks',
  ('ESTC', 'GROK'): 'room for better-than-feared AI adoption', ('ESTC', 'GEMINI'): 'four straight beats and real AI search momentum',
  ('ESTC', 'QWEN'): 'Market grades Elastic on subscription acceleration, not beats.'})
calls = []
for r in rows:
    m = r['model'].upper(); w = r['why'].strip()
    if '[hidden]' in w: w = w[:w.index('[hidden]')].rstrip() + '…'
    hl = HL[(r['ticker'], m)]; assert hl in w, (r['ticker'], m, hl)
    calls.append({'n': int(r['season2_trade']), 'round': int(r['round']), 't': r['ticker'], 'co': r['company'], 'm': m, 'side': r['side'],
      'size': float(r['size_pct']), 'conf': int(r['confidence_pct']), 'move': float(r['move_pct']), 'ok': r['right'] == 'yes',
      'pnl': int(float(r['pnl_usd'])), 'words': w, 'hl': hl, 'called': r['called'], 'graded': r['graded_at_close']})
# the board, checked against the brief's figures
P = {}
for c in calls: P[c['m']] = P.get(c['m'], 0) + c['pnl']
assert P == {'GROK': 17660, 'CLAUDE': 3520, 'GEMINI': -7920, 'QWEN': -17660, 'GPT': -22060}, P
open(os.path.join(H, 'data.js'), 'w').write('/* written by prep.py from ez/data/s2-calls/calls.csv; do not edit */\nwindow.S2DATA=' + json.dumps({'calls': calls}, ensure_ascii=False) + ';\n')
print(len(calls), 'calls', P)
