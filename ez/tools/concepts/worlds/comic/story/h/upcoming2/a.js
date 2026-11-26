/* Take A · Rooftop marquee. Ground: the dusk sky with crossing searchlights, one per fight-night page.
   Day head: the theatre's changeable-letter board, each letter its own lit tile slotted on the painted tracks (fills the width).
   Main event: a-roof, the mark lit on the sign's blank panel with bulbs traced round it. Calls: each AI thinks (a cloud, "?")
   until its call is in, then says it (a speech balloon, green up, red down). Undercard: small sign boxes on the ledge, bulbs on their rims. */
(async function(){const {U,S,e}=H2;
const tiles=(s,seed)=>{const r=U.rnd(U.hash(seed));return [...s].map(ch=>ch===' '?'<i class="a-sp"></i>':`<i class="a-tl" style="--r:${((r()*2-1)*2.2).toFixed(1)}deg;--y:${((r()*2-1)*1.2).toFixed(1)}px">${e(ch)}</i>`).join('')};
const head=d=>{const n=d.items.length,m=d.items[0];return `<div class="a-board"><img src="${H2.I}d-board.jpg" alt=""><div class="a-rows">
   <p class="a-row">${tiles('FIGHT NIGHT',d.k+1)}</p><p class="a-row">${tiles((d.lab.a+' '+d.lab.b).toUpperCase(),d.k+2)}</p>
   <p class="a-row a-row3">${tiles(n+' BOUTS · '+(m.locked?'GRADED AT THE CLOSE':'CALLS DUE '+S.wd(m.day).toUpperCase()),d.k+3)}</p></div></div>`};
/* balloons: a thought cloud while waiting, a speech balloon once said; each outline is drawn by hand from a seed */
const cloud=(seed)=>{const r=U.rnd(U.hash(seed)),P=[];const n=9;for(let i=0;i<n;i++){const a=i/n*Math.PI*2,b=(i+1)/n*Math.PI*2,rx=27,ry=17;
   const x0=30+rx*Math.cos(a),y0=20+ry*Math.sin(a),x1=30+rx*Math.cos(b),y1=20+ry*Math.sin(b),am=(a+b)/2,k=1.42+r()*.16;P.push(`${i?'':'M'+x0.toFixed(1)+' '+y0.toFixed(1)}Q${(30+rx*k*Math.cos(am)).toFixed(1)} ${(20+ry*k*Math.sin(am)).toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`)}
   return `<svg viewBox="-12 -12 84 70" aria-hidden="true"><path class="o" d="${P.join('')}Z"/><circle class="o" cx="19" cy="48" r="4.2"/><circle class="o" cx="13" cy="55" r="2.6"/></svg>`};
const speech=(seed)=>{const r=U.rnd(U.hash(seed)),j=()=>((r()*2-1)*1.4).toFixed(1);
   return `<svg viewBox="-6 -6 72 62" aria-hidden="true"><path class="o" d="M${4+ +j()} ${8+ +j()}C${4} ${0} ${56} ${-1+ +j()} ${57+ +j()} ${8}C${61} ${20+ +j()} ${60} ${33} ${50+ +j()} ${36+ +j()}L28 ${37+ +j()}L16 52L19 ${37+ +j()}C${6} ${37} ${0+ +j()} ${24} ${4+ +j()} ${8+ +j()}Z"/></svg>`};
const calls=x=>H2.callsOf(x).map(({m,c},i)=>`<span class="a-cl ${c?(c.dir==='UP'?'up':'dn'):'q'}" style="--mc:${S.col(m)};--d:${i}">
   <span class="a-bl">${c?speech(m+x.n):cloud(m+x.n)}<b>${H2.ctext(c)}</b></span>${U.face(m,'a-fc')}<span class="h2-sr">${e(H2.csr(m,c))}</span></span>`).join('');
const und=x=>{const ps=H2.callsOf(x);return `<a class="hu-it a-box" ${U.itAttr(x)} style="${S.bvars(S.brand(x.ticker))}"><span class="a-cab">
   <span class="a-face">${U.logoEl(x.ticker,'a-lg','own',56)}</span><i class="a-rim" data-rim></i></span>
   <span class="a-tx"><b class="hu-t h2-fit">${e(U.nm(x.ticker))}</b><small>${e(S.tk(x.ticker))} · R${x.n}${x.m7?' · Mag 7':''}</small>
   <span class="a-mini">${ps.map(({m,c})=>`<i class="${c?(c.dir==='UP'?'up':'dn'):'q'}" style="--mc:${S.col(m)}">${U.face(m,'a-mf')}<em>${c?(c.dir==='UP'?'▲':'▼'):'?'}</em></i>`).join('')}</span></span></a>`};
await H2.build({cls:'tA',scene:'a-roof-2k',callsIn:true,head,calls,und,after:root=>{
  root.querySelectorAll('[data-rim]').forEach(el=>{const p=el.parentElement,w=Math.round(p.clientWidth)||96,h=Math.round(p.clientHeight)||72;el.outerHTML=H2.bulbsSvg(H2.rectBulbs(w,h,11,5),{size:2.3})})}})})();
