// pump.fun listing assets from the site's own art: the coin image (1:1, at least 1000px) and the banner (1500x500, 3:1).
// node make.js <outdir>   (needs the local server on 8997 serving ez/)
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
const LOGO = fs.readFileSync(path.join(__dirname, '../../v22/x2p-logo.svg'), 'utf8').trim();
const B = 'http://127.0.0.1:8997/';
const fonts = `@font-face{font-family:Cap;src:url(${B}media/h48-caprasimo.woff2)}@font-face{font-family:Lil;src:url(${B}media/h48-lilita.woff2)}`;
const title = `font-family:Cap,serif;color:transparent;background:linear-gradient(180deg,#ffe6cf 0%,#ff7b52 55%,#d8331d 100%);-webkit-background-clip:text;background-clip:text;
  filter:drop-shadow(2px 0 0 #24140c) drop-shadow(-2px 0 0 #24140c) drop-shadow(0 2px 0 #24140c) drop-shadow(0 -2px 0 #24140c) drop-shadow(4px 5px 0 #24140c)`;
const pages = {
  // I1: the X avatar itself (the same picture traders see on x.com/earningszn), the disc filling a logo-black square
  'coin-ez-black': [1200, 1200, `<body style="margin:0;background:#04070e"><div style="width:1200px;height:1200px;display:grid;place-items:center">${LOGO.replace('<svg ', '<svg width="1200" height="1200" ')}</div>`],
  // I2: the logo without its disc, lettered on the show's yellow paper with the title's ink drop
  'coin-ez-yellow': [1200, 1200, `<body style="margin:0"><div style="width:1200px;height:1200px;display:grid;place-items:center;background:url(${B}media/h48-title-169.jpg) -1188px -812px/6000px auto">
     <div style="width:1080px;height:1080px;filter:drop-shadow(16px 20px 0 #24140c)">${LOGO.replace(/<circle[^>]*\/>/, '').replace('<svg ', '<svg width="1080" height="1080" style="overflow:visible" ').replace(/<path /g, '<path stroke="#24140c" stroke-width="15" stroke-linejoin="round" paint-order="stroke" ')}</div></div>`],
  // banner: the title card cropped to 3:1, the title lettered like the share card, one line under it
  'banner-title': [1500, 500, `<style>${fonts}</style><body style="margin:0"><div style="position:relative;width:1500px;height:500px;overflow:hidden;background:url(${B}media/h48-title-169.jpg) 100% 78%/1580px auto">
     <div style="position:absolute;left:54px;top:46px;display:flex;align-items:center;gap:12px;font:400 26px/1 Lil,sans-serif;letter-spacing:.12em;color:#24140c">${LOGO.replace('<svg ', '<svg width="54" height="54" ')}PRESENTS</div>
     <div style="position:absolute;left:50px;top:110px;font-size:84px;line-height:1;${title}">Four AIs<br>Trade Earnings</div>
     <div style="position:absolute;left:52px;top:322px;transform:rotate(-1.2deg);padding:14px 22px 12px;background:#fbf1d8;border:4px solid #24140c;box-shadow:6px 7px 0 #24140c;font:400 29px/1.2 Lil,sans-serif;color:#24140c">We track four AIs on every earnings trade,<br>so you don't have to.</div></div>`],
};
(async () => {
  const b = await chromium.launch();
  for (const [name, [w, h, html]] of Object.entries(pages)) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    await p.goto(B + 'tools/concepts/pumpfun/'); await p.setContent(html, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
    await p.screenshot({ path: path.join(out, name + (name.startsWith('banner') ? '.jpg' : '.png')), ...(name.startsWith('banner') ? { type: 'jpeg', quality: 90 } : {}) });
    await p.close();
  }
  await b.close();
})();
