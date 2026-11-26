import re,os,json
out={}
for k in ['g1','g2','g3','g4','g5','g6']:
  s=open(k+'.css').read()
  desk=set();ph=set()
  # strip desktop blocks
  i=0;rest=''
  while True:
    j=s.find('@media (min-width:1000px){',i)
    if j<0:rest+=s[i:];break
    rest+=s[i:j];d=0;e=j+len('@media (min-width:1000px)')
    for e2 in range(e,len(s)):
      d+= s[e2]=='{';d-= s[e2]=='}'
      if d==0:break
    desk|=set(re.findall(r'img/web/[\w.-]+',s[j:e2]));i=e2+1
  allu=set(re.findall(r'img/web/[\w.-]+',rest))
  # overridden phone url in g1/g3: the later rule wins; drop superseded
  sup={'g1':['img/web/g1-city-phone.jpg'],'g3':[]}.get(k,[])
  ph=allu-set(sup)
  kb=lambda S:round(sum(os.path.getsize(f) for f in S)/1024)
  out[k]={'phone_kb':kb(ph),'desktop_kb':kb((ph-{u for u in ph if 'phone' in u or (k in('g3','g5') and u.replace('.jpg','-desk.jpg') in desk)})|desk),'phone':sorted(ph),'desk':sorted(desk)}
  print(k,out[k]['phone_kb'],out[k]['desktop_kb'],sorted(ph))
json.dump(out,open('weight.json','w'),indent=1)
