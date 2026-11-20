/* Project Maldives — Food tab: weekly menu, meal prep, recipes and groceries.
   Everything is computed from plan.md tables: Meals, Ingredients, Recipes, Sauces,
   Sauce ingredients, Sauce steps, Prep sessions, Prep steps, Store units, Daily groceries,
   Side salad, Refill extras, Travel packing, Pantry staples.
   Amounts are US kitchen units: oz for weight, tsp/tbsp/cup for volume, counts for the rest. */
'use strict';

const foodCache = new Map();
function clearFoodCache(){ foodCache.clear(); }
function cached(key, fn){ if (!foodCache.has(key)) foodCache.set(key, fn()); return foodCache.get(key); }

/* ---------- weeks ---------- */
const weekStart = s => add(s, -parse(s).getDay());               // the Sunday on or before s
const weekDates = sun => Array.from({length:7}, (_,i)=>add(sun,i));
const inPlan = s => s >= plan.settings.start && s <= plan.settings.end;
const weekLabel = sun => short(sun)+' – '+short(add(sun,6));
const firstWeek = () => weekStart(plan.settings.start), lastWeek = () => weekStart(plan.settings.end);
const DAYFULL = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

/* ---------- US units ---------- */
const VOL = { tsp:1, tbsp:3, cup:48, cups:48 };
const WT = { oz:1, lb:16 };
const FRACS = [[1/8,'⅛'],[1/4,'¼'],[1/3,'⅓'],[1/2,'½'],[2/3,'⅔'],[3/4,'¾']];
const SETS = { tsp:[0,1/8,1/4,1/2,3/4], half:[0,1/2], third:[0,1/4,1/3,1/2,2/3,3/4], quarter:[0,1/4,1/2,3/4] };
function nearest(x, set){ const w = Math.floor(x+1e-9); let best = w, bd = Infinity; for (const f of set.concat(1)){ const v = w+f, d = Math.abs(x-v); if (d < bd-1e-9){ bd = d; best = v; } } return best; }
function floorTo(x, set){ const w = Math.floor(x+1e-9); let best = w; for (const f of set) if (w+f <= x+1e-9) best = w+f; return best; }
/** 1.75 → "1¾" using the fractions a US kitchen can measure. */
function frac(x, set){ const v = nearest(x, set || SETS.third), w = Math.floor(v+1e-9), f = v-w; const g = f > 1e-6 ? (FRACS.find(r=>Math.abs(r[0]-f)<1e-6)||[0,''])[1] : ''; return w ? w+g : (g || '0'); }
/** Volume in teaspoons → "1 tbsp + 1 tsp", "⅓ cup", "2⅓ cups". */
function volStr(t){
  if (!(t > 0)) return '';
  if (t < 0.1) return 'a pinch';
  if (t < 2.9) return frac(t, SETS.tsp)+' tsp';
  const c = t/48;
  if (c >= 0.25-1e-9){
    const v = nearest(c, SETS.third);
    if (Math.abs(v-c)*48 <= (c >= 1 ? 3 : 1.5)) return frac(v, SETS.third)+(v > 1 ? ' cups' : ' cup');
    if (t > 24){ const b = floorTo(c, SETS.third), rest = volStr(t - b*48); return frac(b, SETS.third)+(b > 1 ? ' cups' : ' cup')+(rest && rest!=='a pinch' ? ' + '+rest : ''); }
  }
  const h = Math.round(t/3*2)/2;
  if (Math.abs(h*3 - t) <= 0.2) return frac(h, SETS.half)+' tbsp';
  const w = Math.floor(t/3+1e-9);
  return w+' tbsp + '+volStr(t - w*3);
}
/** Weight in ounces → "5⅓ oz" or "28 oz (1¾ lb)". */
function ozStr(o){ if (!(o > 0)) return ''; if (o < 15.9) return frac(o, SETS.third)+' oz'; return Math.round(o)+' oz ('+frac(o/16, SETS.quarter)+' lb)'; }
/** "scallion{s}" / "basil lea{f|ves}" → singular or plural. */
const plur = (item, q) => String(item||'').replace(/\{([^}|]*)\|([^}]*)\}/g, (m,a,b)=> q > 1 ? b : a).replace(/\{([^}|]*)\}/g, (m,a)=> q > 1 ? a : '');
const hasQty = q => q !== '' && q != null && !isNaN(+q) && +q > 0;
const dimOf = u => VOL[u] ? 'vol' : WT[u] ? 'wt' : (u || '');
const toBase = (q, u) => VOL[u] ? q*VOL[u] : WT[u] ? q*WT[u] : q;
const baseUnit = u => VOL[u] ? 'tsp' : WT[u] ? 'oz' : u;
/** One ingredient line → { a: amount, i: item }. */
function fmtLine(qty, unit, item){
  if (!hasQty(qty)) return { a:'', i:plur(item, 1) };
  const q = +qty;
  if (VOL[unit]) return { a:volStr(q*VOL[unit]), i:plur(item, 1) };
  if (WT[unit]) return { a:ozStr(q*WT[unit]), i:plur(item, 1) };
  if (!unit || unit==='each') return { a:frac(q, SETS.third), i:plur(item, q) };
  return { a:(Math.round(q*100)/100)+' '+unit, i:plur(item, q) };
}
/** Sum rows (already one per serving) by item and kind of unit, keeping first-seen order. */
function aggregate(rows){
  const m = new Map();
  rows.forEach(r=>{
    const k = String(r.item).toLowerCase()+'|'+dimOf(r.unit);
    if (!m.has(k)) m.set(k, { item:r.item, unit:baseUnit(r.unit), qty:0, blank:true, part:r.part, buy:r.buy, section:r.section });
    const e = m.get(k); if (hasQty(r.qty)){ e.qty += toBase(+r.qty, r.unit); e.blank = false; }
  });
  return [...m.values()].map(e=>Object.assign(e, { qty: e.blank ? '' : e.qty }));
}
/** Amount column + item column, optionally under part headings. */
function ingGrid(groups){
  let h = '<div class="ingl">';
  groups.forEach(g=>{
    if (!g.lines.length) return;
    if (g.part) h += '<div class="ph">'+esc(g.part)+'</div>';
    g.lines.forEach(l=>{ const f = fmtLine(l.qty, l.unit, l.item); h += '<span class="a num">'+esc(f.a || '·')+'</span><span class="i">'+esc(f.i)+(l.note ? ' <small>'+esc(l.note)+'</small>' : '')+'</span>'; });
  });
  return h+'</div>';
}
function byPart(rows){ const out = []; rows.forEach(r=>{ let g = out.find(x=>x.part===r.part); if (!g){ g = { part:r.part, lines:[] }; out.push(g); } g.lines.push(r); }); return out; }
const stepText = t => esc(t).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>');

/* ---------- servings ---------- */
const rowsFor = id => plan.ingredients.filter(r=>r.meal===id);
const isHalf = note => /half/i.test(note||'');
const halvable = r => /^rice$/i.test(r.part||'') && /grain/i.test(r.section||'');
/** Ingredient rows for one serving, with the rice itself halved on "half rice" dinners. */
function scaledRows(meal, half){ return rowsFor(meal.id).map(r=>Object.assign({}, r, { qty: hasQty(r.qty) ? +r.qty * (half && halvable(r) ? 0.5 : 1) : '' })); }
/** Lunches and dinners on plan days that have ingredient rows (so not Thanksgiving dinner or travel days). */
function servings(dates){
  const out = [];
  dates.filter(inPlan).forEach(s=>{
    const d = dayPlan(s); if (d.kind!=='home') return;
    [['lunch',d.lunch,false],['dinner',d.dinner,isHalf(d.dinnerNote)]].forEach(([slot,m,half])=>{ if (m && rowsFor(m.id).length) out.push({ s, slot, meal:m, half }); });
  });
  return out;
}
function weekHasMeals(sun){ return servings(weekDates(sun)).length > 0; }
const PREP_KINDS = ['brine','hot','cold','jar','bag'];
const prepKind = r => String(r.prep||'').toLowerCase();
const isSauceRow = r => /^sauce$/i.test(r.section||'');
const slotLabel = sv => DOWN[parse(sv.s).getDay()]+' '+sv.slot;
const cookLabel = m => cooksTonight(m) ? 'Cook tonight · '+m.cook : m && m.cook==='prep' ? 'From meal prep · 3 min to reheat' : '';

/* ---------- sauces ---------- */
const norm = t => String(t||'').toLowerCase().replace(/^quick-/,'').trim();
function sauceFor(name){ const n = norm(name); return plan.sauces.find(x=>norm(x.sauce)===n) || plan.sauces.find(x=>{ const k = norm(x.sauce); return k.includes(n) || n.includes(k); }); }
const sauceServ = sc => +(sc && sc.servings) || 0;
function keepDays(k){ k = String(k||''); let m; if ((m = k.match(/(\d+)\s*weeks?/i))) return +m[1]*7; if ((m = k.match(/(\d+)\s*(?:[–-]\s*(\d+))?\s*days?/i))) return +(m[2]||m[1]); return 0; }
/** Sauces named in a meal's sauce text, e.g. "Lime crema + pico de gallo". */
function mealSauces(m){ const t = norm(m && m.sauce); if (!t) return []; return plan.sauces.filter(x=>t.includes(norm(x.sauce).replace(/ sauce$/,''))); }
const batchLabel = x => (x===0.5 ? '½ batch' : x===1 ? '1 batch' : frac(x, SETS.half)+' batches');
function sauceRows(sc, x){ return plan.sauceIngredients.filter(i=>i.sauce===sc.sauce).map(i=>Object.assign({}, i, { qty: hasQty(i.qty) ? +i.qty*x : '' })); }
function sauceSteps(sc){ return plan.sauceSteps.filter(st=>st.sauce===sc.sauce).sort((a,b)=>(+a.step)-(+b.step)); }
/** Full sauce recipe at x batches. */
function sauceCardHTML(sc, x, sub){
  x = x || 1;
  const per = sauceServ(sc), makes = x===1 ? sc.makes+' ('+per+' servings of '+sc.serving+')' : (per*x)+' servings of '+sc.serving;
  let h = '<div class="sc"><div class="sch"><b>'+esc(sc.sauce)+'</b>'+(sub ? '<span class="rtag">'+esc(sub)+'</span>' : '')+'</div>';
  h += '<p class="small muted">Makes '+esc(makes)+' · keeps '+esc(sc.keeps)+' · '+esc(sc.time)+'</p>';
  h += ingGrid([{ lines:sauceRows(sc, x) }]);
  const st = sauceSteps(sc);
  if (st.length) h += '<ol class="steps">'+st.map(s=>'<li>'+stepText(s.text)+'</li>').join('')+'</ol>';
  return h+'</div>';
}

/* ---------- prep sessions ---------- */
function prepSessionsOfWeek(sun){
  return plan.prepSessions.map(p=>{
    const dow = DOWN.findIndex(x=>x.toLowerCase()===String(p.day).slice(0,3).toLowerCase()); if (dow<0) return null;
    const date = add(sun, dow);
    const covers = String(p.covers||'').split(/[\s,]+/).filter(Boolean).map(x=>DOWN.findIndex(y=>y.toLowerCase()===x.slice(0,3).toLowerCase())).filter(i=>i>=0).map(i=>add(sun,i));
    return { day:p.day, date, covers, minutes:+p.minutes||0, time:p.time||'', brine:p.brine||'' };
  }).filter(Boolean).sort((a,b)=>a.date<b.date?-1:1);
}
/** Sauce batches per prep session, counted in servings. Leftovers carry forward while they keep; half batches allowed. */
function weekSauces(sun){
  return cached('ws'+sun, ()=>{
    const stock = [], out = {};
    prepSessionsOfWeek(sun).forEach(ps=>{
      const res = out[ps.date] = [], uses = {};
      servings(ps.covers).forEach(sv=>rowsFor(sv.meal.id).filter(isSauceRow).forEach(r=>{ const sc = sauceFor(r.item); if (!sc || !sauceServ(sc)) return; (uses[sc.sauce] = uses[sc.sauce] || []).push({ s:sv.s, slot:sv.slot, meal:sv.meal, row:r }); }));
      Object.entries(uses).forEach(([name, list])=>{
        const sc = plan.sauces.find(x=>x.sauce===name), per = sauceServ(sc), keep = keepDays(sc.keeps);
        let need = 0, fromStock = 0;
        list.forEach(u=>{ const st = stock.find(x=>x.sauce===name && x.exp >= u.s && x.n > 0); if (st){ st.n--; fromStock++; } else need++; });
        const batches = need ? Math.ceil(need/per*2)/2 : 0;
        if (batches) stock.push({ sauce:name, n:batches*per - need, exp:add(ps.date, keep) });
        res.push({ sauce:sc, need, total:list.length, fromStock, batches, keep, uses:list, left: batches ? batches*per - need : 0 });
      });
    });
    return out;
  });
}
function prepFor(s){
  return cached('prep'+s, ()=>{
    const sun = weekStart(s), ps = prepSessionsOfWeek(sun).find(p=>p.date===s); if (!ps) return null;
    const sv = servings(ps.covers); if (!sv.length) return null;
    const rows = [];
    sv.forEach(x=>scaledRows(x.meal, x.half).forEach(r=>{ if (PREP_KINDS.includes(prepKind(r)) && !isSauceRow(r)) rows.push(Object.assign(r, { sv:x })); }));
    const containers = sv.filter(x=>x.meal.cook==='prep'), tonight = sv.filter(x=>cooksTonight(x.meal));
    const chickenOz = rows.filter(r=>/^chicken breast/i.test(r.buy||'') && WT[r.unit]).reduce((a,r)=>a+toBase(+r.qty||0, r.unit),0);
    const brineTsp = rows.filter(r=>prepKind(r)==='brine' && VOL[r.unit]).reduce((a,r)=>a+toBase(+r.qty||0, r.unit),0);
    const sauces = weekSauces(sun)[s] || [];
    if (!rows.length && !sauces.some(b=>b.batches)) return null;
    const dayName = d => DOWN[parse(d).getDay()];
    return { date:s, day:ps.day, covers:ps.covers, minutes:ps.minutes, time:ps.time, brineDay:ps.brine, sv, rows, containers, tonight, chickenOz, brineTsp, sauces,
      coversLabel: dayName(ps.covers[0])+'–'+dayName(ps.covers[ps.covers.length-1]) };
  });
}
/** "A+G/Chicken/chicken breast" → matching prep rows (not the brine). */
function selRows(p, spec){
  const [ms, part, item] = String(spec).split('/').map(x=>(x||'').trim());
  const meals = ms.split('+').map(x=>x.trim()).filter(Boolean);
  return p.rows.filter(r=> meals.includes(r.meal) && prepKind(r)!=='brine' && (!part || String(r.part).toLowerCase()===part.toLowerCase()) && (!item || String(r.item).toLowerCase().startsWith(item.toLowerCase())));
}
function prepNeeds(p, needs){
  needs = String(needs||'').trim();
  if (needs==='sauces') return p.sauces.some(b=>b.batches);
  if (needs==='containers') return p.containers.length > 0;
  return selRows(p, needs).length > 0;
}
const cupsOf = l => l && l.unit==='tsp' && hasQty(l.qty) ? l.qty/48 : 0;
/** Fill a Prep steps template. Returns { html, lists } where lists are ingredient grids to show under the text. */
function fillPrep(tpl, p){
  const lists = [];
  let t = stepText(tpl).replace(/\{(list|amt|n|dry|water|pouches):([^}]+)\}/g, (m, kind, spec)=>{
    spec = spec.trim();
    if (kind==='list'){ lists.push(aggregate(selRows(p, spec))); return ''; }
    if (kind==='n'){ const meals = spec.split('+').map(x=>x.trim()); const n = p.containers.filter(x=>meals.includes(x.meal.id)).length; return n+' portion'+(n===1?'':'s'); }
    const l = aggregate(selRows(p, spec))[0];
    if (!l) return '—';
    if (kind==='amt') return esc(fmtLine(l.qty, l.unit, l.item).a);
    const cooked = cupsOf(l), dry = Math.ceil(cooked/3*4 - 1e-9)/4;
    if (kind==='dry') return esc(volStr(dry*48));
    if (kind==='water') return esc(volStr(dry*2.5*48));
    if (kind==='pouches'){ const n = Math.max(1, Math.ceil(cooked/2 - 1e-9)); return n+' microwave pouch'+(n>1?'es':''); }
    return m;
  });
  const parts = t.split(/\s*¶\s*/);
  let html = '<div class="pt">'+parts[0]+'</div>';
  if (parts.length > 1) html += '<ul class="opts">'+parts.slice(1).map(x=>'<li>'+x+'</li>').join('')+'</ul>';
  return { html, lists };
}

/* ---------- groceries ---------- */
function storeFor(buy, unit){
  const rows = plan.storeUnits.filter(r=>String(r.ingredient).toLowerCase()===String(buy).toLowerCase());
  let r = rows.find(x=>x.unit===unit); if (r) return { r, f:+r.factor||1 };
  if (VOL[unit]){ r = rows.find(x=>VOL[x.unit]); if (r) return { r, f:(+r.factor||1)*VOL[unit]/VOL[r.unit] }; }
  if (WT[unit]){ r = rows.find(x=>WT[x.unit]); if (r) return { r, f:(+r.factor||1)*WT[unit]/WT[r.unit] }; }
  r = rows.find(x=>x.store_unit===unit); if (r) return { r, f:1 };
  return null;
}
function roundUp(v, step){ if (!step) return v; return Math.ceil(v/step - 1e-9)*step; }
const pluralUnit = (u, q) => q > 1 && !/^(lb|oz|g|each)$/.test(u) && !/s$/.test(u) ? (/(ch|sh|x)$/.test(u) ? u+'es' : u+'s') : u;
function storeQtyStr(q, unit){
  if (unit==='lb') return frac(q, SETS.quarter)+' lb';
  if (unit==='oz') return ozStr(q);
  if (VOL[unit]) return volStr(q*VOL[unit]);
  if (!unit || unit==='each') return frac(q, SETS.third);
  if (unit==='g') return Math.round(q)+' g';
  return frac(q, SETS.third)+' '+pluralUnit(unit, q);
}
function groceries(sun){
  return cached('g'+sun, ()=>{
    const dates = weekDates(sun), lines = [];
    const push = (buy, qty, unit, section) => { if (!none(buy) || /staple|sauce/i.test(section||'') || !hasQty(qty)) return; lines.push({ buy, qty:+qty, unit, section }); };
    servings(dates).forEach(sv=>scaledRows(sv.meal, sv.half).forEach(r=>push(r.buy, r.qty, r.unit, r.section)));
    dates.filter(inPlan).forEach(s=>{
      const d = dayPlan(s);
      plan.dailyGroceries.forEach(g=>{ if (matchWhen(g.when, d)) push(g.item, g.qty, g.unit, g.section); });
      if (d.type==='refill') plan.refillExtras.forEach(x=>push(x.item, x.qty, x.unit, x.section));
    });
    Object.values(weekSauces(sun)).flat().forEach(b=>{ if (b.batches) sauceRows(b.sauce, b.batches).forEach(i=>push(i.buy, i.qty, i.unit, i.section)); });
    const items = {};
    lines.forEach(l=>{
      const st = storeFor(l.buy, l.unit);
      let name, unit, qty, round = 0, note = '';
      if (st){ name = st.r.buy_as || l.buy; unit = st.r.store_unit; qty = l.qty*st.f; round = +st.r.round||0; note = st.r.note||''; }
      else { name = l.buy; unit = baseUnit(l.unit); qty = toBase(l.qty, l.unit); }
      const key = name.toLowerCase()+'|'+unit;
      const it = items[key] = items[key] || { key, name, unit, qty:0, round, note, section:l.section };
      it.qty += qty; if (round) it.round = round; if (note) it.note = note;
    });
    const list = Object.values(items).map(it=>{
      let q = it.qty;
      if (it.round) q = roundUp(q, it.round);
      else if (!it.unit || it.unit==='each') q = Math.ceil(q - 1e-9);
      return Object.assign(it, { qty:q, label:storeQtyStr(q, it.unit) });
    });
    const order = ['Produce','Meat & fish','Dairy','Grains','Pantry'];
    const groups = order.map(sec=>({ section:sec, items:list.filter(i=>i.section===sec).sort((a,b)=>a.name.localeCompare(b.name)) }));
    list.filter(i=>!order.includes(i.section)).forEach(i=>{ let g = groups.find(x=>x.section===i.section); if (!g){ g = { section:i.section, items:[] }; groups.push(g); } g.items.push(i); });
    const travel = dates.some(s=>inPlan(s) && ['travel','arrival','yacht'].includes(dayPlan(s).kind));
    return { sun, groups:groups.filter(g=>g.items.length), staples:plan.pantryStaples, packing: travel ? plan.travelPacking : [], empty:!lines.length };
  });
}
function groceryText(g){
  let t = 'Groceries, week of '+weekLabel(g.sun)+'\n';
  g.groups.filter(x=>x.section!=='Pantry').forEach(x=>{ t += '\n'+x.section+'\n'+x.items.map(i=>'- '+i.name+': '+i.label).join('\n')+'\n'; });
  const p = g.groups.find(x=>x.section==='Pantry');
  t += '\nPantry (check stock)\n'+(p ? p.items.map(i=>'- '+i.name+': '+i.label).join('\n')+'\n' : '')+g.staples.map(s=>'- '+s).join('\n')+'\n';
  if (g.packing.length) t += '\nPack for travel\n'+g.packing.map(i=>'- '+i.item).join('\n')+'\n';
  return t;
}
function groceryChecks(sun){ const all = LOG.meta.groceries || {}; return all[sun] || {}; }
function groceryToggle(input){
  const sun = input.dataset.week, key = input.dataset.groc;
  const all = Object.assign({}, LOG.meta.groceries || {}); const wk = Object.assign({}, all[sun] || {});
  if (input.checked) wk[key] = true; else delete wk[key];
  all[sun] = wk;
  // Keep only the last few weeks so the store doesn't grow.
  Object.keys(all).sort().slice(0,-4).forEach(k=>delete all[k]);
  saveMeta('groceries', all);
  const row = input.closest('.gi'); if (row) row.classList.toggle('got', input.checked);
}

/* ---------- recipe card ---------- */
/** What one prep container holds, in plain words. */
function containerLines(m, half){
  const rows = scaledRows(m, half), out = { hot:[], cold:[], jar:[], fresh:[] };
  const main = kind => { const seen = new Set(); rows.filter(r=>prepKind(r)===kind && hasQty(r.qty)).forEach(r=>{ if (seen.has(r.part)) return; seen.add(r.part);
    if (/^chicken breast/i.test(r.buy||'') && WT[r.unit]) out[kind].push('about '+ozStr(toBase(+r.qty, r.unit)*0.75)+' cooked chicken ('+ozStr(toBase(+r.qty, r.unit))+' raw)');
    else { const f = fmtLine(r.qty, r.unit, r.item); out[kind].push(f.a+' '+f.i); } }); };
  main('hot');
  rows.filter(r=>prepKind(r)==='cold' && hasQty(r.qty)).forEach(r=>{ const f = fmtLine(r.qty, r.unit, r.item); out.cold.push(f.a+' '+f.i); });
  rows.filter(r=>prepKind(r)==='jar').forEach(r=>{ const f = fmtLine(r.qty, r.unit, r.item); out.jar.push(f.a+' '+f.i); });
  rows.filter(r=>(!prepKind(r) || prepKind(r)==='-') && none(r.buy) && hasQty(r.qty)).forEach(r=>{ const f = fmtLine(r.qty, r.unit, r.item); out.fresh.push(f.a+' '+f.i); });
  return out;
}
function containerHTML(m, half){
  const c = containerLines(m, half);
  let h = '<div class="box">';
  if (c.hot.length) h += '<div><b>Container:</b> '+esc(c.hot.join(' · '))+'</div>';
  if (c.cold.length) h += '<div><b>Side container (cold):</b> '+esc(c.cold.join(' · '))+'</div>';
  if (c.jar.length) h += '<div><b>From the jar:</b> '+esc(c.jar.join(' · '))+'</div>';
  if (c.fresh.length) h += '<div><b>Add fresh:</b> '+esc(c.fresh.join(' · '))+'</div>';
  return h+'</div>';
}
function recipeSteps(m, phase){ return (plan.recipes[m.id]||[]).filter(s=>(String(s.phase||'cook').toLowerCase()||'cook')===phase).sort((a,b)=>(+a.step)-(+b.step)); }
function ingredientsHTML(m, half){
  const rows = scaledRows(m, half).map(r=>Object.assign(r, { note: isSauceRow(r) ? (sauceServ(sauceFor(r.item)) ? 'from the jar' : '') : prepKind(r)==='bag' ? 'prepped on meal-prep day' : '' }));
  return ingGrid(byPart(rows));
}
function recipeCardHTML(m, opt){
  opt = opt || {};
  const isPrep = m.cook==='prep', eating = !!opt.date;
  const cook = recipeSteps(m, 'cook'), serve = recipeSteps(m, 'serve');
  const d = opt.date ? dayPlan(opt.date) : null;
  const ol = (st, cls) => '<ol class="'+(cls||'steps big')+'">'+st.map(s=>'<li>'+stepText(s.text)+'</li>').join('')+'</ol>';
  let h = '<div class="rc">';
  h += '<div class="rch"><b>'+esc(mealLabel(m))+'</b><span class="rtag '+(cooksTonight(m)?'tonight':'')+'">'+(cooksTonight(m) ? 'Cook · '+esc(m.cook) : isPrep ? 'From prep' : '')+'</span></div>';
  if (m.kcal) h += '<p class="muted num small">'+[m.kcal+' kcal', m.protein+' g protein', m.carbs&&m.carbs+' g carbs', m.fat&&m.fat+' g fat'].filter(Boolean).join(' · ')+(opt.half ? ' · half rice tonight' : '')+'</p>';
  if (none(m.description)) h += '<p class="small">'+esc(m.description)+'</p>';
  if (isPrep && eating){
    if (serve.length) h += '<h4>Eat it</h4>'+ol(serve);
    h += '<h4>Your container'+(opt.half ? ' (half rice)' : '')+'</h4>'+containerHTML(m, opt.half);
    h += '<details class="more"><summary>Cook it from scratch (1 serving)</summary><h4>Ingredients</h4>'+ingredientsHTML(m, opt.half)+(cook.length ? '<h4>Steps</h4>'+ol(cook) : '')+'</details>';
  } else {
    if (rowsFor(m.id).length) h += '<h4>Ingredients'+(opt.half ? ' (half rice)' : '')+'</h4>'+ingredientsHTML(m, opt.half);
    if (cook.length) h += '<h4>Steps</h4>'+ol(cook);
    if (isPrep && serve.length) h += '<h4>From a meal-prep container</h4>'+ol(serve, 'steps');
  }
  if (opt.slot==='dinner' && plan.sideSalad.length) h += '<div class="box mt"><b>On the side:</b> '+esc(plan.sideSalad.map(r=>{ const f = fmtLine(r.qty, r.unit, r.item); return (f.a ? f.a+' ' : '')+f.i; }).join(' · '))+'</div>';
  if (d && d.type==='refill' && plan.refillExtras.length) h += '<p class="refill small"><b>Refill day, about +150 g carbs:</b> '+plan.refillExtras.map(x=>{ const f = fmtLine(x.qty, x.unit, x.item); return esc(f.a+' '+f.i); }).join(', ')+', spread across the day.</p>';
  mealSauces(m).forEach(sc=>{
    if (!sauceServ(sc)) return;
    const used = rowsFor(m.id).some(r=>isSauceRow(r) && sauceFor(r.item)===sc);
    h += '<details class="sauce"><summary>'+(used ? 'How to make the ' : 'Swap: ')+esc(sc.sauce.toLowerCase())+'</summary>'+sauceCardHTML(sc, 1)+'</details>';
  });
  const trick = plan.tricks[m.trick];
  if (trick) h += '<div class="trick"><b>Chef trick</b>'+esc(trick)+'</div>';
  return h+'</div>';
}
function openSheet(html){ const s = $('#sheet'); s.querySelector('.sheet-body').innerHTML = html; s.hidden = false; document.body.classList.add('noscroll'); s.querySelector('.sheet-card').scrollTop = 0; s.querySelector('.sheet-close').focus(); }
function closeSheet(){ const s = $('#sheet'); s.hidden = true; document.body.classList.remove('noscroll'); }
function sauceSheetHTML(name, x){
  const sc = plan.sauces.find(s=>s.sauce===name); if (!sc) return '';
  let h = '<div class="rc"><div class="scale sm mt" role="group" aria-label="Batch size">'+[0.5,1,2].map(v=>'<button data-act="sauce" data-sauce="'+esc(name)+'" data-x="'+v+'" class="'+(v===x?'on':'')+'">'+batchLabel(v)+'</button>').join('')+'</div>';
  h += sauceCardHTML(sc, x)+(none(sc.note) ? '<p class="small muted mt">'+esc(sc.note)+' '+esc(sc.kcal||'')+'.</p>' : '')+'</div>';
  return h;
}

/* ---------- Food tab ---------- */
function defaultWeek(viewName){
  const t = clampDate(todayStr()); let sun = weekStart(t);
  if (viewName==='groceries' && parse(todayStr()).getDay()===6 && add(sun,7) <= lastWeek()) sun = add(sun,7);
  return sun < firstWeek() ? firstWeek() : sun > lastWeek() ? lastWeek() : sun;
}
function openFood(view, s){
  UI.tab = 'food'; UI.food.view = view;
  UI.food.week = view==='groceries' && parse(s).getDay()===6 ? add(weekStart(s),7) : weekStart(s);
  if (UI.food.week > lastWeek()) UI.food.week = lastWeek();
  if (UI.food.week < firstWeek()) UI.food.week = firstWeek();
  UI.food.prep = view==='prep' ? s : null;
  render(); scrollTo(0,0);
}
function renderFood(){
  const v = UI.food.view, sun = UI.food.week || defaultWeek(v);
  UI.food.week = sun;
  let h = '<div class="segtabs" role="tablist">'+[['menu','Menu'],['prep','Meal prep'],['recipes','Recipes'],['groceries','Groceries']].map(([k,l])=>'<button role="tab" data-act="fview" data-v="'+k+'" aria-selected="'+(v===k)+'">'+l+'</button>').join('')+'</div>';
  if (v!=='recipes') h += '<div class="weekbar"><button class="nav" data-act="fweek" data-d="-7" aria-label="Previous week" '+(sun<=firstWeek()?'disabled':'')+'>‹</button><div class="mid"><b>Week of '+weekLabel(sun)+'</b>'+(sun===weekStart(todayStr())?'<div class="sub">This week</div>':sun===add(weekStart(todayStr()),7)?'<div class="sub">Next week</div>':'')+'</div><button class="nav" data-act="fweek" data-d="7" aria-label="Next week" '+(sun>=lastWeek()?'disabled':'')+'>›</button></div>';
  if (v==='menu') h += renderMenu(sun);
  else if (v==='prep') h += renderPrep(sun);
  else if (v==='recipes') h += renderRecipes();
  else h += renderGroceries(sun);
  return h;
}
function mealButton(lab, m, s, half){
  const tonight = cooksTonight(m);
  if (!rowsFor(m.id).length) return '<div class="mrow plain"><span class="ml">'+lab+'</span><span class="mn"><b>'+esc(m.name)+'</b><small>'+esc(none(m.description)||'')+'</small></span></div>';
  return '<button class="mrow" data-act="recipe" data-meal="'+esc(m.id)+'" data-date="'+s+'" data-half="'+(half?1:0)+'" data-slot="'+lab.toLowerCase()+'">'+
    '<span class="ml">'+lab+'</span><span class="mn"><b>'+esc(mealLabel(m))+'</b><small>'+esc(tonight ? 'Cook tonight · '+m.cook : m.cook==='prep' ? 'From meal prep · reheat 3 min' : '')+(half?' · half rice':'')+'</small></span>'+
    '<span class="rtag '+(tonight?'tonight':'')+'">'+(tonight?'Cook':'Prep')+'</span></button>';
}
function renderMenu(sun){
  let h = '';
  const ses = prepSessionsOfWeek(sun).map(ps=>({ ps, p:prepFor(ps.date) })).filter(x=>x.p);
  if (ses.length) h += '<div class="prepstrip">'+ses.map(({ps,p})=>'<button class="pschip" data-act="goprep" data-d="'+ps.date+'"><b>'+DAYFULL[parse(ps.date).getDay()]+' prep</b><span>'+esc(ps.time)+' · about '+ps.minutes+' min</span><span>Makes '+p.containers.length+' meals for '+esc(p.coversLabel)+' ›</span></button>').join('')+'</div>';
  h += '<div class="list menu">';
  weekDates(sun).forEach(s=>{
    if (!inPlan(s)){ h += '<div class="mday off"><div class="md1"><b>'+DOWN[parse(s).getDay()]+'</b><span>'+short(s)+'</span></div><div class="md2 muted small">'+(s<plan.settings.start?'Before the plan starts':'After the plan')+'</div></div>'; return; }
    const d = dayPlan(s), isPrepDay = ses.some(x=>x.ps.date===s);
    h += '<div class="mday'+(s===todayStr()?' today':'')+'"><div class="md1"><b>'+DOWN[parse(s).getDay()]+'</b><span>'+short(s)+'</span></div><div class="md2"><div class="mdt small muted">'+esc(d.dt.label||d.type)+(none(d.dt.calories)?' · '+esc(d.dt.calories)+' kcal':'')+(isPrepDay?' · <b class="accent">meal prep</b>':'')+'</div>';
    if (d.kind!=='home'){ h += '<div class="small">No cooking: '+esc(d.kind==='travel'?'travel day, eat packed food':'familiar meals out, protein at every meal')+'.</div></div></div>'; return; }
    if (d.lunch) h += mealButton('Lunch', d.lunch, s, false);
    if (d.dinner) h += mealButton('Dinner', d.dinner, s, isHalf(d.dinnerNote));
    if (d.type==='refill' && plan.refillExtras.length) h += '<div class="refill small"><b>+150 g carbs:</b> '+plan.refillExtras.map(x=>{ const f = fmtLine(x.qty, x.unit, x.item); return esc(f.a+' '+f.i); }).join(', ')+'</div>';
    h += '</div></div>';
  });
  h += '</div><p class="small muted mt">Breakfast is the same shake every day; it\'s on the Today tab.</p>';
  return h;
}
function renderRecipes(){
  const meals = Object.entries(plan.meals).filter(([id])=>rowsFor(id).length).map(([id,m])=>Object.assign({id}, m));
  let h = '<div class="gh"><h3>Meals</h3><span>tap for the full recipe</span></div><div class="list">';
  h += meals.map(m=>'<button class="rrow" data-act="recipe" data-meal="'+esc(m.id)+'"><span class="rid">'+esc(m.id)+'</span><span class="mn"><b>'+esc(m.name)+'</b><small>'+esc((m.kcal?m.kcal+' kcal · '+m.protein+' g protein · ':'')+(cooksTonight(m)?'cook '+m.cook:'meal prep'))+'</small></span><span class="chev">›</span></button>').join('');
  h += '</div><div class="gh"><h3>Sauces</h3><span>made on meal-prep day</span></div><div class="list">';
  h += plan.sauces.filter(sc=>sauceServ(sc)).map(sc=>'<button class="rrow" data-act="sauce" data-sauce="'+esc(sc.sauce)+'" data-x="1"><span class="mn"><b>'+esc(sc.sauce)+'</b><small>'+esc(sc.serving+' per serving · keeps '+sc.keeps+' · '+sc.time)+'</small></span><span class="chev">›</span></button>').join('');
  h += '</div>';
  const t = Object.entries(plan.tricks);
  if (t.length) h += '<div class="gh"><h3>Chef tricks</h3></div><div class="card"><ol class="steps">'+t.map(([n,x])=>'<li>'+esc(x)+'</li>').join('')+'</ol></div>';
  return h;
}
function renderPrep(sun){
  const sessions = prepSessionsOfWeek(sun);
  if (!sessions.length) return '<p class="muted mt">No prep sessions in plan.md.</p>';
  let cur = sessions.find(x=>x.date===UI.food.prep) || sessions.find(x=>x.date>=todayStr() && prepFor(x.date)) || sessions.find(x=>prepFor(x.date)) || sessions[0];
  UI.food.prep = cur.date;
  let h = '<div class="seg2 mt" role="tablist">'+sessions.map(ps=>'<button role="tab" data-act="fprep" data-d="'+ps.date+'" aria-selected="'+(ps.date===cur.date)+'"><b>'+DAYFULL[parse(ps.date).getDay()]+'</b><span>'+short(ps.date)+' · '+esc(ps.time)+'</span></button>').join('')+'</div>';
  const p = prepFor(cur.date);
  if (!p){ return h+'<div class="card mt"><p class="muted">Nothing to prep on '+pretty(cur.date)+': no meals from prep in '+DOWN[parse(cur.covers[0]).getDay()]+'–'+DOWN[parse(cur.covers[cur.covers.length-1]).getDay()]+(cur.date<plan.settings.start?' before the plan starts':'')+'.</p></div>'; }
  h += '<div class="card mt prep" id="prep-'+p.date+'">';
  h += '<div class="rch"><h3>'+DAYFULL[parse(p.date).getDay()]+' meal prep</h3><span class="muted small">'+esc(p.time)+' · about '+p.minutes+' min</span></div>';
  if (p.date < plan.settings.start) h += '<p class="small warnline mt">This session falls before the plan starts. Use it for your first prep if you haven\'t cooked yet.</p>';
  // What it makes
  h += '<h4>Makes</h4><div class="makes">'+p.containers.map(x=>'<span class="mk">'+esc(slotLabel(x))+' · <b>'+esc(x.meal.id)+'</b>'+(x.half?' <i>½ rice</i>':'')+'</span>').join('')+'</div>';
  const helped = p.tonight.filter(x=>p.rows.some(r=>r.sv===x) || p.sauces.some(b=>b.uses.some(u=>u.s===x.s && u.slot===x.slot)));
  if (helped.length) h += '<p class="small muted">Also gets things ready for '+helped.map(x=>esc(slotLabel(x))+' ('+esc(x.meal.id)+')').join(', ')+', which you cook fresh.</p>';
  // Night before
  if (p.chickenOz) h += '<div class="night"><b>'+esc(p.brineDay ? DAYFULL[DOWN.findIndex(x=>x.toLowerCase()===String(p.brineDay).slice(0,3).toLowerCase())]||p.brineDay : 'The night before')+' night: dry-brine the chicken</b><p>'+esc(ozStr(p.chickenOz))+' chicken breast + <b>'+esc(volStr(p.brineTsp))+' Morton kosher salt</b> ('+esc(volStr(p.brineTsp*5/3))+' if it\'s Diamond Crystal). Pat the chicken dry, sprinkle the salt on every side, and leave it uncovered on a plate in the fridge overnight. It seasons the meat all the way through and keeps it juicy.</p></div>';
  // Gear
  const cold = p.containers.filter(x=>scaledRows(x.meal,x.half).some(r=>prepKind(r)==='cold')).length, jars = p.sauces.filter(b=>b.batches).length;
  h += '<h4>Gear</h4><p class="small">Air fryer · instant-read thermometer · rice cooker or a pot with a lid · '+p.containers.length+' meal containers'+(cold?' · '+cold+' small side containers':'')+(jars?' · '+jars+' jars for sauces':'')+'</p>';
  // Everything you need
  const sauceIng = p.sauces.filter(b=>b.batches).flatMap(b=>sauceRows(b.sauce, b.batches).filter(r=>!/^(warm )?water/i.test(r.item)).map(r=>Object.assign(r, { part:r.section })));
  const all = aggregate(p.rows.filter(r=>prepKind(r)!=='brine' && !/^(warm )?water/i.test(r.item)).map(r=>Object.assign({}, r, { part:r.section })).concat(sauceIng));
  const secOrder = ['Meat & fish','Produce','Grains','Dairy','Pantry','Staple'];
  h += '<details class="more"><summary>Everything you need for this prep</summary>'+ingGrid(secOrder.map(sec=>({ part: sec==='Staple' ? 'Spices and staples' : sec, lines:all.filter(l=>(l.section||'Staple')===sec) })).concat([{ part:'Other', lines:all.filter(l=>!secOrder.includes(l.section||'Staple')) }]))+'</details>';
  // Steps
  const checks = (LOG.meta.prepChecks||{})[p.date] || {};
  const steps = plan.prepSteps.filter(st=>prepNeeds(p, st.needs));
  h += '<h4>Steps</h4><ol class="psteps">';
  steps.forEach((st,i)=>{
    const f = fillPrep(st.step, p), on = !!checks[i];
    h += '<li class="'+(on?'done':'')+'"><input type="checkbox" aria-label="Step '+(i+1)+' done" data-pstep="'+i+'" data-pdate="'+p.date+'" '+(on?'checked':'')+'><span class="sn">'+(i+1)+'</span><div class="pc">'+f.html+f.lists.filter(l=>l.length).map(l=>ingGrid([{ lines:l }])).join('');
    if (String(st.needs).trim()==='sauces') p.sauces.forEach(b=>{
      if (b.batches) h += sauceCardHTML(b.sauce, b.batches, 'Make '+batchLabel(b.batches));
      else h += '<p class="small muted">'+esc(b.sauce.sauce)+': you still have enough from the last batch.</p>';
    });
    h += '</div></li>';
  });
  h += '</ol>';
  // Pack
  if (p.containers.length){
    const groups = []; p.containers.forEach(x=>{ let g = groups.find(y=>y.m.id===x.meal.id); if (!g){ g = { m:x.meal, list:[] }; groups.push(g); } g.list.push(x); });
    h += '<h4>Pack the containers</h4>';
    groups.forEach(g=>{
      const halfOne = g.list.find(x=>x.half);
      h += '<div class="pack"><div class="rch"><b>'+esc(mealLabel(g.m))+'</b><span class="rtag">'+g.list.length+' container'+(g.list.length>1?'s':'')+'</span></div>';
      h += '<p class="small muted">'+g.list.map(x=>esc(slotLabel(x))+(x.half?' (half rice)':'')).join(' · ')+'</p>';
      h += '<p class="small"><b>'+(g.list.length>1?'Each one gets':'It gets')+':</b></p>'+containerHTML(g.m, false);
      if (halfOne){ const hr = scaledRows(g.m, true).find(halvable); if (hr) h += '<p class="small muted">The half-rice one gets '+esc(fmtLine(hr.qty, hr.unit, hr.item).a)+' rice instead.</p>'; }
      h += '<p class="small muted">Label the lid with the day. Sauces stay in their jars; spoon them on when you eat.</p></div>';
    });
  }
  // Cooked fresh
  if (p.tonight.length) h += '<h4>Cooked fresh on the night</h4><ul class="labels">'+p.tonight.map(c=>'<li><button class="linkbtn" data-act="recipe" data-meal="'+esc(c.meal.id)+'" data-date="'+c.s+'" data-half="'+(c.half?1:0)+'" data-slot="'+c.slot+'">'+esc(slotLabel(c))+': '+esc(mealLabel(c.meal))+'</button> <span class="muted small">'+esc(c.meal.cook)+(none(c.meal.description) && /marinade/i.test(c.meal.cook) ? ' · '+esc(c.meal.description) : '')+'</span></li>').join('')+'</ul>';
  h += '</div>';
  return h;
}
function renderGroceries(sun){
  const g = groceries(sun), checks = groceryChecks(sun);
  let h = '<div class="card mt"><div class="rch"><h3>Groceries</h3><button class="btn ghost sm" data-act="gshare">Share / Copy</button></div>';
  h += '<p class="small muted">Everything for '+weekLabel(sun)+': both meal preps, the dinners you cook fresh, breakfasts and snacks. Shop Saturday '+short(add(sun,-1))+'. Ticks reset each week.</p>';
  if (g.empty) h += '<p class="muted">No home meals this week.</p>';
  const item = (i, sec) => { const k = (sec+'|'+i.key).replace(/"/g,''); return '<label class="gi'+(checks[k]?' got':'')+'"><input type="checkbox" data-groc="'+esc(k)+'" data-week="'+sun+'" '+(checks[k]?'checked':'')+'><span class="gn">'+esc(i.name)+(i.note?'<small>'+esc(i.note)+'</small>':'')+'</span><span class="gq num">'+esc(i.label||'')+'</span></label>'; };
  g.groups.filter(x=>x.section!=='Pantry').forEach(x=>{ h += '<h4>'+esc(x.section)+'</h4><div class="glist">'+x.items.map(i=>item(i,x.section)).join('')+'</div>'; });
  const p = g.groups.find(x=>x.section==='Pantry');
  h += '<details class="stock"><summary><h4>Pantry: check you have it</h4></summary><div class="glist">'+(p?p.items.map(i=>item(i,'Pantry')).join(''):'')+g.staples.map(s=>item({key:'staple-'+s,name:s,label:'stock'},'Pantry')).join('')+'</div></details>';
  if (g.packing.length) h += '<h4>Pack for travel</h4><div class="glist">'+g.packing.map(i=>item({key:'pack-'+i.item,name:i.item,note:i.note,label:''},'Pack')).join('')+'</div>';
  return h + '</div>';
}
/** Food-tab buttons. Returns true when handled. */
function foodAction(a, t){
  if (a==='fweek'){ UI.food.week = add(UI.food.week, +t.dataset.d); UI.food.prep = null; render(); return true; }
  if (a==='fview'){ UI.food.view = t.dataset.v; render(); return true; }
  if (a==='fprep'){ UI.food.prep = t.dataset.d; keepScroll(render); return true; }
  if (a==='goprep'){ UI.food.view = 'prep'; UI.food.prep = t.dataset.d; render(); scrollTo(0,0); return true; }
  if (a==='recipe'){
    const m = Object.assign({id:t.dataset.meal}, plan.meals[t.dataset.meal]||{}), dt = t.dataset.date;
    openSheet((dt ? '<p class="small muted">'+esc(pretty(dt))+(t.dataset.slot ? ' · '+esc(t.dataset.slot) : '')+'</p>' : '')+recipeCardHTML(m, { half: t.dataset.half==='1', date: dt || null, slot: t.dataset.slot || '' }));
    return true;
  }
  if (a==='sauce'){ openSheet(sauceSheetHTML(t.dataset.sauce, +t.dataset.x || 1)); return true; }
  if (a==='sheet-close'){ closeSheet(); return true; }
  if (a==='gshare'){ shareOrCopy('Groceries', groceryText(groceries(UI.food.week))).then(r=>toast(r==='copied'?'List copied':r==='shared'?'Shared':r==='cancelled'?'Cancelled':'Couldn’t share')); return true; }
  return false;
}
document.addEventListener('change', e=>{
  const t = e.target; if (!t.dataset || !t.dataset.pstep) return;
  const all = Object.assign({}, LOG.meta.prepChecks || {}), d = Object.assign({}, all[t.dataset.pdate] || {});
  if (t.checked) d[t.dataset.pstep] = true; else delete d[t.dataset.pstep];
  all[t.dataset.pdate] = d; Object.keys(all).sort().slice(0,-6).forEach(k=>delete all[k]);
  saveMeta('prepChecks', all);
  const li = t.closest('li'); if (li) li.classList.toggle('done', t.checked);
});
document.addEventListener('keydown', e=>{ if (e.key==='Escape' && !$('#sheet').hidden) closeSheet(); });
