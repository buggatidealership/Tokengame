# /usr/bin/python3 jobs1.py > jobs1.json : the shop42 paintings (three places, phone 9:16 and desktop 16:9, plus one tag sprite per place)
import json
STYLE=(" Style: a painted American comic illustration with modelled depth, the same finish as the reference images: crisp black ink contours, "
 "one warm gold key light from above, a thin green rim light on the left edges and a thin red rim light on the right edges, deep black shadows "
 "falling off into a black void at the image edges. Palette only black, dark bottle green, deep red, antique gold and cream. Painted and drawn, "
 "not a photograph, not a glossy 3D render. Do not copy the references' subjects. Every shelf, step, niche and case interior is completely EMPTY: "
 "no cards, no slabs, no boxes, no merchandise, no people. Absolutely no text, no letters, no numbers, no logos, no signs with writing, no price tags with writing anywhere.")
FRONT="Seen perfectly straight on at eye level, symmetrical left to right, a flat frontal elevation with almost no perspective. "
J=[]
def job(name,ar,res,prompt,q='high'):
  J.append({'name':name,'model':'gpt-image-2','refs':['img/ref-chip.jpg','img/ref-case.jpg'],
    'input':{'aspect_ratio':ar,'resolution':res,'quality':q,'num_outputs':1,'prompt':prompt+STYLE}})
# ---- A the card shop: the locked wall case behind the counter (Mag 7) and the glass counter showcase (every other round)
A_case=("a tall locked glass display cabinet hung on the shop's back wall, a heavy dark walnut frame with antique brass trim, a small brass keyhole lock on its right stile, "
 "its interior lined with dark bottle-green felt and lit from inside by a row of small warm downlights along the top, ")
A_cnt=("the shop's glass counter showcase in front, a walnut counter whose wide glass front window shows an empty interior of dark green felt lit from above, "
 "a brass rim around the window and a thick glass top edge catching the light, ")
job('a-phone','9:16','2K',"Inside a small trading-card shop after hours. "+FRONT+"Upper part: "+A_case+"with two empty horizontal glass shelves with brass front edges; the cabinet spans 7% to 93% of the image width and 5% to 55% of the height, "
 "the upper shelf's top surface at 31% of the height and the lower shelf's at 52%. On the cabinet's top rail, centred, one plain polished brass nameplate, horizontal, about 36% of the image width and 3.5% of the height, completely blank. "
 "Lower part: "+A_cnt+"the window spanning 4% to 96% of the width and 63% to 90% of the height; on the counter's wooden front below the window, centred, one small plain brass plate, completely blank. "
 "Between the cabinet and the counter a narrow dark strip of the back wall.")
job('a-desk','16:9','2K',"Inside a small trading-card shop after hours. "+FRONT+"Upper part: "+A_case+"wide and low, with one empty horizontal glass shelf with a brass front edge; the cabinet spans 6% to 94% of the image width and 4% to 48% of the height, "
 "the shelf's top surface at 44% of the height. On the cabinet's top rail, centred, one plain polished brass nameplate, horizontal, about 16% of the image width and 4.5% of the height, completely blank. "
 "Lower part: "+A_cnt+"the window spanning 4% to 96% of the width and 58% to 90% of the height; on the counter's wooden front below the window, centred, one small plain brass plate, completely blank.")
# ---- B the card show: the dealer's upright riser case at the back of the table (Mag 7) and the slanted table showcase in front (every other round)
B_hall="A dealer's table at a huge card show at night, the convention hall dark behind with faint rows of other tables and hanging hall lights far away. "+FRONT
B_riser=("an upright locking glass showcase standing on the back of the table, a black aluminium frame with brass corner caps, lined with dark green velvet, "
 "two small black clamp-on LED lamps clipped to its top frame shining warm light down inside, ")
B_front=("a slanted glass table showcase lying on the front of the table, its glass facing the viewer, a black frame with brass corner caps, its inside an empty bed of dark green velvet lit by the lamps, ")
B_cloth="The table is draped to the floor in a dark green cloth with a deep red skirt band along its bottom edge. "
job('b-phone','9:16','2K',B_hall+"Back: "+B_riser+"with two empty tiered velvet steps; the upright case spans 9% to 91% of the image width and 6% to 52% of the height, the upper step's top surface at 30% of the height and the lower step's at 50%. "
 "Hanging from the centre of the upright case's top frame on two short chains, one plain cream folded card sign, horizontal, about 34% of the image width and 4% of the height, completely blank. "
 "Front: "+B_front+"spanning 3% to 97% of the width and 60% to 87% of the height; standing on the table just in front of it at the centre, one small plain cream tent card, completely blank. "+B_cloth)
job('b-desk','16:9','2K',B_hall+"Back: "+B_riser+"wide and low, with one empty velvet step; the upright case spans 7% to 93% of the image width and 5% to 47% of the height, the step's top surface at 43% of the height. "
 "Hanging from the centre of the upright case's top frame on two short chains, one plain cream folded card sign, horizontal, about 16% of the image width and 5% of the height, completely blank. "
 "Front: "+B_front+"spanning 3% to 97% of the width and 55% to 86% of the height; standing on the table in front of it at the centre, one small plain cream tent card, completely blank. "+B_cloth)
# ---- C the auction preview room: the lit wall vitrine of the evening's top lots (Mag 7) and the long table vitrine you walk along (every other round)
C_room="A hushed auction house preview room in an old gallery at night, dark bottle-green panelled walls, a dark parquet floor. "+FRONT
C_wall=("a built-in wall vitrine with a deep recessed interior lit by warm museum spotlights from above, a gilded antique-gold frame, dark green silk lining, "
 "a thin red velvet rope on brass stanchions in front of it, ")
C_tab=("a long low museum table vitrine on a dark wood plinth, a glass box whose front pane faces the viewer, its inside an empty bed of dark green silk lit softly from above, ")
job('c-phone','9:16','2K',C_room+"Upper part: "+C_wall+"with two empty horizontal glass shelves; the vitrine spans 8% to 92% of the image width and 8% to 55% of the height, the upper shelf's top surface at 32% of the height and the lower shelf's at 53%. "
 "On the wall above the vitrine, centred, one plain engraved-style antique-brass wall plaque, horizontal, about 34% of the image width and 3.5% of the height, completely blank. "
 "Lower part: "+C_tab+"its pane spanning 4% to 96% of the width and 64% to 88% of the height; on the plinth's front below it, centred, one small plain brass plaque, completely blank.")
job('c-desk','16:9','2K',C_room+"Upper part: "+C_wall+"wide and low, with one empty horizontal glass shelf; the vitrine spans 6% to 94% of the image width and 6% to 48% of the height, the shelf's top surface at 45% of the height. "
 "On the wall above the vitrine, centred, one plain antique-brass wall plaque, horizontal, about 16% of the image width and 4% of the height, completely blank. "
 "Lower part: "+C_tab+"its pane spanning 4% to 96% of the width and 58% to 88% of the height; on the plinth's front below it, centred, one small plain brass plaque, completely blank.")
# ---- the small labels for the empty Mag 7 slots, one object per place, on magenta for keying
SPR=(" The object fills 10% to 90% of the image width and 25% to 75% of the height, seen perfectly straight on. Everything outside the object, the whole background, is perfectly flat uniform pure magenta (#FF00FF) with no shadow on it.")
def spr(name,obj):
  J.append({'name':name,'model':'gpt-image-2','refs':['img/ref-chip.jpg','img/ref-case.jpg'],'input':{'aspect_ratio':'1:1','resolution':'1K','quality':'high','num_outputs':1,'prompt':obj+SPR+STYLE.replace('Every shelf, step, niche and case interior is completely EMPTY: no cards, no slabs, no boxes, no merchandise, no people. ','')}})
spr('a-tag',"One single shelf-edge price tag holder: a small horizontal antique-brass clip holding a plain cream card, the card's face completely blank and flat, about three times as wide as tall.")
spr('b-tag',"One single small folded cream tent card standing upright, its front face a plain completely blank cream rectangle with a thin deep red border line, about three times as wide as tall.")
spr('c-tag',"One single small museum label plaque: a horizontal rectangle of antique brass with bevelled edges and two tiny screws, its face plain and completely blank, about three times as wide as tall.")
print(json.dumps(J,indent=1))
