const R=require('../flow/run.js');const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const W=+process.argv[2]||390;const {ctx,p,er}=await R.open(b,W,W<600?844:800,1);
const o=await p.evaluate(()=>{const out=[];const pr=(sel)=>{const e=document.querySelector(sel);if(!e){out.push(sel+' MISSING');return}const r=e.getBoundingClientRect();const c=getComputedStyle(e);out.push(sel+' y'+Math.round(r.top+scrollY)+' x'+Math.round(r.left)+' w'+Math.round(r.width)+' h'+Math.round(r.height)+' pos:'+c.position+' order:'+c.order+' pad:'+c.paddingTop+' bg:'+c.backgroundImage.slice(0,140));
 for(const ps of ['::before','::after']){const d=getComputedStyle(e,ps);if(d.content!=='none')out.push('  '+ps+' '+d.position+' top'+d.top+' h'+d.height+' bg:'+d.backgroundImage.slice(0,160))}};
['.wc-season','.wc-season .pp-ttl','.wc-season .wc-bis','.wc-chars','.wc-chars .pp-ttl','.wc-chars .pp1-grid'].forEach(pr);
 out.push(document.querySelector('.wc-chars .pp-ttl').outerHTML.slice(0,1500));
 out.push([...document.querySelectorAll('.wc-season *')].filter(e=>/rack/.test(getComputedStyle(e).backgroundImage+getComputedStyle(e,'::before').backgroundImage+(e.src||''))).map(e=>e.tagName+'.'+e.className).join(' | '));
 return out.join('\n')});console.log(o);console.log(er.join('|')||'ok');await b.close()})();
