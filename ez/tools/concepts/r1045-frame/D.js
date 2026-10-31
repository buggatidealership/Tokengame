/* D · The cut: the frame is the logo's colour split. Green takes the top and the left, red the right and the foot, and they meet in the
   logo's own diagonal cut (its lean, a black gap between them, as between the E and the Z) at the top right and the bottom left; the
   gold square sits on the foot's outer corner like the logo's dot. Words in the logo's black ink on the bands. Drawn as one SVG at the
   frame's real size (redrawn on resize). */
F45.mount('D',{bg:'<svg class="f45-cut"></svg>',
  hd:'<span class="f45-kk">Earnings Zeason presents</span><span class="f45-ti">How it works</span>',
  ft:'<span class="f45-tm"><em class="f45-tl">Running time</em></span>',
  after:function(vt){var svg=vt.querySelector('.f45-cut'),K=0.65;
    function draw(){var W=vt.offsetWidth,H=vt.offsetHeight,cs=getComputedStyle(vt),s=parseFloat(cs.paddingLeft),hd=vt.querySelector('.f45-hd'),ft=vt.querySelector('.f45-ft'),T=hd.offsetHeight,B=ft.offsetHeight;
      var Xb=W-s-(W>500?52:36),Xt=Xb+K*T,Xa=s+(W>500?22:14),Xa2=Xa+K*B,gp=W>500?3.5:2.5;
      var p=function(a){return a.map(function(q){return q[0].toFixed(2)+','+q[1].toFixed(2)}).join(' ')};
      svg.setAttribute('viewBox','0 0 '+W+' '+H);svg.setAttribute('width',W);svg.setAttribute('height',H);
      svg.innerHTML='<polygon fill="#03c870" points="'+p([[0,0],[Xt,0],[Xb,T],[s,T],[s,H-B],[Xa2,H-B],[Xa,H],[0,H]])+'"/>'+
        '<polygon fill="#ff3a31" points="'+p([[Xt,0],[W,0],[W,H],[Xa,H],[Xa2,H-B],[W-s,H-B],[W-s,T],[Xb,T]])+'"/>'+
        '<g stroke="#04070e" stroke-width="'+gp+'"><line x1="'+(Xt+K*2)+'" y1="-2" x2="'+(Xb-K*2)+'" y2="'+(T+2)+'"/><line x1="'+(Xa2+K*2)+'" y1="'+(H-B-2)+'" x2="'+(Xa-K*2)+'" y2="'+(H+2)+'"/></g>'}
    draw();new ResizeObserver(draw).observe(vt);document.fonts.ready.then(draw)}});
