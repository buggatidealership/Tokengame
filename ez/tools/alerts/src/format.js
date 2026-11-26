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

// several events of one kind for one follower in one poll -> one message (the 20 Nov close graded 15 trades at once)
//   one AI, trades:   "Grok posted 3 trades"        one line per trade
//   one AI, results:  "Grok's 3 trades are graded"  one line per trade, then the total P&L
//   several AIs:      trades one line per company ("Intuit: GPT LONG +4.5%, Claude SHORT −4%, ..."),
//                     results one line per AI with its P&L over these trades, best first ("Grok P&L +$17,660 · 2 of 3 right")
export function digest(evs, env = {}) {
  const ais = [...new Set(evs.map(e => e.aiName))], solo = ais.length === 1, n = evs.length;
  const cos = [...new Set(evs.map(e => e.company))], coList = cos.length <= 3 ? cos.join(', ') : `${cos.length} companies`;
  const results = evs.every(e => e.type === 'GRADED' || e.type === 'GRADE_EDITED');
  const val = e => (e.type === 'GRADE_EDITED' ? e.to : e);
  const fix = evs.some(e => e.type.endsWith('_EDITED')) ? ' (with corrections)' : '';
  let title, lines;
  if (results && solo) {
    title = `${ais[0]}'s ${n} trades are graded${fix}`;
    lines = evs.map(e => `${e.company} ${val(e).side}, ${verdict(val(e).right)}, ${pnl(val(e).pnl)}`);
    lines.push(`Total ${pnl(evs.reduce((s, e) => s + val(e).pnl, 0))}`);
  } else if (results) {
    title = `${coList} graded${fix}`;
    const by = new Map(); for (const e of evs) { const b = by.get(e.aiName) || { p: 0, r: 0, n: 0 }; b.p += val(e).pnl; b.r += val(e).right === true ? 1 : 0; b.n++; by.set(e.aiName, b) }
    lines = [...by].sort((a, b) => b[1].p - a[1].p).map(([k, b]) => `${k} ${pnl(b.p)} · ${b.r} of ${b.n} right`);
  } else if (solo) {
    title = `${ais[0]} posted ${n} trades${fix}`;
    lines = evs.map(e => (e.type === 'CALL_EDITED' ? `${e.company} ${e.to.side} ${size(e.to.side, e.to.size)} (correction)` : `${e.company} ${e.side} ${size(e.side, e.size)}${conf(e.conf)}`));
  } else {
    title = `${n} new trades${fix}`;
    lines = cos.map(c => `${c}: ` + evs.filter(e => e.company === c).map(e => (e.type === 'CALL_EDITED' ? `${e.aiName} ${e.to.side} ${size(e.to.side, e.to.size)} (correction)` : `${e.aiName} ${e.side} ${size(e.side, e.size)}`)).join(', '));
  }
  const MAX = 8; if (lines.length > MAX) lines = [...lines.slice(0, MAX - 1), `+${lines.length - MAX + 1} more`];
  const first = evs[0], kind = results ? 'graded' : 'trades';
  return { title, body: lines.join('\n'), text: `${title}\n${lines.join('\n')}`, url: url(first, env), tag: `ez-${kind}-${first.round}`,
    topic: `d-${kind}-${first.round}`.slice(0, 32), ttl: results ? 24 * 3600 : 6 * 3600, urgency: 'high' };
}

// words an alert must never contain (checked by the tests on every message they produce)
export const BANNED = /\b(made|lost|won|wins|paper|simulated|bet on|up or down)\b/i;
