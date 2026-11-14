const {chromium}=require('/opt/node22/lib/node_modules/playwright');const {open}=require('./run.js');
(async()=>{const b=await chromium.launch();const [t,sel,out]=process.argv.slice(2);const {p}=await open(b,t,+(process.env.W||390),3);
const l=p.locator('#wc-book .wc-cover '+sel).first();await l.scrollIntoViewIfNeeded();await p.waitForTimeout(300);await l.screenshot({path:out});await b.close()})();
