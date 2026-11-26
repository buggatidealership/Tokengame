// Telegram bot channel. Off until the owner creates the bot (@BotFather) and sets TG_TOKEN; every function skips cleanly without it.
//   Deep links: https://t.me/<bot>?start=grok  (start parameter: gpt | claude | grok | gemini | qwen | all)
//   Commands:   /start [ai], /follow <ai>, /stop [ai], /list, /help
// The webhook answers in its own HTTP response (Telegram accepts one method call there), so a reply costs no extra request.
// Telegram's limits: about 30 messages a second per bot, about 1 a second per chat; the dispatcher stays well under both.

import { AIS, AI_BY_SLUG } from './sheet.js';
import { cleanAis } from './store.js';

export const tgEnabled = env => !!(env && env.TG_TOKEN);
const api = env => `${env.TG_API_BASE || 'https://api.telegram.org'}/bot${env.TG_TOKEN}`;
const nameOf = s => (s === 'all' ? 'all five AIs' : (AI_BY_SLUG[s] || {}).name || s);
const list = ss => ss.map(nameOf).join(', ');

export async function tgSend(env, chatId, msg, f = globalThis.fetch) {
  if (!tgEnabled(env)) return { ok: false, skipped: 'no TG_TOKEN' };
  const body = { chat_id: chatId, text: msg.text, link_preview_options: { is_disabled: true } };
  if (msg.url) body.reply_markup = { inline_keyboard: [[{ text: 'Open', url: msg.url }]] };
  let res; try { res = await f(`${api(env)}/sendMessage`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }) }
  catch (e) { return { ok: false, status: 0, error: String(e && e.message || e) } }
  let j = {}; try { j = await res.json() } catch {}
  const retryAfter = j.parameters && j.parameters.retry_after ? j.parameters.retry_after : null;
  // 403: the user blocked the bot or left; 400 "chat not found": gone too
  const gone = res.status === 403 || (res.status === 400 && /chat not found/i.test(j.description || ''));
  return { ok: !!j.ok, status: res.status, gone, retryAfter, error: j.ok ? null : j.description };
}

const keyboard = () => ({ inline_keyboard: [AIS.slice(0, 3).map(a => ({ text: a.name, callback_data: 'f:' + a.slug })), [...AIS.slice(3).map(a => ({ text: a.name, callback_data: 'f:' + a.slug })), { text: 'All five', callback_data: 'f:all' }]] });
const reply = (chatId, text, extra = {}) => new Response(JSON.stringify({ method: 'sendMessage', chat_id: chatId, text, ...extra }), { headers: { 'content-type': 'application/json' } });
const HELP = 'Pick an AI to follow. You get its trade the moment it lands, before the earnings report, and its P&L at the close.\n/stop to stop everything, /stop grok for one AI, /list to see what you follow.';

// constant-time string compare (the webhook secret)
export function same(a, b) {
  a = String(a || ''); b = String(b || '');
  let d = a.length ^ b.length; for (let i = 0; i < Math.max(a.length, b.length); i++) d |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return d === 0 && a.length > 0;
}

export async function handleWebhook(request, env, store) {
  if (!tgEnabled(env) || !env.TG_WEBHOOK_SECRET) return new Response('telegram is not configured', { status: 503 });
  if (!same(request.headers.get('x-telegram-bot-api-secret-token'), env.TG_WEBHOOK_SECRET)) return new Response('forbidden', { status: 401 });
  let u; try { u = await request.json() } catch { return new Response('bad json', { status: 400 }) }

  if (u.callback_query) { // a tap on the /start keyboard
    const q = u.callback_query, chatId = q.message && q.message.chat && q.message.chat.id, ais = cleanAis(String(q.data || '').replace(/^f:/, ''));
    if (!chatId || !ais.length) return new Response('ok');
    const now = await store.followTelegram(chatId, ais);
    return new Response(JSON.stringify({ method: 'answerCallbackQuery', callback_query_id: q.id, text: `You follow ${list(now)}. /stop to stop.` }), { headers: { 'content-type': 'application/json' } });
  }
  const m = u.message || u.channel_post; if (!m || !m.chat || typeof m.text !== 'string') return new Response('ok');
  const chatId = m.chat.id, [cmd0, ...args] = m.text.trim().split(/\s+/), cmd = cmd0.toLowerCase().replace(/@\w+$/, ''); // "/start@ez_bot grok"
  const ais = cleanAis(args.flatMap(a => a.split(/[,+]/)));

  if (cmd === '/start' || cmd === '/follow') {
    if (!ais.length) return reply(chatId, HELP, { reply_markup: keyboard() });
    const now = await store.followTelegram(chatId, ais);
    return reply(chatId, `You follow ${list(now)}. You'll get each trade as it lands and its P&L at the close.\n/stop to stop.`);
  }
  if (cmd === '/stop' || cmd === '/unfollow') {
    const now = await store.unfollowTelegram(chatId, ais);
    return reply(chatId, now.length ? `Stopped. You still follow ${list(now)}.` : 'Stopped. No more alerts. /start to follow again.');
  }
  if (cmd === '/list') { const now = await store.telegramFollows(chatId); return reply(chatId, now.length ? `You follow ${list(now)}.` : 'You follow no AI yet.', now.length ? {} : { reply_markup: keyboard() }) }
  if (cmd === '/help') return reply(chatId, HELP, { reply_markup: keyboard() });
  return new Response('ok');
}

// once, after TG_TOKEN and TG_WEBHOOK_SECRET are set: point the bot at the Worker and list its commands
export async function tgSetup(env, f = globalThis.fetch) {
  if (!tgEnabled(env) || !env.TG_WEBHOOK_SECRET) return { ok: false, error: 'set TG_TOKEN and TG_WEBHOOK_SECRET first' };
  const call = (m, b) => f(`${api(env)}/${m}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(b) }).then(r => r.json());
  const origin = (env.SITE_ORIGIN || 'https://earningszn.xyz').replace(/\/$/, '');
  const hook = await call('setWebhook', { url: `${origin}/api/tg`, secret_token: env.TG_WEBHOOK_SECRET, allowed_updates: ['message', 'callback_query'], drop_pending_updates: true });
  const cmds = await call('setMyCommands', { commands: [{ command: 'start', description: 'Follow an AI' }, { command: 'list', description: 'What you follow' }, { command: 'stop', description: 'Stop alerts' }] });
  const me = await call('getMe', {});
  return { ok: !!(hook.ok && cmds.ok), webhook: hook.description || hook.ok, bot: me.result && me.result.username };
}
