// Results tab mockups (owner, 2026-10-21): the 10s as highlights, a sheet with the full slab, every round as slabs, or tickets + grade.
window.__mk=function(mode){
 const G=r=>{const k=r.calls.length,rw=r.calls.filter(c=>(c[1].indexOf("DOWN")<0)===(r.a>0)).map(c=>+c[2]),h=rw.length,f=h/k,av=h?rw.reduce((a,b)=>a+b,0)/h:0,mv=Math.abs(r.a),pt=av<=1.5?2:av<=2?1.5:av<=2.5?1:av<=3?.5:0;let g,w,pr=false;
  if(f===1){g=8+pt;if(g===10&&!(av<mv/2))g=9.5;w=g===10?((pr=av<1)?"Pristine":"Gem"):"Perfect"}else if(f>=.66){g=6+Math.min(pt,1.5);w="Strong"}else if(f>=.5){g=4+Math.min(pt,1.5);w="Split"}else if(f>0){g=2+Math.min(pt,1.5);w="Rough"}else{g=1;w="Rekt"}
  const best=r.calls.filter(c=>(c[1].indexOf("DOWN")<0)===(r.a>0)).sort((a,b)=>a[2]-b[2])[0];return {g,w,pr,h,k,av,best}};
 const poster=r=>{const f=FILMS[r.n];return f?'media/'+f.p+'.jpg':(r.poster?'media/'+r.poster+'.jpg':'')};
 const css=`
 .mk-sub{font:500 15px/1.35 Barlow,sans-serif;color:#d6cebb;margin:-4px 0 14px}.mk-sub b{color:#f2b632}
 .mk-row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;padding:0 0 6px}.mk-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px 12px}
 .mk-s{position:relative;isolation:isolate;border-radius:9px;padding:5px;background:linear-gradient(160deg,rgba(255,255,255,.14) 0 44%,rgba(255,255,255,.05) 44%),rgba(18,16,26,.6);box-shadow:0 0 0 2px #000,inset 1px 1px 0 rgba(255,255,255,.7),inset -1px -1px 0 rgba(255,255,255,.25),4px 5px 0 #000;cursor:pointer}
 .mk-s::before{content:"";position:absolute;inset:3px;border-radius:6px;border:1px solid rgba(242,182,50,.5);pointer-events:none}
 .mk-l{position:relative;border-radius:2px;padding:5px 6px 5px;background:#fbfaf6;color:#141217;box-shadow:0 0 0 1px #000,inset 0 0 0 2px #b8262a;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:end;gap:4px;font-family:'Barlow Condensed',Barlow,sans-serif}
 .mk-s.gold .mk-l{background:linear-gradient(135deg,#ffe28a 0%,#f2b632 38%,#ffd86b 55%,#d99a1c 100%);box-shadow:0 0 0 1px #000,inset 0 0 0 2px #8a5c0a}
 .mk-l .t{min-width:0;display:grid;gap:1px}.mk-l .no{font-weight:800;font-size:8px;letter-spacing:.06em;color:#b8262a}.mk-s.gold .mk-l .no{color:#141217}
 .mk-l .c{font-weight:800;font-size:11px;line-height:1;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
 .mk-l .w{font-weight:800;font-size:7px;letter-spacing:.1em;text-transform:uppercase;text-align:right;display:block}.mk-l .g{font:400 22px/.9 Anton,Impact,sans-serif;text-align:right;display:block}
 .mk-grid .mk-l{padding:6px 8px}.mk-grid .mk-l .c{font-size:13.5px}.mk-grid .mk-l .no{font-size:9px}.mk-grid .mk-l .w{font-size:8px}.mk-grid .mk-l .g{font-size:28px}
 .mk-f{margin-top:5px;aspect-ratio:1;border-radius:3px;overflow:hidden;box-shadow:0 0 0 1.5px #000;background:#15131d}.mk-f img{width:100%;height:100%;object-fit:cover;display:block}
 .mk-f.none{display:grid;place-items:center;font:400 14px Anton;color:#a49fb4;background:repeating-linear-gradient(45deg,#15131d 0 10px,#1b1825 10px 20px)}
 .mk-s.gold::after{content:"";position:absolute;inset:0;border-radius:9px;pointer-events:none;mix-blend-mode:overlay;opacity:.75;background:repeating-linear-gradient(115deg,rgba(255,111,174,.9) 0,rgba(242,182,50,.9) 26px,rgba(159,240,196,.9) 52px,rgba(111,211,255,.9) 78px,rgba(196,155,255,.9) 104px,rgba(255,111,174,.9) 130px)}
 .mk-tap{font:700 12px/1 'Barlow Condensed',Barlow,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#a49fb4;text-align:center;margin-top:10px}
 .mk-scrim{position:fixed;inset:0;background:rgba(5,4,8,.72);z-index:900}
 .mk-sheet{position:fixed;left:0;right:0;bottom:0;max-height:92vh;z-index:901;background:#15131d;border-top:2px solid #000;border-radius:18px 18px 0 0;box-shadow:0 -2px 0 rgba(242,182,50,.35);padding:10px 16px 20px;overflow:hidden;display:grid;grid-template-rows:auto auto auto;gap:8px;padding-bottom:28px}
 .mk-hd{display:flex;align-items:center;justify-content:space-between}.mk-hd i{display:block;width:44px;height:5px;border-radius:3px;background:#3a3546;margin:0 auto}
 .mk-x{position:absolute;right:14px;top:12px;width:36px;height:36px;border-radius:50%;display:grid;place-items:center;background:#0d0b12;box-shadow:0 0 0 1.5px rgba(243,234,214,.35);color:#f3ead6;font:700 18px/1 Barlow}
 .mk-pop{font:800 11px/1 'Barlow Condensed',Barlow,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#f2b632;text-align:center;margin-top:6px}
 .mk-story{font:600 16px/1.35 Barlow,sans-serif;color:#f3ead6;text-align:center;margin:0 6px}.mk-story small{display:block;margin-top:6px;font:500 13px/1.3 Barlow;color:#a49fb4}
 .mk-cardwrap{display:grid;justify-items:center;align-content:start;min-height:0}
 .mk-seal{position:absolute;right:10px;top:-10px;z-index:4;display:grid;justify-items:center;gap:1px;padding:4px 8px 5px;background:#fbfaf6;color:#141217;border:2px solid #000;box-shadow:inset 0 0 0 2px #b8262a,3px 3px 0 #000;transform:rotate(3deg);font-family:'Barlow Condensed',Barlow,sans-serif}
 .mk-seal.gold{background:linear-gradient(135deg,#ffe28a,#f2b632 45%,#d99a1c);box-shadow:inset 0 0 0 2px #8a5c0a,3px 3px 0 #000}
 .mk-seal b{font:400 22px/.9 Anton,Impact,sans-serif}.mk-seal span{font-weight:800;font-size:8px;letter-spacing:.1em;text-transform:uppercase}
 .mk-fixv{background:#000}.mk-fixv video,.mk-fixv img{object-fit:contain!important}
 .mk-fixv::before{content:"";position:absolute;inset:-10%;background:var(--bg) center/cover;filter:blur(14px) brightness(.55);z-index:0}.mk-fixv>*{position:relative;z-index:1}
 `;
 const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
 const mini=(r,wrap)=>{const x=G(r),gold=x.g===10;return `<div class="mk-s${gold?' gold':''}"><div class="mk-l"><span class="t"><span class="no">#${r.n}</span><span class="c">${r.co}</span></span><span><span class="w">${x.w}</span><span class="g">${x.g}</span></span></div>${poster(r)?`<div class="mk-f"><img src="${poster(r)}"></div>`:`<div class="mk-f none">NO FILM</div>`}</div>`};
 const tens=ROUNDS.filter(r=>G(r).g===10).sort((a,b)=>b.n-a.n);
 const hlSec=document.querySelector('.x2p-hl-sec'),ul=hlSec.querySelector('ul.hx2s');
 if(mode!=='D'&&mode!=='C-only'){const h2=hlSec.querySelector('h2');[...h2.childNodes].filter(n=>n.nodeType===3).forEach(n=>n.textContent='');const t=h2.querySelector('.x2p-lc, span:last-child');
   h2.lastChild.textContent='The 10s';
   const sub=document.createElement('p');sub.className='mk-sub';sub.innerHTML=`Only <b>${tens.length} of ${ROUNDS.length}</b> rounds graded a 10.`;
   const row=document.createElement('div');row.className='mk-row';row.innerHTML=tens.map(r=>mini(r)).join('');const tap=document.createElement('p');tap.className='mk-tap';tap.textContent='Tap a card';
   ul.replaceWith(sub);sub.after(row);row.after(tap)}
 if(mode==='B'){const r=ROUNDS.find(r=>r.n===30),x=G(r);const sc=document.createElement('div');sc.className='mk-scrim';const sh=document.createElement('div');sh.className='mk-sheet';
   const card=document.querySelector('#record .card[data-n="30"]').cloneNode(true);card.style.cssText='transform:none;position:relative;left:auto;top:auto;margin:0;width:300px;max-width:100%';card.classList.add('cur');
   sh.innerHTML=`<div class="mk-hd"><i></i></div><a class="mk-x">✕</a><div class="mk-cardwrap"></div>`;const rw=document.createElement('div');rw.id='record';rw.style.cssText='display:block;padding:0;margin:0;width:300px;max-width:100%';const car=document.createElement('div');car.className='car';car.style.cssText='display:block;overflow:visible;padding:0!important;transform:none;width:auto';car.appendChild(card);rw.appendChild(car);sh.querySelector('.mk-cardwrap').appendChild(rw);document.querySelector('main #record')&&document.querySelector('main #record').removeAttribute('id');
   const pop=document.createElement('p');pop.className='mk-pop';pop.textContent='Pristine 10 · 1 of 3 tens';const s2=document.createElement('p');s2.className='mk-story';
   s2.innerHTML=`TSMC fell 2.01%. All four said it would fall, off by just 0.91% on average.<small>Closest: ${x.best[0][0]+x.best[0].slice(1).toLowerCase()} said down 2.5%, off by ${x.best[2]}%. Tap the card for the stats.</small>`;
   sh.querySelector('.mk-cardwrap').append(pop,s2);document.body.append(sc,sh)}
 if(mode==='C'||mode==='C-only'){const ol=document.querySelector('ol.rx3');const g=document.createElement('div');g.className='mk-grid';g.innerHTML=ROUNDS.slice().sort((a,b)=>b.n-a.n).map(r=>mini(r)).join('');ol.replaceWith(g)}
 if(mode==='D'){document.querySelectorAll('ol.rx3>li').forEach(li=>{const n=+((li.querySelector('[data-n]')||li).getAttribute('data-n')||0)||+((li.textContent.match(/Round (\d+)/)||[])[1]||0);const r=ROUNDS.find(r=>r.n===n);if(!r)return;const x=G(r);
   const s=document.createElement('div');s.className='mk-seal'+(x.g===10?' gold':'');s.innerHTML=`<b>${x.g}</b><span>${x.w}</span>`;li.style.position=li.style.position||'';li.appendChild(s);
   const v=li.querySelector('.rx3-v');if(v){v.classList.add('mk-fixv');v.style.setProperty('--bg',`url(${poster(r)})`)}})}
 return {tens:tens.map(r=>r.n)}};
