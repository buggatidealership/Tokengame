/* C7 "Sixteen coins ran the same season": one comic panel per AI. Behind its line, 16 coins each flipped once for every call that
   AI made (heads = right), drawn the same way as the AI's line, ending in a little pile of coins. If the AI's line runs inside the
   pile of coin lines, a coin could have done it. Seeded, so the board shows the same coins every time. */
(function(){const d=window.__scD,{M,NM,face,col}=d,TR=16,lo=.3,hi=.8;
const sm=[];const by=d.ORDER.slice().sort((a,b)=>M[b].hr-M[a].hr),Y=v=>(hi-Math.max(lo,Math.min(hi,v)))/(hi-lo)*100;
const path=(ok,n)=>{let k=0;const p=['M0 '+Y(.5).toFixed(2)],ks=[];ok.forEach((o,i)=>{if(o)k++;ks.push(k);p.push('L'+((i+1)/n*100).toFixed(2)+' '+Y((k+1)/(i+3)).toFixed(2))});return {d:p.join(' '),k,ks}};
const stats={};
const pans=by.map(m=>{const n=M[m].n,ai=path(M[m].cs.map(c=>c.ok),n),coins=[];d.qcoins(n,TR,m).forEach(a=>coins.push(path(a,n)));
  const above=coins.filter(c=>c.k>ai.k).length,top=ai.ks.map((k,i)=>coins.every(c=>c.ks[i]<k)?i+1:0).filter(Boolean);stats[m]={n,k:ai.k,coins:coins.map(c=>c.k),above,topAt:top.join(',')};
  const pile=coins.map((c,j)=>'<i class="sc7-cn" style="top:'+Y((c.k+1)/(n+2)).toFixed(2)+'%;--dx:'+(j%3)*3+'px"></i>').join('');
  return '<article class="wc-pn wc-in sc7-p" style="--mc:'+col(m)+'"><header>'+face(m)+'<b>'+NM[m]+'</b><span><em>'+ai.k+'</em> right of '+n+'</span><i class="sc7-l">'+d.lucky()+'</i></header>'
   +'<div class="sc7-cv"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><line class="sc7-h" x1="0" x2="100" y1="'+Y(.5)+'" y2="'+Y(.5)+'"/>'
   +coins.map((c,j)=>'<path class="sc7-c" d="'+c.d+'"/>').join('')+'</svg><svg class="sc7-ai" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path class="sc7-o" d="'+ai.d+'"/><path class="sc7-a" d="'+ai.d+'"/></svg>'
   +'<div class="sc7-pile">'+pile+'</div><span class="sc7-f" style="top:'+Y((ai.k+1)/(n+2)).toFixed(2)+'%">'+face(m)+'</span>'
   +'<span class="sc7-l">'+d.lucky()+'</span></div></article>'}).join('');
window.__sc7=stats;
const g=d.M.GROK;
const box=d.sol2('sc7-on','Could a coin do as well? We gave 16 coins the same season.',
  '<div class="sc7-g">'+pans+'</div>',
  '<b>Too early to tell.</b> Every AI still runs inside the coins. Each call makes the pile tighter.');
d.reveal(box.querySelector('.sc7-g'));
document.documentElement.classList.add('sc-ready-c7')})();
