import sys
from PIL import Image,ImageDraw,ImageFont
FB='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
notes={'rounds':'How a round works: the narrator box goes from title-yellow to the logo\'s cream paper (A, B); red number tabs become ink; frame dividers and the LED glow lose gold; title in Bangers (it rendered in Anton); B: title cream.',
 'models':'Meet the models: title one colour (no cream half, no green drop); "Season 1" and the ledger strip cream, the strip\'s moves green/red by sign; rank extrusions ink (they carried red, orange, green, blue); #1 carried by a drawn crown (A) or gold (B).',
 'proof':'Smart or lucky: the screen in cream (gridlines were green, the luck zone and coin line gold, GPT\'s line mint, Claude\'s coral); models told apart by dash and name; #1 by weight and crown (A) or gold (B); the narrator line in the caption box, "gold zone" now "dashed zone".'}
for k in ['rounds','models','proof']:
    ims=[Image.open(f'out/cu-{k}-{t}.png').convert('RGB') for t in ('now','a','b')];w,h=ims[0].size;h=max(i.size[1] for i in ims)
    B=Image.new('RGB',(3*w+80,h+150),(246,242,232));d=ImageDraw.Draw(B)
    d.text((20,14),f'H31 unify · close-up ({k}) · 390px at 2x',font=ImageFont.truetype(FB,30),fill=(20,18,23))
    import textwrap
    for j,l in enumerate(textwrap.wrap(notes[k],190)[:2]): d.text((20,56+j*24),l,font=ImageFont.truetype(FR,19),fill=(60,55,48))
    for i,(im,lab) in enumerate(zip(ims,['Today','A: gold = titles','B: gold = #1 only'])):
        x=20+i*(w+20);d.text((x,112),lab,font=ImageFont.truetype(FB,24),fill=(20,18,23));B.paste(im,(x,145))
    out=f'/home/user/Tokengame/ez/x2p-h31-unify-closeup-{k}.png';B.save(out,optimize=True);print(out,B.size)
