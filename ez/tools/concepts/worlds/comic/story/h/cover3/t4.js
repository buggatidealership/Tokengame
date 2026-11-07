/* T4 · Cameos: the simplest. The founders' own painted portraits in hand-inked round frames, each frame in its lab's colour, the leader's in gold foil.
   Yellow caption boxes with comic hand lettering (Kalam, each glyph set by hand), the pop cover's extruded headline. */
T3M({id:'t4',fonts:['Kalam:wght@700','Playfair+Display:wght@900'],
 tok:(T,m)=>{const c={GPT:'#1fb87a',CLAUDE:'#e8743b',GROK:'#2a2730',KIMI:'#2f6bff'}[m];
   return `<span class="m4-cm" style="--mc:${c}"><img src="${T.fsrc(m)}" alt="${T.esc(T.NM[m])}"><svg viewBox="0 0 100 100" aria-hidden="true"><path class="r" d="M50 3 C78 2 98 22 97 51 C96 79 77 98 49 97 C21 96 3 78 3 50 C4 22 22 4 50 3Z M50 11 C29 11 11 28 11 50 C11 72 28 89 50 89 C72 89 89 71 89 50 C89 28 72 11 50 11Z"/><path class="o" d="M50 3 C78 2 98 22 97 51 C96 79 77 98 49 97 C21 96 3 78 3 50 C4 22 22 4 50 3Z"/><path class="i" d="M50 11 C29 11 11 28 11 50 C11 72 28 89 50 89 C72 89 89 71 89 50 C89 28 72 11 50 11Z"/><path class="h" d="M22 22 Q34 10 52 8"/></svg></span>`},
 head:{font:'Luckiest Guy',fill:'gold'}});
