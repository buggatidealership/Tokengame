(function(){const {D,b2,KEYS,FR}=F2;b2.classList.add('f2-B');b2.querySelector('.t4-frs').classList.add('f2','f2-pp');
KEYS.forEach((k,i)=>{const c=D.createElement('div');c.className='f2b-cap';c.innerHTML=`<small>${F2.VERB[k]}</small><span class="f2-tab">${i+1}</span>${F2.sayHTML(k)}`;FR[k].prepend(c)});
/* the caption box takes 62% of its height above the picture: every panel's picture starts at the same depth (the tallest caption sets it) */
window.__f2placeTake=()=>{const cs=[...b2.querySelectorAll('.f2b-cap')],h=Math.max(...cs.map(c=>c.offsetHeight));b2.style.setProperty('--f2capH',Math.round(h*.8)+'px')};
F2.done();})();
