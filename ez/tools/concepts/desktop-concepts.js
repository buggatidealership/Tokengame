// Three desktop concepts for X2+, applied on the real page above 1100 px (nothing on phones). Each = CSS + small DOM moves.
module.exports = {
// A · SPLIT SCREEN: two columns, every section one laptop screen
a: {
css: `
@media (min-width:1100px){
 html.x2p main#top.wrap{max-width:1280px!important;margin:0 auto;padding-inline:40px}
 .dkA-top{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:48px;align-items:center;min-height:calc(100vh - 61px);padding-block:28px 36px}
 .dkA-top .hero{padding:0!important;margin:0!important}
 .dkA-top .hero h1{font-size:clamp(54px,4.6vw,78px)!important;line-height:.94!important}
 .dkA-top .x2p-t3{margin-top:26px;max-width:none}
 .dkA-top .x2p-t3>ul>li{font-size:clamp(18px,1.35vw,22px)!important}
 .dkA-r{display:grid;gap:12px;align-content:center}
 .dkA-r .x2p-cdh{margin:0!important}
 .dkA-r .x2p-cdh b{font-size:clamp(40px,3.6vw,60px)!important}
 .dkA-r #gpu{width:100%!important;max-width:none!important;margin:0!important}
 .dkA-r #gpu .gpu-img{width:100%!important}
 html.x2p #record{display:grid!important;grid-template-columns:340px minmax(0,1fr);gap:40px;align-items:center;min-height:calc(100vh - 61px);padding-block:40px!important}
 html.x2p #record .sh{width:auto!important;max-width:none!important}
 html.x2p #record .car{width:auto!important;max-width:none!important;margin:0!important;min-width:0}
 html.x2p #record{grid-template-columns:300px minmax(0,1fr)!important}
 html.x2p #record .car-ctl{grid-column:2;min-width:0;width:100%;max-width:100%}
 .dkA-duo{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:48px;align-items:start;padding-block:40px}
 .dkA-duo>section{padding-top:0!important;min-width:0}
 .dkA-duo #standings .band,.dkA-duo #standings .x2o-band{width:auto!important;max-width:none!important}
 .dkA-duo #learn [class*=money] b,.dkA-duo #learn .lq-roi b{font-size:clamp(20px,1.7vw,28px)!important}
}`,
js: () => {
  const main = document.querySelector('main#top'), hero = main.querySelector('section.hero'), bet = main.querySelector('section.x2o-bet');
  const top = document.createElement('div'); top.className = 'dkA-top';
  const l = document.createElement('div'), r = document.createElement('div'); r.className = 'dkA-r';
  hero.before(top); top.append(l, r); l.append(hero); l.append(bet.querySelector('.x2p-t3'));
  r.append(bet.querySelector('.x2p-cdh'), bet.querySelector('#gpu')); bet.style.display = 'none';
  const st = document.querySelector('#standings'), lr = document.querySelector('#learn');
  const duo = document.createElement('div'); duo.className = 'dkA-duo'; st.before(duo); duo.append(st, lr);
}},
// B · TERMINAL: a sticky rail (countdown, pool, leader, follow) beside a dense main column
b: {
css: `
@media (min-width:1100px){
 html.x2p body{background-attachment:fixed}
 html.x2p main#top.wrap{max-width:1440px!important;margin:0 auto;padding-inline:28px;display:grid!important;grid-template-columns:360px minmax(0,1fr);gap:28px;align-items:start}
 .dkB-rail{position:sticky;top:76px;display:grid;gap:14px;padding:16px;background:#15131d;border:2px solid #000;box-shadow:5px 6px 0 #000;max-height:calc(100vh - 92px);overflow:auto;grid-row:1/span 20}
 .dkB-rail .x2p-cdh{margin:0!important}.dkB-rail .x2p-cdh .k{font-size:12px!important}.dkB-rail .x2p-cdh b{font-size:40px!important}.dkB-rail .x2p-hz-cd{width:64px!important}
 .dkB-rail #gpu{width:100%!important;margin:0!important}
 .dkB-rail .x2p-t3{margin:0}.dkB-rail .x2p-t3>ul{gap:8px}.dkB-rail .x2p-t3>ul>li{font-size:14px!important;line-height:1.3}
 .dkB-rail .x2p-t3 .fan{margin-top:16px;gap:8px}.dkB-rail .x2p-t3 .oc{font-size:13px!important;padding:7px 8px 8px}.dkB-rail .x2p-t3 .oc b{font-size:13px!important}
 .dkB-main{min-width:0;display:grid;gap:0}
 .dkB-main .hero{padding:18px 0 4px!important}.dkB-main .hero h1{font-size:48px!important;line-height:.95!important}
 .dkB-main #record{display:block!important;padding-top:28px!important}
 .dkB-main #record .sh{max-width:none!important;display:flex;align-items:end;justify-content:space-between;gap:24px}
 .dkB-main #record .car{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;overflow:visible!important;transform:none!important;width:auto!important;max-width:none!important;padding:18px 6px 14px!important}
 .dkB-main #record .car>article{width:auto!important;min-width:0!important;transform:none!important;position:relative!important;left:auto!important;margin:0!important}
 .dkB-main #record .car>article.dkB-off{display:none!important}
 .dkB-main #record .car-ctl{display:none!important}
 .dkB-main #record .car::before,.dkB-main #record .car::after{display:none!important}
 .dkB-main #record .car .card:not(.pend) .cwin .wv{font-size:24px!important}
 .dkB-all{justify-self:end;font:700 14px/1 Barlow,sans-serif;color:#f2b632;text-decoration:none;border-bottom:1px solid rgba(242,182,50,.5)}
 .dkB-duo{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:28px;align-items:start;padding-top:28px}
 .dkB-duo>section{padding-top:0!important;min-width:0}
}`,
js: () => {
  const main = document.querySelector('main#top'), hero = main.querySelector('section.hero'), bet = main.querySelector('section.x2o-bet');
  const rail = document.createElement('aside'); rail.className = 'dkB-rail';
  rail.append(bet.querySelector('.x2p-cdh'), bet.querySelector('#gpu'), bet.querySelector('.x2p-t3')); bet.style.display = 'none';
  const m = document.createElement('div'); m.className = 'dkB-main';
  main.prepend(rail); rail.after(m);
  [...main.children].filter(c => c !== rail && c !== m).forEach(c => m.append(c));
  const cards = [...document.querySelectorAll('#record .car>article')];
  const keep = cards.filter(c => c.classList.contains('pend') || (c.dataset.k === 'g')).slice(-6);
  cards.forEach(c => { if (!keep.includes(c)) c.classList.add('dkB-off') });
  const a = document.createElement('a'); a.className = 'dkB-all'; a.href = '#/results'; a.textContent = 'All ' + document.querySelectorAll('#record .car>article[data-k="g"]').length + ' graded rounds →';
  document.querySelector('#record .sh').append(a);
  const st = document.querySelector('#standings'), lr = document.querySelector('#learn');
  const duo = document.createElement('div'); duo.className = 'dkB-duo'; st.before(duo); duo.append(st, lr);
}},
// C · THE BINDER: hero banner with the countdown as a strip; the record as a binder page of slabs with a pop report
c: {
css: `
@media (min-width:1100px){
 html.x2p main#top.wrap{max-width:1320px!important;margin:0 auto;padding-inline:40px}
 .dkC-hero{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,.75fr);gap:40px;align-items:end;padding-block:30px 18px}
 .dkC-hero .hero{padding:0!important}.dkC-hero .hero h1{font-size:clamp(50px,4.2vw,72px)!important;line-height:.94!important}
 .dkC-hero .x2p-t3{margin:0;max-width:none}.dkC-hero .x2p-t3>ul>li{font-size:17px!important}
 .dkC-strip{display:grid;grid-template-columns:auto minmax(0,1fr) 300px;gap:28px;align-items:center;padding:16px 22px;margin:18px 0 6px;background:#15131d;border:2px solid #000;box-shadow:6px 7px 0 #f2b632,6px 7px 0 2px #000}
 .dkC-strip .x2p-cdh{margin:0!important}.dkC-strip .x2p-cdh b{font-size:46px!important}.dkC-strip .x2p-hz-cd{display:none!important}
 .dkC-strip #gpu{grid-column:3;width:300px!important;margin:0!important}
 .dkC-strip .dkC-tm{font:400 15px/1.3 Barlow,sans-serif;color:#d6cebb}
 html.x2p #record{display:block!important;padding-top:44px!important}
 html.x2p #record .sh{max-width:none!important;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:end;gap:24px}
 .dkC-pop{display:flex;gap:8px;flex-wrap:wrap}
 .dkC-pop span{display:grid;justify-items:center;gap:3px;min-width:74px;padding:8px 10px;background:#fbfaf6;color:#141217;border:2px solid #000;box-shadow:inset 0 0 0 3px #b8262a;font:800 9px/1 'Barlow Condensed',Barlow,sans-serif;letter-spacing:.12em;text-transform:uppercase}
 .dkC-pop span b{font:400 24px/1 Anton,Impact,sans-serif;letter-spacing:0}
 .dkC-pop span.k{background:#0f0e13;color:#f2b632;box-shadow:inset 0 0 0 3px #f2b632}
 html.x2p #record .car{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr));gap:22px;overflow:visible!important;transform:none!important;width:auto!important;max-width:none!important;padding:20px 4px 10px!important}
 html.x2p #record .car>article{width:auto!important;min-width:0!important;transform:none!important;position:relative!important;left:auto!important;margin:0!important}
 html.x2p #record .car>article.dkC-off{display:none!important}
 html.x2p #record .car-ctl{display:none!important}
 html.x2p #record .car::before,html.x2p #record .car::after{display:none!important}
 html.x2p #record .car .card:not(.pend) .cwin .wv{font-size:24px!important}
}`,
js: () => {
  const main = document.querySelector('main#top'), hero = main.querySelector('section.hero'), bet = main.querySelector('section.x2o-bet');
  const top = document.createElement('div'); top.className = 'dkC-hero'; hero.before(top); top.append(hero, bet.querySelector('.x2p-t3'));
  const strip = document.createElement('div'); strip.className = 'dkC-strip';
  const t = document.createElement('p'); t.className = 'dkC-tm'; t.innerHTML = 'The board freezes 24h before. The AI on top makes the call.';
  strip.append(bet.querySelector('.x2p-cdh'), t, bet.querySelector('#gpu')); top.after(strip); bet.style.display = 'none';
  const cards = [...document.querySelectorAll('#record .car>article')];
  const keep = cards.filter(c => c.dataset.k === 'g' || c.classList.contains('pend')).slice(-8);
  cards.forEach(c => { if (!keep.includes(c)) c.classList.add('dkC-off') });
  const g = { Perfect: 0, Strong: 0, Split: 0, Rough: 0, Rekt: 0 };
  ROUNDS.forEach(r => { const h = r.calls.filter(x => (x[1].indexOf('DOWN') < 0) === (r.a > 0)).length, n = r.calls.length;
    g[h === n ? 'Perfect' : h === 0 ? 'Rekt' : h / n >= .75 ? 'Strong' : h / n >= .5 ? 'Split' : 'Rough']++ });
  const pop = document.createElement('div'); pop.className = 'dkC-pop';
  pop.innerHTML = Object.keys(g).map(k => '<span class="' + (k === 'Perfect' ? 'k' : '') + '">' + k + '<b>' + g[k] + '</b></span>').join('');
  document.querySelector('#record .sh').append(pop);
}}
};
