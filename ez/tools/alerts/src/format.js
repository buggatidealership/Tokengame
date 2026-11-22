// Alert wording. Project rules (CLAUDE.md, video wording): an AI's side is LONG or SHORT and nothing else; money is a signed P&L
// ("P&L +$12,790", "P&L −$2,200"), never "made", "lost" or "won" as the verb for an AI's result; never "paper" or "simulated".
// A stock itself may close −12.77%. The minus sign is U+2212, as on the site.

const MINUS = '−';
const group = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
export const money = v => (v === 0 ? '$0' : (v < 0 ? MINUS : '+') + '$' + group(Math.abs(v)));
export const pnl = v => 'P&L ' + money(v);
const trim = n => String(+(+n).toFixed(2)); // 2.40 -> "2.4", 4 -> "4"
export const size = (side, s) => (side === 'SHORT' ? MINUS : '+') + trim(s) + '%';
export const move = m => (m < 0 ? MINUS : m > 0 ? '+' : '') + Math.abs(m).toFixed(2) + '%';
const verdict = r => (r === true ? 'right' : r === false ? 'wrong' : 'flat');
const conf = c => (c != null ? ` · ${trim(c)}% confident` : '');

export function url(e, env = {}) {
  const tpl = env.POST_URL || 'https://earningszn.xyz/';
  return tpl.replace(/\{round\}/g, e.round).replace(/\{ticker\}/g, encodeURIComponent(e.ticker)).replace(/\{ai\}/g, e.slug);
}

// one event -> { title, body, text (Telegram, one block), url, tag, topic, ttl, urgency }
export function one(e, env = {}) {
  const u = url(e, env), tag = `ez-${e.slug}-${e.round}`, topic = `r${e.round}-${e.slug}`.slice(0, 32);
  if (e.type === 'CALL_IN') {
    const title = `${e.aiName} posted its ${e.company} trade`, body = `${e.side} ${size(e.side, e.size)}${conf(e.conf)}`;
    return { title, body, text: `${title}\n${body}`, url: u, tag, topic, ttl: 6 * 3600, urgency: 'high' };
  }
  if (e.type === 'GRADED') {
    const line = `${e.side}, ${verdict(e.right)}, ${pnl(e.pnl)}`;
    return { title: `${e.aiName}'s ${e.company} trade`, body: `${line}\n${e.company} ${move(e.move)}`,
      text: `${e.aiName}'s ${e.company} trade: ${line}\n${e.company} ${move(e.move)}`, url: u, tag, topic, ttl: 24 * 3600, urgency: 'high' };
  }
  if (e.type === 'CALL_EDITED') {
    const title = `Correction: ${e.aiName}'s ${e.company} trade`, body = `${e.to.side} ${size(e.to.side, e.to.size)} (the sheet had ${e.from.side} ${size(e.from.side, e.from.size)})`;
    return { title, body, text: `${title}\n${body}`, url: u, tag, topic, ttl: 6 * 3600, urgency: 'high' };
  }
  if (e.type === 'GRADE_EDITED') {
    const title = `Correction: ${e.aiName}'s ${e.company} trade`, body = `${e.to.side}, ${verdict(e.to.right)}, ${pnl(e.to.pnl)}\n${e.company} ${move(e.to.move)}`;
    return { title, body, text: `${title}\n${body}`, url: u, tag, topic, ttl: 24 * 3600, urgency: 'high' };
  }
  throw new Error('no wording for ' + e.type);
}

// several events for one follower in one poll -> one message (the 20 Nov close graded 3 trades per AI at once)
export function digest(evs, env = {}) {
  const ais = [...new Set(evs.map(e => e.aiName))], solo = ais.length === 1, who = e => (solo ? '' : `${e.aiName} · `);
  const kind = evs.every(e => e.type === 'GRADED') ? 'GRADED' : evs.every(e => e.type === 'CALL_IN') ? 'CALL_IN' : 'MIXED';
  const lines = evs.map(e => {
    if (e.type === 'CALL_IN') return `${who(e)}${e.company} ${e.side} ${size(e.side, e.size)}${conf(e.conf)}`;
    if (e.type === 'GRADED') return `${who(e)}${e.company} ${e.side}, ${verdict(e.right)}, ${pnl(e.pnl)}`;
    const m = one(e, env); return `${who(e)}${m.title.replace(/^Correction: .*'s /, 'Correction: ')}: ${m.body.split('\n')[0]}`;
  });
  const MAX = 8, shown = lines.length > MAX ? [...lines.slice(0, MAX - 1), `+${lines.length - MAX + 1} more`] : lines;
  if (kind === 'GRADED' && solo) shown.push(`Total ${pnl(evs.reduce((s, e) => s + e.pnl, 0))}`);
  const n = evs.length;
  const title = kind === 'CALL_IN' ? (solo ? `${ais[0]} posted ${n} trades` : `${n} new trades`)
    : kind === 'GRADED' ? (solo ? `${ais[0]}'s ${n} trades are graded` : `${n} trades graded`)
    : (solo ? `${ais[0]}: ${n} updates` : `${n} updates`);
  const first = evs[0], u = url(first, env);
  return { title, body: shown.join('\n'), text: `${title}\n${shown.join('\n')}`, url: u, tag: `ez-digest-${kind.toLowerCase()}-${first.round}`,
    topic: `d-${kind.toLowerCase()}-${first.round}`.slice(0, 32), ttl: kind === 'CALL_IN' ? 6 * 3600 : 24 * 3600, urgency: 'high' };
}

// words an alert must never contain (checked by the tests on every message they produce)
export const BANNED = /\b(made|lost|won|wins|paper|simulated|bet on|up or down)\b/i;
