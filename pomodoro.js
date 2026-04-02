/* ═══════════════════════════════════════════
   sNibaStudy — Pomodoro Timer (Singleton)
   Survives page navigation — attach/detach DOM
   ═══════════════════════════════════════════ */

window.SNS = window.SNS || {};

SNS.pomodoro = (function () {

  const MODES = {
    work:       { label: 'Focus',       duration: 25 * 60, color: 'var(--accent)' },
    shortBreak: { label: 'Short Break', duration:  5 * 60, color: 'var(--blue)' },
    longBreak:  { label: 'Long Break',  duration: 15 * 60, color: 'var(--purple)' }
  };

  // ── State (persists across page navigation) ──
  let state = {
    mode:        'work',
    timeLeft:    MODES.work.duration,
    running:     false,
    sessionsDone: 0,
    currentSubject: 'Study Session'
  };

  let interval = null;
  let domRefs = null;   // { ringProgress, timeDisplay, phaseLabel, startBtn, resetBtn, sessionDots }

  // ── Total circumference for radius=88 ──
  const RADIUS = 88;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  function getDuration() {
    return MODES[state.mode].duration;
  }

  function getProgress() {
    return state.timeLeft / getDuration();
  }

  function updateRing() {
    if (!domRefs) return;
    const offset = CIRCUMFERENCE * (1 - getProgress());
    if (domRefs.ringProgress) {
      domRefs.ringProgress.style.strokeDasharray  = CIRCUMFERENCE;
      domRefs.ringProgress.style.strokeDashoffset = offset;
      domRefs.ringProgress.style.stroke = MODES[state.mode].color;
      domRefs.ringProgress.className.baseVal = state.mode === 'work' ? 'timer-ring-progress' : 'timer-ring-progress break';
    }
  }

  function updateDisplay() {
    if (!domRefs) return;
    const timeStr = SNS.utils.formatTime(state.timeLeft);

    if (domRefs.timeDisplay) {
      domRefs.timeDisplay.textContent = timeStr;
      domRefs.timeDisplay.classList.toggle('timer-tick', state.running);
    }

    if (domRefs.phaseLabel) {
      domRefs.phaseLabel.textContent = MODES[state.mode].label;
    }

    if (domRefs.startBtn) {
      const icon = state.running ? 'fa-pause' : 'fa-play';
      domRefs.startBtn.innerHTML = `<i class="fas ${icon}"></i>`;
    }

    if (domRefs.sessionDots) {
      const dotsHtml = Array.from({ length: 4 }, (_, i) => {
        const cls = i < state.sessionsDone ? 'session-dot done' : 'session-dot';
        return `<div class="${cls}"></div>`;
      }).join('');
      domRefs.sessionDots.innerHTML = dotsHtml;
    }

    // Focus overlay sync
    const focusTime = document.getElementById('focus-timer-display');
    if (focusTime) focusTime.textContent = timeStr;
    const focusPhase = document.getElementById('focus-phase');
    if (focusPhase) focusPhase.textContent = MODES[state.mode].label;

    // Title update when running
    if (state.running) {
      document.title = `${timeStr} — sNibaStudy`;
    }

    updateRing();
  }

  function tick() {
    if (!state.running) return;
    state.timeLeft--;

    if (state.timeLeft <= 0) {
      onSessionEnd();
    } else {
      updateDisplay();
    }
  }

  function onSessionEnd() {
    state.running = false;
    clearInterval(interval);
    interval = null;

    const wasWork = state.mode === 'work';

    if (wasWork) {
      state.sessionsDone++;
      SNS.store.recordPomodoro('work');
      SNS.utils.toast('Focus session complete! Take a break 🎉', 'success');

      // Auto-switch to break
      state.mode = (state.sessionsDone % 4 === 0) ? 'longBreak' : 'shortBreak';
    } else {
      SNS.utils.toast('Break over! Ready to focus? 💪', 'info');
      state.mode = 'work';
    }

    state.timeLeft = getDuration();
    updateDisplay();

    // Play sound (if browser supports it and setting is on)
    playBeep();

    // Re-render session dots in DOM if available
    if (domRefs && domRefs.sessionDots) updateDisplay();
  }

  function playBeep() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 440;
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {}
  }

  function start() {
    if (state.running) return;
    state.running = true;
    interval = setInterval(tick, 1000);
    updateDisplay();
  }

  function pause() {
    if (!state.running) return;
    state.running = false;
    clearInterval(interval);
    interval = null;
    updateDisplay();
  }

  function toggle() {
    state.running ? pause() : start();
  }

  function reset() {
    pause();
    state.timeLeft = getDuration();
    updateDisplay();
  }

  function setMode(mode) {
    if (!MODES[mode]) return;
    pause();
    state.mode = mode;
    state.timeLeft = getDuration();
    updateDisplay();
  }

  function setSubject(subject) {
    state.currentSubject = subject;
    const el = document.getElementById('focus-subject-label');
    if (el) el.textContent = subject;
  }

  // ── Attach to DOM elements on the tools page ──
  function attachDOM(refs) {
    domRefs = refs;
    updateDisplay();
  }

  function detachDOM() {
    domRefs = null;
  }

  function getState() {
    return { ...state };
  }

  function isRunning() {
    return state.running;
  }

  return {
    start,
    pause,
    toggle,
    reset,
    setMode,
    setSubject,
    attachDOM,
    detachDOM,
    getState,
    isRunning,
    CIRCUMFERENCE,
    RADIUS,
    MODES
  };

})();
