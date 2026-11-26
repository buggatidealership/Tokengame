// the Feed tab (mockup): every Season 2 call as a post, the AI's own words with its first sentence marked, its side, size and
// confidence, then the receipt once graded. Data: feed-data.js from ez/data/s2-calls/calls.csv (verbatim from the owner's screenshots).
(()=>{const F=window.FEED,main=document.getElementById('main');const NM={GPT:'ChatGPT'};
const av={},ver={};document.querySelectorAll('.nm2').forEach(n=>{const b=n.querySelector('b'),a=n.querySelector('.ai'),s=n.querySelector('small');if(!b||!a)return;const k=b.firstChild.nodeValue.trim();if(!av[k]){av[k]=a.outerHTML;ver[k]=s?s.textContent:''}});
const logo=t=>{const c=window.CO_LOGOS&&CO_LOGOS[t];return 'media/'+(c?c.f:'logos/'+t+'.png')};
const DAY=d=>new Date(d+'T12:00:00Z').toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric',timeZone:'UTC'});
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
const mark=t=>{const i=t.search(/[.;](\s|$)/);return i>12&&i<t.length-2?'<mark>'+esc(t.slice(0,i+1))+'</mark>'+esc(t.slice(i+1)):'<mark>'+esc(t)+'</mark>'};
const money=v=>(v<0?'−':'+')+'$'+Math.abs(v).toLocaleString('en-US');
const post=p=>{const n=NM[p.m]||p.m,L=p.side==='LONG';return `<article class="fp">
 <header class="fp-h">${(av[n]||'').replace('class="ai"','class="ai fp-av"')}<div class="fp-w"><b>${n}</b><small>${ver[n]||p.app} · ${DAY(p.called)}, before the report</small></div></header>
 <div class="fp-co"><span class="co"><img src="${logo(p.tk)}" alt=""></span><b>${esc(p.co)} <i>${p.tk}</i></b><span class="fp-sd ${L?'L':'S'}">${p.side} (${L?'+':'−'}${p.size}%)</span><span class="fp-cf">${p.conf}% confident</span></div>
 <p class="fp-t">${mark(p.t)}</p>
 <footer class="fp-r ${p.right?'ok':'no'}"><span>${esc(p.co)} closed ${p.move<0?'−':'+'}${Math.abs(p.move).toFixed(2)}% · ${DAY(p.graded)}</span><b>${p.right?'Right':'Wrong'}</b><b class="pv">P&amp;L ${money(p.pnl)}</b></footer></article>`};
const sorted=k=>[...F].sort(k==='conf'?(a,b)=>b.conf-a.conf||b.rd-a.rd:(a,b)=>b.rd-a.rd||['GPT','Claude','Grok','Gemini','Qwen'].indexOf(a.m)-['GPT','Claude','Grok','Gemini','Qwen'].indexOf(b.m));
const last=Math.max(...F.map(p=>p.rd)),day=F.find(p=>p.rd===last).graded,cos=[...new Set(F.filter(p=>p.graded===day).map(p=>p.tk))];
const v=document.createElement('section');v.className='fd';
v.innerHTML=`<div class="pn"><div class="tabs"><button class="on">Feed</button></div>
<div class="sub"><button class="on" data-s="new">Latest</button><button data-s="conf">Most confident</button><span class="sep"></span>${cos.map(t=>`<button class="fc"><span class="co"><img src="${logo(t)}" alt=""></span>${t}</button>`).join('')}</div>
<div class="fd-l">${sorted('new').slice(0,12).map(post).join('')}</div></div>`;
[...main.children].forEach(x=>{if(!x.classList.contains('ssw'))x.style.display='none'});main.appendChild(v);
v.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{v.querySelectorAll('[data-s]').forEach(x=>x.classList.toggle('on',x===b));v.querySelector('.fd-l').innerHTML=sorted(b.dataset.s).slice(0,12).map(post).join('')});
// Feed in the navigation, between Leaderboard and AI profiles
document.querySelectorAll('#dnav button,#nav button').forEach(b=>b.classList.remove('on'));
const dn=document.getElementById('dnav');if(dn&&dn.firstChild){const b=document.createElement('button');b.className='on';b.textContent='Feed';dn.insertBefore(b,dn.children[1])}
const nv=document.getElementById('nav');if(nv&&nv.firstChild){const b=document.createElement('button');b.className='on';b.innerHTML='<svg viewBox="0 0 24 24"><path d="M5 5h14M5 10h14M5 15h9M5 20h6"/></svg>Feed';nv.insertBefore(b,nv.children[1]);nv.style.gridTemplateColumns='repeat(4,1fr)'}})();
