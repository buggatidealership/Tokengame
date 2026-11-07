import json,sys
STYLE=("Golden Age American comic book cover painting, 1940s: aged yellowed newsprint paper, coarse visible Ben-Day dots, "
"slightly mis-registered four-colour printing, thick confident brush ink outlines, flat shapes with simple hand-painted shading, heroic pulp composition, "
"in the style of the second reference image.")
def film(extra=""):
  return (f"Repaint the first reference image (one frame of an animated film) as {STYLE} Keep the same subject, the same setting, the same objects, "
  "the same camera angle and the same main colours, so it is instantly recognisable as the same scene. "+extra+
  "Remove every piece of writing: any board, screen, sign, banner, card, plaque, label or monitor in the scene becomes blank or plain coloured or shows simple scenery. "
  "No text, no letters, no numbers, no words, no logos, no brand marks, no signs with writing, no masthead, no frame, no border. Full-bleed art filling the whole canvas.")
def world(desc):
  return (STYLE.replace("the second reference image","the reference image")+" Scene: "+desc+" Vertical full-bleed cover art. No text, no letters, no numbers, no words, no logos, no brand marks, no signs with writing, no masthead, no frame, no border.")
if __name__=='__main__':
  kind,arg=sys.argv[1],sys.argv[2] if len(sys.argv)>2 else ""
  q=sys.argv[3] if len(sys.argv)>3 else "low"
  if kind=='film1': p=film(arg).replace(" in the style of the second reference image.","").replace("first reference image","reference image")+" Keep only what is in the reference: no extra characters, no faces, arms or legs added to objects."
  elif kind=='world0': p=world(arg).replace(" in the style of the reference image.","")
  else: p=film(arg) if kind=='film' else world(arg)
  print(json.dumps({"prompt":p,"aspect_ratio":"3:4","resolution":"1K","quality":q,"output_format":"png","num_outputs":1}))
