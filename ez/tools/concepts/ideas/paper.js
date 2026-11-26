// card stock: a cut edge under every bet-stock ticket (a tan sliver between the paper and its hard shadow) and a raking light inside the paper
document.querySelectorAll('.bs-nx').forEach(t=>{const hs=t.querySelector(':scope>.bt-hs'),pp=t.querySelector(':scope>.bt-p');if(!hs||!pp)return;
 const ed=hs.cloneNode(true);ed.className='bt-hs bt-edge';ed.style.cssText=hs.style.cssText;hs.after(ed);
 const lt=document.createElement('i');lt.className='bt-rake';pp.appendChild(lt)});
