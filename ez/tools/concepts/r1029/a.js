/* r1029 A (owner, 2026-10-27, night: on the live site "keep the tickets as they are, but make them attached one on another... the bet,
   you have the Season 1 ticket and the Season 2 ticket attached... no space between the tickets"): the board's tickets joined edge to edge,
   a perforation at each join; window.__aj = 1 the bet's join (dashed perforation, a notch cut at each end), 2 a perforation only. */
(function(){var ol=document.querySelector('#standings ol.lbl');if(!ol)return;var v=window.__aj||1;
 var st=document.createElement('style');st.textContent='html.x2p #standings ol.lbl.lbl.lbl{gap:0!important;row-gap:0!important}html.x2p #standings ol.lbl.lbl>li{position:relative}'+
  '.aj-p{display:block!important;position:absolute!important;left:0;right:0;top:0;height:0;border-top:2px dashed rgba(20,18,23,.45);pointer-events:none;z-index:3}'+
  '.aj-n{display:block!important;position:absolute!important;top:-9px;width:18px;height:18px;border-radius:50%;background:#0b0a14;z-index:4;pointer-events:none}.aj-n.l{left:-9px}.aj-n.r{right:-9px}'+
  (v===2?'.aj-n{display:none}.aj-p{border-top-style:dotted;border-top-width:2.5px}':'');document.head.appendChild(st);
 [].slice.call(ol.children).forEach(function(li,i){if(!i)return;var p=document.createElement('span');p.className='aj-p';li.appendChild(p);['l','r'].forEach(function(s){var n=document.createElement('span');n.className='aj-n '+s;li.appendChild(n)})})})();
