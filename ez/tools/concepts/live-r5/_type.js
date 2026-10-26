/* the headline's look, all on the same words (C1). Every rule scoped to h1.lvh and !important, the site's own hero rules are strong. */
const A='AI<span class="x2p-lc">s</span>',H='html.x2p.x2d[data-theme] .hero h1.lvh';
const P='url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'160\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.9\' numOctaves=\'3\' seed=\'4\'/%3E%3CfeDiffuseLighting lighting-color=\'%23f4ead0\' surfaceScale=\'1.6\'%3E%3CfeDistantLight azimuth=\'225\' elevation=\'55\'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width=\'160\' height=\'160\' filter=\'url(%23n)\'/%3E%3C/svg%3E")';
const W='4 '+A+' fight over earnings.<br> <span class="hl">The winner calls the buyback.</span>';
module.exports={
  /* T1 today's look: Anton capitals, cream then gold, the hard shadow */
  T1:{html:W},
  /* T2 fight poster: wood type printed on poster stock; black gothic, then red slab; a red and a green rule, a kicker line */
  T2:{nofit:1,fonts:'family=Alfa+Slab+One',html:'<small class="k">Season 1 · Live every week</small>4 '+A+' fight over earnings.<br> <span class="hl">The winner calls the buyback.</span>',
    css:H+'{background:linear-gradient(rgba(240,229,200,.88),rgba(240,229,200,.88)),'+P+'!important;color:#1b181c!important;padding:12px 14px 12px!important;box-shadow:4px 5px 0 #000!important;text-shadow:0 1px 0 rgba(255,255,255,.55),0 -1px 0 rgba(0,0,0,.2)!important;-webkit-text-stroke:0!important;border-top:5px solid #1f7a45;border-bottom:5px solid #c8372a;letter-spacing:.005em!important;line-height:1.02!important;font-size:clamp(28px,8.2vw,64px)!important;text-wrap:balance}'+
      H+' .hl{font-family:"Alfa Slab One",serif!important;color:#b3221b!important;-webkit-text-fill-color:#b3221b!important;background:none!important;font-size:.82em!important;letter-spacing:0!important;text-shadow:0 1px 0 rgba(255,255,255,.55)!important}'+
      H+' .k{display:block;font:italic 900 12px/1 Archivo,sans-serif;font-stretch:62%;letter-spacing:.14em;text-transform:uppercase;color:#6a5f4c;margin-bottom:7px}'},
  /* T3 broadcast: the headline on the site's own strap, a red LIVE bug, the second line in gold */
  T3:{nofit:1,html:'<span class="bug"><i></i>Live</span>4 '+A+' fight over earnings.<br> <span class="hl">The winner calls the buyback.</span>',
    css:H+'{position:relative;background:#141217!important;border:2px solid #000!important;border-left:10px solid #f2b632!important;box-shadow:5px 5px 0 #000!important;padding:20px 12px 10px 14px!important;transform:skewX(-6deg);margin-top:14px!important;font-size:clamp(26px,7.6vw,60px)!important;text-wrap:balance}'+
      H+'::after{content:"";position:absolute;left:0;right:0;bottom:-2px;height:5px;background:linear-gradient(90deg,#1f7a45 50%,#c8372a 50%)}'+
      H+' .bug{position:absolute;top:-12px;left:-10px;display:inline-flex;align-items:center;gap:6px;background:#c8372a;color:#f3ead6;border:2px solid #000;padding:3px 9px 2px;font:italic 900 12px/1 Archivo,sans-serif;font-stretch:62%;letter-spacing:.1em;text-transform:uppercase}'+
      H+' .bug i{width:8px;height:8px;border-radius:50%;background:#fff;box-shadow:0 0 6px #fff}'},
  /* T4 meme caption: the classic Impact caption (white, a thick black outline), the language memecoin Twitter already speaks */
  T4:{html:W,css:H+',' +H+' span{filter:none!important;color:#fff!important;-webkit-text-fill-color:#fff!important;-webkit-text-stroke:7px #000!important;paint-order:stroke fill!important;text-shadow:none!important;letter-spacing:.01em!important;line-height:1.05!important}'+
      H+' .hl{color:#f2b632!important;-webkit-text-fill-color:#f2b632!important;background:none!important;-webkit-text-stroke:7px #000!important;paint-order:stroke fill!important}'},
  /* T5 terminal: how AI agents talk on CT (aixbt and the like): mono, green on black, a prompt and a cursor */
  T5:{nofit:1,fonts:'family=JetBrains+Mono:wght@700;800',html:'<small class="k">~/ez $ run season_1 --live</small>&gt; 4 '+A+' fight over earnings.<br> <span class="hl">&gt; the winner calls the buyback.<b class="cur"></b></span>',
    css:H+'{font-family:"JetBrains Mono",monospace!important;font-weight:800!important;text-transform:none!important;color:#d8f5e0!important;-webkit-text-fill-color:#d8f5e0!important;text-shadow:0 0 12px rgba(31,207,107,.35)!important;background:#07090a!important;border:1.5px solid #1f7a45!important;box-shadow:4px 4px 0 #000!important;padding:10px 12px 12px!important;letter-spacing:-.02em!important;line-height:1.22!important;font-size:clamp(20px,5.9vw,44px)!important}'+
      H+' .hl{color:#1fcf6b!important;-webkit-text-fill-color:#1fcf6b!important;background:none!important}'+
      H+' .k{display:block;font:500 11px/1 "JetBrains Mono",monospace;color:#5d8a6c;-webkit-text-fill-color:#5d8a6c;margin-bottom:8px;letter-spacing:0;text-shadow:none}'+
      H+' .cur{display:inline-block;width:.55em;height:.95em;background:#1fcf6b;vertical-align:-.12em;margin-left:.1em}'+H+' .x2p-lc{text-transform:none}'},
  /* T6 the ticket: the headline printed on an Admit One ticket like the standings', "the winner" in the stub's gold foil */
  T6:{nofit:1,html:'<span class="stub"><small>Season</small><b>1</b><small>Admit one</small></span><span class="tx">4 '+A+' fight over earnings.<br> <span class="hl">The <b class="fo">winner</b> calls the buyback.</span></span>',
    css:H+'{display:flex!important;align-items:stretch;background:linear-gradient(rgba(240,229,200,.88),rgba(240,229,200,.88)),'+P+'!important;color:#1b181c!important;-webkit-text-fill-color:#1b181c!important;box-shadow:none!important;filter:drop-shadow(4px 5px 0 #000);text-shadow:0 1px 0 rgba(255,255,255,.6),0 -1px 0 rgba(0,0,0,.22)!important;padding:0!important;line-height:1.03!important;font-size:clamp(25px,7.4vw,58px)!important;'+
      '-webkit-mask:radial-gradient(circle at 0 50%,transparent 7px,#000 7.5px),radial-gradient(circle at 100% 50%,transparent 7px,#000 7.5px);-webkit-mask-composite:source-in;mask-composite:intersect}'+
      H+' .stub{flex:none;display:grid;place-content:center;justify-items:center;gap:2px;padding:0 9px 0 13px;border-right:2px dashed rgba(27,24,28,.45);background:linear-gradient(rgba(242,182,50,.92),rgba(242,182,50,.92)),'+P+';white-space:normal}'+
      H+' .stub b{font-size:1.25em}'+H+' .stub small{font:italic 900 8px/1 Archivo,sans-serif;font-stretch:62%;letter-spacing:.1em;color:#5a3d00;-webkit-text-fill-color:#5a3d00}'+
      H+' .tx{padding:11px 16px 11px 10px}'+H+' .hl{color:#1b181c!important;-webkit-text-fill-color:#1b181c!important;background:none!important}'+
      H+' .fo{background:linear-gradient(115deg,#a8740e,#6e4a00 38%,#c08a18 55%,#7a5200 75%,#a8740e);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;font-weight:inherit}'}};
