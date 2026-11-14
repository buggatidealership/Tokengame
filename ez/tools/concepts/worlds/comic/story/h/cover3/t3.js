/* T3 · Sealed: each founder pressed into a wax seal in the lab's own colour (Hedra, from the founder's portrait): GPT green, Claude orange, Grok black, Kimi blue.
   The leader's seal is gilded. Parchment plates, hand-written brush lettering, a slab-serif headline in red wax. */
T3M({id:'t3',fonts:['Caveat+Brush','Abril+Fatface','Playfair+Display:wght@900'],
 tok:(T,m)=>`<img src="${T.CUT}seal-${m.toLowerCase()}.webp" alt="${T.esc(T.NM[m])}" draggable="false">`,
 head:{font:'Abril Fatface',fill:['#ff8f84','#e8302a','#9c120b'],shade:'#3a0402'}});
