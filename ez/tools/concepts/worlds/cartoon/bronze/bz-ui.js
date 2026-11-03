/* bronze: lettering and print helpers shared by both pages */
(function(){
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;")}
/* a sound effect: each letter hand-set at its own size and angle (letters grow toward the end, like a shout coming at you) */
function sfx(word,o){o=o||{};var s="",n=word.length,base=o.size||28,grow=o.grow==null?.35:o.grow,j=[-6,4,-3,6,-5,2,-4,5,-2,3];
  for(var i=0;i<n;i++){var c=word[i];if(c===" "){s+='<i style="width:.25em"></i>';continue}
    var f=base*(1+grow*(n>1?i/(n-1):0)),r=(o.rot||-6)+j[i%j.length]*(o.jit==null?.5:o.jit),y=(i%2?-1:1)*(o.bob||1.5);
    s+='<i style="font-size:'+f.toFixed(1)+'px;transform:translateY('+y+'px) rotate('+r.toFixed(1)+'deg)">'+esc(c)+'</i>'}
  return '<span class="sfx '+(o.cls||"")+'" aria-hidden="true" style="'+(o.style||"")+';--f:'+(o.fill||"#f6d23e")+';--x:'+(o.ex||"#c2321f")+'">'+s+'</span>'}
/* a model's own mark, printed in one ink */
function mark(m,fill,size){var M=MODELS[m];size=size||20;
  return '<span class="mk" style="width:'+size+'px;height:'+size+'px"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="'+(fill||"var(--ink)")+'"'+(M.fr?' fill-rule="'+M.fr+'"':'')+' d="'+M.d+'"/>'+(M.dot?'<path fill="'+(fill||"var(--ink)")+'" d="'+M.dot+'"/>':'')+'</svg></span>'}
/* the lab's country as a small printed flag (red, white and blue for the US; red and yellow for China) */
function flag(cc,w){w=w||22;var h=Math.round(w*.64);
  if(cc==="CN")return '<svg class="flag" style="width:'+w+'px;height:'+h+'px" viewBox="0 0 30 20" aria-label="China"><rect width="30" height="20" fill="#d6311f"/><path fill="#f6cf2e" d="M5 3.2l1 3h3.1l-2.5 1.8 1 3-2.6-1.9-2.6 1.9 1-3L.9 6.2H4z"/><circle cx="11" cy="2.6" r=".9" fill="#f6cf2e"/><circle cx="13" cy="4.8" r=".9" fill="#f6cf2e"/><circle cx="13" cy="7.8" r=".9" fill="#f6cf2e"/><circle cx="11" cy="9.8" r=".9" fill="#f6cf2e"/></svg>';
  var st="";for(var i=0;i<7;i++)st+='<rect y="'+(i*20/6.5).toFixed(2)+'" width="30" height="1.54" fill="#cc2b22"/>';
  return '<svg class="flag" style="width:'+w+'px;height:'+h+'px" viewBox="0 0 30 20" aria-label="United States"><rect width="30" height="20" fill="#f3ead2"/>'+st+'<rect width="13" height="10.8" fill="#24418a"/><g fill="#f3ead2"><circle cx="2.5" cy="2.4" r=".7"/><circle cx="6.5" cy="2.4" r=".7"/><circle cx="10.5" cy="2.4" r=".7"/><circle cx="4.5" cy="5.4" r=".7"/><circle cx="8.5" cy="5.4" r=".7"/><circle cx="2.5" cy="8.4" r=".7"/><circle cx="6.5" cy="8.4" r=".7"/><circle cx="10.5" cy="8.4" r=".7"/></g></svg>'}
/* a balloon tail: dir = where it points ("b" down, "bl", "br", "l", "r"), drawn in the balloon's own paper and ink */
function tail(pos){var p={b:"M2 0 L10 21 L18 0",bl:"M4 0 L-4 20 L16 0",br:"M4 0 L22 20 L16 0"}[pos||"b"];
  return '<svg class="tl" viewBox="0 0 20 22" aria-hidden="true"><path d="'+p+'"/><rect x="3.4" y="-3" width="13.2" height="4.6" fill="#f6ecd0"/></svg>'}
/* a burst balloon for a shout: an irregular star in paper and ink */
function burst(w,h,seed){var pts=[],n=22,cx=w/2,cy=h/2;for(var i=0;i<n;i++){var a=i/n*Math.PI*2,k=i%2?.80:1,jit=1+(((i*37+(seed||3))%9)-4)/60;pts.push((cx+Math.cos(a)*cx*k*jit).toFixed(1)+","+(cy+Math.sin(a)*cy*k*jit).toFixed(1))}
  return '<svg viewBox="-4 -4 '+(w+8)+' '+(h+8)+'" preserveAspectRatio="none" style="position:absolute;inset:-4px;width:calc(100% + 8px);height:calc(100% + 8px);z-index:-1" aria-hidden="true"><polygon points="'+pts.join(" ")+'" fill="#f8efd2" stroke="#17120d" stroke-width="2.6" stroke-linejoin="round"/></svg>'}
/* the move as a sound effect word picked by size and direction (bigger moves, louder words) */
function moveWord(a){var x=Math.abs(a);if(a>=0)return x>=10?"KA-BOOM!":x>=4?"WHOOSH!":"ZIP!";return x>=10?"KRAKOOM!":x>=4?"CRASH!":"THUD!"}
window.BZU={esc:esc,sfx:sfx,mark:mark,flag:flag,tail:tail,burst:burst,moveWord:moveWord};
})();
