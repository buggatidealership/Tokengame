/* Round 48 (owner, 2026-10-25): the EZ stamp as a mark of its own ("when you see that, you'll know this has been graded"; one day
   on other things too), ten researched concepts. The card: Certificate and No., What they predicted with "Calls filed" on the same
   line (away from See the film), the calls with PASS / FAIL and a printed crown for the winner (the winner in ink, not gold), the
   market, See the film and the stamp. Each stamp is drawn in layers so it sits in the card the way its process would: inks multiplied
   into the stock (heavy strike, rare flecks), foils pressed (dark wall above, pale lip below), cuts showing what is behind the card.
   Every stamp has a dated card version, an undated mark, and a one-colour version (a trust mark must survive one ink). */
var R48=(function(){var E=R40.esc,Z=R45,K=0;function uid(){return 'x48'+(++K)+Math.random().toString(36).slice(2,6)}
  var G='#1f6b3f',R='#a8231a',P='#f7f4ec',INK='#1d1a1e';
  function sha256(s){function rr(v,a){return (v>>>a)|(v<<(32-a))}var mp=Math.pow,mw=mp(2,32),i,j,res='',w=[],abl=s.length*8,h=[],k=[],pc=0,ic={};
    for(var c=2;pc<64;c++){if(!ic[c]){for(i=0;i<313;i+=c)ic[i]=c;h[pc]=(mp(c,.5)*mw)|0;k[pc++]=(mp(c,1/3)*mw)|0}}
    s+='\x80';while(s.length%64-56)s+='\x00';for(i=0;i<s.length;i++){j=s.charCodeAt(i);w[i>>2]|=j<<((3-i)%4)*8}
    w[w.length]=((abl/mw)|0);w[w.length]=abl;
    for(j=0;j<w.length;){var ww=w.slice(j,j+=16),oh=h;h=h.slice(0,8);
      for(i=0;i<64;i++){var w15=ww[i-15],w2=ww[i-2],a=h[0],e=h[4];
        var t1=h[7]+(rr(e,6)^rr(e,11)^rr(e,25))+((e&h[5])^((~e)&h[6]))+k[i]+(ww[i]=(i<16)?ww[i]:(ww[i-16]+(rr(w15,7)^rr(w15,18)^(w15>>>3))+ww[i-7]+(rr(w2,17)^rr(w2,19)^(w2>>>10)))|0);
        var t2=(rr(a,2)^rr(a,13)^rr(a,22))+((a&h[1])^(a&h[2])^(h[1]&h[2]));h=[(t1+t2)|0].concat(h);h[4]=(h[4]+t1)|0}
      for(i=0;i<8;i++)h[i]=(h[i]+oh[i])|0}
    for(i=0;i<8;i++)for(j=3;j+1;j--){var b=(h[i]>>(j*8))&255;res+=((b<16)?0:'')+b.toString(16)}return res}
  /* defs shared by one stamp: heavy ink, satin gold, shiny foils (green, red, gold), a gloss sheen, a mirror field */
  function defs(id){return '<filter id="'+id+'h" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="2" seed="'+(K*7%97)+'" result="f"/>'+
      '<feColorMatrix in="f" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -8 6.2" result="m"/><feGaussianBlur in="SourceGraphic" stdDeviation=".22" result="b"/><feComposite in="b" in2="m" operator="in"/></filter>'+
    '<linearGradient id="'+id+'y" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#cfae5c"/><stop offset=".4" stop-color="#a98329"/><stop offset=".62" stop-color="#c9a453"/><stop offset="1" stop-color="#93701f"/></linearGradient>'+
    '<linearGradient id="'+id+'fy" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e6cb7c"/><stop offset=".34" stop-color="#9c7820"/><stop offset=".52" stop-color="#f0dc9a"/><stop offset=".74" stop-color="#8a6618"/><stop offset="1" stop-color="#c49f48"/></linearGradient>'+
    '<linearGradient id="'+id+'fg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3f9c69"/><stop offset=".34" stop-color="#0f4a2a"/><stop offset=".52" stop-color="#5cb886"/><stop offset=".74" stop-color="#0d4226"/><stop offset="1" stop-color="#2a7a4c"/></linearGradient>'+
    '<linearGradient id="'+id+'fr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d9564a"/><stop offset=".34" stop-color="#7a140e"/><stop offset=".52" stop-color="#ec6b5c"/><stop offset=".74" stop-color="#6e120c"/><stop offset="1" stop-color="#b02a1f"/></linearGradient>'+
    '<linearGradient id="'+id+'gl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".3" stop-color="#fff" stop-opacity=".55"/><stop offset=".42" stop-color="#fff" stop-opacity="0"/><stop offset=".78" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>'+
    '<linearGradient id="'+id+'mi" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4f3a0c"/><stop offset=".4" stop-color="#b8923a"/><stop offset=".47" stop-color="#fff2c6"/><stop offset=".55" stop-color="#9c7820"/><stop offset="1" stop-color="#3f2e09"/></linearGradient>'}
  function col(o,id){if(o.rev){var L='#f1e8d2';return {g:L,r:L,y:L,yf:L,gf:L,rf:L,p:'#0b0a14',k:L,m:1}}return o.mono?{g:INK,r:INK,y:INK,yf:INK,gf:INK,rf:INK,p:P,k:INK,m:1}:{g:G,r:R,y:'url(#'+id+'y)',yf:'url(#'+id+'fy)',gf:'url(#'+id+'fg)',rf:'url(#'+id+'fr)',p:P,k:INK,m:0}}
  function ez(cx,cy,w,c,ce,cz){return '<g fill="'+(ce||c.g)+'">'+Z.mono(cx,cy,w,Z.ME)+'</g><g fill="'+(cz||c.r)+'">'+Z.mono(cx,cy,w,Z.MZ)+'</g>'}
  /* text paths: top arcs read left to right over the top (glyphs stand outward), bottom arcs left to right under it (glyphs stand inward);
     a ring starts at the bottom and runs clockwise, so 50% is its top; paths sit in defs (a bare path would fill black) */
  function arc(id,cx,cy,r,top){return '<defs><path id="'+id+'" d="M '+(cx-r)+','+cy+' A '+r+','+r+' 0 0 '+(top?1:0)+' '+(cx+r)+','+cy+'"/></defs>'}
  function ring(id,cx,cy,r){return '<defs><path id="'+id+'" d="M '+cx+','+(cy+r)+' a '+r+','+r+' 0 1,1 0.01,0"/></defs>'}
  function tp(pid,txt,fs,fill,ls,len){return '<text text-rendering="geometricPrecision" font-family="Archivo, sans-serif" font-weight="900" font-size="'+fs+'" letter-spacing="'+(ls||1)+'" fill="'+fill+'"><textPath href="#'+pid+'" startOffset="50%" text-anchor="middle"'+(len?' textLength="'+len.toFixed(1)+'" lengthAdjust="spacing"':'')+'>'+E(txt)+'</textPath></text>'}
  function fill(r){return 2*Math.PI*r*.965}
  function t(x,y,txt,fs,fill,o){o=o||{};return '<text text-rendering="geometricPrecision" x="'+x+'" y="'+y+'" text-anchor="'+(o.a||'middle')+'" font-family="'+(o.f||'Archivo, sans-serif')+'" font-weight="'+(o.w||900)+'" font-size="'+fs+'" letter-spacing="'+(o.ls||0)+'" fill="'+fill+'">'+E(txt)+'</text>'}
  var dt=function(D){return D.graded.toUpperCase()+' 2026'};
  /* 1 The closing bell: the market close grades every card, and the bell ends every fight night */
  function bell(D,o){var id=uid(),c=col(o,id),B='M50,13 C41.5,13 35.5,19.5 34.5,30 C33,47 29,60 19.5,71 L15,77 L85,77 L80.5,71 C71,60 67,47 65.5,30 C64.5,19.5 58.5,13 50,13 Z';
    var foil='<circle cx="50" cy="8.5" r="4.2" fill="none" stroke="'+c.yf+'" stroke-width="2.6"/><path d="'+B+'" fill="none" stroke="'+c.yf+'" stroke-width="3.6" stroke-linejoin="round"/><circle cx="50" cy="97" r="5.2" fill="'+c.yf+'"/>';
    var ink='<rect x="9" y="77" width="82" height="13" rx="2.5" fill="'+c.r+'"/>'+t(50,86.6,'AT THE CLOSE',7.6,c.p,{ls:.9})+t(50,35,'GRADED',7.6,c.k,{f:'Anton, Impact, sans-serif',w:400,ls:.8})+ez(50,52,34,c)+
      (o.date?t(50,111,dt(D)+' · 4 PM ET',6.4,c.k,{ls:.3}):'');
    return {vb:'0 0 100 '+(o.date?114:104),ar:100/(o.date?114:104),ink:ink,foil:foil,id:id,name:'The closing bell',sil:'<circle cx="50" cy="8.5" r="6.5"/><path d="'+B+'"/><rect x="9" y="75" width="82" height="16" rx="3"/><circle cx="50" cy="97" r="7"/>'}}
  /* 2 The postmark: a printed EZ stamp, cancelled by the market; the cancellation lines follow the round's own move */
  function postmark(D,o){var id=uid(),c=col(o,id),mv=D.a||0,dy=Math.max(-12,Math.min(12,-mv*1.1)),L='';
    [26,34,42,50].forEach(function(y){L+='<path d="M93,'+y+' C99,'+(y-2.5)+' 104,'+(y+dy*.25+2)+' 109,'+(y+dy*.55)+' S118,'+(y+dy+1)+' 122,'+(y+dy)+'" fill="none" stroke="'+c.k+'" stroke-width="2.1" stroke-linecap="round"/>'});
    var foil='<rect x="9" y="12" width="40" height="62" fill="none" stroke="'+c.yf+'" stroke-width="1.8"/>';
    var ink='<rect x="4" y="7" width="50" height="72" fill="none" stroke="'+c.g+'" stroke-width="2.8" stroke-dasharray="0 4.4" stroke-linecap="round"/>'+t(29,21,'SEASON 1',5.8,c.k,{ls:.6})+ez(29,43,32,c)+t(29,68,o.date?'No. '+D.n:'PROOF',8.5,c.r,{f:'Anton, Impact, sans-serif',w:400,ls:.6})+
      '<g fill="none" stroke="'+c.k+'"><circle cx="70" cy="40" r="22" stroke-width="2.3"/><circle cx="70" cy="40" r="15.5" stroke-width=".9"/></g>'+arc(id+'a',70,40,16.6,1)+arc(id+'b',70,40,20.3,0)+
      tp(id+'a','EARNINGSZN',5.2,c.k,.9)+tp(id+'b',o.date?'GRADED':'EZ · GRADED',5.2,c.k,.9)+(o.date?t(70,39,D.graded.toUpperCase(),6.4,c.k,{ls:.3})+t(70,47,'2026',6.4,c.k,{ls:.4}):t(70,43.5,'EZ',10,c.k,{f:'Anton, Impact, sans-serif',w:400}))+L;
    return {vb:'0 0 124 86',ar:124/86,ink:ink,foil:foil,id:id,name:'The postmark',sil:'<rect x="2" y="5" width="54" height="76" rx="2"/><circle cx="70" cy="40" r="24.5"/><rect x="86" y="20" width="38" height="'+(36+Math.abs(dy))+'" rx="8" transform="translate(0 '+Math.min(0,dy)+')"/>'}}
  /* 3 The warrant: "By appointment to the market", the crown that also marks every winner */
  function crest(D,o){var id=uid(),c=col(o,id);
    var foil='<path d="M30,30 L26.5,11 L39,19.5 L50,5.5 L61,19.5 L73.5,11 L70,30 Z" fill="'+c.yf+'"/><rect x="30" y="29.5" width="40" height="5" fill="'+c.yf+'"/>';
    var ink='<circle cx="40" cy="32" r="1.6" fill="'+c.r+'"/><circle cx="50" cy="32" r="1.6" fill="'+c.g+'"/><circle cx="60" cy="32" r="1.6" fill="'+c.r+'"/>'+
      '<circle cx="50" cy="65" r="29" fill="none" stroke="'+c.g+'" stroke-width="3"/><circle cx="50" cy="65" r="21.5" fill="none" stroke="'+c.r+'" stroke-width="1"/>'+
      arc(id+'w',50,65,23.4,1)+tp(id+'w','BY APPOINTMENT',4.3,c.k,.6)+ez(50,66,27,c)+
      '<path d="M7,86 L93,86 L88,92 L93,98 L7,98 L12,92 Z" fill="'+c.r+'"/>'+t(50,94.1,'TO THE MARKET',5.4,c.p,{ls:.6})+(o.date?t(50,108,'GRADED · '+dt(D),5.4,c.k,{ls:.3}):'');
    return {sil:'<path d="M30,30 L26.5,11 L39,19.5 L50,5.5 L61,19.5 L73.5,11 L70,30 Z"/><rect x="29" y="28" width="42" height="8"/><circle cx="50" cy="65" r="31"/><path d="M5,84 L95,84 L90,92 L95,100 L5,100 L10,92 Z"/>',vb:'0 0 100 '+(o.date?111:101),ar:100/(o.date?111:101),ink:ink,foil:foil,id:id,name:'The warrant'}}
  /* 4 Spot gloss: the seal split along the Z's own diagonal into green and red, the EZ cut out of it, a clear gloss over the inks */
  function gloss(D,o){var id=uid(),c=col(o,id),x0=79.4,x1=20.6;
    var mk='<mask id="'+id+'k" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><rect width="100" height="100" fill="#fff"/><g fill="#000">'+Z.mono(50,50,40,Z.ME)+Z.mono(50,50,40,Z.MZ)+'</g></mask>'+
      '<clipPath id="'+id+'cg"><polygon points="0,0 '+x0+',0 '+x1+',100 0,100"/></clipPath><clipPath id="'+id+'cr"><polygon points="'+x0+',0 100,0 100,100 '+x1+',100"/></clipPath>';
    var foil=mk+'<g mask="url(#'+id+'k)"><circle cx="50" cy="50" r="31" fill="'+c.gf+'" clip-path="url(#'+id+'cg)"/><circle cx="50" cy="50" r="31" fill="'+c.rf+'" clip-path="url(#'+id+'cr)"/>'+
      (c.m?'':'<circle cx="50" cy="50" r="31" fill="url(#'+id+'gl)"/><path d="M27,35 A27,27 0 0 1 46,23.5" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.6" stroke-linecap="round"/>')+'</g>'+
      '<circle cx="50" cy="50" r="36.5" fill="none" stroke="'+c.yf+'" stroke-width="2"/>';
    var ink=ring(id+'t',50,50,39.6)+tp(id+'t',o.date?'GRADED · '+dt(D)+' · BY THE MARKET CLOSE ·':'EZ PROOF · GRADED BY THE MARKET CLOSE ·',6.1,c.k,1,fill(39.6));
    return {vb:'0 0 100 100',ar:1,ink:ink,foil:foil,id:id,name:'Spot gloss',sil:'<circle cx="50" cy="50" r="47"/>'}}
  /* 5 EZ Proof: a proof strike, mirror field and enamel EZ in green and red, struck into the card in gold */
  function medal(D,o){var id=uid(),c=col(o,id),beads='';for(var i=0;i<64;i++){var a=i/64*Math.PI*2;beads+='<circle cx="'+(50+45.2*Math.cos(a)).toFixed(2)+'" cy="'+(50+45.2*Math.sin(a)).toFixed(2)+'" r="1.1"/>'}
    var leg=ring(id+'t',50,50,39.9)+tp(id+'t','EZ PROOF · GRADED BY THE MARKET · '+(o.date?dt(D):'SEASON 1')+' ·',4.6,c.m?c.k:'#33230a',.6,fill(39.9));
    if(c.m)return {vb:'0 0 100 100',ar:1,ink:'<circle cx="50" cy="50" r="47" fill="none" stroke="'+c.k+'" stroke-width="2"/><g fill="'+c.k+'">'+beads+'</g><circle cx="50" cy="50" r="37" fill="none" stroke="'+c.k+'" stroke-width="1"/>'+leg+ez(50,50,40,c),foil:'',id:id,name:'EZ Proof',sil:'<circle cx="50" cy="50" r="48.5"/>'};
    var foil='<circle cx="50" cy="50" r="47.5" fill="'+c.yf+'"/><g fill="#5e430e" opacity=".55">'+beads+'</g><circle cx="50" cy="50" r="37" fill="url(#'+id+'mi)"/><circle cx="50" cy="50" r="37" fill="none" stroke="#5e430e" stroke-width=".8" opacity=".7"/>'+leg+
      '<g stroke="#b8902f" stroke-width="1.6" stroke-linejoin="round">'+ez(50,50,42,c,c.gf,c.rf)+'</g><g opacity=".5">'+'<path d="M28,30 A30,30 0 0 1 47,20" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/></g>';
    return {vb:'0 0 100 100',ar:1,ink:'',foil:foil,id:id,name:'EZ Proof',sil:'<circle cx="50" cy="50" r="48.5"/>'}}
  /* 6 The validation punch: conductors validated a ticket by punching it; our die is the EZ itself, cut clean through the card */
  function punch(D,o){var id=uid(),c=col(o,id),hole=Z.mono(50,50,42,Z.ME)+Z.mono(50,50,42,Z.MZ);
    var ink='<circle cx="50" cy="50" r="46" fill="none" stroke="'+c.g+'" stroke-width="2.6"/><circle cx="50" cy="50" r="39.8" fill="none" stroke="'+c.r+'" stroke-width="1"/>'+
      arc(id+'a',50,50,40.8,1)+arc(id+'b',50,50,44.3,0)+tp(id+'a','VALIDATED',5.2,c.g,1.6)+tp(id+'b',o.date?dt(D):'BY THE MARKET CLOSE',5,c.r,1);
    var plain='<defs><clipPath id="'+id+'hc">'+hole+'</clipPath></defs><g clip-path="url(#'+id+'hc)"><rect width="100" height="100" fill="#e8dbb9"/>'+
      '<g transform="translate(-1.1 -1.1)" clip-path="url(#'+id+'hc)"><rect x="-5" y="-5" width="110" height="110" fill="#060509"/><g fill="#342e39" transform="translate(2.9 3.1)">'+hole+'</g></g></g>';
    return {vb:'0 0 100 100',ar:1,ink:ink,foil:'',plain:plain,id:id,name:'The validation punch',sil:'<circle cx="50" cy="50" r="48"/>'}}
  /* 7 The code stamp: the corner seal format (the 1954 comics code stamp sat on every cover), made for slapping on anything */
  function code(D,o){var id=uid(),c=col(o,id);
    var foil='<rect x="7" y="78" width="72" height="14" rx="1.5" fill="'+c.yf+'"/>';
    var ink='<path d="M22,17 V6 Q22,2 26,2 H60 Q64,2 64,6 V17 Z" fill="'+c.r+'"/>'+t(43,13.8,'GRADED',9.6,c.p,{f:'Anton, Impact, sans-serif',w:400,ls:.9})+
      '<rect x="3" y="17" width="80" height="79" rx="3" fill="none" stroke="'+c.g+'" stroke-width="3"/><rect x="7" y="21" width="72" height="71" fill="none" stroke="'+c.g+'" stroke-width=".9"/>'+
      ez(43,45,46,c)+t(43,71.3,'BY THE MARKET CLOSE',4.8,c.k,{ls:0})+t(43,88.2,o.date?dt(D):'EZ PROOF',7,c.k,{ls:.7});
    return {vb:'0 0 86 98',ar:86/98,ink:ink,foil:foil,id:id,name:'The code stamp',sil:'<path d="M20,18 V5 Q20,0 26,0 H60 Q66,0 66,5 V18 Z"/><rect x="1" y="15" width="84" height="83" rx="4"/>'}}
  /* 8 The data seal: the ring is the record itself (the first 64 bits of the SHA-256 of the round's calls and close), the EZ inside */
  function data(D,o){var id=uid(),c=col(o,id),r=o.date?ROUNDS.filter(function(x){return x.n===D.n})[0]:null;
    var rec=r?[r.n,r.ticker,r.called,r.resolves].concat(r.calls.map(function(x){return x[0]+':'+x[1]})).concat(['close:'+r.a]).join('|'):'EZ GRADED';
    var hx=sha256(rec).slice(0,16),bits='';for(var q=0;q<16;q++)bits+=('0000'+parseInt(hx[q],16).toString(2)).slice(-4);
    var seg='',orient='';function sec(i,r1,r2,wf){var a0=i/64*Math.PI*2-Math.PI/2+(1-wf)*Math.PI/64,a1=a0+wf*2*Math.PI/64;
      return 'M'+(50+r2*Math.cos(a0)).toFixed(2)+','+(50+r2*Math.sin(a0)).toFixed(2)+' A'+r2+','+r2+' 0 0 1 '+(50+r2*Math.cos(a1)).toFixed(2)+','+(50+r2*Math.sin(a1)).toFixed(2)+' L'+(50+r1*Math.cos(a1)).toFixed(2)+','+(50+r1*Math.sin(a1)).toFixed(2)+' A'+r1+','+r1+' 0 0 0 '+(50+r1*Math.cos(a0)).toFixed(2)+','+(50+r1*Math.sin(a0)).toFixed(2)+' Z'}
    for(var i=0;i<64;i++){if(i%16===0){orient+='<path d="'+sec(i,36,46,.9)+'"/>';continue}if(bits[i]==='1')seg+='<path d="'+sec(i,37.5,45,.72)+'"/>'}
    var ink='<g fill="'+c.k+'">'+seg+'</g><circle cx="50" cy="50" r="33" fill="none" stroke="'+c.g+'" stroke-width="1.6"/><circle cx="50" cy="50" r="30.6" fill="none" stroke="'+c.r+'" stroke-width=".8"/>'+
      t(50,31.5,'GRADED',6.4,c.k,{f:'Anton, Impact, sans-serif',w:400,ls:.7})+ez(50,47,34,c)+t(50,69.5,o.date?dt(D):'BY THE MARKET',5.6,c.k,{ls:.4});
    var foil='<g fill="'+c.yf+'">'+orient+'</g>';
    return {vb:'0 0 100 100',ar:1,ink:ink+(c.m?'<g fill="'+c.k+'">'+orient+'</g>':''),foil:c.m?'':foil,id:id,name:'The data seal',sil:'<circle cx="50" cy="50" r="48"/>'}}
  /* 9 The word stamp: the oldest approval mark is one word in a box (PAID, APPROVED); ours is EZ PROOF */
  function word(D,o){var id=uid(),c=col(o,id);
    var ink='<rect x="2" y="2" width="124" height="58" rx="8" fill="none" stroke="'+c.g+'" stroke-width="3.4"/><rect x="6.5" y="6.5" width="115" height="49" rx="5" fill="none" stroke="'+c.g+'" stroke-width="1.1"/>'+
      ez(31,27,32,c)+t(57,38.6,'PROOF',23,c.r,{f:'Anton, Impact, sans-serif',w:400,a:'start',ls:.8})+t(64,50.4,o.date?'GRADED · '+dt(D):'GRADED BY THE MARKET',5.4,c.g,{ls:.5});
    return {vb:'0 0 128 62',ar:128/62,ink:ink,foil:'',id:id,name:'The word stamp',sil:'<rect x="0" y="0" width="128" height="62" rx="9"/>'}}
  /* 10 The advisory label: one bold label that reads at any size and in one ink (the 1985 parental advisory label's lesson) */
  function label(D,o){var id=uid(),c=col(o,id);
    var foil='<rect x="5" y="80.5" width="62" height="2" fill="'+c.yf+'"/>';
    var ink='<rect x="1.5" y="1.5" width="69" height="85" fill="none" stroke="'+c.k+'" stroke-width="3"/>'+ez(36,21.5,40,c)+'<rect x="1.5" y="40" width="69" height="22" fill="'+c.k+'"/>'+
      t(36,57.6,'GRADED',16,c.p,{f:'Anton, Impact, sans-serif',w:400,ls:1.4})+t(36,71.3,'BY THE MARKET CLOSE',4.5,c.k,{ls:0})+t(36,78.6,o.date?dt(D):'EARNINGSZN.XYZ',5,c.k,{ls:.4});
    return {vb:'0 0 72 88',ar:72/88,ink:ink,foil:foil,id:id,name:'The advisory label',sil:'<rect x="0" y="0" width="72" height="88"/>'}}
  var ST={bell:bell,postmark:postmark,crest:crest,gloss:gloss,medal:medal,punch:punch,code:code,data:data,word:word,label:label};
  /* one stamp as stacked layers in a box of width w: shared defs, foil (pressed), ink (multiplied, heavy strike), cut (as is) */
  function render(name,D,o,w){var s=ST[name](D,o),h=Math.round(w/s.ar),vb=s.vb;
    return '<span class="x48-st'+(o.cls?' '+o.cls:'')+'" style="width:'+w+'px;height:'+h+'px;--r:'+(o.rot==null?7:o.rot)+'deg"><svg class="x48-defs" aria-hidden="true"><defs>'+defs(s.id)+'</defs></svg>'+
      (o.stk&&s.sil?'<svg class="x48-stk" viewBox="'+vb+'" aria-hidden="true"><g fill="#f4efe2" stroke="#f4efe2" stroke-width="7" stroke-linejoin="round">'+s.sil+'</g></svg>':'')+(s.foil?'<svg class="x48-foil" viewBox="'+vb+'" aria-hidden="true">'+s.foil+'</svg>':'')+(s.ink?'<svg class="x48-ink" viewBox="'+vb+'" aria-hidden="true"><g filter="url(#'+s.id+'h)">'+s.ink+'</g></svg>':'')+
      (s.plain?'<svg class="x48-cut" viewBox="'+vb+'" aria-hidden="true">'+s.plain+'</svg>':'')+'<span class="x48-sr">'+E(s.name)+': graded '+E(D.graded)+'</span></span>'}
  var CROWN='<svg class="x48-cr" viewBox="0 0 24 19" role="img" aria-label="Winner"><path d="M2.2 13.6 1 3.6l6 4.8L12 .8l5 7.6 6-4.8-1.2 10z M2.4 15h19.2v3.2H2.4z"/></svg>';
  function build(D,o){var rows=Z.rows4(D),M=R41;
    var wv=o.win||'crown',pen=wv==='under'?'<svg class="x48-ul" viewBox="0 0 100 6" preserveAspectRatio="none" aria-hidden="true"><path vector-effect="non-scaling-stroke" d="M1,3.9 C16,2.4 33,4.5 51,3.2 S83,2.5 99,3.7"/></svg>':
      wv==='circle'?'<svg class="x48-ci" viewBox="0 0 48 28" aria-hidden="true"><path vector-effect="non-scaling-stroke" d="M30,3.2 C40,3.6 46.5,8.6 45.8,14.6 C45,21.6 34.5,25.6 23,25.2 C11,24.8 2.6,20.2 2.8,13.6 C3,7.2 12.5,2.8 24.5,2.6 C28,2.6 31,3 33.5,3.8"/></svg>':'';
    var rh=rows.map(function(x,i){var tilt=[-6,-4,-7,-5][i],mk=x.win?CROWN:M.mini({shape:'cart',word:x.ok?'PASS':'FAIL',c:x.ok?G:R,rot:tilt,seed:i+21,w:36,h:16,fs:9,ls:.6,wf:.5,cls:'x46-m'});
      return '<div class="x46-r '+(x.win?'win':x.ok?'ok':'no')+'"><b class="x46-rk lp">'+x.r4+'</b><span class="r40mk x46-mk">'+x.svg+'</span><span class="x46-nm lp">'+E(x.n)+'</span>'+mk+'<span class="x46-cl lp '+(x.up?'up':'dn')+'">'+E(x.call)+'</span>'+(x.win?pen:'')+'</div>'}).join('');
    /* where "Calls filed" sits (owner: away from See the film): 'head' on the number's line (default), 'sec' stacked at the right of
       What they predicted */
    var cf=o.cf||'head',no='No. '+String(D.n).padStart(4,'0');
    var hd=cf==='head'?'<p class="x46-no x48-no"><span class="lp">'+no+'</span><i class="lp">·</i><span class="lp">Calls filed '+E(D.called)+'</span></p>':'<p class="x46-no lp">'+no+'</p>';
    var sec=cf==='sec'?'<span class="x48-cf"><small class="lp">Calls filed</small><b class="lp">'+E(D.called)+'</b></span>':'';
    var h='<div class="x46-fr"></div><div class="x46-hd"><p class="x46-t"><i class="x46-sr lp">★</i><span class="lp">'+E(o.head||'Certificate')+'</span><i class="x46-sr lp">★</i></p>'+hd+'</div>'+
      '<p class="x46-sec x48-sec"><span class="lp">What they predicted</span>'+sec+'</p><div class="x46-rows">'+rh+'</div>'+
      '<div class="x46-out"><small class="lp">Market</small><b class="lp '+(D.dn?'dn':'up')+'">'+E(D.move)+'</b></div>'+
      '<div class="x46-ft x48-ft">'+(D.film?'<p class="x46-film lp">↻ See the '+(window.FILMS&&FILMS[D.n]?'film':'picture')+'</p>':'<span></span>')+render(o.stamp,Object.assign({},D,{a:ROUNDS.filter(function(r){return r.n===D.n})[0].a}),{date:1,rot:o.rot,cls:o.scls},o.w||62)+'</div>';
    return R40.over(D.face,h,'x46 x48 x48w-'+wv+' '+(o.cls||''))}
  return {build:build,render:render,ST:ST,sha256:sha256}})();
window.R48=R48;
