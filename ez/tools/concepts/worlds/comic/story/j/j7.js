/* J7 · Talking portraits. Each model's portrait on Meet the models (and on the Leaderboard's tickets) has something to
   say: a small "typing" bubble (the three dots everyone knows from chat) breathes beside the face. Tap the face and it
   speaks its calls for the next close in a speech balloon: up to three companies, biggest first, each with its call,
   and how many more. When the cast first comes on screen, #1 speaks once by itself, so the dots are understood.
   Content is the data only (PENDING, the calls already locked). Reduced motion: no breathing, no pop, same balloons. */
(function(){const D=document,H=D.documentElement;H.classList.add('sj-j7');
const NM=sjNM,cap=t=>((window.CAPS||{})[t])||0,logo=t=>{const c=(window.CO_LOGOS||{})[t];return c?'media/'+c.f:''};
const ps=(window.PENDING||[]).filter(p=>p.calls&&p.calls.length&&p.resolves);
const key=s=>{const [m,d,y]=s.split('/').map(Number);return (y%100)*1e4+m*100+d};
const d0=ps.map(p=>p.resolves).sort((a,b)=>key(a)-key(b))[0];
const next=ps.filter(p=>p.resolves===d0).sort((a,b)=>cap(b.ticker)-cap(a.ticker));
const ny=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',month:'numeric',day:'numeric',year:'2-digit'}).formatToParts(new Date());const g=k=>+ny.find(x=>x.type===k).value;
const dd=d0?Math.round((Date.UTC(2000+(+d0.split('/')[2]%100),+d0.split('/')[0]-1,+d0.split('/')[1])-Date.UTC(2000+g('year'),g('month')-1,g('day')))/864e5):0;
const when=window.__sjWhen||(dd<=0?'Today at the close':dd===1?'Tomorrow at the close':'At the close');
function say(m){const cs=next.map(p=>({p,c:p.calls.find(x=>x.m===m)})).filter(x=>x.c);if(!cs.length)return '';
  return `<span class="sj-say-h">${when}</span>${cs.slice(0,3).map(({p,c})=>`<span class="sj-say-r">${logo(p.ticker)?`<img src="${logo(p.ticker)}" alt=""${((window.CO_LOGOS||{})[p.ticker]||{}).dark?' class="sj-dk"':''}>`:''}<b>${p.co.replace(/ (Inc|Corp|Holdings)\.?$/,'')}</b><em class="${c.dir==='UP'?'wc-tu':'wc-td'}">${c.dir==='UP'?'Up':'Down'} ${c.mag}%</em></span>`).join('')}${cs.length>3?`<a class="sj-say-more" href="#/upcoming">+${cs.length-3} more</a>`:''}`}
const faces=[...D.querySelectorAll('.wc-ch .wc-ch-pic,.wc-sb-r')].map(host=>{const card=host.closest('.wc-ch,.wc-sb-r');const m=card.dataset.m||(((card.querySelector('h3')||{}).textContent||'').trim().toUpperCase());
  const f=host.querySelector('.wc-face');if(!f||!next.length)return null;
  const btn=D.createElement('button');btn.type='button';btn.className='sj-port';btn.setAttribute('aria-label',`${NM[m]||m}: its calls for the next close`);btn.setAttribute('aria-expanded','false');
  f.replaceWith(btn);btn.append(f);btn.insertAdjacentHTML('beforeend','<i class="sj-dots" aria-hidden="true"><i></i><i></i><i></i></i>');
  const bal=D.createElement('div');bal.className='sj-say';bal.setAttribute('role','status');bal.innerHTML=say(m);btn.after(bal);
  return {m,btn,bal,card}}).filter(Boolean);
function close(x){x.card.classList.remove('sj-open');x.btn.setAttribute('aria-expanded','false')}
function open(x,auto){faces.forEach(y=>{if(y!==x)close(y)});x.card.classList.add('sj-open');x.btn.setAttribute('aria-expanded','true');
  if(auto)setTimeout(()=>{if(!x.touched)close(x)},4200)}
faces.forEach(x=>x.btn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();x.touched=1;x.card.classList.contains('sj-open')?close(x):open(x)}));
D.addEventListener('click',e=>{if(!e.target.closest('.sj-say,.sj-port'))faces.forEach(close)});
window.__sjOpen7=i=>{const x=faces[i];if(x)open(x)};window.__sjClose7=()=>faces.forEach(close);
const grid=D.querySelector('.wc-ch-grid');if(grid&&!window.__sjHold){const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){io.disconnect();setTimeout(()=>open(faces[0],true),700)}},{threshold:.4});io.observe(grid)}
window.__sjToggle=on=>{H.classList.toggle('sj-j7',on)};
H.classList.add('sj-ready-j7')})();
