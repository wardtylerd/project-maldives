/* Project Maldives — rope and heavy-bag interval timer.
   Segments come from "Timer sessions" in plan.md. Each row's work/rest pair repeats `rounds` times.
   Timing uses wall-clock end times, so it stays correct if the phone briefly sleeps.
   Beeps use Web Audio (unlocked by the Start tap). The screen is kept awake with the Wake Lock API where supported. */
'use strict';

const TM = { steps:[], i:0, end:0, left:0, paused:true, running:false, raf:0, ctx:null, lock:null, id:'', item:'', date:'', lastBeep:-1, done:false };

/** Expand segments into a flat list of steps: work, then rest (if any), per round. */
function timerSteps(id){
  const out = [];
  (plan.timers[id]||[]).forEach(seg=>{
    for (let r=1; r<=seg.rounds; r++){
      if (seg.work > 0) out.push({ kind:'work', label:seg.label, cue:seg.cue, dur:seg.work, round:r, rounds:seg.rounds });
      if (seg.rest > 0) out.push({ kind:'rest', label:'Rest', cue: /hard/i.test(seg.label) ? 'Easy bounce or rest. Shake out the arms.' : 'Breathe. Get set for the next one.', dur:seg.rest, round:r, rounds:seg.rounds, of:seg.label });
    }
  });
  return out;
}
const mmss = s => { s = Math.max(0, Math.ceil(s)); return Math.floor(s/60)+':'+String(s%60).padStart(2,'0'); };

function openTimer(id, itemId, date){
  if (!plan.timers[id]) { toast('No timer called "'+id+'" in plan.md'); return; }
  Object.assign(TM, { steps:timerSteps(id), i:0, paused:true, running:false, id, item:itemId, date, lastBeep:-1, done:false });
  const info = plan.timerInfo[id] || {};
  const total = timerSeconds(id);
  const el = $('#timer');
  let h = '<div class="tm-top"><button class="tm-x" data-tm="close" aria-label="Close timer">✕</button><div><b>'+esc(timerName(id))+'</b><span>'+mmss(total)+' total · '+esc(pretty(date))+'</span></div></div>';
  h += '<div class="tm-pre">';
  if (info.notes) h += '<p class="tm-note">'+esc(info.notes)+'</p>';
  h += '<ol class="tm-segs">'+(plan.timers[id]).map(s=>'<li><div><b>'+esc(s.label)+'</b>'+(s.cue?'<span>'+esc(s.cue)+'</span>':'')+'</div><em class="num">'+(s.rounds>1?s.rounds+' × ':'')+mmss(s.work)+(s.rest?' / '+mmss(s.rest)+' rest':'')+'</em></li>').join('')+'</ol>';
  h += '</div><div class="tm-run" hidden><div class="tm-kind"></div><div class="tm-label"></div><div class="tm-clock num"></div><div class="tm-round"></div><div class="tm-cue"></div><div class="tm-bar"><i></i></div><div class="tm-next"></div></div>';
  h += '<div class="tm-done" hidden><div class="tm-big">Done</div><p>Checked off on Today.</p></div>';
  h += '<div class="tm-ctl"><button class="tm-start" data-tm="start">Start</button></div>';
  el.innerHTML = h; el.hidden = false; document.body.classList.add('noscroll');
}
function timerUI(){
  const el = $('#timer'), st = TM.steps[TM.i];
  if (!st) return;
  const left = TM.paused ? TM.left : (TM.end - performance.now())/1000;
  el.dataset.kind = st.kind;
  el.querySelector('.tm-kind').textContent = st.kind==='work' ? (/hard/i.test(st.label) ? 'Work: hard' : 'Work') : 'Rest';
  el.querySelector('.tm-label').textContent = st.kind==='work' ? st.label : 'Rest';
  el.querySelector('.tm-clock').textContent = mmss(left);
  el.querySelector('.tm-round').textContent = st.rounds>1 ? 'Round '+st.round+' of '+st.rounds : '';
  el.querySelector('.tm-cue').textContent = st.cue || '';
  el.querySelector('.tm-bar i').style.width = Math.max(0, Math.min(100, (1 - left/st.dur)*100))+'%';
  const nx = TM.steps[TM.i+1];
  el.querySelector('.tm-next').textContent = nx ? 'Next: '+(nx.kind==='work' ? nx.label : 'Rest')+' · '+mmss(nx.dur) : 'Last one';
}
function ctlHTML(){
  return TM.paused
    ? '<button class="tm-btn" data-tm="end">End</button><button class="tm-start" data-tm="resume">Resume</button><button class="tm-btn" data-tm="skip">Skip</button>'
    : '<button class="tm-btn" data-tm="end">End</button><button class="tm-start alt" data-tm="pause">Pause</button><button class="tm-btn" data-tm="skip">Skip</button>';
}

/* ---------- sound ---------- */
function beep(freq, ms, vol){
  const c = TM.ctx; if (!c) return;
  try {
    const o = c.createOscillator(), g = c.createGain();
    o.type = 'sine'; o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, c.currentTime);
    g.gain.exponentialRampToValueAtTime(vol||0.5, c.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + ms/1000);
    o.connect(g).connect(c.destination); o.start(); o.stop(c.currentTime + ms/1000 + 0.02);
  } catch(e){}
}
function unlockAudio(){
  try { TM.ctx = TM.ctx || new (window.AudioContext || window.webkitAudioContext)(); if (TM.ctx.state==='suspended') TM.ctx.resume(); beep(1, 30, 0.0002); } catch(e){ TM.ctx = null; }
}
/* ---------- wake lock ---------- */
async function lockScreen(){ try { if ('wakeLock' in navigator && !TM.lock){ TM.lock = await navigator.wakeLock.request('screen'); TM.lock.addEventListener('release', ()=>{ TM.lock = null; }); } } catch(e){ TM.lock = null; } }
function unlockScreen(){ try { if (TM.lock) TM.lock.release(); } catch(e){} TM.lock = null; }
document.addEventListener('visibilitychange', ()=>{ if (document.visibilityState==='visible' && TM.running && !TM.paused) lockScreen(); });

/* ---------- run loop ---------- */
function startStep(i, at){
  TM.i = i; TM.lastBeep = -1;
  const st = TM.steps[i]; if (!st) return finish();
  TM.end = (at || performance.now()) + st.dur*1000;
  if (st.kind==='work') beep(1320, 380, 0.6); else beep(660, 260, 0.5);
}
function tick(){
  if (!TM.running) return;
  if (!TM.paused){
    let now = performance.now();
    // Catch up if the phone slept through one or more switches.
    while (TM.running && now >= TM.end){ const over = TM.end; if (TM.i+1 >= TM.steps.length){ finish(); return; } startStep(TM.i+1, over); }
    const left = (TM.end - now)/1000, nx = TM.steps[TM.i+1];
    const sec = Math.ceil(left);
    // 3-2-1 before each work segment.
    if (nx && nx.kind==='work' && sec<=3 && sec>=1 && sec!==TM.lastBeep){ TM.lastBeep = sec; beep(880, 140, 0.45); }
    timerUI();
  }
  TM.raf = requestAnimationFrame(tick);
}
function finish(){
  TM.running = false; TM.done = true; cancelAnimationFrame(TM.raf); unlockScreen();
  beep(1320, 200, 0.6); setTimeout(()=>beep(1760, 400, 0.6), 230);
  const L = day(TM.date); L.checks[TM.item] = true; saveDay(TM.date, true);
  const el = $('#timer'); el.querySelector('.tm-run').hidden = true; el.querySelector('.tm-done').hidden = false;
  el.dataset.kind = 'done';
  el.querySelector('.tm-ctl').innerHTML = '<button class="tm-start" data-tm="close">Back to Today</button>';
}
function closeTimer(){
  TM.running = false; cancelAnimationFrame(TM.raf); unlockScreen();
  $('#timer').hidden = true; document.body.classList.remove('noscroll');
  if (typeof render==='function') keepScroll(render);
}
document.getElementById('timer').addEventListener('click', e=>{
  const b = e.target.closest('[data-tm]'); if (!b) return;
  const a = b.dataset.tm, el = $('#timer');
  if (a==='start'){
    unlockAudio(); lockScreen();
    el.querySelector('.tm-pre').hidden = true; el.querySelector('.tm-run').hidden = false;
    TM.running = true; TM.paused = false; startStep(0);
    el.querySelector('.tm-ctl').innerHTML = ctlHTML(); timerUI(); TM.raf = requestAnimationFrame(tick);
  } else if (a==='pause'){ TM.paused = true; TM.left = (TM.end - performance.now())/1000; el.querySelector('.tm-ctl').innerHTML = ctlHTML(); timerUI(); }
  else if (a==='resume'){ unlockAudio(); lockScreen(); TM.paused = false; TM.end = performance.now() + TM.left*1000; el.querySelector('.tm-ctl').innerHTML = ctlHTML(); }
  else if (a==='skip'){ if (TM.i+1 >= TM.steps.length){ finish(); return; } startStep(TM.i+1); if (TM.paused){ TM.left = TM.steps[TM.i].dur; } timerUI(); }
  else if (a==='end' || a==='close'){ if (a==='end' && TM.running){ TM.running = false; } closeTimer(); }
});
