/* PA · the pill as it is (yellow, its words), the dot replaced by the on-air antenna: printed in the ink, its lamp lit red and glowing
   only when something is live */
(function(){var s=lvState(),c=document.querySelector("#liveChip");if(!c)return;var i=c.querySelector(":scope>i");if(i)i.remove();c.classList.add("r39-pa");c.insertAdjacentHTML("afterbegin",r39.ant(s.on,"ink pa"))})();
