// Web Push with nothing but WebCrypto (Cloudflare Workers, Node 20+, browsers). Vendored on purpose: about 120 lines, no dependency.
//   RFC 8291  Message Encryption for Web Push (aes128gcm content coding, RFC 8188), one record
//   RFC 8292  VAPID: an ES256 JWT in "Authorization: vapid t=<jwt>, k=<public key>"
//   RFC 8030  the push request: POST to the subscription's endpoint with TTL, Urgency, Topic
// Checked by test/run.mjs against RFC 8291 Appendix A (exact bytes) and decrypted by an independent node:crypto implementation.

const te = new TextEncoder();
const subtle = () => globalThis.crypto.subtle;

export const b64u = {
  enc(buf) {
    const b = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
    let s = ''; for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  },
  dec(str) {
    const s = String(str).replace(/\s+/g, '').replace(/-/g, '+').replace(/_/g, '/');
    const bin = atob(s + '='.repeat((4 - (s.length % 4)) % 4));
    const out = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  },
};
const cat = (...parts) => { const n = parts.reduce((s, p) => s + p.length, 0), o = new Uint8Array(n); let i = 0; for (const p of parts) { o.set(p, i); i += p.length } return o };

async function hkdf(salt, ikm, info, bytes) {
  const k = await subtle().importKey('raw', ikm, 'HKDF', false, ['deriveBits']);
  return new Uint8Array(await subtle().deriveBits({ name: 'HKDF', hash: 'SHA-256', salt, info }, k, bytes * 8));
}

// a P-256 key pair as a WebCrypto private key from raw base64url d and the 65-byte uncompressed public point
export function jwkFrom(dB64u, pubB64u, use) {
  const pub = b64u.dec(pubB64u);
  if (pub.length !== 65 || pub[0] !== 4) throw new Error('public key must be a 65-byte uncompressed P-256 point');
  return { kty: 'EC', crv: 'P-256', d: dB64u, x: b64u.enc(pub.slice(1, 33)), y: b64u.enc(pub.slice(33, 65)), ext: true, ...(use ? { key_ops: use } : {}) };
}

// RFC 8291 section 3 + RFC 8188: returns the request body (86-byte header + ciphertext). `test` injects salt and the sender key pair.
export async function encrypt(plaintext, { p256dh, auth }, test = {}) {
  const uaPublic = typeof p256dh === 'string' ? b64u.dec(p256dh) : p256dh;
  const authSecret = typeof auth === 'string' ? b64u.dec(auth) : auth;
  if (uaPublic.length !== 65 || uaPublic[0] !== 4) throw new Error('p256dh must be a 65-byte uncompressed P-256 point');
  if (authSecret.length !== 16) throw new Error('auth must be 16 bytes');
  const data = typeof plaintext === 'string' ? te.encode(plaintext) : plaintext;
  const RS = 4096;
  if (data.length + 1 + 16 > RS) throw new Error('payload too large for one record');

  let asPrivate, asPublic;
  if (test.asPrivate) {
    asPrivate = await subtle().importKey('jwk', jwkFrom(test.asPrivate, test.asPublic), { name: 'ECDH', namedCurve: 'P-256' }, false, ['deriveBits']);
    asPublic = b64u.dec(test.asPublic);
  } else { // a fresh sender key pair for every message
    const kp = await subtle().generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits']);
    asPrivate = kp.privateKey; asPublic = new Uint8Array(await subtle().exportKey('raw', kp.publicKey));
  }
  const uaKey = await subtle().importKey('raw', uaPublic, { name: 'ECDH', namedCurve: 'P-256' }, false, []);
  const ecdhSecret = new Uint8Array(await subtle().deriveBits({ name: 'ECDH', public: uaKey }, asPrivate, 256));

  // IKM = HKDF(auth_secret, ecdh_secret, "WebPush: info" || 0x00 || ua_public || as_public, 32)
  const keyInfo = cat(te.encode('WebPush: info\0'), uaPublic, asPublic);
  const ikm = await hkdf(authSecret, ecdhSecret, keyInfo, 32);
  const salt = test.salt ? b64u.dec(test.salt) : crypto.getRandomValues(new Uint8Array(16));
  const cek = await hkdf(salt, ikm, te.encode('Content-Encoding: aes128gcm\0'), 16);
  const nonce = await hkdf(salt, ikm, te.encode('Content-Encoding: nonce\0'), 12);

  const key = await subtle().importKey('raw', cek, 'AES-GCM', false, ['encrypt']);
  const padded = cat(data, new Uint8Array([2])); // last (and only) record: padding delimiter 0x02, no extra padding
  const ct = new Uint8Array(await subtle().encrypt({ name: 'AES-GCM', iv: nonce, tagLength: 128 }, key, padded));

  const header = new Uint8Array(16 + 4 + 1 + 65);
  header.set(salt, 0); new DataView(header.buffer).setUint32(16, RS); header[20] = 65; header.set(asPublic, 21);
  return cat(header, ct);
}

// RFC 8292: "vapid t=<ES256 JWT>, k=<public key>"; the JWT's aud is the push service's origin, valid 12 hours
export async function vapidAuth(endpoint, { publicKey, privateKey, subject }, now = Date.now()) {
  if (!/^(mailto:|https:\/\/)/.test(subject || '')) throw new Error('VAPID subject must be a mailto: or https: URL');
  const head = b64u.enc(te.encode(JSON.stringify({ typ: 'JWT', alg: 'ES256' })));
  const claims = b64u.enc(te.encode(JSON.stringify({ aud: new URL(endpoint).origin, exp: Math.floor(now / 1000) + 12 * 3600, sub: subject })));
  const key = await subtle().importKey('jwk', jwkFrom(privateKey, publicKey), { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']);
  const sig = new Uint8Array(await subtle().sign({ name: 'ECDSA', hash: 'SHA-256' }, key, te.encode(head + '.' + claims))); // raw r||s, as JWS wants
  return `vapid t=${head}.${claims}.${b64u.enc(sig)}, k=${publicKey}`;
}

// One push. Returns { ok, status, gone, retryAfter } and never throws for HTTP outcomes.
export async function sendPush(sub, message, vapid, { fetch: f = globalThis.fetch, now = Date.now(), jwtCache } = {}) {
  const payload = JSON.stringify({ title: message.title, body: message.body, url: message.url, tag: message.tag });
  const body = await encrypt(payload, sub.keys);
  const aud = new URL(sub.endpoint).origin;
  let auth = jwtCache && jwtCache.get(aud);
  if (!auth) { auth = await vapidAuth(sub.endpoint, vapid, now); if (jwtCache) jwtCache.set(aud, auth) }
  const headers = { 'Content-Encoding': 'aes128gcm', 'Content-Type': 'application/octet-stream', TTL: String(message.ttl ?? 3600), Urgency: message.urgency || 'normal', Authorization: auth };
  if (message.topic && /^[A-Za-z0-9_-]{1,32}$/.test(message.topic)) headers.Topic = message.topic;
  let res;
  try { res = await f(sub.endpoint, { method: 'POST', headers, body }) } catch (e) { return { ok: false, status: 0, error: String(e && e.message || e) } }
  const ra = res.headers.get('retry-after');
  return { ok: res.status >= 200 && res.status < 300, status: res.status, gone: res.status === 404 || res.status === 410, retryAfter: ra ? (+ra || 60) : null };
}

// push services a subscription endpoint may point to (stops /api/follow from turning the Worker into a request relay)
export const PUSH_HOSTS = [/^fcm\.googleapis\.com$/, /^updates\.push\.services\.mozilla\.com$/, /^web\.push\.apple\.com$/, /(^|\.)push\.apple\.com$/, /\.notify\.windows\.com$/, /^android\.googleapis\.com$/];
export function endpointAllowed(endpoint, env = {}) {
  let u; try { u = new URL(endpoint) } catch { return false }
  if (env.ALLOW_TEST_ENDPOINTS === '1' && u.protocol === 'http:' && (u.hostname === '127.0.0.1' || u.hostname === 'localhost')) return true; // local tests only
  return u.protocol === 'https:' && PUSH_HOSTS.some(re => re.test(u.hostname));
}
