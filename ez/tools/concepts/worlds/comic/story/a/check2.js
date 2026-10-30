// node check2.js: the cartoon backgrounds on every logo tile after "Show all": the colour each one got, and errors
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.goto('http://localhost:8897/v47-live-x3plus.html');await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world'),null,{timeout:90000});
 await p.addStyleTag({content:rd('_sa.css')+rd('s1.css')+rd('s1s.css')+rd('c1.css')});await p.evaluate(()=>['s1','s1s','c1'].forEach(x=>document.documentElement.classList.add('sa-t-'+x)));
 await p.addScriptTag({content:rd('_sa.js')+rd('s1.js')+rd('c1.js')});await p.waitForFunction(()=>document.documentElement.classList.contains('sa-ready'));await p.click('.wc-more');
 const r=await p.evaluate(()=>{const L=window.CO_LOGOS||{},o={film:0,logo:0,none:0,ink:[],dk:[],cols:[]};document.querySelectorAll('.wc-season .wc-bi').forEach(a=>{const art=a.querySelector('.wc-bi-art'),n=+a.getAttribute('href').replace(/\D/g,''),t=ROUNDS.find(r=>r.n===n).ticker;
   if(!art.classList.contains('sa-cb')){o.film++;return}if(art.classList.contains('sa-nolg')){o.none++;return}o.logo++;const c=art.style.getPropertyValue('--bm');o.cols.push(t+' '+c);if(c==='#1c1a22')o.ink.push(t);if(art.classList.contains('sa-dk'))o.dk.push(t)});
   o.shown=[...document.querySelectorAll('.wc-bi')].filter(x=>x.offsetParent).length;o.sw=document.documentElement.scrollWidth;return o});
 console.log(JSON.stringify(r),er.join('|')||'no errors');await b.close()})();
