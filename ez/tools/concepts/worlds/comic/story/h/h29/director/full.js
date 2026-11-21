// node full.js <out.png> <W> [dir:1|0] [dpr]  : the whole Overview, all parts (+director), fixed/sticky hidden, one tall png. Prints checks.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../../live-r1/_fonts.js');const {load}=require('./_load.js');const fs=require('fs');
(async()=>{const [out,Wd,dirF,dpr]=process.argv.slice(2);const W=+Wd,VH=W<760?844:800;
 const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});const ctx=await b.newContext({viewport:{width:W,height:VH},deviceScaleFactor:+(dpr||1),reducedMotion:process.env.RM?'reduce':'no-preference'});
 const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('c:'+m.text().slice(0,160))});
 p.on('response',r=>{if(r.status()>=400&&/h29|media|meet12|sol|tools/.test(r.url()))er.push(r.status()+' '+r.url().slice(-70))});
 await load(p,{dir:dirF!=='0',er});
 const ph=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<ph;y+=450){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(80)}
 await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));await p.waitForTimeout(2000);
 const chk=await p.evaluate(()=>({sw:document.documentElement.scrollWidth,vw:innerWidth,h:document.documentElement.scrollHeight,
   errs:['__h29tErr','__h29mErr','__m12Err','__h29eErr','__h29dErr'].filter(k=>window[k]).map(k=>k+':'+String(window[k]).slice(0,120)),
   secs:[...document.querySelectorAll('main > section, main > *')].filter(e=>e.getBoundingClientRect().height>4).map(e=>(e.id||e.className||e.tagName).toString().slice(0,30)+'@'+Math.round(e.getBoundingClientRect().top+scrollY)+'+'+Math.round(e.getBoundingClientRect().height))}));
 await p.evaluate(()=>{window.__h29Still=1;document.querySelectorAll('video').forEach(v=>v.pause());[...document.body.querySelectorAll('*')].forEach(x=>{const ps=getComputedStyle(x).position;if(ps==='fixed'||ps==='sticky')x.style.setProperty('visibility','hidden','important')})});
 await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(400);
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);
 await p.screenshot({path:out,fullPage:true,timeout:180000});
 console.log(JSON.stringify({W,...chk,H,er}));await b.close()})();
