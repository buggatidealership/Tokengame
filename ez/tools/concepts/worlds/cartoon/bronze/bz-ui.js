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
/* a crop of a model's painted portrait with the face kept whole; a = the box's width/height */
function face(m,Z,fy,a){var F={GROK:[.42,.21],CLAUDE:[.52,.27],GPT:[.63,.22],KIMI:[.62,.2]}[m];Z=Z||2.1;a=a||3/4.4;
  var left=(50-F[0]*Z*100),top=((fy||58)-F[1]*Z*(4/3)*a*100);
  return '<img class="fimg" alt="" src="art/cast-'+m.toLowerCase()+'.jpg" style="position:absolute;max-width:none;width:'+(Z*100)+'%;left:'+left.toFixed(1)+'%;top:'+top.toFixed(1)+'%">'}
/* one upcoming company as a "next issue" panel: the top model's trade in its balloon, the other three as the field,
   and where to follow it (the company's Hyperliquid market, from the Nov 3 snapshot) */
function nextCard(p,top){var B=BZ,lg=B.logo(p.t),dk=(CO_LOGOS[p.t]||{}).dark,h=B.hl(p.t),tt=p.tr&&p.tr[top];
  var field=p.tr?["GPT","CLAUDE","GROK","KIMI"].filter(function(m){return m!==top&&p.tr[m]}).map(function(m){var t=p.tr[m];return '<span class="nt-ch" style="--c:'+B.COL[m]+'"><span class="mkb">'+mark(m,"#17120d",12)+'</span><span class="'+(t.long?"up":"dn")+'">'+(t.long?"LONG":"SHORT")+'</span></span>'}).join(""):"";
  var when=p.res?(tt?(B.key(p.res)===B.key(B.today)?"At the close today · ":"At the close · "):"Close · ")+B.wday(p.res)+" "+B.fmt(p.res):"Date to come";
  var hlTxt=h&&!tt?'<b>Hyperliquid:</b> <span class="mono">'+h.name+'</span>'+(h.thin?' · <span class="thin">thin</span>':''):h?'<b>Follow it on Hyperliquid:</b> <span class="mono">'+h.name+'</span> · '+(h.thin?'<span class="thin">thin market, $'+h.oi.toFixed(1)+'M open interest</span>':'$'+h.oi.toFixed(1)+'M open interest'):(tt?'No Hyperliquid market for '+esc(TICKERS[p.t]||p.t)+'.':'No Hyperliquid market');
  return '<article class="pn nt'+(tt?"":" nt-off")+'" style="--bc:'+B.brand(p.t)+'"><div class="nt-g ink solid" style="--c:var(--bc)">'+
    '<div class="nt-lg'+(dk?" dk":"")+'">'+(lg?'<img src="'+lg+'" alt="">':'')+'</div>'+
    '<div class="nt-mid"><div class="nt-nm">'+esc(B.co(p.t))+'</div><div class="nt-dt">'+when+'</div>'+(field?'<div class="nt-fd">'+field+'</div>':'')+'</div>'+
    (tt?'<div class="nt-top"><div class="nt-face" style="--c:'+B.COL[top]+'">'+face(top,2.1,58,1.17)+'<span class="nt-who">'+B.NAME[top].toUpperCase()+'</span></div><div class="bal nt-bal">'+(tt.long?"Long!":"Short!")+tail("b")+'</div></div>':'')+
    '</div><div class="nt-hl'+(h?"":" none")+'">'+hlTxt+'</div></article>'}
/* the likely range of a hit rate on its sample, drawn as a ruled scale with the band inked in the model's colour */
function rangeBar(m,w,n,hit,W){var B=BZ,RG=B.range(w,n),lo=.3,hi=.9;W=W||220;var X=function(v){return 10+(v-lo)/(hi-lo)*(W-20)},g='';
  for(var v=.3;v<=.9001;v+=.1){g+='<line x1="'+X(v)+'" x2="'+X(v)+'" y1="20" y2="34" stroke="#17120d" stroke-width="1.4"/><text x="'+X(v)+'" y="46" text-anchor="middle" class="rt">'+Math.round(v*100)+'%</text>'}
  g='<line x1="10" x2="'+(W-10)+'" y1="27" y2="27" stroke="#17120d" stroke-width="2"/>'+g+'<rect x="'+X(RG[0])+'" y="17" width="'+(X(RG[1])-X(RG[0]))+'" height="20" fill="'+B.COL[m]+'" stroke="#17120d" stroke-width="2"/>'+
    '<line x1="'+X(hit)+'" x2="'+X(hit)+'" y1="11" y2="43" stroke="#17120d" stroke-width="3"/><circle cx="'+X(hit)+'" cy="11" r="5" fill="#cf3327" stroke="#17120d" stroke-width="2"/>';
  return '<svg class="rgb" viewBox="0 0 '+W+' 50" role="img" aria-label="Likely range of the hit rate: '+Math.round(RG[0]*100)+'% to '+Math.round(RG[1]*100)+'%">'+g+'</svg>'}
window.BZU={face:face,rangeBar:rangeBar,nextCard:nextCard,esc:esc,sfx:sfx,mark:mark,flag:flag,tail:tail,burst:burst,moveWord:moveWord};
})();
