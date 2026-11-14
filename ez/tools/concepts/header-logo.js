const fs=require('fs');const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/';
const svg=fs.readFileSync('/home/user/Tokengame/ez/tools/concepts/ez-logo-traced.svg','utf8');
const noDisc=svg.replace(/<circle[^>]*\/>/,'');
const opts=[
 ['now',null,''],
 ['A',svg,'html.x2p .brand .mark.lg{background:none!important;border:0!important;box-shadow:none!important;padding:0!important;width:40px;height:40px}'],
 ['B',svg,'html.x2p .brand .mark.lg{background:none!important;border:0!important;box-shadow:none!important;padding:0!important;width:46px;height:46px}'],
 ['C',noDisc,'html.x2p .brand .mark.lg{background:none!important;border:0!important;box-shadow:none!important;padding:0!important;width:46px;height:46px}'],
 ['D',svg,'html.x2p .brand .mark.lg{background:none!important;border:0!important;box-shadow:none!important;padding:0!important;width:46px;height:46px} html.x2p .brand b{display:none!important}'],
];
(async()=>{const b=await chromium.launch();
for(const w of [390,1280]){for(const [k,s,css] of opts){const p=await b.newPage({viewport:{width:w,height:844},deviceScaleFactor:2});
await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForTimeout(4500);
if(s)await p.evaluate(([s,css])=>{const m=document.querySelector('.brand .mark');m.classList.add('lg');m.innerHTML=s.replace('<svg ','<svg style="width:100%;height:100%;display:block" ');const st=document.createElement('style');st.textContent=css;document.head.appendChild(st)},[s,css]);
await p.waitForTimeout(300);await p.screenshot({path:S+'hm-'+w+'-'+k+'.png',clip:{x:0,y:0,width:w==390?390:700,height:70}});await p.close()}}
await b.close()})();
