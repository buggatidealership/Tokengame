// node cues.js <out.json> [query] : dumps window.CUES from index.html for mix.py
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('http://localhost:8996/tools/concepts/studio/v3/index.html'+(process.argv[3]||''));await p.waitForFunction(()=>window.CUES);
require('fs').writeFileSync(process.argv[2],JSON.stringify(await p.evaluate(()=>window.CUES)));await b.close()})();
