// node scripts/vapid-keygen.mjs --out <directory outside the repo> [--force]
// Makes the VAPID key pair (P-256) for Web Push.
//   public key  -> ez/tools/alerts/vapid-public.txt (committed; it is public) and printed
//   private key -> <out>/vapid-private.txt, mode 600, base64url of the 32-byte scalar d (the format web-push libraries use)
// The private key is never printed. The script refuses an --out inside the git repo, and refuses to replace an existing pair
// without --force: every browser subscription is bound to the public key, so a new pair silently orphans every follower.
// Then: npx wrangler@4.166.0 secret put VAPID_PRIVATE_KEY < <out>/vapid-private.txt
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { b64u } from '../src/webpush.js';

const HERE = path.dirname(fileURLToPath(import.meta.url)), ROOT = path.resolve(HERE, '..');
const i = process.argv.indexOf('--out'), out = i > 0 ? path.resolve(process.argv[i + 1]) : null, force = process.argv.includes('--force');
if (!out) { console.error('usage: node scripts/vapid-keygen.mjs --out <directory outside the repo> [--force]'); process.exit(1) }
const repo = execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd: ROOT }).toString().trim();
if (out === repo || out.startsWith(repo + path.sep)) { console.error('refusing: --out is inside the git repo (' + repo + ')'); process.exit(1) }
const privFile = path.join(out, 'vapid-private.txt'), pubFile = path.join(ROOT, 'vapid-public.txt');
if (fs.existsSync(privFile) && !force) { console.error('refusing: ' + privFile + ' exists (a new pair orphans every subscriber; --force to replace it)'); process.exit(1) }

const kp = await crypto.subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, true, ['sign', 'verify']);
const jwk = await crypto.subtle.exportKey('jwk', kp.privateKey);
const pub = new Uint8Array(await crypto.subtle.exportKey('raw', kp.publicKey)); // 65 bytes, 0x04 || x || y
if (pub.length !== 65 || b64u.enc(pub.slice(1, 33)) !== jwk.x) throw new Error('key export check failed');

fs.mkdirSync(out, { recursive: true, mode: 0o700 });
fs.writeFileSync(privFile, jwk.d + '\n', { mode: 0o600 });
fs.writeFileSync(pubFile, b64u.enc(pub) + '\n');
console.log(b64u.enc(pub));
console.error(`public key -> ${path.relative(process.cwd(), pubFile)} (also set it as VAPID_PUBLIC_KEY in wrangler.toml); private key written to ${privFile} (not shown)`);
