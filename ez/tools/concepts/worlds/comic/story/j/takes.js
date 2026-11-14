// The takes: where each one sits on the page, how to stage it for a still, how to record it, how to measure it.
module.exports={
 j9:{name:'Measurement: the page\'s background-position loops paused',hash:'',sel:'.wc-chars',perfSel:'.wc-chars',stage:()=>{}},
 j0:{name:'Control: nothing injected (the order effect)',hash:'',sel:'.wc-season',stage:()=>{const g=document.querySelector('.wc-bis');if(g&&g.dataset.all!=='1')document.querySelector('.wc-season .wc-more').click()},perfSel:'.wc-season',perfDist:1400},
 j2:{name:'Page turn',hash:'',sel:'header.top',pad:[0,0],perfSwitch:true,perfSel:'.wc-cover',noFull:true,
   shotHook:async()=>{window.__sjKeepHead=1;scrollTo(0,0);await window.__sjTurn('#/leaderboard');window.__sjStep(300)},
   clipFn:()=>{const c={x:0,y:scrollY,width:document.documentElement.clientWidth,height:innerHeight};c.width-=c.width%2;c.height-=c.height%2;return c},
   rec:{fixed:true,sec:4.6,fps:30,dpr:2,hold:20,
     setup:()=>{window.__sjKeepHead=1;const h=document.querySelector('header.top');if(h)h.style.visibility='visible';scrollTo(0,0)},
     frame:async({t})=>{const S=[[500,'#/leaderboard'],[2000,'#/upcoming'],[3400,'#/']],D=740;
       for(const [at,h] of S){if(t>=at&&!window['__sjDid'+at]){window['__sjDid'+at]=1;await window.__sjTurn(h)}
         if(t>=at&&t<at+D+40){window.__sjStep(Math.min(D,t-at));return}
         if(t>=at+D+40&&!window['__sjEnd'+at]){window['__sjEnd'+at]=1;window.__sjEnd()}}}}},

 j3:{name:'The golden ticket in your hand',hash:'#/leaderboard',sel:'.wc-sb-1',
   stage:()=>{},perfSel:'.wc-sbd',perfDist:700,
   shotHook:()=>{window.__sjNoEase=1;window.__sjTilt(0,45);window.__sjTilt(13,51)},
   perfInput:()=>{let k=0;window.__sjTI=setInterval(()=>{k++;const e=new Event('deviceorientation');e.gamma=15*Math.sin(k/20);e.beta=45+8*Math.sin(k/13);e.alpha=0;dispatchEvent(e)},16)},
   clipFn:({W})=>{const a=document.querySelector('.wc-sbd h2').getBoundingClientRect(),rs=document.querySelectorAll('.wc-sb-r'),b=rs[1].getBoundingClientRect();
     const c={x:0,y:Math.round(a.top+scrollY-10),width:document.documentElement.clientWidth,height:0};c.height=Math.round((W>=1000?Math.max(rs[0].getBoundingClientRect().bottom,b.bottom)+24:b.top+150)+scrollY-c.y);c.height-=c.height%2;c.width-=c.width%2;return c},
   rec:{sec:6.4,fps:30,dpr:2,hold:0,
     setup:()=>{window.__sjNoEase=1;const r=document.querySelector('.wc-sb-1');r.insertAdjacentHTML('beforeend','<i class="sj-rphone" aria-hidden="true"><i></i><b>tilt</b></i>');window.__sjTilt(0,45)},
     frame:({t})=>{const s=t/1000,g=17*Math.sin(2*Math.PI*s/3.2),b=45+11*Math.sin(2*Math.PI*s/2.13+1.1)*Math.min(1,s/1.2);window.__sjTilt(g*Math.min(1,s/.8),b);
       const ph=document.querySelector('.sj-rphone i');if(ph)ph.style.transform=`rotate(${g*Math.min(1,s/.8)*1.4}deg)`},raf:true}},

 j1v:{name:'Moving pictures as mp4 loops (cost comparison)',hash:'',sel:'.wc-season',pre:"window.__sjCG="+JSON.stringify((()=>{try{return require('fs').readFileSync(__dirname+'/cg/list.txt','utf8').trim()}catch(e){return ''}})()),
   stage:()=>{const g=document.querySelector('.wc-bis');if(g&&g.dataset.all!=='1')document.querySelector('.wc-season .wc-more').click()},perfSel:'.wc-season',perfDist:1400},
 j1:{name:'Moving pictures',hash:'',sel:'.wc-season',pre:"window.__sjCG="+JSON.stringify((()=>{try{return require('fs').readFileSync(__dirname+'/cg/list.txt','utf8').trim()}catch(e){return ''}})()),
   stage:()=>{const g=document.querySelector('.wc-bis');if(g&&g.dataset.all!=='1')document.querySelector('.wc-season .wc-more').click()},
   stageNow:()=>{},
   clipFn:()=>{const s=document.querySelector('.wc-season h2').getBoundingClientRect(),t=[...document.querySelectorAll('.wc-bi')].filter(x=>x.offsetParent);const e=t[Math.min(t.length-1,20)].getBoundingClientRect();
     const c={x:0,y:Math.round(s.top+scrollY-10),width:document.documentElement.clientWidth,height:0};c.height=Math.round(e.bottom+scrollY+12-c.y);c.height-=c.height%2;c.width-=c.width%2;return c},
   perfSel:'.wc-season',perfDist:1400,
   rec:{screencast:true,fixed:true,sec:7,dpr:2,setup:async()=>{const t=[...document.querySelectorAll('.wc-bi')].filter(x=>x.offsetParent);const r=t[9].getBoundingClientRect();scrollTo(0,r.top+scrollY-8);await new Promise(r=>setTimeout(r,800));
       await Promise.all(t.slice(6,24).flatMap(x=>[...x.querySelectorAll('img')]).map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,5000)})))}}},

 j4:{name:'Since your last visit',hash:'',sel:'.wc-chars',pre:'window.__sjPrevK=57;window.__sjHold=1',
   stage:({today})=>{if(!today&&window.__sjDraw4)window.__sjDraw4(1)},
   clipFn:()=>{const s=document.querySelector('.wc-chars').getBoundingClientRect();const c={x:0,y:Math.round(s.top+scrollY-10),width:document.documentElement.clientWidth,height:0};c.height=Math.round(s.height+20);c.height-=c.height%2;c.width-=c.width%2;return c},
   perfSel:'.wc-chars',
   rec:{fixed:true,sec:3.4,fps:30,dpr:2,hold:30,raf:true,
     setup:()=>{window.__sjDraw4(0);const g=document.querySelector('.sj-since');scrollTo(0,g.getBoundingClientRect().top+scrollY-12)},
     frame:({t})=>{const p=Math.max(0,Math.min(1,(t-500)/1700));window.__sjDraw4(p)}}},

 j5:{name:'The closing bell',hash:'',sel:'.wc-lr-3',pre:'window.__sjHold=1',pad:[14,46],
   stage:({today})=>{if(!today&&window.__sjDraw5)window.__sjDraw5(1.75)},
   perfSel:'.wc-lr-3',
   rec:{sec:3.8,fps:30,dpr:2,hold:20,raf:true,pad:[14,46],
     setup:()=>{window.__sjDraw5(-1)},
     frame:({t})=>{window.__sjDraw5((t-400)/1000)},
     audio:()=>window.__sjSound5(0.4)}},

 j6:{name:'Scroll plays the season',hash:'',sel:'.wc10-ch',pad:[14,30],noFull:true,
   afterScroll:()=>{const f=document.querySelector('.wc10-ch'),r=f.getBoundingClientRect();scrollTo(0,r.top+scrollY-innerHeight*0.62)},
   perfSel:'.wc10-ch',perfDist:900,
   rec:{fixed:true,sec:4.4,fps:30,dpr:2,hold:20,raf:true,
     setup:()=>{window.__sjY0=document.querySelector('.wc10-ch').getBoundingClientRect().top+scrollY;scrollTo(0,window.__sjY0-innerHeight*0.95)},
     frame:({t})=>{const p=Math.min(1,t/3800),e=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;scrollTo(0,window.__sjY0-innerHeight*(0.95-0.62*e))}}},

 j7:{name:'Talking portraits',hash:'',sel:'.wc-chars',pre:'window.__sjHold=1',
   stage:({today})=>{if(!today&&window.__sjOpen7)window.__sjOpen7(0)},
   clipFn:()=>{const s=document.querySelector('.wc-chars').getBoundingClientRect(),e=document.querySelectorAll('.wc-ch')[1].getBoundingClientRect();const c={x:0,y:Math.round(s.top+scrollY-10),width:document.documentElement.clientWidth,height:0};c.height=Math.round(e.bottom+scrollY+14-c.y);c.height-=c.height%2;c.width-=c.width%2;return c},
   perfSel:'.wc-chars',
   rec:{fixed:true,sec:5.2,fps:30,dpr:2,hold:10,
     setup:()=>{window.__sjClose7();const g=document.querySelector('.wc-ch-grid');scrollTo(0,g.getBoundingClientRect().top+scrollY-90);
       document.getAnimations().forEach(a=>a.pause());window.__sjA0=performance.now()},
     frame:({t})=>{if(t>=700&&!window.__o1){window.__o1=1;window.__sjOpen7(0)}if(t>=2900&&!window.__o2){window.__o2=1;window.__sjOpen7(1)}
       document.getAnimations().forEach(a=>{try{a.pause();a.currentTime=(a.__st==null?(a.__st=t):a.__st,t-a.__st)}catch(e){}})}}},

 j8:{name:'Wet ink',hash:'',sel:'.wc-season',pre:'window.__sjNow=Date.UTC(2026,9,29,23,0)',
   stage:()=>{const g=document.querySelector('.wc-bis');if(g&&g.dataset.all!=='1')document.querySelector('.wc-season .wc-more').click()},
   clipFn:()=>{const s=document.querySelector('.wc-season h2').getBoundingClientRect(),t=[...document.querySelectorAll('.wc-bi')].filter(x=>x.offsetParent);const e=t[Math.min(t.length-1,17)].getBoundingClientRect();
     const c={x:0,y:Math.round(s.top+scrollY-10),width:document.documentElement.clientWidth,height:0};c.height=Math.round(e.bottom+scrollY+14-c.y);c.height-=c.height%2;c.width-=c.width%2;return c},
   perfSel:'.wc-season',
   rec:{sec:4.8,fps:30,dpr:2,hold:0,
     clipFn:()=>{const t=[...document.querySelectorAll('.wc-bi')].filter(x=>x.offsetParent);const a=t[9].getBoundingClientRect(),e=t[17].getBoundingClientRect();
       const c={x:0,y:Math.round(a.top+scrollY-8),width:document.documentElement.clientWidth,height:0};c.height=Math.round(e.bottom+scrollY+14-c.y);c.height-=c.height%2;c.width-=c.width%2;return c},
     setup:async()=>{const t=[...document.querySelectorAll('.wc-bi')].filter(x=>x.offsetParent);scrollTo(0,t[9].getBoundingClientRect().top+scrollY-100);await new Promise(r=>setTimeout(r,600));
       await Promise.all(t.slice(6,21).flatMap(x=>[...x.querySelectorAll('img')]).map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,4000)})));window.__sjA=document.getAnimations().filter(a=>a.animationName&&/^sj/.test(a.animationName));window.__sjA.forEach(a=>a.pause())},
     frame:({t})=>{(window.__sjA||[]).forEach(a=>{a.currentTime=t})}}},
};
