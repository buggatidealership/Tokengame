// node check.js : functional checks of X4+ (widths, films, pop-up, swipe, reduced motion, shared round link)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../live-r1/_fonts.js');
const URL='http://localhost:8897/v48-live-x4plus.html';
async function open(b,w,h,hash,opt){const p=await b.newPage(Object.assign({viewport:{width:w,height:h}},opt||{}));await FONTS(p);const er=[];p.on('pageerror',e=>er.push('pageerror '+e.message));p.on('console',m=>{if(m.type()==='error')er.push(m.text())});
 const t0=Date.now();await p.goto(URL+(hash||''),{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});p.lift=Date.now()-t0;p.er=er;await p.waitForTimeout(1200);return p}
(async()=>{const b=await chromium.launch();const out=[];
 // 1 widths, every tab
 for(const w of [320,360,390,430,768,1024,1199,1280,1536,1920]){for(const h of ['','#/leaderboard','#/upcoming']){const p=await open(b,w,900,h);
   const r=await p.evaluate(async()=>{const H=document.documentElement.scrollHeight;for(let y=0;y<H;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,30))}scrollTo(0,0);
     const vis=e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0};const wide=[...document.querySelectorAll('main#top>*,main#waLB *,header.top *')].filter(e=>vis(e)&&e.getBoundingClientRect().right>innerWidth+1&&!e.closest('.car,#car,.x2p-hlt,.wa-hud,.x2p-cw,.tick,svg')).slice(0,4).map(e=>(e.className&&e.className.baseVal!=null?'svg':e.className)+' '+Math.round(e.getBoundingClientRect().right));
     const nav=document.querySelector('header.top nav.nav'),hdr=document.querySelector('header.top').getBoundingClientRect().height;
     return {sw:document.documentElement.scrollWidth,iw:innerWidth,wide,hdr:Math.round(hdr),navRows:nav?[...new Set([...nav.querySelectorAll('a')].filter(vis).map(a=>Math.round(a.getBoundingClientRect().top)))].length:0,soon:!!(document.querySelector('.x2p-soon')&&vis(document.querySelector('.x2p-soon'))),world:document.documentElement.classList.contains('x2p-world')}});
   out.push(w+' '+(h||'#/')+' '+JSON.stringify(r)+(p.er.length?' ERR '+p.er.join(' | '):''));await p.close()}}
 // 2 the explainer film plays with a tap, a round film plays, the pop-up opens, swipe deals the next card
 {const p=await open(b,390,844,'',{hasTouch:true,isMobile:true,deviceScaleFactor:2});
  await p.click('.x2p-vt .vt-play');await p.waitForTimeout(3000);
  out.push('explainer t='+await p.evaluate(()=>document.querySelector('.x2p-vt video').currentTime.toFixed(2)));
  await p.evaluate(()=>{const v=document.querySelector('.x2p-vt video');v.pause()});
  await p.evaluate(()=>document.getElementById('record').scrollIntoView({block:'center'}));await p.waitForTimeout(3000);
  out.push('round film playing='+await p.evaluate(()=>{const v=document.querySelector('#car .card.cur video');return v?(v.currentTime.toFixed(2)+' paused='+v.paused):'no video on front card'}));
  const n0=await p.evaluate(()=>document.querySelector('#car .card.cur').dataset.n);
  await p.evaluate(()=>{const c=document.querySelector('#car .card.cur');const r=c.getBoundingClientRect();c.dispatchEvent(new MouseEvent('click',{bubbles:true,clientX:r.left+r.width/2,clientY:r.top+r.height*.3}))});
  await p.waitForTimeout(1800);
  const pop=await p.evaluate(()=>{const r=document.querySelector('#x2pRm');return {hash:location.hash,rm:r?getComputedStyle(r).display+' '+Math.round(r.getBoundingClientRect().width):'none',arrows:document.querySelectorAll('.x2p-rmn').length}});
  out.push('tap front card R'+n0+' -> '+JSON.stringify(pop));
  const nx=await p.$('.x2p-rmn.r');if(nx){await nx.click();await p.waitForTimeout(1200);out.push('next arrow -> '+await p.evaluate(()=>location.hash))}
  await p.keyboard.press('Escape');await p.waitForTimeout(900);out.push('after Escape '+await p.evaluate(()=>location.hash+' sec='+document.documentElement.getAttribute('data-sec')));
  out.push('errors '+(p.er.join(' | ')||'none'));await p.close()}
 // 3 shared round link
 {const p=await open(b,390,844,'#/round/57');out.push('shared #/round/57 lift '+p.lift+' '+JSON.stringify(await p.evaluate(()=>({hash:location.hash,rm:!!document.querySelector('#x2pRm'),world:document.documentElement.classList.contains('x2p-world'),top:!document.getElementById('top').hidden})))+' errors '+(p.er.join(' | ')||'none'));await p.close()}
 // 4 reduced motion: no running loops
 {const p=await open(b,390,844,'',{reducedMotion:'reduce'});
  const r=await p.evaluate(async()=>{const H=document.documentElement.scrollHeight;for(let y=0;y<H;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}
    return document.getAnimations().filter(a=>a.playState==='running'&&a.effect&&a.effect.target&&String(a.effect.target.className).indexOf('wa-')>=0).map(a=>a.effect.target.className+' '+(a.animationName||''))});
  out.push('reduced motion, running wa- animations: '+JSON.stringify(r));await p.close()}
 // 5 off screen: which wa- loops run at the top of the page
 {const p=await open(b,390,844,'');const r=await p.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').map(a=>{const t=a.effect&&a.effect.target;if(!t)return '';const rc=t.getBoundingClientRect();return (String(t.className&&t.className.baseVal!=null?t.className.baseVal:t.className).slice(0,40))+' '+(rc.bottom<0||rc.top>innerHeight?'OFF':'on')}).filter(s=>s&&s.indexOf('OFF')>0));
  out.push('running loops off screen at the top: '+JSON.stringify(r));await p.close()}
 console.log(out.join('\n'));await b.close()})();
