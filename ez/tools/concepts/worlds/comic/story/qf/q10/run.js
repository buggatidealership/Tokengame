// node run.js <id> <out dir> : the four beats at 390x844 + beat 3 at 1280x800, with checks. Port 8915.
// The take's folder holds _<id>.css and _<id>.js; it must define window.__qGo(beat,instant) and add html.<id>-ready.
// Art frames (from media/round-66-shell-hd.mp4, in the scratchpad) are passed in as data URLs on window.__qArt.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs'),path=require('path');
const ID=process.argv[2],OUT=process.argv[3];fs.mkdirSync(OUT,{recursive:true});
const DIR=path.join(__dirname,'..',ID);const rd=f=>fs.readFileSync(path.join(DIR,f),'utf8');
const ART=process.env.ART||'/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/qf';
const art={};for(const k of ['lock','close','crown','p_GPT','p_KIMI','p_CLAUDE','p_GROK']){const f=path.join(ART,k+'.jpg');if(fs.existsSync(f))art[k]='data:image/jpeg;base64,'+fs.readFileSync(f).toString('base64')}
const SHOTS=[[390,844,1],[390,844,2],[390,844,3],[390,844,4],[1280,800,3],[320,700,3],[1280,800,1]];
(async()=>{const b=await chromium.launch();const rep=[];
 for(const [W,Hh,beat] of SHOTS){const p=await b.newPage({viewport:{width:W,height:Hh},deviceScaleFactor:2});await FONTS(p);const er=[];
  p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/favicon|404/.test(m.text()))er.push('console:'+m.text().slice(0,140))});
  await p.goto('http://localhost:8915/v47-live-x3plus.html',{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  await p.evaluate(a=>{window.__qArt=a},art);
  await p.addStyleTag({content:rd('_'+ID+'.css')});await p.addScriptTag({content:rd('_'+ID+'.js')});
  await p.waitForFunction(id=>document.documentElement.classList.contains(id+'-ready')||window.__qErr,ID,{timeout:30000});
  const e=await p.evaluate(()=>window.__qErr&&String(window.__qErr.stack));if(e)console.log('ERR',e);
  await p.evaluate(n=>{window.__qGo(n,true);scrollTo(0,0)},beat);
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(1600);
  await p.evaluate(n=>{window.__qGo(n,true)},beat);await p.waitForTimeout(300);
  const chk=await p.evaluate(id=>{const root=document.getElementById(id);const sw=document.documentElement.scrollWidth;
    // empty area per visible panel: sample a grid; a point is empty if the topmost element there is the panel itself
    const pans=[...root.querySelectorAll('[data-panel]')].filter(el=>el.getClientRects().length&&getComputedStyle(el).visibility!=='hidden'&&el.getBoundingClientRect().width>20&&el.closest('[data-shown="1"]'));
    const empty=pans.map(el=>{const r=el.getBoundingClientRect();let n=0,e=0;for(let y=r.top+3;y<r.bottom-3;y+=6)for(let x=r.left+3;x<r.right-3;x+=6){if(y<0||y>innerHeight)continue;n++;const t=document.elementFromPoint(x,y);if(t===el)e++}return el.dataset.panel+':'+(n?Math.round(e/n*100):'-')+'%'});
    // anything drawn over a company logo or over the film art's subject (marked data-subject)
    const subj=[...root.querySelectorAll('img.'+id+'-lg,image.'+id+'-lg,[data-subject]')].filter(el=>el.getClientRects().length&&el.closest('[data-shown="1"]'));
    const over=[];subj.forEach(el=>{const r=el.getBoundingClientRect();const R=el.dataset.subject?el.dataset.subject.split(',').map(Number):[0,0,1,1];
      const x0=r.left+R[0]*r.width,y0=r.top+R[1]*r.height,x1=r.left+R[2]*r.width,y1=r.top+R[3]*r.height;
      for(let y=y0+2;y<y1-1;y+=4)for(let x=x0+2;x<x1-1;x+=4){if(y<0||y>innerHeight||x<0||x>innerWidth)continue;const t=document.elementFromPoint(x,y);if(t&&t!==el&&!el.contains(t)&&!(t.contains&&t.contains(el))){over.push((el.dataset.subject?'art':'logo')+'<'+(t.className.baseVal!==undefined?t.className.baseVal:t.className));return}}});
    const r=root.getBoundingClientRect();return {sw,iw:innerWidth,empty,over,mod:[Math.round(r.left),Math.round(r.top),Math.round(r.width),Math.round(Math.min(r.height,innerHeight-r.top))]}},ID);
  const tag=`${W}-b${beat}`;rep.push(tag+' '+JSON.stringify(chk)+' '+(er.join(' | ')||'no errors'));console.log(rep[rep.length-1]);
  await p.screenshot({path:`${OUT}/${tag}.png`});
  fs.writeFileSync(`${OUT}/${tag}.json`,JSON.stringify(chk));await p.close()}
 fs.writeFileSync(`${OUT}/report.txt`,rep.join('\n'));await b.close()})();
