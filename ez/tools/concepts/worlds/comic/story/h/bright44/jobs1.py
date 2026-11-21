# /usr/bin/python3 jobs1.py > jobs1.json : the bright44 paintings. Daylight repaints of shop42's A (phone, desk) and the live Mag 7 bay keep each
# picture's geometry (the first reference is the picture itself), so the measured parts and 9-slices still fit; S3 is a new place (the shop window).
import json
DAY=(" Lighting: bright late-morning daylight. Warm sunlight pours in from a large window off the top left, soft daylight fill everywhere, crisp but light shadows, "
 "no black void anywhere: every corner of the picture is lit and readable. The colours are the same family as before but light and saturated: "
 "warm cream walls, honey-coloured oak, polished antique brass catching the sun, bright emerald green felt, a touch of tomato red. "
 "Style: a painted American comic illustration with modelled depth, crisp black ink contours, cel-shaded light and shade, never a photograph and never a glossy 3D render. "
 "Absolutely no text, no letters, no numbers, no logos, no signs with writing anywhere. Every shelf, step and display interior stays completely EMPTY: no cards, no slabs, no merchandise, no people.")
KEEP=("Repaint the first reference image exactly: keep the same composition, the same camera, every object in exactly the same position, size and proportion, "
 "the same shelves, frames, plates, keyhole and counter at the same pixel positions; only the time of day, the light and the colours change. ")
J=[]
def job(name,ar,refs,prompt,res='2K'):
  J.append({'name':name,'model':'gpt-image-2','refs':refs,'input':{'aspect_ratio':ar,'resolution':res,'quality':'high','num_outputs':1,'prompt':prompt}})
job('ad-phone','9:16',['img/a-phone.jpg'],KEEP+"The small trading-card shop is now open in the daytime: the wall cabinet's frame is honey oak with brass trim, its interior lined with bright emerald-green felt "
 "lit by the sun and its own warm downlights; the brass nameplate on the top rail stays plain and blank; the glass counter below is honey oak with a brass rim, its window lined with warm cream felt, "
 "the small brass plate on its front plain and blank; the back wall between them warm cream plaster with a soft sunbeam across it."+DAY)
job('ad-desk','16:9',['img/a-desk.jpg'],KEEP+"The small trading-card shop is now open in the daytime: the wide wall cabinet's frame is honey oak with brass trim, its interior lined with bright emerald-green felt "
 "lit by the sun and its own warm downlights; the brass nameplate on the top rail stays plain and blank; the glass counter below is honey oak with a brass rim, its window lined with warm cream felt, "
 "the small brass plate on its front plain and blank; the walls warm cream plaster with a soft sunbeam across them."+DAY)
job('bay-day','3:4',['img/ref-bay-dark.jpg'],KEEP+"This is one niche of a display case, seen straight on: the frame stays polished antique brass, now in daylight; the niche's inside is lined with bright emerald-green felt, "
 "evenly lit by daylight and the small downlight at the top; the thin green light strip on the left inner edge and the thin red one on the right stay; the brass floor lip at the bottom stays. "
 "The frame is the same width on all four sides as in the reference, the inside a plain empty felt field with no objects."+DAY)
S3=("A sunny street outside a small trading-card shop at midday, seen perfectly straight on and symmetrical, a flat frontal elevation with almost no perspective. "
 "The shopfront is painted bright emerald green with thin gold pinstripes; across its top a scalloped red-and-cream striped canvas awning; above the awning a long plain gilded sign board, completely blank. "
 "Under the awning one big shop display window with a brass frame: its inside an empty lit display of cream felt with soft sunlight falling across it. "
 "Below the window, on the sunny pavement in front of the shop, a long low glass-topped street display cart in honey oak and brass on small wheels, its glass case empty and lined with cream felt, "
 "a small plain brass plate on the cart's front, completely blank. Blue sky and a sliver of the neighbouring cream brick buildings at the edges; a potted plant by the door. ")
job('s3-phone','9:16',['img/ref-case.jpg'],S3+"Layout for a tall phone picture: the blank gilded sign board spans 12% to 88% of the width at 3% to 8% of the height; the awning from 8% to 15%; the display window spans 7% to 93% of the width and 16% to 58% of the height; "
 "the street cart's glass case spans 4% to 96% of the width and 68% to 88% of the height, its brass plate centred below it at about 91%."+DAY.replace('Every shelf','The reference is only for the finish; do not copy its subject. Every shelf'))
job('s3-desk','16:9',['img/ref-case.jpg'],S3+"Layout for a wide picture: the blank gilded sign board spans 30% to 70% of the width at 3% to 9% of the height; the awning from 9% to 17%; the display window spans 6% to 94% of the width and 18% to 54% of the height; "
 "the street cart's glass case spans 4% to 96% of the width and 64% to 86% of the height, its brass plate centred below it at about 90%."+DAY.replace('Every shelf','The reference is only for the finish; do not copy its subject. Every shelf'))
print(json.dumps(J,indent=1))
