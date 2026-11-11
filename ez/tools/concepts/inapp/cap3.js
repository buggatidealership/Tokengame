// G3: the desktop board's header and both live cards in one 4x shot (x 0..1440, y 0..900 CSS px) -> scr/d-all.png
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const c=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:4,timezoneId:'America/New_York'});const p=await c.newPage();
await p.clock.setFixedTime(new Date('2026-11-11T19:20:00Z'));await p.goto('http://localhost:8997/#next');await p.waitForTimeout(2600);await p.screenshot({path:__dirname+'/scr/d-all.png',clip:{x:0,y:0,width:1440,height:900}});await b.close()})();
