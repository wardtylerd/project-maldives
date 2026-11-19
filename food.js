/* Project Maldives — Food tab: weekly menu, meal prep and groceries.
   Everything is computed from plan.md tables: Meals, Ingredients, Recipes, Sauces,
   Sauce ingredients, Prep sessions, Prep steps, Store units, Daily groceries,
   Refill extras, Travel packing, Pantry staples. */
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

/* ---------- servings ---------- */
const rowsFor = id => plan.ingredients.filter(r=>r.meal===id);
const isHalf = note => /half/i.test(note||'');
/** Ingredient rows for one serving, with grains halved on "half rice" dinners. */
function scaledRows(meal, half){ return rowsFor(meal.id).map(r=>Object.assign({}, r, { qty: (+r.qty||0) * (half && /grain/i.test(r.section) ? 0.5 : 1) })); }
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

/* ---------- sauces ---------- */
const norm = t => String(t||'').toLowerCase().replace(/^quick-/,'').trim();
function sauceFor(name){ const n = norm(name); return plan.sauces.find(x=>{ const k = norm(x.sauce); return k===n || k.includes(n) || n.includes(k); }); }
function keepDays(k){ k = String(k||''); let m; if ((m = k.match(/(\d+)\s*weeks?/i))) return +m[1]*7; if ((m = k.match(/(\d+)\s*(?:[–-]\s*(\d+))?\s*days?/i))) return +(m[2]||m[1]); return 0; }
/** Sauces linked from a meal's sauce text, e.g. "Lime crema + pico de gallo". */
function mealSauces(m){ const t = norm(m && m.sauce); if (!t) return []; return plan.sauces.filter(x=>t.includes(norm(x.sauce).replace(/ sauce$/,''))); }

/* ---------- prep sessions ---------- */
function prepSessionsOfWeek(sun){
  return plan.prepSessions.map(p=>{
    const dow = DOWN.findIndex(x=>x.toLowerCase()===String(p.day).slice(0,3).toLowerCase()); if (dow<0) return null;
    const date = add(sun, dow);
    const covers = String(p.covers||'').split(/[\s,]+/).filter(Boolean).map(x=>DOWN.findIndex(y=>y.toLowerCase()===x.slice(0,3).toLowerCase())).filter(i=>i>=0).map(i=>add(sun,i));
    return { day:p.day, date, covers, minutes:+p.minutes||0, time:p.time||'', brine:p.brine||'' };
  }).filter(Boolean).sort((a,b)=>a.date<b.date?-1:1);
}
/** Sauce batches per prep session. Leftovers carry forward while they keep; half batches allowed. */
function weekSauces(sun){
  return cached('ws'+sun, ()=>{
    const sessions = prepSessionsOfWeek(sun), stock = [], out = {};
    sessions.forEach(ps=>{
      const res = out[ps.date] = [];
      const uses = {};
      servings(ps.covers).forEach(sv=>scaledRows(sv.meal, false).filter(r=>/sauce/i.test(r.section)).forEach(r=>{ const sc = sauceFor(r.ingredient); if (!sc || !(+sc.batch_g)) return; (uses[sc.sauce] = uses[sc.sauce] || []).push({ s:sv.s, g:r.qty, slot:sv.slot }); }));
      Object.entries(uses).forEach(([name, list])=>{
        const sc = plan.sauces.find(x=>x.sauce===name), bg = +sc.batch_g, keep = keepDays(sc.keeps);
        let need = 0, fromStock = 0;
        list.forEach(u=>{ let g = u.g; for (const st of stock){ if (st.sauce!==name || st.exp < u.s || st.g<=0) continue; const take = Math.min(st.g, g); st.g -= take; g -= take; fromStock += take; if (!g) break; } need += g; });
        const batches = need ? Math.ceil(need/bg*2)/2 : 0;
        if (batches){ stock.push({ sauce:name, g: batches*bg - need, exp: add(ps.date, keep) }); }
        res.push({ sauce:sc, need, total:list.reduce((a,u)=>a+u.g,0), fromStock, batches, keep, uses:list });
      });
    });
    return out;
  });
}
function prepFor(s){
  return cached('prep'+s, ()=>{
    const sun = weekStart(s), ps = prepSessionsOfWeek(sun).find(p=>p.date===s); if (!ps) return null;
    const sv = servings(ps.covers); if (!sv.length) return null;
    const agg = {}, containers = [], tonight = [];
    sv.forEach(x=>{
      const rows = scaledRows(x.meal, x.half);
      rows.filter(r=>r.batch!=='day-of' && !/sauce/i.test(r.section)).forEach(r=>{ const k = r.ingredient+'|'+r.unit; (agg[k] = agg[k] || { name:r.ingredient, unit:r.unit, qty:0, section:r.section }).qty += r.qty; });
      if (x.meal.cook==='prep') containers.push(x);
      else if (cooksTonight(x.meal)) tonight.push(x);
    });
    const items = Object.values(agg);
    const chickenG = items.filter(i=>/^chicken breast/i.test(i.name) && i.unit==='g').reduce((a,i)=>a+i.qty,0);
    const halfRice = sv.some(x=>x.half && x.meal.cook==='prep' && rowsFor(x.meal.id).some(r=>/rice/i.test(r.ingredient)));
    return { date:s, day:ps.day, covers:ps.covers, minutes:ps.minutes, time:ps.time, items, containers, tonight, chickenG, halfRice,
      sauces: (weekSauces(sun)[s]||[]), coversLabel: DOWN[parse(ps.covers[0]).getDay()]+'–'+DOWN[parse(ps.covers[ps.covers.length-1]).getDay()] };
  });
}

/* ---------- units ---------- */
function qtyStr(q, unit){
  const n = Math.round(q*100)/100;
  const s = Number.isInteger(n) ? String(n) : String(+n.toFixed(2)).replace(/^0\./,'.').replace(/^\./,'0.');
  if (unit==='each') return s;
  return s+' '+unit;
}
const fmtQty = (q, unit) => unit==='each' ? '×'+qtyStr(q,unit) : qtyStr(q,unit);
function storeRow(name, unit){ return plan.storeUnits.find(r=>r.ingredient.toLowerCase()===name.toLowerCase() && r.unit===unit) || null; }
function roundUp(v, step){ if (!step) return v; return Math.ceil(v/step - 1e-9)*step; }
/** "{buy:brown rice, cooked}" — the store/dry amount for a recipe quantity. */
function buyStr(name, qty, unit){ const r = storeRow(name, unit); if (!r) return qtyStr(qty, unit); return qtyStr(roundUp(qty*(+r.factor||1), +r.round||0), r.store_unit); }

/* ---------- groceries ---------- */
function groceries(sun){
  return cached('g'+sun, ()=>{
    const dates = weekDates(sun), lines = [];
    const push = (name, qty, unit, section, src) => lines.push({ name, qty:+qty||0, unit, section, src });
    servings(dates).forEach(sv=>scaledRows(sv.meal, sv.half).filter(r=>!/sauce/i.test(r.section)).forEach(r=>push(r.ingredient, r.qty, r.unit, r.section)));
    dates.filter(inPlan).forEach(s=>{
      const d = dayPlan(s);
      plan.dailyGroceries.forEach(g=>{ if (matchWhen(g.when, d)) push(g.item, g.qty, g.unit, g.section); });
      if (d.type==='refill') plan.refillExtras.forEach(x=>push(x.item, x.qty, x.unit, x.section));
    });
    Object.values(weekSauces(sun)).flat().forEach(b=>{ if (!b.batches) return; plan.sauceIngredients.filter(i=>i.sauce===b.sauce.sauce).forEach(i=>push(i.ingredient, (+i.qty||0)*b.batches, i.unit, i.section)); });
    // Same item in tsp and tbsp (or cups): convert all of them to tbsp so they merge.
    const VOL = { tsp:1/3, tbsp:1, cup:16 }, volUnits = {};
    lines.forEach(l=>{ if (VOL[l.unit]) (volUnits[l.name] = volUnits[l.name] || new Set()).add(l.unit); });
    lines.forEach(l=>{ if (VOL[l.unit] && volUnits[l.name].size > 1){ l.qty *= VOL[l.unit]; l.unit = 'tbsp'; } });
    // Convert to store units and merge.
    const items = {};
    lines.forEach(l=>{
      let r = storeRow(l.name, l.unit), name = l.name, unit = l.unit, qty = l.qty, round = 0, note = '';
      if (r){ name = r.buy_as || l.name; unit = r.store_unit; qty = l.qty*(+r.factor||1); round = +r.round||0; note = r.note||''; }
      else { const alt = plan.storeUnits.find(x=>x.ingredient.toLowerCase()===l.name.toLowerCase() && x.store_unit===l.unit); if (alt){ name = alt.buy_as; round = +alt.round||0; note = alt.note||''; } }
      const key = name.toLowerCase()+'|'+unit;
      const it = items[key] = items[key] || { key, name, unit, qty:0, round, note, section: l.section };
      it.qty += qty; if (round) it.round = round; if (note) it.note = note;
    });
    const list = Object.values(items).map(it=>{
      let q = it.qty;
      if (it.round) q = roundUp(q, it.round);
      else if (it.unit==='each' || it.unit==='leaves') q = Math.ceil(q - 1e-9);
      else if (it.unit==='g') q = roundUp(q, 10);
      else q = roundUp(q, 0.5);
      return Object.assign(it, { qty:q });
    });
    const order = ['Produce','Meat & fish','Dairy','Grains','Pantry'];
    const groups = order.map(sec=>({ section:sec, items:list.filter(i=>i.section===sec).sort((a,b)=>a.name.localeCompare(b.name)) }));
    list.filter(i=>!order.includes(i.section)).forEach(i=>{ let g = groups.find(x=>x.section===i.section); if(!g){ g={section:i.section,items:[]}; groups.push(g); } g.items.push(i); });
    const travel = dates.some(s=>inPlan(s) && ['travel','arrival','yacht'].includes(dayPlan(s).kind));
    return { sun, groups: groups.filter(g=>g.items.length), staples: plan.pantryStaples, packing: travel ? plan.travelPacking : [], empty: !lines.length };
  });
}
function groceryText(g){
  let t = 'Groceries, week of '+weekLabel(g.sun)+'\n';
  g.groups.filter(x=>x.section!=='Pantry').forEach(x=>{ t += '\n'+x.section+'\n'+x.items.map(i=>'- '+i.name+' '+fmtQty(i.qty,i.unit)).join('\n')+'\n'; });
  const p = g.groups.find(x=>x.section==='Pantry');
  t += '\nPantry (check stock)\n'+(p?p.items.map(i=>'- '+i.name+' '+fmtQty(i.qty,i.unit)).join('\n')+'\n':'')+g.staples.map(s=>'- '+s).join('\n')+'\n';
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
function recipeCardHTML(m, opt){
  opt = opt || {};
  const rows = scaledRows(m, opt.half);
  const steps = plan.recipes[m.id] || [];
  const trick = plan.tricks[m.trick];
  const sauces = mealSauces(m);
  const d = opt.date ? dayPlan(opt.date) : null;
  let h = '<div class="rc">';
  h += '<div class="rch"><b>'+esc(mealLabel(m))+'</b><span class="rtag '+(cooksTonight(m)?'tonight':'')+'">'+(cooksTonight(m)?'Cook tonight: '+esc(m.cook):m.cook==='prep'?'From meal prep':'')+'</span></div>';
  if (m.kcal) h += '<p class="muted num">'+[m.kcal+' kcal', 'P '+m.protein+' g', m.carbs&&'C '+m.carbs+' g', m.fat&&'F '+m.fat+' g'].filter(Boolean).join(' · ')+(opt.half?' · half rice tonight':'')+'</p>';
  if (m.description) h += '<p>'+esc(m.description)+'</p>';
  if (none(m.sauce)) h += '<p><b>Sauce:</b> '+esc(m.sauce)+'</p>';
  if (rows.length) h += '<h4>Ingredients</h4><ul class="ing">'+rows.map(r=>'<li><span>'+esc(r.ingredient)+'</span><span class="num">'+esc(qtyStr(r.qty,r.unit))+'</span></li>').join('')+'<li class="muted"><span>garlic, salt and spices</span><span>from the pantry</span></li></ul>';
  if (steps.length) h += '<h4>Steps</h4><ol class="steps">'+steps.map(s=>'<li>'+esc(s.text)+'</li>').join('')+'</ol>';
  if (d && d.type==='refill' && plan.refillExtras.length) h += '<p class="refill"><b>Refill day, about +150 g carbs:</b> '+plan.refillExtras.map(x=>esc(x.item)+' '+esc(qtyStr(+x.qty,x.unit))).join(', ')+', spread across the day.</p>';
  sauces.forEach(sc=>{ h += '<details class="sauce"><summary>'+esc(sc.sauce)+' recipe</summary><p>'+esc(sc.recipe)+'</p><p class="muted">Makes '+esc(sc.makes)+' · '+esc(sc['per serving'])+' · keeps '+esc(sc.keeps)+'</p></details>'; });
  if (trick) h += '<div class="trick"><b>Chef trick</b>'+esc(trick)+'</div>';
  return h+'</div>';
}
function openSheet(html){ const s = $('#sheet'); s.querySelector('.sheet-body').innerHTML = html; s.hidden = false; document.body.classList.add('noscroll'); s.querySelector('.sheet-close').focus(); }
function closeSheet(){ const s = $('#sheet'); s.hidden = true; document.body.classList.remove('noscroll'); }

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
  UI.food.prep = view==='prep' ? s : null;
  render(); scrollTo(0,0);
  if (UI.food.prep){ const el = document.getElementById('prep-'+s); if (el) el.scrollIntoView(); }
}
function renderFood(){
  const v = UI.food.view, sun = UI.food.week || defaultWeek(v);
  UI.food.week = sun;
  let h = '<div class="weekbar"><button class="nav" data-act="fweek" data-d="-7" aria-label="Previous week" '+(sun<=firstWeek()?'disabled':'')+'>‹</button><div class="mid"><b>Week of '+weekLabel(sun)+'</b>'+(sun===weekStart(todayStr())?'<div class="sub">This week</div>':sun===add(weekStart(todayStr()),7)?'<div class="sub">Next week</div>':'')+'</div><button class="nav" data-act="fweek" data-d="7" aria-label="Next week" '+(sun>=lastWeek()?'disabled':'')+'>›</button></div>';
  h += '<div class="segtabs" role="tablist">'+[['menu','Menu'],['prep','Meal prep'],['groceries','Groceries']].map(([k,l])=>'<button role="tab" data-act="fview" data-v="'+k+'" aria-selected="'+(v===k)+'">'+l+'</button>').join('')+'</div>';
  if (v==='menu') h += renderMenu(sun); else if (v==='prep') h += renderPrep(sun); else h += renderGroceries(sun);
  if (v==='menu') h += tricksHTML();
  return h;
}
function renderMenu(sun){
  let h = '<div class="list menu">';
  weekDates(sun).forEach(s=>{
    if (!inPlan(s)){ h += '<div class="mday off"><div class="md1"><b>'+DOWN[parse(s).getDay()]+'</b><span>'+short(s)+'</span></div><div class="md2 muted small">'+(s<plan.settings.start?'Before the plan starts':'After the plan')+'</div></div>'; return; }
    const d = dayPlan(s);
    h += '<div class="mday'+(s===todayStr()?' today':'')+'"><div class="md1"><b>'+DOWN[parse(s).getDay()]+'</b><span>'+short(s)+'</span></div><div class="md2"><div class="mdt small muted">'+esc(d.dt.label||d.type)+(none(d.dt.calories)?' · '+esc(d.dt.calories)+' kcal':'')+'</div>';
    if (d.kind!=='home'){ h += '<div class="small">No cooking: '+esc(d.kind==='travel'?'travel day, eat packed food':'familiar meals out, protein every meal')+'.</div></div></div>'; return; }
    [['Lunch',d.lunch,false],['Dinner',d.dinner,isHalf(d.dinnerNote)]].forEach(([lab,m,half])=>{
      if (!m) return;
      const tag = cooksTonight(m) ? '<span class="rtag tonight">Cook '+esc(m.cook)+'</span>' : m.cook==='prep' ? '<span class="rtag">Prep</span>' : '';
      h += '<button class="mchip" data-act="recipe" data-meal="'+esc(m.id)+'" data-date="'+s+'" data-half="'+(half?1:0)+'"><span class="ml">'+lab+'</span><span class="mn">'+esc(mealLabel(m))+(half?' <i>(half rice)</i>':'')+'</span>'+tag+'</button>';
    });
    if (d.type==='refill' && plan.refillExtras.length) h += '<div class="refill small"><b>+150 g carbs:</b> '+plan.refillExtras.map(x=>esc(x.item)+' '+esc(qtyStr(+x.qty,x.unit))).join(', ')+'</div>';
    h += '</div></div>';
  });
  return h + '</div>';
}
function tricksHTML(){
  const t = Object.entries(plan.tricks); if (!t.length) return '';
  return '<details class="card mt tricks"><summary><h3>Chef tricks</h3></summary><ol>'+t.map(([n,x])=>'<li>'+esc(x)+'</li>').join('')+'</ol></details>';
}
function fillPrep(tpl, p){
  return tpl.replace(/\{(qty|buy):([^}]+)\}/g, (m, kind, name)=>{
    const it = p.items.find(i=>i.name.toLowerCase()===name.trim().toLowerCase()); if (!it) return '—';
    return kind==='qty' ? qtyStr(it.qty, it.unit) : buyStr(it.name, it.qty, it.unit);
  });
}
function renderPrep(sun){
  const sessions = prepSessionsOfWeek(sun).map(ps=>prepFor(ps.date) || { date:ps.date, day:ps.day, empty:true, minutes:ps.minutes, covers:ps.covers });
  let h = '';
  sessions.forEach(p=>{
    h += '<div class="card mt prep" id="prep-'+p.date+'"><div class="rch"><h3>'+esc(pretty(p.date))+' prep</h3><span class="muted small">'+(p.empty?'':'about '+p.minutes+' min · '+esc(p.time))+'</span></div>';
    if (p.empty){ h += '<p class="muted small">Nothing to prep: no lunches or dinners from prep in '+DOWN[parse(p.covers[0]).getDay()]+'–'+DOWN[parse(p.covers[p.covers.length-1]).getDay()]+(p.date<plan.settings.start?' before the plan starts':'')+'.</p></div>'; return; }
    if (p.date < plan.settings.start) h += '<p class="small warnline">This session falls before the plan starts. Use it as your first shop-and-prep if you haven\'t cooked yet.</p>';
    h += '<p class="small muted">Covers '+p.covers.filter(inPlan).map(s=>DOWN[parse(s).getDay()]).join(', ')+'. Dry-brine '+Math.round(p.chickenG)+' g chicken the night before with about '+brineSalt(p.chickenG)+' kosher salt.</p>';
    // What to cook
    const sec = ['Meat & fish','Grains','Produce','Pantry'];
    h += '<h4>Cook and chop</h4><ul class="ing">'+p.items.slice().sort((a,b)=>sec.indexOf(a.section)-sec.indexOf(b.section)).map(i=>'<li><span>'+esc(i.name)+'</span><span class="num">'+esc(qtyStr(i.qty,i.unit))+(storeRow(i.name,i.unit)&&/rice/i.test(i.name)?' <i class="muted">('+esc(buyStr(i.name,i.qty,i.unit))+' dry)</i>':'')+'</span></li>').join('')+'</ul>';
    if (p.halfRice) h += '<p class="small muted">Rice includes half portions for half-rice dinners.</p>';
    // Sauces
    if (p.sauces.length) h += '<h4>Sauces</h4><ul class="ing">'+p.sauces.map(b=>'<li><span>'+esc(b.sauce.sauce)+'</span><span>'+(b.batches ? 'make '+(b.batches===0.5?'½':b.batches===1?'1':b.batches)+' batch'+(b.batches>1?'es':'')+' <i class="muted">('+Math.round(b.batches*+b.sauce.batch_g)+' g)</i>' : '<i class="muted">covered by last batch</i>')+'</span></li>').join('')+'</ul>';
    // Steps
    const have = name => name==='sauces' ? p.sauces.some(b=>b.batches) : p.items.some(i=>i.name.toLowerCase().startsWith(name.toLowerCase()));
    const steps = plan.prepSteps.filter(st=>have(st.needs||''));
    const checks = (LOG.meta.prepChecks||{})[p.date] || {};
    h += '<h4>Steps</h4><ol class="psteps">'+steps.map((st,i)=>'<li><label><input type="checkbox" data-pstep="'+i+'" data-pdate="'+p.date+'" '+(checks[i]?'checked':'')+'><span>'+esc(fillPrep(st.step, p))+'</span></label></li>').join('')+'</ol>';
    // Labels
    h += '<h4>Label your containers</h4><ul class="labels">'+p.containers.map(c=>{ const rows = scaledRows(c.meal, c.half).filter(r=>r.batch!=='day-of' && !/sauce/i.test(r.section)); return '<li><b>'+DOWN[parse(c.s).getDay()]+' '+c.slot+': '+esc(c.meal.id)+'</b> <span class="muted small">'+rows.map(r=>esc(qtyStr(r.qty,r.unit)+' '+r.ingredient.replace(/ \(.*\)/,'').replace(/, cooked.*/,''))).join(', ')+'</span></li>'; }).join('')+'</ul>';
    if (p.tonight.length) h += '<h4>Cook day-of</h4><ul class="labels">'+p.tonight.map(c=>'<li><button class="linkbtn" data-act="recipe" data-meal="'+esc(c.meal.id)+'" data-date="'+c.s+'" data-half="'+(c.half?1:0)+'">'+DOWN[parse(c.s).getDay()]+' '+c.slot+': '+esc(mealLabel(c.meal))+'</button> <span class="muted small">'+esc(c.meal.cook)+(none(c.meal.description)?' · '+esc(c.meal.description):'')+'</span></li>').join('')+'</ul>';
    h += '</div>';
  });
  return h;
}
function renderGroceries(sun){
  const g = groceries(sun), checks = groceryChecks(sun);
  const satShow = add(sun,-1);
  let h = '<div class="card mt"><div class="rch"><h3>Groceries</h3><button class="btn ghost sm" data-act="gshare">Share / Copy</button></div>';
  h += '<p class="small muted">For '+weekLabel(sun)+'. Shown from Saturday '+short(satShow)+'. Ticks reset each week.</p>';
  if (g.empty) h += '<p class="muted">No home meals this week.</p>';
  const item = (i, sec) => { const k = (sec+'|'+i.key).replace(/"/g,''); return '<label class="gi'+(checks[k]?' got':'')+'"><input type="checkbox" data-groc="'+esc(k)+'" data-week="'+sun+'" '+(checks[k]?'checked':'')+'><span class="gn">'+esc(i.name)+(i.note?'<small>'+esc(i.note)+'</small>':'')+'</span><span class="gq num">'+esc(fmtQty(i.qty,i.unit))+'</span></label>'; };
  g.groups.filter(x=>x.section!=='Pantry').forEach(x=>{ h += '<h4>'+esc(x.section)+'</h4><div class="glist">'+x.items.map(i=>item(i,x.section)).join('')+'</div>'; });
  const p = g.groups.find(x=>x.section==='Pantry');
  h += '<details class="stock"><summary><h4>Pantry: check stock</h4></summary><div class="glist">'+(p?p.items.map(i=>item(i,'Pantry')).join(''):'')+g.staples.map(s=>item({key:'staple-'+s,name:s,qty:0,unit:''},'Pantry').replace(/<span class="gq num">[^<]*<\/span>/,'<span class="gq muted">stock</span>')).join('')+'</div></details>';
  if (g.packing.length) h += '<h4>Pack for travel</h4><div class="glist">'+g.packing.map(i=>item({key:'pack-'+i.item,name:i.item,note:i.note,qty:0,unit:''},'Pack').replace(/<span class="gq num">[^<]*<\/span>/,'')).join('')+'</div>';
  return h + '</div>';
}
/** Food-tab buttons. Returns true when handled. */
function foodAction(a, t){
  if (a==='fweek'){ UI.food.week = add(UI.food.week, +t.dataset.d); render(); return true; }
  if (a==='fview'){ UI.food.view = t.dataset.v; render(); return true; }
  if (a==='recipe'){ const m = Object.assign({id:t.dataset.meal}, plan.meals[t.dataset.meal]||{}); openSheet('<p class="small muted">'+esc(pretty(t.dataset.date))+'</p>'+recipeCardHTML(m, { half: t.dataset.half==='1', date: t.dataset.date })); return true; }
  if (a==='sheet-close'){ closeSheet(); return true; }
  if (a==='gshare'){ shareOrCopy('Groceries', groceryText(groceries(UI.food.week))).then(r=>toast(r==='copied'?'List copied':r==='shared'?'Shared':r==='cancelled'?'Cancelled':'Couldn’t share')); return true; }
  return false;
}
document.addEventListener('change', e=>{
  const t = e.target; if (!t.dataset.pstep) return;
  const all = Object.assign({}, LOG.meta.prepChecks || {}), d = Object.assign({}, all[t.dataset.pdate] || {});
  if (t.checked) d[t.dataset.pstep] = true; else delete d[t.dataset.pstep];
  all[t.dataset.pdate] = d; Object.keys(all).sort().slice(0,-6).forEach(k=>delete all[k]);
  saveMeta('prepChecks', all);
});
document.addEventListener('keydown', e=>{ if (e.key==='Escape' && !$('#sheet').hidden) closeSheet(); });
