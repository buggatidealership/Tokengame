#!/usr/bin/env python3
"""X5+ (the comic in the header's dark colours): regenerate the GEN block of world-comicdark.css from world-comic.css.

Every colour the comic sets is mapped by what it does: a page or panel surface goes dark, ink lines and type go cream,
the logo's gold, green and red stay as they are, and type on a gold, green, red or logo-white ground stays dark ink.
Each rule is written again under html.cd-on (one class and one element more than the comic's own, in the same order, so
the comic's own cascade is kept). Rerun after any change to world-comic.css:  python3 tools/v22/gen-comicdark.py
"""
import re, sys, os

SRC = os.path.join(os.path.dirname(__file__), 'world-comic.css')
DST = os.path.join(os.path.dirname(__file__), 'world-comicdark.css')

INK = ('#15121a', 'var(--wc-ink)', '#111')
PAGE, PANEL, RAISED, BOX = '#04070e', '#0c0f17', '#161a25', '#12161f'
CREAM, LINE, MUTED, MUTED2, SHADOW, DARK = '#f8f0d9', '#e9e0c8', '#b5ad9c', '#d8cfb9', '#272d3b', '#04070e'
GREYTXT = ('#4a4350', '#3d3742', '#5a5360', '#6d6672', '#5d5763', '#4f4955')
LIGHT_ACCENT = ('#fdbc2a', 'var(--wc-gold)', 'var(--wc-g)', 'var(--wc-r)', '#03c870', '#ff3a31', '#3ee08f', '#ff6158',
                '#e5463e', '#ff7a70', '#fff', '#f8f0d9')
# grounds that stay light: the AI faces (cream, like the logo's letters) and the company logos (white, as their files expect)
FACE = re.compile(r'\.wc-face(?![-\w])')
LOGO = re.compile(r'wc-lgimg|wc-lr-lg\b|wc-ut-lg\b|wc-lv header img|wc-noart img')
BG_MAP = {
    '#fffaf0': PANEL, 'var(--wc-pan)': PANEL, '#f3ead3': PAGE, 'var(--wc-paper)': PAGE,
    '#fff3cc': '#2c230a', '#fff3c4': '#2c230a', '#ffe27a': '#fdbc2a', 'var(--wc-cap)': '#fdbc2a',
    '#ffe9a8': '#4a3a0c', '#7fe6ad': '#0f5a37', '#ff9c95': '#6b1f1a', '#ece5d6': '#191c24', '#e7e1d4': '#151820',
    '#d9f7e6': '#0b2a1c', '#ffe1de': '#2e100e', '#211d27': '#121625', '#3a3440': '#262c3f', '#111': '#000',
}
TEXT_MAP = {'#fff': CREAM, '#e9dfc6': MUTED2, '#ece4cf': MUTED2, '#0a6b38': '#3ee08f', 'var(--wc-gt)': '#3ee08f',
            '#b3201a': '#ff6158', 'var(--wc-rt)': '#ff6158', '#b07c00': '#fdbc2a'}
COLOR_RE = re.compile(r'#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|var\(--wc-[a-z]+\)')

def ink_rgba(c, f):
    m = re.match(r'rgba\(\s*21\s*,\s*18\s*,\s*26\s*,\s*([\d.]+)\s*\)', c)
    return m and 'rgba(233,224,200,%s)' % (round(min(1, float(m.group(1)) * f), 3))

MODE = 'night'
BALLOON = re.compile(r'wc-bub\b|wc-lvs p|wc-tn-s\b|wc-lvu p|wc-lvd p')
NOIR_BG = {'#7fe6ad': '#03c870', '#ff9c95': '#ff3a31', '#d9f7e6': CREAM, '#ffe1de': CREAM, '#1e2a22': PAGE}

def m_bg(c, sel):
    if MODE == 'noir': return n_bg(c, sel)
    lc = c.lower()
    if FACE.search(sel) and lc == '#fff': return CREAM
    if LOGO.search(sel): return c
    if lc == '#fff': return BOX
    if lc == '#111': return '#000'
    if lc in INK: return PAGE if 'header.top' in sel else RAISED
    r = ink_rgba(lc, .9)
    if r: return r
    return BG_MAP.get(lc, c)

def n_bg(c, sel):
    lc = c.lower()
    if FACE.search(sel) and lc == '#fff': return PAGE
    if LOGO.search(sel): return c
    if BALLOON.search(sel) and lc in ('#fff', '#d9f7e6', '#ffe1de', '#e7e1d4'): return CREAM
    if lc.startswith('rgba(21,18,26') or lc.startswith('rgba(255,255,255') or lc.startswith('rgba(253,188,42') or lc.startswith('rgba(3,200,112'):
        return 'transparent'
    if lc in NOIR_BG: return NOIR_BG[lc]
    if lc in ('#fdbc2a', 'var(--wc-gold)', 'var(--wc-g)', 'var(--wc-r)', '#03c870', '#ff3a31', '#3ee08f', '#ff6158', '#e5463e',
              '#c0261e', '#0a7a3e', '#0a7a40', '#000'):
        return c
    return PAGE

def m_text(c, light):
    lc = c.lower()
    if MODE == 'noir' and not light:
        if lc in GREYTXT or lc in ('#e9dfc6', '#ece4cf'): return 'rgba(248,240,217,.72)'
    if light:
        return DARK if lc in INK or lc in ('#0a6b38', 'var(--wc-gt)', '#b3201a', 'var(--wc-rt)') else c
    if lc in INK or lc == '#000': return CREAM
    if lc in GREYTXT: return MUTED
    return TEXT_MAP.get(lc, c)

def m_line(c, sel):
    lc = c.lower()
    if lc in INK:
        if re.search(r'wc-(pf|rc)-o\b', sel): return PANEL
        return LINE
    if lc == '#fff': return CREAM
    return ink_rgba(lc, 1.15) or c

def m_shadow(c, sel):
    lc = c.lower()
    if MODE == 'noir': return 'transparent'
    if lc in INK: return PAGE if 'header.top' in sel else SHADOW
    if lc == '#fff': return CREAM
    return c

def m_tshadow(c):
    return '#000' if c.lower() in INK else c

def m_dark(c):
    return DARK if c.lower() in INK else c

def sub(val, fn):
    return COLOR_RE.sub(lambda m: fn(m.group(0)), val)

def split_top(s, ch):
    out, depth, cur, q = [], 0, '', None
    for x in s:
        if q:
            cur += x
            if x == q: q = None
            continue
        if x in '"\'': q = x
        elif x in '([': depth += 1
        elif x in ')]': depth -= 1
        if x == ch and depth == 0: out.append(cur); cur = ''
        else: cur += x
    if cur.strip(): out.append(cur)
    return out

def parse(css):
    """[(kind, prelude, body)] where kind is 'rule' or 'at' (body parsed recursively)"""
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    i, n, items = 0, len(css), []
    while i < n:
        j = css.find('{', i)
        if j < 0: break
        pre = css[i:j].strip()
        depth, k = 1, j + 1
        while depth and k < n:
            if css[k] == '{': depth += 1
            elif css[k] == '}': depth -= 1
            k += 1
        body = css[j + 1:k - 1]
        if pre.startswith('@'):
            items.append(('at', pre, None if pre.startswith('@keyframes') else parse(body)))
        else:
            items.append(('rule', pre, body))
        i = k
    return items

def prefix(sel):
    s = sel.strip()
    k = '.cd-on' if MODE == 'night' else '.cd-on.cd-noir'
    if s.startswith('html'):
        return 'html' + k + s[4:]
    if s.startswith(':root'):
        return ':root' + k + s[5:]
    return 'html' + k + ' ' + s

def decls(body):
    out = []
    for d in split_top(body, ';'):
        if ':' not in d: continue
        p, v = d.split(':', 1)
        out.append((p.strip().lower(), v.strip()))
    return out

LIGHT = {}
NIGHT_DARK = set()

def bgcol(ds, sel):
    for p, v in ds:
        if p in ('background', 'background-color'):
            cs = COLOR_RE.findall(v.replace('!important', ''))
            if cs:
                # the base colour of a shorthand is its last colour after the images
                c = cs[-1] if p == 'background' else cs[0]
                return m_bg(c, sel)
    return None

def is_light(c):
    return c is not None and c.lower() in LIGHT_ACCENT

def pass1(items):
    for kind, pre, body in items:
        if kind == 'at':
            if body: pass1(body)
            continue
        ds = decls(body)
        for sel in split_top(pre, ','):
            b = bgcol(ds, sel)
            if b is not None: LIGHT[sel.strip()] = is_light(b)

def under_light(sel):
    parts = sel.strip().split()
    for k in range(len(parts) - 1, 0, -1):
        if LIGHT.get(' '.join(parts[:k])): return True
    return False

def gen_rule(pre, body):
    ds = decls(body)
    sels = [s for s in split_top(pre, ',')]
    out = []
    for sel in sels:
        b = bgcol(ds, sel)
        light = is_light(b) if b is not None else under_light(sel)
        new = []
        has_color = False
        for p, v in ds:
            if p.startswith('--'): continue
            if p in ('background', 'background-color', 'background-image'):
                nv = sub(v, lambda c: m_bg(c, sel))
            elif p in ('color', '-webkit-text-fill-color'):
                has_color = True
                nv = sub(v, lambda c: m_text(c, light))
            elif p.startswith('border') or p.startswith('outline') or p in ('stroke', 'column-rule'):
                nv = sub(v, lambda c: m_line(c, sel))
            elif p == 'box-shadow':
                if MODE == 'noir':
                    nv = 'none' + (' !important' if 'important' in v else '')
                else:
                    nv = sub(v, lambda c: m_shadow(c, sel))
            elif p == 'text-shadow':
                nv = sub(v, m_tshadow)
            elif p in ('-webkit-text-stroke', 'filter'):
                nv = sub(v, m_dark)
            else:
                continue
            # every colour is written again, changed or not, so a more specific comic rule keeps beating a less specific one
            if nv != v or COLOR_RE.search(v): new.append('%s:%s' % (p, nv))
        if b is not None and is_light(b) and not has_color and not FACE.search(sel) and not LOGO.search(sel):
            new.append('color:%s' % DARK)
            if MODE == 'night': NIGHT_DARK.add(sel.strip())
        elif MODE == 'noir' and b is not None and sel.strip() in NIGHT_DARK and not has_color:
            # Night gave this ground dark ink (gold there); Noir's ground is black, so the ink goes back to cream
            new.append('color:%s' % CREAM)
        if new: out.append((prefix(sel), ';'.join(new)))
    # one rule per distinct body keeps the selector groups together
    grouped = []
    for s, b in out:
        if grouped and grouped[-1][1] == b: grouped[-1][0].append(s)
        else: grouped.append(([s], b))
    return ''.join('%s{%s}\n' % (','.join(s), b) for s, b in grouped)

def gen(items):
    o = ''
    for kind, pre, body in items:
        if kind == 'at':
            if body is None: continue
            inner = gen(body)
            if inner: o += '%s{\n%s}\n' % (pre, inner)
        else:
            o += gen_rule(pre, body)
    return o

def block(cur, tag, body):
    a, b = cur.index('/*%s{' % tag), cur.index('/*}%s*/' % tag) + len('/*}%s*/' % tag)
    return cur[:a] + '/*%s{ generated by gen-comicdark.py from world-comic.css: do not edit by hand */\n' % tag + body + '/*}%s*/' % tag + cur[b:]

def main():
    global MODE
    items = parse(open(SRC).read())
    cur = open(DST).read()
    for MODE, tag in (('night', 'GEN'), ('noir', 'NGEN')):
        LIGHT.clear(); pass1(items)
        cur = block(cur, tag, gen(items))
    open(DST, 'w').write(cur)
    print('ok', DST, len(cur))

if __name__ == '__main__':
    main()
