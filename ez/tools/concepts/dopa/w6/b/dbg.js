// node w6/b/dbg.js <page> <outdir> <t1,t2,...> : stills with page errors printed at once (a short wait for READY)
const { chromium } = require('playwright'); const fs = require('fs'); const [page, out, arg] = process.argv.slice(2);
(async () => { const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] }); const p = await b.newPage({ viewport: { width: 1080, height: 1350 } }); const errs = [];
  p.on('pageerror', e => { errs.push(e.message); console.log('PAGEERR', e.message, (e.stack || '').split('\n').slice(0, 3).join(' | ')) }); p.on('console', m => { if (m.type() === 'error') console.log('CONSOLE', m.text()) });
  await p.goto('http://localhost:8993/' + page); try { await p.waitForFunction(() => window.READY === 1, null, { timeout: 40000 }) } catch (e) { console.log('NOT READY', await p.title()); await b.close(); process.exit(1) }
  fs.mkdirSync(out, { recursive: true }); const t0 = Date.now();
  for (const t of arg.split(',').map(Number)) { try { await p.evaluate(t => window.R(t), t) } catch (e) { console.log('R(' + t + ') threw', e.message.split('\n')[0]) } await p.screenshot({ path: out + '/' + t.toFixed(2).padStart(5, '0') + '.jpg', type: 'jpeg', quality: 88 }) }
  console.log('ok', arg.split(',').length, 'frames', Date.now() - t0, 'ms', errs.length ? 'ERRS ' + errs.length : ''); await b.close() })();
