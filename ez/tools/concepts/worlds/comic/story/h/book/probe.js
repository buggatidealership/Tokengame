const R=require('../flow/run.js');const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const W=+process.argv[2]||390;const {ctx,p,er}=await R.open(b,W,W<600?844:800,1);
const o=await p.evaluate(()=>[...document.querySelectorAll('#wc-book > *')].map(e=>{const r=e.getBoundingClientRect();return e.tagName+'.'+[...e.classList].join('.')+' y'+Math.round(r.top+scrollY)+' h'+Math.round(r.height)+' bg:'+getComputedStyle(e).backgroundImage.slice(0,80)+' '+(e.tagName==='P'?e.textContent.trim().slice(0,60):'')}));
console.log(o.join('\n'));
const m=await p.evaluate(()=>{const s=document.querySelector('.wc-chars');return [...s.children].map(e=>e.tagName+'.'+e.className+' h'+e.offsetHeight+' '+(e.textContent||'').trim().slice(0,50)).join('\n')});console.log('--- chars\n'+m);
const m2=await p.evaluate(()=>{const s=document.querySelector('.wc-season');return [...s.children].map(e=>e.tagName+'.'+e.className+' h'+e.offsetHeight+' '+(e.textContent||'').trim().slice(0,50)).join('\n')});console.log('--- season\n'+m2);
console.log(er.join('|')||'ok');await b.close()})();
