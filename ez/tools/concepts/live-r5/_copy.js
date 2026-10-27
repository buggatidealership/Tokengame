/* headline copy, in today's type (fitted to two lines). AIs keeps its lowercase s (.x2p-lc). */
const A='AI<span class="x2p-lc">s</span>';
module.exports={
  C0:{html:'We’re putting buybacks<br> <span class="hl">in the hands of an AI.</span>'},
  C1:{html:'4 '+A+' fight over earnings.<br> <span class="hl">The winner calls the buyback.</span>'},
  C2:{html:'Buybacks, called by<br> <span class="hl">the AI with the best record.</span>'},
  C3:{html:'4 '+A+' vs. the market.<br> <span class="hl">Best record calls the buyback.</span>'},
  C4:{html:'Every week, 4 '+A+' call earnings.<br> <span class="hl">The best one bets our pool.</span>'},
  C5:{html:'Not a one-day coin.<br> <span class="hl">A season of AI calls.</span>'},
  /* r1028 (owner, 2026-10-27 night): C1 again, and "4 AIs call earnings. The best one bets our pool."; K = the same in the logo's lettering (logo-page Light) */
  C6:{html:'4 '+A+' call earnings.<br> <span class="hl">The best one bets our pool.</span>'}};
const LC=require('fs').readFileSync(__dirname+'/../logo-page/light.css','utf8').split('\n').filter(l=>/\.hero h1/.test(l)).join('\n');
module.exports.K1={html:module.exports.C1.html,css:LC,fonts:'family=Kanit:ital,wght@1,900',nofit:1};
module.exports.K6={html:module.exports.C6.html,css:LC,fonts:'family=Kanit:ital,wght@1,900',nofit:1};
/* r1028, round 2 (owner, 2026-10-27 night: two lines at most, one sentence, "I don't like two dots at the top"): D in today's type, E the same
   in the logo's lettering, both fitted to two lines */
(function(){const A='AI<span class="x2p-lc">s</span>',X=module.exports,
 D={D1:'4 '+A+' call earnings,<br> <span class="hl">the best one bets our pool.</span>',
    D2:'4 '+A+' fight over earnings<br> <span class="hl">for the right to bet our pool.</span>',
    D3:'4 '+A+' trade earnings<br> <span class="hl">for the right to bet our pool.</span>',
    D4:'Our pool rides on the AI<br> <span class="hl">that calls earnings best.</span>',
    D5:'The AI with the best record<br> <span class="hl">bets our pool.</span>'};
 for(const k in D){X[k]={html:D[k]};X['E'+k.slice(1)]={html:D[k],css:X.K1.css,fonts:'family=Kanit:ital,wght@1,900'}}})();
