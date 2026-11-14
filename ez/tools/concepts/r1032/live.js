/* r1032 (owner, 2026-10-27, night: the live site's "Getting smarter or just lucky?" fits one phone screen; "take whatever we have exactly
   on the live website, but... the data from EZ Live X2+"): on X2+ the live site's paper ticket (x2pProof, still built under R1028's L2
   proof and R1030's P2) is shown again in place of P2, with X2+'s words: "Top W" / "Top L" for "Biggest W" / "Biggest L". */
(function(){var d=document,st=d.createElement('style');
 st.textContent='html.x2p-rz #learn .x2p-pt{display:block!important}html.x2p-rz #learn .rz-pw{display:none!important}';d.head.appendChild(st);
 function words(){[].slice.call(d.querySelectorAll('#learn .x2p-pt .pt-hd span')).forEach(function(s){if(/^Biggest/.test(s.textContent))s.firstChild.nodeValue='Top '})}
 words();new MutationObserver(words).observe(d.querySelector('#learn .x2p-pt'),{childList:true,subtree:true});
 dispatchEvent(new Event('resize'))})();
