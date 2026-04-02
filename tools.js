/* ═══════════════════════════════════════════
   sNibaStudy — Study Tools Page
   ═══════════════════════════════════════════ */

window.SNS = window.SNS || {};
SNS.pages = SNS.pages || {};

SNS.pages.tools = {

  render(container) {
    const pomo   = SNS.store.get('pomodoroStats');
    const goals  = SNS.goals.getStats();
    const sessions = SNS.store.get('studySessions');
    const todayStr = SNS.utils.today();
    const todayMin = (SNS.store.get('studyTime') || {})[todayStr] || 0;

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    const timerState = SNS.pomodoro.getState();

    container.innerHTML = `
      <div class="page-header">
        <div class="page-header-text">
          <h2><i class="fas fa-stopwatch" style="color:var(--orange);margin-right:8px;"></i>Study Tools</h2>
          <p>${today} · Let's make today count!</p>
        </div>
        <div class="page-header-actions">
          <button class="btn btn-secondary" id="enter-focus-btn">
            <i class="fas fa-eye-slash"></i> Focus Mode
          </button>
        </div>
      </div>

      <div class="tools-grid">

        <!-- Pomodoro Timer -->
        <div class="pomodoro-card">
          <div class="pomodoro-mode-tabs">
            <button class="pomodoro-mode-btn ${timerState.mode === 'work' ? 'active' : ''}" data-mode="work">Focus (25m)</button>
            <button class="pomodoro-mode-btn ${timerState.mode === 'shortBreak' ? 'active' : ''}" data-mode="shortBreak">Short (5m)</button>
            <button class="pomodoro-mode-btn ${timerState.mode === 'longBreak' ? 'active' : ''}" data-mode="longBreak">Long (15m)</button>
          </div>

          <div class="timer-ring-wrap">
            <svg class="timer-ring-svg" viewBox="0 0 200 200">
              <circle class="timer-ring-bg" cx="100" cy="100" r="${SNS.pomodoro.RADIUS}"/>
              <circle class="timer-ring-progress" id="timer-ring-progress"
                cx="100" cy="100" r="${SNS.pomodoro.RADIUS}"
                stroke-dasharray="${SNS.pomodoro.CIRCUMFERENCE}"
                stroke-dashoffset="0"/>
            </svg>
            <div class="timer-display">
              <span class="timer-time" id="timer-time">${SNS.utils.formatTime(timerState.timeLeft)}</span>
              <span class="timer-phase-label" id="timer-phase">${timerState.mode === 'work' ? 'Focus' : timerState.mode === 'shortBreak' ? 'Short Break' : 'Long Break'}</span>
            </div>
          </div>

          <div class="session-circles" id="session-circles"></div>

          <div class="timer-controls">
            <button class="timer-btn-secondary" id="timer-reset-btn" title="Reset">
              <i class="fas fa-rotate-left"></i>
            </button>
            <button class="timer-btn-main" id="timer-main-btn">
              <i class="fas fa-${timerState.running ? 'pause' : 'play'}"></i>
            </button>
            <button class="timer-btn-secondary" id="timer-skip-btn" title="Skip">
              <i class="fas fa-forward-step"></i>
            </button>
          </div>

          <div class="pomodoro-stats">
            <div class="pomo-stat">
              <div class="pomo-stat-value text-accent">${pomo.todaySessions || 0}</div>
              <div class="pomo-stat-label">Today</div>
            </div>
            <div class="pomo-stat">
              <div class="pomo-stat-value">${pomo.totalSessions || 0}</div>
              <div class="pomo-stat-label">Total</div>
            </div>
            <div class="pomo-stat">
              <div class="pomo-stat-value text-blue">${SNS.utils.formatMinutes(todayMin)}</div>
              <div class="pomo-stat-label">Study Time</div>
            </div>
          </div>
        </div>

        <!-- Right column -->
        <div style="display:flex;flex-direction:column;gap:16px;">

          <!-- Daily Summary -->
          <div class="daily-summary-card">
            <div class="section-header">
              <span class="section-title"><i class="fas fa-sun"></i> Today's Summary</span>
            </div>
            <div class="daily-summary-row">
              <span class="daily-summary-key"><i class="fas fa-clock"></i> Study Time</span>
              <span class="daily-summary-val">${SNS.utils.formatMinutes(todayMin)}</span>
            </div>
            <div class="daily-summary-row">
              <span class="daily-summary-key"><i class="fas fa-fire"></i> Pomodoros</span>
              <span class="daily-summary-val">${pomo.todaySessions || 0}</span>
            </div>
            <div class="daily-summary-row">
              <span class="daily-summary-key"><i class="fas fa-check-double"></i> Goals Done</span>
              <span class="daily-summary-val">${goals.done}/${goals.total}</span>
            </div>
            <div class="daily-summary-row">
              <span class="daily-summary-key"><i class="fas fa-book-open"></i> Sessions</span>
              <span class="daily-summary-val">${sessions.filter(s => s.date && s.date.startsWith(todayStr)).length}</span>
            </div>
          </div>

          <!-- Focus Mode Settings -->
          <div class="focus-mode-card">
            <div class="section-header">
              <span class="section-title"><i class="fas fa-moon"></i> Focus Settings</span>
            </div>
            <div class="focus-option">
              <div class="focus-option-info">
                <div class="focus-option-name">Full Screen Timer</div>
                <div class="focus-option-desc">Show only the timer in focus mode</div>
              </div>
              <div class="toggle on" id="toggle-fullscreen"><div class="toggle-thumb"></div></div>
            </div>
            <div class="focus-option">
              <div class="focus-option-info">
                <div class="focus-option-name">Sound Alerts</div>
                <div class="focus-option-desc">Play a sound when session ends</div>
              </div>
              <div class="toggle on" id="toggle-sound"><div class="toggle-thumb"></div></div>
            </div>
            <div class="focus-option">
              <div class="focus-option-info">
                <div class="focus-option-name">Auto-start Breaks</div>
                <div class="focus-option-desc">Automatically start break timer</div>
              </div>
              <div class="toggle" id="toggle-autobreak"><div class="toggle-thumb"></div></div>
            </div>
          </div>

        </div>

      </div>

      <!-- Goals + Session Log row -->
      <div class="grid-2" style="margin-top:16px;">

        <!-- Daily Goals -->
        <div class="goals-card" style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:20px;">
          <div class="section-header">
            <span class="section-title"><i class="fas fa-list-check"></i> Daily Goals</span>
            <span class="text-muted" style="font-size:12px;" id="goals-stats-label">${goals.done}/${goals.total}</span>
          </div>
          <div class="goals-input-row">
            <input type="text" class="input" id="tools-goal-input" placeholder="Add a study goal..." maxlength="120">
            <button class="btn btn-primary btn-sm" id="tools-goal-add-btn">Add</button>
          </div>
          <div class="goals-list" id="tools-goals-list"></div>
          ${goals.total > 0 ? `
            <div class="goals-progress-bar" style="margin-top:12px">
              <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${goals.pct}%"></div></div>
              <span class="goals-count">${goals.pct}%</span>
            </div>
          ` : ''}
        </div>

        <!-- Session Log -->
        <div class="session-log-card">
          <div class="section-header">
            <span class="section-title"><i class="fas fa-history"></i> Session Log</span>
          </div>
          <div class="session-log-list">
            ${this.renderSessionLog(sessions, todayStr)}
          </div>
        </div>

      </div>
    `;

    // Attach Pomodoro to DOM
    SNS.pomodoro.attachDOM({
      ringProgress: document.getElementById('timer-ring-progress'),
      timeDisplay:  document.getElementById('timer-time'),
      phaseLabel:   document.getElementById('timer-phase'),
      startBtn:     document.getElementById('timer-main-btn'),
      resetBtn:     document.getElementById('timer-reset-btn'),
      sessionDots:  document.getElementById('session-circles')
    });

    // Timer controls
    document.getElementById('timer-main-btn')?.addEventListener('click', () => SNS.pomodoro.toggle());
    document.getElementById('timer-reset-btn')?.addEventListener('click', () => SNS.pomodoro.reset());
    document.getElementById('timer-skip-btn')?.addEventListener('click', () => {
      SNS.pomodoro.reset();
      SNS.utils.toast('Session skipped', 'info', 1500);
    });

    // Mode tabs
    container.querySelectorAll('.pomodoro-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.pomodoro-mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        SNS.pomodoro.setMode(btn.dataset.mode);
      });
    });

    // Focus mode
    document.getElementById('enter-focus-btn')?.addEventListener('click', () => {
      const overlay = document.getElementById('focus-overlay');
      if (overlay) {
        overlay.hidden = false;
        SNS.pomodoro.setSubject('Focus Session');
      }
    });

    document.getElementById('focus-pause-btn')?.addEventListener('click', () => SNS.pomodoro.toggle());
    document.getElementById('focus-exit-btn')?.addEventListener('click', () => {
      const overlay = document.getElementById('focus-overlay');
      if (overlay) overlay.hidden = true;
    });

    // Toggles
    container.querySelectorAll('.toggle').forEach(t => {
      t.addEventListener('click', () => t.classList.toggle('on'));
    });

    // Goals
    SNS.goals.renderGoalsList(document.getElementById('tools-goals-list'), {
      onToggle: () => {
        const stats = SNS.goals.getStats();
        const el = document.getElementById('goals-stats-label');
        if (el) el.textContent = `${stats.done}/${stats.total}`;
      }
    });

    document.getElementById('tools-goal-add-btn')?.addEventListener('click', () => {
      const input = document.getElementById('tools-goal-input');
      if (!input?.value.trim()) return;
      SNS.goals.add(input.value);
      input.value = '';
      SNS.goals.renderGoalsList(document.getElementById('tools-goals-list'));
    });

    document.getElementById('tools-goal-input')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') document.getElementById('tools-goal-add-btn')?.click();
    });
  },

  renderSessionLog(sessions, todayStr) {
    const todaySessions = sessions.filter(s => s.date && s.date.startsWith(todayStr));
    if (!todaySessions.length) {
      return '<div style="padding:20px;text-align:center;font-size:13px;color:var(--text-muted);">No sessions logged today yet.</div>';
    }
    return todaySessions.slice(0, 10).map(s => {
      const result = SNS.findSubtopic(s.topicId);
      const name = result ? result.sub.title : (s.topicId || 'Study Session');
      return `
        <div class="session-log-item">
          <div class="session-type-dot work"></div>
          <div class="session-log-info">
            <div class="session-log-time">${SNS.utils.escapeHtml(name)}</div>
            <div class="session-log-label">${SNS.utils.formatMinutes(s.durationMin || 0)} · ${SNS.utils.timeAgo(s.date)}</div>
          </div>
          ${s.quizScore != null ? `<span class="badge badge-${SNS.utils.getScoreColor(s.quizScore)}" style="font-size:10px">${s.quizScore}%</span>` : ''}
        </div>
      `;
    }).join('');
  }
};
