/* M2 (as E): one key word per head in the hero's colours (as the hero has them today: green with a red edge, red with a green edge), as "trade earnings" and "buybacks" */
(function(){var K={'#record':['RECEIPTS','r'],'#standings':['STANDINGS','g'],'#learn':['LUCKY?','r'],'#highlights':['MVPS','g'],'#x2pSt':['MANY','g']};
 Object.keys(K).forEach(function(s){var ws=document.querySelectorAll(s+' .sh h2 .h45-w');[].forEach.call(ws,function(w){if(w.textContent.toUpperCase().replace(/[,.]$/,'')===K[s][0])w.classList.add('h45-k'+K[s][1])})})})();
