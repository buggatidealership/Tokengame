/* r1029 A (owner, 2026-10-27, night: on the live site "keep the tickets as they are, but make them attached one on another... the bet,
   you have the Season 1 ticket and the Season 2 ticket attached... no space between the tickets"): the board's tickets joined edge to edge,
   a perforation at each join; window.__aj = 1 the bet's join (dashed perforation, a notch cut at each end), 2 a perforation only. */
(function(){var ol=document.querySelector('#standings ol.lbl');if(!ol)return;var v=window.__aj||1;if(v>2)return;
 var st=document.createElement('style');st.textContent='html.x2p #standings ol.lbl.lbl.lbl{gap:0!important;row-gap:0!important}html.x2p #standings ol.lbl.lbl>li{position:relative}'+
  '.aj-p{display:block!important;position:absolute!important;left:0;right:0;top:0;height:0;border-top:2px dashed rgba(20,18,23,.45);pointer-events:none;z-index:3}'+
  '.aj-n{display:block!important;position:absolute!important;top:-9px;width:18px;height:18px;border-radius:50%;background:#0b0a14;z-index:4;pointer-events:none}.aj-n.l{left:-9px}.aj-n.r{right:-9px}'+
  (v===2?'.aj-n{display:none}.aj-p{border-top-style:dotted;border-top-width:2.5px}':'');document.head.appendChild(st);
 [].slice.call(ol.children).forEach(function(li,i){if(!i)return;var p=document.createElement('span');p.className='aj-p';li.appendChild(p);['l','r'].forEach(function(s){var n=document.createElement('span');n.className='aj-n '+s;li.appendChild(n)})})})();
/* A3/A4 (owner, 2026-10-27, night, with a screenshot of the bet's join: "the tickets have been stitched together within the bet
   section... I was referring to the one that I'm attaching now"): the bet's own join copied onto every join of the board: a row of
   punched holes (the bet's .bs-perf: #0b0a12 dots, 1.35px, 6.5px pitch) between two half-round bites cut at the edges, a round hole
   where the stub's perforation crosses; A4 also prints the bet's two bands at each join (red foot on the upper ticket, green head
   on the lower one). Drawn on the list itself (the tickets' scallop masks would clip half of everything). */
(function(){var v=window.__aj;if(v!==3&&v!==4)return;var ol=document.querySelector('#standings ol.lbl');if(!ol)return;
 var lis=[].slice.call(ol.children).filter(function(li){return li.offsetHeight>20});if(lis.length<2)return;
 var st=document.createElement('style');st.textContent=
  'html.x2p #standings ol.lbl.lbl.lbl{gap:0!important;row-gap:0!important;position:relative}'+
  '.aj3{display:block!important;position:absolute!important;pointer-events:none;z-index:6;margin:0!important;padding:0!important;border:0!important}'+
  '.aj3.pf{height:3.8px;background:radial-gradient(circle,#0b0a12 1.35px,rgba(11,10,18,0) 1.75px) 0 50%/6.5px 100% repeat-x!important}'+
  '.aj3.bt{width:20px;height:20px;border-radius:50%;background:#0b0a12!important}'+
  '.aj3.ho{width:12px;height:12px;border-radius:50%;background:#0b0a12!important;box-shadow:0 0 0 1.4px rgba(20,18,23,.35)}'+
  '.aj3.rd,.aj3.gr{height:7px;z-index:5}'+
  '.aj3.rd{background:linear-gradient(#b8262a,#a3201f)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.12)}'+
  '.aj3.gr{background:linear-gradient(#1f6b3f,#185634)!important;box-shadow:inset 0 -1px 0 rgba(0,0,0,.2)}'+
  (v===4?'html.x2p #standings ol.lbl.lbl.lbl{row-gap:0!important}':'');document.head.appendChild(st);
 var O=ol.getBoundingClientRect();
 function add(c,css){var e=document.createElement('span');e.className='aj3 '+c;e.setAttribute('aria-hidden','true');e.style.cssText=css;ol.appendChild(e);return e}
 function draw(){[].slice.call(ol.querySelectorAll('.aj3')).forEach(function(e){e.remove()});O=ol.getBoundingClientRect();
  for(var i=1;i<lis.length;i++){var a=lis[i-1].getBoundingClientRect(),b=lis[i].getBoundingClientRect(),y=(a.bottom+b.top)/2-O.top,L=b.left-O.left,W=b.width;
   var rk=lis[i].querySelector('.rk'),sx=rk?rk.getBoundingClientRect().right-O.left:L+52;
   if(v===4){add('rd','left:'+L+'px;width:'+W+'px;top:'+(y-7)+'px');add('gr','left:'+L+'px;width:'+W+'px;top:'+y+'px')}
   add('pf','left:'+(L+10)+'px;width:'+(W-20)+'px;top:'+(y-1.9)+'px');
   add('bt','left:'+(L-10)+'px;top:'+(y-10)+'px');add('bt','left:'+(L+W-10)+'px;top:'+(y-10)+'px');
   add('ho','left:'+(sx-6)+'px;top:'+(y-6)+'px')}}
 draw();window.__ajDraw=draw})();
