// q4: Darwyn Cooke, DC: The New Frontier (2004). Three widescreen tiers per beat, one point each; a clean line, a limited mid-century palette, a round told as a launch.
(function(){
window.__qNear=9;const D=__qD(66),F=window.__qF||{},PO='media/'+D.r.poster+'.jpg',fr=k=>F[k]||PO,face=__qFace;
const lk=document.createElement('link');lk.rel='stylesheet';lk.href='https://fonts.googleapis.com/css2?family=League+Spartan:wght@600;800;900&family=Patrick+Hand&display=swap';document.head.appendChild(lk);
const C=D.calls,byM=m=>C.find(c=>c.m===m),W=byM(D.win),L=byM(D.lead),ord=['GPT','KIMI','CLAUDE','GROK'].map(byM);
const sgn=v=>(v>0?'+':v<0?'−':'')+Math.abs(v);
// the number line: from the lowest call to the highest of calls and the move, padded
const vals=C.map(c=>c.up?c.sz:-c.sz).concat([D.move,0]);const lo=Math.floor(Math.min(...vals))-.5,hi=Math.ceil(Math.max(...vals))+.5;
const X=v=>((v-lo)/(hi-lo)*100).toFixed(2)+'%';
const ticks=[];for(let t=Math.ceil(lo);t<=Math.floor(hi);t++)ticks.push(`<i class="q4-tk" style="left:${X(t)}"><b>${sgn(t)}%</b></i>`);
const pin=(c,graded,row)=>{const v=c.up?c.sz:-c.sz,cr=graded&&c.m===D.win?'<svg class="q4-crown" viewBox="0 0 40 24" aria-hidden="true"><path d="M3 22 L6 5 L14 14 L20 2 L26 14 L34 5 L37 22 Z"/></svg>':'',
  pt=`<span class="q4-port">${face(c)}</span>`,em=`<em>${c.name} ${sgn(v)}%</em>`,pf=graded?`<b class="q4-pfm">${c.pass?'Pass':'Fail'}</b>`:'',st='<i class="q4-stem"></i>';
  return `<div class="q4-pin q4-r${row} ${graded?(c.pass?'q4ok':'q4no'):''} ${c.m===D.win&&graded?'q4win':''}" style="left:${X(v)};--mc:${c.c}">${row?st+em+cr+pt+pf:pf+cr+pt+em+st}</div>`};
const scale=(graded,cls)=>`<div class="q4-sc ${cls||''}"><div class="q4-ln">${ticks.join('')}<i class="q4-zero" style="left:${X(0)}"></i></div>
  ${[...ord].sort((a,b)=>(a.up?a.sz:-a.sz)-(b.up?b.sz:-b.sz)).map((c,i)=>pin(c,graded,i%2)).join('')}
  <div class="q4-trail" style="left:${X(0)};width:calc(${X(D.move)} - ${X(0)})"></div>
  <div class="q4-rk" style="left:${X(D.move)}"><svg viewBox="0 0 60 28" aria-hidden="true"><path class="bd" d="M4 14 C14 4 40 4 56 14 C40 24 14 24 4 14Z"/><path class="fn" d="M8 14 L0 4 L14 10Z M8 14 L0 24 L14 18Z"/><circle cx="38" cy="14" r="4"/></svg><b>${D.moveS}</b></div></div>`;
const T=(cls,inner,cap)=>`<div class="q4-p ${cls}">${cap?`<span class="q4-cap">${cap}</span>`:''}${inner}</div>`;
const sky=`<svg class="q4-sky" viewBox="0 0 400 200" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
 <rect width="400" height="200" fill="#1c2742"/><rect y="92" width="400" height="108" fill="#d4502c"/><rect y="128" width="400" height="72" fill="#e3a43a"/><circle cx="318" cy="150" r="40" fill="#f2c45a"/>
 <g fill="#1c2742"><rect x="0" y="160" width="400" height="40"/><rect x="10" y="146" width="34" height="20"/><rect x="50" y="138" width="22" height="30"/><rect x="78" y="150" width="26" height="20"/>
 <rect x="112" y="64" width="22" height="110"/><path d="M110 66 L123 26 L136 66Z"/><rect x="140" y="128" width="40" height="40"/><rect x="150" y="116" width="8" height="14"/>
 <rect x="196" y="140" width="80" height="30"/><path d="M212 142 a24 24 0 0 1 48 0Z"/><rect x="232" y="104" width="8" height="16"/><circle cx="236" cy="102" r="3"/>
 <rect x="284" y="150" width="30" height="20"/><rect x="320" y="134" width="18" height="36"/><rect x="346" y="146" width="40" height="24"/></g>
 <circle cx="123" cy="80" r="8" fill="#f2e6c9"/><path d="M123 80 V74.5 M123 80 L126.5 82.5" stroke="#1c2742" stroke-width="1.6" stroke-linecap="round"/>
 <rect y="182" width="400" height="18" fill="#2d7a80"/><path d="M20 190h40M90 194h60M190 189h50M280 195h70" stroke="#e3a43a" stroke-width="2"/></svg>`;
// beat 1
const p1=`<div class="q4-pg" data-p="1">
 ${T('q4-t1 q4-film',`<div class="q4-art" data-subj style="background-image:url(${fr('a')})" role="img" aria-label="${D.co} station, from the round's film"></div><span class="q4-slug">${D.coTk} reports. ${D.ex}, ${D.called}.</span>`)}
 ${T('q4-t2 q4-con',`<div class="q4-row">${ord.map((c,i)=>`<div class="q4-st" style="--mc:${c.c};--d:${i*.5}s"><span class="q4-port">${face(c)}</span><b class="${c.up?'q4u':'q4d'}">${c.up?'Up':'Down'} ${c.sz}%</b><em>${c.name}</em></div>`).join('')}</div>`,'Four AIs call the move.')}
 ${T('q4-t3 q4-split',`<div class="q4-side q4-bull"><span class="q4-big">${D.nUp} up</span><span>${C.filter(c=>c.up).map(c=>`<span class="q4-port">${face(c)}</span>`).join('')}</span></div><div class="q4-lock"><svg viewBox="0 0 30 36" aria-hidden="true"><path class="s" d="M8 16V10a7 7 0 0 1 14 0v6"/><rect x="3" y="15" width="24" height="19" rx="3"/></svg><b>Locked</b></div><div class="q4-side q4-bear"><span>${C.filter(c=>!c.up).map(c=>`<span class="q4-port">${face(c)}</span>`).join('')}</span><span class="q4-big">${D.nDn} down</span></div>`)}
</div>`;
// beat 2
const p2=`<div class="q4-pg" data-p="2">
 ${T('q4-t1 q4-city',sky+`<span class="q4-slug q4-top">${D.exT}. The ${D.ex} close.</span>`)}
 ${T('q4-t2 q4-launch',scale(false),'Where did it land?')}
 ${T('q4-t3 q4-film',`<div class="q4-art q4-mk" data-subj style="background-image:url(${fr('b')})" role="img" aria-label="The market plaque reads ${D.moveS}"></div><span class="q4-slug">${D.co} ${D.up?'rose':'fell'} ${Math.abs(D.move).toFixed(2)}%.</span>`)}
</div>`;
// beat 3
const lead=L.pass?`${L.name}, the season leader, called it too.`:`${L.name} leads the season, and still lost this one.`;
const p3=`<div class="q4-pg" data-p="3">
 ${T('q4-t1 q4-launch q4-graded',scale(true),`${C.filter(c=>c.pass).length} pass. ${C.filter(c=>!c.pass).length} fail.`)}
 ${T('q4-t2 q4-pay',`<div class="q4-row">${ord.map((c,i)=>`<div class="q4-st ${c.m===D.lead?'q4-lead':''}" style="--mc:${c.c};--d:${i*.4}s"><span class="q4-port">${face(c)}</span><b class="q4-cash ${c.v>=0?'q4u':'q4d'}">${D.money(c.v)}</b><em>${c.name}</em>${c.m===D.lead?'<i class="q4-sl">Season leader</i>':''}</div>`).join('')}</div>`,'The money on the call.')}
 ${T('q4-t3 q4-verdict',`<div class="q4-vtx"><b>${W.name} called it closest.</b><span>${W.off}% off the real move. ${lead}</span></div><img class="q4-plq" data-subj src="${fr('c')}" alt="The film crowns ${W.name}'s plaque">`)}
</div>`;
// beat 4
const road=D.near.filter(x=>x.n<D.N).reverse();
const stub=(x,k)=>`<div class="q4-stub ${k===0?'q4-me':''}" style="--k:${k}"><b>Round ${x.n}</b>${x.logo?`<img src="${x.logo}" alt="">`:''}<i>${x.co} (${x.tk})</i><em class="${x.a>0?'q4u':'q4d'}">${x.a>0?'+':'−'}${Math.abs(x.a).toFixed(2)}%</em></div>`;
const p4=`<div class="q4-pg" data-p="4">
 ${T('q4-t1 q4-road',`<svg class="q4-dawn" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden="true"><rect width="400" height="120" fill="#1c2742"/><rect y="40" width="400" height="80" fill="#d4502c"/><rect y="62" width="400" height="58" fill="#e3a43a"/><path d="M200 62 L0 120 H400Z" fill="#2d7a80"/></svg>
   <div class="q4-hand"><span class="q4-k">Round ${D.N} joins the record.</span><b>Every round stays here.</b><span>${D.nRounds} rounds graded so far.</span></div>
   <div class="q4-lane">${[{n:D.N,co:D.co,tk:D.tk,a:D.move,logo:D.logo}].concat(road).map((x,k)=>stub(x,k)).join('')}</div>`)}
</div>`;;
const S=document.createElement('section');S.id='q4s';S.className='q4';S.innerHTML=p1+p2+p3+p4+
 `<nav class="q4-nav">${['Countdown','The close','Graded','The record'].map((t,i)=>`<button data-g="${i+1}"><b>${i+1}</b>${t}</button>`).join('')}<button class="q4-next">Next</button></nav>`;
const hd=document.querySelector('header.top');hd.after(S);S.style.setProperty('--hh',hd.offsetHeight+'px');
const go=n=>{S.dataset.b=n;S.querySelectorAll('.q4-pg').forEach(p=>p.classList.toggle('on',+p.dataset.p===n));S.querySelectorAll('.q4-nav [data-g]').forEach(b=>b.classList.toggle('on',+b.dataset.g===n));S.querySelector('.q4-next').textContent=n<4?'Next':'See every round'};
S.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.g)go(+b.dataset.g);else if(+S.dataset.b<4)go(+S.dataset.b+1)});
window.__qGo=go;go(1);document.documentElement.classList.add('q-ready');
})();
