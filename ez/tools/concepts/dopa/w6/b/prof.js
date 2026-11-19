// node w6/b/prof.js <page> : ms per R(t) at a few times, and ms per screenshot
const { chromium } = require('playwright'); const page = process.argv[2];
(async () => { const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] }); const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: .4 });
  p.on('pageerror', e => console.log('PAGEERR', e.message)); await p.goto('http://localhost:8993/' + page); await p.waitForFunction(() => window.READY === 1, null, { timeout: 60000 });
  for (const t of [1, 3, 8, 11, 13, 18, 22, 28, 33]) { const ms = await p.evaluate(t => { const a = performance.now(); for (let i = 0; i < 5; i++) window.R(t + i * .01); return (performance.now() - a) / 5 }, t); const a = Date.now(); await p.screenshot({ path: '/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/w6/b/prof.jpg', type: 'jpeg', quality: 80 }); console.log(t, 'R', ms.toFixed(1), 'ms  shot', Date.now() - a, 'ms') }
  await b.close() })();
