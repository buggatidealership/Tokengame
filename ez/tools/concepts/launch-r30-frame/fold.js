/* Round 30, concept "fold": a frame folded from four strips of origami card around the film. Each strip's window edge is folded back
   over its face (a narrow hem showing the card's pale back, origami's colour change), and the strips are laid pinwheel fashion, each
   one's end tucked under the next: the top strip runs over the top left corner, the right strip over the top right, the bottom strip
   over the bottom right, the left strip over the bottom left. So every corner is one strip lying on another, with the card's
   thickness at the step and, where the site's light from the top left falls past it, a hair of contact shadow; no mitres (a mitre is
   a moulding's joint, not a paper one). This script only draws the geometry (clip paths, to the frame's own size, redrawn when it
   changes); every colour is in fold.css. Idempotent: a second run reuses the same layer and observer. */
var D=document,H=D.documentElement,vt=D.querySelector('.x2p-vt');if(!vt)return;
H.classList.add('r30fo');
var vp=vt.querySelector('.vt-p');if(!vp)return;
var fr=vp.querySelector(':scope>.r30fo-fr');
if(!fr){fr=D.createElement('div');fr.className='r30fo-fr';fr.setAttribute('aria-hidden','true');
  /* o: each strip's face; n: its hem; x: the hem's free edge on the face; k: a tucked end's step (k) and contact shadow (ks) */
  fr.innerHTML=['o t','o r','o b','o l','n t','n r','n b','n l','x t','x r','x b','x l','k k1','k k2','k k3','k k4','ks ks1','ks ks4'].map(function(c){return '<i class="'+c+'"></i>'}).join('');
  vp.insertBefore(fr,vp.firstChild)}
function q(c){return fr.querySelector('.'+c.split(' ').join('.'))}
function n(v){return Math.round(v*100)/100+'px'}
function clip(el,pts){if(el)el.style.clipPath='polygon('+pts.map(function(p){return n(p[0])+' '+n(p[1])}).join(',')+')'}
function box(el,x0,y0,x1,y1){clip(el,[[x0,y0],[x1,y0],[x1,y1],[x0,y1]])}
function draw(){
  /* fractional sizes: offsetHeight rounds, and a tenth of a pixel of card would lie on the picture */
  var cs=getComputedStyle(vp),vs=getComputedStyle(vt),R=vp.getBoundingClientRect(),W=R.width,Hh=R.height;if(!W||!Hh)return;
  var t=parseFloat(cs.paddingTop),s=parseFloat(cs.paddingLeft),bo=parseFloat(cs.paddingBottom),hm=parseFloat(vs.getPropertyValue('--fh'))||2.5,
      ph=W<500,j=ph?.35:.5,th=ph?.6:.75,sh=ph?1.5:2;
  var L=s,Rx=W-s,T=t,B=Hh-bo;/* the window */
  /* the faces: square-cut strips, each over one corner */
  box(q('o t'),0,0,Rx,T);box(q('o r'),Rx,0,W,B);box(q('o b'),L,B,W,Hh);box(q('o l'),0,T,L,Hh);
  /* the hems, folded by hand: each drifts a little along its strip (a machine fold would be exact) */
  clip(q('n t'),[[0,T-hm],[Rx,T-hm+j],[Rx,T],[0,T]]);
  clip(q('n r'),[[Rx,0],[Rx+hm-j*.6,0],[Rx+hm,B],[Rx,B]]);
  clip(q('n b'),[[L,B],[W,B],[W,B+hm-j*.5],[L,B+hm]]);
  clip(q('n l'),[[L-hm+j*.5,T],[L,T],[L,Hh],[L-hm,Hh]]);
  /* the hems' free edges on the faces: the card's thickness toward the light, a hair of shadow away from it */
  clip(q('x t'),[[0,T-hm-th],[Rx,T-hm+j-th],[Rx,T-hm+j],[0,T-hm]]);
  clip(q('x l'),[[L-hm+j*.5-th,T],[L-hm+j*.5,T],[L-hm,Hh],[L-hm-th,Hh]]);
  clip(q('x r'),[[Rx+hm-j*.6,0],[Rx+hm-j*.6+sh,0],[Rx+hm+sh,B],[Rx+hm,B]]);
  clip(q('x b'),[[L,B+hm],[W,B+hm-j*.5],[W,B+hm-j*.5+sh],[L,B+hm+sh]]);
  /* the tucks: where a strip's edge lies on the next one's end, the step (k), and where the light falls past it, its shadow (ks) */
  box(q('k k1'),0,T,L,T+th);            /* top strip's lower edge on the left strip */
  box(q('k k2'),Rx-th,0,Rx,T);           /* right strip's inner edge on the top strip's end */
  box(q('k k3'),Rx,B-th,W,B);               /* bottom strip's upper edge on the right strip's end */
  box(q('k k4'),L,B,L+th,Hh);               /* left strip's inner edge on the bottom strip's end */
  box(q('ks ks1'),0,T,L,T+sh);
  box(q('ks ks4'),L,B,L+sh,Hh);
}
draw();
if(!vt.__r30fo){vt.__r30fo=new ResizeObserver(draw);vt.__r30fo.observe(vp);if(D.fonts)D.fonts.ready.then(draw)}
