// The takes: where each one sits on the page, how to stage it for a still, how to record it, how to measure it.
module.exports={
 j2:{name:'Page turn',hash:'',sel:'main',pad:[0,0],
   rec:{fixed:true,sec:4.6,fps:30,dpr:2,hold:20,
     setup:()=>{window.__sjKeepHead=1;const h=document.querySelector('header.top');if(h)h.style.visibility='visible';scrollTo(0,0)},
     frame:async({t})=>{const S=[[500,'#/leaderboard'],[2000,'#/upcoming'],[3400,'#/']],D=740;
       for(const [at,h] of S){if(t>=at&&!window['__sjDid'+at]){window['__sjDid'+at]=1;await window.__sjTurn(h)}
         if(t>=at&&t<at+D+40){window.__sjStep(Math.min(D,t-at));return}
         if(t>=at+D+40&&!window['__sjEnd'+at]){window['__sjEnd'+at]=1;window.__sjEnd()}}}}},

 j3:{name:'The golden ticket in your hand',hash:'#/leaderboard',sel:'.wc-sb-1',
   stage:()=>{},
   clipFn:()=>{const a=document.querySelector('.wc-sbd h2').getBoundingClientRect(),b=document.querySelectorAll('.wc-sb-r')[1].getBoundingClientRect();
     const c={x:0,y:Math.round(a.top+scrollY-10),width:document.documentElement.clientWidth,height:0};c.height=Math.round(b.top+scrollY+150-c.y);c.height-=c.height%2;c.width-=c.width%2;return c},
   rec:{sec:6.4,fps:30,dpr:2,hold:0,
     setup:()=>{window.__sjNoEase=1;const r=document.querySelector('.wc-sb-1');r.insertAdjacentHTML('beforeend','<i class="sj-rphone" aria-hidden="true"><i></i><b>tilt</b></i>');window.__sjTilt(0,45)},
     frame:({t})=>{const s=t/1000,g=17*Math.sin(2*Math.PI*s/3.2),b=45+11*Math.sin(2*Math.PI*s/2.13+1.1)*Math.min(1,s/1.2);window.__sjTilt(g*Math.min(1,s/.8),b);
       const ph=document.querySelector('.sj-rphone i');if(ph)ph.style.transform=`rotate(${g*Math.min(1,s/.8)*1.4}deg)`},raf:true}},

 j1:{name:'Moving pictures',hash:'',sel:'.wc-season',pre:"window.__sjCG="+JSON.stringify((()=>{try{return require('fs').readFileSync(__dirname+'/cg/list.txt','utf8').trim()}catch(e){return ''}})()),
   stage:()=>{const g=document.querySelector('.wc-bis');if(g&&g.dataset.all!=='1')document.querySelector('.wc-season .wc-more').click()},
   stageNow:()=>{},
   clipFn:()=>{const s=document.querySelector('.wc-season h2').getBoundingClientRect(),t=[...document.querySelectorAll('.wc-bi')].filter(x=>x.offsetParent);const e=t[Math.min(t.length-1,20)].getBoundingClientRect();
     const c={x:0,y:Math.round(s.top+scrollY-10),width:document.documentElement.clientWidth,height:0};c.height=Math.round(e.bottom+scrollY+12-c.y);c.height-=c.height%2;c.width-=c.width%2;return c},
   perfSel:'.wc-season',perfDist:1400,
   rec:{screencast:true,fixed:true,sec:7,dpr:2,setup:()=>{const t=[...document.querySelectorAll('.wc-bi')].filter(x=>x.offsetParent);const r=t[9].getBoundingClientRect();scrollTo(0,r.top+scrollY-8)}}},

 j4:{name:'Since your last visit',hash:'',sel:'.wc-chars',pre:'window.__sjPrevK=57;window.__sjHold=1',
   stage:({today})=>{if(!today&&window.__sjDraw4)window.__sjDraw4(1)},
   clipFn:()=>{const s=document.querySelector('.wc-chars').getBoundingClientRect();const c={x:0,y:Math.round(s.top+scrollY-10),width:document.documentElement.clientWidth,height:0};c.height=Math.round(s.height+20);c.height-=c.height%2;c.width-=c.width%2;return c},
   perfSel:'.wc-chars',
   rec:{fixed:true,sec:3.4,fps:30,dpr:2,hold:30,raf:true,
     setup:()=>{window.__sjDraw4(0);const g=document.querySelector('.sj-since');scrollTo(0,g.getBoundingClientRect().top+scrollY-12)},
     frame:({t})=>{const p=Math.max(0,Math.min(1,(t-500)/1700));window.__sjDraw4(p)}}},

 j5:{name:'The closing bell',hash:'',sel:'.wc-lr-3',pre:'window.__sjHold=1',pad:[14,46],
   stage:({today})=>{if(!today&&window.__sjDraw5)window.__sjDraw5(0.35)},
   perfSel:'.wc-lr-3',
   rec:{sec:3.8,fps:30,dpr:2,hold:20,raf:true,pad:[14,46],
     setup:()=>{window.__sjDraw5(-1)},
     frame:({t})=>{window.__sjDraw5((t-400)/1000)},
     audio:()=>window.__sjSound5(0.4)}},
};
