/* P4b · The week on the card, on air: live-r1's P4 strip; today's stub carries the dot (red while live, amber after the
   bell, none off air) and the strip's head says what is on now. The header pill (option F) points at it. */
(function(){var s=lvState(),d=document.querySelector(".lv-wk");if(!d)return;
  var t=d.querySelector(".lv-wk-t");if(t){t.classList.add("lv-"+s.k);t.querySelector("small").insertAdjacentHTML("afterbegin",'<i class="lv-dot"></i>')}
  var h=d.querySelector(".lv-wk-h span");h.innerHTML={bell:'<i class="lv-dot"></i>Live · '+s.n+' at the bell · '+LV.left(),due:'<i class="lv-dot"></i>Live · '+s.n+' calls due today',
    rung:'<i class="lv-dot"></i>Bell rung · results soon',off:'Off air · back '+lvE(LV.nextLabel)}[s.k];h.parentNode.classList.add("lv-"+s.k);
  var p=document.querySelector(".lv-pill");if(p)p.setAttribute("href","#lvwk");d.id="lvwk"})();
