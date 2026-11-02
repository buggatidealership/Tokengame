/* take C3 (owner, 2026-11-02, on C2): each row is two equal halves: the gold caption box is exactly the picture's size (same width, same height),
   so text and picture weigh the same. One type size for all four boxes: the largest at which every box holds its sentence (set by the tightest
   box), refitted on width changes and fonts. Red number tab, kicker, long/short colours and hard shadow as B.
   Phones (below 1000px): the ledger is a strip, so as a half it would be about 60px tall; there the ledger row stacks: the caption box and the strip
   one over the other, both full width and the same height. The frames bleed to 8px from the screen's edges (as the live frames bleed) to give the
   halves room. */
R3start(function(R3){const {D,b2,KEYS,FR,VERB,sayHTML}=R3;b2.classList.add('r3-C3');b2.querySelector('.t4-frs').classList.add('r3');
KEYS.forEach((k,i)=>{const c=D.createElement('div');c.className='r3c3-cap';c.innerHTML=`<div class="r3c3-in"><small>${VERB[k]}</small><span class="r3-tab">${i+1}</span>${sayHTML(k)}</div>`;FR[k].prepend(c)});
window.__r3placeTake=()=>{const cs=KEYS.map(k=>FR[k].querySelector('.r3c3-cap'));
  /* the box takes the picture's own size */
  KEYS.forEach((k,i)=>{const a=FR[k].querySelector('.t4-art'),c=cs[i];c.style.width=a.offsetWidth+'px';c.style.height=a.offsetHeight+'px'});
  /* one size for all: binary search, every box must hold its words inside its padding */
  const fits=()=>cs.every(c=>{const n=c.firstElementChild;return n.scrollHeight<=c.clientHeight-2*parseFloat(getComputedStyle(c).paddingTop)+1&&n.scrollWidth<=n.clientWidth+1});
  let lo=8,hi=96;for(let i=0;i<14;i++){const m=(lo+hi)/2;cs.forEach(c=>c.style.fontSize=m+'px');if(fits())lo=m;else hi=m}
  const f=Math.floor(lo*4)/4;cs.forEach(c=>c.style.fontSize=f+'px');b2.dataset.r3c3fs=f};
R3.done();
if(D.fonts)D.fonts.ready.then(()=>window.__r3place&&window.__r3place());});
