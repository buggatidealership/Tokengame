// node prev.js <page.html[?query]> <out.mp4> [from s] [to s] : a quick silent preview of a video page at 10 frames a second and 432x540,
// for looking at motion and running `python3 wrapqa.py <out.mp4> --prev` before the full render (about a minute for 35 s; no render lock).
const { chromium } = require('playwright'); const fs = require('fs'), os = require('os'), path = require('path'), cp = require('child_process');
const [page, out, a0, a1] = process.argv.slice(2);
(async () => { const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] }); const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: .4 }); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://localhost:8993/' + page); await p.waitForFunction(() => window.READY === 1, null, { timeout: 120000 }); const dur = await p.evaluate(() => window.DUR);
  const t0 = +(a0 || 0), t1 = +(a1 || dur), dir = fs.mkdtempSync(path.join(os.tmpdir(), 'prev-')); let n = 0;
  for (let t = t0; t < t1 - 1e-6; t += .1) { await p.evaluate(t => window.R(t), t); await p.screenshot({ path: path.join(dir, String(n++).padStart(5, '0') + '.jpg'), type: 'jpeg', quality: 80 }) }
  await b.close(); cp.execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-framerate', '10', '-i', path.join(dir, '%05d.jpg'), '-vf', 'scale=432:540,format=yuv420p', '-c:v', 'libx264', '-crf', '20', out]);
  for (const f of fs.readdirSync(dir)) fs.unlinkSync(path.join(dir, f)); fs.rmdirSync(dir); console.log(`${n} frames -> ${out}; errs ${errs.join('|') || 'none'}`) })();
