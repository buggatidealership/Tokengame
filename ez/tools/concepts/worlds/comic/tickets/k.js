/* Round 2 of the ticket mockups (owner, 2026-10-29: comic Admit One is the direction; add the live site's green and red,
   a comic holo/shine for #1, and fill the plain body (under the face) the comic way). Adds the parts; k1..k5.css pick. */
(function(){
  const D=document,P=window.PENDING||[],NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
  const el=(t,c,h)=>{const e=D.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};
  const cap=t=>((window.CAPS||{})[t])||0;
  /* the models' newest locked calls: the soonest close, then the biggest company */
  const live=P.filter(p=>p.calls&&p.calls.length&&p.resolves);
  const key=s=>{const [m,d,y]=s.split('/').map(Number);return (y%100)*1e4+m*100+d};
  live.sort((a,b)=>key(a.resolves)-key(b.resolves)||cap(b.ticker)-cap(a.ticker));
  const nx=live[0];
  D.querySelectorAll('.wc-ch').forEach((c,i)=>{
    const nm=(c.querySelector('h3')||{}).firstChild;const m=nm?String(nm.textContent).trim().toUpperCase():'';
    c.dataset.m=m;
    c.append(el('div','kb-top','<span>★</span> Admit one · Season 1 <span>★</span>'),el('div','kb-foot',i===0?'Golden ticket · we bet on its call':'Graded at the close'));
    c.append(el('i','kb-burst'),el('i','kb-speed'),el('i','kb-holo'),el('i','kb-shine'));
    c.append(el('span','kb-spk kb-s1','✦'),el('span','kb-spk kb-s2','✦'),el('span','kb-spk kb-s3','✧'));
    const call=nx&&nx.calls.find(x=>x.m===m);
    if(call){const pic=c.querySelector('.wc-ch-pic');
      pic.append(el('p','kb-say '+(call.dir==='UP'?'kb-up':'kb-dn'),`<small>Tonight</small><b>${nx.ticker}</b>${call.dir==='UP'?'up':'down'} ${call.mag}%!`))}
  });
})();
