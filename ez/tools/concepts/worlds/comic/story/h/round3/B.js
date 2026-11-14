/* take B: the sentence is the panel's narration caption, on a gold caption box biting the panel's top corner (read before the picture, as in a comic).
   One panel under the other at every width. Desktop (from 1000px): one 560px column, captions overhanging the margin on alternating sides.
   html.r3-stair: the staircase instead: panels alternate left and right, each starting halfway down the one
   before, the caption box on the outer corner, so the order still reads top to bottom (no 2x2 quadrants). */
R3start(function(R3){const {D,b2,KEYS,FR,VERB,sayHTML}=R3;b2.classList.add('r3-B');b2.querySelector('.t4-frs').classList.add('r3');
KEYS.forEach((k,i)=>{const c=D.createElement('div');c.className='r3b-cap';c.innerHTML=`<small>${VERB[k]}</small><span class="r3-tab">${i+1}</span>${sayHTML(k)}`;FR[k].prepend(c)});
window.__r3placeTake=()=>{const fs=KEYS.map(k=>FR[k]),wide=innerWidth>=1000,stair=wide&&D.documentElement.classList.contains('r3-stair');
  fs.forEach(f=>{const c=f.querySelector('.r3b-cap');f.style.setProperty('--capH',Math.round(c.offsetHeight*(wide?.6:.78))+'px');f.style.marginTop=''});
  /* staircase: a panel starts at half the height of the one before, but its caption box stays 26px clear of the panel two back (same side) */
  if(stair)fs.forEach((f,i)=>{if(!i)return;const p=fs[i-1],pa=p.querySelector('.t4-art').getBoundingClientRect(),pr=p.getBoundingClientRect();
    let top=pa.top+pa.height*.5-(f.querySelector('.t4-art').getBoundingClientRect().top-f.getBoundingClientRect().top)*.4;
    if(i>1){const q=fs[i-2].querySelector('.t4-art').getBoundingClientRect();top=Math.max(top,q.bottom+26)}
    f.style.marginTop=Math.round(top-pr.bottom)+'px'})};
R3.done();});
