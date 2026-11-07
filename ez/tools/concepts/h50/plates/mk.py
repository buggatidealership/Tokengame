# clean plates: the same 1141x505 nine-slice geometry as the painted ones, with a crisp outer edge and a crisp inner rule (no chips, no rust)
from PIL import Image, ImageDraw, ImageFilter, ImageChops
import sys
SRC='/home/user/Tokengame/ez/media/'
W,H=1141,505;S=4
def make(src,out,line,rim_mul=.88,lw=6,inset=30,r_out=56,r_in=40):
    o=Image.open(SRC+src).convert('RGBA')
    # the paper texture from the clean middle of the painted plate, stretched to the whole plate
    tex=o.crop((260,140,880,365)).resize((W,H),Image.LANCZOS).convert('RGB')
    big=(W*S,H*S)
    m=Image.new('L',big,0);ImageDraw.Draw(m).rounded_rectangle((S*1,S*1,S*(W-1)-1,S*(H-1)-1),radius=S*r_out,fill=255)
    m=m.resize((W,H),Image.LANCZOS)
    # a thin cut edge, a shade darker than the stock
    rim=Image.new('L',big,0);d=ImageDraw.Draw(rim);d.rounded_rectangle((S*1,S*1,S*(W-1)-1,S*(H-1)-1),radius=S*r_out,fill=255);d.rounded_rectangle((S*5,S*5,S*(W-5)-1,S*(H-5)-1),radius=S*(r_out-4),fill=0)
    rim=rim.resize((W,H),Image.LANCZOS)
    dark=Image.eval(tex,lambda v:int(v*rim_mul))
    base=Image.composite(dark,tex,rim)
    # the inner rule
    ln=Image.new('L',big,0);ImageDraw.Draw(ln).rounded_rectangle((S*inset,S*inset,S*(W-inset)-1,S*(H-inset)-1),radius=S*r_in,outline=255,width=S*lw)
    ln=ln.resize((W,H),Image.LANCZOS)
    base=Image.composite(Image.new('RGB',(W,H),line),base,ln)
    base.putalpha(m)
    base.save(SRC+out,'WEBP',quality=88,method=6)
    print(out)
make('h48-plate.webp','h50-plate.webp',(98,66,42),lw=7)
make('h48-plate-gold.webp','h50-plate-gold.webp',(96,50,4),rim_mul=.85,lw=7)
make('h49-slab-label.webp','h50-slab-label.webp',(170,32,28),lw=10)
