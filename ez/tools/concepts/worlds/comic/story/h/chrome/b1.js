/* B1 the closing bell: the round ends on a struck brass bell; the motto rings out of it as a hand-lettered sound effect; Follow on X is a ticket stub */
(()=>{const s=CH.back('bk-bell.jpg','30% 50%');const m=CH.$('.wc-motto',s);m.classList.add('b1-sfx');CH.jig(m,{rot:9,y:5,sc:.18,seed:12});CH.$$('.ch-l',m).forEach(l=>{if(l.textContent==='E')l.classList.add('ch-e');if(l.textContent==='Z')l.classList.add('ch-z')});
 const f=CH.$('.wc-follow',s);CH.inkBox(f,{fill:'#f8f0d9',seed:19,amp:1.6})})();
