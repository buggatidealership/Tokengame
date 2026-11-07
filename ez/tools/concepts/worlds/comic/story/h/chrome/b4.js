/* B4 the last panel: a rooftop at sunset, the city lights coming on; the motto lettered big into the sky; Follow on X is the closing caption */
(()=>{const s=CH.back('bk-sunset.jpg','50% 50%');const m=CH.$('.wc-motto',s);m.classList.add('b4-sky');CH.jig(m,{rot:6,y:4,sc:.16,seed:44});CH.$$('.ch-l',m).forEach(l=>{if(l.textContent==='E')l.classList.add('ch-e');if(l.textContent==='Z')l.classList.add('ch-z')});
 const f=CH.$('.wc-follow',s);CH.inkBox(f,{fill:'#fdbc2a',seed:47,amp:1.4})})();
