#!/usr/bin/env python3
# rounds4 (round H9): drawn places and drawn covers. Prints a job list for run.sh, one JSON per line: name, model, input, refs.
#   python3 gen.py plates   -> 6 places x 3 styles x (3:4 est, 16:9 est, 1:1 wall)
#   python3 gen.py covers   -> 8 rounds x 3 styles, repainted from media/tile-r<n>-t3.jpg
import json,sys,os
D=os.path.dirname(os.path.abspath(__file__));M=D+'/../../../../../../../media/'
NEG=" Drawn by hand, not rendered: no photographic light, no smooth 3D-render surfaces, no lens blur, no beige, cream or parchment areas. No people, no figures, no faces, no text, no letters, no numbers, no words, no logos, no readable signs, no watermark."
S={
'noir':"Film noir comic book art drawn with heavy brush and ink, like a page inked with a sable brush: bold black brush strokes, large solid black shadows, dry-brush texture on every surface, cross-hatching, ink splatter, falling rain streaks scratched out in white. Black ink and cool grey wash only, and the light itself drawn in spot colour: warm gold, with one small touch of emerald green and one of signal red.",
'silver':"1960s Silver Age American comic book print at night: a confident clean black ink line drawn with brush and nib, thick outer contours and thin inner lines, flat printed colour fills in a limited dark palette (inky night blue, deep emerald green, signal red, warm gold yellow, black), Ben-Day halftone dots only inside a few shadows, colour plates a hair out of register, the slight grain of cheap printing.",
'shadow':"Hard-shadow graphic comic art: huge flat shapes of solid black shadow that swallow half of every form, very few interior lines, chunky geometric silhouettes, flat colour planes in dark muted tones (deep teal green, oxblood red, slate) and a single accent of glowing gold light, high contrast, a moody pulp-horror inking style, hand-inked edges, flat colour with no gradients.",
}
P={
'shop':("A small comic book shop at night, seen from behind the counter: a tall back wall of dark wooden slatwall with rows of empty clear plastic comic sleeves on hooks waiting for covers, a picture lamp above, long white boxes on the floor, a counter bell in the foreground, a rainy street window to the side.",
        "Front-on flat view of a comic shop's back wall: dark wooden slatwall with evenly spaced horizontal grooves, nothing hung on it, light grazing from above, the surface fills the whole frame evenly."),
'tunnel':("The concrete tunnel that leads boxers from the dressing rooms to the ring on fight night: rough walls covered in layers of torn and pasted blank fight-poster paper, a bare bulb in a cage, the ring's lights glowing far down the tunnel through haze, cables on the floor.",
        "Front-on flat view of a rough dark concrete tunnel wall with old wheat-paste residue, torn scraps of paper and drips of glue, nothing new on it, light grazing from above, the surface fills the whole frame evenly."),
'kiosk':("An old newsstand kiosk on Wall Street at the closing bell, dusk turning to night: a dark green wooden kiosk whose wires and wooden clothes pegs hold blank magazines, the columns of the stock exchange behind it, steam rising from a street grate, wet cobbles.",
        "Front-on flat view of the inside back panel of a newsstand kiosk: dark green painted tongue-and-groove wooden boards, nothing on them, light from above, the surface fills the whole frame evenly."),
'press':("A print shop at night, the press still warm: a big old cylinder printing press in the foreground, and above it long lines of wire strung across the room with blank freshly printed sheets hanging from bulldog clips to dry, one hanging lamp, ink cans and rollers on a bench.",
        "Front-on flat view of a print shop's dark brick back wall, smudged with black ink, a few old drying wires running across it with nothing hanging on them, light from above, the surface fills the whole frame evenly."),
'locker':("A stadium locker room at night after the game: a long row of tall dark green steel lockers with vented doors, one locker door hanging open, a wooden bench, a towel, a ball, harsh light from one caged lamp, steam from the showers in the back.",
        "Front-on flat view of a row of tall dark green steel locker doors with vent slots and handles, closed, light from above, the doors fill the whole frame evenly."),
'cinema':("The lobby of an old picture palace at night: a curved wall of empty brass-framed poster cases lit from within, a red carpet, velvet ropes on brass posts, a ticket booth, the dark auditorium doors at the back with a projector beam leaking through.",
        "Front-on flat view of an old cinema lobby wall: dark red flocked wallpaper with an art-deco brass rail running across near the bottom, nothing hung on it, warm light from above, the surface fills the whole frame evenly."),
}
VAULT=M+'bet-vault-h2.jpg'
SR=lambda st:("Draw in exactly the drawing style of the reference image (its sable-brush ink, dry brush, scratched rain, deep blacks, and the light drawn as glowing gold), but draw a completely different scene, described here. " if st=='noir' else "")
RF=lambda st:[VAULT] if st=='noir' else []
SET=[78,77,76,75,74,72,70,51]
def job(name,prompt,ar,refs=(),q='medium'):
  return {'name':name,'model':'gpt-image-2','input':{'prompt':prompt,'aspect_ratio':ar,'resolution':'1K','quality':q,'output_format':'png','num_outputs':1},'refs':list(refs)}
def plates():
  for pl,(est,wall) in P.items():
    for st,fin in S.items():
      for ar in ('3:4','16:9'):
        yield job(f'{pl}-{st}-est-{ar.replace(":","x")}',SR(st)+"Establishing panel. "+est+" "+fin+" Leave the upper fifth of the picture calm and dark so a title can be lettered there."+NEG,ar,RF(st))
      yield job(f'{pl}-{st}-wall',SR(st)+wall+" Even, low-contrast and dark so pictures can hang on it. "+fin+NEG,'1:1',RF(st))
def covers():
  for n in SET:
    for st,fin in S.items():
      p=(("The first reference image is the picture to redraw; the second only shows the drawing style to use (sable-brush ink, dry brush, deep blacks, light drawn as glowing gold); take nothing else from it. " if st=='noir' else "")+"Redraw this exact picture as a new piece of comic art, keeping its composition: the same place, the same objects in the same positions, "
         "and the same object marked in gold with a crown (if nothing is gold and crowned, keep it so: nobody won). "
         "Remove every blank sign, empty plate, label and banner; remove any people or characters. Keep the top quarter and the bottom fifth calm and dark, "
         "so a masthead and a cover line can be lettered there. Finish: "+fin+NEG)
      yield job(f'cv-r{n}-{st}',p,'3:4',[M+f'tile-r{n}-t3.jpg']+RF(st))
if __name__=='__main__':
  for j in {'plates':plates,'covers':covers}[sys.argv[1]](): print(json.dumps(j))
