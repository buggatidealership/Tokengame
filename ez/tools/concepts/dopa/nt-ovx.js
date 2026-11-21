// nt-ovx.js: motion helpers for the outcome desk's takes (load after nt-ov.js). The night BRIEF's "exciting" checks are wrapqa's: something
// moves in every half second and the median motion is at least 6 grey levels. A held board or the end card alone fails them, so:
// (1) the beat light: on every beat of the bed the ground flares and the camera gives a small punch, decaying in about 0.15 s;
// (2) the end card moves to its last frame: gold rays turn behind the logo, the logo breathes on the beat and pushes in slowly.
OV.kick = (t, G, from = -1e9, to = 1e9) => { if (t < from || t > to) return 0; const x = ((t - G.B(0)) % G.p + G.p) % G.p; return Math.exp(-x * 16) };
// apply the beat light: ground elements brighten, the camera element gets an extra punch on top of its own transform
OV.beat = (t, G, grounds, cam, amp = .22, punch = .010, from = -1e9, to = 1e9) => { const k = OV.kick(t, G, from, to);
  grounds.forEach(g => { if (g) g.style.filter = `brightness(${(1 + amp * k).toFixed(3)})` });
  if (cam) cam.style.transform += ` scale(${(1 + punch * k).toFixed(4)})`; return k };
OV.endFx = (t, t0, G) => { const e = L.$('#ovend'); if (!e) return;
  let r = L.$('#ovrays'); if (!r) { r = document.createElement('div'); r.id = 'ovrays';
    r.style.cssText = 'position:absolute;left:50%;top:46%;width:1700px;height:1700px;margin:-850px 0 0 -850px;border-radius:50%;pointer-events:none;' +
      'background:repeating-conic-gradient(from 0deg,rgba(253,188,42,.5) 0deg 5deg,rgba(253,188,42,0) 5deg 15deg);' +
      '-webkit-mask:radial-gradient(closest-side,#000 18%,rgba(0,0,0,.55) 45%,transparent 100%);mask:radial-gradient(closest-side,#000 18%,rgba(0,0,0,.55) 45%,transparent 100%)';
    e.insertBefore(r, e.firstChild) }
  const k = OV.kick(t, G, t0), on = L.n(t, t0, t0 + .4);
  r.style.opacity = (on * (.28 + .5 * k)).toFixed(3); r.style.transform = `rotate(${((t - t0) * 16).toFixed(2)}deg) scale(${(1 + .04 * (t - t0)).toFixed(4)})`;
  const im = e.querySelector('img'); im.style.transform += ` scale(${(1 + .035 * (t - t0) + .05 * k).toFixed(4)})`;
};
