/* E: one key word per head in the hero's colours (green with a red edge, gold with a green edge), as "trade earnings" and "buybacks" */
(function(){var K={'#record':['RECEIPTS','g'],'#standings':['STANDINGS','y'],'#learn':['LUCKY?','g'],'#highlights':['MVPS','y'],'#x2pSt':['MANY','g']};
 Object.keys(K).forEach(function(s){var ws=document.querySelectorAll(s+' .sh h2 .h45-w');[].forEach.call(ws,function(w){if(w.textContent.toUpperCase().replace(/[,.]$/,'')===K[s][0])w.classList.add('h45-k'+K[s][1])})})})();
