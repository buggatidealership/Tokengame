/* Round H28 · meet12: the chip is a chip again (owner on the live D2, 2026-11-02: "the chip and the flag are so morphed that you don't even realize
   that it's a chip anymore"). A mockup laid over the built X2+ page, which already carries D2 (x2p_meet10.js: equal chips, one column, joined into one
   board, no glare, plain lettering, the name biggest). For every take:
     - the paintings chip13<base>-<m> (gen12.py): no flag in the board, the model's own board colour, its grain, parts and traces; the gold logo plate
       centred in the chip's left part (1.08, or 1.24 in C and D); D2's bus traces kept so the joined chips still run into each other;
     - the lab's flag, small and drawn plainly, in the name window's upper right corner, right of the name and version;
     - no numerals outside the chips (the strip S1 keeps the left edge, the chips take the width).
   The rank, per take (window.__M12T):
     a ETCHED: "No." and the numeral marked on the board's clear field above the plate, like a part marking: gold foil for #1, cream silkscreen for the rest;
     b IN THE NAME: the numeral leads the name line inside the name window ("1 | GROK 4.7 ... flag"), gold for #1;
     c ON THE PLATE: the plate bigger, the numeral engraved into its top-left corner like the logo is;
     d MEDALS: c, and the plate's metal is the rank: gold #1, silver #2, bronze #3, gunmetal #4 (the podium everybody reads); the logo carries the rank.
   Numbers: the rank is meet10's chip order (season P&L); nothing typed. window.__m12 = {apply, measure}. */
(function(){const W=window,D=document;let tries=0;
(function go(){const sec=D.querySelector('section.c8.m11'),four=sec&&sec.querySelector('.c8-four');
 if(!four||!W.__m11||!D.documentElement.classList.contains('m11-ready')){if(++tries<400)setTimeout(go,50);return}
 try{run(sec,four)}catch(e){W.__m12Err=e;console.error(e)}})();
function run(sec,four){
const T=(W.__M12T||'a').toLowerCase(),IMG=W.__M12IMG||'tools/concepts/worlds/comic/story/h/meet12/out/',BASE={a:'p',b:'r',c:'q',d:'q'}[T]||'p';
const MD=W.MODELS||{},ones=[...four.querySelectorAll('.c8-one')],ms=ones.map(o=>o.dataset.m);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const NM=m=>String((MD[m]&&MD[m].name)||m).toUpperCase();
const VER=m=>{const v=String((MD[m]&&MD[m].ver)||'').trim(),n=String((MD[m]&&MD[m].name)||m);return v.toLowerCase().startsWith(n.toLowerCase())?v.slice(n.length).replace(/^[\s\-–]+/,''):v};
const FLAG={GPT:'us',CLAUDE:'us',GROK:'us',KIMI:'cn'};
sec.classList.add('m12','m12-'+T);
const SZ=[1800,728],pc=(v,t)=>(v/t*100).toFixed(4)+'%',at=r=>`left:${pc(r[0],SZ[0])};top:${pc(r[1],SZ[1])};width:${pc(r[2]-r[0],SZ[0])};height:${pc(r[3]-r[1],SZ[1])}`;
const PL=BASE==='q'?[32,197,362,527]:[54,218,341,505],FIELD=[40,66,356,214];
/* the paintings */
ones.forEach(o=>o.querySelectorAll('.c7-pic img').forEach(im=>{for(const k of ['src','srcset'])if(im.getAttribute(k))im.setAttribute(k,im.getAttribute(k).replace(/[^ ,]*chip12-([a-z]+)-(\d+)\.(jpg|webp)/g,(s,mm,w,x)=>`${IMG}chip13${BASE}-${mm}-${w}.${x}`))}));
/* the flags, drawn plainly (no glow): US 13 stripes and a starred canton, China red with its five stars */
function star(cx,cy,r,rot){let p='';for(let i=0;i<10;i++){const a=(rot-90+i*36)*Math.PI/180,rr=i%2?r*.382:r;p+=(i?'L':'M')+(cx+rr*Math.cos(a)).toFixed(2)+' '+(cy+rr*Math.sin(a)).toFixed(2)}return p+'Z'}
function flag(f,x,y,h){if(f==='cn'){const w=h*1.5,u=h/20;let s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#de2910"/><path d="${star(x+5*u,y+5*u,3*u,0)}" fill="#ffde00"/>`;
  for(const [a,b] of [[10,2],[12,4],[12,7],[10,9]]){const rot=Math.atan2(5-b,5-a)*180/Math.PI+90;s+=`<path d="${star(x+a*u,y+b*u,u,rot)}" fill="#ffde00"/>`}return {w,s:s+`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#0d0b10" stroke-width="${h*.04}"/>`}}
 const w=h*1.9,sh=h/13;let s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f4f0e6"/>`;for(let i=0;i<13;i+=2)s+=`<rect x="${x}" y="${(y+i*sh).toFixed(2)}" width="${w}" height="${sh.toFixed(2)}" fill="#b22234"/>`;
 const cw=w*.4,ch=sh*7;s+=`<rect x="${x}" y="${y}" width="${cw.toFixed(2)}" height="${ch.toFixed(2)}" fill="#3c3b6e"/>`;
 for(let r=0;r<5;r++)for(let c=0;c<6;c++)s+=`<circle cx="${(x+cw*(c+.5+(r%2?.25:0))/6.25).toFixed(2)}" cy="${(y+ch*(r+.5)/5).toFixed(2)}" r="${(h*.028).toFixed(2)}" fill="#fff"/>`;
 return {w,s:s+`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#0d0b10" stroke-width="${h*.04}"/>`}}
/* the name row, written after D2's own (D2 rewrites it on every layout: a MutationObserver writes ours back) */
const cv=D.createElement('canvas').getContext('2d');const tw=(s,fs,f)=>{cv.font=`${fs}px ${f||'Anton'}`;return cv.measureText(s).width+s.length*fs*.02};
let CAP=.735;const capR=()=>{cv.font='100px Anton';const m=cv.measureText('H');if(m.actualBoundingBoxAscent>40)CAP=m.actualBoundingBoxAscent/100};
const log={};
function nameRow(o,i){const m=o.dataset.m,nm=o.querySelector('.m11-nm'),sv=nm&&nm.querySelector('svg'),R=nm&&nm.getBoundingClientRect();if(!R||!R.width)return;capR();
 const w=R.width,h=R.height,pad=h*.3,fh=h*.3,fl=flag(FLAG[m]||'us',0,0,fh),fx=w-h*.16-fl.w,fy=h*.16;
 let fs=h*.62/CAP,vs=fs*.42;const gap=fs*.16,N=NM(m),V=VER(m).toUpperCase(),rk=String(i+1),rw=T==='b'?tw(rk,fs)+fs*.5:0;
 const tot=rw+tw(N,fs)+gap+tw(V,vs,"'Barlow Condensed'"),max=fx-pad-h*.14;if(tot>max){const k=max/tot;fs*=k;vs*=k}
 const y=h/2+fs*CAP/2,x0=pad+(T==='b'?tw(rk,fs)+fs*.5:0),nw=tw(N,fs);
 let s='';if(T==='b'){const rx=pad;s+=`<text class="m12-rk${i?'':' m12-rk1'}" x="${rx.toFixed(2)}" y="${y.toFixed(2)}" font-size="${fs.toFixed(2)}">${rk}</text><rect x="${(pad+tw(rk,fs)+fs*.22).toFixed(2)}" y="${(y-fs*CAP).toFixed(2)}" width="${Math.max(1,fs*.05).toFixed(2)}" height="${(fs*CAP).toFixed(2)}" fill="#8a7d63"/>`}
 s+=`<text class="m11-n" x="${x0.toFixed(2)}" y="${y.toFixed(2)}" font-size="${fs.toFixed(2)}">${esc(N)}</text>`+(V?`<text class="m11-v" x="${(x0+nw+gap).toFixed(2)}" y="${y.toFixed(2)}" font-size="${vs.toFixed(2)}">${esc(V)}</text>`:'');
 s+=`<g class="m12-fl" transform="translate(${fx.toFixed(2)} ${fy.toFixed(2)})">${fl.s}</g>`;
 sv.dataset.m12='1';sv.setAttribute('viewBox',`0 0 ${w} ${h}`);sv.innerHTML=s;
 log[m]={nameCap:+(fs*CAP).toFixed(2),flag:[+fl.w.toFixed(1),+fh.toFixed(1)],flagGap:+(fx-(x0+nw+gap+tw(V,vs,"'Barlow Condensed'"))).toFixed(1)}}
/* the rank marks on the chip (a, c, d) */
ones.forEach((o,i)=>{const pic=o.querySelector('.c7-pic');
 if(T==='d'&&i>0){const im=pic.querySelector('img.c7-base'),c=im.cloneNode();c.className='m12-medal m12-med'+(i+1);c.removeAttribute('style');
  const r=8/(PL[2]-PL[0])*100;c.style.clipPath=`inset(${pc(PL[1],SZ[1])} ${pc(SZ[0]-PL[2],SZ[0])} ${pc(SZ[1]-PL[3],SZ[1])} ${pc(PL[0],SZ[0])} round 2.2%)`;im.after(c)}
 if(T==='a'){const e=D.createElement('div');e.className='m12-et'+(i?'':' m12-et1');e.style.cssText=at(FIELD);e.innerHTML=`<svg viewBox="0 0 ${FIELD[2]-FIELD[0]} ${FIELD[3]-FIELD[1]}" aria-hidden="true"><text class="m12-no" x="64" y="118" font-size="44">No.</text><text class="m12-dg" x="150" y="128" font-size="150">${i+1}</text></svg>`;pic.append(e)}
 if(T==='c'||T==='d'){const e=D.createElement('div');e.className='m12-en'+(i?'':' m12-en1');const r=[PL[0]+16,PL[1]+12,PL[0]+16+96,PL[1]+12+96];e.style.cssText=at(r);
  e.innerHTML=`<svg viewBox="0 0 96 96" aria-hidden="true"><text x="12" y="76" font-size="78">${i+1}</text></svg>`;pic.append(e)}});
/* layout: D2's own (no numerals outside, so the chips take the gutter), then our name rows */
function apply(){W.__m11.layout();ones.forEach((o,i)=>nameRow(o,i))}
ones.forEach((o,i)=>{const sv=o.querySelector('.m11-nm svg');new MutationObserver(()=>{if(sv.dataset.m12==='1'&&sv.querySelector('.m12-fl'))return;nameRow(o,i)}).observe(sv,{childList:true});
 new ResizeObserver(()=>{sv.dataset.m12='';nameRow(o,i)}).observe(o.querySelector('.m11-nm'))});
D.fonts&&D.fonts.ready.then(()=>requestAnimationFrame(apply));apply();
W.__m12={apply,names:log,measure:()=>{const fr=four.getBoundingClientRect(),box=e=>{const r=e.getBoundingClientRect();return [r.left-fr.left,r.top-fr.top,r.width,r.height].map(v=>+v.toFixed(1))};
 const ov=(a,b)=>!(a[0]+a[2]<=b[0]||b[0]+b[2]<=a[0]||a[1]+a[3]<=b[1]||b[1]+b[3]<=a[1]);
 const chips=ones.map(o=>box(o.querySelector('.c7-pic'))),hits=[];
 ones.forEach((o,i)=>{const n=o.querySelector('.m11-n'),v=o.querySelector('.m11-v'),f=o.querySelector('.m12-fl'),r=o.querySelector('.m12-rk');const B=[n,v,r].filter(Boolean).map(box),F=f&&box(f);
  if(F)B.forEach((b,j)=>{if(ov(b,F))hits.push('chip'+(i+1)+':text'+j+'xflag')});const nw=box(o.querySelector('.m11-nm'));if(F&&(F[0]+F[2]>nw[0]+nw[2]+.5||F[1]<nw[1]-.5))hits.push('chip'+(i+1)+':flag out of window')});
 const marks=[...four.querySelectorAll('.m12-et text,.m12-en text,.m12-rk')].map(box);
 return {chips,sizes:chips.map(c=>c[2]+'x'+c[3]),overlap:hits,names:log,marks:marks.map(b=>b[3]),stripRight:box(four.querySelector('.m10-sp')).reduce((a,v,i)=>i==0?v:i==2?a+v:a,0),h:Math.round(fr.height)}}};
D.documentElement.classList.add('m12-ready');
}})();
