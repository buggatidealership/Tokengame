/* r1039 shared: a ticket in the Season 1 feel (the bet ticket's own die, stock, strips and rules, by its classes), the on-air antenna,
   stamped company logos, and words knocked out of the bands. Reads LV (live-r1), lvState (live-r3), lv4 (live-r4). */
window.r39=(function(){var d=document;
 var lst=function(v){var o=[],dp=0,st=0;for(var i=0;i<v.length;i++){var c=v[i];if(c==="(")dp++;else if(c===")")dp--;else if(c===","&&!dp){o.push(v.slice(st,i).trim());st=i+1}}o.push(v.slice(st).trim());return o};
 var full=function(v,n){var a=lst(v),o=[];for(var i=0;i<n;i++)o.push(a[i%a.length]);return o};
 var ANT='<svg viewBox="0 0 20 22" aria-hidden="true" focusable="false"><path class="w" d="M4.2 3.6a8 8 0 0 0 0 11.3M15.8 3.6a8 8 0 0 1 0 11.3M6.9 6.3a4.2 4.2 0 0 0 0 5.9M13.1 6.3a4.2 4.2 0 0 1 0 5.9"/><path class="m" d="M10 9.3 6.6 21.2M10 9.3l3.4 11.9M7.6 17.6h4.8M8.6 14h2.8"/><circle class="d" cx="10" cy="9.3" r="2.1"/></svg>';
 return {
  ant:function(on,cls){return '<span class="r39-air '+(cls||"")+(on?" on":"")+'">'+ANT+'</span>'},
  tk:function(cls,inner,head,foot){return '<div class="bs-nx r39-t '+cls+'"><div class="bt-sh"><i></i></div><div class="bt-hs"></div><div class="bt-p"><div class="bt-pp"><i class="bt-pl"></i><i class="bt-r1"></i><i class="bt-r2"></i></div>'+
    inner+(head!=null?'<div class="bt-st bt-hd">'+head+"</div>":"")+(foot!=null?'<div class="bt-st bt-ft">'+foot+"</div>":"")+"</div></div>"},
  /* the paper: the bet's layers, fibres (22) and sunburst (24, 25) off; extra vertical perforations at xs (each a notch top and bottom and
     a column of punched holes), cut into the die of the paper and both shadows; the words knocked out of the bands take the grain */
  dress:function(t,xs){var pp=t.querySelector(".bt-pp");var L=lst(getComputedStyle(pp).backgroundImage);if(L.length<27)return;var grain=L[23];L[22]=L[24]=L[25]="none";pp.style.backgroundImage=L.join(", ");
   (xs||[]).forEach(function(x){var cut=function(at,r){return "radial-gradient(circle at "+at+", #0000 calc("+r+" - .35px), #000 calc("+r+" + .45px))"},
     add=[cut(x+" 0","var(--rn)"),cut(x+" 100%","var(--rn)"),"radial-gradient(circle at "+x+" 50%, #0000 calc(var(--hr) - .3px), #000 calc(var(--hr) + .4px))"],
     sz=["100% 100%","100% 100%","100% var(--hp)"],ps=["0 0","0 0","0 50%"],rp=["no-repeat","no-repeat","repeat-y"];
    [pp,t.querySelector(".bt-sh>i"),t.querySelector(".bt-hs")].forEach(function(e){var cs=getComputedStyle(e),im=lst(cs.maskImage),n=im.length;
     e.style.setProperty("mask-image",im.concat(add).join(", "));e.style.setProperty("mask-size",full(cs.maskSize,n).concat(sz).join(", "));e.style.setProperty("mask-position",full(cs.maskPosition,n).concat(ps).join(", "));
     e.style.setProperty("mask-repeat",full(cs.maskRepeat,n).concat(rp).join(", "));e.style.setProperty("mask-composite",full(cs.maskComposite,n).concat(["intersect","intersect","intersect"]).join(", "));
     e.style.setProperty("mask-origin",full(cs.maskOrigin,n).concat(["border-box","border-box","border-box"]).join(", "));e.style.setProperty("mask-clip",full(cs.maskClip,n).concat(["border-box","border-box","border-box"]).join(", "))})});
   [].slice.call(t.querySelectorAll(".r39-ko")).forEach(function(e){e.style.backgroundImage=grain;e.style.backgroundSize="200px 200px"});return grain},
  logo:function(u){return lvLogo(u,"r39-lg")},
  logos:function(R,n){var B=lvBig(R),s=B.slice(0,n),k=B.length-s.length;return '<span class="r39-lgs">'+s.map(function(u){return lvLogo(u,"r39-lg")}).join("")+(k>0?'<span class="r39-k">+'+k+"</span>":"")+"</span>"},
  week:function(){try{return lv4.week()}catch(e){return ""}}
 }})();
