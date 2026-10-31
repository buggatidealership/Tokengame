// q3: EC Comics (1950s horror and sci-fi). "Tales from the Ticker": the Ticket Keeper narrates one round to the reader, page by page, to a twist.
(function(){
const D=__qD(66),F=window.__qF||{},PO='media/'+D.r.poster+'.jpg';
const fr=k=>F[k]||PO, face=__qFace, H='media/commissioner/web/';
const lk=document.createElement('link');lk.rel='stylesheet';lk.href='https://fonts.googleapis.com/css2?family=Creepster&family=Comic+Neue:wght@700&display=swap';document.head.appendChild(lk);
const C=D.calls, byM=m=>C.find(c=>c.m===m), W=byM(D.win), L=byM(D.lead);
const arrow=up=>`<svg class="q3-ar ${up?'q3up':'q3dn'}" viewBox="0 0 20 20" aria-hidden="true"><path d="${up?'M10 2 L18 12 H13 V18 H7 V12 H2 Z':'M10 18 L18 8 H13 V2 H7 V8 H2 Z'}"/></svg>`;
const host=(img,txt,cls)=>`<div class="q3-cap ${cls||''}"><img class="q3-host" src="${H+img}.webp" alt=""><p>${txt}</p></div>`;
const crown=`<svg class="q3-crown" viewBox="0 0 40 26" aria-hidden="true"><path d="M3 23 L6 6 L14 15 L20 2 L26 15 L34 6 L37 23 Z"/><circle cx="20" cy="3" r="2.4"/><circle cx="6" cy="6" r="2"/><circle cx="34" cy="6" r="2"/></svg>`;
const bell=`<svg class="q3-bell" viewBox="0 0 80 80" aria-hidden="true"><path class="b" d="M40 8c-15 0-22 13-22 27v14l-8 10h60l-8-10V35c0-14-7-27-22-27z"/><path class="h" d="M28 20c3-5 7-7 12-7"/><circle class="c" cx="40" cy="66" r="7"/><path class="l" d="M6 22l8 6M4 40h9M74 22l-8 6M76 40h-9"/></svg>`;
const lock=`<svg class="q3-lock" viewBox="0 0 30 36" aria-hidden="true"><path class="s" d="M8 16V10a7 7 0 0 1 14 0v6"/><rect x="3" y="15" width="24" height="19" rx="3"/><circle cx="15" cy="24" r="3"/></svg>`;
const burst=(t,cls)=>`<div class="q3-burst ${cls||''}"><svg viewBox="0 0 200 110" preserveAspectRatio="none" aria-hidden="true"><path d="M100 2 L116 26 L150 6 L146 34 L196 30 L162 52 L198 76 L150 74 L156 106 L118 84 L100 108 L82 84 L44 106 L50 74 L2 76 L38 52 L4 30 L54 34 L50 6 L84 26 Z"/></svg><b>${t}</b></div>`;
const ord=['GPT','KIMI','CLAUDE','GROK'].map(byM);
const pn=(c,i,body,extra)=>`<div class="q3-p q3-ai q3-c${i} ${extra||''}" style="--d:${i*.55}s;--mc:${c.c}"><div class="q3-fc${c.m===D.lead?' q3-lead':''}">${c.m===D.win&&/g/.test(extra||'')?crown:''}${face(c)}</div>${body}<span class="q3-nm">${c.name}</span></div>`;
// beat 1: locked
const p1=`<div class="q3-pg" data-p="1">
 <div class="q3-p q3-ti"><span class="q3-mast">Tales from the Ticker</span><h3 class="q3-h">The Shell Game!</h3>
  ${host('02-presenter',`Greetings, traders! Tonight, <b>${D.coTk}</b> reports. Four machines must call the move first. Up or down? Heh-heh!`)}</div>
 <div class="q3-p q3-art" style="background-image:url(${fr('a')})" role="img" aria-label="${D.co} station, from the round's film"></div>
 <div class="q3-g">${ord.map((c,i)=>pn(c,i,`<div class="q3-bal" style="--bc:${c.c}">${arrow(c.up)}${c.up?'Up':'Down'} ${c.sz}%!</div>`)).join('')}</div>
 <div class="q3-p q3-foot">${lock}<p>Locked ${D.called}. ${D.nUp} said up. ${D.nDn} said down. No take-backs!</p></div>
</div>`;
// beat 2: the close
const p2=`<div class="q3-pg" data-p="2">
 ${host('08-watch',`The ${D.ex} close crept closer. ${D.exT}. Tick... tock...`,'q3-top')}
 <div class="q3-p q3-bellp">${bell}<b class="q3-bong">Bong!</b><span>${D.ex} close · ${D.graded}</span></div>
 <div class="q3-p q3-mk"><div class="q3-mkart" style="background-image:url(${fr('b')})" role="img" aria-label="The market plaque in the film reads ${D.moveS}"></div>${burst('Ka-boom!','q3-kb')}</div>
 <div class="q3-p q3-react"><b class="q3-mv ${D.up?'q3up':'q3dn'}">${arrow(D.up)}${D.co} ${D.up?'rose':'fell'} ${Math.abs(D.move).toFixed(2)}%!</b><div class="q3-faces">${ord.map(c=>`<i style="--mc:${c.c}">${face(c)}<em>${c.up===D.up?'Ha!':'Gulp!'}</em></i>`).join('')}</div></div>
</div>`;
// beat 3: graded
const tw=L.pass?`The twist? ${L.name} leads the season. It called this one too: ${D.money(L.v)}.`:`The twist? ${L.name} leads the season. It lost ${D.money(L.v).slice(1)} on ${D.co}.`;
const p3=`<div class="q3-pg" data-p="3">
 ${host('03-stamping',`Now the grading. The market stamps every call. Heh-heh!`,'q3-top')}
 <div class="q3-p q3-art3" style="background-image:url(${fr('c')})" role="img" aria-label="The film crowns ${W.name}'s plaque. The market reads ${D.moveS}"></div>
 <div class="q3-g q3-g3">${ord.map((c,i)=>pn(c,i,`<span class="q3-call">Said ${c.signed}%</span><b class="q3-st ${c.pass?'ok':'no'}">${c.pass?'Pass':'Fail'}</b><b class="q3-cash ${c.v>=0?'q3up':'q3dn'}">${D.money(c.v)}</b>${c.m===D.win?`<em class="q3-off">Winner · ${c.off}% off</em>`:''}${c.m===D.lead?'<em class="q3-gl">Season leader</em>':''}`,'g')).join('')}</div>
 <div class="q3-p q3-twist"><p>${tw}</p></div>
</div>`;
// beat 4: hand-off
const st=x=>`<div class="q3-stub${x.n===D.N?' q3-me':''}"><b>R${x.n}</b>${x.logo?`<span class="q3-lg"><img src="${x.logo}" alt=""></span>`:''}<i>${x.co} (${x.tk})</i><em class="${x.a>0?'q3up':'q3dn'}">${x.a>0?'+':'−'}${Math.abs(x.a).toFixed(2)}%</em></div>`;
const row=D.near.filter(x=>x.n<D.N).concat([{n:D.N,co:D.co,tk:D.tk,a:D.move,logo:D.logo}],D.near.filter(x=>x.n>D.N));
const p4=`<div class="q3-pg" data-p="4">
 <div class="q3-p q3-vault"><span class="q3-vt">The Record</span><div class="q3-drawer">${row.map(st).join('')}</div><b class="q3-slam">Ka-chunk!</b></div>
 ${host('01-welcome',`Round ${D.N} joins the record. Every round stays here. All ${D.nRounds} so far. Read them all, if you dare!`,'q3-end')}
</div>`;
const S=document.createElement('section');S.id='q3s';S.className='q3';S.innerHTML=p1+p2+p3+p4+
 `<nav class="q3-nav"><span class="q3-dots">${['Locked','The close','Graded','The record'].map((t,i)=>`<button data-g="${i+1}">${i+1} ${t}</button>`).join('')}</span><button class="q3-next">Next!</button></nav>`;
const hd=document.querySelector('header.top');hd.after(S);S.style.setProperty('--hh',hd.offsetHeight+'px');
const go=n=>{S.dataset.b=n;S.querySelectorAll('.q3-pg').forEach(p=>p.classList.toggle('on',+p.dataset.p===n));S.querySelectorAll('.q3-dots button').forEach(b=>b.classList.toggle('on',+b.dataset.g===n));S.querySelector('.q3-next').textContent=n<4?'Next!':'See every round';};
S.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.g)go(+b.dataset.g);else if(b.classList.contains('q3-next')&&+S.dataset.b<4)go(+S.dataset.b+1)});
window.__qGo=go;go(1);document.documentElement.classList.add('q-ready');
})();
