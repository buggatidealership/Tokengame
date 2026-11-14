/* r1037 (owner, 2026-10-27, night: "a mix of A and B... the format from A but the color of B"; Season 1 in the lighter ink and clear of
   the edge; Live from B; W-L / Hit rate / P&L aligned, W and P green, L red): the tax-stamp strip (perforated top and bottom, a
   double frame inset) in the season book's leather and gold. window.__hV = 'M1' gold ink lettering, the tickets' own green and red;
   'M2' cream ink lettering, the logo's brighter green and red (they read better on the dark leather). */
(function(){var V=window.__hV,d=document,h=d.querySelector('#standings .lbh'),ol=d.querySelector('#standings ol.lbl');if(!h||!ol)return;
 var live=window.__live!=null?window.__live:(function(){try{var p={};new Intl.DateTimeFormat("en-US",{timeZone:"America/New_York",year:"2-digit",month:"numeric",day:"numeric",weekday:"short"}).formatToParts(new Date()).forEach(function(x){p[x.type]=x.value});
  if(p.weekday==="Sat"||p.weekday==="Sun")return false;var t=+p.month+"/"+(+p.day)+"/"+p.year,nd=function(s){var q=String(s||"").split("/");return q.length===3?(+q[0])+"/"+(+q[1])+"/"+q[2].slice(-2):""};
  return [].concat(ROUNDS,PENDING,UPCOMING).some(function(r){return nd(r.called)===t||nd(r.resolves)===t})}catch(e){return false}})();
 var s=d.createElement('span');s.className='hb-s';s.setAttribute('aria-hidden','true');s.innerHTML='<b class="hk">Season 1</b><span class="hv"><i></i>'+(live?'Live':'Off air')+'</span>';h.insertBefore(s,h.firstChild);
 [].slice.call(h.children).forEach(function(c){var t=c.textContent.trim();if(t==='W-L')c.innerHTML='<span class="hk"><i class="g">W</i>-<i class="r">L</i></span>';else if(t==='P&L')c.innerHTML='<span class="hk"><i class="g">P</i>&amp;<i class="r">L</i></span><span class="sr">P&amp;L</span>',c.classList.add('hb-pl');else if(t==='Hit rate')c.innerHTML='<span class="hk">Hit rate</span>'});
 h.classList.add('hb','hb'+V);
 /* each label centred over its column's figures (read from the first ticket, so "P&L" sits over the P&L figure, not over the frame) */
 function align(){var li=ol.querySelector('li.lbr');if(!li)return;var map=[['W-L','.lb-f2 .pn-rec b'],['Hit rate','.lb-c:not(.roi)>b'],['P&L','.lb-c.roi>b']];
  [].slice.call(h.children).forEach(function(c){var k=c.querySelector('.hk');if(!k||c.classList.contains('hb-s'))return;k.style.transform='';var t=c.textContent.replace('P&LP&L','P&L').trim();
   var m=map.filter(function(x){return t.indexOf(x[0])===0})[0];if(!m)return;var f=li.querySelector(m[1]);if(!f)return;
   var a=k.getBoundingClientRect(),b=f.closest('.pn-rec')||f,r=b.getBoundingClientRect();k.style.transform='translateX('+((r.left+r.width/2)-(a.left+a.width/2)).toFixed(2)+'px)'})}
 /* (owner: "the S needs to be exactly at the same space from the bottom than from the top", as 68% sits in its field) every piece's
    ink centred on the bar's middle: the text drawn at 10x on a canvas and scanned for its real top and bottom; the Live tab by its box */
 var IK={};function inkOf(e){var cs=getComputedStyle(e),fz=parseFloat(cs.fontSize),txt=(cs.textTransform==='uppercase'?e.textContent.toUpperCase():e.textContent).replace(/\s+/g,'');
  var key=cs.fontFamily+cs.fontWeight+cs.fontStyle+fz+txt;if(IK[key])return IK[key];var c=d.createElement('canvas'),x=c.getContext('2d'),F=fz*10;c.width=Math.ceil(F*txt.length+40);c.height=Math.ceil(F*2);
  x.font=cs.fontStyle+' '+cs.fontWeight+' '+F+'px '+cs.fontFamily;x.fillText(txt,10,F*1.4);var dt=x.getImageData(0,0,c.width,c.height).data,top=-1,bot=-1;
  for(var y=0;y<c.height;y++)for(var i=0;i<c.width;i++)if(dt[(y*c.width+i)*4+3]>100){if(top<0)top=y;bot=y;break}return IK[key]=[(F*1.4-top)/10,(F*1.4-bot-1)/10]}
 function vmid(){var R=h.getBoundingClientRect(),mid=R.top+R.height/2;[].slice.call(h.querySelectorAll('.hk,.hv')).forEach(function(e){var tf=e.style.transform.replace(/translateY\([^)]*\)/,'').trim();e.style.transform=tf;
   var a=e.getBoundingClientRect(),cy;if(e.classList.contains('hv'))cy=a.top+a.height/2;else{var p=d.createElement('span');p.style.cssText='display:inline-block;width:0;height:0;vertical-align:baseline';e.appendChild(p);var base=p.getBoundingClientRect().top;p.remove();var k=inkOf(e);cy=base-(k[0]+k[1])/2}
   e.style.transform=(tf+' translateY('+(mid-cy).toFixed(2)+'px)').trim()})}
 align();vmid();setTimeout(function(){align();vmid()},300);
 var G=V==='M1'?['#2f9a5c','#d2463b','#e2bd62','#ead9b4']:V==='M3'?['#9cf0c0','#ff8a80','#f8f0d9','#f8f0d9']:['#03c870','#ff4a40','#f8f0d9','#f8f0d9'],X='html.x2p #standings .lbh.hb';
 var pb=d.querySelector('#learn .x2p-pt .pt-bd.g'),pc=pb&&getComputedStyle(pb);
 var BG=V==='M3'&&pc?'background:radial-gradient(130% 160% at 50% 50%,transparent 55%,rgba(20,30,10,.38)),'+pc.backgroundImage+','+pc.backgroundColor+';background-size:auto,'+pc.backgroundSize+';background-blend-mode:normal,'+pc.backgroundBlendMode+';box-shadow:inset 0 0 0 1px rgba(0,0,0,.25),inset 0 2px 6px rgba(0,0,0,.35);':'background:radial-gradient(120% 160% at 20% 0,#4a3022,#24160f 70%);';
 var st=d.createElement('style');st.textContent=
  X+'{align-items:center;padding:0;min-height:48px;margin:0!important;position:relative;z-index:2;'+BG+
   '-webkit-mask:radial-gradient(circle 3px at 50% 0,#0000 96%,#000) top/9px 51% repeat-x,radial-gradient(circle 3px at 50% 100%,#0000 96%,#000) bottom/9px 51% repeat-x;mask:radial-gradient(circle 3px at 50% 0,#0000 96%,#000) top/9px 51% repeat-x,radial-gradient(circle 3px at 50% 100%,#0000 96%,#000) bottom/9px 51% repeat-x}'+
  X+'::before{content:"";position:absolute;inset:8px 6px;border:1px solid rgba(214,166,62,.75);outline:1px solid rgba(214,166,62,.35);outline-offset:-4px;pointer-events:none}'+
  (V==='M3'?X+'::before{border-color:rgba(248,232,190,.7);outline-color:rgba(248,232,190,.3)}':'')+
  /* M3's age (owner: "a little bit more of that old feel"): ink worn off in pale specks, a darker, uneven tone, the edges rubbed darker */
  (V==='M3'?X+'::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:0;mix-blend-mode:screen;opacity:'+(window.__age||.18)+';background:url("data:image/svg+xml;utf8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27220%27 height=%27220%27%3E%3Cfilter id=%27w%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%27.75%27 numOctaves=%272%27 seed=%277%27/%3E%3CfeColorMatrix values=%270 0 0 0 .9  0 0 0 0 .88  0 0 0 0 .78  0 0 0 -14 6.6%27/%3E%3C/filter%3E%3Crect width=%27220%27 height=%27220%27 filter=%27url(%23w)%27/%3E%3C/svg%3E") 0 0/220px 220px}'+X+'{filter:saturate(.82) brightness(.94)}':'')+
  X+'>span{grid-row:1;align-self:center;position:relative;z-index:2;justify-self:center;text-align:center}'+
  X+'>.hb-s{grid-column:1/3;justify-self:start;display:flex;align-items:center;gap:9px;padding-left:20px!important;margin-left:0!important;white-space:nowrap}'+
  /* "the lighter ink": the board's own lighter-ink speckle on light ink (no multiply on a dark ground) */
  X+' .hk{filter:url(#x2pcL);display:inline-block}'+
  X+'>.hb-s .hk{font:400 17px/1 Anton,sans-serif;letter-spacing:.04em;text-transform:uppercase;color:'+G[2]+'}'+
  X+'>span:not(.hb-s) .hk{font:700 10px/1 "Saira Condensed",sans-serif;letter-spacing:.14em;text-transform:uppercase;color:'+G[3]+'}'+
  X+' .hk i{font-style:normal}'+X+' .hk .g{color:'+G[0]+'}'+X+' .hk .r{color:'+G[1]+'}'+
  /* the P&L label over the middle of the printed field (the frame line stands 9px in from the ticket's right edge) */
  /* Live from B: a red ribbon tab */
  X+' .hv{display:inline-flex;align-items:center;gap:5px;font:700 9.5px/1 "Saira Condensed",sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#f8f0d9;background:#a3201f;padding:3px 9px 3px 6px;clip-path:polygon(0 0,100% 0,90% 50%,100% 100%,0 100%)}'+
  X+' .hv i{width:5px;height:5px;border-radius:50%;background:#f8f0d9}';
 d.head.appendChild(st)})();
