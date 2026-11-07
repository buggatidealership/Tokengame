/* N3 · The arena board: a painted scoreboard (green board, ink frame, rivets). The two fighters face each other at the
   top, their names and money on split-flap tiles; the gap is the board's own row; the undercard on the smaller rows.
   Switching windows flips every tile that changes, through the letters to the new figure: the board updating itself.
   The faces turn over on their hinge to the new fighter. */
(function(){const N=SN;
const pad=(s,n,r)=>{if(r)return s.padStart(n,' ');const k=n-s.length;return k>0?' '.repeat(k>>1)+s+' '.repeat(k-(k>>1)):s};
const fl=(s,cls,slot)=>`<span class="n3-fls ${cls||''}" data-slot="${slot}" aria-label="${s.trim()}">${[...s].map(c=>`<i class="n3-fl">${c===' '?'&nbsp;':c}</i>`).join('')}</span>`;
const mon=v=>N.$f(v);
const side=(x,s)=>{const m=x.F[s],v=s==='a'?x.va:x.vb,w=s==='a'?x.wa:x.wb;
  return `<div class="n3-sd n3-${s}" style="--mc:${N.col(m)}">${N.role(x,s)}${N.face(m,'wc-f-xl n3-f',N.held(m))}
   ${fl(pad(N.NM[m].toUpperCase(),6),'n3-nm','n'+s)}${fl(pad(mon(v),8,1),'n3-mn '+(v>=0?'n3-up':'n3-dn'),'m'+s)}${N.wlh(w)}</div>`};
window.SNT={
 render:x=>`<div class="n3-board"><p class="n3-cap">${x.w.k==='season'?'Season':x.w.t} <small>${x.n} round${x.n===1?'':'s'}</small></p>
  <div class="n3-top">${side(x,'a')}<span class="n3-vs">VS</span>${side(x,'b')}</div>
  <div class="n3-gap"><b>Gap</b>${fl(pad(N.$f(Math.abs(x.gap)).replace(/^[+−]/,''),7,1),'n3-gp','g')}</div>
  <div class="n3-und">${x.under.map((m,i)=>`<div class="n3-ur">${N.face(m,'n3-uf')}${fl(pad(N.NM[m].toUpperCase(),6),'n3-nm n3-sm','u'+i)}${fl(pad(mon(x.amts[m]),8,1),'n3-mn n3-sm '+(x.amts[m]>=0?'n3-up':'n3-dn'),'v'+i)}</div>`).join('')}</div><p class="n3-line">${x.line}</p></div>`,
 empty:x=>`<div class="n3-board"><p class="n3-cap">Last 24 hours <small>0 rounds</small></p>
  <div class="n3-q">${fl(pad('NO BELL',8),'n3-nm','qa')}${fl(pad('IN 24H',8),'n3-nm','qb')}</div>
  <div class="n3-und">${['GPT','KIMI','CLAUDE','GROK'].map((m,i)=>`<div class="n3-ur">${N.face(m,'n3-uf')}${fl(pad(N.NM[m].toUpperCase(),6),'n3-nm n3-sm','u'+i)}${fl(pad('$0',8,1),'n3-mn n3-sm','v'+i)}</div>`).join('')}</div><p class="n3-line">${N.quiet()}</p></div>`,
 show:(bout,html,x,prev,anim,after)=>{
  const old={};bout.querySelectorAll('.n3-fls').forEach(s=>old[s.dataset.slot]=[...s.children].map(c=>c.textContent));
  const oldF=[...bout.querySelectorAll('.n3-f')].map(f=>f.outerHTML);
  bout.innerHTML=html;bout.querySelectorAll('.n3-fls [data-to]').forEach(()=>{});
  if(!anim||!Object.keys(old).length)return;
  /* split-flap: every tile that changes rolls through the drum to its new character */
  const DRUM=' ABCDEFGHIJKLMNOPQRSTUVWXYZ$+−0123456789,';
  bout.querySelectorAll('.n3-fls').forEach(s=>{const o=old[s.dataset.slot]||[];[...s.children].forEach((t,i)=>{const to=t.textContent,from=o[i]==null?' ':o[i];if(from===to)return;
    let k=Math.max(0,DRUM.indexOf(from===' '||from===' '?' ':from));const end=DRUM.indexOf(to===' '||to===' '?' ':to);const steps=4+((i*3+s.dataset.slot.length)%5);let n=0;
    t.textContent=from;const tick=()=>{n++;k=(k+1)%DRUM.length;const c=n>=steps?to:DRUM[k];t.textContent=c===' '?' ':c;
      t.animate([{transform:'rotateX(0)'},{transform:'rotateX(-80deg)',offset:.5},{transform:'rotateX(0)'}],{duration:70});if(n<steps)setTimeout(tick,72)};setTimeout(tick,40+i*28)})});
  /* the faces turn on their hinge */
  bout.querySelectorAll('.n3-f').forEach((f,i)=>{if(oldF[i]===f.outerHTML)return;f.animate([{transform:'rotateY(90deg)'},{transform:'none'}],{duration:320,delay:120,easing:'cubic-bezier(.3,1.4,.5,1)',fill:'backwards'})});
  const l=bout.querySelector('.n3-line');if(l)l.animate([{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'none'}],{duration:260,delay:500,fill:'backwards'})}};
SN.mount('n3')})();
