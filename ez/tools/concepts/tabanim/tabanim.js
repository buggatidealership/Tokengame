/* tabanim: five takes on switching the proof card's tabs (owner, 2026-10-29: "more creative animations... for the switching of tabs.
   creative but inline with the feel of tickets"). A mockup laid over the built X2+ page (run.js / frames.js inject it).
   window.__taTake = T1..T5. The page's own swap (show() via the tab buttons) still does the work; this:
   - maps the page's 120ms exit delay to 0 during a tab click, and switches its fade/rise and line drawing off (tabanim.css),
   - at the click, lays a paper copy of the open page over the card (a clone of .pt-in as a direct child of .pt-cd, so the page's own
     `.pt-cd.stx-p>.pt-in` rules apply to it), hides the real page,
   - once the new view is in, runs the take with WAAPI only (seekable: window.__taAnims), then removes the copies.
   Reduced motion: nothing here runs; the page swaps at once. */
(function(){
 var d=document,T=window.__taTake||"T1";
 var RM=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
 d.documentElement.classList.add("ta","ta-"+T);
 var oST=window.setTimeout,fast=false;
 window.setTimeout=function(f,ms){if(fast&&ms===120)ms=0;var a=[].slice.call(arguments);a[1]=ms;return oST.apply(window,a)};
 var run=null;
 function rnd(s){return function(){s|=0;s=s+0x6D2B79F5|0;var t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
 function geo(cd){var sv=cd.querySelector(".pr2-sv"),W=cd.offsetWidth,H=cd.offsetHeight,gr=null,rd=null;
  if(sv)[].forEach.call(sv.querySelectorAll("rect[fill^='url']"),function(r){var f=r.getAttribute("fill");if(/gr\)$/.test(f))gr=r;else if(/r\)$/.test(f))rd=r});
  var img=sv&&sv.querySelector("pattern image");
  return {W:W,H:H,Y0:gr?+gr.getAttribute("height"):46,Y1:rd?+rd.getAttribute("y"):H-31,grain:img?img.getAttribute("href"):""}}
 /* a paper copy of the open page: the page's own .pt-in, cloned, widened to the card (3.5px in from the teeth), clipped to the body */
 function sheet(cd,G,o){o=o||{};var pin=cd.querySelector(":scope>.pt-in:not(.ta-sheet)"),c=pin.cloneNode(true),tb=c.querySelector(".pt-tb");if(tb)tb.remove();
  c.classList.add("ta-sheet");if(o.cls)c.classList.add(o.cls);c.setAttribute("aria-hidden","true");c.removeAttribute("id");
  [].forEach.call(c.querySelectorAll("[id]"),function(e){if(e.tagName!=="filter"&&e.tagName!=="linearGradient"&&e.tagName!=="pattern")e.removeAttribute("id")});
  var cs=getComputedStyle(pin),ex=Math.max(0,G.Y1-pin.offsetTop-pin.offsetHeight),x=3.5,pl=parseFloat(cs.paddingLeft),pr=parseFloat(cs.paddingRight),cw=pin.offsetWidth-pl-pr,npl=pin.offsetLeft+pl-x,npr=(G.W-2*x)-npl-cw;
  c.style.cssText=(c.getAttribute("style")||"")+";position:absolute;margin:0;left:"+x+"px;top:0;width:"+(G.W-2*x)+"px;height:"+(pin.offsetHeight+ex)+"px;box-sizing:border-box;padding:"+cs.paddingTop+" "+npr+"px "+(parseFloat(cs.paddingBottom)+ex)+"px "+npl+"px;z-index:"+(o.z||5)+";pointer-events:none";
  c.style.setProperty("clip-path",o.clip||"inset("+G.Y0+"px 0 0 0)");
  if(o.bg!==false){c.style.setProperty("background-color","#f8f0d9","important");if(G.grain){c.style.setProperty("background-image",'url("'+G.grain.replace(/"/g,"%22")+'")',"important");
   c.style.setProperty("background-size","200px 200px","important");c.style.setProperty("background-position",-x+"px 0","important");c.style.setProperty("background-repeat","repeat","important")}}
  if(o.edge){var e=d.createElement("i");e.className="ta-edge";e.style.top=G.Y0+"px";c.appendChild(e)}
  cd.appendChild(c);return c}
 function el(cd,cls,css){var e=d.createElement("i");e.className=cls;e.setAttribute("aria-hidden","true");if(css)e.style.cssText=css;cd.appendChild(e);return e}
 function A(e,k,o){var a=e.animate(k,o);run.anims.push(a);return a}
 function end(){if(!run)return;var r=run;run=null;r.anims.forEach(function(a){try{a.cancel()}catch(e){}});r.els.forEach(function(e){e.remove()});r.cd.classList.remove("ta-hide","ta-go")}
 window.__taEnd=end;

 d.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("#learn .pt-tb [data-pt]");if(!b||RM||b.getAttribute("aria-pressed")==="true")return;
  var cd=b.closest(".pt-cd");if(!cd)return;end();fast=true;var G=geo(cd);run={cd:cd,anims:[],els:[],G:G,b:b,t0:performance.now()};
  var old=sheet(cd,G,{cls:"ta-old",z:5,edge:true});run.els.push(old);run.old=old;cd.classList.add("ta-hide");
  var body=cd.querySelector(":scope>.pt-in:not(.ta-sheet) .pt-body"),me=run,mo=new MutationObserver(function(){mo.disconnect();
   requestAnimationFrame(function(){requestAnimationFrame(function(){if(run!==me)return;try{TAKES[T](cd,G,old,b)}catch(err){console.error(err);end();return}
    window.__taAnims=run.anims.slice();window.__taReady=performance.now();
    Promise.all(run.anims.map(function(a){return a.finished})).then(function(){if(run===me)end()},function(){})})})});
  mo.observe(body,{childList:true})},true);
 d.addEventListener("click",function(){fast=false},false);

 /* the tab's x, y in the card */
 function tabBox(cd,b){var C=cd.getBoundingClientRect(),r=b.getBoundingClientRect();return {x0:r.left-C.left,x1:r.right-C.left,y0:r.top-C.top,y1:r.bottom-C.top}}

 var TAKES={
 /* T1 tear-off: the old page tears away along the perforation under the green strip: a tug, the tear runs from left to right (the
    left end drops first), then the sheet falls out of the card with its hard shadow; a torn fringe stays on the line and fades. 640ms */
 T1:function(cd,G,old,b){var D=600,Ws=G.W-7,Hs=G.Y1-G.Y0,R=rnd(7),top=[],bot=[];
  for(var x=0;x<=Ws+.1;x+=2.5){var j=(R()-.5)*1.6,h=(x%5<1)?1.6:0;top.push([x,G.Y0+1.2+j+h])}
  var poly="polygon("+top.map(function(p){return p[0].toFixed(1)+"px "+p[1].toFixed(1)+"px"}).join(",")+","+Ws+"px "+G.Y1+"px,0px "+G.Y1+"px)";
  old.style.setProperty("clip-path",poly);
  var fr=el(cd,"ta-fringe","left:3.5px;top:"+G.Y0+"px;width:"+Ws+"px;height:5px;clip-path:polygon(0 0,"+Ws+"px 0,"+top.slice().reverse().map(function(p){return p[0].toFixed(1)+"px "+(p[1]-G.Y0).toFixed(1)+"px"}).join(",")+")");run.els.push(fr);
  var sh=el(cd,"ta-shade","left:3.5px;top:0;width:"+Ws+"px;height:"+G.Y1+"px;clip-path:"+poly+";translate:3px 6px");run.els.push(sh);
  var perf=el(cd,"ta-perf","left:3.5px;top:"+(G.Y0+2)+"px;width:"+Ws+"px");run.els.push(perf);
  cd.classList.remove("ta-hide");
  var mv=[{transform:"none",offset:0,easing:"cubic-bezier(.3,0,.5,1)"},{transform:"translateY(3px)",offset:.13,easing:"cubic-bezier(.4,0,.6,1)"},
   {transform:"translateY(5px) rotate(-5deg)",offset:.36,easing:"cubic-bezier(.55,0,.9,.55)"},{transform:"translate(-34px,"+Math.round(Hs*1.35)+"px) rotate(-18deg)",offset:1}];
  var o={duration:D,fill:"both"};
  [old,sh].forEach(function(e){e.style.transformOrigin="100% "+G.Y0+"px"});
  A(old,mv,o);A(old,[{opacity:1},{opacity:1,offset:.8},{opacity:0}],o);
  A(sh,mv,o);A(sh,[{opacity:0},{opacity:.85,offset:.3},{opacity:.85,offset:.8},{opacity:0}],o);
  A(old.querySelector(".ta-edge"),[{opacity:0},{opacity:1,offset:.15},{opacity:1}],o);
  A(perf,[{opacity:0,transform:"scaleY(.6)"},{opacity:1,transform:"scaleY(1.4)",offset:.13},{opacity:0,offset:.3},{opacity:0}],o);
  A(fr,[{opacity:0},{opacity:0,offset:.2},{opacity:1,offset:.32},{opacity:1,offset:.6},{opacity:0}],o);
  A(b,[{transform:"none"},{transform:"translateY(2px)",offset:.13},{transform:"none",offset:.4},{transform:"none"}],o)},

 /* T2 stamped: a stamp block comes down over the page (its shadow sharpening), strikes: the card gives, the new view is inked from the
    middle out, a faint second strike settles, the block lifts. The tab is struck too. 560ms */
 T2:function(cd,G,old,b){var D=520,I=.27,Hs=G.Y1-G.Y0;
  var nw=sheet(cd,G,{cls:"ta-new",z:6,bg:false}),ds=sheet(cd,G,{cls:"ta-ds",z:7,bg:false});run.els.push(nw,ds);ds.style.translate="1.6px -1.3px";
  var blk=el(cd,"ta-block","left:"+(G.W*.16)+"px;top:"+(G.Y0+Hs*.14)+"px;width:"+(G.W*.68)+"px;height:"+(Hs*.56)+"px");run.els.push(blk);
  /* the ink: a wobbly blot growing from the middle (clip-path path(), the same commands at every size, so it interpolates); no paper on
     the new sheet, the stamp lifts off a clean page */
  var o={duration:D,fill:"both"},cx=G.W/2-3.5,cy=G.Y0+Hs*.42,Rr=rnd(4),N=64,ph=[Rr()*6.3,Rr()*6.3,Rr()*6.3],rad=[];
  for(var i=0;i<N;i++){var a=i/N*6.2832;rad.push(1+.05*Math.sin(3*a+ph[0])+.035*Math.sin(7*a+ph[1])+.025*Math.sin(13*a+ph[2])+(Rr()-.5)*.03)}
  var ms=function(R){return {clipPath:'path("M'+rad.map(function(r,i){var a=i/N*6.2832;return (cx+R*r*Math.cos(a)).toFixed(1)+" "+(cy+R*r*Math.sin(a)).toFixed(1)}).join(" L")+'Z")'}};
  A(old,[{opacity:1},{opacity:1,offset:I},{opacity:0,offset:I+.08},{opacity:0}],o);
  A(blk,[{opacity:0,transform:"translate(22px,30px) scale(1.25)",easing:"cubic-bezier(.55,0,1,.6)"},{opacity:.62,transform:"translate(3px,4px) scale(1)",offset:I},
   {opacity:.62,transform:"translate(3px,4px) scale(1)",offset:I+.05,easing:"cubic-bezier(0,0,.3,1)"},{opacity:0,transform:"translate(18px,26px) scale(1.2)",offset:.6},{opacity:0,transform:"none"}],o);
  var k0=ms(0),k1=ms(34),k2=ms(Math.hypot(G.W,Hs)*.62);
  [nw,ds].forEach(function(e){A(e,[k0,Object.assign({offset:I},k0),Object.assign({offset:I+.001,easing:"cubic-bezier(.15,.7,.3,1)"},k1),Object.assign({offset:.62},k2),k2],o)});
  A(ds,[{opacity:0},{opacity:0,offset:I},{opacity:.34,offset:I+.04,easing:"cubic-bezier(.3,0,.2,1)"},{opacity:0,translate:"0px 0px"}],o);
  A(cd,[{transform:"none"},{transform:"none",offset:I-.02,easing:"cubic-bezier(.3,0,.2,1)"},{transform:"translateY(1.6px) scale(.993)",offset:I+.03,easing:"cubic-bezier(.3,0,.3,1.4)"},{transform:"none",offset:.5},{transform:"none"}],o);
  A(b,[{transform:"none"},{transform:"none",offset:I-.05},{transform:"scale(.84)",offset:I+.02,easing:"cubic-bezier(.3,0,.3,1.6)"},{transform:"none",offset:.55},{transform:"none"}],o)},

 /* T3 conductor's punch, then the gate: a punch bites a hole in the tapped tab and the chad drops out of the card; the new page is fed
    through like a ticket through a gate (in from the right, the old one pushed out left, a little judder as the rollers grip). The
    hole stays on the open tab. 660ms */
 T3:function(cd,G,old,b){var D=620,Ws=G.W-7,tb=tabBox(cd,b),hx=tb.x1-11,hy=12;
  [].forEach.call(cd.querySelectorAll(".ta-hole"),function(h){var a=h.animate([{opacity:1},{opacity:0}],{duration:160,fill:"forwards"});a.onfinish=function(){h.remove()}});
  var hole=el(cd,"ta-hole","left:"+(hx-3.5)+"px;top:"+(hy-3.5)+"px");/* stays */
  var die=el(cd,"ta-die","left:"+(hx-9)+"px;top:"+(hy-9)+"px"),chad=el(cd,"ta-chad","left:"+(hx-4.5)+"px;top:"+(hy-4.5)+"px");run.els.push(die,chad);
  var nw=sheet(cd,G,{cls:"ta-new",z:6,edge:true});run.els.push(nw);var ne=el(nw,"ta-lead","top:"+G.Y0+"px");
  var P=.16,o={duration:D,fill:"both"},E="cubic-bezier(.65,0,.25,1)";
  A(die,[{opacity:0,transform:"scale(1.7)",easing:"cubic-bezier(.5,0,1,1)"},{opacity:.55,transform:"scale(1)",offset:P},{opacity:0,transform:"scale(1.3)",offset:P+.1},{opacity:0}],o);
  A(hole,[{transform:"scale(0)"},{transform:"scale(0)",offset:P-.01},{transform:"scale(1.15)",offset:P+.02},{transform:"scale(1)",offset:P+.08},{transform:"scale(1)"}],o);
  A(chad,[{opacity:0,transform:"none"},{opacity:0,offset:P-.01},{opacity:1,transform:"none",offset:P,easing:"cubic-bezier(.45,0,.9,.6)"},
   {opacity:1,transform:"translate(9px,140px) rotate(300deg) scaleY(-.4)",offset:.78},{opacity:0,transform:"translate(11px,200px) rotate(420deg) scaleY(.8)"}],o);
  A(cd,[{transform:"none"},{transform:"none",offset:P-.02},{transform:"translateY(1.4px)",offset:P+.01},{transform:"none",offset:P+.08},{transform:"none"}],o);
  var S=P+.03,F=.84,mid=Ws*.58;
  A(old,[{transform:"none",clipPath:"inset("+G.Y0+"px 0 0 0)"},{transform:"none",clipPath:"inset("+G.Y0+"px 0 0 0)",offset:S,easing:E},
   {transform:"translateX(-"+Ws+"px)",clipPath:"inset("+G.Y0+"px 0 0 "+Ws+"px)",offset:F},{transform:"translateX(-"+Ws+"px)",clipPath:"inset("+G.Y0+"px 0 0 "+Ws+"px)"}],o);
  A(nw,[{transform:"translateX("+Ws+"px)",clipPath:"inset("+G.Y0+"px "+Ws+"px 0 0)"},{transform:"translateX("+Ws+"px)",clipPath:"inset("+G.Y0+"px "+Ws+"px 0 0)",offset:S,easing:E},
   {transform:"none",clipPath:"inset("+G.Y0+"px 0px 0 0)",offset:F},{transform:"none",clipPath:"inset("+G.Y0+"px 0px 0 0)"}],o);
  A(nw,[{translate:"0 0"},{translate:"0 0",offset:S+.18},{translate:"0 -1.2px",offset:S+.24},{translate:"0 .8px",offset:S+.32},{translate:"0 0",offset:S+.4},{translate:"0 0"}],{duration:D,fill:"both",composite:"replace"});
  A(b,[{transform:"none"},{transform:"none",offset:P-.03},{transform:"translateY(1.5px) scale(.96)",offset:P+.01},{transform:"none",offset:P+.12},{transform:"none"}],o)},

 /* T4 the roller: a green ink roller (a brayer, wider than the card) rolls down the page, printing the new view behind it with a
    sheen of wet ink; the old view smears into streaks just ahead of it and is gone where it passed. 640ms */
 T4:function(cd,G,old,b){var D=580,Hs=G.Y1-G.Y0,F=.86,E="cubic-bezier(.45,.05,.3,1)";
  cd.classList.remove("ta-hide");
  var rl=el(cd,"ta-roll","top:"+(G.Y0-11)+"px");run.els.push(rl);rl.innerHTML='<i class="wet"></i><i class="smr"></i><i class="cyl"></i><i class="ax l"></i><i class="ax r"></i>';
  var o={duration:D,fill:"both"};
  A(old,[{clipPath:"inset("+G.Y0+"px 0 0 0)",easing:E},{clipPath:"inset("+(G.Y0+Hs)+"px 0 0 0)",offset:F},{clipPath:"inset("+(G.Y0+Hs)+"px 0 0 0)"}],o);
  A(rl,[{transform:"translateY(-6px) scale(.97)",opacity:0},{transform:"translateY(0px)",opacity:1,offset:.06,easing:E},{transform:"translateY("+Hs+"px)",opacity:1,offset:F},{transform:"translateY("+(Hs+8)+"px) scale(.96)",opacity:0}],o);
  A(rl.querySelector(".cyl"),[{backgroundPosition:"0 0"},{backgroundPosition:"0 "+(-Hs)+"px",offset:F},{backgroundPosition:"0 "+(-Hs)+"px"}],o);
  A(b,[{transform:"none"},{transform:"translateY(2px)",offset:.08},{transform:"none",offset:.22},{transform:"none"}],o)},

 /* T5 shuffle the stack: the four views are four tickets in a stack; the tapped one slides out from behind to the right, tilted, then
    is laid on top with a hard shadow that shrinks as it settles; the old one gives way under it. The tab lifts. 620ms */
 T5:function(cd,G,old,b){var D=620,Ws=G.W-7,Z=.38;
  var sh=el(cd,"ta-shade2","left:3.5px;top:0;width:"+Ws+"px;height:"+G.Y1+"px;clip-path:inset("+G.Y0+"px 0 0 0);translate:5px 7px"),nw=sheet(cd,G,{cls:"ta-new",z:0,edge:true});
  var und=el(cd,"ta-under","left:3.5px;top:0;width:"+Ws+"px;height:"+G.Y1+"px;clip-path:inset("+G.Y0+"px 0 0 0)");run.els.push(nw,sh,und);
  var dk=el(old,"ta-dark","top:"+G.Y0+"px");
  [nw,sh,old,und].forEach(function(e){e.style.transformOrigin="50% "+G.Y1+"px"});
  var o={duration:D,fill:"both"},mv=[{transform:"none",easing:"cubic-bezier(.3,0,.2,1)"},{transform:"translate("+Math.round(Ws*.62)+"px,-4px) rotate(5deg)",offset:Z,easing:"cubic-bezier(.45,0,.15,1)"},
   {transform:"translate(-3px,2px) rotate(-1.4deg)",offset:.84,easing:"cubic-bezier(.3,0,.3,1)"},{transform:"none"}];
  A(nw,mv,o);A(sh,mv,o);
  A(nw,[{zIndex:0},{zIndex:0,offset:Z},{zIndex:8,offset:Z+.001},{zIndex:8}],o);A(sh,[{zIndex:0},{zIndex:0,offset:Z},{zIndex:7,offset:Z+.001},{zIndex:7}],o);
  A(sh,[{opacity:0},{opacity:.9,offset:.25},{opacity:.9,offset:.7},{opacity:0}],o);
  A(old,[{transform:"none",easing:"cubic-bezier(.3,0,.2,1)"},{transform:"translate(-7px,3px) rotate(-1.6deg)",offset:Z,easing:"cubic-bezier(.4,0,.2,1)"},{transform:"translate(-2px,1px) rotate(-.4deg)",offset:.84},{transform:"none"}],o);
  A(dk,[{opacity:0},{opacity:0,offset:Z},{opacity:1,offset:.8},{opacity:1}],o);
  A(old.querySelector(".ta-edge"),[{opacity:0},{opacity:1,offset:.1},{opacity:1}],o);
  A(und,[{opacity:0,transform:"none"},{opacity:1,transform:"translate(-11px,5px) rotate(-3deg)",offset:Z},{opacity:1,transform:"translate(-4px,2px) rotate(-1deg)",offset:.84},{opacity:0,transform:"none"}],o);
  A(b,[{transform:"none"},{transform:"translateY(-3px)",offset:.25,easing:"cubic-bezier(.3,0,.3,1)"},{transform:"none",offset:.7},{transform:"none"}],o)}
 };
})();
