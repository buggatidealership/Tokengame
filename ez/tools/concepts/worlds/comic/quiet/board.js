// node board.js <shots dir> <out png> : labelled board of the C/D mockups (phone rows) and <out>-desktop
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs'),path=require('path');
const D=process.argv[2],OUT=process.argv[3];const im=f=>'data:image/png;base64,'+fs.readFileSync(path.join(D,f)).toString('base64');
const L={now:'Today',C1:'C1 · cover in two faces',C2:'C2 · + header in Bangers',D:'D · no halftone, no tilts',D2:'D2 · D + plain tags, sentence case',C2D2:'C2 + D2'};
const row=(t,part,vs,w)=>`<h2>${t}</h2><div class=r>${vs.map(v=>`<figure><figcaption>${L[v]}</figcaption><img style="width:${w}px" src="${im(`${part}-${v}.png`)}"></figure>`).join('')}</div>`;
const page=b=>`<style>body{margin:0;padding:24px;background:#1b181c;color:#f8f0d9;font:600 15px system-ui}h2{font-size:20px;margin:22px 0 10px}.r{display:flex;gap:18px}figure{margin:0}figcaption{margin:0 0 6px;color:#fdbc2a}img{display:block;border:1px solid #444}</style>${b}`;
(async()=>{const br=await chromium.launch();let p=await br.newPage({viewport:{width:1700,height:800}});
 await p.setContent(page(row('First screen, 390x844','390-top',['now','C1','C2','D','D2','C2D2'],260)+row('Last round','390-wclr',['now','D','D2','C2D2'],260)+row('Meet the cast','390-wcchars',['now','D','D2','C2D2'],260)));await p.waitForTimeout(500);await p.screenshot({path:OUT+'.png',fullPage:true});
 p=await br.newPage({viewport:{width:1700,height:800}});await p.setContent(page(row('Desktop, 1280x800','1280-top',['now','C2D2'],800)));await p.waitForTimeout(500);await p.screenshot({path:OUT+'-desktop.png',fullPage:true});await br.close()})();
