// "Tap to play" becomes a play icon (owner, 2026-10-22): A gold disc at the bottom, B gold square chip (the site's cel look),
// C a bigger disc in the middle of the film
const { chromium } = require('playwright');const fs=require('fs');
const SR="html.x2p .x2p-vt .vt-play span{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}";
const CSS={
 now:'',
 A:SR+`html.x2p .x2p-vt .vt-play{width:38px;height:38px;padding:0!important;border-radius:50%!important;justify-content:center;gap:0!important;bottom:12px!important;box-shadow:2px 2px 0 #000!important}
   html.x2p .x2p-vt .vt-play i{margin-left:3px;border-left-width:12px!important;border-top-width:7.5px!important;border-bottom-width:7.5px!important}`,
 B:SR+`html.x2p .x2p-vt .vt-play{width:36px;height:30px;padding:0!important;justify-content:center;gap:0!important;bottom:12px!important}
   html.x2p .x2p-vt .vt-play i{margin-left:2px;border-left-width:11px!important;border-top-width:7px!important;border-bottom-width:7px!important}`,
 C:SR+`html.x2p .x2p-vt .vt-play{width:56px;height:56px;padding:0!important;border-radius:50%!important;justify-content:center;gap:0!important;bottom:auto!important;top:50%;transform:translate(-50%,-50%)!important;box-shadow:3px 3px 0 #000!important;background:rgba(242,182,50,.94)!important}
   html.x2p .x2p-vt .vt-play i{margin-left:5px;border-left-width:18px!important;border-top-width:11px!important;border-bottom-width:11px!important}`};
(async()=>{const b=await chromium.launch({args:['--ignore-certificate-errors-spki-list='+fs.readFileSync(process.env.SPKI_FILE||'spki.txt','utf8').trim()]});
for(const k of ['now','A','B','C']){const p=await b.newPage({viewport:{width:412,height:863},deviceScaleFactor:2});
 await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html');await p.waitForTimeout(2500);await p.evaluate(()=>document.fonts.ready);
 if(CSS[k])await p.addStyleTag({content:CSS[k]});await p.waitForTimeout(300);
 const el=await p.$('.x2p-vt');const bb=await el.boundingBox();await p.screenshot({path:'play-'+k+'.png',clip:{x:0,y:bb.y-24,width:412,height:bb.height+40}});await p.close()}
await b.close()})();
