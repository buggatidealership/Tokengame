/* r1034 H (owner: "there was sort of like a thing around it that was saying like, season 1 and live... I want that to also show up here"):
   window.__hV = 'A' the timing tower's head as a strap on top of the tickets (red band, "Season 1 · Round n", the Live/Off air tag);
   'B' an e-ticket outline round the whole board (E1's head: E-ticket, Season 1 · Round n, the tag). Live = a round's calls due or graded
   today in New York on a weekday (the tower's rule). */
(function(){var V=window.__hV,ol=document.querySelector('#standings.x2p-tix ol.lbl');if(!ol)return;
 var G=ROUNDS.filter(function(r){return typeof r.a==="number"&&!isNaN(r.a)}),last=G[G.length-1].n;
 var live=(function(){try{var p={};new Intl.DateTimeFormat("en-US",{timeZone:"America/New_York",year:"2-digit",month:"numeric",day:"numeric",weekday:"short"}).formatToParts(new Date()).forEach(function(x){p[x.type]=x.value});
  if(p.weekday==="Sat"||p.weekday==="Sun")return false;var t=+p.month+"/"+(+p.day)+"/"+p.year,nd=function(s){var q=String(s||"").split("/");return q.length===3?(+q[0])+"/"+(+q[1])+"/"+q[2].slice(-2):""};
  return [].concat(ROUNDS,PENDING,UPCOMING).some(function(r){return nd(r.called)===t||nd(r.resolves)===t})}catch(e){return false}})();
 if(window.__live!=null)live=window.__live;
 var tag='<span class="hz-live'+(live?'':' off')+'"><i></i>'+(live?'Live':'Off air')+'</span>';
 var st=document.createElement('style');st.textContent=
  '.hz-hd{display:flex;align-items:center;justify-content:space-between;gap:10px;font:italic 900 12px/1 Kanit,sans-serif;letter-spacing:.06em;text-transform:uppercase}'+
  '.hz-live{display:inline-flex;align-items:center;gap:6px;padding:4px 9px;border-radius:999px;font:700 10px/1 "Saira Condensed",sans-serif;letter-spacing:.16em;text-transform:uppercase}'+
  '.hz-live i{width:7px;height:7px;border-radius:50%;background:#ff3a31;box-shadow:0 0 0 3px rgba(255,58,49,.25)}'+
  '.hz-live.off i{background:#8b8a90;box-shadow:none}'+
  '.hzA{margin:0 0 0;padding:9px 14px;background:linear-gradient(#c22d2a,#a3201f);color:#f8f0d9;box-shadow:3px 4px 0 #000;transform:skewX(-6deg);border-left:5px solid #fdbc2a}'+
  '.hzA>*{transform:skewX(6deg)}.hzA .hz-live{background:#04070e;color:#f8f0d9}.hzA .hz-live.off{color:#b9b4a8}'+
  '.hzB{position:relative;border:2px solid #fdbc2a;border-radius:16px;padding:12px 6px 14px;margin:0 -12px;background:rgba(253,188,42,.04)}'+
  '.hzB .hz-hd{color:#fdbc2a;padding:0 4px 10px}.hzB .hz-k{display:block;font:700 8px/1 "Saira Condensed",sans-serif;letter-spacing:.24em;color:rgba(248,240,217,.55);margin-bottom:4px;font-style:normal}'+
  '.hzB .hz-live{color:#ff6a62;background:rgba(255,58,49,.12);box-shadow:inset 0 0 0 1px rgba(255,58,49,.5)}.hzB .hz-live.off{color:#b9b4a8;background:rgba(255,255,255,.06);box-shadow:inset 0 0 0 1px rgba(255,255,255,.2)}';
 document.head.appendChild(st);
 var host=ol.parentNode;
 if(V==='A'){var top=host.querySelector('.lbh')||ol;var h=document.createElement('div');h.className='hzA hz-hd';h.innerHTML='<span>Season 1 · Round '+last+'</span>'+tag;top.parentNode.insertBefore(h,top);h.style.marginBottom='12px'}
 if(V==='B'){var lbh=host.querySelector('.lbh')||ol;var w=document.createElement('div');w.className='hzB';host.insertBefore(w,lbh);
  w.innerHTML='<div class="hz-hd"><span><span class="hz-k">E-ticket</span>Season 1 · Round '+last+'</span>'+tag+'</div>';if(lbh!==ol)w.appendChild(lbh);w.appendChild(ol)}
 dispatchEvent(new Event('resize'))})();
