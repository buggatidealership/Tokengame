// Tabs at launch (owner, 2026-10-22): A two tabs sharing the full width; B a third "Buybacks" tab marked soon
const { chromium } = require('playwright');const fs=require('fs');
const CSS={
 now:'',
 A:`@media (max-width:759.98px){html.x2p-launch .nav{display:grid!important;grid-template-columns:1fr 1fr;gap:10px!important;width:100%}
    html.x2p-launch .nav a{justify-content:center!important;text-align:center;display:flex!important;align-items:center}}`,
 B:`@media (max-width:759.98px){html.x2p-launch .nav{display:grid!important;grid-template-columns:1fr 1fr 1fr;gap:8px!important;width:100%}
    html.x2p-launch .nav a,html.x2p-launch .nav .soon{justify-content:center!important;text-align:center;display:flex!important;align-items:center}}
    html.x2p-launch .nav .soon{display:flex;align-items:center;padding:0 10px}
    html.x2p-launch .nav .soon{gap:6px;color:rgba(243,234,214,.42);font:inherit;text-transform:uppercase;letter-spacing:inherit;cursor:default;white-space:nowrap}
    html.x2p-launch .nav .soon small{font:800 8.5px/1 'Barlow Condensed',sans-serif;letter-spacing:.14em;padding:3px 5px 2px;border:1px solid rgba(242,182,50,.55);color:#f2b632;border-radius:2px}`};
(async()=>{const b=await chromium.launch({args:['--ignore-certificate-errors-spki-list='+fs.readFileSync(process.env.SPKI_FILE||'spki.txt','utf8').trim()]});
for(const [W,H] of [[412,300],[1280,200]])for(const k of ['now','A','B']){
 const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});
 await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html');await p.waitForTimeout(2500);await p.evaluate(()=>document.fonts.ready);
 if(k==='B')await p.evaluate(()=>{const n=document.querySelector('.nav'),s=document.createElement('span');s.className='soon';s.setAttribute('aria-disabled','true');s.innerHTML='Buybacks <small>Soon</small>';n.appendChild(s)});
 if(CSS[k])await p.addStyleTag({content:CSS[k]});await p.waitForTimeout(300);
 const hd=await p.$('header.top');await hd.screenshot({path:'nav-'+k+'-'+W+'.png'});await p.close()}
await b.close()})();
