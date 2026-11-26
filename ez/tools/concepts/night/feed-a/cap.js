// node tools/concepts/night/feed-a/cap.js   (from ez/): the phone screens and lifted cards for the walkthrough film dopa/nt-pmA.html.
// Shoots the real mockups (pm.js inside the live terminal) at 390 css px, 3x, into dopa/w6/nt/pmA/: the header, the bottom nav, each
// screen's scrolling content, the cards that lift, and geo.json (where each tapped or lifted thing sits, in css px of its screen).
const fs=require('fs'),path=require('path');const {chromium}=require('playwright');const R=require('./run.js');
const OUT=path.resolve(__dirname,'../../dopa/w6/nt/pmA');fs.mkdirSync(OUT,{recursive:true});
// [name, query, clock state, lift selector(s) to union, targets]
const S=[['c1','pm=1&s=in&pw=QWEN-ESTC','in',['article[data-call="QWEN-ESTC"]'],{tab:'.na-vw button:nth-child(2)'}],
 ['c2','pm=2&s=in&open=QWEN-ESTC&pw=QWEN-ESTC','in',['.na-c2 .na-c2h','.na-c2 .na-sp'],{link:'.na-c2 .na-c2f'}],
 ['c3a','pm=3&s=in&co=ESTC','in',null,{}],
 ['c3b','pm=3&s=g&co=ESTC','g',['.na-h3'],{card:'article[data-call="QWEN-ESTC"]'}],
 ['c4','pm=4&s=g&call=QWEN-ESTC','g',['.na-t4','.na-rb'],{}],
 ['c5','pm=5&s=g&m=QWEN','g',['.na-pf'],{entry:'article[data-call="QWEN-ESTC"]'}]];
(async()=>{await new Promise(r=>R.srv.listen(0,r));const port=R.srv.address().port;const b=await chromium.launch();const geo={};
  for(const [n,q,s,lift,tg] of S){const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3,timezoneId:'America/New_York',locale:'en-US'});const p=await ctx.newPage();
    const errs=[];p.on('pageerror',e=>errs.push(e.message));
    await p.clock.setFixedTime(new Date(R.CLOCK[s]));await p.goto(`http://localhost:${port}/__pm.html?${q}&now=${R.CLOCK[s]}`,{waitUntil:'networkidle'});
    await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);
    const g=await p.evaluate(tg=>{const r=e=>{const b=e.getBoundingClientRect();return [b.left,b.top+scrollY,b.width,b.height].map(v=>+v.toFixed(1))};const o={};
      for(const k in tg){const e=document.querySelector(tg[k]);if(e)o[k]=r(e)}
      o.top=r(document.querySelector('.top'));const nv=document.querySelector('#nav');o.nav=r(nv);o.navBtn=[...nv.querySelectorAll('button')].map(r);o.H=document.documentElement.scrollHeight;return o},tg);
    if(lift){const rs=await p.evaluate(ls=>ls.map(s=>{const e=document.querySelector(s),b=e.getBoundingClientRect();return [b.left,b.top+scrollY,b.right,b.bottom+scrollY]}),lift);
      const x0=Math.min(...rs.map(r=>r[0])),y0=Math.min(...rs.map(r=>r[1])),x1=Math.max(...rs.map(r=>r[2])),y1=Math.max(...rs.map(r=>r[3]));
      g.lift=[x0,y0,x1-x0,y1-y0].map(v=>+v.toFixed(1));
      await p.screenshot({path:`${OUT}/${n}-lift.jpg`,type:'jpeg',quality:90,fullPage:true,clip:{x:x0,y:y0,width:x1-x0,height:y1-y0}})}
    if(n==='c1'||n==='c4'){await p.screenshot({path:`${OUT}/top-${s}.jpg`,type:'jpeg',quality:90,clip:{x:0,y:0,width:390,height:g.top[3]+g.top[1]}})}
    if(n==='c1'||n==='c5'){const nv=g.nav;await p.screenshot({path:`${OUT}/nav-${n==='c1'?'feed':'prof'}.jpg`,type:'jpeg',quality:90,clip:{x:0,y:844-nv[3],width:390,height:nv[3]}})}
    await p.addStyleTag({content:'.nav{display:none!important}.app{padding-bottom:24px!important}'});await p.waitForTimeout(100);
    const H=await p.evaluate(()=>document.documentElement.scrollHeight);g.H=H;const h=Math.min(H,2700);
    await p.screenshot({path:`${OUT}/${n}.jpg`,type:'jpeg',quality:88,fullPage:true,clip:{x:0,y:0,width:390,height:h}});g.h=h;geo[n]=g;
    console.log(n,'h',h,'of',H,'lift',g.lift,'errs',errs.join('|')||'none');await ctx.close()}
  fs.writeFileSync(`${OUT}/geo.json`,JSON.stringify(geo,null,1));await b.close();R.srv.close()})();
