// Tight versions (owner, 2026-10-21: "still too much space all around"): wider column, less vertical air, bigger pieces.
const base = require('./concepts.js');
const T = `
@media (min-width:1100px){
 html.x2p main#top.wrap{max-width:min(1640px,calc(100vw - 48px))!important;padding-inline:24px!important}
 html.x2p .top-in{max-width:min(1640px,calc(100vw - 48px))!important}
 html.x2p #record,html.x2p #standings,html.x2p #learn,html.x2p #get{padding-top:44px!important}
 html.x2p .sec .sh{margin-bottom:14px!important}
}`;
module.exports = {
a: { js: base.a.js, css: base.a.css + T + `
@media (min-width:1100px){
 .dkA-top{grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important;gap:40px!important;min-height:calc(100vh - 61px);padding-block:20px 24px!important}
 .dkA-top .hero h1{font-size:clamp(60px,5.4vw,104px)!important}
 .dkA-top .x2p-t3>ul>li{font-size:clamp(19px,1.5vw,26px)!important}
 .dkA-top .x2p-t3 .oc{font-size:clamp(16px,1.15vw,20px)!important}.dkA-top .x2p-t3 .oc b{font-size:clamp(16px,1.15vw,20px)!important}
 .dkA-r .x2p-cdh b{font-size:clamp(48px,4.4vw,80px)!important}.dkA-r .x2p-hz-cd{width:clamp(90px,8vw,140px)!important}
 html.x2p #record{grid-template-columns:minmax(260px,22%) minmax(0,1fr)!important;gap:28px!important;min-height:calc(100vh - 61px);align-content:center}
 html.x2p #record .car>article{flex:0 0 clamp(330px,24vw,420px)!important}
 html.x2p #record .sh h2{font-size:clamp(40px,3.4vw,60px)!important}
 .dkA-duo{gap:36px!important;padding-block:44px 0!important}
}`},
b: { js: base.b.js, css: base.b.css + T + `
@media (min-width:1100px){
 html.x2p main#top.wrap{grid-template-columns:clamp(340px,24vw,420px) minmax(0,1fr)!important;gap:24px!important}
 .dkB-rail{top:72px!important;padding:14px!important}
 .dkB-main .hero{padding-top:10px!important}.dkB-main .hero h1{font-size:clamp(46px,4vw,76px)!important}
 .dkB-main #record{padding-top:20px!important}
 .dkB-main #record .car{grid-template-columns:repeat(auto-fill,minmax(280px,1fr))!important;gap:18px!important;padding-top:10px!important}
 .dkB-duo{padding-top:24px!important;gap:24px!important}
}`},
c: { js: base.c.js, css: base.c.css + T + `
@media (min-width:1100px){
 .dkC-hero{padding-block:16px 6px!important;gap:32px!important;align-items:center!important}
 .dkC-hero .hero h1{font-size:clamp(56px,5vw,96px)!important}
 .dkC-hero .x2p-t3>ul>li{font-size:clamp(17px,1.3vw,22px)!important}
 .dkC-strip{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)!important;gap:24px!important;padding:18px 24px!important;margin:12px 0 0!important}
 .dkC-strip .x2p-cdh{grid-column:1;grid-row:1;align-self:end}.dkC-strip .x2p-cdh b{font-size:clamp(60px,5.6vw,104px)!important}.dkC-strip .x2p-cdh .k{font-size:16px!important}
 .dkC-strip .dkC-tm{grid-column:1;grid-row:2;align-self:start;font-size:clamp(16px,1.2vw,20px)!important;margin:0}
 .dkC-strip #gpu{grid-column:2!important;grid-row:1/3;width:100%!important}
 html.x2p #record{padding-top:36px!important}
 html.x2p #record .car{grid-template-columns:repeat(auto-fill,minmax(270px,1fr))!important;gap:18px!important;padding-top:12px!important}
}`}
};
