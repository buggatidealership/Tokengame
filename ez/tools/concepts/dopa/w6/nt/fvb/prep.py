#!/usr/bin/env python3
"""FEED FILMS DESK B (night of 20 Nov 2026): data for nt-fv6..nt-fv10. Reads ez/data/s2-calls/calls.csv (the 15 Season 2 calls, every
reasoning field verbatim, the graded outcome) and w6/fl/data.json (model marks, Intuit's verbatim excerpts and key clauses, Grok's plain
reading) and writes w6/nt/fvb/data.json. Key clauses (hl) are verbatim substrings of the text shown (keep); the page refuses a clause
that is not in its text. Plain readings (ours) say only what the AI wrote. Run: python3 w6/nt/fvb/prep.py (from dopa/)."""
import csv, json, os
D = os.path.dirname(os.path.abspath(__file__)); DOPA = os.path.normpath(D + '/../../..')
rows = list(csv.DictReader(open(DOPA + '/../../../data/s2-calls/calls.csv')))
fl = json.load(open(DOPA + '/w6/fl/data.json'))
K = {'GPT': 'GPT', 'Claude': 'CLAUDE', 'Grok': 'GROK', 'Gemini': 'GEMINI', 'Qwen': 'QWEN'}
LAB = {'GPT': ('OpenAI', 'US'), 'CLAUDE': ('Anthropic', 'US'), 'GROK': ('xAI', 'US'), 'GEMINI': ('Google', 'US'), 'QWEN': ('Alibaba', 'CN')}
NAME = {'GPT': 'GPT', 'CLAUDE': 'Claude', 'GROK': 'Grok', 'GEMINI': 'Gemini', 'QWEN': 'Qwen'}
LOGO = {'INTU': 'w6/fl/INTU.svg', 'KEYS': 'data/co/KEYS.png', 'ESTC': 'data/co/ESTC.svg', 'NVDA': 'w6/fl/NVDA.png'}
# text shown and its key clause for Keysight and Elastic (verbatim; Claude's "Long, small:" lead-in dropped, as fl did for Intuit)
HL = {('GPT', 'KEYS'): (None, 'orders ran ahead of shipments'),
      ('CLAUDE', 'KEYS'): ('Keysight is 26% off its high with its AI-test peers, keeps beating its own guide, and took in more orders than it shipped.', 'took in more orders than it shipped'),
      ('GROK', 'KEYS'): (None, 'washout not deep enough to re-anchor ownership'),
      ('GEMINI', 'KEYS'): (None, 'Supply constraints capping FY27 revenue conversion'),
      ('QWEN', 'KEYS'): (None, 'the bar is low tonight'),
      ('GPT', 'ESTC'): (None, 'I expect Elastic to raise its subscription forecast'),
      ('CLAUDE', 'ESTC'): ('Elastic fell 27% in three weeks and 7% today on no news, while its contracted backlog growth has risen four quarters running.', 'contracted backlog growth has risen four quarters running'),
      ('GROK', 'ESTC'): (None, 'room for better-than-feared AI adoption'),
      ('GEMINI', 'ESTC'): (None, 'four straight beats'),
      ('QWEN', 'ESTC'): (None, 'Market grades Elastic on subscription acceleration, not beats.')}
PLAIN = {('GROK', 'KEYS'): ['Investors still own the AI testing story.', 'A solid report only confirms it.', 'The drop was not deep enough to bring buyers back by the close.'],
         ('GROK', 'ESTC'): ['Fewer investors own this AI search story, and it rose after its last report.', 'Better than feared AI use could lift it by the close.']}
# Grok's lessons filter, verbatim from its Intuit and Keysight reasoning (other_reasoning); the NVIDIA example is named in the Intuit one
LESSON = {'INTU': 'pure confirmation on residual owned story digests lower even after large washout; NVDA residual AI ownership example',
          'KEYS': 'residual owned AI story digests clear beats lower even after washout'}
posts = []
for r in rows:
    k = K[r['model']]; t = r['ticker']; f = next((x for x in fl['feed'] if x['k'] == k and x['t'] == t), None)
    if f: keep, hl, plain = f['keep'], f['hl'], f['plain']
    else:
        kp, hl = HL[(k, t)]; keep = kp or r['why']; plain = PLAIN.get((k, t), [])
    assert hl in keep, (k, t, hl)
    assert keep.replace('…', '').strip() in r['why'] or keep in r['why'], (k, t)
    p = dict(k=k, name=NAME[k], lab=LAB[k][0], flag=LAB[k][1], t=t, co=r['company'], logo=LOGO[t], side=r['side'], size=r['size_pct'].rstrip('0').rstrip('.') if '.' in r['size_pct'] else r['size_pct'],
             conf=int(r['confidence_pct']), keep=keep, hl=hl, plain=plain, called=r['called'], move=float(r['move_pct']), right=r['right'] == 'yes', pnl=int(r['pnl_usd']),
             sources=r['sources_shown'])
    if k == 'GROK' and t in LESSON:
        assert LESSON[t] in r['other_reasoning'], t; p['lesson'] = LESSON[t]
    if r['lessons_entry']: p['lessons_entry'] = r['lessons_entry']
    for fld in ('take', 'thesis', 'kill'):
        if r[fld] and '[cut off]' not in r[fld]: p[fld] = r[fld]
    posts.append(p)
board = {}
for p in posts: board[p['k']] = board.get(p['k'], 0) + p['pnl']
board = sorted(board.items(), key=lambda x: -x[1])
assert [b for b in board] == [('GROK', 17660), ('CLAUDE', 3520), ('GEMINI', -7920), ('QWEN', -17660), ('GPT', -22060)], board
s1nv = {'n': 112, 't': 'NVDA', 'co': 'NVIDIA', 'logo': LOGO['NVDA'], 'move': -2.89, 'graded': 'Nov 18', 'calls': {'GPT': 6, 'KIMI': 4, 'CLAUDE': 4.5, 'GROK': 3.2}, 'pnl_each': -2890}
cos = {'INTU': {'co': 'Intuit', 'logo': LOGO['INTU'], 'move': -12.79}, 'KEYS': {'co': 'Keysight', 'logo': LOGO['KEYS'], 'move': -7.07}, 'ESTC': {'co': 'Elastic', 'logo': LOGO['ESTC'], 'move': -2.2}, 'NVDA': {'co': 'NVIDIA', 'logo': LOGO['NVDA']}}
json.dump({'posts': posts, 'board': board, 's1nv': s1nv, 'cos': cos, 'marks': fl['marks'], 'lessonPlain': ['Good news on a story investors already own can still trade lower.', 'NVIDIA was the example.']},
          open(D + '/data.json', 'w'), indent=1)
print(len(posts), 'posts', board)
