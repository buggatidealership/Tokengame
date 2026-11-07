/* tiles3 mockup overlay (init script). __T3(take,SET): A/B/C swap the tile art for the painted take; D = the corner box. */
(function(){const P='tools/concepts/worlds/comic/story/h/tiles3/';const C2='tools/concepts/worlds/comic/story/h/cast2/img/';
/* face crops in the cast2 1024 squares (x%,y% of the face centre, zoom): measured by eye per founder and beat */
const FACE={win:{GPT:[38,18,1.75],CLAUDE:[48,18,1.75],GROK:[46,18,1.75],KIMI:[52,18,1.75]},lose:{GPT:[40,28,2.2],CLAUDE:[42,26,2.2],GROK:[56,30,2.2],KIMI:[42,30,2.2]}};
const rng=s=>()=>((s=Math.imul(s^s>>>15,1|s)+0x6D2B79F5|0,(s^s>>>13)>>>0)/4294967296);
const poly=(seed,j)=>{const r=rng(seed);const p=[[0,0],[50,0],[100,0],[100,50],[100,100],[50,100],[0,100],[0,50]].map(([x,y])=>[x+(r()-.5)*j*(x==50?.4:1),y+(r()-.5)*j*(y==50?.4:1)]);return 'polygon('+p.map(q=>Math.max(0,Math.min(100,q[0])).toFixed(1)+'% '+Math.max(0,Math.min(100,q[1])).toFixed(1)+'%').join(',')+')'};
const CSS=`
.t3-cb{display:block!important;height:auto!important;position:absolute;right:3.5%;top:20.5%;width:41%;aspect-ratio:.8;z-index:5;filter:drop-shadow(2px 3px 0 #0d0b10)}
.t3-cb .o{position:absolute;inset:0;background:#0d0b10}
.t3-cb .y{position:absolute;inset:3.5px;background:#ffd23a}
.t3-cb .w{position:absolute;left:8%;right:8%;top:27%;bottom:7%;display:flex;gap:2px;background:#0d0b10;padding:1.5px}
.t3-cb .w>i{flex:1;display:block!important;height:100%!important;width:auto!important;margin:0!important;background-repeat:no-repeat;position:relative;filter:sepia(.25) saturate(.95) contrast(1.06)}
.t3-cb .w>i::after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 1.5px 1.5px,rgba(120,70,20,.25) .8px,transparent 1.2px) 0 0/3.5px 3.5px;mix-blend-mode:multiply}
.t3-cb .n{position:absolute;left:0;right:0;top:5%;height:20%;text-align:center;font:400 clamp(10px,10cqw,18px)/1.15 'Bangers',system-ui;color:#0d0b10;letter-spacing:.03em}
.t3-cb.g4 .w{flex-wrap:wrap}.t3-cb.g4 .w>i{flex:0 0 calc(50% - 1px);height:calc(50% - 1px)!important}
.t3-cb svg.x{position:absolute;left:8%;top:27%;width:84%;height:66%;pointer-events:none}
.t3-cb ~ .hr-cb,.t3-d .hr-cb{display:none!important}
`;
function head(m,beat,n){const [x,y,z]=FACE[beat][m];return `<i style="background-image:url(${C2}a-${m.toLowerCase()}-${beat}.jpg);background-size:${z*100}% auto;background-position:${x}% ${y}%"></i>`}
function cbox(r,W){const g=!W.length;const ms=g?['GPT','CLAUDE','GROK','KIMI']:W;
  const x=g?`<svg class="x" viewBox="0 0 100 100" preserveAspectRatio="none">${[[0,0],[50,0],[0,50],[50,50]].map(([a,b],i)=>{const k=rng(r.n*13+i)();return `<path d="M${a+6} ${b+7}Q${a+25} ${b+24+k*3} ${a+44} ${b+43}M${a+43} ${b+6}Q${a+24+k*3} ${b+26} ${a+7} ${b+44}" stroke="#d91f1a" stroke-width="${5.5+k*1.5}" stroke-linecap="round" fill="none" opacity=".93"/>`}).join('')}</svg>`:'';
  return `<span class="t3-cb${g?' g4':''}" aria-hidden="true"><span class="o" style="clip-path:${poly(r.n*31,5)}"></span><span class="y" style="clip-path:${poly(r.n*37,4)}"></span><b class="n">#${r.n}</b><span class="w">${ms.map(m=>head(m,g?'lose':'win')).join('')}</span>${x}</span>`}
window.__T3=async function(take,SET){const st=document.createElement('style');
  if(/^[ABC]2?$/.test(take))st.textContent=SET.map(n=>`.wc-bi[href="#/round/${n}"] .hr-art{background-image:url(${P}img/${take[0].toLowerCase()}-r${n}${take[1]?'-s':''}.jpg)!important;${take[1]?'background-position:center 38%!important':''}}`).join('');
  else st.textContent=CSS;document.head.appendChild(st);
  if(take==='D'){const go=()=>SET.forEach(n=>{const a=document.querySelector(`.wc-bi[href="#/round/${n}"]`);if(!a)return;const cov=a.querySelector('.hr-cov');if(!cov||cov.querySelector('.t3-cb'))return;
      const r=ROUNDS.find(x=>x.n===n);const W=r.win?r.win.split(' & '):[];cov.classList.add('t3-d');cov.insertAdjacentHTML('beforeend',cbox(r,W))});
    go();setInterval(go,300)}}})();
