/* O1 · Lamplight (the faintest). Nothing in the picture moves: only its own light breathes. Each film's one spot (the
   turbines' sky, the fans' lightsticks, the lathe's beam, the shop's doorway) slowly brightens and dims, about once every
   nine seconds, each picture on its own rhythm so no two pulse together. No shape changes, so it reads as light falling
   on a printed picture, not as video. Tiles with no film stay plain: the light itself says "there is a film behind me". */
(function(){const S=SO,ps=S.pics();if(S.rm()){S.ready('o1');return}
  ps.forEach((p,i)=>{const l=S.layer(p,'lit');l.src=S.B+'r'+p.key+'-lit.webp';const d=8+((i*37)%30)/10;l.style.animationDuration=d+'s';l.style.animationDelay=(-((i*53)%90)/10)+'s'});
  S.watch(ps);S.H.classList.add('so-o1');window.__soPics=ps;S.ready('o1')})();
