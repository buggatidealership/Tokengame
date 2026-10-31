/* EZ Live X5+ (owner, 2026-10-29): the comic in the header's dark colours. Two editions, Night (the X3+ comic on black stock)
   and Noir (heavy blacks, rim light, spot colour only in the logo's gold, green and red). ?ed=night / ?ed=noir picks one,
   the masthead switch flips it, the choice is kept (localStorage ez-ed). Runs after world-comic.js. */
(function(){
  var d=document,H=d.documentElement,K="ez-ed",ED=["night","noir"];
  var q=(location.search.match(/[?&]ed=(night|noir)\b/)||[])[1],ed=q;
  if(!ed){try{ed=localStorage.getItem(K)}catch(e){}}
  if(ED.indexOf(ed)<0)ed="night";
  function set(e){
    ed=e;H.classList.add("cd-on");H.classList.toggle("cd-night",e==="night");H.classList.toggle("cd-noir",e==="noir");
    try{localStorage.setItem(K,e)}catch(x){}
    var b=d.querySelector(".cd-sw");if(b){b.querySelector("b").textContent=e==="night"?"Night":"Noir";
      b.setAttribute("aria-label","Edition: "+(e==="night"?"Night":"Noir")+". Switch to "+(e==="night"?"Noir":"Night"));}
    var m=d.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content","#04070e");
  }
  set(ed);
  /* Noir's lettering: a condensed poster face for the heads, a typewriter for the narration */
  if(!d.getElementById("cd-fonts")){var fl=d.createElement("link");fl.id="cd-fonts";fl.rel="stylesheet";
    fl.href="https://fonts.googleapis.com/css2?family=Special+Elite&family=Bebas+Neue&family=Oswald:wght@600&display=swap";d.head.appendChild(fl);}
  function sw(){
    if(d.querySelector(".cd-sw"))return true;
    var at=d.querySelector(".x2p-xhd")||d.getElementById("liveChip");if(!at)return false;
    var b=d.createElement("button");b.type="button";b.className="cd-sw";b.innerHTML='<i aria-hidden="true"></i><b></b>';
    b.addEventListener("click",function(){set(ed==="night"?"noir":"night")});
    at.after(b);set(ed);return true;
  }
  if(!sw()){var n=0,t=setInterval(function(){if(sw()||++n>80)clearInterval(t)},150)}
  window.__x5Ed=function(e){if(ED.indexOf(e)>=0)set(e)};
})();
