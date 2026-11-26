// Round 30 boards: today's film frame and the five mockups, from launch-r30-frame.js's shots.
// usage: node launch-r30-board.js <captions.json> <outprefix>   captions.json: [{id,n,title,plain}] (id "now" = today)
// writes <outprefix>-1.png (first screen of a 390x844 phone, side by side), -2.png (the frames close up at 390), -3.png (desktop 1280)
const fs=require('fs');const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/frame/out/';
const caps=JSON.parse(fs.readFileSync(process.argv[2],'utf8')),out=process.argv[3];
const img=f=>'data:image/png;base64,'+fs.readFileSync(S+f).toString('base64');
const num=id=>{const j=JSON.parse(fs.readFileSync(S+id+'.json','utf8'));const a=j['390'],d=j['1280'];
  return `Picture shown: ${(100-a.coveredPx.pct).toFixed(1)}% on a phone, ${(100-d.coveredPx.pct).toFixed(1)}% on desktop · film ${Math.round(a.film[2])}px wide on a 390px phone`};
const css=`body{margin:0;background:#0b0a14;color:#efe4c8;font:500 15px/1.35 Barlow,system-ui,sans-serif;padding:28px}
h1{font:400 34px/1 Anton,Impact,sans-serif;letter-spacing:.03em;margin:0 0 6px;text-transform:uppercase}h1+p{margin:0 0 22px;color:#bdb39b;max-width:1100px}
.g{display:grid;gap:22px}.c h2{font:400 21px/1 Anton,Impact,sans-serif;letter-spacing:.04em;margin:0 0 6px;text-transform:uppercase}.c h2 b{color:#f2b632;font-weight:400;margin-right:8px}
.c p{margin:0 0 10px;color:#d8cfb8;font-size:14px}.c .m{font:700 12px/1.3 'Barlow Condensed',sans-serif;letter-spacing:.04em;color:#a99f88;text-transform:uppercase;margin:0 0 10px}
.c img{display:block;width:100%;border:1px solid #2a2733}`;
(async()=>{const b=await chromium.launch({args:['--proxy-server='+process.env.HTTPS_PROXY,'--ignore-certificate-errors-spki-list='+fs.readFileSync('/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/x2p/spki.txt','utf8').trim()]});
const fonts='<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Barlow:wght@500;700&family=Barlow+Condensed:wght@700&display=swap">';
const boards=[
 {f:'-1',W:caps.length*330+28*2+22*(caps.length-1),cols:`repeat(${caps.length},1fr)`,h:'The first screen on a 390px phone',p:'Today on the left, then the five frames. Same page, same film, same bet ticket under it; only the frame changes.',shot:id=>id+'-390.png',small:true},
 {f:'-2',W:1400,cols:'repeat(3,1fr)',h:'The frames up close, 390px phone',p:'Shot at twice the phone\'s pixels. The numbers are measured on the page: how much of the film\'s picture you can see, and how wide the film is.',shot:id=>id+'-390-close.png'},
 {f:'-3',W:1400,cols:'repeat(2,1fr)',h:'On desktop, 1280px',p:'The film keeps its 560px; the frame grows around it.',shot:id=>id+'-1280-close.png'},
];
for(const B of boards){const p=await b.newPage({viewport:{width:B.W,height:900},deviceScaleFactor:1});
 const cells=caps.map(c=>`<div class="c"><h2><b>${c.n}</b>${c.title}</h2>${B.small?'':`<p>${c.plain}</p>`}<div class="m">${num(c.id)}</div><img src="${img(B.shot(c.id))}"></div>`).join('');
 await p.setContent(`<!doctype html><html><head>${fonts}<style>${css}</style></head><body><h1>${B.h}</h1><p>${B.p}</p><div class="g" style="grid-template-columns:${B.cols}">${cells}</div></body></html>`,{waitUntil:'networkidle'});
 await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:out+B.f+'.png',fullPage:true});await p.close()}
await b.close();console.log('ok')})();
