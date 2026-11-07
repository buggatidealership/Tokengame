// node board.js <shots dir> <out prefix> : boards of the three ticket takes (phone rows per box type; desktop per box type)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs'),path=require('path');
const D=process.argv[2],OUT=process.argv[3];const im=f=>fs.existsSync(path.join(D,f))?'data:image/png;base64,'+fs.readFileSync(path.join(D,f)).toString('base64'):'';
const L={now:'Today',t1:'1 · Comic Admit One',t2:'2 · Fight night',t3:"3 · The live site's paper"};
const K={tn:'Tomorrow at the close',bi:'Every round so far',ch:'Meet the models',cn:'Smart or lucky'};
const row=(W,k,w)=>`<h2>${K[k]}</h2><div class=r>${['now','t1','t2','t3'].map(t=>`<figure><figcaption>${L[t]}</figcaption><img style="width:${w}px" src="${im(`${W}-${k}-${t}.png`)}"></figure>`).join('')}</div>`;
const page=b=>`<style>body{margin:0;padding:24px;background:#1b181c;color:#f8f0d9;font:600 15px system-ui}h1{font-size:24px;margin:0 0 6px}p{margin:0 0 10px;color:#cfc6b2;max-width:1100px}h2{font-size:20px;margin:26px 0 10px}.r{display:flex;gap:18px;align-items:flex-start}figure{margin:0}figcaption{margin:0 0 6px;color:#fdbc2a}img{display:block;border:1px solid #444}</style>${b}`;
const intro=`<h1>X3+ boxes as tickets: three takes, real data</h1><p>Rule from the research: ticket chrome at the edges, the numbers on a plain ground (no texture behind digits).</p>`;
(async()=>{const br=await chromium.launch();
 for(const k of ['tn','bi','ch','cn']){let p=await br.newPage({viewport:{width:1700,height:800}});
  await p.setContent(page(intro+row(390,k,380)));await p.waitForTimeout(400);await p.screenshot({path:`${OUT}-${k}.png`,fullPage:true});await p.close()}
 let p=await br.newPage({viewport:{width:1700,height:800}});
 await p.setContent(page(intro+['tn','ch'].map(k=>`<h2>${K[k]} · desktop</h2>`+['t1','t2','t3'].map(t=>`<figure><figcaption>${L[t]}</figcaption><img style="width:1100px" src="${im(`1440-${k}-${t}.png`)}"></figure>`).join('')).join('')));
 await p.waitForTimeout(400);await p.screenshot({path:`${OUT}-desktop.png`,fullPage:true});await br.close()})();
