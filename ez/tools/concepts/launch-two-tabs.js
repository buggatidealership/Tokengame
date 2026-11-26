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
  hs[mi].remove();fl.querySelectorAll('li.lbr').forEach(li=>{const c=li.querySelectorAll('.lb-c');if(c[1])c[1].remove();
    const f2=li.querySelector('.lb-f2');f2.classList.add('mk-f2');li.insertBefore(f2,li.querySelector('.lb-c'))});
  const hc=document.createElement('span');hc.setAttribute('aria-hidden','true');lbh.insertBefore(hc,lbh.children[2]);
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
/* name over model; the last five in their own column, centred in it, so every row's first and last box line up */
html.x2p #standings li.lbr .pc-t{display:grid!important;grid-template-columns:max-content;justify-content:start;min-width:0}
html.x2p #standings li.lbr .pc-t h3{grid-area:auto!important;grid-row:1!important;grid-column:1!important;margin:0;overflow:visible!important;text-overflow:clip!important;max-width:none!important}
html.x2p #standings li.lbr .pc-t small{display:block!important;grid-area:auto!important;grid-row:2!important;grid-column:1!important}
html.x2p #standings li.lbr .mk-f2{display:block!important;justify-self:center;margin:0!important;grid-area:auto!important;grid-row:1!important;grid-column:3!important}
html.x2p #standings li.lbr>.rk{grid-row:1!important;grid-column:1!important}html.x2p #standings li.lbr>.lb-m{grid-row:1!important;grid-column:2!important}
html.x2p #standings li.lbr>.lb-c{grid-row:1!important;grid-column:4!important}html.x2p #standings li.lbr>.lb-c.roi{grid-column:5!important}
html.x2p #standings .x2p-flipbtn i{width:20px!important;height:20px!important;font-size:12px!important;opacity:.85}
`});
// columns without Avg miss: drop the 4th track (rank, AI, hit rate, [miss], ROI, last 5)
await p.evaluate(({tpl,tplH})=>{const drop=t=>{const a=t.split(' ');return innerWidth<600?a[0]+' minmax(0,1fr) auto 60px 60px':a[0]+' minmax(0,1fr) 1fr 1fr 1fr'};
  document.querySelectorAll('#standings li.lbr').forEach(li=>li.style.gridTemplateColumns=drop(tpl));const h=document.querySelector('#standings .lbh');h.style.gridTemplateColumns=drop(tplH)},info);
// (owner, round 4) symmetry: rank, logo, name, the five boxes, hit rate and ROI on the strip's exact middle line;
// the model and the small labels under it
await p.addStyleTag({content:'html.x2p #standings li.lbr .pc-t small{font-size:'+(W<600?'9.5px':'11px')+'!important;line-height:1!important;opacity:.8;margin-top:3px}html.x2p #standings li.lbr .pc-t h3{line-height:1!important}'});
await p.waitForTimeout(150);
// (owner, round 5) centre what the eye sees: the ink of the letters and digits (cap height, not the line box), the logo
// square and the five boxes, each on the strip's middle (its border box: equal 3px ink top and bottom). The five boxes
// sit halfway between the longest name and the hit rate, the same shift on every row.
await p.evaluate((W)=>{window.__mkInk=W<600?.7:0;},W);await p.evaluate(()=>{const cv=document.createElement('canvas').getContext('2d');
  const R=e=>e.getBoundingClientRect();
  function ink(el){// the ink's vertical middle of el's own text: baseline from a probe, ascent/descent from canvas
    const cs=getComputedStyle(el);let t=[...el.childNodes].filter(n=>n.nodeType===3).map(n=>n.nodeValue).join('').trim();if(!t)t=el.textContent.trim();
    if(cs.textTransform==='uppercase')t=t.toUpperCase();cv.font=cs.font;const m=cv.measureText(t);
    const pr=document.createElement('i');pr.style.cssText='display:inline-block;width:0;height:0;vertical-align:baseline';el.appendChild(pr);const base=R(pr).top;pr.remove();
    return base-(m.actualBoundingBoxAscent-m.actualBoundingBoxDescent)/2+window.__mkInk}
  const rows=[...document.querySelectorAll('#standings li.lbr')];
  rows.forEach(li=>{const row=R(li),mid=(row.top+row.bottom)/2;
    const mv=(el,y)=>{const d=Math.round((mid-y)*4)/4;el.style.transform='translateY('+d+'px)'};
    mv(li.querySelector('.lg'),(R(li.querySelector('.lg')).top+R(li.querySelector('.lg')).bottom)/2);
    mv(li.querySelector('.pc-t'),ink(li.querySelector('.pc-t h3 .x2p-mn')||li.querySelector('.pc-t h3')));
    const fq=li.querySelector('.mk-f2 .fq');mv(li.querySelector('.mk-f2'),(R(fq).top+R(fq).bottom)/2);
    li.querySelectorAll('.lb-c').forEach(c=>mv(c,ink(c.querySelector('b'))));
    mv(li.querySelector('.rk'),ink(li.querySelector('.rk')))});
  // the five boxes halfway between the longest name and the leftmost hit-rate digit
  const tr=n=>{const r=document.createRange();r.selectNodeContents(n);return r.getBoundingClientRect()};
  const nameR=Math.max(...rows.map(li=>tr(li.querySelector('.pc-t h3')).right)),hitL=Math.min(...rows.map(li=>tr(li.querySelector('.lb-c b')).left));
  rows.forEach(li=>{const f=li.querySelector('.mk-f2'),fr=R(f.querySelector('.fq')),dx=Math.round(((nameR+hitL)/2-(fr.left+fr.right)/2)*4)/4;
    f.style.transform+=' translateX('+dx+'px)'});
  window.__mkGap=[nameR,hitL]});
await p.waitForTimeout(100);
// highlights land on the middle card (Tightest race), its back showing
await p.evaluate(()=>{const tr=document.querySelector('#x2pHl .x2p-hlt'),w=tr.children[1];tr.scrollLeft=w.offsetLeft+w.offsetWidth/2-tr.clientWidth/2});
await p.waitForTimeout(600);
await p.evaluate(()=>{const c=document.querySelector('#x2pHl .x2p-hlt').children[1].querySelector('.card');c.querySelector('.face.front').dispatchEvent(new MouseEvent('click',{bubbles:true}))});
await p.waitForTimeout(1200);
await p.evaluate((x)=>{const c=document.querySelector('#car');if(c.scrollLeft!==x)c.scrollLeft=x;window.scrollTo(0,0)},car0);console.log('car0',car0);console.log(await p.evaluate(()=>{const L0=document.querySelector('#standings li.lbr'),c0=getComputedStyle(L0),b0=getComputedStyle(L0,'::before'),a0=getComputedStyle(L0,'::after');return 'LISTYLE border:'+c0.borderTopWidth+'/'+c0.borderBottomWidth+' pad:'+c0.paddingTop+'/'+c0.paddingBottom+' shadow:'+c0.boxShadow+' before:'+b0.content+' '+b0.inset+' '+b0.transform+' after:'+a0.content+' '+a0.inset+' rect:'+JSON.stringify(L0.getBoundingClientRect())}));console.log(await p.evaluate(()=>{const li=document.querySelector('#standings li.lbr');const cs=getComputedStyle(li);return 'LI '+cs.display+' cols['+cs.gridTemplateColumns+'] areas['+cs.gridTemplateAreas+']\n'+[...li.children].map(c=>{const s=getComputedStyle(c),r=c.getBoundingClientRect();return c.className+' d:'+s.display+' gc:'+s.gridColumn+' ga:'+s.gridArea+' pos:'+s.position+' x:'+Math.round(r.left)+' w:'+Math.round(r.width)}).join('\n')+'\nLBM: '+[...li.querySelector('.lb-m').children].map(c=>c.className+' '+getComputedStyle(c).display+' x:'+Math.round(c.getBoundingClientRect().left)+' w:'+Math.round(c.getBoundingClientRect().width)).join(' | ')+' lbm-d:'+getComputedStyle(li.querySelector('.lb-m')).display}));await p.waitForTimeout(300);
await p.screenshot({path:OUT+'-full.png',fullPage:true});
const boxes=await p.evaluate(()=>{const R=e=>{const r=e.getBoundingClientRect();return [r.left+scrollX,r.top+scrollY,r.right+scrollX,r.bottom+scrollY]};
  return [...document.querySelectorAll('#standings li.lbr')].map(li=>({row:R(li),lg:R(li.querySelector('.lg')),nm:R(li.querySelector('.pc-t h3')),fq:R(li.querySelector('.mk-f2 .fq')),
    hit:R(li.querySelector('.lb-c b')),roi:R([...li.querySelectorAll('.lb-c b')].pop()),f2x:(()=>{const r=li.querySelector('.mk-f2 .fq').getBoundingClientRect();return [r.left,r.right]})(),gap:window.__mkGap}))});
require('fs').writeFileSync(OUT+'-boxes.json',JSON.stringify(boxes));
const pos=await p.evaluate(()=>['#standings','#record','#learn','#highlights','#get'].map(s=>{const e=document.querySelector(s);return [s,Math.round(e.getBoundingClientRect().top+scrollY),Math.round(e.getBoundingClientRect().height)]}));
console.log(await p.evaluate(()=>[...document.querySelectorAll('#standings li.lbr')].map(li=>{const mid=e=>{const r=li.querySelector(e).getBoundingClientRect();return Math.round((r.top+r.bottom)/2)};const r=li.getBoundingClientRect();const f=[...li.querySelectorAll('.mk-f2 .fq i')];return li.querySelector('h3').textContent+' row:'+Math.round((r.top+r.bottom)/2)+' boxL:'+Math.round(f[0].getBoundingClientRect().left)+' boxR:'+Math.round(f[f.length-1].getBoundingClientRect().right)+' logo:'+mid('.lg')+' rank:'+mid('.rk')+' name:'+mid('h3')+' boxes:'+mid('.mk-f2 .fq')+' num:'+mid('.lb-c b')+' roi:'+(()=>{const c=li.querySelectorAll('.lb-c b');const r=c[c.length-1].getBoundingClientRect();return Math.round((r.top+r.bottom)/2)})()}).join(' | ')));console.log(await p.evaluate(()=>[...document.querySelectorAll('#learn .rsw2 button')].map(b=>b.dataset.rk+(b.getAttribute('aria-pressed')==='true'?'*':'')).join(' ')),JSON.stringify(pos),'flipped:',await p.evaluate(()=>document.querySelector('#x2pHl .x2p-hlt').children[1].querySelector('.card').classList.contains('flipped')),errs.length?errs:'no errors');
await b.close()})();
