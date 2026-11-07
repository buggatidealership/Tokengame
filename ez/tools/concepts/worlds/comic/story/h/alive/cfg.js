// Per effect: what it says (the fact it carries), where to film it, how long.
// center: the element centred in the recorded strip; h: strip height (CSS px); from: scroll in from this far below;
// cx/cw: a narrower crop (zoomed up to 780 px wide in the mp4); dsf: device pixel ratio; act: clicks at time t.
module.exports={
 e1:{name:'Last 5, stamped in',fact:'each graded round lands on the card as a stamp, oldest to newest',center:'.pp1-r1 .pp1-cap',h:420,from:-480,go:1.3,dur:4.4,still:3.6},
 e2:{name:'The golden ticket catches the light',fact:'#1 holds the golden ticket: a glint runs down its stub every 11 s',center:'.pp1-r1',h:500,dur:4.2,still:1.75},
 e3:{name:'The flag ripples',fact:'where each lab is from, alive: a fold of light runs across the patch',center:'.pp1-r1 .fb-patch',h:150,cx:40,cw:195,dsf:4,dur:4,still:1.2},
 e4:{name:'The page corner lifts',fact:'end of the page: the next one is there to turn',center:'.wc-chars .pp1-c:last-of-type',dy:200,h:300,cx:195,cw:195,dsf:4,from:-420,go:1.2,dur:4.4,still:3.8},
 e5:{name:'The newest result, freshly printed',fact:'round 80 just graded: its move inks onto the stub the first time you see it',center:'.wc-bis a.hr-tile',h:300,from:-700,go:1.2,cx:0,cw:260,dsf:3,dur:3.6,still:1.6},
 e6:{name:'Cinemagraph on a film tile',fact:'this round has a film: its tile keeps quietly moving',center:'.wc-bis a.hr-tile:nth-child(3)',h:250,cx:225,cw:165,dsf:4,dur:5,still:2},
 e7:{name:'The caption pops in at the cut',fact:'the narrator cuts to the next scene ("Meanwhile...")',center:'.wc-beat',h:300,from:-480,go:1.0,dur:3,still:2},
 e8:{name:'A coin in the vault glints',fact:'the gold in the vault is the pool',center:'.hb-open',dy:30,h:200,cx:60,cw:260,dsf:3,dur:4,still:1.65},
 e9:{name:'The switch, not yet thrown',fact:'right or wrong is still open: K1 lamps glow in turn',center:'.hb4-a',h:260,dur:5,still:1.2},
 e10:{name:'The challenger chases (gated)',fact:'speed lines toward the ticket, only while the challenger made more than the leader over 7 days (off today: Grok +$111.2K, Claude +$59.6K)',pre:'window.__alForceChase=true',hash:'#/leaderboard',center:'.wc11c-ring',h:300,dur:4,still:0.9},
 e11:{name:'Speed lines on a changed number',fact:'the window changed the figure: lines trail each new number',hash:'#/leaderboard',center:'.ss3-c.ss3-r-wl',dy:-60,h:440,dur:4.4,still:1.2,
  act:[{t:0.8,js:"document.querySelectorAll('.ss3-sw .ss-swb')[1].click()"},{t:2.6,js:"document.querySelectorAll('.ss3-sw .ss-swb')[2].click()"}]},
 e12:{name:'P&L bars grow out of $0',fact:'profit stacks up from the $0 line, a loss hangs below it',hash:'#/leaderboard',center:'.ss3-base',h:400,from:-760,go:1.2,dur:4,still:1.5},
 e13:{name:'The best in each row, circled by hand',fact:'gold ink rings the leader of each row, one row after another',hash:'#/leaderboard',center:'.ss3-c.ss3-r-l5',dy:20,h:360,from:-900,go:1.2,dur:4.4,still:3.2},
 e14:{name:'The latest lead change twinkles',fact:'round 67: where the golden ticket changed hands',hash:'#/leaderboard',center:"=[...document.querySelectorAll('.wc-race .wc-rc-st:not(.wc-rc-stk)')].pop()",dy:60,h:300,dur:4,still:1.5},
};
