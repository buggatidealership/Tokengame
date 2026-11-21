/* T1 · Minted: the four founders struck as coins (Hedra, from each founder's own portrait), the leader's in gold; brass plates, Cinzel engraved lettering. */
T3M({id:'t1',fonts:['Cinzel:wght@700;900','Cinzel+Decorative:wght@900','Playfair+Display:wght@900'],
 tok:(T,m)=>`<img src="${T.CUT}coin-${m.toLowerCase()}${m===T.lead&&m==='GROK'?'-gold':''}.webp" alt="${T.esc(T.NM[m])}" draggable="false">`,
 head:{font:'Cinzel Decorative',fill:['#fff7c2','#ffd75a','#c47e0c'],shade:'#5a2a04'}});
