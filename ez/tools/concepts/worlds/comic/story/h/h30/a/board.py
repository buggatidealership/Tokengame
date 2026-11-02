# python3 board.py <shotdir> <width> <out.png> : each frame cropped from the full page, side by side, 664 line marked
import json,subprocess,sys,os
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
m=json.load(open(f'{D}/m-{W}.json'));sc=2
names={'f1':'First frame','f2':'How a round works','f3':"Who's winning",'f4':'Every round so far','f5':'Smart or lucky?','f6':'Main event: Bet #1','f7':'Follow for the next round'}
tiles=[]
for i,s in enumerate(m['secs']):
  top=0 if i==0 else s['top'];bot=s['bot'];h=round(bot-top)
  t=f'{D}/_t{i}.png'
  subprocess.run(['convert',f'{D}/full-{W}.png','-crop',f'{W*sc}x{round(h*sc)}+0+{round(top*sc)}','+repage','-resize','50%',
    '-background','#1a1d26','-gravity','north','-extent',f'{W}x720',
    '-fill','none','-stroke','#ff3a31','-strokewidth','2','-draw',f'line 0,664 {W},664',
    '-stroke','none','-fill','#ff3a31','-pointsize','11','-draw',f"text 4,678 '664 px'",
    '-gravity','north','-background','#04070e','-fill','#f8f0d9','-pointsize','14','-splice','0x44',
    '-annotate','+0+6',f"{names.get(s['id'],s['id'])}",'-pointsize','12','-fill','#b5ad9c','-annotate','+0+25',f"{h} px tall · {s['words']} words",t],check=True)
  tiles.append(t)
subprocess.run(['convert',*tiles,'-background','#04070e','-splice','14x0','+append','-gravity','east','-splice','14x0','-gravity','north','-splice','0x14','-gravity','south','-splice','0x14',OUT],check=True)
for t in tiles:os.remove(t)
print(OUT)
