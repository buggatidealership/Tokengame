// "As it stands" ticket, round 6e (owner, 2026-10-22: "More like this", pointing at the bet ticket): the bet ticket itself, small
// and tilted, the same paper, bands, frame, ink and NVIDIA gold; the words stay as they are.
// 1 three lines (like BET #1: / NVIDIA / stars); 2 the same with a stub holding the leader's logo; 3 one line with stars;
// 4 three lines with the film ticket's scalloped sides instead of the notches
const { chromium } = require('playwright');const fs=require('fs');
const V=process.argv[2]||'1',W=+process.argv[3]||412,H=+process.argv[4]||863;
const SZ={'1':'58%','2':'68%','3':'66%','4':'60%'},ROT={'1':-2.4,'2':-1.8,'3':-2.2,'4':-2.8};
(async()=>{const b=await chromium.launch({args:['--ignore-certificate-errors-spki-list='+fs.readFileSync(process.env.SPKI_FILE||'spki.txt','utf8').trim()]});
const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});
await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html');await p.waitForTimeout(2800);await p.evaluate(()=>document.fonts.ready);
await p.evaluate((V)=>{const bt=document.querySelector('.x2p-bt'),ft=document.querySelector('#standings .x2p-lbfoot'),st0=ft.querySelector('.x2p-say .st'),em0=st0.querySelector('em'),nm=em0.textContent.trim();
  const parts=[...st0.childNodes].map(n=>n.nodeType===3?n.nodeValue:(n===em0?null:n.textContent)),i=parts.indexOf(null),before=parts.slice(0,i).join('').trim(),after=parts.slice(i+1).join('').trim();
  const t=bt.cloneNode(true);t.querySelectorAll('[id]').forEach(e=>e.removeAttribute('id'));t.classList.add('mk-tk','mk-'+V);
  t.querySelector('.bt-hd').innerHTML='<span class="l"><i></i>★ ★ ★<i></i></span><span class="r"></span>';
  t.querySelector('.bt-ft').innerHTML='<span class="l"></span><span class="r e"></span>';
  const lb=t.querySelector('.bt-b'),sx=t.querySelector('.bt-s');
  lb.innerHTML='<div class="x2p-cdh mk-cdh"><b><span class="bt-ink">'+before+'</span> <em data-t="'+nm+'">'+nm+'</em> <span class="bt-ink">'+after+'</span></b></div><div class="bt-mk" aria-hidden="true"><i></i><i></i><i></i></div>';
  if(V==='2'){const lg=document.querySelector('#standings li.lbr .lg').cloneNode(true);lg.style.transform='';sx.innerHTML='';const w=document.createElement('div');w.className='mk-stub';w.appendChild(lg);sx.appendChild(w)}else sx.remove();
  ft.innerHTML='';const wr=document.createElement('div');wr.className='mk-wrap';wr.appendChild(t);ft.appendChild(wr);ft.style.cssText='display:flex!important;justify-content:center;margin-top:26px'},V);
const SCAL="-webkit-mask:radial-gradient(circle 4.5px at 0 6px,#0000 96%,#000) 0 0/51% 12px repeat-y,radial-gradient(circle 4.5px at 100% 6px,#0000 96%,#000) 100% 0/51% 12px repeat-y;mask:radial-gradient(circle 4.5px at 0 6px,#0000 96%,#000) 0 0/51% 12px repeat-y,radial-gradient(circle 4.5px at 100% 6px,#0000 96%,#000) 100% 0/51% 12px repeat-y;";
await p.addStyleTag({content:`
 html.x2p #standings .mk-wrap{width:${SZ[V]};transform:rotate(${ROT[V]}deg);white-space:normal}
 html.x2p #standings .mk-tk{margin:0!important;max-width:none!important;--st:13px!important;--sb:13px!important;--pad:calc(13px + 9px)!important}
 html.x2p #standings .mk-1,html.x2p #standings .mk-3,html.x2p #standings .mk-4{--px:calc(100% + 60px)!important}
 html.x2p #standings .mk-tk .bt-p{grid-template-columns:1fr!important}
 html.x2p #standings .mk-2{--px:calc(100% - 70px)!important}
 html.x2p #standings .mk-2 .bt-p{grid-template-columns:minmax(0,1fr) 70px!important}
 html.x2p #standings .mk-tk .bt-hd{justify-content:center!important;font-size:8px!important;letter-spacing:.5em!important}
 html.x2p #standings .mk-tk .bt-hd .r,html.x2p #standings .mk-tk .bt-ft .r{display:none!important}
 html.x2p #standings .mk-tk .bt-b{padding:4px 12px!important}
 html.x2p #standings .mk-cdh b{white-space:normal!important;text-align:center;text-wrap:balance}
 html.x2p #standings .mk-cdh b .bt-ink{font-size:14px!important;line-height:1.1!important;letter-spacing:.03em!important}
 html.x2p #standings .mk-cdh b em{font-size:30px!important;line-height:1!important;margin:3px auto 1px!important;display:table!important}
 html.x2p #standings .mk-cdh b .bt-ink{display:block!important;text-align:center}
 html.x2p #standings .mk-tk .bt-mk{margin-top:5px!important;gap:5px!important}
 html.x2p #standings .mk-tk .bt-mk i{width:7px!important;height:7px!important}html.x2p #standings .mk-tk .bt-mk i:nth-child(2){width:9px!important;height:9px!important}
 /* 3: one line */
 html.x2p #standings .mk-3 .mk-cdh b .bt-ink,html.x2p #standings .mk-3 .mk-cdh b em{display:inline!important}
 html.x2p #standings .mk-3 .mk-cdh b .bt-ink{font-size:13px!important}html.x2p #standings .mk-3 .mk-cdh b em{font-size:19px!important;vertical-align:-1px}
 /* 2: the stub */
 html.x2p #standings .mk-stub{display:flex;justify-content:center;align-items:center;width:100%}
 html.x2p #standings .mk-stub .lg{width:34px!important;height:34px!important;border-radius:8px}html.x2p #standings .mk-stub .lg svg{width:22px;height:22px}
 html.x2p #standings .mk-2 .bt-s{padding:0 8px!important}
 /* 4: the film ticket's scalloped sides, no notches */
 html.x2p #standings .mk-4{${SCAL}}
 html.x2p #standings .mk-wrap{filter:drop-shadow(3px 4px 0 rgba(0,0,0,.85))}`});
await p.waitForTimeout(500);
const box=await p.evaluate(()=>{const r=document.querySelectorAll('#standings li.lbr')[2].getBoundingClientRect(),t=document.querySelector('#standings .mk-wrap').getBoundingClientRect();return {y0:r.top+scrollY,y1:t.bottom+scrollY+26,w:Math.round(t.width),text:document.querySelector('#standings .mk-cdh').textContent}});
await p.screenshot({path:'b'+V+'-full.png',fullPage:true});fs.writeFileSync('b'+V+'.json',JSON.stringify(box));console.log(V,box.w,box.text);await b.close()})();
