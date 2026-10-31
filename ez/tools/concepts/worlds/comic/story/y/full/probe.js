// node probe.js: dumps the Overview's section structure at 390
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const W=+(process.argv[2]||390);
 const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:1});await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.goto('http://localhost:8930/v47-live-x3plus.html',{waitUntil:'load'});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=400){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(60)}
 await p.waitForTimeout(1500);
 const r=await p.evaluate(()=>{const out=[];const bk=document.querySelector('#wc-book');out.push('book '+(bk&&bk.parentElement.tagName+'#'+bk.parentElement.id));
  const walk=(el,d)=>{for(const c of el.children){const s=getComputedStyle(c);if(s.display==='none')continue;const r=c.getBoundingClientRect();if(r.height<2)continue;
    out.push(' '.repeat(d*2)+c.tagName.toLowerCase()+(c.id?'#'+c.id:'')+'.'+String(c.className.baseVal??c.className).split(' ').slice(0,4).join('.')+' y='+Math.round(r.top+scrollY)+' h='+Math.round(r.height)+' bg='+s.backgroundColor+' '+(s.backgroundImage!=='none'?'img':''));if(d<2)walk(c,d+1)}};
  walk(bk||document.body,0);out.push('body bg '+getComputedStyle(document.body).backgroundColor+' '+getComputedStyle(document.body).backgroundImage.slice(0,120));out.push('H '+document.documentElement.scrollHeight);return out.join('\n')});
 console.log(r);console.log('errors',er);await b.close()})();
