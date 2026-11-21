// Round 6 mockups on the built X2+ page (fixes in): first screen (smaller "Tap to play", the bet ticket as wide as the film,
// a touch taller), "last 5" label (L1 under each row's boxes, L2 in the header), and the "As it stands" ticket (A the current
// look at the board's full width, B the bet ticket's twin with a stub, C a slim strip on the same paper)
const { chromium } = require('playwright');const fs=require('fs');
const V=process.argv[2]||'now',W=+process.argv[3]||412,H=+process.argv[4]||863;
(async()=>{const b=await chromium.launch({args:['--ignore-certificate-errors-spki-list='+fs.readFileSync(process.env.SPKI_FILE||'spki.txt','utf8').trim()]});
const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html');await p.waitForTimeout(2800);await p.evaluate(()=>document.fonts.ready);
const css={
 first:`@media (max-width:599.98px){
   html.x2p .x2p-vt .vt-play{font-size:10px!important;padding:5px 9px 5px 8px!important;gap:5px!important;bottom:11px!important;box-shadow:2px 2px 0 #000!important;border-width:1.5px!important}
   html.x2p .x2p-vt .vt-play i{border-left-width:7px!important;border-top-width:4.5px!important;border-bottom-width:4.5px!important}
   html.x2p.x2pbt .x2p-bt{margin:24px 0 0!important;--pad:calc(var(--st) + 17px)!important}}`,
 L1:`html.x2p #standings li.lbr>.x2p-l5{display:grid!important;justify-items:center}
   html.x2p #standings li.lbr>.x2p-l5::after{content:"last 5 rounds";display:block;margin-top:4px;font:800 9.5px/1 'Barlow Condensed',Barlow,sans-serif;letter-spacing:.02em;color:currentColor;opacity:.85;text-transform:none}`,
 L2:``,
 tA:`html.x2p #standings .x2p-lbfoot{display:block!important;margin-top:20px}
   html.x2p #standings .x2p-lbfoot .x2p-row-foot{display:block!important}
   html.x2p #standings .x2p-lbfoot .x2p-say{display:block!important;max-width:none!important;width:calc(100% - 6px)!important;margin:0!important;transform:rotate(-.8deg)!important}
   html.x2p #standings .x2p-lbfoot .x2p-say .st{display:block!important;width:100%!important;box-sizing:border-box;text-align:center;font-size:14px!important;padding:14px 34px 13px!important}`,
};
const mode=V.split('+');let add='';mode.forEach(k=>{if(css[k])add+=css[k]});
if(add)await p.addStyleTag({content:add});
if(mode.includes('L2'))await p.evaluate(()=>{const h=document.querySelector('#standings .lbh');const c=h.children[2];c.textContent='Last 5';c.removeAttribute('aria-hidden')});
if(mode.includes('tB')||mode.includes('tC'))await p.evaluate((B)=>{
  const bt=document.querySelector('.x2p-bt'),ft=document.querySelector('#standings .x2p-lbfoot');
  const top=document.querySelector('#standings li.lbr'),nm=top.querySelector('.pc-t h3').textContent.trim(),pct=top.querySelector('.lb-c b').textContent.trim(),lg=top.querySelector('.lg').outerHTML;
  const t=bt.cloneNode(true);t.removeAttribute('id');t.querySelectorAll('[id]').forEach(e=>e.removeAttribute('id'));t.classList.add('mk-tk');
  const hd=t.querySelector('.bt-hd'),fo=t.querySelector('.bt-ft'),lb=t.querySelector('.bt-b'),st=t.querySelector('.bt-s');
  if(B){hd.innerHTML='<span class="l"><i></i>As it stands<i></i></span><span class="r">Season 1</span>';
    fo.innerHTML='<span class="l">On our next bet</span><span class="r e"><span class="bt-no">Nº 000002</span></span>';
    lb.innerHTML='<div class="x2p-cdh"><b><span class="bt-ink">We follow</span> <em data-t="'+nm.toUpperCase()+'">'+nm.toUpperCase()+'</em></b></div><div class="bt-mk" aria-hidden="true"><i></i><i></i><i></i></div>';
    st.innerHTML='<div class="mk-stub">'+lg+'<b>'+pct+'</b><small>on direction</small><span>#1 on the board</span></div>';}
  else{t.classList.add('mk-slim');hd.innerHTML='<span class="l"><i></i>As it stands<i></i></span><span class="r">Season 1</span>';fo.innerHTML='<span class="l">Admit one</span><span class="r e"><span class="bt-no">Nº 000002</span></span>';
    lb.innerHTML='<div class="mk-line">We follow <em>'+nm+'</em> on our next bet.</div>';st.remove();}
  ft.innerHTML='';ft.appendChild(t);ft.style.display='block';},mode.includes('tB'));
await p.addStyleTag({content:`
 html.x2p #standings .mk-tk{margin:22px 0 0!important;max-width:none!important;transform:rotate(-.6deg)}
 html.x2p #standings .mk-tk .bt-p{grid-template-columns:minmax(0,1.25fr) minmax(0,1fr)}
 html.x2p #standings .mk-tk .x2p-cdh b{font-size:clamp(26px,8vw,40px)!important}
 html.x2p #standings .mk-stub{display:grid;justify-items:center;gap:2px;width:100%;color:#141217;font-family:'Barlow Condensed',Barlow,sans-serif;text-transform:uppercase}
 html.x2p #standings .mk-stub .lg{width:30px!important;height:30px!important;margin-bottom:4px}
 html.x2p #standings .mk-stub b{font:400 30px/1 Anton,'Barlow Condensed',sans-serif;letter-spacing:.01em}
 html.x2p #standings .mk-stub small{font-weight:800;font-size:11px;letter-spacing:.06em;opacity:.8}
 html.x2p #standings .mk-stub span{margin-top:6px;font-weight:800;font-size:10px;letter-spacing:.12em;color:#b3261e}
 html.x2p #standings .mk-slim .bt-p{grid-template-columns:1fr!important}
 html.x2p #standings .mk-slim .bt-b{padding:0 22px!important}
 html.x2p #standings .mk-slim .mk-line{font:800 17px/1.2 'Barlow Condensed',Barlow,sans-serif;text-transform:uppercase;letter-spacing:.03em;color:#141217;text-align:center}
 html.x2p #standings .mk-slim .mk-line em{font-style:normal;font-family:Anton,'Barlow Condensed',sans-serif;font-weight:400;font-size:21px;line-height:1;letter-spacing:.02em;color:#1f7a45;vertical-align:baseline}`});
await p.waitForTimeout(400);
// keep the centring right after the style changes
await p.evaluate(()=>window.dispatchEvent(new Event('resize')));await p.waitForTimeout(500);
if(mode.includes('L2'))await p.evaluate(()=>{const h=document.querySelector('#standings .lbh').children[2],f=document.querySelector('#standings li.lbr .x2p-l5 .fq').getBoundingClientRect(),r=h.getBoundingClientRect();
  h.style.display='block';h.style.textAlign='center';const r2=h.getBoundingClientRect();h.style.transform='translateX('+(((f.left+f.right)/2)-((r2.left+r2.right)/2))+'px)'});
const out='r6-'+V+'-'+W;
if(V==='now'||mode.includes('first')){await p.evaluate(()=>window.scrollTo(0,0));await p.waitForTimeout(200);await p.screenshot({path:out+'-first.png'});}
const st=await p.$('#standings');await st.screenshot({path:out+'-st.png'});
console.log(V,W,errs.length?errs:'ok');await b.close()})();
