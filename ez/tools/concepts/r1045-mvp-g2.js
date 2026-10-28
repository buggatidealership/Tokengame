// Round 45 MVP backs, G2 (owner, 2026-10-28): runs the self-contained r1045-mvp/G2.css + G2.js on the real page, as a build would
// (the CSS's __PAPER__ filled with the page's own paper, read from a record certificate), then flips each highlight and measures it.
// usage: node r1045-mvp-g2.js <outdir/> [widths]
const fs=require('fs'),path=require('path');const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const OUT=process.argv[2],WS=(process.argv[3]||'390').split(',').map(Number),D=path.join(__dirname,'r1045-mvp');fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const rep=[];
for(const W of WS){const c=await b.newContext(W<700?{viewport:{width:W,height:844},deviceScaleFactor:3,isMobile:true,hasTouch:true,reducedMotion:'reduce'}:{viewport:{width:W,height:900},deviceScaleFactor:2,reducedMotion:'reduce'});
 const p=await c.newPage();await require('./live-r1/_fonts.js')(p);const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.goto(process.env.BASE||'http://127.0.0.1:8897/v46-live-x2plus.html');await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:40000});
 await p.evaluate(async()=>{document.querySelector('#x2pHl').scrollIntoView({block:'center'});await document.fonts.ready});await p.waitForTimeout(900);
 const pap=await p.evaluate(()=>{const x=document.querySelector('#record .xc');const m=x&&getComputedStyle(x).backgroundImage.match(/url\("[^"]*"\)/);return m?m[0]:'none'});
 await p.addStyleTag({content:fs.readFileSync(D+'/G2.css','utf8').replace(/__PAPER__/g,pap)});await p.evaluate(js=>(new Function(js))(),fs.readFileSync(D+'/G2.js','utf8'));
 await p.waitForTimeout(500);
 for(let i=0;i<3;i++){
  const m=await p.evaluate(async i=>{const ws=[...document.querySelectorAll('#x2pHl .x2p-hi')];window.__x2pHlGo(i,true);await new Promise(r=>setTimeout(r,900));window.__x2pG2();await new Promise(r=>setTimeout(r,100));
    const w=ws[i],card=w.querySelector(':scope>.card.x2p-s0')||w.querySelector('.card'),el=card.querySelector('.b45-g2');if(!el)return {err:'no layer'};
    const R=el.getBoundingClientRect(),over=[];el.querySelectorAll('*').forEach(e=>{const r=e.getBoundingClientRect();if(!r.width||!r.height||e.closest('.b45-fr'))return;
      if(r.right>R.right+.5||r.bottom>R.bottom+.5||r.left<R.left-.5||r.top<R.top-.5)over.push((e.className.baseVal!==undefined?e.className.baseVal:e.className)+' '+Math.round(r.right-R.right)+'/'+Math.round(r.bottom-R.bottom))});
    el.querySelectorAll('.b45-big,.b45-who').forEach(e=>{if(e.scrollWidth>e.clientWidth+1)over.push('wide '+e.className)});
    const u=parseFloat(getComputedStyle(el).getPropertyValue('--u'))||(el.clientWidth/202),fr=el.querySelector('.b45-fr').getBoundingClientRect(),sl=el.querySelector('.b45-seal');let seal=null;
    if(sl){const a=sl.getBoundingClientRect(),q=a.width*48.6/100,cx=a.left+a.width/2,cy=a.top+a.height/2,uu=el.clientWidth/202*(innerWidth>=760?306/202/(el.clientWidth/202):1);
      const ru=fr.width?(parseFloat(getComputedStyle(el.querySelector('.b45-fr')).borderTopWidth)||1):1;seal={bottom:+((fr.bottom-ru*3.6)-(cy+q)).toFixed(1),right:+((fr.right-ru*3.6)-(cx+q)).toFixed(1)}}
    const hcs=!!card.querySelector('.x2p-hb .x2p-hcs .x2p-hc'),flip=!!el.querySelector('.flipb');
    return {kind:w.querySelector('.x2p-htag').textContent.trim(),k:+el.dataset.k,over:over.slice(0,4),h:Math.round(el.clientHeight),sh:el.scrollHeight,seal,hcs,flip}},i);
  const el=await p.evaluateHandle(i=>document.querySelectorAll('#x2pHl .x2p-hi')[i],i);await el.screenshot({path:OUT+'g2-'+i+'-'+W+'.png'});
  console.log(W,JSON.stringify(m));rep.push([W,m])}
 // flip still works: tap the moved button on the centred card and check the card turns back
 const flips=await p.evaluate(async()=>{const c=[...document.querySelectorAll('#x2pHl .card')].find(c=>c.querySelector('.b45-g2 .flipb')&&c.getBoundingClientRect().left>=0&&c.getBoundingClientRect().right<=innerWidth);if(!c)return 'none';
   const before=c.className;c.querySelector('.b45-g2 .flipb').click();await new Promise(r=>setTimeout(r,700));return before!==c.className?'turns':'same'});
 console.log(W,'flip button',flips,'errors',errs.length?errs:0);await c.close()}
fs.writeFileSync(OUT+'report.json',JSON.stringify(rep));await b.close()})();
