// Founders behind the cards, a layout mockup: the portrait replaces the flag, the flag becomes a patch by the name.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fonts=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const out=process.argv[2];
for(const W of [390]){const p=await b.newPage({viewport:{width:W,height:900},deviceScaleFactor:2});await fonts(p);
await p.goto('http://localhost:8897/v47-live-x3plus.html',{waitUntil:'load'});await p.waitForFunction(()=>document.documentElement.classList.contains('p1-on'),null,{timeout:60000});
await p.evaluate(()=>document.querySelector('.wc-chars').scrollIntoView());await p.waitForTimeout(2500);
await p.addStyleTag({content:`
.fb-port{position:absolute;inset:0;background-size:cover;background-position:50% 18%;filter:saturate(1.15) contrast(1.08)}
.fb-port:after{content:"";position:absolute;inset:0;background:radial-gradient(circle,rgba(13,11,16,.55) 1.3px,transparent 1.8px) 0 0/7px 7px;-webkit-mask:linear-gradient(90deg,transparent 35%,#000 95%);mask:linear-gradient(90deg,transparent 35%,#000 95%)}
.fb-tint{position:absolute;inset:0;mix-blend-mode:multiply;opacity:.45}
.pp1-c.fb-on .pp1-top{min-height:210px;flex-direction:column;align-items:flex-start;justify-content:flex-end;gap:4px}.pp1-c.fb-on .pp1-nm{max-width:52%}.pp1-c.fb-on .pp1-fl{left:38%!important}.pp1-c.fb-on .fb-port{background-position:50% 10%;-webkit-mask:linear-gradient(90deg,transparent 0,#000 18%),linear-gradient(180deg,#000 66%,transparent 82%);-webkit-mask-composite:source-in;mask:linear-gradient(90deg,transparent 0,#000 18%) intersect,linear-gradient(180deg,#000 66%,transparent 82%)}.pp1-c.fb-on .pp1-nm{text-shadow:0 0 0 #000}
.fb-patch{display:inline-block;width:30px;height:20px;border:2.5px solid #0d0b10;box-shadow:2px 2px 0 #0d0b10;transform:rotate(-6deg);margin-left:6px;vertical-align:middle;overflow:hidden;background:#fff}
.fb-patch svg{width:100%;height:100%;display:block}`});
await p.evaluate(()=>{const map={CLAUDE:['/tools/concepts/worlds/comic/story/y/fb/claude-src.jpg','#d97757'],GPT:['/tools/concepts/worlds/comic/story/y/fb/gpt-src.jpg','#10a37f']};
 for(const [m,[u,c]] of Object.entries(map)){const card=document.querySelector(`.pp1-c[data-m="${m}"]`);if(!card)continue;const fl=card.querySelector('.pp1-fl');card.classList.add('fb-on');
  fl.innerHTML=`<div class="fb-port" style="background-image:url(${u})"></div><div class="fb-tint" style="background:${c}"></div>`;
  const nm=card.querySelector('.pp1-ver');nm.insertAdjacentHTML('afterend',`<span class="fb-patch"><svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#fff"/>${[0,2,4,6].map(i=>`<rect y="${i*20/7}" width="30" height="${20/7}" fill="#e0241c"/>`).join('')}<rect width="13" height="${20/7*4}" fill="#1d3fb0"/></svg></span>`)}});
await p.evaluate(()=>{for(const m of ['CLAUDE','GPT'])document.querySelector(`.pp1-c[data-m="${m}"]`).scrollIntoView({block:'center'})});await p.waitForTimeout(4000);await p.evaluate(()=>window.dispatchEvent(new Event('resize')));await p.waitForTimeout(800);const sec=await p.$('.pp1-c[data-m="CLAUDE"]');const s2=await p.$('.pp1-c[data-m="GPT"]');await sec.screenshot({path:out});await s2.screenshot({path:out.replace('.png','-gpt.png')});await p.close()}await b.close()})();
