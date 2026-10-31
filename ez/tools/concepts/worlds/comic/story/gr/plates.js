// node plates.js <outdir>: renders the four model name plates in the green room video's own poster style (transparent PNGs, 2x the source's pixels)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const OUT=process.argv[2];
// box = the founder plate in the source frame (854x480) that each one covers
const P=[{k:'claude',t:'CLAUDE',w:212,h:62,st:'frame',acc:'#d8b25a'},{k:'gpt',t:'GPT',w:350,h:84,st:'stars',acc:'#2fbf6a'},
 {k:'grok',t:'GROK',w:320,h:96,st:'brush',acc:'#d63a2e'},{k:'kimi',t:'KIMI',w:268,h:82,st:'rule',acc:'#d63a2e'}];
const html=p=>`<html><head><link href="https://fonts.googleapis.com/css2?family=Ultra&display=block" rel="stylesheet"><style>
html,body{margin:0;background:transparent}
.pl{position:relative;width:${p.w}px;height:${p.h}px;display:grid;place-items:center;font:400 ${p.st==='brush'?62:p.st==='frame'?36:52}px/1 Ultra,serif;color:#efe2c2;letter-spacing:.02em;filter:url(#rough)}
.bg{position:absolute;inset:${p.st==='brush'?'6px 0':'4px'};background:#14110f;${p.st==='frame'?'border-radius:5px;box-shadow:inset 0 0 0 2px #14110f,inset 0 0 0 4px #e6d6b0;':''}${p.st==='brush'||p.st==='stars'?'clip-path:polygon(1% 12%,8% 4%,30% 9%,55% 2%,80% 8%,99% 3%,97% 40%,100% 88%,70% 96%,40% 90%,12% 98%,0 85%,3% 50%)':''}}
.t{position:relative;text-shadow:0 2px 0 #000;}
.orn{position:absolute;top:50%;width:22%;height:2px;background:${p.acc};}
.orn.l{left:4%}.orn.r{right:4%}.orn::after{content:'★';position:absolute;top:-11px;font:16px/1 serif;color:${p.acc}}.orn.l::after{right:-4px}.orn.r::after{left:-4px}
.rule{position:absolute;left:6%;right:6%;bottom:8px;height:3px;background:${p.acc}}
.spl{position:absolute;right:2%;top:10%;width:18%;height:70%;background:radial-gradient(circle at 40% 40%,${p.acc} 0 18%,transparent 19%),radial-gradient(circle at 75% 70%,${p.acc} 0 9%,transparent 10%),radial-gradient(circle at 20% 80%,${p.acc} 0 6%,transparent 7%);opacity:.8}
</style></head><body><svg width="0" height="0" style="position:absolute"><filter id="rough"><feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -9 0 0 0 6.2"/><feComposite in="SourceGraphic" operator="in"/></filter></svg>
<div class="pl"><i class="bg"></i>${p.st==='stars'?'<i class="orn l"></i><i class="orn r"></i>':''}${p.st==='rule'?'<i class="rule"></i>':''}${p.st==='brush'?'<i class="rule" style="height:5px;bottom:10px;transform:skewX(-20deg)"></i>':''}<b class="t" style="font-weight:400">${p.t}</b></div></body></html>`;
(async()=>{const b=await chromium.launch();for(const p of P){const pg=await b.newPage({viewport:{width:p.w,height:p.h},deviceScaleFactor:2});await FONTS(pg);
 await pg.setContent(html(p),{waitUntil:'networkidle'});await pg.evaluate(()=>document.fonts.ready);await pg.waitForTimeout(200);
 await pg.screenshot({path:`${OUT}/plate-${p.k}.png`,omitBackground:true});await pg.close()}await b.close()})();
