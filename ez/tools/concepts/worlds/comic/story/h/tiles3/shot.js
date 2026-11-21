// tiles3: the real Every round so far grid, Show all, only the 8 test rounds shown, art swapped per take.
// node shot.js <outdir> <take> <width>   take: now | A | B | C | D | D2
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fonts=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
const T3=process.argv[5];const [OUT,TAKE,W0]=process.argv.slice(2);const W=+W0;
const SET=[78,72,69,57,51,25,17,2];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:1000},deviceScaleFactor:2});await fonts(p);
 if(T3)await p.addInitScript({path:T3});const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.goto('http://localhost:8898/v47-live-x3plus.html?'+Date.now(),{waitUntil:'load'});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world'),null,{timeout:90000}).catch(()=>{});
 await p.waitForTimeout(4000);
 await p.evaluate(()=>{const s=document.querySelector('#wc-book .wc-season');scrollTo(0,s.getBoundingClientRect().top+scrollY)});
 await p.waitForTimeout(2500);
 await p.evaluate(()=>{const b=[...document.querySelectorAll('#wc-book .wc-season button')].find(x=>/show all/i.test(x.textContent));if(b)b.click()});
 await p.waitForTimeout(3000);
 for(let i=0;i<6;i++){await p.evaluate(y=>scrollBy(0,y),600);await p.waitForTimeout(400)}
 await p.evaluate(()=>{const s=document.querySelector('#wc-book .wc-season');scrollTo(0,s.getBoundingClientRect().top+scrollY)});await p.waitForTimeout(2000);
 const res=await p.evaluate(async({SET,TAKE})=>{
  const st=document.createElement('style');
  st.textContent='.x2p-cw{display:none!important}'+`.wc-bis .wc-bi${SET.map(k=>`:not([href="#/round/${k}"])`).join('')}{display:none!important}`+SET.map((k,i)=>`.wc-bis .wc-bi[href="#/round/${k}"]{order:${i}}`).join('');
  document.head.appendChild(st);
  [...document.querySelectorAll('body *')].forEach(e=>{const c=getComputedStyle(e);if(c.position==='fixed'&&e.getBoundingClientRect().bottom>=innerHeight-4&&e.getBoundingClientRect().height<120)e.style.setProperty('display','none','important')});
  if(window.__T3)await window.__T3(TAKE,SET);
  return {sw:document.documentElement.scrollWidth}
 },{SET,TAKE}).catch(e=>({err:String(e)}));
 await p.waitForTimeout(2500);
 const g=await p.evaluate(()=>{const s=document.querySelector('#wc-book .wc-season .wc-bis');const r=s.getBoundingClientRect();const L=[...s.querySelectorAll('.wc-bi')].filter(a=>a.offsetParent).map(a=>a.getBoundingClientRect().bottom);return {y:r.top+scrollY,h:Math.max(r.height,Math.max(...L)-r.top+8)+70,sw:document.documentElement.scrollWidth}});
 await p.screenshot({path:`${OUT}/${TAKE}-${W}.png`,fullPage:true,clip:{x:0,y:g.y-10,width:W,height:g.h+20}});
 res.sw2=g.sw;
 console.log(TAKE,W,JSON.stringify(res),er.slice(0,3));await b.close()})();
