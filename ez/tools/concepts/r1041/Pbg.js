/* Pbg · the header pill with the bg live mark and the day in two small lines */
(function(){var q=q41,c=document.querySelector("#liveChip");if(!c)return;var i=c.querySelector(":scope>i");if(i)i.remove();var lt=c.querySelector("#liveTxt");if(lt)lt.style.display="none";
 var top=q.s.k==="due"?q.now.v:q.s.k==="bell"?q.now.v:q.s.k==="rung"?"Results soon":q.now.v,bot=q.s.k==="due"?"Today":q.s.k==="bell"?LV.left():q.s.k==="rung"?"Bell rung":q.now.s;
 c.classList.add("q41-p","q41-dkg");c.insertAdjacentHTML("beforeend",q.mark("bg",q.on)+'<span class="q41-pst"><b>'+lvE(top)+'</b><small>'+lvE(bot)+'</small></span>');c.setAttribute("aria-label",q.s.aria)})();
