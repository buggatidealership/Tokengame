/* sol4 side item: the bet chapter's three callouts (C1 the pool, U1 the call, K1 the switch) lived as page text on the dark ground under
   the parts plate. Two takes put them in the plate's world (mock only; the vault and the chip stay):
   k1 silkscreen: the board extends below the parts as empty board, and the lines are printed on it in the board's own white
   silkscreen (designator in a printed outline, name, line), as a manufacturer prints part labels;
   k2 caption boxes: three blank comic caption boxes drawn into the plate (black, gold ink border), the lines lettered in them.
   Phone: a 3:4 plate with the three surfaces stacked; desktop: a 4:3 plate with them side by side, one under each part.
   The pool's share is read from SIM.poolShare; nothing typed. Classes s4k-. */
(function(){const IMG=window.S4IMG;const sh=Math.round((window.SIM&&SIM.poolShare!=null?SIM.poolShare:.69)*100);
const L=[['C1','The pool',`<b class="s4k-g">${sh}%</b> of $EZ creator fees fill it`],['U1','The call','The pool gets bet on the call of the AI on top of the leaderboard.'],
 ['K1','The switch','<i class="s4k-ok">● Right:</i> $EZ buyback<br><i class="s4k-no">● Wrong:</i> the pool can be wiped out']];
const T={k1:{ph:{src:'b1-silk-3x4.jpg',iw:768,ih:1024,crop:[0,0,768,990],q:[[118,432,712,572],[118,614,712,754],[118,804,712,950]]},
             wd:{src:'b1-silk2.jpg',iw:1024,ih:768,crop:[0,0,1024,768],q:[[150,420,345,740],[397,420,592,740],[681,420,876,740]]}},
         k2:{ph:{src:'b2-cap-3x4.jpg',iw:768,ih:1024,crop:[0,0,768,1000],q:[[104,450,664,552],[104,636,664,744],[104,832,664,948]]},
             wd:{src:'b2-cap.jpg',iw:1024,ih:768,crop:[0,0,1024,768],q:[[102,528,310,650],[398,531,610,652],[714,533,928,652]]}}};
window.S4bet=function(k){const sec=document.querySelector('#wc-book .wc-bet');if(!sec)return;const st=sec.querySelector('.hb-st');if(!st)return;
 document.documentElement.classList.add('s4k-on');st.classList.add('s4k','s4k-'+k);st.innerHTML=`<div class="s4k-st"><img alt="" decoding="async"><ol class="s4k-l"></ol></div>`;
 const draw=()=>{const C=innerWidth>=900?T[k].wd:T[k].ph,stg=st.querySelector('.s4k-st'),W=stg.clientWidth,[x0,y0,x1,y1]=C.crop,s=W/(x1-x0);
  stg.style.height=((y1-y0)*s).toFixed(1)+'px';const im=stg.querySelector('img');if(im.dataset.src!==C.src){im.dataset.src=C.src;im.src=IMG+C.src}
  im.style.cssText=`position:absolute;max-width:none;width:${(C.iw*s).toFixed(1)}px;left:${(-x0*s).toFixed(1)}px;top:${(-y0*s).toFixed(1)}px`;
  stg.querySelector('ol').innerHTML=L.map((l,i)=>{const q=C.q[i];return `<li style="left:${((q[0]-x0)*s).toFixed(1)}px;top:${((q[1]-y0)*s).toFixed(1)}px;width:${((q[2]-q[0])*s).toFixed(1)}px;height:${((q[3]-q[1])*s).toFixed(1)}px;--u:${s.toFixed(4)}"><b class="s4k-d">${l[0]}</b><span class="s4k-n">${l[1]}</span><span class="s4k-t">${l[2]}</span></li>`}).join('');
  /* fit: step the type down until each block sits inside its painted surface */
  stg.querySelectorAll('li').forEach(li=>{let f=parseFloat(getComputedStyle(li).fontSize);while((li.scrollHeight>li.clientHeight+1||li.scrollWidth>li.clientWidth+1)&&f>8){f-=.5;li.style.fontSize=f+'px'}})};
 draw();addEventListener('resize',draw);if(document.fonts)document.fonts.ready.then(draw)};
})();
