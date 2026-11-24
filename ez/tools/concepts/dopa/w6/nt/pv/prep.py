#!/usr/bin/env python3
"""python3 w6/nt/pv/prep.py : the data for the five night prediction films (nt-pv1..5.html), from ez/data/s2-calls/calls.csv only.
Per company: name, ticker, logo, its colour, the call day and the grading day. Per call: side, called move, confidence, the WHY verbatim
and one short clause of it for the film (CL below), checked word for word against the WHY with the sentence marks dropped.
No outcome is written: the films are posted before the report."""
import csv, json, re, os, datetime
D = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.abspath(D + '/../../../../../../..')
rows = list(csv.DictReader(open(ROOT + '/ez/data/s2-calls/calls.csv')))
marks = json.load(open(D + '/../../../models5.json'))
CO = {'INTU': {'logo': 'data/co/INTU.svg', 'col': '#236cff', 'when': 'after the close'},
      'KEYS': {'logo': 'data/co/KEYS.png', 'col': '#e90029', 'when': 'after the close'},
      'ESTC': {'logo': 'data/co/ESTC.svg', 'col': '#005571', 'when': 'after the close'},
      # the week of 23 Nov (report times checked 2026-11-23: Zoom, Semtech, Medtronic, ADI, Ambarella their own notices; Dell, Workday, HP,
      # Autodesk earnings calendars; Symbotic an estimate, unconfirmed)
      'ZOOM': {'logo': 'data/co/ZOOM.png', 'col': '#0b5cff', 'when': 'after the close'}, 'SMTC': {'logo': 'data/co/SMTC.png', 'col': '#6bc4ca', 'when': 'after the close'},
      'SYM': {'logo': 'data/co/SYM.png', 'col': '#78be20', 'when': 'after the close'}, 'MDT': {'logo': 'data/co/MDT.png', 'col': '#224a87', 'when': 'before the open'},
      'ADI': {'logo': 'data/co/ADI.png', 'col': '#0067b9', 'when': 'before the open'}, 'DELL': {'logo': 'data/co/DELL.png', 'col': '#007db8', 'when': 'after the close'},
      'WDAY': {'logo': 'data/co/WDAY.png', 'col': '#3069b5', 'when': 'after the close'}, 'AMBA': {'logo': 'data/co/AMBA.png', 'col': '#95c76b', 'when': 'after the close'},
      'HPQ': {'logo': 'data/co/HPQ.png', 'col': '#0096d6', 'when': 'after the close'}, 'ADSK': {'logo': 'data/co/ADSK.png', 'col': '#000000', 'when': 'after the close'}}
LAB = {'GPT': ('OpenAI', 'US'), 'Claude': ('Anthropic', 'US'), 'Grok': ('xAI', 'US'), 'Gemini': ('Google', 'US'), 'Qwen': ('Alibaba', 'CN')}
# the clause each film shows: the AI's own words, short enough to read in about 3 s (1 s + 0.08 s a character)
CL = {'INTU': {'GPT': 'Higher QuickBooks renewal prices', 'Claude': 'growth slows again tonight', 'Grok': 'AI-disruption overhang',
               'Gemini': 'EPS estimates already cut 34%', 'Qwen': 'Relief bounce beats fear'},
      'KEYS': {'GPT': 'orders ran ahead of shipments', 'Claude': 'keeps beating its own guide', 'Grok': 'washout not deep enough',
               'Gemini': "echoing August's post-earnings drop", 'Qwen': 'the bar is low tonight'},
      'ESTC': {'GPT': 'Annual cloud sales grew 27%', 'Claude': 'backlog growth has risen', 'Grok': 'better-than-feared AI adoption',
               'Gemini': 'four straight beats', 'Qwen': 'Datadog just guided consumption flat'},
      'SMTC': {'GPT': 'Orders for 800G chips are rising', 'Claude': 'the stock rose 16% today', 'Grok': 'AI-connectivity cycle after sharp drop',
               'Gemini': 'analyst target cuts and a damaged chart', 'Qwen': 'Chips got their leader back'},
      'DELL': {'GPT': 'Dell has racks running at Nscale', 'Claude': 'chip tape has set every AI close', 'Grok': 'AI-server cycle after washout',
               'Gemini': 'memory cost and PC headwinds', 'Qwen': 'HPE beat and raised guidance and got sold 13% today'}}
strip = lambda s: ' ' + re.sub(r'\s+', ' ', re.sub(r'[.,;:!?"()]', ' ', s)).strip() + ' '
day = lambda d: datetime.date.fromisoformat(d).strftime('%A')
out = {'cos': {}, 'calls': [], 'marks': {k: marks[k] for k in ['GPT', 'CLAUDE', 'GROK', 'GEMINI', 'QWEN']}}
for r in rows:
    t, m = r['ticker'], r['model']
    if t not in CO: continue
    if t not in CL: continue
    c = CL[t][m]
    if strip(c) not in strip(r['why']): raise SystemExit(f'clause not in the WHY: {t} {m}: {c}')
    out['cos'].setdefault(t, {'t': t, 'co': r['company'], **CO[t], 'called': r['called'], 'graded': r['graded_at_close'],
                              'callDay': day(r['called']), 'gradeDay': day(r['graded_at_close']), 'trade': int(r['season2_trade'])})
    out['calls'].append({'t': t, 'k': m.upper(), 'name': m, 'lab': LAB[m][0], 'flag': LAB[m][1], 'side': r['side'],
                         'call': float(r['size_pct']), 'conf': int(r['confidence_pct']), 'why': r['why'], 'clause': c})
json.dump(out, open(D + '/data.json', 'w'), indent=1)
for t in out['cos']: n = [x for x in out['calls'] if x['t'] == t]; print(t, sum(x['side'] == 'LONG' for x in n), 'LONG v', sum(x['side'] == 'SHORT' for x in n), 'SHORT', [(x['name'], len(x['clause'])) for x in n])
