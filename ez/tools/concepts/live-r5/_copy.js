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
/* r1028c (owner, 2026-10-27, night: "combine 4 AIs trade earnings and... the number one leader does the buybacks"; a new viewer does not
   know what "the pool" is): one sentence, two lines at most, today's type */
(function(){const A='AI<span class="x2p-lc">s</span>',X=module.exports;
 Object.assign(X,{G1:{html:'4 '+A+' trade earnings<br> <span class="hl">for the right to run our buybacks.</span>'},
  G2:{html:'4 '+A+' trade earnings,<br> <span class="hl">the top one calls our buyback bet.</span>'},
  G3:{html:'4 '+A+' trade earnings,<br> <span class="hl">the winner calls our buybacks.</span>'},
  G4:{html:'4 '+A+' trade earnings<br> <span class="hl">to win control of our buybacks.</span>'},
  G5:{html:'4 '+A+' trade earnings,<br> <span class="hl">and the best one runs our buybacks.</span>'}})})();
/* r1028d (owner, 2026-10-27, night: "4 AIs trade earnings for the right to run our buybacks... not on 2 lines... make some plays on the
   colors... the font of that section more aligned with our EZ logo on the top left"): one sentence that wraps where it wraps, in the logo's
   heavy italic (Kanit 900, capitals), at one size; colour plays in the logo's own cream, green, red and gold; the logo's gold square as the
   full stop. The page's own fitter is left behind (fresh h1). */
(function(){const X=module.exports,AI='AI<span style="text-transform:none">s</span>',DOT='<i class="kd"></i>';
 const base='html.x2p.x2d[data-theme] body .hero h1.lvh.lvh{font-family:Kanit,sans-serif!important;font-style:italic!important;font-weight:900!important;text-transform:uppercase;letter-spacing:-.012em!important;line-height:1!important;font-size:clamp(30px,8.6vw,64px)!important;color:#f8f0d9!important;text-shadow:none!important;white-space:normal!important;text-wrap:balance;margin:0}'+
  'html.x2p.x2d[data-theme] body .hero h1.lvh.lvh .kd{display:inline-block;width:.2em;height:.2em;background:#fdbc2a;transform:skewX(-14deg);margin-left:.04em}html.x2p.x2d[data-theme] body .hero h1.lvh.lvh .g{color:#03c870}html.x2p.x2d[data-theme] body .hero h1.lvh.lvh .r{color:#ff3a31}html.x2p.x2d[data-theme] body .hero h1.lvh.lvh .y{color:#fdbc2a}'+
  'html.x2p.x2d[data-theme] body .hero h1.lvh.lvh .sl{display:inline-block;width:.11em;height:.72em;margin:0 .1em -.02em 0;transform:skewX(-22deg);vertical-align:baseline}';
 const F='family=Kanit:ital,wght@1,900';
 Object.assign(X,{
  K1:{fresh:1,nofit:1,fonts:F,css:base,html:'4 '+AI+' trade earnings for the right to run our <span class="y">buybacks</span>'+DOT},
  K2:{fresh:1,nofit:1,fonts:F,css:base,html:'4 '+AI+' <span class="g">trade earnings</span> for the right to run our <span class="y">buybacks</span>'+DOT},
  K3:{fresh:1,nofit:1,fonts:F,css:base,html:'<span class="sl" style="background:#03c870"></span>4 '+AI+' trade <span class="g">E</span>arnings for the right to run our <span class="y">buybacks</span>'+DOT},
  K4:{fresh:1,nofit:1,fonts:F,css:base,html:'4 '+AI+' trade earnings for <span class="g">the right</span> to run our <span class="y">buybacks</span>'+DOT+'<span class="sl" style="background:#ff3a31;margin-left:.12em"></span>'}})})();
/* r1028e (owner, 2026-10-27, night: two lines at most; the highlighted words keep green and gold but get "that little edge" of the logo's E,
   whose green sliver on its left makes it look 3D): the logo's lettering, fitted to two lines. M1/M2 the full sentence, M3 a shorter one. */
(function(){const X=module.exports,AI='AI<span style="text-transform:none">s</span>',DOT='<i class="kd"></i>',F='family=Kanit:ital,wght@1,900';
 const S='html.x2p.x2d[data-theme] body .hero h1.lvh.lvh';
 const base=S+'{font-family:Kanit,sans-serif!important;font-style:italic!important;font-weight:900!important;text-transform:uppercase;letter-spacing:-.012em!important;line-height:1.02!important;font-size:clamp(36px,6.2vw,76px)!important;color:#f8f0d9!important;text-shadow:none!important;margin:0}'+
  S+' .kd{display:inline-block;width:.2em;height:.2em;background:#fdbc2a;transform:skewX(-14deg);margin-left:.04em;box-shadow:-.07em .02em 0 #03c870}'+
  /* the edge: a sliver of a second colour set behind the letters, offset to one side, as on the logo's E */
  S+' .eg{color:#03c870;text-shadow:.07em .025em 0 #ff3a31}'+S+' .ey{color:#fdbc2a;text-shadow:-.07em .025em 0 #03c870}'+
  S+' .eg2{color:#03c870;text-shadow:-.07em .025em 0 #f8f0d9}'+S+' .ey2{color:#fdbc2a;text-shadow:-.07em .025em 0 #03c870}';
 Object.assign(X,{
  M1:{fresh:1,fonts:F,css:base,html:'4 '+AI+' <span class="eg">trade earnings</span> for the right<br>to run our <span class="ey">buybacks</span>'+DOT},
  M2:{fresh:1,fonts:F,css:base,html:'4 '+AI+' <span class="eg2">trade earnings</span> for the right<br>to run our <span class="ey2">buybacks</span>'+DOT},
  M3:{fresh:1,fonts:F,css:base,html:'4 '+AI+' <span class="eg">trade earnings</span><br>to run our <span class="ey">buybacks</span>'+DOT}})})();
