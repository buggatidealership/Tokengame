const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
const svg=fs.readFileSync('/home/user/Tokengame/ez/tools/concepts/ez-logo-traced.svg','utf8').replace(/ width="400" height="400"/,'');
const gr=svg.replace('fill="#f8f0d9"','fill="#f8f0d9" class="E"');
// green E / red Z: one outline holds both letters, joined only where the E's top bar meets the Z's; the Z is everything right of the cut and of the Z's own left edges
const L=svg.match(/<path fill="#f8f0d9" d="([^"]+)"/)[1];
const gz=svg.replace(/<path fill="#f8f0d9" d="[^"]+"\/>/,'<defs><clipPath id="zc"><path d="M253,80 L400,80 L400,330 L130,330 L136,315.8 L181.5,250.8 L234.9,182 L192.2,182 L217.9,138.2 L225.1,130.8 L253,87.8 Z"/></clipPath></defs><path fill="#03c870" d="'+L+'"/><path fill="#ff3a31" clip-path="url(#zc)" d="'+L+'"/>');
const tile=(s,w)=>'<div style="width:'+w+'px;height:'+w+'px">'+s.replace('<svg ','<svg width="'+w+'" height="'+w+'" ')+'</div>';
const row=(s,bg)=>'<div style="display:flex;align-items:center;gap:22px;padding:14px 18px;background:'+bg+'">'+tile(s,200)+tile(s,64)+tile(s,32)+tile(s,16)+'</div>';
const html='<body style="margin:0;background:#0b0a14;font:600 15px Arial;color:#f1ead8"><div id="b" style="display:inline-flex;gap:26px;padding:20px">'+
 '<div><p style="margin:0 0 8px;color:#f2b632;font:700 18px Arial">A Today: cream EZ</p>'+row(svg,'#15131d')+row(svg,'#e9dcc0')+'</div>'+
 '<div><p style="margin:0 0 8px;color:#f2b632;font:700 18px Arial">B Green E, red Z</p>'+row(gz,'#15131d')+row(gz,'#e9dcc0')+'</div></div></body>';
(async()=>{const b=await chromium.launch();const p=await b.newPage({deviceScaleFactor:2});await p.setContent(html);const el=await p.$('#b');await el.screenshot({path:'colours.png'});
 fs.writeFileSync('ez-logo-greenred.svg',gz);await b.close()})();
