// An in-memory stand-in for a Workers KV namespace (get, put with metadata, delete, list by prefix with metadata and cursors),
// optionally persisted to a JSON file so the dry-run CLI keeps state between runs. Counts operations per kind.
import fs from 'node:fs';

export function kvStub(file) {
  let m = new Map();
  if (file && fs.existsSync(file)) m = new Map(Object.entries(JSON.parse(fs.readFileSync(file, 'utf8'))));
  const ops = { get: 0, put: 0, delete: 0, list: 0 };
  const persist = () => { if (file) fs.writeFileSync(file, JSON.stringify(Object.fromEntries(m), null, 1)) };
  return {
    ops, map: m,
    reset() { for (const k in ops) ops[k] = 0 },
    async get(k, type) { ops.get++; const e = m.get(k); if (!e) return null; return type === 'json' ? JSON.parse(e.v) : e.v },
    async put(k, v, o = {}) { ops.put++; if (typeof v !== 'string') throw new Error('stub: put a string'); if (o.metadata && JSON.stringify(o.metadata).length > 1024) throw new Error('KV metadata over 1024 bytes'); m.set(k, { v, md: o.metadata || null }); persist() },
    async delete(k) { ops.delete++; m.delete(k); persist() },
    async list({ prefix = '', cursor, limit = 1000 } = {}) {
      ops.list++;
      const all = [...m.keys()].filter(k => k.startsWith(prefix)).sort(), start = cursor ? +cursor : 0, page = all.slice(start, start + limit);
      const done = start + limit >= all.length;
      return { keys: page.map(name => ({ name, metadata: m.get(name).md })), list_complete: done, cursor: done ? undefined : String(start + limit) };
    },
  };
}
