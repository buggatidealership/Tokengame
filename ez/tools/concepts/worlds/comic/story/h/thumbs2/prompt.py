import json,sys
# Round H4 thumbs2: Golden Age tiles from each film's reveal frame (the outcome). prompt.py <win|tie|none> [extra] [quality]
STYLE=("Golden Age American comic book cover painting, 1940s: aged yellowed newsprint paper, coarse visible Ben-Day dots, "
"slightly mis-registered four-colour printing, thick confident brush ink outlines, flat shapes with simple hand-painted shading, heroic pulp composition, "
"in the style of the second reference image.")
OUT={
 'win':"This frame is the climax of the film: the winner's object (a sign, plaque, card, screen row, figure or item) has turned gleaming gold and wears or shows a golden crown. Keep that gold and that crown on exactly the same object in exactly the same place and at the same size, painted as bright gold leaf with a glow. Only that one object is gold: if the winner is one row, strip or plate on a board, only that row or plate is gold, and the rest of the board keeps its original colour with blank rows. Every other object keeps its own colours. ",
 'tie':"This frame is the climax of the film: two winners share the win; each of their objects has turned gleaming gold with a golden crown. Keep the gold and the crowns on exactly those two objects in the same places and at the same size, painted as bright gold leaf; if they are rows or plates on a board, only those are gold and the rest of the board keeps its colour. Every other object keeps its own colours. ",
 'glow':"This frame is the moment the film announces the winner on its board: keep the victory light and glow of the moment exactly as in the first reference, but paint no crown and add no gold objects that are not there. ",
 'none':"This frame is the climax of the film and nobody won: paint no crown and no gold winner anywhere; keep the dramatic light of the moment. ",
}
def film(kind,extra=""):
  return (f"Repaint the first reference image (one frame of an animated film) as {STYLE} Keep the same subject, the same setting, the same objects, "
  "the same camera angle and the same main colours, so it is instantly recognisable as the same scene. "+OUT[kind]+extra+
  "Remove every piece of writing: every board, screen, sign, banner, card, plaque, tag, label or monitor keeps its shape and colour but is blank, with no marks on it. "
  "No text, no letters, no numbers, no words, no percent signs, no arrows with numbers, no logos, no brand marks, no masthead, no frame, no border. "
  "Keep only what is in the first reference: no extra characters, no faces, arms or legs added to objects. Full-bleed art filling the whole canvas.")
if __name__=='__main__':
  kind=sys.argv[1];extra=sys.argv[2] if len(sys.argv)>2 else "";q=sys.argv[3] if len(sys.argv)>3 else "low"
  print(json.dumps({"prompt":film(kind,extra),"aspect_ratio":"3:4","resolution":"1K","quality":q,"output_format":"png","num_outputs":1}))
