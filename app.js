/* Project Maldives — daily checklist and tracker.
   Data model
   - plan.md  : the plan (read-only here). Parsed into tables on every launch.
   - log      : what you did. One record per date in IndexedDB ("days" store),
                mirrored to localStorage as a second copy. Never sent anywhere.
   Other files: rules.js (progress + Part H rules), food.js (menu, prep, groceries),
   timer.js (rope and bag timer). This file loads last and boots the app. */
'use strict';

/* ---------------- small helpers ---------------- */
const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const parse = s => { const [a,b,c] = s.split('-').map(Number); return new Date(a, b-1, c); };
const fmt = d => d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const add = (s,n) => { const d = parse(s); d.setDate(d.getDate()+n); return fmt(d); };
const diff = (a,b) => Math.round((parse(b)-parse(a))/864e5);
const todayStr = () => fmt(new Date());
const DOWK = ['sun','mon','tue','wed','thu','fri','sat'];
const DOWN = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const pretty = s => { const d = parse(s); return DOWN[d.getDay()]+', '+MON[d.getMonth()]+' '+d.getDate(); };
const short = s => { const d = parse(s); return MON[d.getMonth()]+' '+d.getDate(); };
const isDate = s => /^\d{4}-\d{2}-\d{2}$/.test(s||'');
const yt = q => 'https://www.youtube.com/results?search_query='+encodeURIComponent(q+' proper form');
const inline = s => esc(s).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/`([^`]+)`/g,'<code>$1</code>');
const none = v => (!v || v==='-' || v==='—') ? '' : v;
const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
function toast(msg){ const t=$('#toast'); t.textContent=msg; t.classList.add('show'); clearTimeout(toast.t); toast.t=setTimeout(()=>t.classList.remove('show'),2200); }
/** "5:00 PM" → minutes after midnight, or null for labels like "Day". */
function parseTime(t){ const m = String(t||'').match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i); if(!m) return null; let h = +m[1] % 12; if (/pm/i.test(m[3]||'')) h += 12; else if (!m[3] && +m[1] >= 12) h = +m[1]; return h*60 + +m[2]; }
function fmtTime(min){ min = ((min % 1440) + 1440) % 1440; const h = Math.floor(min/60), m = min % 60; return ((h % 12) || 12)+':'+String(m).padStart(2,'0')+' '+(h >= 12 ? 'PM' : 'AM'); }

/* ---------------- plan.md parsing ---------------- */
function splitRow(l){ return l.trim().replace(/^\|/,'').replace(/\|\s*$/,'').split('|').map(c=>c.trim()); }
function parseTable(lines){
  const rows = lines.map(splitRow);
  const head = rows[0].map(h=>h.toLowerCase());
  const body = rows.slice(1).filter(r => !r.every(c => /^:?-{2,}:?$/.test(c)));
  return { head, rawHead: rows[0], rows: body, objs: body.map(r => { const o={}; head.forEach((h,j)=>o[h]=(r[j]||'').trim()); return o; }) };
}
function parseMd(md){
  const out = { sections:{}, order:[] }; let cur=null, sub=null;
  const lines = md.split(/\r?\n/);
  for (let i=0;i<lines.length;i++){
    const l = lines[i]; let m;
    if ((m = l.match(/^##\s+(.+?)\s*$/)) && !l.startsWith('###')){ cur={name:m[1],tables:[],subs:{},subOrder:[],blocks:[]}; out.sections[m[1].toLowerCase()]=cur; out.order.push(cur); sub=null; continue; }
    if ((m = l.match(/^###\s+(.+?)\s*$/))){ if(!cur) continue; sub={name:m[1],tables:[],blocks:[]}; cur.subs[m[1].toLowerCase()]=sub; cur.subOrder.push(sub); cur.blocks.push({sub}); continue; }
    const tgt = sub || cur;
    if (/^\s*\|/.test(l)){ const tl=[]; while(i<lines.length && /^\s*\|/.test(lines[i])){ tl.push(lines[i]); i++; } i--; const t=parseTable(tl); if(tgt){ tgt.tables.push(t); tgt.blocks.push({table:t}); } continue; }
    if (tgt) tgt.blocks.push({line:l});
  }
  return out;
}
function buildPlan(md){
  const P = parseMd(md), errs=[], warns=[];
  const title = name => name.replace(/\b\w/g,c=>c.toUpperCase());
  const T = (name, optional) => { const s=P.sections[name]; if(!s){ (optional?warns:errs).push('Missing section "## '+title(name)+'"'); return []; } if(!s.tables[0]){ (optional?warns:errs).push('No table under "## '+s.name+'"'); return []; } return s.tables[0].objs; };
  const text = name => { const s = P.sections[name]; return s ? s.blocks.filter(b=>b.line&&b.line.trim()).map(b=>b.line.trim()) : []; };
  const plan = { md, P, errs, warns };
  plan.settings = {}; T('settings').forEach(r=>plan.settings[r.key]=r.value);
  ['start','end','weigh_in'].forEach(k=>{ if(!isDate(plan.settings[k])) errs.push('Settings: "'+k+'" must be a date like 2026-11-19'); });
  plan.phases = T('phases');
  plan.phases.forEach(p=>{ if(!isDate(p.from)||!isDate(p.to)) errs.push('Phases: "'+p.phase+'" needs from/to dates'); });
  plan.weekly = {}; T('weekly schedule').forEach(r=>plan.weekly[(r.day||'').slice(0,3).toLowerCase()]=r);
  DOWK.forEach(d=>{ if(!plan.weekly[d]) errs.push('Weekly schedule: missing '+d[0].toUpperCase()+d.slice(1)); });
  plan.ropeSchedule = T('rope schedule');
  plan.gymTimers = {}; T('gym timers', true).forEach(r=>plan.gymTimers[(r.session||'').toLowerCase()]=r);
  plan.timerInfo = {}; T('timer info', true).forEach(r=>plan.timerInfo[r.session]=r);
  plan.timers = {};
  T('timer sessions').forEach(r=>{ (plan.timers[r.session] = plan.timers[r.session] || []).push({ seg:+r.seg||0, label:r.label, work:+r.work_s||0, rest:+r.rest_s||0, rounds:Math.max(1,+r.rounds||1), cue:r.cue||'' }); });
  Object.values(plan.timers).forEach(a=>a.sort((x,y)=>x.seg-y.seg));
  plan.overrides = {}; T('day overrides', true).forEach(r=>{ if(isDate(r.date)) plan.overrides[r.date]=r; else warns.push('Day overrides: "'+r.date+'" is not a date'); });
  plan.sessions = {}; T('sessions').forEach(r=>plan.sessions[(r.session||'').toLowerCase()]=r);
  plan.dayTypes = {}; T('day types').forEach(r=>plan.dayTypes[r.type]=r);
  plan.checklist = T('checklist');
  plan.supps = T('supplements');
  plan.nicotine = T('nicotine', true);
  plan.meals = {}; T('meals').forEach(r=>plan.meals[r.id]=r);
  plan.ingredients = T('ingredients', true);
  plan.recipes = {}; T('recipes', true).forEach(r=>{ (plan.recipes[r.meal] = plan.recipes[r.meal] || []).push(r); });
  Object.values(plan.recipes).forEach(a=>a.sort((x,y)=>(+x.step)-(+y.step)));
  plan.sauces = T('sauces', true);
  plan.sauceIngredients = T('sauce ingredients', true);
  plan.tricks = {}; T('chef tricks', true).forEach(r=>plan.tricks[r.n]=r.trick);
  plan.prepSessions = T('prep sessions', true);
  plan.prepSteps = T('prep steps', true);
  plan.storeUnits = T('store units', true);
  plan.pantryStaples = T('pantry staples', true).map(r=>r.item);
  plan.dailyGroceries = T('daily groceries', true);
  plan.refillExtras = T('refill extras', true);
  plan.travelPacking = T('travel packing', true);
  plan.workouts = {};
  const W = P.sections['workouts'];
  if (!W) errs.push('Missing section "## Workouts"');
  else W.subOrder.forEach(s=>{ plan.workouts[s.name.toLowerCase()] = { name:s.name, ex:(s.tables[0]||{objs:[]}).objs }; });
  plan.milestones = T('milestones', true);
  plan.rules = {}; T('adjustment rules', true).forEach((r,i)=>{ r.order=i; plan.rules[r.id]=r; });
  plan.progression = text('progression');
  // cross-checks (warnings only)
  const known = n => !none(n) || plan.workouts[n.toLowerCase()] || plan.sessions[n.toLowerCase()];
  Object.values(plan.weekly).concat(Object.values(plan.overrides)).forEach(r=>{
    if(!known(r.session)) warns.push('Session "'+r.session+'" isn\'t under Workouts or Sessions');
    ['lunch','dinner'].forEach(k=>{ if(none(r[k]) && !plan.meals[r[k]]) warns.push('Meal "'+r[k]+'" isn\'t in Meals'); });
    if(r.day_type && !plan.dayTypes[r.day_type]) warns.push('Day type "'+r.day_type+'" isn\'t in Day types');
  });
  plan.ropeSchedule.forEach(r=>['mon','tue','wed','thu','fri'].forEach(k=>{ const id = ropeId(r[k]); if (id && !plan.timers[id]) warns.push('Rope schedule: "'+id+'" isn\'t in Timer sessions'); }));
  Object.values(plan.gymTimers).forEach(r=>['before','after'].forEach(k=>{ if (none(r[k]) && !plan.timers[r[k]]) warns.push('Gym timers: "'+r[k]+'" isn\'t in Timer sessions'); }));
  return plan;
}
const ropeId = v => none(String(v||'').replace(/\(.*\)/,'').trim());

/* ---------------- timers (data side) ---------------- */
function timerSeconds(id){ return (plan.timers[id]||[]).reduce((a,s)=>a + s.rounds*(s.work+s.rest), 0); }
function timerMinutes(id){ return Math.round(timerSeconds(id)/60); }
function timerName(id){ return (plan.timerInfo[id] && plan.timerInfo[id].name) || id; }

/* ---------------- one day of the plan ---------------- */
let plan = null;
const KINDS = ['home','travel','arrival','yacht','all'];
const TYPES = ['lifting','zone2','refill','thanksgiving','weighin'];

function dayPlan(s){
  const ph = plan.phases.find(p=>p.from<=s && s<=p.to) || plan.phases[plan.phases.length-1] || {phase:'',sets:'full',rir:'',summary:''};
  const dk = DOWK[parse(s).getDay()];
  const wk = plan.weekly[dk] || {}, ov = plan.overrides[s] || {};
  const pick = k => (ov[k]!==undefined && ov[k]!=='') ? ov[k] : (wk[k]||'');
  const session = none(pick('session'));
  const type = pick('day_type') || 'zone2';
  const kind = ['travel','arrival','yacht'].includes(type) ? type : 'home';
  const lunchId = none(pick('lunch')), dinnerId = none(pick('dinner'));
  const dinnerNote = (ov.dinner ? ov.dinner_note : pick('dinner_note')) || '';
  // Rope: a day override wins, else the Rope schedule row covering this date (Mon–Fri columns).
  let ropeRaw = (ov.rope!==undefined && ov.rope!=='') ? ov.rope : '';
  if (!ropeRaw){ const row = plan.ropeSchedule.find(r=>r.from<=s && s<=r.to); ropeRaw = (row && row[dk]) || '-'; }
  const rid = ropeId(ropeRaw);
  const rope = rid && plan.timers[rid] ? { id:rid, name:timerName(rid), minutes:timerMinutes(rid), opt:/optional|\?/i.test(ropeRaw) } : null;
  const dt = plan.dayTypes[type] || {label:type};
  const workout = session ? plan.workouts[session.toLowerCase()] : null;
  const sess = session ? plan.sessions[session.toLowerCase()] : null;
  const gt = workout && kind==='home' ? plan.gymTimers[session.toLowerCase()] : null;
  const gym = { before: gt && plan.timers[none(gt.before)] ? gt.before : '', after: gt && plan.timers[none(gt.after)] ? gt.after : '' };
  return {
    s, dk, ph, kind, type, dt, session, workout, sess, rope, gym, time: ov.time || '',
    lunch: lunchId ? Object.assign({id:lunchId}, plan.meals[lunchId]||{name:lunchId}) : null,
    dinner: dinnerId ? Object.assign({id:dinnerId}, plan.meals[dinnerId]||{name:dinnerId}) : null,
    dinnerNote, sets: ov.sets || ph.sets || 'full', rir: ov.rir || ph.rir || '', note: ov.note || '',
    snack: none(dt.snack)
  };
}
function sessionStart(d){ return d.time || (d.workout ? (plan.settings.lift_time||'5:00 PM') : (d.sess && none(d.sess.time)) || ''); }
function sessionTitle(d){ if (d.workout) return d.workout.name; if (d.sess) return d.sess.title || d.session; return d.session || 'Rest'; }
function nicotineRule(s){ const r = plan.nicotine.find(n=>n.from<=s && s<=n.to); return r ? r.rule : ''; }
const mealLabel = m => m ? (m.id.length<=2 ? m.id+'. ' : '')+m.name : '';
const sauceShort = m => { const t = none(m && m.sauce); return t ? t.replace(/\s*\(.*\)\s*$/,'') : ''; };
const cooksTonight = m => !!(m && none(m.cook) && m.cook!=='prep');

function vars(d){
  const start = sessionStart(d), st = parseTime(start), wm = d.gym.before ? timerMinutes(d.gym.before) : 0;
  const prepToday = typeof prepFor==='function' ? prepFor(d.s) : null;
  const prepTomorrow = typeof prepFor==='function' ? prepFor(add(d.s,1)) : null;
  const brineG = prepTomorrow ? prepTomorrow.chickenG : 0;
  return {
    rope_name: d.rope ? d.rope.name : '', rope_minutes: d.rope ? d.rope.minutes : '',
    warmup_name: d.gym.before ? timerName(d.gym.before) : '', warmup_minutes: wm, warmup_time: start,
    finisher_name: d.gym.after ? timerName(d.gym.after) : '', finisher_minutes: d.gym.after ? timerMinutes(d.gym.after) : '',
    session_time: (st!=null && wm) ? fmtTime(st + wm) : start,
    lunch: mealLabel(d.lunch), dinner: mealLabel(d.dinner)+(d.dinnerNote?' ('+d.dinnerNote+')':''),
    snack: d.snack, session: d.session, session_title: sessionTitle(d),
    calories: d.dt.calories||'', protein: d.dt.protein||'',
    prep_time: prepToday ? prepToday.time : '', prep_minutes: prepToday ? prepToday.minutes : '', prep_covers: prepToday ? prepToday.coversLabel : '',
    brine_g: Math.round(brineG), brine_salt: brineSalt(brineG),
    next_week: short(add(d.s,1))+'–'+short(add(d.s,7))
  };
}
function brineSalt(g){ const tsp = g/500*0.75; const q = Math.round(tsp*4)/4; const whole = Math.floor(q), frac = q - whole; const f = {0:'',0.25:'¼',0.5:'½',0.75:'¾'}[frac]; return (whole?whole:'')+(f||'')+(q? ' tsp':'0 tsp'); }
const fill = (t,v) => String(t||'').replace(/\{(\w+)\}/g,(m,k)=> v[k]!==undefined ? v[k] : m);

function matchWhen(w, d){
  const toks = String(w||'all').toLowerCase().split(/\s+/).filter(Boolean);
  const scope = toks.filter(t=>KINDS.includes(t)||TYPES.includes(t));
  if (scope.length && !scope.some(t=>t==='all'||t===d.kind||t===d.type)) return false;
  for (const t of toks){
    if (scope.includes(t)) continue;
    if (t==='rope'){ if(!d.rope) return false; }
    else if (t==='gym'){ if(!d.gym.before) return false; }
    else if (t==='finisher'){ if(!d.gym.after) return false; }
    else if (t==='lunch'){ if(!d.lunch) return false; }
    else if (t==='dinner'){ if(!d.dinner) return false; }
    else if (t==='snack'){ if(!d.snack) return false; }
    else if (t==='prep'){ const p = typeof prepFor==='function' && prepFor(d.s); if(!p || !p.containers.length) return false; }
    else if (t==='brine'){ const p = typeof prepFor==='function' && prepFor(add(d.s,1)); if(!p || !p.chickenG) return false; }
    else if (t==='shop'){ if (typeof weekHasMeals!=='function' || !weekHasMeals(add(d.s,1))) return false; }
    else if (DOWK.includes(t)){ if(t!==d.dk) return false; }
    else if (t.startsWith('from:')){ if(d.s < t.slice(5)) return false; }
    else if (t.startsWith('until:')){ if(d.s > t.slice(6)) return false; }
    else if (!matchWhen.warned[t]){ matchWhen.warned[t]=1; plan.warns.push('Checklist: unknown word "'+t+'" in a when cell'); }
  }
  return true;
}
matchWhen.warned = {};

function autoPart(time){ const t = parseTime(time); if (t==null) return 'Day'; return t < 11*60 ? 'Morning' : t < 17*60 ? 'Day' : 'Evening'; }
const itemsCache = new Map();
function itemsFor(s){
  if (itemsCache.has(s)) return itemsCache.get(s);
  const d = dayPlan(s), v = vars(d), seen = new Set(), out = [];
  for (const r of plan.checklist){
    if (!r.id || seen.has(r.id) || !matchWhen(r.when, d)) continue;
    if (r.id==='session' && !d.workout && !d.sess) continue;
    seen.add(r.id);
    const time = fill(r.time, v);
    let part = r.part || 'All day';
    if (/^auto$/i.test(part)) part = autoPart(time);
    if (part==='Training' && parseTime(time)!=null && parseTime(time) < 12*60) part = 'Morning';
    const det = (r.detail||'').split(/\s+/).filter(Boolean);
    let sub = fill(r.notes, v);
    const mealTok = det.find(x=>x.startsWith('meal:'));
    if (mealTok && mealTok!=='meal:breakfast'){
      const m = mealFor(d, mealTok.slice(5));
      if (m){ const bits = []; if (cooksTonight(m)) bits.push('Cook tonight: '+m.cook); else if (m.cook==='prep') bits.push('From prep'); if (m.kcal) bits.push(m.kcal+' kcal · '+m.protein+' g P'); if (sauceShort(m)) bits.push(sauceShort(m)); sub = bits.join(' · '); }
    }
    if (!sub){
      if (det.includes('nicotine')) sub = nicotineRule(s);
      else if (r.id==='session') sub = d.workout ? (d.type==='lifting'?'60–70 min':'Light, nothing to failure') : ((d.sess&&d.sess.details)||'');
      else if (mealTok){ const meal = mealFor(d, mealTok.slice(5)); if (meal && meal.kcal) sub = meal.kcal+' kcal · '+meal.protein+' g protein'; }
      if (!sub){ const sp = det.find(x=>x.startsWith('supps:')); if (sp) sub = plan.supps.filter(x=>x.when===sp.slice(6) && !/optional/i.test(x.supplement)).map(x=>x.supplement.split(' (')[0]+' '+x.dose.split(',')[0]).join(' · '); }
    }
    let title = fill(r.item, v);
    if (r.id==='nicotine'){ const c = parseTime(plan.settings.lights_out||'10:15 PM'); if (c!=null) title = 'Nicotine: none after '+fmtTime(c-180); }
    const timerTok = det.find(x=>x.startsWith('timer:'));
    const timer = timerTok ? ({ 'timer:rope': d.rope && d.rope.id, 'timer:before': d.gym.before, 'timer:after': d.gym.after })[timerTok] || (plan.timers[timerTok.slice(6)] ? timerTok.slice(6) : '') : '';
    const link = (det.find(x=>x.startsWith('link:'))||'').slice(5);
    out.push({ id:r.id, part, time, title, sub, detail:det, notes:fill(r.notes,v), timer, link,
      optional: /^y/i.test(r.optional||'') || (r.id==='rope' && d.rope && d.rope.opt) });
  }
  // Time order: items with a clock time sort by it; labels like "Work" or "AM" keep the
  // time of the item before them in plan.md, so they stay where they were written.
  let lastT = 0;
  out.forEach((it,i)=>{ const t = parseTime(it.time); it._t = t!=null ? t : lastT; if (t!=null) lastT = t; it._i = i; });
  out.sort((a,b)=> a._t - b._t || a._i - b._i);
  const res = { d, items: out };
  itemsCache.set(s, res);
  return res;
}
function mealFor(d, key){ if (key==='lunch') return d.lunch; if (key==='dinner') return d.dinner; return plan.meals[key] ? Object.assign({id:key}, plan.meals[key]) : null; }

/* ---------------- storage ---------------- */
const LS_KEY = 'pm-log-mirror';
const store = {
  db: null,
  async open(){
    if (!('indexedDB' in window)) return;
    this.db = await new Promise((res,rej)=>{ const r=indexedDB.open('project-maldives',1); r.onupgradeneeded=()=>{ const x=r.result; x.createObjectStore('days'); x.createObjectStore('meta'); }; r.onsuccess=()=>res(r.result); r.onerror=()=>rej(r.error); });
  },
  all(st){ return new Promise((res,rej)=>{ if(!this.db) return res({}); const o={}; const rq=this.db.transaction(st,'readonly').objectStore(st).openCursor(); rq.onsuccess=()=>{ const c=rq.result; if(c){ o[c.key]=c.value; c.continue(); } else res(o); }; rq.onerror=()=>rej(rq.error); }); },
  put(st,k,v){ return new Promise((res,rej)=>{ if(!this.db) return res(); const t=this.db.transaction(st,'readwrite'); t.objectStore(st).put(v,k); t.oncomplete=()=>res(); t.onerror=()=>rej(t.error); }); }
};
const LOG = { days:{}, meta:{} };
function day(s){ if(!LOG.days[s]) LOG.days[s]={checks:{},lifts:{}}; const d=LOG.days[s]; d.checks=d.checks||{}; d.lifts=d.lifts||{}; return d; }
const dayRO = s => LOG.days[s] || {checks:{},lifts:{}};
function mirror(){ try{ localStorage.setItem(LS_KEY, JSON.stringify({days:LOG.days, meta:{lastBackup:LOG.meta.lastBackup, groceries:LOG.meta.groceries}})); }catch(e){} }
const saveTimers = {};
function saveDay(s, now){
  LOG.days[s].updated = Date.now();
  const go = () => store.put('days', s, JSON.parse(JSON.stringify(LOG.days[s]))).then(mirror).catch(()=>{ mirror(); toast('Saved to backup copy only'); });
  clearTimeout(saveTimers[s]);
  if (now) go(); else saveTimers[s] = setTimeout(go, 250);
}
function saveMeta(k,v){ LOG.meta[k]=v; return store.put('meta',k,v).then(mirror).catch(()=>{}); }
function flushAll(){ Object.keys(saveTimers).forEach(s=>{ clearTimeout(saveTimers[s]); delete saveTimers[s]; if (LOG.days[s]) store.put('days',s,JSON.parse(JSON.stringify(LOG.days[s]))); }); mirror(); }
addEventListener('pagehide', flushAll);
document.addEventListener('visibilitychange', ()=>{ if(document.visibilityState==='hidden') flushAll();
  else if (plan && UI.lastDay !== todayStr()){ UI.lastDay = todayStr(); UI.date = clampDate(todayStr()); render(); } });

/* ---------------- state ---------------- */
const UI = { tab:'today', date:null, open:new Set(), lastDay:todayStr(), weightMsg:null, food:{ view:'menu', week:null, prep:null } };
const clampDate = s => s < plan.settings.start ? plan.settings.start : s > plan.settings.end ? plan.settings.end : s;
const wMin = () => +plan.settings.weight_min || 150, wMax = () => +plan.settings.weight_max || 230, wJump = () => +plan.settings.weight_jump || 3;
const validWeight = w => w >= wMin() && w <= wMax();

function isDone(s, it){
  const L = dayRO(s);
  if (L.checks[it.id]) return true;
  if (it.id==='numbers') return validWeight(+L.weight);
  if (it.id==='steps') return L.steps >= (+plan.settings.steps_target||9000);
  return false;
}
function autoDone(s, it){ const L=dayRO(s); return !L.checks[it.id] && isDone(s,it); }
function completion(s){ const it = itemsFor(s).items.filter(i=>!i.optional); return it.length ? it.filter(i=>isDone(s,i)).length/it.length : 0; }

/* ---------------- render: shell ---------------- */
const view = $('#view');
function render(){
  itemsCache.clear(); if (typeof clearFoodCache==='function') clearFoodCache();
  renderTop(); renderBanner();
  document.querySelectorAll('.tabs button').forEach(b=>b.setAttribute('aria-current', b.dataset.tab===UI.tab ? 'page' : 'false'));
  if (UI.tab==='today') view.innerHTML = renderToday();
  else if (UI.tab==='food') view.innerHTML = renderFood();
  else if (UI.tab==='progress') view.innerHTML = renderProgress();
  else view.innerHTML = renderPlan();
}
function renderTop(){
  const s = UI.date, n = diff(plan.settings.start, s)+1, total = diff(plan.settings.start, plan.settings.end)+1;
  if (UI.tab==='today'){
    $('#top').innerHTML = '<button class="nav" data-act="prev" aria-label="Previous day" '+(s<=plan.settings.start?'disabled':'')+'>‹</button>'+
      '<div class="mid"><h1>'+pretty(s)+'</h1><div class="sub">'+(s===todayStr()?'Today':'<button class="linkbtn" data-act="today">Back to today</button>')+' · Day '+n+' of '+total+' · '+esc(dayPlan(s).ph.phase)+'</div></div>'+
      '<button class="nav" data-act="next" aria-label="Next day" '+(s>=plan.settings.end?'disabled':'')+'>›</button>';
  } else {
    const toY = diff(todayStr(), plan.settings.yacht||plan.settings.end);
    $('#top').innerHTML = '<div class="mid" style="padding:6px 0"><h1>'+({food:'Food',progress:'Progress',plan:'The plan'})[UI.tab]+'</h1><div class="sub">'+(toY>0?toY+' days to the yacht':'Yacht week')+'</div></div>';
  }
}
function renderBanner(){
  const b = [];
  if (plan.usingCached) b.push('<div class="banner"><b>Using the last plan that loaded</b>'+esc(plan.usingCached)+'</div>');
  if (plan.errs.length || plan.warns.length) b.push('<div class="banner"><b>plan.md needs a fix</b>'+plan.errs.concat(plan.warns).slice(0,4).map(esc).join('<br>')+'</div>');
  $('#banner').innerHTML = b.join('');
}

/* ---------------- render: today ---------------- */
function renderToday(){
  const s = UI.date, { d, items } = itemsFor(s), L = dayRO(s);
  const req = items.filter(i=>!i.optional), done = req.filter(i=>isDone(s,i)).length;
  const toW = diff(s, plan.settings.weigh_in), toY = diff(s, plan.settings.yacht||plan.settings.end);
  const pills = [d.dt.label||d.type, d.ph.phase];
  if (items.some(i=>i.id==='reset')) pills.push('Reset day '+(diff(plan.settings.start,s)+1));
  const lines = [];
  if (d.kind==='home') lines.push(d.rope ? d.rope.name+', '+d.rope.minutes+' min'+(d.rope.opt?' (optional)':'')+', then breakfast shake.' : 'No rope today. Breakfast shake and AM supplements.');
  if (d.dt.calories && d.dt.calories!=='-') lines.push(d.dt.calories+' kcal · '+d.dt.protein+' g protein.'+(d.lunch?' Lunch: '+d.lunch.name+'.':'')+(d.dinner?' Dinner: '+d.dinner.name+(d.dinnerNote?' ('+d.dinnerNote+')':'')+'.':''));
  else lines.push('Protein '+(d.dt.protein||'at every meal')+'. '+(d.dt.note||''));
  lines.push(d.note || d.ph.summary || '');
  let h = '<section class="hero"><div class="pills">'+pills.map(p=>'<span class="pill">'+esc(p)+'</span>').join('')+'</div>'+
    '<h2>'+esc(d.workout ? d.workout.name : (d.session || d.dt.label))+'</h2><ul>'+lines.filter(Boolean).slice(0,3).map(l=>'<li>'+esc(l)+'</li>').join('')+'</ul>'+
    '<div class="prog"><i style="width:'+(req.length?Math.round(done/req.length*100):0)+'%"></i></div><div class="progl num"><span>'+done+' of '+req.length+' done</span><span>'+(toW>0?toW+' days to weigh-in':toW===0?'Weigh-in today':toY>0?toY+' days to the yacht':'Yacht')+'</span></div></section>';
  h += flagsFor(s).map(flagHTML).join('');
  const parts = [];
  ['Morning','Day','Training','Evening','All day'].forEach(p=>{ if (items.some(i=>i.part===p)) parts.push(p); });
  items.forEach(i=>{ if(!parts.includes(i.part)) parts.push(i.part); });
  parts.forEach(p=>{
    const g = items.filter(i=>i.part===p), gr = g.filter(i=>!i.optional);
    h += '<div class="gh"><h3>'+esc(p)+'</h3><span class="num">'+gr.filter(i=>isDone(s,i)).length+' / '+gr.length+'</span></div><div class="list">'+g.map(i=>itemHTML(s,i,d)).join('')+'</div>';
  });
  h += numbersHTML(s, L);
  return h;
}
function itemHTML(s, it, d){
  const done = isDone(s,it), open = UI.open.has(it.id);
  const detail = it.timer || it.link ? '' : detailHTML(s,it,d), has = !!detail;
  let body;
  if (it.timer) body = 'data-timer="'+esc(it.timer)+'" data-item="'+esc(it.id)+'"';
  else if (it.link) body = 'data-link="'+esc(it.link)+'"';
  else body = has ? 'data-open="'+esc(it.id)+'" aria-expanded="'+open+'"' : 'data-check="'+esc(it.id)+'"';
  const chev = it.timer ? '<span class="go" aria-hidden="true">▶ Timer</span>' : it.link ? '<span class="chev" aria-hidden="true">›</span>' : has ? '<span class="chev" aria-hidden="true">▶</span>' : '';
  return '<div class="it'+(done?' done':'')+(open?' open':'')+'"><div class="ih">'+
    '<button class="ck" data-check="'+esc(it.id)+'" aria-pressed="'+done+'" aria-label="'+(done?'Mark not done':'Mark done')+': '+esc(it.title)+'">'+CHECK+'</button>'+
    '<button class="ib" '+body+'><span class="t">'+esc(it.title)+(it.optional?'<span class="tag">optional</span>':'')+(autoDone(s,it)?'<span class="tag auto">from your numbers</span>':'')+'</span>'+(it.sub?'<span class="s">'+esc(it.sub)+'</span>':'')+'</button>'+
    '<span class="tm num">'+esc(String(it.time).replace(/\s?(AM|PM)$/i,''))+'</span>'+chev+
    '</div>'+(open&&has?'<div class="det">'+detail+'</div>':'')+'</div>';
}
function detailHTML(s, it, d){
  let h = '';
  for (const tok of it.detail){
    if (tok.startsWith('meal:')){ const m = mealFor(d, tok.slice(5)); if (m) h += (typeof recipeCardHTML==='function' && plan.ingredients.some(r=>r.meal===m.id)) ? recipeCardHTML(m, { half: tok==='meal:dinner' && /half/i.test(d.dinnerNote), date: s }) : '<p><b>'+esc(m.name)+'</b><br>'+esc(m.description||'')+'</p>'+(m.kcal?'<p class="muted num">'+m.kcal+' kcal · P '+m.protein+' g</p>':''); }
    else if (tok.startsWith('supps:')){ const list = plan.supps.filter(x=>x.when===tok.slice(6)); if(list.length) h += '<div class="mt">'+list.map(x=>'<div class="supp"><b>'+esc(x.supplement)+'</b><span>'+esc(x.dose)+'</span>'+(x.notes?'<small>'+esc(x.notes)+'</small>':'')+'</div>').join('')+'</div>'; }
    else if (tok==='nicotine'){ const r = nicotineRule(s); if(r) h += '<p>'+esc(r)+'</p>'; }
    else if (tok==='session'){ h += sessionDetail(s, d); }
  }
  if (it.id==='snack' && d.snack) h = '<p><b>'+esc(d.snack)+'</b></p>'+h;
  if (it.notes && h && !it.detail.some(t=>t.startsWith('meal:'))) h += '<p class="muted">'+esc(it.notes)+'</p>';
  return h;
}
function setsFor(e, d){
  const base = parseInt(e.sets,10); if (isNaN(base)) return e.sets;
  const rule = String(d.sets||'full').toLowerCase();
  if (/^\d+$/.test(rule)) return Math.min(base, +rule);
  if (rule==='taper') return Math.max(1, Math.round(base*2/3));
  if (rule==='peak' && /^y/i.test(e.peak||'')) return base+1;
  return base;
}
function sessionDetail(s, d){
  if (!d.workout){ return (d.sess&&d.sess.details?'<p>'+esc(d.sess.details)+'</p>':'')+(d.note?'<p><b>'+esc(d.note)+'</b></p>':''); }
  const L = dayRO(s);
  let h = '<p><b>'+esc(d.note || d.ph.summary || '')+'</b></p>';
  if (d.gym.before) h += '<p class="muted">Starts after the '+esc(timerName(d.gym.before).toLowerCase())+' timer.</p>';
  h += d.workout.ex.map(e=>{
    const sets = setsFor(e,d), peak = String(d.sets).toLowerCase()==='peak' && /^y/i.test(e.peak||'');
    const key = d.workout.name+'|'+e.exercise, top = L.lifts[key] || {};
    return '<div class="ex"><div class="exh"><b>'+esc(e.exercise)+'</b><span class="num">'+esc(sets)+' × '+esc(e.reps)+'</span></div>'+
      '<div class="exm"><span>RIR '+esc(d.rir||e.rir)+'</span><span>Rest '+esc(e.rest)+'</span>'+(peak?'<span class="plus">+1 peak set</span>':'')+'<a class="how" href="'+yt(e.demo||e.exercise)+'" target="_blank" rel="noopener">How to ↗</a></div>'+
      '<div class="ts"><span>Top set</span><input type="number" inputmode="decimal" step="any" placeholder="lb" aria-label="Top set weight for '+esc(e.exercise)+'" data-lift="'+esc(key)+'" data-f="w" value="'+esc(top.w!=null?top.w:'')+'"><span>×</span><input type="number" inputmode="numeric" placeholder="reps" aria-label="Top set reps for '+esc(e.exercise)+'" data-lift="'+esc(key)+'" data-f="r" value="'+esc(top.r!=null?top.r:'')+'"></div></div>';
  }).join('');
  if (d.gym.after) h += '<p class="muted">Ends with the '+esc(timerName(d.gym.after).toLowerCase())+' timer.</p>';
  if (plan.progression[0]) h += '<p class="muted">'+inline(plan.progression[0])+'</p>';
  return h;
}
function lastWeighIn(before){ const ks = Object.keys(LOG.days).filter(k=>k<before).sort().reverse(); for (const k of ks){ const w = +LOG.days[k].weight; if (validWeight(w)) return { d:k, w }; } return null; }
function numbersHTML(s, L){
  const f = (k,lab,ph,mode,extra) => '<div class="f"><label for="n-'+k+'">'+lab+'</label><input id="n-'+k+'" type="number" inputmode="'+(mode||'decimal')+'" step="any" placeholder="'+ph+'" data-num="'+k+'" value="'+esc(L[k]!=null?L[k]:'')+'"'+(extra||'')+'></div>';
  const scale = (k,lab,from,to) => { let b=''; for(let i=from;i<=to;i++) b+='<button data-scale="'+k+'" data-v="'+i+'" class="'+(L[k]===i?'on':'')+'" aria-pressed="'+(L[k]===i)+'">'+i+'</button>'; return '<div class="mt"><span class="lab">'+lab+'</span><div class="scale" role="group" aria-label="'+lab+'">'+b+'</div></div>'; };
  const seg = (k,lab) => '<div><span class="lab">'+lab+'</span><div class="seg" role="group" aria-label="'+lab+'"><button data-seg="'+k+'" data-v="hit" class="'+(L[k]==='hit'?'hit':'')+'" aria-pressed="'+(L[k]==='hit')+'">Hit</button><button data-seg="'+k+'" data-v="miss" class="'+(L[k]==='miss'?'miss':'')+'" aria-pressed="'+(L[k]==='miss')+'">Missed</button></div></div>';
  const isSun = parse(s).getDay()===0 || s===plan.settings.weigh_in || s===plan.settings.start;
  let msg = '';
  const wm = UI.weightMsg && UI.weightMsg.s===s ? UI.weightMsg : null;
  if (wm && wm.kind==='range') msg = '<div class="wmsg bad" role="alert"><b>'+esc(wm.v)+' lb isn\'t saved.</b> Enter a weight between '+wMin()+' and '+wMax()+' lb.</div>';
  else if (wm && wm.kind==='jump') msg = '<div class="wmsg" role="alert"><b>'+esc(wm.v)+' lb is '+Math.abs(wm.v-wm.last.w).toFixed(1)+' lb '+(wm.v>wm.last.w?'up':'down')+' from your last weigh-in</b> ('+wm.last.w+' lb on '+short(wm.last.d)+'). Is that right?<div class="btns mt"><button class="btn" data-act="wsave">Save '+esc(wm.v)+' lb</button><button class="btn ghost" data-act="wfix">Fix it</button></div></div>';
  else if (L.weight!=null && !validWeight(+L.weight)) msg = '<div class="wmsg bad" role="alert"><b>'+esc(L.weight)+' lb looks like a typo</b>, so progress ignores it. Type the right weight to replace it.</div>';
  return '<div class="gh"><h3>Today\'s numbers</h3><span>saved as you type</span></div><div class="card">'+
    '<div class="grid3">'+f('weight','Weight lb','—','decimal',' min="'+wMin()+'" max="'+wMax()+'" enterkeyhint="done"')+f('sleep','Sleep h','—')+f('steps','Steps','tonight','numeric')+'</div>'+msg+
    (isSun || L.waist!=null ? '<div class="grid3 mt">'+f('waist','Waist in','navel')+'</div>' : '')+
    scale('hunger','Hunger 1–10',1,10)+scale('bloat','Bloating 0–10',0,10)+
    '<div class="row2 mt">'+seg('cal','Calories (MacroFactor)')+seg('pro','Protein '+(plan.settings.protein_target||210)+' g+')+'</div></div>';
}
/** Weight is checked when you leave the field: out of range is refused, a big jump asks first. */
function commitWeight(s, raw){
  const L = day(s);
  if (raw===''){ delete L.weight; UI.weightMsg=null; saveDay(s,true); return; }
  const v = Math.round(+raw*10)/10;
  if (!isFinite(v) || !validWeight(v)){ UI.weightMsg = { s, kind:'range', v: raw }; return; }
  const last = lastWeighIn(s);
  if (last && Math.abs(v-last.w) > wJump() && +L.weight !== v){ UI.weightMsg = { s, kind:'jump', v, last }; return; }
  L.weight = v; UI.weightMsg = null; saveDay(s,true);
}

/* ---------------- render: progress ---------------- */
function weights(){ return Object.keys(LOG.days).sort().map(k=>({d:k,w:+LOG.days[k].weight})).filter(x=>validWeight(x.w)); }
function renderProgress(){
  const ws = weights();
  let h = '<div class="stack">';
  h += progressExtras();
  h += '<div class="card"><h3>Weight log</h3>'+(ws.length ? '<div class="tw mt"><table><thead><tr><th>Date</th><th>Weight</th><th>Change</th></tr></thead><tbody>'+
    ws.slice().reverse().map((x,i,a)=>{ const prev=a[i+1]; const c=prev?x.w-prev.w:null; return '<tr><td><button class="linkbtn" data-act="goto" data-date="'+x.d+'">'+short(x.d)+'</button></td><td class="num">'+x.w.toFixed(1)+' lb</td><td class="num">'+(c==null?'—':(c>0?'+':'')+c.toFixed(1))+'</td></tr>'; }).join('')+'</tbody></table></div>'
    : '<p class="muted small">Log your morning weight on Today and it shows up here.</p>')+'</div>';
  h += backupHTML();
  return h+'</div>';
}
function backupHTML(){
  const lb = LOG.meta.lastBackup, ago = lb ? diff(lb.slice(0,10), todayStr()) : null;
  return '<div class="card"><h3>Backup</h3><p class="small muted">Your log lives on this phone. '+(UI.persisted?'iOS has marked it as persistent storage.':'Storage is best-effort, so back up weekly.')+
    ' Last backup: <b>'+(lb ? (ago===0?'today':ago+' day'+(ago>1?'s':'')+' ago') : 'never')+'</b>.</p>'+
    '<div class="btns mt"><button class="btn" data-act="backup">Back up</button><button class="btn ghost" data-act="restore">Restore</button></div>'+
    '<p class="small muted mt">Back up opens the share sheet: choose <b>Save to Files</b> (iCloud Drive). Restore merges a backup file into this phone; days already here are kept.</p></div>';
}

/* ---------------- render: plan.md ---------------- */
function renderPlan(){
  let h = '<div class="md">';
  const block = b => {
    if (b.table) return '<div class="tw"><table><thead><tr>'+b.table.rawHead.map(x=>'<th>'+inline(x)+'</th>').join('')+'</tr></thead><tbody>'+b.table.rows.map(r=>'<tr>'+r.map(c=>'<td>'+inline(c)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
    if (b.sub) return '<h3>'+esc(b.sub.name)+'</h3>'+b.sub.blocks.map(block).join('');
    return '';
  };
  plan.P.order.forEach(sec=>{
    h += '<details class="mdsec"><summary><h2>'+esc(sec.name)+'</h2></summary><div class="in">';
    let list = false, para = [];
    const flush = () => { if (para.length){ h += '<p>'+inline(para.join(' '))+'</p>'; para=[]; } };
    sec.blocks.forEach(b=>{
      if (b.line !== undefined){
        const l = b.line;
        if (/^\s*-\s+/.test(l)){ flush(); if(!list){ h+='<ul>'; list=true; } h += '<li>'+inline(l.replace(/^\s*-\s+/,''))+'</li>'; return; }
        if (list){ h+='</ul>'; list=false; }
        if (!l.trim()) { flush(); return; }
        para.push(l.trim()); return;
      }
      if (list){ h+='</ul>'; list=false; } flush();
      h += block(b);
    });
    if (list) h += '</ul>'; flush();
    h += '</div></details>';
  });
  h += '<div class="card mt"><p class="small muted">Plan loaded '+(LOG.meta.planLoadedAt?new Date(LOG.meta.planLoadedAt).toLocaleString():'—')+'. Edits to plan.md show up the next time the app opens with a connection.</p><button class="btn ghost mt" data-act="reload">Reload plan now</button></div>';
  return h+'</div>';
}

/* ---------------- flags (computed in rules.js) ---------------- */
function flagHTML(f){ return '<div class="flag '+f.lv+'"><span class="ic"></span><div><b>'+esc(f.t)+'</b>'+esc(f.b||'')+(f.why?'<div class="why">'+esc(f.why)+'</div>':'')+'</div></div>'; }

/* ---------------- events ---------------- */
function go(tab){ UI.tab = tab; render(); scrollTo(0,0); }
document.querySelector('.tabs').addEventListener('click', e=>{ const b = e.target.closest('button[data-tab]'); if(b) go(b.dataset.tab); });
document.addEventListener('click', e=>{
  const t = e.target.closest('[data-act],[data-check],[data-open],[data-scale],[data-seg],[data-timer],[data-link]'); if(!t) return;
  if (t.closest('#timer')) return;   // timer.js handles its own buttons
  const s = UI.date, a = t.dataset.act;
  if (a && typeof foodAction==='function' && foodAction(a, t)) return;
  if (a==='prev'){ UI.date = clampDate(add(s,-1)); UI.open.clear(); UI.weightMsg=null; render(); return; }
  if (a==='next'){ UI.date = clampDate(add(s,1)); UI.open.clear(); UI.weightMsg=null; render(); return; }
  if (a==='today'){ UI.date = clampDate(todayStr()); render(); return; }
  if (a==='backup'){ backup(); return; }
  if (a==='restore'){ $('#restoreFile').click(); return; }
  if (a==='reload'){ loadPlan(true).then(()=>{ render(); toast('Plan reloaded'); }); return; }
  if (a==='goto'){ UI.date = t.dataset.date; UI.tab='today'; render(); scrollTo(0,0); return; }
  if (a==='wsave'){ const m = UI.weightMsg; if (m){ day(m.s).weight = m.v; UI.weightMsg=null; saveDay(m.s,true); toast('Saved '+m.v+' lb'); keepScroll(render); } return; }
  if (a==='wfix'){ UI.weightMsg=null; keepScroll(render); const i=$('#n-weight'); if(i){ i.value = dayRO(s).weight!=null ? dayRO(s).weight : ''; i.focus(); i.select(); } return; }
  if (t.dataset.timer){ openTimer(t.dataset.timer, t.dataset.item, s); return; }
  if (t.dataset.link){ openFood(t.dataset.link, s); return; }
  if (t.dataset.open){ const id=t.dataset.open; UI.open.has(id)?UI.open.delete(id):UI.open.add(id); keepScroll(render); return; }
  if (t.dataset.check){
    const id = t.dataset.check, L = day(s), it = itemsFor(s).items.find(i=>i.id===id);
    if (L.checks[id]) delete L.checks[id];
    else if (it && autoDone(s,it)) { toast('Done from your numbers'); return; }
    else L.checks[id] = true;
    saveDay(s, true); keepScroll(render); return;
  }
  if (t.dataset.scale){ const L=day(s), k=t.dataset.scale, v=+t.dataset.v; if(L[k]===v) delete L[k]; else L[k]=v; saveDay(s,true); keepScroll(render); return; }
  if (t.dataset.seg){ const L=day(s), k=t.dataset.seg, v=t.dataset.v; if(L[k]===v) delete L[k]; else L[k]=v; saveDay(s,true); keepScroll(render); return; }
});
document.addEventListener('input', e=>{
  const t = e.target, s = UI.date;
  if (t.dataset.num && t.dataset.num!=='weight'){ const L=day(s), k=t.dataset.num; if(t.value==='') delete L[k]; else L[k]=+t.value; saveDay(s); }
  else if (t.dataset.lift){ const L=day(s), k=t.dataset.lift; const o=L.lifts[k]||{}; if(t.value==='') delete o[t.dataset.f]; else o[t.dataset.f]=+t.value; if(Object.keys(o).length) L.lifts[k]=o; else delete L.lifts[k]; saveDay(s); }
});
document.addEventListener('change', e=>{
  const t = e.target;
  if (t.dataset.num==='weight'){ commitWeight(UI.date, t.value.trim()); keepScroll(render); return; }
  if (t.dataset.num) keepScroll(render);
  if (t.dataset.groc && typeof groceryToggle==='function') groceryToggle(t);
});
document.addEventListener('keydown', e=>{ if (e.key==='Enter' && e.target.dataset && e.target.dataset.num==='weight') e.target.blur(); });
function keepScroll(fn){ const y = scrollY; fn(); scrollTo(0,y); }

/* ---------------- backup / restore ---------------- */
async function shareOrCopy(title, text){
  try { if (navigator.share){ await navigator.share({ title, text }); return 'shared'; } } catch(err){ if (err && err.name==='AbortError') return 'cancelled'; }
  try { await navigator.clipboard.writeText(text); return 'copied'; } catch(e){ return 'failed'; }
}
async function backup(){
  const stamp = new Date().toISOString();
  const data = JSON.stringify({ app:'project-maldives', version:1, exported:stamp, days:LOG.days }, null, 1);
  const name = 'maldives-backup-'+todayStr()+'.json';
  const file = new File([data], name, { type:'application/json' });
  try {
    if (navigator.canShare && navigator.canShare({ files:[file] })) { await navigator.share({ files:[file], title:name }); }
    else { const a=document.createElement('a'); a.href=URL.createObjectURL(file); a.download=name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(a.href),4000); }
    await saveMeta('lastBackup', stamp); toast('Backup saved'); if (UI.tab!=='today') keepScroll(render);
  } catch(err){ if (err && err.name==='AbortError') toast('Backup cancelled'); else toast('Backup failed: '+(err&&err.message||'unknown')); }
}
$('#restoreFile').addEventListener('change', async e=>{
  const f = e.target.files[0]; e.target.value=''; if(!f) return;
  try {
    const o = JSON.parse(await f.text()); if (!o || !o.days) throw new Error('not a Project Maldives backup');
    let added=0, merged=0;
    for (const [k,v] of Object.entries(o.days)){
      if (!isDate(k)) continue;
      if (!LOG.days[k]){ LOG.days[k]=v; added++; }
      else { const cur=LOG.days[k]; for (const [f2,val] of Object.entries(v)){ if(f2==='checks'||f2==='lifts'){ cur[f2]=Object.assign({}, val, cur[f2]); } else if(cur[f2]==null) cur[f2]=val; } merged++; }
      await store.put('days', k, LOG.days[k]);
    }
    mirror(); render(); toast('Restored: '+added+' new days, '+merged+' merged');
  } catch(err){ toast('Couldn’t restore: '+err.message); }
});

/* ---------------- boot ---------------- */
async function loadPlan(force){
  let text = null, cachedNote = '';
  try { const r = await fetch('plan.md', { cache: force ? 'reload' : 'no-cache' }); if (r.ok) text = await r.text(); } catch(e){}
  let p = text ? buildPlan(text) : null;
  if ((!p || p.errs.length) && LOG.meta.planText){
    const old = buildPlan(LOG.meta.planText);
    if (!old.errs.length){ cachedNote = p ? 'The new plan.md has an error: '+p.errs[0] : ''; if(p) old.warns = p.errs.concat(p.warns); p = old; }
  }
  if (!p){ view.innerHTML = '<div class="banner"><b>Couldn’t load plan.md</b>Open the app once with a connection.</div>'; return false; }
  if (text && !p.errs.length && !cachedNote){ saveMeta('planText', text); saveMeta('planLoadedAt', Date.now()); }
  p.usingCached = cachedNote;
  plan = p; matchWhen.warned = {};
  try { localStorage.setItem('pm-yacht', plan.settings.yacht || ''); } catch(e){}
  return true;
}
(async function boot(){
  try { await store.open(); } catch(e){}
  try { LOG.days = await store.all('days'); LOG.meta = await store.all('meta'); } catch(e){}
  if (!Object.keys(LOG.days).length){ try { const m = JSON.parse(localStorage.getItem(LS_KEY)||'null'); if (m && m.days){ LOG.days = m.days; for (const [k,v] of Object.entries(m.days)) store.put('days',k,v); } } catch(e){} }
  if (!(await loadPlan())) return;
  UI.date = clampDate(todayStr());
  render();
  try { if (navigator.storage && navigator.storage.persist){ UI.persisted = await navigator.storage.persisted() || await navigator.storage.persist(); } } catch(e){}
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(()=>{});
})();
