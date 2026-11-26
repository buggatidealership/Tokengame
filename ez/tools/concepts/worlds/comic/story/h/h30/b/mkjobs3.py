import json
exec(open('mkjobs.py').read().split('J=[]')[0])
J=[]
P3=("A square matte-black circuit board seen perfectly head-on from directly above, flat, no perspective, filling the whole frame edge to edge. "
"Four big identical square chip sockets nearly fill the board in a 2 by 2 grid: each socket is 43% of the board's width, and the gaps between them are narrow, only 5% of the board's width. "
"Each socket is an empty window of deep glossy black glass inside a thin raised brushed-steel frame with a ring of tiny silver solder pads. "
"Short bright brushed-silver traces bridge the narrow gaps between the sockets clockwise: top-left to top-right, top-right down to bottom-right, bottom-right to bottom-left, bottom-left back up to top-left, forming a loop. "
"Four small silver mounting holes in the board's corners. ")
for k in "ab":
  J.append({"name":"p3v2-loop-"+k,"model":"gpt-image-2","input":{"prompt":P3+ST+NOCOL+NOTXT,"aspect_ratio":"1:1","resolution":"2K","quality":"high","output_format":"jpeg","num_outputs":1}})
json.dump(J,open("jobs3.json","w"),indent=1);print(len(J))
