/* C8 "Ten rematches": for each AI, the coin plays its exact season ten times: one flip per call the AI made, heads = right.
   Each coin chip spins and counts up to its score; a coin that beat the AI stays gold, one that lost goes dull. Scores are the
   representative coins (evenly spaced over a fair coin's spread, d.qcoins), shown in a seeded order, so "beat it N times in 10"
   is the real chance, rounded to tenths. */
(function(){const d=window.__scD,{M,NM,face,col}=d,TR=10;
const by=d.ORDER.slice().sort((a,b)=>M[b].hr-M[a].hr),stats={};
const rows=by.map(m=>{const n=M[m].n,k=M[m].W,sc=d.qcoins(n,TR,m).map(a=>a.filter(Boolean).length),r=d.rng(d.seed(m,77));
  for(let i=sc.length-1;i>0;i--){const t=Math.floor(r()*(i+1));[sc[i],sc[t]]=[sc[t],sc[i]]}
  const w=sc.filter(x=>x>k).length,t=sc.filter(x=>x===k).length;stats[m]={n,k,coins:sc,beat:w,tied:t};
  const say=w?'The coin beat '+NM[m]+' <b>'+w+(w===1?' time':' times')+'</b> in 10'+(t?', tied '+t:'')+'.':(t?'The coin tied '+NM[m]+' <b>'+t+(t===1?' time':' times')+'</b> in 10, never beat it.':'The coin never beat '+NM[m]+' in 10 tries.');
  return '<article class="wc-pn wc-in sc8-r" style="--mc:'+col(m)+'"><header>'+face(m)+'<b>'+NM[m]+'</b><span class="sc8-k"><em>'+k+'</em>right of '+n+'</span><span class="sc8-vs">vs</span></header>'
   +'<ol class="sc8-cs" aria-label="The coin\'s scores in ten tries of '+n+' flips">'+sc.map((x,i)=>'<li class="sc8-c '+(x>k?'sc8-w':x===k?'sc8-t':'sc8-l')+'" style="--i:'+i+'" data-v="'+x+'"><b>'+x+'</b></li>').join('')+'</ol>'
   +'<p class="sc8-say">'+say+'</p></article>'}).join('');
window.__sc8=stats;
const box=d.sol2('sc8-on','Could a coin do as well? It played each AI\'s season ten times.',
  '<div class="sc8-hd"><span class="sc8-lk">'+d.lucky()+'</span><p>One flip for every call. Heads counts as right. The number is how many it got right.</p></div><div class="sc8-g">'+rows+'</div>',
  '<b>Too early to tell.</b> A coin still matches or beats each of them now and then. With more calls, its lucky runs get rarer.');
const g=box.querySelector('.sc8-g');d.reveal(g);
/* each chip counts up as if flipping, then lands on its score (not with reduced motion) */
if(!d.rm())new IntersectionObserver((es,o)=>{if(!es[0].isIntersecting)return;o.disconnect();g.querySelectorAll('.sc8-c').forEach((c,i)=>{const v=+c.dataset.v,b=c.querySelector('b'),t0=performance.now()+(i%10)*110+Math.floor(i/10)*250;b.textContent='0';
  (function f(t){const k=Math.max(0,Math.min(1,(t-t0)/700));b.textContent=Math.round(v*(1-Math.pow(1-k,2)));if(k<1)requestAnimationFrame(f);else c.classList.add('sc8-done')})(performance.now())})},{threshold:.25}).observe(g);
else g.querySelectorAll('.sc8-c').forEach(c=>c.classList.add('sc8-done'));
document.documentElement.classList.add('sc-ready-c8')})();
