const {chromium}=require('playwright');const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/bgb';require('fs').mkdirSync(S,{recursive:true});
const BGS=['ground-black','bk1-velvet','bk2-gloss','bk3-matte','bk4-obsidian','bk5-smoke'];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});const e=[];p.on('pageerror',x=>e.push(x.message));
await p.goto('http://localhost:8996/tools/concepts/resolution/animA5.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);
for(const bg of BGS){await p.evaluate(bg=>{const el=document.getElementById('bg');el.style.backgroundImage=`url(../launchvid/hedra/img/${bg}.jpg)`;el.style.filter=bg==='ground-black'?'brightness(.72) saturate(1.1)':'none'},bg);
 for(const t of [15.5,22.0]){const r=await p.evaluate(t=>window.R(t),t);if(r&&r.then)await r;await p.waitForTimeout(250);await p.screenshot({path:`${S}/${bg}-${t}.jpg`,type:'jpeg',quality:88})}}
console.log('errs',e.join('|')||'none');await b.close()})();
