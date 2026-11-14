"""Three more card-pack styles, still diegetic (2026-11-11, owner: "a different style but still be diegetic").
Same layout in each so the trades can be set the same way: the opened pack behind, four cards standing in a row in
front facing the camera, the leftmost (the long) lifted higher. Faces and the pack front are painted blank; the words
are added as live type in each material's own technique. Usage: python3 pack2.py f t p"""
import json, subprocess, sys, os
D = os.path.dirname(os.path.abspath(__file__))
LAY = (' In the front, four trading cards stand upright in a row facing the camera head-on, evenly spaced across the frame, the'
       ' leftmost card lifted noticeably higher than the other three. Every card has the same layout: a plain blank panel filling'
       ' most of its face and a plain blank circle near its top. The leftmost card has a green accent edge, the three on the'
       ' right have red accent edges. Behind them stands the opened pack, upright, its front a large plain blank area in its upper'
       ' half. Near-black background, one warm gold key light from above right. Palette only near-black, warm cream, gold, with'
       ' small accents of green and red. Portrait composition. No text, no letters, no numbers, no logos, no pictures on the cards.')
ST = {
 'f': 'Photoreal macro product photograph. A crinkled metallic foil trading-card booster pack in deep black foil with a gold'
      ' sheen and crimped gold seams, torn open along the top with a jagged ripped edge; the cards are thick cream card stock'
      ' with a thin holographic gold foil border that catches the light. Shallow depth of field, rich specular highlights.',
 't': 'Handmade craft photograph. A pack sewn from thick black wool felt with a gold embroidered satin-stitch border, its top'
      ' torn open with frayed felt edges and loose gold threads; the cards are cut from cream felt with neat blanket-stitched'
      ' edges, the stitches green on the leftmost card and red on the others. Soft studio light, visible fibres and stitches,'
      ' shallow depth of field.',
 'p': 'Paper engineering photograph. A pop-up pack folded from heavy black paper with a gold foil border, opened like a pop-up'
      ' book; the cards are thick cream cotton cardstock with deckled edges, standing up on folded paper tabs, with a thin printed'
      ' border, green on the leftmost card and red on the others. Crisp folds, soft shadows, visible paper texture, studio light.',
}
procs = []
for k in sys.argv[1:]:
    inp = {'prompt': ST[k] + LAY, 'aspect_ratio': '3:4', 'resolution': '2K', 'quality': 'high', 'output_format': 'png'}
    procs.append(subprocess.Popen([sys.executable, D + '/hd.py', 'p2' + k, 'gpt-image-2', json.dumps(inp)],
                                  env=dict(os.environ, BIG='1'), stdout=subprocess.PIPE, text=True))
for p in procs:
    print(p.communicate()[0][:200].strip())
