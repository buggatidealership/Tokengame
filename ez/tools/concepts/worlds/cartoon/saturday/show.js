/* Saturday-morning take: shared drawing helpers (cels, flags, lettering). Data comes from ezx.js. */
(function(){
var E=window.EZX,M="../../../../../";
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function mix(hex,k){var n=parseInt(hex.slice(1),16),r=n>>16,g=n>>8&255,b=n&255,i=[36,20,12];return "rgb("+[r,g,b].map(function(v,j){return Math.round(v*(1-k)+i[j]*k)}).join(",")+")"}
/* a model's cel badge: its colour, one hard shadow tone, an ink line, the mark in ink, a gloss tick */
function badge(m,size){var c=E.COL[m],d=MODELS[m].d,dot=MODELS[m].dot,fr=MODELS[m].fr;
  return '<span class="mk" style="--s:'+(size||26)+'px" role="img" aria-label="'+E.NAME[m]+'"><svg viewBox="0 0 32 32" aria-hidden="true">'+
   '<circle cx="16" cy="16" r="14.6" fill="'+c+'"/>'+
   '<path d="M3.2 19.5A13.4 13.4 0 0 0 28.8 19.5 15.5 12 0 0 1 3.2 19.5Z" fill="'+mix(c,.28)+'"/>'+
   '<circle cx="16" cy="16" r="14.6" fill="none" stroke="#24140c" stroke-width="2.2"/>'+
   '<g transform="translate(7.2 7.2) scale(.733)"><path fill="#24140c"'+(fr?' fill-rule="'+fr+'"':'')+' d="'+d+'"/>'+(dot?'<path fill="#24140c" d="'+dot+'"/>':'')+'</g>'+
   '<path d="M8 9.5Q10.5 6.2 14.5 5.4" stroke="#fff" stroke-opacity=".75" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg></span>'}
/* a flag as a cel: flat paint, one fold shadow, the ink line */
function flag(m,w){var cn=E.FLAG[m]==="CN",id="f"+Math.random().toString(36).slice(2,7),body;
  if(cn){var st=function(x,y,r,a){var p=[];for(var i=0;i<10;i++){var rr=i%2?r*.42:r,t=(a||0)+i*Math.PI/5-Math.PI/2;p.push((x+rr*Math.cos(t)).toFixed(2)+","+(y+rr*Math.sin(t)).toFixed(2))}return '<polygon points="'+p.join(" ")+'" fill="#ffd23a"/>'};
    body='<rect width="30" height="20" fill="#de2910"/>'+st(5.2,5.4,3.2)+st(10.4,2.4,1.05,.6)+st(12.4,4.6,1.05,.9)+st(12.4,7.6,1.05,0)+st(10.4,9.6,1.05,.6)}
  else{body='<rect width="30" height="20" fill="#f6efe0"/>';for(var i=0;i<7;i++)body+='<rect y="'+(i*20/6.5).toFixed(2)+'" width="30" height="'+(20/13).toFixed(2)+'" fill="#c8202f"/>';
    body+='<rect width="13" height="10.8" fill="#26408f"/>';for(var y=0;y<3;y++)for(var x=0;x<4;x++)body+='<circle cx="'+(2+x*3)+'" cy="'+(2.2+y*3.2)+'" r=".62" fill="#f6efe0"/>'}
  return '<span class="fl" style="--fw:'+(w||26)+'px" role="img" aria-label="'+(cn?"China":"United States")+'"><svg viewBox="-1 -1 32 22" aria-hidden="true"><clipPath id="'+id+'"><path d="M0 1Q8-1 15 1T30 1V19Q22 21 15 19T0 19Z"/></clipPath>'+
   '<g clip-path="url(#'+id+')">'+body+'<path d="M15 1Q19 10 15 19L22 19Q18 10 22 1Z" fill="#24140c" opacity=".22"/></g>'+
   '<path d="M0 1Q8-1 15 1T30 1V19Q22 21 15 19T0 19Z" fill="none" stroke="#24140c" stroke-width="1.5" stroke-linejoin="round"/></svg></span>'}
/* a company: its own logo printed on a small card; logos made for dark grounds go on an ink chip */
function co(t,size){var L=CO_LOGOS[t],src=L?M+"media/"+(L.f||L):null;
  if(!src)return '<span class="co" style="--cs:'+(size||34)+'px"></span>';
  return '<span class="co'+(L.dark?" dk":"")+'" style="--cs:'+(size||34)+'px"><img src="'+src+'" alt="" loading="lazy"></span>'}
/* lettering: each letter at its own angle, baseline and size, words kept whole */
function rnd(i,s){var x=Math.sin(i*12.9898+s*78.233)*43758.5453;return x-Math.floor(x)}
function letter(el,seed,amp){var t=el.textContent,words=t.split(" "),k=0,a=amp||1;el.setAttribute("aria-label",t);
  el.innerHTML=words.map(function(w){return '<span class="w" aria-hidden="true">'+w.split("").map(function(ch){k++;var r=(rnd(k,seed||1)-.5)*9*a,y=(rnd(k+40,seed||1)-.5)*.11*a,s=1+(rnd(k+80,seed||1)-.5)*.1*a;
    return '<span class="c" style="transform:translateY('+y.toFixed(3)+'em) rotate('+r.toFixed(2)+'deg) scale('+s.toFixed(3)+')">'+esc(ch)+'</span>'}).join("")+'</span>'}).join(" ")}
function letterAll(root){(root||document).querySelectorAll("[data-let]").forEach(function(el,i){letter(el,+el.dataset.let||i+1,+el.dataset.amp||1)})}
window.SHOW={M:M,esc:esc,badge:badge,flag:flag,co:co,letter:letter,letterAll:letterAll,mix:mix};
})();
