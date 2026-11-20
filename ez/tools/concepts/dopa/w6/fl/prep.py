#!/usr/bin/env python3
"""python3 w6/fl/prep.py (from dopa/): writes w6/fl/data.json for fl-feed.html, the feed teaser.
Every side, size, confidence and quoted word comes from ez/data/s2-calls/calls.csv (checked verbatim against feed/words.json's keep and hl);
Season 1's three last rounds from ez-data.js's SHEET rows; the marks from w6/an/data.json (read only). Refuses to write on any mismatch."""
import csv, json, re, os, sys
H = os.path.dirname(os.path.abspath(__file__)); EZ = os.path.abspath(os.path.join(H, '../../../../..'))
rows = list(csv.DictReader(open(os.path.join(EZ, 'data/s2-calls/calls.csv'))))
W = json.load(open(os.path.join(EZ, 'tools/concepts/feed/words.json')))
AN = json.load(open(os.path.join(H, '../an/data.json')))
LAB = {'GPT': ('OpenAI', 'US'), 'Claude': ('Anthropic', 'US'), 'Grok': ('xAI', 'US'), 'Gemini': ('Google', 'US'), 'Qwen': ('Alibaba', 'CN')}
# Our short reading of Grok's Intuit reason for the video (owner, 2026-11-20: about 15 words is fine; faithful, labelled as ours).
# Grok: "Heavy washout and AI-disruption overhang leave residual owned slower-growth story as confirmation; beat unlikely to re-anchor
# ownership before next close." -> heavy washout + AI-disruption overhang = already sold hard on AI fears; beat unlikely to re-anchor
# ownership = even a beat may not bring buyers back. Nothing added that Grok did not say. The full reading stays in words.json.
SHORT = {('INTU', 'Grok'): ['Already sold hard on AI fears.', 'Even a beat may not bring buyers back.']}
bad = []
def trade(t, m):
    r = [x for x in rows if x['ticker'] == t and x['model'] == m]; assert len(r) == 1, (t, m); r = r[0]; w = W[t][m]
    keep = w['keep']; core = keep.replace(' …', '')
    if core not in r['why']: bad.append('not verbatim %s %s' % (t, m))
    if w['hl'] not in keep: bad.append('hl not in keep %s %s' % (t, m))
    sh = SHORT.get((t, m))
    if sh and len(' '.join(sh).split()) > 15: bad.append('short reading over 15 words')
    return {'k': m.upper(), 'name': m, 'lab': LAB[m][0], 'flag': LAB[m][1], 't': t, 'co': r['company'], 'side': r['side'], 'size': '%g' % float(r['size_pct']),
            'conf': int(r['confidence_pct']), 'keep': keep, 'hl': w['hl'], 'plain': sh or [], 'called': r['called']}
FEED = [trade('INTU', m) for m in ['Qwen', 'Claude', 'Grok', 'Gemini', 'GPT']]
# Season 1: SHEET rows 110 to 112 (ez-data.js), in the sheet's AI order GPT, Kimi, Claude, Grok; UP = LONG, DOWN = SHORT
src = open(os.path.join(EZ, 'ez-data.js')).read(); S1 = []
NAME = {'DIS': 'Disney', 'HD': 'Home Depot', 'NVDA': 'NVIDIA'}
for n in ['112', '111', '110']:
    m = re.search(r'\["%s","([^"]+)","([^"]+)","(UP|DOWN)","[^"]*","(UP|DOWN)","[^"]*","(UP|DOWN)","[^"]*","(UP|DOWN)"' % n, src); assert m, n
    t = m.group(1); S1.append({'n': int(n), 't': t, 'co': NAME[t], 'logo': 'w6/fl/%s.png' % t,
        'sides': dict(zip(['GPT', 'KIMI', 'CLAUDE', 'GROK'], ['LONG' if d == 'UP' else 'SHORT' for d in m.groups()[2:]]))})
if bad: sys.exit('DATA CHECK FAILED\n' + '\n'.join(bad))
MK = AN['marks']; M4 = json.load(open(os.path.join(H, '../../models.json'))); MK['KIMI'].update(dot=M4['KIMI']['dot'], dotc=M4['KIMI']['dotc'])
json.dump({'feed': FEED, 's1': S1, 'marks': MK, 'cos': {'INTU': {'co': 'Intuit', 'logo': 'w6/fl/INTU.svg'}}}, open(os.path.join(H, 'data.json'), 'w'), ensure_ascii=False, indent=1)
print('ok', [(x['k'], x['side'], x['size'], x['conf']) for x in FEED], [(x['t'], x['sides']) for x in S1])
