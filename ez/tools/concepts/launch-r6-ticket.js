// "As it stands" ticket, round 6b (owner, 2026-10-22: "the writing stays the same. Just the ticket and the font"; Grok in
// gold): the bet ticket's paper and bands, the same sentence, full board width. 1 strip, 2 with a stub (the leader's logo),
// 3 three lines with Grok big
const { chromium } = require('playwright');const fs=require('fs');
const V=process.argv[2]||'1',W=+process.argv[3]||412,H=+process.argv[4]||863;
(async()=>{const b=await chromium.launch({args:['--ignore-certificate-errors-spki-list='+fs.readFileSync(process.env.SPKI_FILE||'spki.txt','utf8').trim()]});
const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html');await p.waitForTimeout(2800);await p.evaluate(()=>document.fonts.ready);
await p.evaluate((V)=>{const bt=document.querySelector('.x2p-bt'),ft=document.querySelector('#standings .x2p-lbfoot'),st0=ft.querySelector('.x2p-say .st');
  const em0=st0.querySelector('em'),nm=em0.textContent.trim();
  // the sentence exactly as the page writes it, the leader's name swapped for the gold one
  const parts=[...st0.childNodes].map(n=>n.nodeType===3?n.nodeValue:(n===em0?null:n.textContent));
  const before=parts.slice(0,parts.indexOf(null)).join(''),after=parts.slice(parts.indexOf(null)+1).join('');
  const t=bt.cloneNode(true);t.querySelectorAll('[id]').forEach(e=>e.removeAttribute('id'));t.classList.add('mk-tk','mk-'+V);
  t.querySelector('.bt-hd').innerHTML='<span class="l"><i></i><i></i><i></i></span><span class="r"></span>';
  t.querySelector('.bt-ft').innerHTML='<span class="l"></span><span class="r e"></span>';
  const lb=t.querySelector('.bt-b'),sx=t.querySelector('.bt-s');
  const say=V==='3'?'<span class="mk-w">'+before.trim()+'</span><em data-t="'+nm+'">'+nm+'</em><span class="mk-w">'+after.trim()+'</span>'
                   :'<span class="mk-w">'+before+'</span><em data-t="'+nm+'">'+nm+'</em><span class="mk-w">'+after+'</span>';
  lb.innerHTML='<div class="x2p-cdh mk-cdh"><b>'+say+'</b></div>';
  if(V==='2'){const lg=document.querySelector('#standings li.lbr .lg').cloneNode(true);lg.style.transform='';sx.innerHTML='';const w=document.createElement('div');w.className='mk-stub';w.appendChild(lg);sx.appendChild(w)}else sx.remove();
  ft.innerHTML='';ft.appendChild(t);ft.style.display='block'},V);
await p.addStyleTag({content:`
 html.x2p #standings .x2p-lbfoot{margin-top:22px!important}
 html.x2p #standings .mk-tk{margin:0!important;max-width:none!important;transform:rotate(-.7deg);transform-origin:50% 50%}
 html.x2p #standings .mk-1,html.x2p #standings .mk-3{--px:calc(100% + 60px)!important}
 html.x2p #standings .mk-1 .bt-p,html.x2p #standings .mk-3 .bt-p{grid-template-columns:1fr!important}
 html.x2p #standings .mk-tk .bt-hd{justify-content:center!important}
 html.x2p #standings .mk-tk .bt-hd .r,html.x2p #standings .mk-tk .bt-ft .r{display:none!important}
 html.x2p #standings .mk-2{--px:calc(100% - 84px)!important}
 html.x2p #standings .mk-2 .bt-p{grid-template-columns:minmax(0,1fr) 84px!important}
 html.x2p #standings .mk-2 .mk-cdh b{white-space:normal!important}
 html.x2p #standings .mk-1 .mk-cdh b{font-size:14.5px!important;letter-spacing:.02em!important}
 html.x2p #standings .mk-1 .mk-cdh b em{font-size:21px!important}
 html.x2p #standings .mk-1 .bt-b{padding:0 14px!important}
 html.x2p #standings .mk-2 .bt-b{padding:0 12px 0 18px!important}
 html.x2p #standings .mk-tk .bt-b{padding:0 20px!important}
 html.x2p #standings .mk-cdh b{white-space:normal;text-wrap:balance;display:block!important;text-align:center;font:800 16px/1.25 'Barlow Condensed',Barlow,sans-serif!important;letter-spacing:.04em!important;text-transform:uppercase;color:#141217!important;-webkit-text-fill-color:#141217;background:none!important;filter:none!important;text-shadow:0 .9px 0 rgba(255,251,238,.75)!important}
 html.x2p #standings .mk-cdh b .mk-w{display:inline!important}
 html.x2p #standings .mk-cdh b em{display:inline-block!important;font-size:23px!important;line-height:1!important;vertical-align:-1px;margin:0 2px}
 html.x2p #standings .mk-3 .mk-cdh b .mk-w{display:block!important}
 html.x2p #standings .mk-3 .mk-cdh b em{display:block!important;font-size:44px!important;margin:6px 0 4px}
 html.x2p #standings .mk-stub{display:flex;justify-content:center;align-items:center;width:100%}
 html.x2p #standings .mk-stub .lg{width:40px!important;height:40px!important;border-radius:9px}
 html.x2p #standings .mk-stub .lg svg{width:26px;height:26px}`});
await p.waitForTimeout(500);
const r=await p.evaluate(()=>{const a=document.querySelector('#standings li.lbr').getBoundingClientRect(),t=document.querySelector('#standings .mk-tk .bt-p').getBoundingClientRect();return {board:[Math.round(a.left),Math.round(a.right)],ticket:[Math.round(t.left),Math.round(t.right)],text:document.querySelector('#standings .mk-cdh').textContent}});
const st=await p.$('#standings');await st.screenshot({path:'tk'+V+'-'+W+'.png'});
console.log(V,JSON.stringify(r),errs.length?errs:'ok');await b.close()})();
