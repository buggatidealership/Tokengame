/* S5 · Wired: the chip's traces run on down the board, drawn by hand: fees pulse into a capacitor (the pool), out through the call (a junction), to a lit LED or a blown fuse */
BT.go((sec,D)=>{
 const svg=`<svg class="s5-sv" viewBox="0 0 360 300" aria-hidden="true"><defs>
  <linearGradient id="s5au" x1="0" x2="1"><stop offset="0" stop-color="#8a5c12"/><stop offset=".35" stop-color="#ffe39a"/><stop offset=".6" stop-color="#d8a238"/><stop offset="1" stop-color="#6e470c"/></linearGradient>
  <linearGradient id="s5liq" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff2b0"/><stop offset=".4" stop-color="#ffc632"/><stop offset="1" stop-color="#c77a06"/></linearGradient>
  <radialGradient id="s5led" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#eaffef"/><stop offset=".35" stop-color="#3dff8e"/><stop offset="1" stop-color="#0a8a3e"/></radialGradient>
  <radialGradient id="s5gl" r=".5"><stop offset="0" stop-color="#3dff8e" stop-opacity=".55"/><stop offset="1" stop-color="#3dff8e" stop-opacity="0"/></radialGradient>
  <radialGradient id="s5rg" r=".5"><stop offset="0" stop-color="#ff4a2e" stop-opacity=".5"/><stop offset="1" stop-color="#ff4a2e" stop-opacity="0"/></radialGradient>
  <linearGradient id="s5gls" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dfeee8" stop-opacity=".55"/><stop offset=".5" stop-color="#9fb5ad" stop-opacity=".18"/><stop offset="1" stop-color="#dfeee8" stop-opacity=".4"/></linearGradient></defs>
  <g class="trk">
   <path d="M30 0 V18 L44 32 V44"/><path d="M52 0 V30 L56 34 V44"/><path d="M74 0 V20 L64 30 V44"/><path d="M96 0 V12 L76 32 V44"/>
   <path d="M60 118 V146"/><path class="gr" d="M56 156 L40 172 V196"/><path class="rd" d="M64 156 L82 174 V238 L92 248 H104"/></g>
  <g class="flow"><path d="M30 0 V18 L44 32 V44"/><path d="M52 0 V30 L56 34 V44"/><path d="M74 0 V20 L64 30 V44"/><path d="M96 0 V12 L76 32 V44"/></g>
  <!-- C1: the pool capacitor -->
  <g class="cap"><path class="ik" d="M29 52 Q29 42 60 42 Q91 42 91 52 L92 116 Q92 128 60 128 Q28 128 28 116Z"/>
   <path d="M32 54 Q32 46 60 46 Q88 46 88 54 L89 115 Q89 124 60 124 Q31 124 31 115Z" fill="url(#s5au)"/>
   <path class="lq" d="M33 76 Q46 72 60 76 T88 75 L88.6 114 Q88 122 60 122 Q32 122 32 114Z" fill="url(#s5liq)"/>
   <path d="M33 76 Q46 72 60 76 T88 75" fill="none" stroke="#fff7d0" stroke-width="1.4" opacity=".9"/>
   <ellipse cx="60" cy="50" rx="27" ry="6" fill="#2a1d08" stroke="#0d0b10" stroke-width="1.6"/><ellipse cx="60" cy="49" rx="20" ry="3.6" fill="#5b4013"/>
   <path d="M40 58 V110" stroke="#fffbe6" stroke-width="3" opacity=".45" stroke-linecap="round"/></g>
  <!-- U1: the junction, a gold via -->
  <circle cx="60" cy="152" r="10" fill="#0d0b10"/><circle cx="60" cy="152" r="7.5" fill="url(#s5au)"/><circle cx="60" cy="152" r="3" fill="#0d0b10"/>
  <!-- K1 right: LED -->
  <circle cx="40" cy="214" r="30" fill="url(#s5gl)" class="ledgl"/>
  <path class="ik" d="M24 228 V206 Q24 188 40 188 Q56 188 56 206 V228Z"/><path d="M27 226 V206 Q27 191 40 191 Q53 191 53 206 V226Z" fill="url(#s5led)"/>
  <path d="M33 200 Q35 194 41 193" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".85"/>
  <rect x="21" y="226" width="38" height="7" rx="2" fill="#0d0b10"/><rect x="23" y="227" width="34" height="4" rx="1.5" fill="url(#s5au)"/>
  <!-- K1 wrong: blown fuse -->
  <circle cx="134" cy="250" r="26" fill="url(#s5rg)"/>
  <path class="ik" d="M102 240 H118 V260 H102Z M150 240 H166 V260 H150Z"/><rect x="104" y="242" width="12" height="16" fill="url(#s5au)"/><rect x="152" y="242" width="12" height="16" fill="url(#s5au)"/>
  <path d="M117 243 H151 V257 H117Z" fill="url(#s5gls)" stroke="#0d0b10" stroke-width="2"/>
  <path d="M118 250 H128 L131 247" stroke="#3a2a14" stroke-width="1.8" fill="none"/><path d="M137 253 L140 250 H151" stroke="#3a2a14" stroke-width="1.8" fill="none"/>
  <path d="M129 252 Q133 249 137 251" stroke="#160d08" stroke-width="3" fill="none" opacity=".8"/>
  <g class="spk"><circle cx="133" cy="244" r="1.3"/><circle cx="138" cy="241" r="1"/><circle cx="128" cy="240" r=".9"/><circle cx="141" cy="246" r=".8"/></g>
  <path class="smk" d="M134 242 C128 232 140 226 133 216 C128 208 137 202 134 194" fill="none" stroke="#d9d4c8" stroke-width="2.4" stroke-linecap="round" opacity=".45"/>
 </svg>`;
 const st=`<div class="s5w">${svg}
  <p class="s5-l s5-l1"><span class="big">${D.share}%</span> of $EZ creator fees fill the pool.</p>
  <p class="s5-l s5-l2">The pool gets bet on the top AI's call. Today that's ${BT2.lead(D)}.</p>
  <p class="s5-l s5-l3"><em class="s5-ok">Right</em> $EZ buyback</p>
  <p class="s5-l s5-l4"><em class="s5-no">Wrong</em> The pool can be wiped out</p></div>`;
 BT2.build(sec,D,st,'s5');
});
