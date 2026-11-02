# /usr/bin/python3 board.py : ez/x2p-h29-top-{390,1280}.png, today (the built v46) beside H29 (this overlay), header to Meet the models' head.
import os,textwrap
from PIL import Image,ImageDraw,ImageFont
D=os.path.dirname(os.path.abspath(__file__));O=os.path.join(D,'out');EZ=os.path.abspath(os.path.join(D,*['..']*8))
F=lambda s,b=True:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf'%('-Bold' if b else ''),s)
def board(w,scale,notes,out):
    a=Image.open(os.path.join(O,f'b-now-{w}.png')).convert('RGB');b=Image.open(os.path.join(O,f'b-h29-{w}.png')).convert('RGB')
    if scale!=1:a=a.resize((int(a.width*scale),int(a.height*scale)),Image.LANCZOS);b=b.resize((int(b.width*scale),int(b.height*scale)),Image.LANCZOS)
    pad,top=24,110;notes=[l for n in notes for l in textwrap.wrap(n,int((a.width+b.width)/10.5))];nh=26*len(notes)+30;W=a.width+b.width+pad*3;Hh=top+max(a.height,b.height)+nh+pad
    c=Image.new('RGB',(W,Hh),'#f4efe2');d=ImageDraw.Draw(c)
    d.text((pad,16),f'EZ H29 · the top of the Overview · {w}px',font=F(26),fill='#1a1a1a');d.text((pad,48),'today (built v46, 2 Nov) vs the H29 overlay (h29/top)',font=F(18,False),fill='#444')
    d.text((pad,top-30),'TODAY',font=F(22),fill='#8a1d14');d.text((pad*2+a.width,top-30),'H29',font=F(22),fill='#0a6b34')
    c.paste(a,(pad,top));c.paste(b,(pad*2+a.width,top))
    y=top+max(a.height,b.height)+20
    for n in notes:d.text((pad,y),n,font=F(18,False),fill='#1a1a1a');y+=26
    c=c.quantize(colors=256,method=Image.Quantize.MEDIANCUT,dither=Image.Dither.FLOYDSTEINBERG) if os.environ.get('Q','1')!='0' else c;c.save(out,optimize=True);print(out,c.size,os.path.getsize(out)//1024,'KB')
board(390,.6,['H29: header one face set (Bangers, Shantell, Anton); pill = the next close from H29_NEXT ("Next close / Apple +3"), bell still, links to Upcoming.',
 'Headline in Bangers; "Watch the 1:20 film" on the hero opens the film big; the film strip section is gone.',
 'One torn dark-paper gutter (56px) under the hero and after How a round works.',
 'How a round works: four rows, every picture square (ledger cropped on its entry, board restacked), caption = same square;',
 'no CALL/CLOSE/LEDGER/BOARD kickers, CLOSEST not WINNER, no cream rules. Top 2313 -> ~1800px tall at 390.'],os.path.join(EZ,'x2p-h29-top-390.png'))
board(1280,.42,['H29 desktop: How a round works as a 2x2 of caption|picture pairs (squares 275px), whole beat on one screen; top 4339 -> ~1800px.',
 'The fixed bottom crawl (its own "NEXT BELL", a mover) is hidden; the pill reads "Next close Tue 4pm · Apple, Palantir +2".'],os.path.join(EZ,'x2p-h29-top-1280.png'))
