// Two-tab launch mockup on the real X2+ page: Overview = first screen, 01 standings (the Leaderboard tab's board, no
// Avg miss, a bare ⓘ, the "As it stands" ticket), 02 record, 03 proof, 04 highlights (Results, on the middle card's back);
// tabs: Overview and Upcoming only.
const { chromium } = require('playwright');
const W=+process.argv[2]||412,H=+process.argv[3]||863,OUT=process.argv[4]||'mock';
(async()=>{const b=await chromium.launch({args:['--ignore-certificate-errors-spki-list='+require('fs').readFileSync(process.env.SPKI_FILE||'spki.txt','utf8').trim()]});
const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html#/');await p.waitForTimeout(3000);await p.evaluate(()=>document.fonts.ready);
const car0=await p.evaluate(()=>{const c=document.querySelector('#car');return c.scrollLeft});
await p.evaluate(()=>{location.hash='#/leaderboard'});await p.waitForTimeout(2500);
await p.evaluate(()=>{const hold=document.createElement('div');hold.id='mockHold';hold.hidden=true;document.body.appendChild(hold);
  ['#view .x2p-flipbtn','#view .x2p-flip','#view .x2p-lbfoot'].forEach(s=>hold.appendChild(document.querySelector(s)));location.hash='#/results'});
await p.waitForTimeout(2500);
await p.evaluate(()=>{document.getElementById('mockHold').appendChild(document.querySelector('#view .x2p-hl-sec'));location.hash='#/'});
await p.waitForTimeout(2000);
const info=await p.evaluate(()=>{const $=s=>document.querySelector(s),hold=$('#mockHold');
  // nav: Overview and Upcoming only
  document.querySelectorAll('header.top a[href="#/leaderboard"],header.top a[href="#/results"],header.top a[href="#/buyback"]').forEach(a=>a.style.display='none');
  const nv=document.querySelector('header.top a[href="#/upcoming"]').parentNode;nv.style.justifyContent='flex-start';nv.style.gap='22px';
  // 01 standings: the Overview head, the Leaderboard board under it
  const st=$('#standings');st.querySelectorAll(':scope>.band,:scope>.lede').forEach(e=>e.remove());
  const btn=hold.querySelector('.x2p-flipbtn'),fl=hold.querySelector('.x2p-flip'),ft=hold.querySelector('.x2p-lbfoot');
  const sh=st.querySelector('.sh');sh.classList.add('mk-sh');sh.querySelector('.tx').appendChild(btn);st.appendChild(fl);st.appendChild(ft);
  // no Avg miss column
  const lbh=fl.querySelector('.lbh'),hs=[...lbh.children];const mi=hs.findIndex(e=>/miss/i.test(e.textContent));
  const tpl=getComputedStyle(fl.querySelector('li.lbr')).gridTemplateColumns,tplH=getComputedStyle(lbh).gridTemplateColumns,areas=getComputedStyle(fl.querySelector('li.lbr')).gridTemplateAreas;
  hs[mi].remove();fl.querySelectorAll('li.lbr').forEach(li=>{const c=li.querySelectorAll('.lb-c');if(c[1])c[1].remove()});
  const rec=$('#record');rec.parentNode.insertBefore(st,rec);
  // 04 highlights after the proof
  const hl=hold.querySelector('.x2p-hl-sec'),learn=$('#learn');hl.classList.add('sec','mk-hl');hl.id='highlights';learn.after(hl);
  const xh=hl.querySelector('.xsh');const nh=document.createElement('div');nh.className='sh';nh.innerHTML='<div class="tx"><span class="no">04</span><span class="eb">Highlights</span><h2>The rounds CT would screenshot</h2></div>';xh.replaceWith(nh);
  // renumber
  [['#standings','01'],['#record','02'],['#learn','03'],['#get','05']].forEach(([s,n])=>{const e=$(s+' .sh .no');if(e)e.textContent=n});
  return {mi,tpl,tplH,areas}});
console.log(JSON.stringify(info));
await p.addStyleTag({content:`
/* the bare ⓘ: no box, no words */
html.x2p #standings .mk-sh .tx{position:relative}
html.x2p #standings .x2p-flipbtn{position:absolute!important;right:0;bottom:2px;background:none!important;border:0!important;box-shadow:none!important;padding:8px!important;margin:0!important;min-width:0!important;transform:none!important}
html.x2p #standings .x2p-flipbtn span{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
html.x2p #standings .x2p-flipbtn i{width:20px!important;height:20px!important;font-size:12px!important;opacity:.85}
`});
// columns without Avg miss: drop the 4th track (rank, AI, hit rate, [miss], ROI, last 5)
await p.evaluate(({tpl,tplH})=>{const drop=t=>{const a=t.split(' ');return a[0]+' minmax(0,1fr) 88px 88px'};
  document.querySelectorAll('#standings li.lbr').forEach(li=>li.style.gridTemplateColumns=drop(tpl));const h=document.querySelector('#standings .lbh');h.style.gridTemplateColumns=drop(tplH)},info);
// highlights land on the middle card (Tightest race), its back showing
await p.evaluate(()=>{const tr=document.querySelector('#x2pHl .x2p-hlt'),w=tr.children[1];tr.scrollLeft=w.offsetLeft+w.offsetWidth/2-tr.clientWidth/2});
await p.waitForTimeout(600);
await p.evaluate(()=>{const c=document.querySelector('#x2pHl .x2p-hlt').children[1].querySelector('.card');c.querySelector('.face.front').dispatchEvent(new MouseEvent('click',{bubbles:true}))});
await p.waitForTimeout(1200);
await p.evaluate((x)=>{const c=document.querySelector('#car');if(c.scrollLeft!==x)c.scrollLeft=x;window.scrollTo(0,0)},car0);console.log('car0',car0);await p.waitForTimeout(300);
await p.screenshot({path:OUT+'-full.png',fullPage:true});
const pos=await p.evaluate(()=>['#standings','#record','#learn','#highlights','#get'].map(s=>{const e=document.querySelector(s);return [s,Math.round(e.getBoundingClientRect().top+scrollY),Math.round(e.getBoundingClientRect().height)]}));
console.log(JSON.stringify(pos),'flipped:',await p.evaluate(()=>document.querySelector('#x2pHl .x2p-hlt').children[1].querySelector('.card').classList.contains('flipped')),errs.length?errs:'no errors');
await b.close()})();
