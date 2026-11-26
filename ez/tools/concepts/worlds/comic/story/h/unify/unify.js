/* H31 unify overlay script (A and B; window.__UF picks the take). Runs once at DOMContentLoaded, then on mutations. */
(function(){const D=document,H=D.documentElement;const T=window.__UF||'a';H.classList.add('uf','uf-'+T);
const CR=['#fffdf3','#f8f0d9','#c9bd9f'];
// 1. gold gradients used by lit chip text (names, ledger, tile labels, winners) become cream ramps; #1's stays gold in B
function grads(){D.querySelectorAll('linearGradient[id],radialGradient[id]').forEach(g=>{if(g.__uf)return;const id=g.id;
  if(!/^(q4em|q4gd|r6em|r6gd)/.test(id))return;g.__uf=1;const st=g.querySelectorAll('stop');st.forEach((s,i)=>s.setAttribute('stop-color',CR[Math.min(CR.length-1,Math.round(i*(CR.length-1)/Math.max(1,st.length-1)))]))})}
// 2. fixed-width digits in the number face: box Anton's narrow "1" to the other digits' width (.494em vs .331em)
const isAnton=el=>{try{return /^\s*["']?Anton/i.test(getComputedStyle(el).fontFamily)}catch(e){return false}};
function ones(root){const tw=D.createTreeWalker(root||D.body,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.nodeValue.indexOf('1')<0||!/\d/.test(n.nodeValue)?2:1});const todo=[];let n;while(n=tw.nextNode())todo.push(n);
 for(const t of todo){const pe=t.parentElement;if(!pe||pe.closest('.uf1,script,style,.hbc-sl,.sr,[class*="sr-only"],title,desc'))continue;if(pe.closest('.r6-old,#car'))continue;if(!isAnton(pe))continue;
  const parts=t.nodeValue.split('1');if(parts.length<2)continue;const svg=pe instanceof SVGElement;const frag=D.createDocumentFragment();
  if(svg){if(!/^(text|tspan)$/i.test(pe.tagName))continue;const NS='http://www.w3.org/2000/svg';const mk=(c,txt)=>{const o=D.createElementNS(NS,'tspan');o.setAttribute('class',c);o.setAttribute('dx','0.0815em');o.textContent=txt;return o};
   parts.forEach((p,i)=>{if(i===0){if(p)frag.appendChild(D.createTextNode(p));return}frag.appendChild(mk('uf1','1'));frag.appendChild(mk('uf1r',p||'\u200b'))})}
  else{parts.forEach((p,i)=>{if(i>0){const o=D.createElement('span');o.className='uf1';o.textContent='1';frag.appendChild(o)}if(p)frag.appendChild(D.createTextNode(p))})}
  t.replaceWith(frag)}}
// 3. narrator lines that are not in a C3 box get the narrator class; ledger moves get their sign's class; copy that named gold
function tags(){D.querySelectorAll('#get .p5-ln').forEach(p=>{if(/gets its chip/.test(p.textContent))p.classList.add('uf-nar')});
 D.querySelectorAll('.m10-lb i,.m10-tk i').forEach(i=>{const t=i.textContent.trim();i.classList.toggle('uf-u',/^\+/.test(t));i.classList.toggle('uf-d',/^[−-]/.test(t))});
 D.querySelectorAll('#learn .p5-ln').forEach(p=>{if(/gold zone/.test(p.innerHTML))p.innerHTML=p.innerHTML.replace('gold zone','dashed zone')});
 const k=D.querySelector('.r6-key');if(k&&/gold: NVIDIA/.test(k.textContent)&&T==='a'){k.lastChild.nodeValue=k.lastChild.nodeValue.replace('· gold: NVIDIA','');if(!k.querySelector('.r6-k4')){const s=D.createElement('span');s.className='r6-k4';k.appendChild(s);k.appendChild(D.createTextNode('NVIDIA'))}}}
// 4. #1's carrier in take A: a drawn crown (cream, ink outline) over the board's numeral and before the chart's leader label
const CROWN='<path d="M2 17 L4 5 L9.5 11 L15 2 L20.5 11 L26 5 L28 17 Z" fill="#f8f0d9" stroke="#0d0b10" stroke-width="2.2" stroke-linejoin="round"/><rect x="2" y="17" width="26" height="4.5" rx="1" fill="#f8f0d9" stroke="#0d0b10" stroke-width="2.2"/>';
function crowns(){if(T!=='a')return;D.querySelectorAll('.m11-num1').forEach(n=>{if(n.querySelector('.uf-crown'))return;n.insertAdjacentHTML('afterbegin','<svg class="uf-crown" viewBox="0 0 30 24" aria-hidden="true">'+CROWN+'</svg>')});
 D.querySelectorAll('#learn .p5-svg').forEach(sv=>{if(sv.querySelector('.uf-crown2'))return;const lead=[...sv.querySelectorAll('text')].find(t=>t.querySelector('tspan[fill="#ffd21f"]'));if(!lead)return;try{const b=lead.getBBox();const fs=+lead.getAttribute('font-size')||34;const g=D.createElementNS('http://www.w3.org/2000/svg','g');g.setAttribute('class','uf-crown2');const s=fs*1.05/30;g.setAttribute('transform',`translate(${b.x-fs*1.1} ${b.y+b.height*.12}) scale(${s})`);g.innerHTML=CROWN;lead.parentNode.appendChild(g)}catch(e){}})}
let busy=0;function run(){if(busy)return;busy=1;try{grads();tags();crowns();ones(D.body)}finally{busy=0}}
let q=0;const mo=new MutationObserver(()=>{if(q)return;q=1;requestAnimationFrame(()=>{q=0;mo.disconnect();run();mo.observe(D.body,{childList:true,subtree:true,characterData:true})})});
function start(){run();mo.observe(D.body,{childList:true,subtree:true,characterData:true})}
if(D.readyState==='loading')D.addEventListener('DOMContentLoaded',start);else start();
// fonts arriving change which elements are Anton-sized; rerun once they are in
D.fonts&&D.fonts.ready.then(()=>setTimeout(run,300));
})();
