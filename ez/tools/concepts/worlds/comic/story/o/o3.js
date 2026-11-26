/* O3 · The gallery takes turns. The pictures live on their own, but never two at once: one picture on screen moves (one
   loop, about 2.7 s), settles, a pause of one to three seconds, then another one somewhere else. At any moment at most
   one thing moves, so you catch life from the corner of your eye without being told where to look. Off screen, or in a
   hidden tab, the turns stop. */
(function(){const S=SO,ps=S.pics();if(S.rm()){S.ready('o3');return}
  ps.forEach(p=>{p.lay=S.layer(p,'mv');p.last=-1e9});S.watch(ps);let last=null,stop=0,timer=0;
  async function turn(){if(stop)return;const vis=ps.filter(p=>p.vis&&p!==last);
    if(!vis.length||D0.hidden){timer=setTimeout(turn,1500);return}
    const p=vis[Math.floor(Math.random()*vis.length)];last=p;await S.once(p,p.lay,{fin:500,fout:800});timer=setTimeout(turn,1000+Math.random()*2000)}
  const D0=document;ps.forEach(p=>S.blob(p.key));timer=setTimeout(turn,1200);
  window.__soStop=()=>{stop=1;clearTimeout(timer)};window.__soPics=ps;S.H.classList.add('so-o3');S.ready('o3')})();
