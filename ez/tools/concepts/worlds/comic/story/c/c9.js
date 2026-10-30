/* C9 "The coin's reach": one lane per AI. In each, Lucky the coin bounces between the lowest and highest share of right calls a
   coin can reach by luck alone after that many calls (the middle 95% of a fair coin, exact; d.reach). The AI's face sits at its
   real share. The section replays the season round by round: early on the coin bounces almost top to bottom; as calls pile up
   its bounce shrinks. A face above the bounce is out of the coin's reach. */
(function(){const d=window.__scD,{M,NM,face,col,R,N}=d,lo=.25,hi=.8,Y=v=>(hi-Math.max(lo,Math.min(hi,v)))/(hi-lo)*100;
const by=d.ORDER.slice().sort((a,b)=>M[b].hr-M[a].hr),BR={};by.forEach(m=>BR[m]=d.byRound(m));
const outR={};by.forEach(m=>outR[m]=BR[m].map((x,i)=>x.n&&x.k>d.band(x.n).hi?R[i-1].n:0).filter(Boolean));window.__sc9=outR;
const lanes=by.map(m=>'<div class="sc9-ln" data-m="'+m+'" style="--mc:'+col(m)+'"><div class="sc9-tr"><span class="sc9-rail"><i class="sc9-coin">'+d.lucky()+'</i></span>'
  +'<span class="sc9-f">'+face(m)+'<em class="sc9-out">Out of reach!</em></span></div><p class="sc9-nm"><b>'+NM[m]+'</b><span><i class="sc9-k">'+M[m].W+'</i> of <i class="sc9-n">'+M[m].n+'</i> right</span></p></div>').join('');
const runs=a=>{const o=[];a.forEach(n=>{const l=o[o.length-1];if(l&&n===l[1]+1)l[1]=n;else o.push([n,n])});const t=o.map(r=>r[0]===r[1]?''+r[0]:r[0]+' to '+r[1]);return 'rounds '+(t.length>1?t.slice(0,-1).join(', ')+' and '+t[t.length-1]:t[0])};
const g=outR.GROK||[],others=by.filter(m=>m!=='GROK'&&outR[m].length);
const cap='<b>Too early to tell.</b> '+(g.length?'Grok got out of the coin\'s reach for a while ('+runs(g)+'). ':'')+(others.length?others.map(m=>NM[m]).join(' and ')+' too. ':'')+'Today all four are back within it.';
const box=d.sol2('sc9-on','A coin bounces around 50%. Early on, luck lets it bounce high. With every call, it bounces less.',
  '<div class="wc-pn wc-in sc9"><div class="sc9-top"><span class="sc9-rd">After round <b>'+R[N-1].n+'</b></span><button type="button" class="sc9-rp">Replay the season</button></div>'
  +'<div class="sc9-pl"><span class="sc9-yl" style="top:'+Y(.7)+'%">70%</span><span class="sc9-yl sc9-y5" style="top:'+Y(.5)+'%">50%</span><span class="sc9-yl" style="top:'+Y(.3)+'%">30%</span>'
  +'<i class="sc9-half" style="top:'+Y(.5)+'%"></i><div class="sc9-ls">'+lanes+'</div></div><p class="sc9-ax">Share of calls right</p></div>',cap);
const pn=box.querySelector('.sc9'),rd=pn.querySelector('.sc9-rd b'),LN=[...pn.querySelectorAll('.sc9-ln')];
function draw(i){rd.textContent=i?R[i-1].n:0;LN.forEach(l=>{const m=l.dataset.m,x=BR[m][i],n=x.n,v=n?x.k/n:.5,[a,b]=d.reach(n),out=n&&x.k>d.band(n).hi;
  l.querySelector('.sc9-f').style.top=Y(v)+'%';const rl=l.querySelector('.sc9-rail');rl.style.top=Y(b)+'%';rl.style.bottom=(100-Y(a))+'%';l.classList.toggle('sc9-o',!!out);
  l.querySelector('.sc9-k').textContent=x.k;l.querySelector('.sc9-n').textContent=n})}
draw(N);let raf=0;
function play(){if(d.rm()){draw(N);return}cancelAnimationFrame(raf);const t0=performance.now(),dur=7000;pn.classList.add('sc9-play');
  (function f(t){const k=Math.min(1,(t-t0)/dur),i=Math.max(1,Math.round(k*N));draw(i);if(k<1)raf=requestAnimationFrame(f);else pn.classList.remove('sc9-play')})(t0)}
pn.querySelector('.sc9-rp').addEventListener('click',play);
if(!d.rm()&&!window.__scStill){draw(1);new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){o.disconnect();setTimeout(play,300)}},{threshold:.4}).observe(pn)}
document.documentElement.classList.add('sc-ready-c9')})();
