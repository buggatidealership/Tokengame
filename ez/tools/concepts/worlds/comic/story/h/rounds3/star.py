#!/usr/bin/env python3
# rounds3: guest-star art (tiles3's take A, safe zone on) for rounds tiles3 did not paint. star.py <round> <WINNER[,WINNER]> <tile file in media/>
import sys,os,json,subprocess,importlib.util
D=os.path.dirname(os.path.abspath(__file__));M=D+'/../../../../../../../media/'
spec=importlib.util.spec_from_file_location('g',D+'/../tiles3/gen.py');g=importlib.util.module_from_spec(spec);spec.loader.exec_module(g)
r,ws,tile=sys.argv[1],[w for w in sys.argv[2].split(',') if w],sys.argv[3]
p=g.prompt('A',ws).replace(g.END,g.SAFE+g.END)
inp={"prompt":p,"aspect_ratio":"3:4","resolution":"1K","quality":"medium","output_format":"png","num_outputs":1}
subprocess.run(['python3',D+'/hd.py',f'a-r{r}-s','gpt-image-2',json.dumps(inp),M+tile]+[M+f'founder-{w.lower()}-anim.jpg' for w in ws])
