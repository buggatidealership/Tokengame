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
  ['#view .x2p-flipbtn','#view .x2p-flip','#view .x2p-lbfoot','#view .rsw2','#view #rflip'].forEach(s=>hold.appendChild(document.querySelector(s)));location.hash='#/results'});
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
  // 03 the proof: the Leaderboard's four stats, in the owner's order (hit rate, ROI, avg miss, by sector)
  const ln=$('#learn');ln.querySelectorAll(':scope>.lsw,:scope>.lrn').forEach(e=>e.remove());
  const sw=hold.querySelector('.rsw2'),rf=hold.querySelector('#rflip');ln.appendChild(sw);ln.appendChild(rf);
  ['hit','roi','miss','sector'].forEach(k=>{const bt=sw.querySelector('[data-rk="'+k+'"]');if(bt)sw.appendChild(bt)});
  const hb=sw.querySelector('[data-rk="hit"]');if(hb&&hb.getAttribute('aria-pressed')!=='true')hb.click();
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
/* the last five beside the name, the model under it, at every width */
html.x2p #standings li.lbr .pc-t{display:grid!important;grid-template-columns:max-content max-content;justify-content:start;column-gap:8px;row-gap:1px;align-items:center;min-width:0}
html.x2p #standings li.lbr .pc-t h3{grid-column:1;grid-row:1;margin:0;overflow:visible!important;text-overflow:clip!important;max-width:none!important}
html.x2p #standings li.lbr .pc-t .lb-f2{grid-column:2;grid-row:1;display:block!important;margin:0!important}
html.x2p #standings li.lbr .pc-t small{grid-column:1/-1;grid-row:2;display:block!important}
html.x2p #standings .x2p-flipbtn i{width:20px!important;height:20px!important;font-size:12px!important;opacity:.85}
`});
// columns without Avg miss: drop the 4th track (rank, AI, hit rate, [miss], ROI, last 5)
await p.evaluate(({tpl,tplH})=>{const drop=t=>{const a=t.split(' ');return innerWidth<600?a[0]+' minmax(0,1fr) 64px 64px':a[0]+' minmax(0,1.4fr) 1fr 1fr'};
  document.querySelectorAll('#standings li.lbr').forEach(li=>li.style.gridTemplateColumns=drop(tpl));const h=document.querySelector('#standings .lbh');h.style.gridTemplateColumns=drop(tplH)},info);
// name + last five on the line of the big numbers; the model under it, smaller, on the line of "on direction"
const al=await p.evaluate(()=>{const li=document.querySelector('#standings li.lbr'),c=li.querySelector('.lb-c'),b=c.querySelector('b'),sm=c.querySelector('small');
  const bh=b.getBoundingClientRect().height,sh=sm.getBoundingClientRect().height,gap=sm.getBoundingClientRect().top-b.getBoundingClientRect().bottom;
  const st=document.createElement('style');st.textContent=`html.x2p #standings li.lbr .pc-t{grid-template-rows:${bh}px ${sh}px!important;row-gap:${Math.max(0,gap)}px!important;align-self:center!important}
   html.x2p #standings li.lbr .lb-c{align-self:center!important}
   html.x2p #standings li.lbr .pc-t h3,html.x2p #standings li.lbr .pc-t .lb-f2{align-self:center!important;line-height:1!important}
   html.x2p #standings li.lbr .pc-t small{align-self:center!important;font-size:${Math.round(parseFloat(getComputedStyle(li.querySelector('.pc-t small')).fontSize)*0.86*10)/10}px!important;line-height:1!important;opacity:.8}`;
  document.head.appendChild(st);return {bh,sh,gap}});
console.log('align',JSON.stringify(al));
// (owner, round 3) the logo is the anchor: rank, name, the five boxes and both numbers on the logo's middle line; the model
// and the small labels hang under it; the whole group centred in the row
await p.evaluate(()=>{document.querySelectorAll('#standings li.lbr').forEach(li=>{
  const R=e=>e.getBoundingClientRect(),row=R(li),lg=li.querySelector('.lg'),nm=li.querySelector('.pc-t h3'),rk=li.querySelector('.rk');
  const L=R(lg),N=R(nm),cs=[...li.querySelectorAll('.lb-c')],tb=li.querySelector('.pc-t');
  const subB=Math.max(R(tb).bottom,...cs.map(c=>R(c).bottom)),nameMid=(N.top+N.bottom)/2;
  // group: logo centred on the name line, text as is; then centre the group in the row
  const lgTop=nameMid-L.height/2,top=Math.min(lgTop,N.top),bot=Math.max(lgTop+L.height,subB);
  const cs2=getComputedStyle(li),inTop=row.top+parseFloat(cs2.paddingTop)+parseFloat(cs2.borderTopWidth),inBot=row.bottom-parseFloat(cs2.paddingBottom)-parseFloat(cs2.borderBottomWidth);
  const shift=((inTop+inBot)/2)-((top+bot)/2);// move everything by this to centre the group
  const mv=(e,dy)=>{e.style.transform='translateY('+(Math.round(dy*2)/2)+'px)'};
  mv(lg,lgTop-L.top+shift);mv(tb,shift);cs.forEach(c=>mv(c,shift));
  const K=R(rk);mv(rk,nameMid+shift-(K.top+K.bottom)/2)})});
await p.waitForTimeout(100);
await p.waitForTimeout(200);
// highlights land on the middle card (Tightest race), its back showing
await p.evaluate(()=>{const tr=document.querySelector('#x2pHl .x2p-hlt'),w=tr.children[1];tr.scrollLeft=w.offsetLeft+w.offsetWidth/2-tr.clientWidth/2});
await p.waitForTimeout(600);
await p.evaluate(()=>{const c=document.querySelector('#x2pHl .x2p-hlt').children[1].querySelector('.card');c.querySelector('.face.front').dispatchEvent(new MouseEvent('click',{bubbles:true}))});
await p.waitForTimeout(1200);
await p.evaluate((x)=>{const c=document.querySelector('#car');if(c.scrollLeft!==x)c.scrollLeft=x;window.scrollTo(0,0)},car0);console.log('car0',car0);await p.waitForTimeout(300);
await p.screenshot({path:OUT+'-full.png',fullPage:true});
const pos=await p.evaluate(()=>['#standings','#record','#learn','#highlights','#get'].map(s=>{const e=document.querySelector(s);return [s,Math.round(e.getBoundingClientRect().top+scrollY),Math.round(e.getBoundingClientRect().height)]}));
console.log(await p.evaluate(()=>[...document.querySelectorAll('#standings li.lbr')].map(li=>{const mid=e=>{const r=li.querySelector(e).getBoundingClientRect();return Math.round((r.top+r.bottom)/2)};return li.querySelector('h3').textContent+' logo:'+mid('.lg')+' rank:'+mid('.rk')+' name:'+mid('h3')+' boxes:'+mid('.lb-f2 .fq')+' num:'+mid('.lb-c b')+' roi:'+(()=>{const c=li.querySelectorAll('.lb-c b');const r=c[c.length-1].getBoundingClientRect();return Math.round((r.top+r.bottom)/2)})()}).join(' | ')));console.log(await p.evaluate(()=>[...document.querySelectorAll('#learn .rsw2 button')].map(b=>b.dataset.rk+(b.getAttribute('aria-pressed')==='true'?'*':'')).join(' ')),JSON.stringify(pos),'flipped:',await p.evaluate(()=>document.querySelector('#x2pHl .x2p-hlt').children[1].querySelector('.card').classList.contains('flipped')),errs.length?errs:'no errors');
await b.close()})();
