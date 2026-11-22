// Earnings Zeason push service worker: push and notificationclick only. No fetch handler and no caching, so it never touches how
// the site loads. Every push shows a notification (iPhone requires it: a push without one can cost the subscription).
self.addEventListener('push', event => {
  let d = {};
  try { d = event.data ? event.data.json() : {} } catch (e) { d = { body: event.data ? event.data.text() : '' } }
  event.waitUntil(self.registration.showNotification(d.title || 'Earnings Zeason', {
    body: d.body || '',
    icon: '/media/icon-180.png',
    badge: '/media/icon-32.png',
    tag: d.tag || undefined,
    renotify: !!d.tag,
    data: { url: d.url || '/' },
  }));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const target = new URL((event.notification.data && event.notification.data.url) || '/', self.location.origin).href;
  event.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(wins => {
    for (const w of wins) if (w.url === target && 'focus' in w) return w.focus();
    return self.clients.openWindow(target);
  }));
});
