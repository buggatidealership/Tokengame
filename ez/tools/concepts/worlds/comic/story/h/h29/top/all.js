// node all.js [widths] : the three H29 overlays together (gutter, top, mid meet+front+live, end's load.json) over v46; checks the top's parts.
const {chromium}=require('playwright');const FONTS=require('../../../../../../live-r1/_fonts.js');const fs=require('fs'),path=require('path');
const H=path.join(__dirname,'..'),rd=f=>{const p=path.join(H,f);return fs.existsSync(p)?fs.readFileSync(p,'utf8'):''};
const L=JSON.parse(rd('end/load.json'));const WS=(process.argv[2]||'320,390,1280').split(',').map(Number);
(async()=>{const b=await chromium.launch();for(const W of WS){const p=await b.newPage({viewport:{width:W,height:W<760?844:900}});await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.goto('http://127.0.0.1:8947/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&window.__t4&&window.P5&&P5.cur,null,{timeout:120000});
 const M12=path.join(H,'..','meet12');const m12=fs.existsSync(path.join(M12,'m12.js'))?fs.readFileSync(path.join(M12,'m12.js'),'utf8'):'';
 await p.addStyleTag({content:rd('_gutter.css')+rd('top/top.css')+(fs.existsSync(path.join(M12,'m12.css'))?fs.readFileSync(path.join(M12,'m12.css'),'utf8'):'')+rd('mid/meet.css')+rd('mid/front.css')+L.css.map(f=>rd('end/'+f)).join('\n')});
 await p.evaluate(()=>{window.__M12T='d';window.__M10T=-1});
 for(const s of [rd('top/top.js'),m12,rd('mid/meet.js'),rd('mid/front.js'),rd('mid/live.js'),...L.js.map(f=>rd('end/'+f))])if(s)await p.addScriptTag({content:s}).catch(e=>er.push('add:'+e.message.slice(0,80)));
 await p.waitForTimeout(4000);
 const r=await p.evaluate(()=>{const a=document.querySelector('.h29t-next');return {top:!!window.__h29t,topErr:window.__h29tErr?String(window.__h29tErr):null,endErr:window.__h29eErr?String(window.__h29eErr):null,
  src:a&&a.dataset.src,pill:a&&a.innerText.replace(/\n/g,' / '),gutters:document.querySelectorAll('.h29-gutter').length,gh:[...new Set([...document.querySelectorAll('.h29-gutter')].map(g=>g.getBoundingClientRect().height))],
  sq:[...document.querySelectorAll('.t4-frs>.t4-fr .t4-art')].map(a=>Math.round(a.getBoundingClientRect().width)+'x'+Math.round(a.getBoundingClientRect().height)).join(' '),scrollW:document.documentElement.scrollWidth,vw:innerWidth,
  film:document.querySelectorAll('.h29t-film').length,gpos:[...document.querySelectorAll('.h29-gutter')].map(g=>Math.round(g.getBoundingClientRect().top+scrollY)+':'+(g.className.split(' ')[1]||'')+':'+g.parentElement.tagName+'.'+String(g.parentElement.className).split(' ')[0]),b3:getComputedStyle(document.querySelector('.t4-b3')).display}});
 console.log(W,JSON.stringify(r),'er',JSON.stringify(er));await p.close()}await b.close()})();
