# python3 mkmarks.py : copies the four tryout labs' one-colour marks into marks.json. Qwen, Mistral, Gemini from x2plus.js's No. 5 ticket
# (C5); Nemotron (NVIDIA's mark, Simple Icons) from launch-r34-five/_data.js, since x2plus.js does not carry it. Read only.
import re,json
R='/home/user/Tokengame/ez/tools/'
s=open(R+'v22/x2plus.js').read();c5=re.search(r'var C5=(\[.*?\]);',s,re.S).group(1)
M={}
for m in re.finditer(r'\{n:"(\w+)",lab:"([^"]+)",cc:"(\w+)",c:"([^"]*)",(fr:1,)?d:"([^"]+)"\}',c5):M[m.group(1)]={'lab':m.group(2),'cc':m.group(3),'fr':bool(m.group(5)),'d':m.group(6)}
d=open(R+'concepts/launch-r34-five/_data.js').read();a=json.loads(re.search(r'next:(\[.*?\])\s*[,}]',d,re.S).group(1))
n=[x for x in a if x['name']=='Nemotron'][0];M['Nemotron']={'lab':'NVIDIA','cc':'US','fr':bool(n.get('fr')),'d':n['d']}
json.dump(M,open('marks.json','w'));print({k:(v['lab'],v['cc'],len(v['d'])) for k,v in M.items()})
