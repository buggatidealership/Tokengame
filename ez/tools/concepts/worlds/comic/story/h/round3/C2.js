/* take C2 (owner, 2026-11-02, on round3): C's rows (the sentence beside its picture) with B's lettering and colours: the gold caption box, the red
   number, the CALL / CLOSE / LEDGER / BOARD kicker, long green and short red. No example line under the sentence: the picture shows it (each fact
   once); the room it freed goes to the picture. One row under the other at every width. */
R3start(function(R3){const {D,b2,KEYS,FR,VERB,sayHTML}=R3;b2.classList.add('r3-C2');b2.querySelector('.t4-frs').classList.add('r3');
KEYS.forEach((k,i)=>{const c=D.createElement('div');c.className='r3c2-cap';c.innerHTML=`<small>${VERB[k]}</small><span class="r3-tab">${i+1}</span>${sayHTML(k)}`;FR[k].prepend(c)});
R3.done();});
