/* PB · the pill as a small stub of the season ticket: the bet's stock, a green edge and a red edge printed on, the words pressed in the
   ink, the antenna lit when live */
(function(){var s=lvState(),c=document.querySelector("#liveChip");if(!c)return;var i=c.querySelector(":scope>i");if(i)i.remove();c.classList.add("r39-pb");c.insertAdjacentHTML("afterbegin",r39.ant(s.on,"ink pb"));
 /* the stock: the bet ticket's paper colour with its grain, read from the bet ticket */
 var pp=document.querySelector(".x2p-bt .bt-pp");if(pp){var v=getComputedStyle(pp).backgroundImage,o=[],dp=0,st=0;for(var k=0;k<v.length;k++){var ch=v[k];if(ch==="(")dp++;else if(ch===")")dp--;else if(ch===","&&!dp){o.push(v.slice(st,k).trim());st=k+1}}o.push(v.slice(st).trim());
  if(o[23])c.style.setProperty("--r39-grain",o[23])}})();
