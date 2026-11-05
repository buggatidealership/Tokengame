#!/usr/bin/env python3
# Green Room (gr7) paintings for the X6+ mockup: python3 gen.py [name ...]  (runs hd.py jobs, 5 at a time)
import subprocess,json,sys,os,concurrent.futures as cf
D=os.path.dirname(os.path.abspath(__file__));R=D+'/ref/'
STY=("Match the art style of the first reference frames exactly: a painted, semi-realistic caricature illustration, faces and materials modelled in 3D "
 "and finished like a graphic novel with ink accents and fine grain in the shadows; the backstage of a fight night; deep near-black shadows; hard red practical light "
 "from one side and hard green practical light from the other; warm vanity-mirror bulbs; grimy painted concrete; black flight cases with steel corners. Cinematic, crisp, "
 "high detail. ")
NOT=" Absolutely no text, letters, numbers, words, logos or watermarks anywhere in the image."
CAST={"elon":"the muscular man in a dented steel knight's helmet with the visor pushed up, black t-shirt, metal knee pads and fingerless gloves",
 "dario":"the slim man with wild curly hair and round glasses in a black and gold embroidered boxing robe",
 "sam":"the man in a black suit and black shirt with short tousled hair",
 "kimi":"the young man with messy black hair, a black t-shirt and fingerless gloves"}
J={
"gr7-title-34":("3:4","high",["group","elon","dario","sam","kimi"],
  "Vertical 3:4 poster frame. The green room backstage before a fight. The top 42% of the frame is a dark, plain concrete wall lit only by a dim green fluorescent tube and hanging cables, "
  "kept dark and empty so a big title can be lettered over it. In the lower 58%, the four fighters from the references, seen from the knees up, evenly spaced across the frame, facing the viewer: "
  "far left "+CAST['elon']+", carrying a white porcelain sink under one arm, lit red from an open doorway behind him; centre-left "+CAST['dario']+", arms spread wide; "
  "centre-right "+CAST['sam']+", slouched on a green leather chesterfield sofa with his feet up on a flight case, flipping a gold coin; far right "+CAST['kimi']+", holding a rolled parchment scroll. "
  "Press microphones poke up along the bottom edge. A lit vanity mirror with bulbs at the right edge."+NOT),
"gr7-title-169b":("16:9","high",["group","elon","dario","sam","kimi","lay-h48-title-169"],
  "Wide 16:9 frame, keeping the layout of the last reference image: its left half empty for a title, its characters in the right half. The green room backstage before a fight. The LEFT HALF of the frame (from 0 to 52% across) is a dark, quiet stretch of concrete wall with nobody in it with a dim green fluorescent tube, kept dark and empty so a title can be lettered over it. "
  "The four fighters from the references stand close together in the RIGHT HALF only, between 54% and 98% across, from the knees up, left to right: "+CAST['elon']+" carrying a white porcelain sink, red light from an open doorway behind him; "
  +CAST['dario']+", arms spread wide; "+CAST['sam']+" slouched on a green leather chesterfield sofa, feet up on a flight case, flipping a gold coin; "+CAST['kimi']+" holding a rolled parchment scroll. "
  "Press microphones poke up along the bottom edge, a lit vanity mirror with bulbs at the far right."+NOT),
"gr7-title-169c":("16:9","high",["group","lay-gr7-title-169c"],
  "Repaint the last reference image as one clean, seamless painting, keeping its composition exactly: the four fighters stay the same people, same poses, same size and in the same place in the right part of the frame (the leftmost fighter starts about 45% across), the red doorway, the sofa, the flight case, the press microphones and the lit vanity mirror where they are. "
  "The rough patch on the left is not finished: paint the LEFT 44% of the frame as the same backstage room continuing to the left, a dark, quiet concrete block wall with one dim green fluorescent tube high up, a pipe along the ceiling and a wet dark floor, nobody in it, kept dark and calm so a title can be lettered over it. No seams, no blur, one room, one light."+NOT),
"gr7-ticket":("16:9","high",["dario","lay-h48-ticket"],
  "A single gold laminated ALL-ACCESS backstage pass for a fight night, seen perfectly flat-on, horizontal, filling most of the frame, keeping exactly the layout of the second reference image: "
  "a narrow vertical stub at the far left with a punched lanyard hole and a perforation line, a large empty dark photo window in the left-centre, and a plain blank gold area on the right half for printed details. "
  "Brushed gold foil with scuffs and fingerprints under the laminate, a thin black inner border, hard red rim light on the left edge and green rim light on the right edge. "
  "The pass floats on a flat pure black background, nothing else around it."+NOT),
"gr7-tv":("4:3","high",["group","lay-h48-tv"],
  "A chunky old CRT monitor standing on a black flight case backstage, seen straight on, keeping the layout of the second reference image: the screen sits in the same place and fills the same area of the frame. "
  "The screen is dark and empty, a flat black glass with a faint reflection. Cables, a towel and a water bottle beside it; red light from the left, green light from the right; dark concrete wall behind."+NOT),
"gr7-cliff":("4:3","high",["group","lay-h48-cliff"],
  "The walkout tunnel of an arena on fight night, keeping the layout of the second reference image. On the left, three blank black wooden fight-card boards with thin gold frames hang one above the other on the tunnel wall, "
  "in exactly the places of the three signpost boards in the reference, each completely empty. On the right, at the place of the reference's treasure chest, an open steel briefcase on a stool, overflowing with gold coins, "
  "with one small blank brass tag on its lid. At the far end of the tunnel a bright boxing ring under spotlights and a dark crowd; red and green light spill along the walls; wet concrete floor."+NOT),
"gr7-screen":("4:3","high",["group","lay-h48-screen"],
  "A coach's whiteboard on a rolling steel stand in the locker room backstage, seen perfectly head-on, keeping the layout of the second reference image: the white writing surface fills exactly the area of the reference's screen "
  "(about 21% to 80% across, 12% to 74% down) and is completely blank, clean and evenly lit. Around it: a marker tray, a towel over one corner of the frame, flight cases, dark concrete walls, red light from the left, green light from the right."+NOT),
"gr7-banner":("16:9","high",["group","tunnel"],
  "A wide strip of backstage corridor wall: dark painted concrete, exposed pipes and cable runs near the ceiling, a red caged lamp on the left, a green caged lamp on the right, black flight cases stacked along the floor, "
  "a towel over one case, no people. Even and calm across the middle band so a title plate can sit over it."+NOT),
"gr7-end-34":("3:4","high",["arena","tunnel"],
  "Vertical 3:4. The arena on fight night seen from the mouth of the walkout tunnel: the top 45% of the frame is dark rafters, truss and lighting rigs with a few beams of light, kept dark so a title can be lettered over it. "
  "Below, a huge crowd in the dark with phone lights, and an empty boxing ring under white spotlights in the lower middle; red stage light on the left, green on the right; wet floor reflections in the tunnel foreground."+NOT),
"gr7-end-169":("16:9","high",["arena","tunnel"],
  "Wide 16:9. The arena on fight night seen from the mouth of the walkout tunnel: the top 45% of the frame is dark rafters, truss and lighting rigs, kept dark so a title can be lettered over it. "
  "Below, a huge crowd in the dark with phone lights, and an empty boxing ring under white spotlights in the lower middle; red stage light on the left, green on the right; wet floor reflections in the foreground."+NOT),
"gr7-burn-bag":("1:1","high",["group","dario"],
  "Square. A huge, overstuffed burlap money sack spilling gold coins, sitting on a black flight case in the green room under the warm vanity-mirror bulbs, red and green light, gaffer tape, a towel. Close and centred."+NOT),
"gr7-burn-fire":("1:1","high",["group","elon"],
  "Square. The same huge burlap money sack of gold coins now burning in a dented steel trash can in the green room: tall orange flames, coins glowing, sparks, smoke curling under the mirror bulbs, red and green light. Close and centred."+NOT),
"gr7-burn-pouch":("1:1","high",["group","sam"],
  "Square. Morning after: a tiny leather pouch of gold coins sitting alone on the green room's makeup counter beside a small pile of grey ash and a burnt-out steel trash can, the vanity-mirror bulbs half lit, quiet red and green light. Close and centred."+NOT),
"gr7-plate":("16:9","high",["group"],
  "A single blank name plate for a fight-night lower third, seen perfectly flat-on, filling the whole frame edge to edge: a matte black scuffed board with a thin aged-gold bevelled frame running evenly around all four edges, "
  "about 4% of the width thick, slightly worn corners. The black field inside is completely empty and evenly dark. No background visible around the plate."+NOT),
"gr7-plate-gold":("16:9","high",["group"],
  "A single blank name plate, seen perfectly flat-on, filling the whole frame edge to edge: brushed aged gold foil with scuffs, a thin black bevelled frame running evenly around all four edges, about 4% of the width thick. "
  "The gold field inside is completely empty. No background visible around the plate."+NOT),
}
for k,who,act in [("grok","elon","sitting on a black flight case, his bare feet soaking in a white porcelain sink on the floor, elbows on his knees, a cocky grin; red light pours from an open door behind him"),
                  ("claude","dario","standing and holding up in both hands a white card with the single word SUBSCRIBE printed on it in bold red letters, eyebrows raised; red light behind him"),
                  ("gpt","sam","slouched on a green leather chesterfield sofa, feet up on a flight case, holding up a small gold coin between finger and thumb with a smug half-smile; a polaroid of a white supercar taped to the wall above him; green light"),
                  ("kimi","kimi","holding open an old parchment scroll that shows a falling red candlestick chart, a small smirk; warm mirror bulbs behind him, red rim light")]:
  J["gr7-cast-"+k+"-st"]=("9:16","high",[who,"group"],
    "Vertical 9:16 portrait. "+CAST[who]+", "+act+". Framed from the waist up, centred, his head in the upper third of the frame with room above it; the backstage green room behind him."+
    (" The only lettering allowed is the word SUBSCRIBE on the card." if k=="claude" else NOT))
def run(n):
  ar,q,refs,pr=J[n];inp={"prompt":STY+pr,"quality":q,"aspect_ratio":ar,"resolution":"2K"}
  p=subprocess.run(["python3",D+"/hd.py","gen",n,"gpt-image-2",json.dumps(inp)]+[R+r+".jpg" for r in refs],capture_output=True,text=True,cwd=D)
  return n,(p.stdout.strip()[-260:] or p.stderr.strip()[-300:])
names=sys.argv[1:] or list(J)
with cf.ThreadPoolExecutor(5) as ex:
  for n,o in ex.map(run,names):print(n,o,flush=True)
