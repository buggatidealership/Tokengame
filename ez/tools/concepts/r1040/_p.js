/* r1040 pills shared: the header pill's words from the honest state, in the owner's words (predictions, resolutions); the logo's own
   slashes and gold square as SVG, cut from the traced EZ. logo (ez-logo-traced.svg) so they lean exactly as the letters do */
window.r40p=(function(){var s=lvState(),L=LV;
 var pl=function(n,w){return n+" "+w+(n===1?"":"s")};
 /* n: the big figure (none off air); top and bot: the two small lines beside it; head: the state in two words; a: one line */
 var t=s.k==="due"?{n:s.n,top:s.n===1?"Prediction":"Predictions",bot:"Today",head:["In","play"],a:pl(s.n,"prediction")}
  :s.k==="bell"?{n:s.n,top:s.n===1?"Resolution":"Resolutions",bot:L.left(),head:["In","play"],a:pl(s.n,"resolution")}
  :s.k==="rung"?{n:"",top:"Bell rung",bot:"Results soon",head:["Bell","rung"],a:"Results soon"}
  :{n:"",top:"Off air",bot:s.short,head:["Off","air"],a:s.short};
 t.stack=function(){return (t.n!==""?'<b class="r40-n">'+t.n+'</b>':"")+'<span class="r40-st"><b>'+lvE(t.top)+'</b><small>'+lvE(t.bot)+'</small></span>'};
 var SL='<svg class="r40-sl" viewBox="28 86 120 244" aria-hidden="true" focusable="false"><path fill="#03c870" d="M146.2,287.0 L133.0,287.0 L106.5,327.2 L119.0,326.5 Z M86.8,169.5 L74.8,169.5 L29.5,282.2 L43.7,282.2 Z M105.8,92.5 L89.5,95.8 L55.5,169.2 L69.0,169.2 Z"/></svg>',
     SR='<svg class="r40-sr" viewBox="250 86 114 186" aria-hidden="true" focusable="false"><path fill="#ff3a31" d="M304.5,259.0 L300.5,269.5 L313.0,268.2 L317.0,258.8 Z M361.5,126.0 L344.0,126.5 L269.5,235.8 L256.0,257.5 L276.2,257.0 Z M279.0,87.8 L266.7,87.5 L251.5,117.2 L262.2,119.0 Z"/></svg>',
     DOT='<svg class="r40-dt" viewBox="286 279 50 39" aria-hidden="true" focusable="false"><path fill="#fdbc2a" d="M334.2,281.2 L302.0,281.2 L288.2,315.8 L321.0,315.5 Z"/></svg>';
 var mount=function(cls,html){var c=document.querySelector("#liveChip");if(!c)return null;var i=c.querySelector(":scope>i");if(i)i.remove();var lt=c.querySelector("#liveTxt");if(lt)lt.style.display="none";
  c.classList.add("r40-p",cls);c.insertAdjacentHTML("beforeend",html);c.setAttribute("aria-label",s.aria);return c};
 return {s:s,t:t,SL:SL,SR:SR,DOT:DOT,mount:mount}})();
