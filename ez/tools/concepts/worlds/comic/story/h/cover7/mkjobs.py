# python3 mkjobs.py <treatments s,p,o> <objects letter,bell,...> [ref] > jobs.json
import json,sys
BOX='../box/img/'
NOTXT=" Every card, sign, board, slate, plate, slip, poster and panel is completely blank and empty: no text, no letters, no numbers, no digits, no logos, no symbols anywhere. No people, no faces, no hands, no figures."
ST={
 's':"1960s Silver Age American comic book panel art: a clean confident brush-and-nib black ink line with tapered strokes, flat bold printed colours, Ben-Day dots only in a few small shadows, the colour plates a hair out of register, bright and flashy like a printed comic page. Palette: warm gold #fdbc2a, emerald green #03c870, signal red #ff3a31, sky blue, black ink. Never dark, never noir, never beige, never realistic, no 3D rendering, no gradients.",
 'p':"Pop art comic panel in the style of 1960s pop art paintings: very thick black outlines, flat primary colours (lemon yellow, fire-engine red, cyan blue, emerald green), large Ben-Day dots used only for shading on the objects, crisp hard edges, extremely bright and loud. Never dark, never noir, never beige, never realistic, no 3D rendering.",
 'o':"Hand-painted fairground sign-painter art: glossy enamel colours brushed by a sign writer, real gold leaf with a black outline and a red drop-shade, pinstripe flourishes, bright circus and theatre colours (scarlet red, emerald green, gold, deep royal blue, black), crisp brush edges, like a vintage hand-painted carnival booth panel. Never dark, never noir, never beige, never photographic, no 3D rendering.",
}
GR={ # bright flat grounds per treatment and object
 's':{'letter':'a flat emerald green background with a few speed lines','bell':'a flat sky-blue background with radiating ring lines around the bell','ticket':'a flat signal-red background','vault':'a flat sky-blue background','slip':'a flat emerald green background','billboard':'a flat warm gold background'},
 'p':{'letter':'a flat cyan background','bell':'a flat lemon-yellow background with red sound lines','ticket':'a flat cyan background','vault':'a flat red background','slip':'a flat lemon-yellow background','billboard':'a flat red background'},
 'o':{'letter':'a scarlet red painted wooden panel background with gold pinstripes','bell':'a royal blue painted wooden panel background with gold pinstripes','ticket':'a deep emerald green painted panel background with gold pinstripes','vault':'a scarlet red painted panel background','slip':'a royal blue painted panel background','billboard':'an emerald green painted panel background'},
}
OB={
 'letter':"Composition: the upper quarter of the square is plain background (a caption will sit there). Below it, an opened envelope seen from the front, its broken wax seal; a large flat card pulled halfway out of it and facing the viewer squarely, filling the middle of the frame. The card is bright warm gold paper with a black ink border, a wide blank header strip across its top and four wide empty ruled rows below, each row a long blank stripe, all big enough to write on.",
 'bell':"Composition: the upper quarter of the square is plain background (a caption will sit there). A big polished brass exchange bell on an iron wall bracket, mid-swing and ringing, with drawn sound lines, in the upper middle; under it a large flat black chalkboard slate with a wooden frame, facing the viewer squarely, filling the lower half of the frame, completely empty.",
 'ticket':"Composition: the upper quarter of the square is plain background (a caption will sit there). One large golden ticket with scalloped edges and a perforated stub on its right, lying flat and facing the viewer, filling the lower three quarters, slightly tilted, glinting. On the ticket: one wide empty name plate across the top, two equal empty rectangular panels side by side below it, and an empty round badge on the stub; all panels dark ink-black so light lettering can sit in them.",
 'vault':"Composition: the upper quarter of the square is plain background (a caption will sit there). A heavy round bank vault door seen from the front, opened just a crack so warm gold light spills out of the gap, its spoked wheel in the middle; above the wheel a large empty rectangular brass plate, facing the viewer squarely.",
 'slip':"Composition: the upper quarter of the square is plain background (a caption will sit there). A betting window with brass grille bars; under the grille on the counter a large flat betting slip facing the viewer squarely, blank, with an empty wide header box and an empty red rubber-stamp ring beside it, and a rubber stamp lying next to it.",
 'billboard':"Composition: the upper quarter of the square is plain background (a caption will sit there). A cinema's coming-attractions wall: three tall poster frames in a row ringed with round light bulbs; the left frame is lit up bright with a glowing empty poster facing the viewer; the middle and right frames are unlit, dark, with empty dark posters. All three posters blank.",
}
ts=sys.argv[1].split(',');os_=sys.argv[2].split(',');ref=len(sys.argv)>3
out=[]
for t in ts:
  for o in os_:
    pr=ST[t]+" "+OB[o]+" Background: "+GR[t][o]+"."+NOTXT
    j={'name':f'{o}-{t}'+('-r' if ref else ''),'model':'gpt-image-2','input':{'prompt':pr,'aspect_ratio':'1:1','resolution':'1K','quality':'medium','num_outputs':1}}
    if ref: j['refs']=[BOX+{'billboard':'billboard','vault':'vault','slip':'slip'}.get(o,o)+'-ink-2.jpg'];j['input']['prompt']="Use the reference image only for the object and its layout; repaint it completely in this style, bright, not dark. "+pr
    out.append(j)
print(json.dumps(out,indent=1))
