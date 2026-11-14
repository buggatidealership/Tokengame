(function(){const car=document.querySelector('#record .car');if(!car)return;const cs=[...car.querySelectorAll(':scope>.card')];
const graded=cs.filter(c=>!/final grade|calls due/i.test(c.querySelector('.x2p-sl, .slab, [class*=lab]')?c.textContent:c.textContent.slice(0,400)));
const keep=graded.slice(-8).reverse();cs.forEach(c=>{if(!keep.includes(c))c.classList.add('wall-off')});keep.forEach(c=>car.appendChild(c));
const m=document.createElement('div');m.className='wall-more';m.innerHTML='<b>See all '+graded.length+' graded cards</b><span>Newest first · tap a card to turn it</span>';car.after(m);
car.scrollLeft=0;})();
