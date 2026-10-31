// Round 31 boards from launch-r31.js's shots: usage node launch-r31-board.js <spec.json> -> one PNG per board in the spec
// spec: [{out, title, note, cols, width, items:[{n, title, caption, img}]}]; img paths are relative to the shots folder
const fs=require('fs');const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/';
const spec=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));const DIR=S+'bet/out/';
const img=f=>'data:image/png;base64,'+fs.readFileSync(f.startsWith('/')?f:DIR+f).toString('base64');
const css=`body{margin:0;background:#0b0a14;color:#efe4c8;font:500 15px/1.35 Barlow,system-ui,sans-serif;padding:28px}
h1{font:400 34px/1 Anton,Impact,sans-serif;letter-spacing:.03em;margin:0 0 8px;text-transform:uppercase}h1+p{margin:0 0 22px;color:#bdb39b;max-width:1150px}
.g{display:grid;gap:22px;align-items:start}.c h2{font:400 21px/1 Anton,Impact,sans-serif;letter-spacing:.04em;margin:0 0 6px;text-transform:uppercase}.c h2 b{color:#f2b632;font-weight:400;margin-right:8px}
.c p{margin:0 0 10px;color:#d8cfb8;font-size:14px}.c img{display:block;width:100%;border:1px solid #2a2733}`;
(async()=>{const b=await chromium.launch({args:['--proxy-server='+process.env.HTTPS_PROXY,'--ignore-certificate-errors-spki-list='+fs.readFileSync(S+'x2p/spki.txt','utf8').trim()]});
const fonts='<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Barlow:wght@500;700&display=swap">';
for(const B of spec){const p=await b.newPage({viewport:{width:B.width||1400,height:900}});
 const cells=B.items.map(c=>`<div class="c"><h2><b>${c.n}</b>${c.title}</h2><p>${c.caption}</p><img src="${img(c.img)}"></div>`).join('');
 await p.setContent(`<!doctype html><html><head>${fonts}<style>${css}</style></head><body><h1>${B.title}</h1><p>${B.note}</p><div class="g" style="grid-template-columns:repeat(${B.cols},1fr)">${cells}</div></body></html>`,{waitUntil:'networkidle'});
 await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:B.out,fullPage:true});await p.close();console.log('ok',B.out)}
await b.close()})();
