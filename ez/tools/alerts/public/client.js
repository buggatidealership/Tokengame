// Earnings Zeason alerts, browser side. Served at /api/client.js.
//   <link rel="manifest" href="/manifest.webmanifest">          (iPhone: web push only works from the Home Screen app)
//   <script src="/api/client.js" defer></script>
//   button.onclick = () => EZAlerts.follow('grok')   // must run inside a tap: the permission prompt needs it
//   EZAlerts.unfollow('grok'), EZAlerts.following(), EZAlerts.status(), EZAlerts.telegramLink('grok')
(() => {
  const API = '/api';
  const bytes = b64 => { const s = b64.replace(/-/g, '+').replace(/_/g, '/'), bin = atob(s + '='.repeat((4 - s.length % 4) % 4)); return Uint8Array.from(bin, c => c.charCodeAt(0)) };
  const post = (p, b) => fetch(API + p, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(b) }).then(r => r.json());
  const ios = () => /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const standalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  let cfg;
  const config = async () => cfg || (cfg = await fetch(API + '/config').then(r => r.json()));

  // 'ok' | 'install' (iPhone outside the Home Screen app) | 'denied' | 'unsupported'
  function status() {
    if (ios() && !standalone()) return 'install';
    if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) return 'unsupported';
    return Notification.permission === 'denied' ? 'denied' : 'ok';
  }
  async function subscription(ask) {
    const reg = await navigator.serviceWorker.register('/sw.js');
    await navigator.serviceWorker.ready;
    let s = await reg.pushManager.getSubscription();
    if (!s && ask) s = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: bytes((await config()).vapidKey) });
    return s;
  }
  async function follow(ai) {
    const st = status(); if (st !== 'ok') return { ok: false, status: st };
    // ask first, before any other await, so the browser still sees the tap
    const perm = Notification.permission === 'granted' ? 'granted' : await Notification.requestPermission();
    if (perm !== 'granted') return { ok: false, status: 'denied' };
    const s = await subscription(true);
    return post('/follow', { subscription: s.toJSON(), ais: [].concat(ai) });
  }
  async function unfollow(ai) { const s = await subscription(false); return s ? post('/unfollow', { endpoint: s.endpoint, ais: ai ? [].concat(ai) : [] }) : { ok: true, ais: [] } }
  async function following() { if (status() !== 'ok') return []; const s = await subscription(false); return s ? (await post('/following', { endpoint: s.endpoint })).ais || [] : [] }
  async function telegramLink(ai) { const c = await config(); return c.telegramBot ? `https://t.me/${c.telegramBot}?start=${ai}` : null }
  window.EZAlerts = { follow, unfollow, following, status, telegramLink };
})();
