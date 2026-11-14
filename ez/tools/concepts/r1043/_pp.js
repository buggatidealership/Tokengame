/* r1043 pills: "In play: <ticker>" as the page sets it (the next card: the first round with calls in, soonest to resolve; else the next
   round to be called), in the EZ. logo's art: its slashes and gold square are cut from the traced logo, its type the heavy italic */
window.q43p=(function(){var c=document.querySelector("#liveChip"),lt=c&&c.querySelector("#liveTxt"),txt=lt?lt.textContent:"",tk=txt.replace(/^.*?:\s*/,"");
 var SL='<svg class="q43p-sl" viewBox="28 86 120 244" aria-hidden="true"><path fill="#03c870" d="M146.2,287.0 L133.0,287.0 L106.5,327.2 L119.0,326.5 Z M86.8,169.5 L74.8,169.5 L29.5,282.2 L43.7,282.2 Z M105.8,92.5 L89.5,95.8 L55.5,169.2 L69.0,169.2 Z"/></svg>',
     SR='<svg class="q43p-sr" viewBox="250 86 114 186" aria-hidden="true"><path fill="#ff3a31" d="M304.5,259.0 L300.5,269.5 L313.0,268.2 L317.0,258.8 Z M361.5,126.0 L344.0,126.5 L269.5,235.8 L256.0,257.5 L276.2,257.0 Z M279.0,87.8 L266.7,87.5 L251.5,117.2 L262.2,119.0 Z"/></svg>',
     DOT='<svg class="q43p-dt" viewBox="286 279 50 39" aria-hidden="true"><path fill="#fdbc2a" d="M334.2,281.2 L302.0,281.2 L288.2,315.8 L321.0,315.5 Z"/></svg>';
 var mount=function(cls,html){if(!c)return;var i=c.querySelector(":scope>i");if(i)i.remove();if(lt)lt.style.display="none";c.classList.add("q43p",cls);c.insertAdjacentHTML("beforeend",html);c.setAttribute("aria-label",txt)};
 return {tk:tk,SL:SL,SR:SR,DOT:DOT,mount:mount}})();
