"""Paint the glass card pack beats with Hedra (2026-11-11, owner: "a diegetic but with a card pack. With a 3D glass layer").
Each beat is painted from img/p1.jpg (the sealed pack) as reference, so material and light stay the same; card faces
are left blank so the real trades can be printed on them as live type. Runs the beats in parallel. Usage: python3 pack.py a b c"""
import json, subprocess, sys, os
D = os.path.dirname(os.path.abspath(__file__))
STY = (' Keep exactly the same glass material, bevels, lighting (warm gold rim light from above right, green light in the left'
       ' glass edges, red light in the right glass edges), near-black background and glossy floor with caustics as the reference'
       ' image. Palette near-black, warm cream, gold, small accents of green and red. No text, no letters, no numbers, no logos,'
       ' no pictures on the cards.')
BEATS = {
 'a': 'The same sealed glass booster pack as the reference image, identical framing, but the four cards stacked inside have plain'
      ' blank warm-cream faces with a thin gold border, no artwork at all.',
 'b': 'The same glass booster pack as the reference image, now opening: its front glass sheets slide up and apart like layers'
      ' separating, and four thick glass trading cards rise out of it toward the camera in a gentle fan, each card a clear glass'
      ' slab with a plain blank warm-cream panel filling its centre and a thin gold edge, faces toward the camera. Motion feels'
      ' frozen mid-reveal, small glints of light on the edges.',
 'c': 'Four thick glass trading cards, from the same glass booster pack as the reference image, now standing upright in a row'
      ' facing the camera head-on, evenly spaced across the frame, floating just above the dark glossy floor with reflections.'
      ' The leftmost card is lifted noticeably higher than the others and glows with warm gold light from within, a green glow'
      ' along its edges. The three cards on the right sit lower in a row with a faint red glow along their edges. Every card has'
      ' the same layout: a plain blank warm-cream panel filling most of its face, a plain blank circle near its top, thin gold'
      ' edges. The empty open glass pack lies behind them, out of focus.',
}
procs = []
for k in sys.argv[1:]:
    inp = {'prompt': BEATS[k] + STY, 'aspect_ratio': '3:4', 'resolution': '2K', 'quality': 'high', 'output_format': 'png'}
    procs.append(subprocess.Popen([sys.executable, D + '/hd.py', 'p1' + k, 'gpt-image-2', json.dumps(inp), D + '/img/p1.jpg'],
                                  env=dict(os.environ, BIG='1'), stdout=subprocess.PIPE, text=True))
for p in procs:
    print(p.communicate()[0][:200].strip())
