// node pjson.js <TICKER> <when line> <grade line> > predict.json : the real trades from ez-data.js (PENDING), no sample stamp
const vm=require('vm'),fs=require('fs');const c={};c.window=c;c.document={};vm.createContext(c);
vm.runInContext(fs.readFileSync('/home/user/Tokengame/ez/ez-data.js','utf8')+';this.__P=PENDING;',c);
const tk=process.argv[2],p=c.__P.find(x=>x.ticker===tk);if(!p||!p.calls||p.calls.length<4){console.error('no trades in yet for',tk);process.exit(1)}
const ORD=['GPT','CLAUDE','GROK','KIMI'];
console.log(JSON.stringify({co:p.co,ticker:tk,logo:'crwv.png',sample:false,dur:12,when:process.argv[3]||'REPORTS TONIGHT · AFTER THE CLOSE',grade:process.argv[4]||"Graded at Wednesday's close",
 calls:ORD.map(m=>{const x=p.calls.find(y=>y.m===m);return {m,dir:x.dir,mag:+x.mag}})}))
