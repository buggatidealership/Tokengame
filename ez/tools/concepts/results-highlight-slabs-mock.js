// Highlights as full-size swipeable slabs; the back tells the story in plain words (owner, 2026-10-21). Mockup only.
window.__mk2=function(o){
 const G=r=>{const k=r.calls.length,rw=r.calls.filter(c=>(c[1].indexOf("DOWN")<0)===(r.a>0)).map(c=>+c[2]),h=rw.length,f=h/k,av=h?rw.reduce((a,b)=>a+b,0)/h:0,mv=Math.abs(r.a),pt=av<=1.5?2:av<=2?1.5:av<=2.5?1:av<=3?.5:0;let g,w;
  if(f===1){g=8+pt;if(g===10&&!(av<mv/2))g=9.5;w=g===10?(av<1?"Pristine":"Gem"):"Perfect"}else if(f>=.66){g=6+Math.min(pt,1.5);w="Strong"}else if(f>=.5){g=4+Math.min(pt,1.5);w="Split"}else if(f>0){g=2+Math.min(pt,1.5);w="Rough"}else{g=1;w="Rekt"}return {g,w,h,k,av}};
 const HL=[
  {n:26,tag:"Closest call",head:"GPT basically read ASML's mind.",why:"Every AI guesses how much a stock will move after the company reports. GPT said ASML would go up 1%. It went up 1.23%. No guess this season came closer.",grade:"Graded 5.5: only 2 of the 4 AIs got up or down right."},
  {n:30,tag:"Tightest race",head:"All four AIs huddled around TSMC.",why:"All four AIs said TSMC's stock would fall. It fell 2.01%. On average, their guesses were off by less than 1%.",grade:"Pristine 10: everyone right, and everyone close. The best grade there is."},
  {n:10,tag:"Biggest move",head:"Accenture fooled everyone.",why:"Accenture's stock jumped 16% in one day, almost 5 times a normal move. All four AIs said it would fall.",grade:"Rekt 1: nobody got it right. The lowest grade."}];
 const css=`
 .m2-car{position:relative;overflow:hidden;margin:0 -16px;padding:26px 0 18px}
 .m2-track{display:flex;gap:14px;padding:0 45px;transition:none}
 .m2-item{flex:0 0 300px;position:relative}
 .m2-item>.card{position:relative!important;left:auto!important;top:auto!important;transform:none!important;margin:0!important;width:300px!important;opacity:1!important}
 .m2-item:not(.on)>.card{opacity:.55!important}
 .m2-tag{position:absolute;top:-15px;left:50%;transform:translateX(-50%) rotate(-2deg);z-index:20;padding:5px 12px 6px;background:#f2b632;color:#141217;border:2px solid #000;box-shadow:3px 3px 0 #000;font:400 15px/1 Anton,Impact,sans-serif;letter-spacing:.04em;text-transform:uppercase;white-space:nowrap}
 .m2-dots{display:flex;justify-content:center;gap:7px;margin-top:2px}.m2-dots i{width:8px;height:8px;border-radius:50%;background:#3a3546;border:1.5px solid #000}.m2-dots i.on{background:#f2b632;width:22px;border-radius:5px}
 .m2-back{position:absolute;inset:0;display:grid;grid-template-rows:auto auto auto auto 1fr auto;gap:7px;padding:12px 12px 10px;font-family:Barlow,sans-serif;color:#f3ead6;background:#15131d;border-radius:4px;z-index:5;overflow:hidden}
 .m2-back h4{margin:0;font:400 19px/1.05 Anton,Impact,sans-serif;text-transform:uppercase;color:#f3ead6}
 .m2-calls{display:grid;grid-template-columns:1fr 1fr;gap:5px}
 .m2-c{display:flex;align-items:center;justify-content:space-between;gap:4px;padding:5px 7px;border-radius:5px;background:#1f1c2a;border:1.5px solid #000;font:800 12px/1 'Barlow Condensed',Barlow,sans-serif;letter-spacing:.04em}
 .m2-c.ok{background:#173d2b;box-shadow:inset 0 0 0 1.5px #2fbf71}.m2-c.no{opacity:.75;box-shadow:inset 0 0 0 1.5px #c8372d}.m2-c b{font-weight:800}.m2-c.ok b{color:#9ff0c4}.m2-c.no b{color:#ffb3ae}
 .m2-out{display:flex;justify-content:space-between;align-items:center;padding:6px 9px;border-radius:5px;background:#0d0b12;border:1.5px solid #000;font:800 12px/1 'Barlow Condensed',Barlow,sans-serif;letter-spacing:.08em;text-transform:uppercase}.m2-out b{font:400 18px/1 Anton;letter-spacing:0}.m2-out b.u{color:#4fe39a}.m2-out b.d{color:#ff6b5e}
 .m2-why{margin:0;font:500 13.5px/1.38 Barlow,sans-serif;color:#e9e1cc}.m2-why em{display:block;margin-top:7px;font-style:normal;font-weight:700;color:#f2b632}
 .m2-film{display:block;text-align:center;padding:9px;border-radius:8px;border:1.5px solid rgba(243,234,214,.35);font:800 13px/1 'Barlow Condensed',Barlow,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#f3ead6;background:#0d0b12}
 `;
 const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
 const orig=document.querySelector('main #record');
 const hlSec=document.querySelector('.x2p-hl-sec'),ul=hlSec.querySelector('ul.hx2s');
 const wrap=document.createElement('div');wrap.className='m2-car';const tr=document.createElement('div');tr.className='m2-track';wrap.appendChild(tr);
 HL.forEach((h,i)=>{const r=ROUNDS.find(x=>x.n===h.n),x=G(r);const card=orig.querySelector('.card[data-n="'+h.n+'"]').cloneNode(true);card.classList.remove('flipped');
  const fb=card.querySelector('.face.front [class*=flip]');if(fb){[...fb.childNodes].forEach(nd=>{if(nd.nodeType===3&&nd.textContent.trim())nd.textContent=' See why ↻'});if(!/See why/.test(fb.textContent))fb.textContent='See why ↻'}
  const fin=card.querySelector('.face.back .fin');const b=document.createElement('div');b.className='m2-back';
  const calls=r.calls.map(c=>{const ok=(c[1].indexOf('DOWN')<0)===(r.a>0),up=c[1].indexOf('DOWN')<0;return `<span class="m2-c ${ok?'ok':'no'}">${c[0]}<b>${up?'▲':'▼'} ${c[1].replace(/^(UP|DOWN)\s*/,'')} ${ok?'✓':'✗'}</b></span>`}).join('');
  b.innerHTML=`<h4>${h.head.replace('AIs','AI<span style="text-transform:none">s</span>')}</h4><div class="m2-calls">${calls}</div><div class="m2-out">Stock moved<b class="${r.a>0?'u':'d'}">${r.a>0?'▲':'▼'} ${Math.abs(r.a).toFixed(2)}%</b></div><div class="m2-out">Winner<b style="color:#f2b632">${r.win?r.win[0]+r.win.slice(1).toLowerCase().replace(/^pt$/,'PT'):'Nobody'}</b></div><p class="m2-why">${h.why}<em>${h.grade}</em></p><span class="m2-film">↻ See the film</span>`;
  fin.style.position='relative';fin.appendChild(b);
  const it=document.createElement('div');it.className='m2-item'+(i===o.on?' on':'');const tg=document.createElement('span');tg.className='m2-tag';tg.textContent=h.tag;it.append(tg,card);tr.appendChild(it);
  if(o.flip&&i===o.on)card.classList.add('flipped')});
 tr.style.transform='translateX('+(-o.on*314)+'px)';
 const dots=document.createElement('div');dots.className='m2-dots';dots.innerHTML=HL.map((h,i)=>'<i class="'+(i===o.on?'on':'')+'"></i>').join('');
 const rw=document.createElement('div');rw.id='record';rw.className='m2-rec';rw.append(wrap,dots);orig.removeAttribute('id');
 ul.replaceWith(rw);
 if(o.rest==='D'||o.rest==='C')window.__mk(o.rest==='D'?'D':'C-only');
 return true};
