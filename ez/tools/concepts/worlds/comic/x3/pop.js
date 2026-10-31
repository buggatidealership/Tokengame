const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},hasTouch:false});await FONTS(p);
 const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push(m.text())});
 await p.goto('http://localhost:8897/v47-live-x3plus.html',{waitUntil:'load'});await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:60000});await p.waitForTimeout(800);
 // explainer
 await p.click('.x2p-vt .vt-play').catch(e=>er.push('noplay '+e.message));await p.waitForTimeout(3000);
 console.log('explainer t',await p.evaluate(()=>{const v=document.querySelector('.x2p-vt video');return v.currentTime.toFixed(1)+' paused '+v.paused+' muted '+v.muted}));
 await p.evaluate(()=>document.querySelector('.x2p-vt video').pause());
 // back issue -> pop-up
 await p.evaluate(()=>document.querySelector('.wc-bi').scrollIntoView({block:'center'}));await p.waitForTimeout(600);const y0=await p.evaluate(()=>scrollY);
 const n0=await p.evaluate(()=>document.querySelector('.wc-bi').getAttribute('href'));
 await p.click('.wc-bi');await p.waitForTimeout(2200);
 console.log('open',n0,await p.evaluate(()=>{const r=document.querySelector('#x2pRm');return JSON.stringify({hash:location.hash,rm:r?getComputedStyle(r).display:'none',book:getComputedStyle(document.getElementById('wc-book')).display,arrows:document.querySelectorAll('.x2p-rmn').length,vid:!!(r&&r.querySelector('video'))})}));
 await p.screenshot({path:'/tmp/claude-0/pop1.png'});
 const ar=await p.$('.x2p-rmn.r');if(ar){await ar.click();await p.waitForTimeout(1500);console.log('next',await p.evaluate(()=>location.hash))}
 await p.keyboard.press('ArrowLeft');await p.waitForTimeout(1500);console.log('left',await p.evaluate(()=>location.hash));
 await p.keyboard.press('Escape');await p.waitForTimeout(1500);
 console.log('closed',await p.evaluate(()=>JSON.stringify({hash:location.hash,y:scrollY,rm:!!document.querySelector('#x2pRm')&&getComputedStyle(document.querySelector('#x2pRm')).display,book:getComputedStyle(document.getElementById('wc-book')).display})),'y0',y0);
 // tab switches
 for(const h of ['#/leaderboard','#/upcoming','#/']){await p.evaluate(h=>location.hash=h,h);await p.waitForTimeout(1200);console.log(h,await p.evaluate(()=>[...['wc-book','wc-lb','wc-up']].map(id=>id+':'+(document.getElementById(id).offsetParent?'shown':'hidden')).join(' ')+' view:'+getComputedStyle(document.getElementById('view')).display))}
 // upcoming ticket opens its card
 await p.evaluate(()=>location.hash='#/upcoming');await p.waitForTimeout(1000);await p.click('#wc-up .wc-lv');await p.waitForTimeout(2000);
 console.log('up card',await p.evaluate(()=>{const r=document.querySelector('#x2pRm');return location.hash+' '+(r?getComputedStyle(r).display:'none')}));await p.screenshot({path:'/tmp/claude-0/pop2.png'});
 await p.keyboard.press('Escape');await p.waitForTimeout(1200);console.log('after',await p.evaluate(()=>location.hash+' up:'+(document.getElementById('wc-up').offsetParent?'shown':'hidden')));
 console.log('errors',er.join('\n')||'none');await b.close()})();
