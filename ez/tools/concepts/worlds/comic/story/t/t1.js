/* T1 · The poster wall: every round still to come on one wall of printed fight posters, read like a calendar.
   Each night opens with a black date block; its biggest company headlines on a poster two cells wide (two tall once the calls are in),
   the undercard follows in single cells in its brand colours. One continuous grid, so a night with 1 round and a night with 9 leave no holes. */
(async function(){const T=TT,S=T.S,esc=T.esc;const root=T.mount('t1');if(!root){T.ready();return}
const {L,days}=T.data();await T.prep(L);const C=T.counts(L);
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const rows=(x,up)=>{const cs=T.side(x,up);return cs.length?cs.map(c=>T.call(c)).join(''):'<em class="t1-no">Nobody</em>'};
const corners=x=>`<span class="t1-k t1-bu"><small>Bulls <i aria-hidden="true">▲</i></small>${rows(x,true)}</span><b class="t1-vs" aria-hidden="true">vs</b><span class="t1-k t1-be"><small>Bears <i aria-hidden="true">▼</i></small>${rows(x,false)}</span>`;
const attrs=(x,cls,day)=>`class="${cls}${x.locked?' t1-l':' t1-o'}${x.nv?' t1-nv':''}" href="#/round/${x.n}" data-t="${esc(x.ticker)}" data-n="${x.n}" data-m7="${x.m7?1:0}" data-ai="${x.ai?1:0}" data-day="${day}" style="${T.bv(x.ticker)}"`;
function main(x,day,big){const b=T.bell(x);
  return `<a ${attrs(x,'t1-m',day)} data-main="1"><span class="t1-mb"><span class="t1-me">★ Main event ★</span><span class="t1-mr">R${x.n}${T.tag(x)?' · '+T.tag(x):''}${x.locked?' · Locked':''}</span></span>
    <span class="t1-mh">${T.lg(x.ticker,big)}<span class="t1-mt"><b class="t1-mn">${esc(x.co)}</b><small>${esc(S.tk(x.ticker))}${x.locked&&b?' · '+esc(b):''}</small></span></span>
    ${x.locked?`<span class="t1-mc">${corners(x)}</span>`:`<span class="t1-mq"><small>The calls, due ${T.due(x)}</small><span>${T.ORDER.map(m=>T.wait(m)).join('')}</span></span>`}</a>`}
function under(x,day,box){
  return `<a ${attrs(x,'t1-u',day)}><span class="t1-ub"><b>R${x.n}</b><span class="t1-tk">${esc(S.tk(x.ticker))}</span>${T.tag(x)?`<em>${T.tag(x)}</em>`:''}<i>${x.locked?'Locked':'Admit one'}</i></span>
    <span class="t1-uh">${T.lg(x.ticker,box)}<span class="t1-ut"><b class="t1-un">${esc(x.co)}</b></span></span>
    ${x.locked?`<span class="t1-uc">${corners(x)}</span>`:`<span class="t1-uq">Calls due ${T.dueS(x)}</span>`}</a>`}
function date(k,items,day){const l=S.dayLab(k),lk=items.filter(x=>x.locked).length,n=items.length;
  if(k==='wait')return `<div class="t1-dt t1-dw" data-day="${day}" role="heading" aria-level="2"><span class="t1-dk">On hold</span><b class="t1-dn">?</b><span class="t1-dm">Dates passed</span><span class="t1-ds">${n} round${n>1?'s':''} · calls not in yet</span></div>`;
  const p=S.pd(k),b=lk?T.bell(items[0]):'';
  return `<div class="t1-dt${l.a==='Today'?' t1-now':''}" data-day="${day}" role="heading" aria-level="2" aria-label="${esc(l.a+', '+l.b)}"><span class="t1-dk">${esc(l.a==='Today'||l.a==='Tomorrow'?l.a:S.wd(k,1))}</span><b class="t1-dn">${p.d}</b><span class="t1-dm">${MON[p.m-1]} · ${S.wd(k)}</span>
    <span class="t1-ds">${n} round${n>1?'s':''}${lk?' · '+(lk===n?'all':lk)+' locked':''}</span><span class="t1-dl">${lk?(b?esc(b):'Graded at the close'):'Calls due '+T.dueS(items[0])+'. Graded at the next close.'}</span></div>`}
let lastCols=0;
function draw(){const desk=innerWidth>=1000,big=innerWidth>=1200?120:desk?100:64,box=desk?44:36,obox=desk?72:36;
  let h=`<header class="t1-mast"><div class="t1-mt1"><div class="t1-ttl" role="heading" aria-level="1">Next on the card</div><p class="t1-sub">Every AI predicts each stock <b>before</b> it reports. The next close grades it.</p></div>
    <div class="t1-mt2"><p class="t1-cnt"><span><b>${C.lk}</b> locked</span><span><b>${C.to}</b> still to call</span></p>${T.flt()}</div></header><div class="t1-wall">`;
  days.forEach(({k,items},di)=>{h+=date(k,items,di);items.forEach((x,i)=>{h+=i===0&&k!=='wait'?main(x,di,x.locked?big:obox+16):under(x,di,x.locked?box:obox)})});
  root.innerHTML=h+'</div>';T.wire(root,pack);pack()}
/* the wall's packing: a date block takes one cell, or two when one cell would leave a hole before its main poster */
function pack(){const w=root.querySelector('.t1-wall');if(!w)return;const cols=getComputedStyle(w).gridTemplateColumns.split(' ').length;
  const occ=[];const free=(r,c,wd,ht)=>{if(c+wd>cols)return false;for(let i=0;i<ht;i++)for(let j=0;j<wd;j++)if((occ[r+i]||[])[c+j])return false;return true};
  const put=(r,c,wd,ht)=>{for(let i=0;i<ht;i++){occ[r+i]=occ[r+i]||[];for(let j=0;j<wd;j++)occ[r+i][c+j]=1}};
  let cr=0,cc=0;const place=(wd,ht)=>{let r=cr,c=cc;for(;;){if(free(r,c,wd,ht)){put(r,c,wd,ht);cr=r;cc=c+wd;return [r,c]}c++;if(c>=cols){c=0;r++}}};
  /* where would a w-wide item land from here, without placing it */
  const peek=(wd,ht)=>{let r=cr,c=cc;for(;;){if(free(r,c,wd,ht))return [r,c];c++;if(c>=cols){c=0;r++}}};
  const kids=[...w.children].filter(T.vis);
  kids.forEach((e,i)=>{e.style.gridColumn='';e.style.gridRow='';let wd=1,ht=1;
    if(e.classList.contains('t1-dt')){if(cols<=2)wd=cols;else{const nx=kids[i+1],nm=nx&&nx.classList.contains('t1-m');
        if(nm){const [r,c]=peek(1,1);const left=cols-(c+1);if(left===1)wd=2}}}
    else if(e.classList.contains('t1-m')){wd=Math.min(2,cols);ht=cols>2&&e.classList.contains('t1-l')?2:1}
    e.style.gridColumn='span '+wd;if(ht>1)e.style.gridRow='span '+ht;place(wd,ht)});
  lastCols=cols}
draw();let W0=innerWidth;addEventListener('resize',()=>{if(innerWidth===W0)return;W0=innerWidth;clearTimeout(draw.t);draw.t=setTimeout(draw,200)});
T.ready()})();
