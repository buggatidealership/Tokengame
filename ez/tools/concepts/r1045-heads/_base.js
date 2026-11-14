/* r1045 shared: each section head's words in spans (h45-w; the first half h45-L, the rest h45-R, the last h45-last with a gold
   square h45-dot unless the head ends in ? or ) ), "AIs"' lowercase s kept inside its word; H45.info() puts the standings' i back on the
   new face's cap top (the page measured it for Anton) */
window.H45={words:function(){document.querySelectorAll('section .sh h2').forEach(function(h){if(h.__h45)return;h.__h45=1;var ws=[];
  var walk=function(n){[].slice.call(n.childNodes).forEach(function(c){if(c.nodeType===3){var fr=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(function(p){if(!p)return;
     if(/^\s+$/.test(p))fr.appendChild(document.createTextNode(p));else{var s=document.createElement('span');s.className='h45-w';s.textContent=p;fr.appendChild(s);ws.push(s)}});c.replaceWith(fr)}
    else if(c.nodeType===1&&c.tagName==='SMALL')walk(c);else if(c.nodeType===1&&c.classList.contains('mark')){c.classList.add('h45-w');ws.push(c)}})};walk(h);
  /* the lowercase s that follows a word joins it */
  ws.forEach(function(s){var nx=s.nextSibling;if(nx&&nx.nodeType===1&&nx.classList.contains('x2p-lc')){s.appendChild(nx)}});
  ws.forEach(function(s,i){s.classList.add(i<Math.ceil(ws.length/2)?'h45-L':'h45-R')});var last=ws[ws.length-1];
  if(last){last.classList.add('h45-last');var t=h.textContent.trim();if(/[?)]$/.test(t))h.classList.add('h45-q');else{last.innerHTML=last.innerHTML.replace(/\.$/,'');var dt=document.createElement('i');dt.className='h45-dot';dt.setAttribute('aria-hidden','true');last.appendChild(dt)}}
  h.classList.add('h45-h')})},
 info:function(){var h=document.querySelector('#standings .sh h2'),b=document.querySelector('#standings .x2p-flipbtn'),i=b&&b.querySelector('i');if(!h||!i)return;
  var r=document.createRange();r.selectNodeContents(h);var rs=[].filter.call(r.getClientRects(),function(x){return x.width});if(!rs.length)return;var top=rs[0].top;
  var cs=getComputedStyle(h),cv=document.createElement('canvas').getContext('2d');cv.font=cs.fontStyle+' '+cs.fontWeight+' '+cs.fontSize+' '+cs.fontFamily;
  var m=cv.measureText('S'),cap=top+m.fontBoundingBoxAscent-m.actualBoundingBoxAscent;var d=cap-i.getBoundingClientRect().top;
  b.style.setProperty('margin-top',(parseFloat(getComputedStyle(b).marginTop)+d)+'px','important')}};
H45.words();
