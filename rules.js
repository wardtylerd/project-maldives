/* Project Maldives — progress math, the Part H adjustment rules, and pattern flags.
   Everything here is plain arithmetic on your log. No AI, no network.
   Thresholds and wording come from the "Adjustment rules" table in plan.md;
   this file decides WHEN each rule applies. */
'use strict';

/* ---------- basic series ---------- */
const num = v => (v === '' || v == null || isNaN(+v)) ? null : +v;
function logVal(s, k){ const L = LOG.days[s]; return L ? num(L[k]) : null; }
/** Morning weigh-ins, skipping anything outside the plan's weight_min–weight_max (typos). */
function weighIns(upto){ return Object.keys(LOG.days).sort().filter(d => !upto || d <= upto).map(d => ({ d, w: logVal(d,'weight') })).filter(x => x.w > 0 && validWeight(x.w)); }

/** 7-day average weight ending on date s. Needs 3+ weigh-ins in the window. */
function avg7(s){
  const ws = weighIns(s).filter(x => x.d > add(s,-7));
  return ws.length >= 3 ? ws.reduce((a,b) => a + b.w, 0) / ws.length : null;
}
/** Weekly % loss: compares the 7-day average now with `span` days ago, scaled to a week. Positive = losing. */
function weeklyRate(s, span = 7){
  const now = avg7(s), then = avg7(add(s, -span));
  return (now == null || then == null) ? null : (then - now) / then * 100 * (7 / span);
}
function startWeight(){ const w = weighIns(); return w.length ? w[0].w : (num(plan.settings.start_weight) || 195); }
function milestoneShift(){ return startWeight() - (num(plan.settings.start_weight) || 195); }
/** Expected 7-day-average band for a date, interpolated between Part H milestones. */
function band(s){
  const sh = milestoneShift(), sw = (num(plan.settings.start_weight) || 195);
  const pts = [{ d: plan.settings.start, lo: sw, hi: sw }].concat(plan.milestones.map(m => ({ d: m.date, lo: +m.low, hi: +m.high })));
  if (s <= pts[0].d) return [pts[0].lo + sh, pts[0].hi + sh];
  for (let i = 1; i < pts.length; i++){
    if (s <= pts[i].d){ const a = pts[i-1], b = pts[i], t = diff(a.d, s) / diff(a.d, b.d); return [a.lo + (b.lo - a.lo) * t + sh, a.hi + (b.hi - a.hi) * t + sh]; }
  }
  const z = pts[pts.length-1]; return [z.lo + sh, z.hi + sh];
}
function waistSeries(){ return Object.keys(LOG.days).sort().map(d => ({ d, v: logVal(d,'waist') })).filter(x => x.v > 0); }

/** Calorie + protein adherence over the `n` days ending on s: % of days where BOTH were tapped "Hit". Only days with a tap count. */
function adherence(s, n){
  let hit = 0, days = 0;
  for (let i = 0; i < n; i++){
    const d = add(s, -i); if (d < plan.settings.start) break;
    const L = LOG.days[d]; if (!L || (!L.cal && !L.pro)) continue;
    days++; if (L.cal === 'hit' && L.pro === 'hit') hit++;
  }
  return days ? { pct: hit / days * 100, hit, days } : null;
}

/* ---------- key lifts ----------
   Each logged top set becomes an estimated 1-rep max (Epley: w × (1 + reps/30)),
   so 185×6 and 175×8 can be compared. Bodyweight-only sets (weight 0) use reps. */
function keyLifts(){
  const out = [];
  for (const w of Object.values(plan.workouts)) for (const e of w.ex) if (/^y/i.test(e.key || '')) out.push({ key: w.name + '|' + e.exercise, name: e.exercise.replace(/\s*\(.*\)/, ''), workout: w.name });
  return out;
}
const e1rm = t => t && t.r > 0 ? ((t.w || 0) > 0 ? t.w * (1 + t.r / 30) : t.r) : null;
function liftHistory(key, upto){
  return Object.keys(LOG.days).sort().filter(d => !upto || d <= upto).map(d => ({ d, t: (LOG.days[d].lifts || {})[key] })).filter(x => x.t && e1rm(x.t)).map(x => ({ d: x.d, t: x.t, e: e1rm(x.t) }));
}
/** A key lift is "dropping" when its last 2 sessions are both more than pct% below its best earlier session. */
function liftDrop(key, upto, pct){
  const h = liftHistory(key, upto); if (h.length < 3) return null;
  const best = Math.max(...h.slice(0, -2).map(x => x.e)), last2 = h.slice(-2);
  if (!last2.every(x => x.e < best * (1 - pct / 100))) return null;
  return { best, last2, dropPct: Math.min(...last2.map(x => (best - x.e) / best * 100)) };
}

/* ---------- consecutive-day helpers ---------- */
/** The last n calendar days ending on s, each with a value (null if not logged). */
function lastNDays(s, n, k){ const r = []; for (let i = n - 1; i >= 0; i--){ const d = add(s, -i); r.push({ d, v: logVal(d, k) }); } return r; }
const thr = (id, fallback) => { const r = plan.rules[id]; const m = r && String(r.threshold).match(/[\d.]+/g); return m ? +m[0] : fallback; };
const thrHi = (id, fallback) => { const r = plan.rules[id]; const m = r && String(r.threshold).match(/[\d.]+/g); return m && m[1] ? +m[1] : fallback; };
const f1 = v => v == null ? '—' : v.toFixed(1), f2 = v => v == null ? '—' : v.toFixed(2);

/* ---------- the weekly verdict (Part H) ----------
   Checked in the order of the plan.md table. The first rule whose condition is true wins.
   Returns { rule, verdict, why, checks[] } — checks lists every rule with yes/no and the numbers used. */
function weeklyVerdict(s){
  const r7 = weeklyRate(s, 7), r7prev = weeklyRate(add(s, -7), 7), r14 = weeklyRate(s, 14);
  const dayN = diff(plan.settings.start, s) + 1;
  const adh14 = adherence(s, 14);
  const ws = waistSeries().filter(x => x.d <= s);
  const waistNow = ws.length ? ws[ws.length - 1] : null;
  const waistThen = ws.filter(x => x.d <= add(s, -10)).pop() || (ws.length > 1 ? ws[0] : null);
  const waistDelta = waistNow && waistThen && waistNow.d !== waistThen.d ? waistNow.v - waistThen.v : null;
  const sleepT = thr('sleep', 6.5), sl = lastNDays(s, 3, 'sleep');
  const hungerT = thr('hunger', 8), hu = lastNDays(s, 3, 'hunger');
  const liftT = thr('lifts', 10), drops = keyLifts().map(k => ({ k, x: liftDrop(k.key, s, liftT) })).filter(z => z.x);
  const fastT = thr('too_fast', 1.5), loT = thr('on_track', 0.7), hiT = thrHi('on_track', 1.2), stallT = thr('stall', 0.5), adhT = thr('stall_low_adherence', 90);
  const stalled = r14 != null && r14 < stallT && dayN >= 14;

  const C = {
    sleep: { ok: sl.every(x => x.v != null && x.v < sleepT), why: 'Sleep last 3 nights: ' + sl.map(x => x.v == null ? '—' : x.v + ' h').join(', ') + ' (rule: all under ' + sleepT + ' h)' },
    lifts: { ok: drops.length >= 2, why: drops.length ? drops.map(z => z.k.name + ' down ' + z.x.dropPct.toFixed(0) + '% from best').join('; ') + ' (rule: 2+ key lifts)' : 'No key lift down ' + liftT + '%+ for 2 sessions' },
    too_fast: { ok: dayN > 14 && r7 != null && r7prev != null && r7 > fastT && r7prev > fastT, why: 'This week ' + f2(r7) + '%, last week ' + f2(r7prev) + '% (rule: both over ' + fastT + '%, after week 1)' },
    hunger: { ok: hu.every(x => x.v != null && x.v >= hungerT), why: 'Hunger last 3 days: ' + hu.map(x => x.v == null ? '—' : x.v).join(', ') + ' (rule: all ' + hungerT + '+)' },
    on_track: { ok: r7 != null && r7 >= loT && r7 <= hiT, why: 'Weekly rate ' + f2(r7) + '% (target ' + loT + '–' + hiT + '%)' },
    stall_waist_down: { ok: stalled && adh14 && adh14.pct >= adhT && waistDelta != null && waistDelta <= -0.25, why: '14-day rate ' + f2(r14) + '%/wk, adherence ' + (adh14 ? adh14.pct.toFixed(0) + '%' : '—') + ', waist ' + (waistDelta == null ? 'not measured twice' : (waistDelta > 0 ? '+' : '') + waistDelta.toFixed(2) + ' in') },
    stall_low_adherence: { ok: stalled && adh14 && adh14.pct < adhT, why: '14-day rate ' + f2(r14) + '%/wk with ' + (adh14 ? adh14.pct.toFixed(0) + '% (' + adh14.hit + '/' + adh14.days + ' days)' : 'no') + ' calorie+protein adherence' },
    stall: { ok: stalled && !(waistDelta != null && waistDelta <= -0.25), why: '14-day rate ' + f2(r14) + '%/wk (under ' + stallT + '%), waist ' + (waistDelta == null ? 'not measured twice' : (waistDelta > 0 ? '+' : '') + waistDelta.toFixed(2) + ' in') },
    slow_week: { ok: r7 != null && r7 < loT, why: 'Weekly rate ' + f2(r7) + '% (under ' + loT + '%), not a 2-week stall yet' }
  };
  const order = Object.values(plan.rules).sort((a, b) => a.order - b.order).map(r => r.id).filter(id => C[id]);
  const checks = order.map(id => ({ id, label: plan.rules[id].when, ok: !!C[id].ok, why: C[id].why }));
  let hit = checks.find(c => c.ok);

  // Plan rule: no changes during Thanksgiving week.
  const nextPhase = dayPlan(add(s, 1)).ph.phase || '';
  if (hit && /thanksgiving/i.test(nextPhase) && !['on_track','stall_waist_down','slow_week','stall_low_adherence'].includes(hit.id))
    return { rule: hit, verdict: 'Hold: no changes during Thanksgiving week', action: 'The rules point to "' + plan.rules[hit.id].action + '" Make that change on Sunday Nov 29 if it still applies.', why: hit.why, checks, lv: 'warn' };

  if (!hit){
    if (r7 == null) return { rule: null, verdict: 'Not enough weigh-ins yet', action: 'The rules need 3+ weigh-ins this week and 3+ the week before to compute a weekly rate.', why: weighIns(s).length + ' weigh-ins logged so far.', checks, lv: 'info' };
    return { rule: null, verdict: 'On track', action: 'No rule triggered. Change nothing.', why: 'Weekly rate ' + f2(r7) + '%.', checks, lv: 'good' };
  }
  const rule = plan.rules[hit.id], change = !['on_track','stall_waist_down','slow_week','stall_low_adherence'].includes(hit.id);
  return { rule, verdict: change ? 'One change: ' + rule.when.toLowerCase() : 'On track', action: rule.action, why: hit.why, checks, lv: change ? (hit.id === 'sleep' ? 'alert' : 'warn') : 'good' };
}

/* ---------- daily pattern flags ---------- */
function flagsFor(s){
  const out = [];
  const sleepT = thr('sleep', 6.5);
  // Sleep under 6.5 h: 3 nights = rule, 2 nights = heads-up.
  const sl = lastNDays(s, 3, 'sleep');
  if (sl.every(x => x.v != null && x.v < sleepT)) out.push({ lv: 'alert', t: 'Sleep under ' + sleepT + ' h for 3 nights', b: plan.rules.sleep ? plan.rules.sleep.action : '', why: 'Why: Part H sleep rule. Logged ' + sl.map(x => x.v + ' h').join(', ') + '.' });
  else if (sl.slice(1).every(x => x.v != null && x.v < sleepT)) out.push({ lv: 'warn', t: 'Sleep under ' + sleepT + ' h, 2 nights running', b: 'One more night triggers the sleep rule: ' + (plan.rules.sleep ? plan.rules.sleep.action.charAt(0).toLowerCase() + plan.rules.sleep.action.slice(1) : ''), why: 'Why: Part H, "' + (plan.rules.sleep ? plan.rules.sleep.when : '') + '". Logged ' + sl.slice(1).map(x => x.v + ' h').join(' and ') + '.' });
  // Rope missed 3 scheduled (non-optional) rope days running, looking back from yesterday.
  const ropeDays = []; for (let d = add(s, -1); d >= plan.settings.start && ropeDays.length < 3; d = add(d, -1)){ const dp = dayPlan(d); if (dp.rope && !dp.rope.opt) ropeDays.push(d); }
  if (ropeDays.length === 3 && ropeDays.every(d => !(LOG.days[d] && LOG.days[d].checks && LOG.days[d].checks.rope)))
    out.push({ lv: 'warn', t: 'Rope missed 3 sessions running', b: 'Even easy rope counts. If calves or Achilles are sore, swap in a 15-min brisk walk and check that off instead.', why: 'Why: no rope check-off on ' + ropeDays.slice().reverse().map(short).join(', ') + '.' });
  // Protein missed 2+ of the last 7 days.
  const pm = []; for (let i = 0; i < 7; i++){ const d = add(s, -i); if (d < plan.settings.start) break; if (LOG.days[d] && LOG.days[d].pro === 'miss') pm.push(d); }
  if (pm.length >= 2) out.push({ lv: 'warn', t: 'Protein missed ' + pm.length + ' of the last 7 days', b: 'Protein is lever #2 for keeping muscle in the deficit. Front-load it: the breakfast shake alone is 80 g.', why: 'Why: "Missed" tapped on ' + pm.slice().reverse().map(short).join(', ') + '.' });
  // Hunger 8+ for 3 days.
  const hu = lastNDays(s, 3, 'hunger'), hT = thr('hunger', 8);
  if (hu.every(x => x.v != null && x.v >= hT)) out.push({ lv: 'warn', t: 'Hunger ' + hT + '+ for 3 days', b: plan.rules.hunger ? plan.rules.hunger.action : '', why: 'Why: Part H hunger rule. Logged ' + hu.map(x => x.v).join(', ') + '.' });
  // Any key lift dropping.
  const liftT = thr('lifts', 10);
  keyLifts().forEach(k => { const x = liftDrop(k.key, s, liftT); if (x) out.push({ lv: 'warn', t: k.name + ' down ' + x.dropPct.toFixed(0) + '%+ two sessions running', b: 'One lift dipping is a watch item. Two or more triggers the Part H lift rule on Sunday.', why: 'Why: estimated max ' + x.best.toFixed(0) + ' at best, last two ' + x.last2.map(z => z.e.toFixed(0)).join(' and ') + '.' }); });
  // Bloating trend.
  const bl = lastNDays(s, 3, 'bloat').filter(x => x.v != null);
  if (bl.length >= 2 && bl.reduce((a, b) => a + b.v, 0) / bl.length >= 6) out.push({ lv: 'warn', t: 'Bloating running high', b: 'Slow the fiber ramp, cut sugar alcohols and carbonation, drink more water.', why: 'Why: average ' + (bl.reduce((a, b) => a + b.v, 0) / bl.length).toFixed(1) + '/10 over ' + bl.length + ' days (flag at 6+).' });
  // Sunday: the weekly verdict.
  if (parse(s).getDay() === 0 && s <= plan.settings.weigh_in){ const v = weeklyVerdict(s); out.unshift({ lv: v.lv, t: 'Sunday call: ' + v.verdict, b: v.action, why: 'Why: ' + v.why + ' Full logic on Progress.' }); }
  return out;
}

/* ---------- Progress screen ---------- */
function progressExtras(){
  const s = clampDate(todayStr()), ws = weighIns(s), a = avg7(s), r = weeklyRate(s, 7), sw = startWeight();
  const wz = waistSeries();
  const [blo, bhi] = band(s);
  let h = '<div class="stats">' +
    stat(a != null ? f1(a) : (ws.length ? f1(ws[ws.length-1].w) : '—'), a != null ? '7-day average, lb' : 'Latest weight, lb (avg needs 3)') +
    stat(r != null ? f2(r) + '%' : '—', 'Weekly change · target ' + thr('on_track', 0.7) + '–' + thrHi('on_track', 1.2) + '%') +
    (s <= plan.settings.weigh_in && Math.round(blo) !== Math.round(bhi) ? stat(Math.round(blo) + '–' + Math.round(bhi), 'Milestone band today, lb') : stat(String(ws.length), 'Weigh-ins logged')) +
    stat(wz.length > 1 ? ((wz[wz.length-1].v - wz[0].v) > 0 ? '+' : '') + (wz[wz.length-1].v - wz[0].v).toFixed(2) + '"' : (wz.length ? wz[0].v + '"' : '—'), wz.length > 1 ? 'Waist change' : 'Waist') + '</div>';
  h += '<div class="card chart"><h3>Weight</h3>' + weightChart() + '<div class="legend"><span><i style="background:var(--accent)"></i>7-day average</span><span><i style="background:var(--muted);width:6px;height:6px;border-radius:50%"></i>Morning weigh-ins</span><span><i style="background:var(--accent-soft);height:8px"></i>Part H milestone band</span></div></div>';
  h += '<div class="card chart"><h3>Waist</h3>' + waistChart() + '</div>';
  h += sundayReview();
  h += milestonesTable();
  return h;
}
const stat = (v, l) => '<div class="stat"><b class="num">' + v + '</b><span>' + esc(l) + '</span></div>';

function weightChart(){
  const W = 340, H = 190, pl = 34, pr = 12, pt = 10, pb = 24, x0 = plan.settings.start, x1 = plan.settings.weigh_in, span = Math.max(1, diff(x0, x1));
  const ws = weighIns().filter(x => x.d <= x1);
  const bands = []; for (let d = x0; d <= x1; d = add(d, 1)) bands.push([d, ...band(d)]);
  const vals = ws.map(x => x.w).concat(bands.map(b => b[1]), bands.map(b => b[2]));
  const lo = Math.floor(Math.min(...vals) - 1), hi = Math.ceil(Math.max(...vals) + 1);
  const X = d => pl + diff(x0, d) / span * (W - pl - pr), Y = v => pt + (hi - v) / (hi - lo) * (H - pt - pb);
  let g = ''; const step = (hi - lo) > 12 ? 4 : 2;
  for (let v = Math.ceil(lo / step) * step; v <= hi; v += step) g += '<line x1="' + pl + '" x2="' + (W - pr) + '" y1="' + Y(v) + '" y2="' + Y(v) + '" stroke="var(--line)"/><text x="' + (pl - 6) + '" y="' + (Y(v) + 4) + '" text-anchor="end" font-size="10" fill="var(--muted)">' + v + '</text>';
  [x0].concat(plan.milestones.map(m => m.date)).filter(d => d <= x1).forEach((d, i, arr) => g += '<text x="' + X(d) + '" y="' + (H - 6) + '" text-anchor="' + (i === 0 ? 'start' : i === arr.length - 1 ? 'end' : 'middle') + '" font-size="10" fill="var(--muted)">' + short(d) + '</text>');
  g += '<polygon points="' + bands.map(b => X(b[0]) + ',' + Y(b[2])).join(' ') + ' ' + bands.slice().reverse().map(b => X(b[0]) + ',' + Y(b[1])).join(' ') + '" fill="var(--accent-soft)"/>';
  g += ws.map(p => '<circle cx="' + X(p.d) + '" cy="' + Y(p.w) + '" r="2.8" fill="var(--muted)" fill-opacity=".75"/>').join('');
  const av = []; for (let d = x0; d <= x1 && d <= todayStr(); d = add(d, 1)){ const a = avg7(d); if (a != null) av.push([d, a]); }
  if (av.length > 1) g += '<polyline points="' + av.map(p => X(p[0]) + ',' + Y(p[1])).join(' ') + '" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>';
  if (av.length){ const z = av[av.length - 1]; g += '<circle cx="' + X(z[0]) + '" cy="' + Y(z[1]) + '" r="4.5" fill="var(--accent)" stroke="var(--surface)" stroke-width="2"/>'; }
  if (!ws.length) g += '<text x="' + (W / 2) + '" y="' + (H / 2 - 16) + '" text-anchor="middle" font-size="12" fill="var(--muted)">Your weigh-ins plot here</text>';
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Weight trend against the milestone band">' + g + '</svg>';
}
function waistChart(){
  const pts = waistSeries();
  if (!pts.length) return '<p class="small muted">Measure at the navel each Sunday, relaxed after a normal breath out. Log it in Today\'s numbers.</p>';
  const W = 340, H = 130, pl = 34, pr = 12, pt = 12, pb = 22, x0 = plan.settings.start, x1 = plan.settings.end, span = diff(x0, x1);
  const lo = Math.floor(Math.min(...pts.map(p => p.v)) - 0.5), hi = Math.ceil(Math.max(...pts.map(p => p.v)) + 0.5);
  const X = d => pl + diff(x0, d) / span * (W - pl - pr), Y = v => pt + (hi - v) / Math.max(1, hi - lo) * (H - pt - pb);
  let g = '';
  for (let v = lo; v <= hi; v += (hi - lo > 4 ? 2 : 1)) g += '<line x1="' + pl + '" x2="' + (W - pr) + '" y1="' + Y(v) + '" y2="' + Y(v) + '" stroke="var(--line)"/><text x="' + (pl - 6) + '" y="' + (Y(v) + 4) + '" text-anchor="end" font-size="10" fill="var(--muted)">' + v + '</text>';
  g += '<text x="' + pl + '" y="' + (H - 4) + '" font-size="10" fill="var(--muted)">' + short(x0) + '</text><text x="' + (W - pr) + '" y="' + (H - 4) + '" text-anchor="end" font-size="10" fill="var(--muted)">' + short(x1) + '</text>';
  if (pts.length > 1) g += '<polyline points="' + pts.map(p => X(p.d) + ',' + Y(p.v)).join(' ') + '" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linejoin="round"/>';
  g += pts.map(p => '<circle cx="' + X(p.d) + '" cy="' + Y(p.v) + '" r="4" fill="var(--accent)" stroke="var(--surface)" stroke-width="2"/><text x="' + X(p.d) + '" y="' + (Y(p.v) - 8) + '" text-anchor="middle" font-size="10" fill="var(--ink)">' + p.v + '</text>').join('');
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Waist measurements">' + g + '</svg>';
}
function sundayReview(){
  const t = clampDate(todayStr());
  let sun = t; while (parse(sun).getDay() !== 0 && sun > plan.settings.start) sun = add(sun, -1);
  const v = weeklyVerdict(sun), L = LOG.days[sun] || {}, wk0 = add(sun, -6);
  const ws = waistSeries().filter(x => x.d <= sun), prevW = ws.filter(x => x.d < sun).pop();
  const adh = adherence(sun, 7);
  let comp = 0, cn = 0; for (let d = wk0 < plan.settings.start ? plan.settings.start : wk0; d <= sun; d = add(d, 1)){ if (LOG.days[d]){ comp += completion(d); cn++; } }
  const reviewDone = L.checks && L.checks.review;
  let h = '<div class="card"><div style="display:flex;justify-content:space-between;align-items:baseline"><h3>Sunday review</h3><button class="linkbtn" data-act="goto" data-date="' + sun + '">' + short(sun) + ' ›</button></div>';
  h += '<div class="flag ' + v.lv + '" style="margin-top:10px"><span class="ic"></span><div><b>' + esc(v.verdict) + '</b>' + esc(v.action) + '<div class="why">Why: ' + esc(v.why) + '</div></div></div>';
  h += '<div class="tw mt"><table><tbody>' +
    '<tr><td>Waist</td><td class="num">' + (L.waist ? L.waist + ' in' + (prevW ? ' (' + ((L.waist - prevW.v) > 0 ? '+' : '') + (L.waist - prevW.v).toFixed(2) + ')' : '') : '<span class="muted">not logged</span>') + '</td></tr>' +
    '<tr><td>Photos</td><td>' + (reviewDone ? 'Done' : '<span class="muted">Front, side, back, same light. Check off "Sunday review".</span>') + '</td></tr>' +
    '<tr><td>Calorie + protein adherence</td><td class="num">' + (adh ? adh.pct.toFixed(0) + '% (' + adh.hit + '/' + adh.days + ' days)' : '<span class="muted">no taps yet</span>') + '</td></tr>' +
    '<tr><td>Checklist done, week avg</td><td class="num">' + (cn ? Math.round(comp / cn * 100) + '%' : '—') + '</td></tr>' +
    '</tbody></table></div>';
  h += '<h3 style="font-size:16px;margin-top:12px">Top sets</h3><div class="tw"><table><thead><tr><th>Lift</th><th>This week</th><th>Best before</th><th>Trend</th></tr></thead><tbody>' +
    keyLifts().map(k => { const hist = liftHistory(k.key, sun), wk = hist.filter(x => x.d >= wk0), before = hist.filter(x => x.d < wk0); const cur = wk[wk.length - 1], best = before.length ? before.reduce((a, b) => b.e > a.e ? b : a) : null; const tr = cur && best ? (cur.e - best.e) / best.e * 100 : null;
      return '<tr><td>' + esc(k.name) + '</td><td class="num">' + (cur ? (cur.t.w || 'BW') + '×' + cur.t.r : '—') + '</td><td class="num">' + (best ? (best.t.w || 'BW') + '×' + best.t.r : '—') + '</td><td class="num" style="color:' + (tr == null ? 'var(--muted)' : tr < -10 ? 'var(--alert)' : tr < 0 ? 'var(--warn)' : 'var(--good)') + '">' + (tr == null ? '—' : (tr >= 0 ? '+' : '') + tr.toFixed(0) + '%') + '</td></tr>'; }).join('') + '</tbody></table></div>';
  h += '<details class="logic"><summary>How the rules decided (' + v.checks.length + ' checked in order)</summary><ol>' +
    v.checks.map(c => '<li><span class="' + (c.ok ? 'y' : 'n') + '">' + (c.ok ? 'YES' : 'no') + '</span> · ' + esc(c.label) + '<br><span class="muted">' + esc(c.why) + '</span></li>').join('') +
    '</ol><p>The first YES wins. Rule text and thresholds live in plan.md under "Adjustment rules". Weekly rate = drop in 7-day average vs 7 days earlier, as a % of the earlier average.</p></details>';
  return h + '</div>';
}
function milestonesTable(){
  if (!plan.milestones.length) return '';
  const sh = milestoneShift();
  return '<div class="card"><h3>Milestones</h3><div class="tw mt"><table><thead><tr><th>Date</th><th>7-day avg target</th><th>Actual</th><th>Waist</th></tr></thead><tbody>' +
    plan.milestones.map(m => { const ac = m.date <= todayStr() ? avg7(m.date) : null; const ok = ac != null && ac <= +m.high + sh;
      return '<tr><td>' + short(m.date) + '</td><td class="num">' + Math.round(+m.low + sh) + '–' + Math.round(+m.high + sh) + ' lb</td><td class="num" style="color:' + (ac == null ? 'inherit' : ok ? 'var(--good)' : 'var(--warn)') + '">' + (ac == null ? '—' : f1(ac)) + '</td><td>' + esc(m.waist) + '</td></tr>'; }).join('') +
    '</tbody></table></div>' + (sh ? '<p class="small muted">Shifted ' + (sh > 0 ? '+' : '') + sh.toFixed(1) + ' lb to match your first weigh-in.</p>' : '') + '</div>';
}
