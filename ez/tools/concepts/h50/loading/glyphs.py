# glyph outlines for the cover lettering (no web font at first paint): Caprasimo and Lilita One, from the page's own woff2 files
import sys, json
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
out={}
chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,!?'’:-#&·$%"
for key,fn in [('cap','../../../../media/h48-caprasimo.woff2'),('lil','../../../../media/h48-lilita.woff2'),('fre','../../../../media/h48-fredoka.woff2')]:
    f=TTFont(fn); gs=f.getGlyphSet(); cmap=f.getBestCmap(); hh=f['hhea']; os2=f['OS/2']
    g={}
    for ch in chars:
        n=cmap.get(ord(ch))
        if not n: continue
        p=SVGPathPen(gs); gs[n].draw(p)
        g[ch]={'adv':f['hmtx'][n][0],'d':p.getCommands()}
    out[key]={'upm':f['head'].unitsPerEm,'asc':hh.ascent,'desc':hh.descent,'gap':hh.lineGap,'tasc':os2.sTypoAscender,'tdesc':os2.sTypoDescender,'win':[os2.usWinAscent,os2.usWinDescent],'useTypo':bool(os2.fsSelection & 128),'g':g}
    print(key,out[key]['upm'],hh.ascent,hh.descent,hh.lineGap,os2.sTypoAscender,os2.sTypoDescender,os2.usWinAscent,os2.usWinDescent,bool(os2.fsSelection&128),len(g),file=sys.stderr)
json.dump(out,open('glyphs.json','w'))
