/* C3 "Punched in tens": every model's record as Season 1 ticket stubs, one stub per 10 calls in the order they were made.
   Each right call punches a hole (filled from the bottom), so a stub reads like a bar; a gold line at 5 of 10 is the coin.
   The record itself, oldest left, newest right. No line, no verdict. */
(function(){const d=window.__scD,{M,NM,face}=d,sp=document.querySelector('.wc-splash');
const by=d.ORDER.slice().sort((a,b)=>M[b].hr-M[a].hr),most=Math.max(...by.map(m=>M[m].n)),K=Math.ceil(most/10);
const stub=(cs)=>{const k=cs.filter(x=>x.ok).length,n=cs.length,cells=[];
  for(let i=0;i<10;i++){cells.push('<i class="'+(i>=n?'sc3-x':i<k?'sc3-h':'sc3-m')+'"></i>')}
  return '<li class="sc3-s'+(n<10?' sc3-part':'')+'" aria-label="'+k+' of '+n+' right"><span class="sc3-g">'+cells.join('')+'</span><b>'+k+'</b></li>'};
const rows=by.map(m=>{const cs=M[m].cs,st=[];for(let i=0;i<K;i++){const s=cs.slice(i*10,i*10+10);st.push(s.length?stub(s):'<li class="sc3-s sc3-none" aria-hidden="true"></li>')}
  return '<div class="sc3-r" style="--mc:'+d.col(m)+'"><p class="sc3-nm">'+face(m)+'<b>'+NM[m]+'</b><small>'+M[m].W+' of '+M[m].n+' right</small></p><ol class="sc3-st">'+st.join('')+'</ol></div>'}).join('');
const html='<div class="sc-take"><figure class="sc-ch sc-c3" aria-label="Every call, ten at a time, oldest first. A coin gets about 5 of 10.">'
 +'<span class="sc-cap">Every call, ten at a time</span>'
 +'<p class="sc-key"><span><i class="sc3-kh"></i>Right way</span><span><i class="sc3-km"></i>Wrong way</span><span><i class="sc-sw-c"></i>A coin: about 5 of 10</span></p>'
 +'<p class="sc3-ax" aria-hidden="true"><span>Calls 1 to 10</span><span>Newest</span></p>'+rows+'</figure></div>';
sp.querySelector('.wc-sp-lead').insertAdjacentHTML('afterend',html);sp.classList.add('sc-sol');
sp.querySelector('.wc-sp-lead').textContent='Every call they have made, punched in tens. A coin gets about half.';
sp.querySelector('.wc-sp-cap').textContent='One stub = 10 calls, oldest on the left. A dashed stub is still filling.';
d.reveal(sp.querySelector('.sc-c3'));
document.documentElement.classList.add('sc-ready-c3')})();
