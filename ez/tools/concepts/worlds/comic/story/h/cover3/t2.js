/* T2 · Season tickets: each founder printed on a Season 1 ticket stub (Hedra card stock, the founder's own portrait in its window);
   the leader holds the gold one. Cream card plates, red ink, wood-type headline. */
T3M({id:'t2',fonts:['Ultra','Bitter:wght@700;800','Playfair+Display:wght@900'],
 tok:(T,m,cls)=>{const f=`<img class="m2-f" src="${T.fsrc(m)}" alt="${T.esc(T.NM[m])}">`;if(/m-gtc/.test(cls))return `<span class="m2-pt">${f}</span>`;
   return `<span class="m2-tk"><img class="m2-c" src="${T.CUT}tk-${m===T.lead?'gold':'cream'}.webp" alt=""><span class="m2-pt">${f}</span></span>`},
 head:{font:'Ultra',fill:['#fffaf0','#ffe9b8','#f2c46a'],shade:'#7a0f08'}});
