/* Ticket mockups (owner, 2026-10-29: "cartoonish ticket format" for the boxes; "show me all three"). Runs in the built X3+
   page; adds the stub and corner parts each take needs, from the page's own data, then html gets the take's class. */
(function(take){
  const D=document,P=window.PENDING||[],R=window.ROUNDS||[],U=window.UPCOMING||[];
  const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
  const el=(t,c,h)=>{const e=D.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};
  const pct=v=>Math.abs(v).toFixed(2).replace(/\.?0+$/,'')+'%';
  D.documentElement.classList.add('tkm','tkm-'+take);
  /* Tomorrow / tonight at the close */
  D.querySelectorAll('.wc-tnp').forEach((a,i)=>{
    const co=a.querySelector('header b').firstChild.textContent.trim(),p=P.find(x=>x.co===co)||{};
    const body=el('div','tk-body');while(a.firstChild)body.appendChild(a.firstChild);
    a.appendChild(el('div','tk-stub',`<b>R${p.n||''}</b><i>Admit one</i>`));a.appendChild(body);
    const cs=p.calls||[];const side=d=>cs.filter(c=>c.dir===d).map(c=>{const f=a.querySelector('.wc-lvs .wc-face[style*="'+((window.MODELS||{})[c.m]||{}).c+'"]');
      return `<span>${f?f.outerHTML:''}<b>${NM[c.m]}</b><em>${c.dir==='UP'?'+':'−'}${c.mag}%</em></span>`}).join('');
    body.appendChild(el('div','tk-corners',`<div class="tk-bull"><h5>Bulls</h5>${side('UP')||'<p>Nobody</p>'}</div><b class="tk-vs">VS</b><div class="tk-bear"><h5>Bears</h5>${side('DOWN')||'<p>Nobody</p>'}</div>`));
    body.appendChild(el('p','tk-foot','Graded at the close'));
    a.append(el('i','tk-n tk-nt'),el('i','tk-n tk-nb'));
    a.style.setProperty('--tilt',(i%2?.7:-.7)+'deg')});
  /* every round so far */
  D.querySelectorAll('.wc-bi').forEach((a,i)=>{
    const n=+(a.getAttribute('href')||'').split('/').pop(),r=R.find(x=>x.n===n);if(!r)return;
    const up=r.a>0,W=r.win?r.win.split(' & '):[];
    a.appendChild(el('span','tk-bs',`<b>#${n}</b><small>${r.ticker}</small><em class="${up?'tk-u':'tk-d'}">${up?'+':'−'}${pct(r.a)}</em>`));
    a.appendChild(el('span','tk-res',W.length?`<i>Winner</i><b>${W.map(m=>NM[m]).join(' & ')}</b>`:`<i>No contest</i><b>Nobody</b>`));
    a.append(el('i','tk-n tk-nl'),el('i','tk-n tk-nr'));
    a.style.setProperty('--tilt',([-.8,.5,-.3,.9,-.6,.4][i%6])+'deg')});
  /* meet the models */
  D.querySelectorAll('.wc-ch').forEach((c,i)=>{const rk=(c.querySelector('.wc-ch-rk')||{}).textContent||'';
    c.prepend(el('div','tk-stub',`<b>${rk}</b><i>${i===0?'Golden ticket':'Admit one'}</i>`));
    c.prepend(el('div','tk-belt',i===0?'Champion':'Contender'));c.append(el('i','tk-n tk-nt'),el('i','tk-n tk-nb'));
    c.style.setProperty('--tilt',(i%2?.6:-.6)+'deg')});
  /* smart or lucky */
  D.querySelectorAll('.wc-cn').forEach((c,i)=>{const p=(c.querySelector('.wc-cn-p')||{}).textContent||'';const h=parseFloat(p);
    c.appendChild(el('div','tk-stub',`<b>${p}</b><i>right</i>`));
    c.appendChild(el('span','tk-verdict '+(h>50?'tk-win':'tk-lose'),h>50?'Beats the coin':'Loses to the coin'));
    c.append(el('i','tk-n tk-nt'),el('i','tk-n tk-nb'));c.style.setProperty('--tilt',(i%2?.5:-.5)+'deg')});
})(window.__take||'t1');
