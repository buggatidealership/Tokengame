import json
STY=("Rendered 3D first and finished as an American pop comic: modelled forms and materials lit by hard coloured light, then a confident black ink contour over every edge, "
"Ben-Day halftone dots and cross-hatching only inside the shadows, slight print misregistration, saturated yellow, red, electric blue and green, deep navy night. "
"Same look as a painted pop-comic newsstand at night with a yellow and red starburst. No text, no letters, no numbers, no logos, no signs, no people, no faces, no hands, no watermark.")
J={
 'ring':"An empty boxing ring at night inside an old arena, seen from the front and slightly above, its four corner posts lit, top rope red, middle rope green, canvas deep blue. A huge jagged yellow and red comic starburst explodes behind the ring in the upper part of the picture, spotlight beams through haze. The lower half is the dark arena floor and the ring apron fading into shadow, calm and low in detail.",
 'beams':"Night city rooftops seen from a rooftop. Four searchlight beams, one green, one red, one gold, one electric blue, sweep up and cross in the sky in front of a huge jagged yellow and red comic starburst. Water tanks and brick parapets in silhouette, wet rooftop gravel in the foreground. The lower half is the dark wet rooftop, calm and low in detail.",
 'coin':"A giant gold coin spinning in mid-air, caught edge-on and tilted, its rim glinting, above a green felt card table in a dark back room. A huge jagged yellow and red comic starburst bursts behind the coin. Motion arcs around the coin. The lower half is the dark felt table edge and floor, calm and low in detail.",
 'street':"The wet pavement and gutter of a city street at night seen from low down, puddles reflecting yellow, red and blue neon from shop windows above, a lamp post at the side. Mostly dark, calm and low in detail, the reflections streaking down.",
}
jobs=[]
for k,p in J.items():
  for ar,tag in (('9:16','phone'),('16:9','desk')):
    if k=='street' and tag=='desk':continue
    jobs.append({'name':f'g-{k}-{tag}','model':'gpt-image-2','input':{'prompt':p+' '+STY,'aspect_ratio':ar,'quality':'high','resolution':'2K','output_format':'png','num_outputs':1}})
jobs.append({'name':'g-night-tile','model':'gpt-image-2','input':{'prompt':"A flat, seamless, edge-to-edge printed texture of a pop comic page's night sky: deep navy ink with dry-brush streaks, irregular cross-hatching, and Ben-Day dots that grow and shrink in soft clouds, slight cyan and magenta misregistration. Even overall darkness, no objects, no focal point. No text, no letters, no numbers, no logos, no watermark.",'aspect_ratio':'1:1','quality':'medium','resolution':'1K','output_format':'png','num_outputs':1}})
L=("Total darkness. {} The pool of light falls on an empty smooth black surface in the centre of the picture, which stays completely empty. Everything outside the light is pure black. "
"Rendered 3D first and finished as an American pop comic: modelled metal lit by warm light, black ink contour, halftone dots inside the falloff of the light, dust glinting in the beam. No text, no letters, no numbers, no logos, no people, no watermark.")
for k,d in (('hang',"A single old enamel factory lamp hangs from a cord at the top of the picture, its warm golden bulb casting one cone of light straight down."),('street',"The curved head of an old cast-iron street lamp reaches in from the top of the picture, its warm golden lantern casting one cone of light straight down.")):
  for ar,tag in (('9:16','phone'),('16:9','desk')):
    jobs.append({'name':f'l-{k}-{tag}','model':'gpt-image-2','input':{'prompt':L.format(d),'aspect_ratio':ar,'quality':'medium','resolution':'1K','output_format':'png','num_outputs':1}})
json.dump(jobs,open('jobs1.json','w'),indent=1);print(len(jobs))
