# python3 mkjobs.py > jobs1.json : the book's bridges. Each bridge is one painting whose top continues the picture that ends one
# chapter and whose bottom opens the next; it leaves one blank surface for the narration the page letters in.
import json
SA=("Drawn as a 1960s Silver Age American comic book print: clean confident brush-and-nib black ink outlines of varying weight, "
 "flat bold bright printed colours (sunny yellow #fdbc2a, emerald green #03c870, signal red #ff3a31, sky blue, white highlights, black ink), "
 "Ben-Day halftone dots only in a few shadows, plates a hair out of register, hand-inked, bright and flashy. No 3D rendering, no photographic light, "
 "no gradients, no cream or beige paper. No people's faces in close-up.")
NO=" No text, no letters, no numbers, no digits, no logos, no watermark anywhere; every sign, banner and plate is completely blank."
NOIR=("Drawn as film noir comic book art with a brush: heavy black brush ink, dry-brush texture, ink splatter, cross-hatching, deep solid blacks; "
 "the only colour is spot colour carrying the light: warm gold (#fdbc2a), small accents of emerald green (#03c870) and signal red (#ff3a31). "
 "Drawn, not rendered: no smooth 3D surfaces, no photographic light, no realism.")
B=[
 ("b1","cover.jpg",None,
  "One continuous vertical comic panel, read top to bottom as a camera moving down. TOP: the grand stock exchange facade at night with its columns lit gold, as in the reference image, seen from above. "
  "MIDDLE: the steps of the exchange run down into a street where a crowd queues under a fight-night arena marquee; across the street hangs one wide blank yellow cloth banner, flat to the viewer, with empty space on it. "
  "BOTTOM: through the arena entrance, a boxing ring under four spotlights in four colours (red-orange, green, blue, gold), empty, waiting for four fighters. Bright, exciting, night lit by gold and coloured light.",SA),
 ("b2",None,"rack-r6c.jpg",
  "One continuous vertical comic panel, read top to bottom as a camera moving down. TOP: the inside of a fight arena, four coloured spotlights sweeping up over an empty ring and a cheering crowd seen as small shapes. "
  "MIDDLE: the arena's back door opens onto a rainy city street at night; on the wall beside the door is one blank yellow enamel sign, flat to the viewer. "
  "BOTTOM: on the corner, a newsstand with a big spinning comic-book rack glowing under a red awning, as in the reference image, bundles of fresh newspapers tied with string on the wet pavement.",SA),
 ("b3","rack-r6c.jpg","sol-board-f1-3x4.jpg",
  "One continuous vertical comic panel, read top to bottom as a camera moving down and through a door. TOP: the night street corner newsstand with its glowing comic-book rack and red awning, as in the first reference. "
  "MIDDLE: across the street, the tall bronze doors of an old 1920s stock exchange hall stand open, warm light spilling out; above the doors one blank brass plate, flat to the viewer. "
  "BOTTOM: inside, the trading floor of the 1920s exchange with a huge empty green chalkboard on the far wall, a clerk on a rolling ladder, traders in waistcoats, as in the second reference.",SA),
 ("b4","sol-board-f1-3x4.jpg","bet-vault-h2.jpg",
  "One continuous vertical comic panel, read top to bottom as a camera descending a staircase, and the light changes from warm to noir as it goes down. TOP: the edge of the 1920s exchange trading floor in warm lamplight, as in the first reference. "
  "MIDDLE: a narrow iron staircase spirals down below the floor; on the stair wall one blank black plate with a gold rim, flat to the viewer. "
  "BOTTOM: at the bottom, in heavy darkness and rain-like ink streaks, a giant round vault door stands half open with a pile of gold coins glowing inside, as in the second reference.",
  "The top third is drawn as a bright 1960s Silver Age comic print (flat bright colours, clean ink); from the middle down it turns into "+NOIR),
 ("b5","bet-vault-h2.jpg","o3-tonight-gpt-image-2.jpg",
  "One continuous vertical comic panel, read top to bottom as a camera rising out of a vault into the evening. TOP: the dark vault with its half-open round door and glowing gold coins, as in the first reference, in heavy black ink. "
  "MIDDLE: a ladder and a manhole open up onto a city rooftop; a big blank clock face on a building is near the hour, and one blank red enamel sign hangs on the railing, flat to the viewer. "
  "BOTTOM: the rooftop boxing ring at sunset with a big brass bell on a post, the skyline glowing orange and gold, as in the second reference, ready for tonight's bout.",
  "The top quarter is drawn in film noir brush ink with gold light; from there down it turns bright: "+SA),
]
J=[]
for n,r1,r2,scene,style in B:
  refs=[f"ref/{x}" for x in (r1,r2) if x]
  for ar in ("9:16","16:9"):
    sc=scene if ar=="9:16" else scene.replace("vertical comic panel, read top to bottom as a camera moving down","wide comic panel, read left to right as a camera tracking sideways").replace("TOP:","LEFT:").replace("MIDDLE:","CENTRE:").replace("BOTTOM:","RIGHT:").replace("vertical comic panel, read top to bottom as a camera","wide comic panel, read left to right as a camera")
    J.append({"name":f"{n}-{'p' if ar=='9:16' else 'l'}","model":"gpt-image-2","refs":refs,
      "input":{"prompt":("Use the reference images only for place, palette and objects. " if refs else "")+sc+" "+style+NO,"aspect_ratio":ar,"resolution":"1K","quality":"medium","num_outputs":1}})
# blank caption plates for take R1 (lettered by the page)
for n,d in [("cap-y","a blank Silver Age comic narration caption box: a flat sunny yellow (#fdbc2a) rectangle with a slightly irregular hand-inked black border, thick outer line, a thin inner line, tiny ink wobble, a hard black offset shadow to the lower right, centred on a flat solid black background, filling most of the frame"),
            ("cap-k","a blank film-noir comic narration caption box: a flat black rectangle with a hand-inked gold (#fdbc2a) double border with dry-brush texture, a hard dark offset shadow, centred on a flat solid dark grey background, filling most of the frame")]:
  J.append({"name":n,"model":"gpt-image-2","input":{"prompt":"Draw only "+d+". Flat, front-on, no perspective. Hand-inked comic print, no 3D, no gradient."+NO,"aspect_ratio":"16:9","resolution":"1K","quality":"medium","num_outputs":1}})
print(json.dumps(J,indent=1))
