/* Logo-paper mockups (owner, 2026-10-26: the page has "too much colors that are not directly tied to the logo"; the paper of every
   ticket and card in the logo's off-white, five takes). The real page, its one paper texture swapped in the HTML (all 38 papers share
   it), the takes with the logo's palette swapping colours across the page. node logo-paper.js -> scratchpad/logo-paper/, board ez/x2p-logo-paper.png */
const fs=require('fs');const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('./live-r1/_fonts.js');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/logo-paper/';fs.mkdirSync(S,{recursive:true});
const SRC=fs.readFileSync(__dirname+'/../../v46-live-x2plus.html','utf8');
const OLD="lighting-color='%23f1e6cc' surfaceScale='1.6'%3E%3CfeDistantLight azimuth='225' elevation='62'";
const paper=(c,s,e)=>"lighting-color='%23"+c+"' surfaceScale='"+s+"'%3E%3CfeDistantLight azimuth='225' elevation='"+e+"'";
const logoCols=[[/#1f7a45|#11714a|#1f6b3f/gi,'#03c870'],[/#c8372a|#b3261e|#b8262a/gi,'#ff3a31'],[/#f2b632/gi,'#fdbc2a']];
const logoGold=[[/#f6dc93|#fbe8a8|#f6d77c/gi,'#fed98a'],[/#e4b54a|#e7bd5b|#efc24a/gi,'#fdbc2a'],[/#c99227|#bf8a22|#d39c1c|#c98a12/gi,'#d99a12']];
const logoInk=[[/rgba\(20,\s*18,\s*23/g,'rgba(4,7,14'],[/#141217|#1b181c|#1d1a1e/gi,'#04070e'],[/#0b0a14/gi,'#04070e']];
const T={
 now:{p:null,sw:[]},
 Q1:{p:paper('fdf5de',3.4,77),sw:[]},
 Q2:{p:paper('fcf4dd',1.6,80),sw:[]},
 Q3:{p:paper('f8f0d9',0,90),sw:[]},
 Q4:{p:paper('fdf5de',3.4,77),sw:logoCols},
 Q5:{p:paper('fdf5de',3.4,77),sw:logoCols.concat(logoGold,logoInk)}};
(async()=>{const b=await chromium.launch();const ids=(process.argv[2]||Object.keys(T).join(',')).split(',');
 for(const id of ids){const t=T[id];let h=SRC;if(t.p){if(h.split(OLD).length!==39)throw new Error('paper count '+(h.split(OLD).length-1));h=h.split(OLD).join(t.p)}t.sw.forEach(([a,c])=>{h=h.replace(a,c)});
  const c=await b.newContext({viewport:{width:390,height:900},deviceScaleFactor:2,reducedMotion:'reduce'});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await FONTS(p);
  await p.route('**/v46-live-x2plus.html',r=>r.fulfill({status:200,contentType:'text/html',body:h}));
  await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html');if(t.p)await p.addStyleTag({content:'html.x2p #car .card .xc,html.x2p .card .xc{background-color:#fff!important}'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:30000});await p.waitForTimeout(1500);
  const shot=async(sel,name,prep)=>{if(prep)await p.evaluate(prep);await p.evaluate(s=>document.querySelector(s).scrollIntoView({block:'center'}),sel);await p.waitForTimeout(900);await (await p.$(sel)).screenshot({path:S+id+'-'+name+'.png'})};
  await shot('#standings ol.lbl','std');
  await shot('#learn .x2p-pt','proof');
  await shot('#car .card.cur','cert',async()=>{const c=document.querySelector('#car .card.cur');document.querySelector('#record').scrollIntoView();await new Promise(r=>setTimeout(r,600));const f=c.querySelector('.face.front [data-flip]')||c;f.click();await new Promise(r=>setTimeout(r,1200))});
  await shot('#x2pSt','bet');
  console.log(id,errs.join('|')||'ok');await c.close()}
 await b.close()})();
