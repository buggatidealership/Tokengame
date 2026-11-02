# python3 mkdrop.py [take] : exports the take's crop to out/top-h25-board6.jpg/.webp (1500 px, >= 3x of the 274 px desktop frame) and writes
# dropin-frame4.js with the take's places scaled to that file. The chips are Meet the models' own media/chip8c-<m>-1200.jpg.
import json,sys,subprocess
T=sys.argv[1] if len(sys.argv)>1 else 'e3';OUT=1500
s=open('_b6.js').read();i=s.index('const TK=Object.assign(')+len('const TK=Object.assign(');j=s.index(',W.__B6TK')
C=json.loads(s[i:j])[T];cx,cy,cw,ch=C['crop'];k=OUT/cw
src='img/'+C['img']
subprocess.run(['convert',src,'-crop',f'{cw}x{ch}+{cx}+{cy}','+repage','-resize',f'{OUT}x{OUT}','-quality','86','-sampling-factor','4:2:0','out/top-h25-board6.jpg'],check=True)
subprocess.run(['convert','out/top-h25-board6.jpg','-quality','84','out/top-h25-board6.webp'],check=True)
sc=lambda q:[[round((x-cx)*k,1),round((y-cy)*k,1)] for x,y in q]
B6={'file':'top-h25-board6.jpg','iw':OUT,'cq':[sc(q) for q in C['cq']],'wq':[sc(q) for q in C['wq']],'beam':sc(C['beam'])}
js=f'''/* Round H25 · board6 drop-in for tools/v22/story/x2p_top.js, frame 4 (BOARD as E, the golden ticket, revised: take {T}). Not applied to the live file.
   1. Copy out/top-h25-board6.jpg (and .webp) to media/ and add "media/top-h25-board6.jpg" plus media/chip8c-grok-1200.jpg media/chip8c-claude-1200.jpg
      media/chip8c-gpt-1200.jpg media/chip8c-kimi-1200.jpg (already in media/, Meet the models' own chips) and the four founder loops
      media/founder-grok-anim.mp4 media/founder-grok-anim.webm media/founder-grok-anim.jpg media/founder-claude-anim.mp4 media/founder-claude-anim.webm
      media/founder-claude-anim.jpg media/founder-gpt-anim.mp4 media/founder-gpt-anim.webm media/founder-gpt-anim.jpg media/founder-kimi-anim.mp4
      media/founder-kimi-anim.webm media/founder-kimi-anim.jpg (already used by Meet the models) to the "Media:" comment at the top of x2p_top.js.
   2. Paste the block below inside x2p_top.js, just above `function frames(){{` (it may replace board5's B5 block). It uses that file's own helpers:
      pic, surf, em, esc, NM, A, rank, IMQ.
   3. Replace the `board:{{...}}` entry in frames() with:
        board:{{w:'BOARD',k:'board',l:LINES.board,cap:'The board',p:boardB6()}}}},
   4. Append dropin-frame4.css to x2p_top.css, and call b6Wire(sec) at the end of build() (after place), so the founder loops play only near the screen.
   Live: the order (season P&L, the same sort as Meet the models) and the rank numerals. Placeholders: every number on the chips is a lit dash
   (No., LAST 7 DAYS, LAST ROUND, SEASON); Meet the models, the next section, shows them. Filled: the founders' loops. Painted: the board,
   the sockets, the gold socket's light, the windows; on each chip its mark, flag, name, version and labels (chips8 take c's paintings). */
const B6={json.dumps(B6,separators=(',',':'))};
/* chips8 take c's geometry, in chip units (3760 x 1520): the No., LAST 7 DAYS, LAST ROUND and SEASON windows, and the founder's window */
const B6G={{s:[3760,1520],no:[2385,251,2604,421],d7:[1120,479,2020,759],lr:[2086,478,2604,765],se:[1121,890,2604,1087],core:[2766,305,3612,1179]}};
const b6pc=(v,t)=>(v/t*100).toFixed(4)+'%',b6at=r=>`left:${{b6pc(r[0],B6G.s[0])}};top:${{b6pc(r[1],B6G.s[1])}};width:${{b6pc(r[2]-r[0],B6G.s[0])}};height:${{b6pc(r[3]-r[1],B6G.s[1])}}`;
const b6dash=(r,lead)=>{{const w=r[2]-r[0],h=r[3]-r[1],f=h*.62;return `<i class="b6-w" style="${{b6at(r)}}"><svg viewBox="0 0 ${{w}} ${{h}}" preserveAspectRatio="none" aria-hidden="true"><rect x="${{(w*.34).toFixed(1)}}" y="${{(h*.42).toFixed(1)}}" width="${{(w*.32).toFixed(1)}}" height="${{(h*.16).toFixed(1)}}" rx="${{(h*.08).toFixed(1)}}" fill="${{em(lead?'gd':'em')}}" class="q4-tx b6-dash"/></svg></i>`}};
const b6vid=m=>{{const b='media/founder-'+m.toLowerCase()+'-anim';return `<video class="b6-v" muted loop playsinline preload="metadata" poster="${{b}}.jpg" aria-hidden="true" tabindex="-1"><source src="${{b}}.mp4" type="video/mp4"><source src="${{b}}.webm" type="video/webm"></video>`}};
const b6chip=(m,i)=>(bw,bh)=>{{const src='media/chip8c-'+m.toLowerCase()+'-1200.jpg',sx=bw/B6G.s[0],sy=bh/B6G.s[1],K=['no','d7','lr','se'];
  const P=K.map(k=>{{const[x0,y0,x1,y1]=B6G[k];return `M${{(x0*sx).toFixed(1)}} ${{(y0*sy).toFixed(1)}}H${{(x1*sx).toFixed(1)}}V${{(y1*sy).toFixed(1)}}H${{(x0*sx).toFixed(1)}}Z`}}).join('');
  return `<img class="b6-im" src="${{src}}" alt="" draggable="false"><i class="b6-die" style="${{b6at(B6G.core)}}">${{b6vid(m)}}</i>`+K.map(k=>b6dash(B6G[k],i===0)).join('')
   +`<img class="b6-im b6-gl" src="${{src}}" alt="" draggable="false" style="clip-path:path('${{P}}')">`}};
function boardB6(){{const S=[];
  S.push(surf(B6.beam,()=>'','b6-beam',()=>'<i class="b6-rays"></i>'));
  rank.forEach((m,i)=>{{S.push(surf(B6.cq[i],()=>'','b6-chip'+(i===0?' b6-lead':''),b6chip(m,i)));
    S.push(surf(B6.wq[i],(w,h)=>{{const f=Math.min(h*.8,w*1.3);return `<g class="q4-g"><text x="${{(w/2).toFixed(1)}}" y="${{(h/2+f*.37).toFixed(1)}}" font-size="${{f.toFixed(1)}}" text-anchor="middle" fill="${{em(i?'em':'gd')}}" class="t4-an q4-tx q4-big">${{i+1}}</text></g>`}},'q4-glass b6-rk',()=>'<i class="q4-scan"></i>'))}});
  const gl=B6.wq.map(q=>`<img class="q4-gl" src="${{IMQ+B6.file}}" alt="" draggable="false" style="width:100%;left:0;top:0;clip-path:polygon(${{q.map(([x,y])=>`${{(x/B6.iw*100).toFixed(2)}}% ${{(y/B6.iw*100).toFixed(2)}}%`).join(',')}})">`).join('');
  return pic(IMQ+B6.file,B6.iw,B6.iw,S,'b6-pic',gl,[0,0,B6.iw,B6.iw])}}
/* the founder loops play only near the screen; never with reduced motion */
function b6Wire(root){{const vs=root.querySelectorAll('li.q4-board video.b6-v');if(!vs.length)return;if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;
  const io=new IntersectionObserver(es=>es.forEach(e=>{{const v=e.target;if(e.isIntersecting){{v.muted=true;const p=v.play();p&&p.catch(()=>{{}})}}else v.pause()}}),{{rootMargin:'80px 0px'}});vs.forEach(v=>io.observe(v))}}
'''
open('dropin-frame4.js','w').write(js);open('dropin-frame4.css','w').write(open('_b6.css').read())
print(B6['cq'][0])
