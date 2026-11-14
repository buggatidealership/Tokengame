// node ink.js W : shoots the first bell row at DPR 3 and checks the INK of every number and word against its flap face centre (pixels, not boxes)
const {chromium}=require('/opt/node-tools/node_modules/playwright');const fs=require('fs');const FONTS=require('../../../../../live-r1/_fonts.js');
const OUT='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/up40/';
(async()=>{const w=+process.argv[2];const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:w,height:844},deviceScaleFactor:3,isMobile:w<700,reducedMotion:'reduce'});
 const p=await ctx.newPage();await FONTS(p);const t=Date.parse(process.env.NOW||'2026-11-03T12:00:00Z');
 await p.addInitScript(t=>{const D=Date,off=t-D.now();class F extends D{constructor(...a){if(!a.length)super(D.now()+off);else super(...a)}static now(){return D.now()+off}};window.Date=F},t);
 await p.goto('http://127.0.0.1:8994/v46-live-x2plus.html#/upcoming',{waitUntil:'load'});await p.waitForFunction(()=>document.querySelector('.u3-root .ud-tr'),null,{timeout:90000});
 await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);
 const out=[];for(const sel of ['.ud-b1 .ud-row:nth-child(1)','.ud-b1 .ud-row:nth-child(2)']){const el=await p.$(sel);await el.scrollIntoViewIfNeeded();await p.waitForTimeout(200);
  const faces=await p.evaluate(s=>{const li=document.querySelector(s),o={left:0,top:0};return [...li.querySelectorAll('.ud-tv,.ud-tw')].map(e=>{const r=e.getBoundingClientRect(),c=getComputedStyle(e),bw=parseFloat(c.borderLeftWidth),bt=parseFloat(c.borderTopWidth);
   return {k:e.className,t:e.textContent,x:r.left-o.left+bw,y:r.top-o.top+bt,w:r.width-2*bw,h:r.height-2*bt}})},sel);
  const buf=await p.screenshot();fs.writeFileSync(OUT+'ink.png',buf);
  const {execFileSync}=require('child_process');
  const res=JSON.parse(execFileSync('/usr/bin/python3',['-c',`
import json,sys
from PIL import Image
im=Image.open('${OUT}ink.png').convert('RGB');F=json.loads(sys.argv[1]);o=[]
for f in F:
  if not f['t']:continue
  x0,y0,x1,y1=[int(round(v*3)) for v in (f['x'],f['y'],f['x']+f['w'],f['y']+f['h'])];X=[];Y=[]
  for y in range(y0+3,y1-3):
    for x in range(x0+3,x1-3):
      r,g,b=im.getpixel((x,y))
      if (g>140 and g-r>60) or (r>150 and r-g>70):X.append(x);Y.append(y)
  if not X:o.append([f['t'],None]);continue
  o.append([f['t'],round(((min(X)+max(X))/2-(x0+x1)/2)/3,2),round(((min(Y)+max(Y))/2-(y0+y1)/2)/3,2)])
print(json.dumps(o))`,JSON.stringify(faces)]).toString());out.push(...res)}
 console.log(w,JSON.stringify(out));await b.close()})();
