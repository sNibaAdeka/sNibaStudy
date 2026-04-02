/* ═══════════════════════════════════════════
   sNibaStudy — Dashboard Page
   ═══════════════════════════════════════════ */

window.SNS = window.SNS || {};
SNS.pages = SNS.pages || {};

SNS.pages.dashboard = {
  render(container) {
    const profile = SNS.store.get('profile');
    const streak  = SNS.store.get('streak');
    const pomo    = SNS.store.get('pomodoroStats');
    const studyTime = SNS.store.get('studyTime');
    const sessions = SNS.store.get('studySessions');
    const goalStats = SNS.goals.getStats();
    const friends   = SNS.store.get('friends');

    const todayStr = SNS.utils.today();
    const todayMin = studyTime[todayStr] || 0;

    // Count completed topics (unique topicIds in sessions)
    const completedTopics = new Set(sessions.map(s => s.topicId).filter(Boolean)).size;

    // XP progress to next level
    const xpInLevel = profile.xp % 500;
    const xpPct = Math.round((xpInLevel / 500) * 100);

    // Weekly study data (last 7 days)
    const days = [];
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days.push({ key, label: dayLabels[d.getDay()], minutes: studyTime[key] || 0, isToday: key === todayStr });
    }
    const maxMin = Math.max(...days.map(d => d.minutes), 1);

    // Leaderboard: friends + self
    const self = { id: 'self', name: profile.name, avatar: profile.avatar, level: profile.level, xp: profile.xp, streak: streak.current, studyTimeToday: todayMin, isMe: true };
    const lb = [self, ...friends]
      .sort((a, b) => b.xp - a.xp)
      .map((f, i) => ({ ...f, rank: i + 1 }))
      .slice(0, 6);

    // Recent activity (last 5 sessions)
    const recentSessions = sessions.slice(0, 5);

    container.innerHTML = `
      <div class="page-header">
        <div class="page-header-text">
          <h2>Good ${getGreeting()}, ${SNS.utils.escapeHtml(profile.name)} 👋</h2>
          <p>Here's your study overview for today</p>
        </div>
        <div class="page-header-actions">
          <button class="btn btn-primary" id="dash-start-btn">
            <i class="fas fa-brain"></i> Start Studying
          </button>
        </div>
      </div>

      <!-- Stat Cards -->
      <div class="dashboard-grid stagger" id="stat-cards">
        ${renderStatCard({ icon: 'fa-clock', iconClass: 'accent', label: 'Study Time Today', value: SNS.utils.formatMinutes(todayMin), meta: `${pomo.todaySessions || 0} Pomodoros`, metaClass: '', sparkData: days.map(d => d.minutes), sparkClass: 'highlight' })}
        ${renderStatCard({ icon: 'fa-book-open-reader', iconClass: 'purple', label: 'Topics Studied', value: completedTopics, meta: `${sessions.length} total sessions`, metaClass: '', sparkData: [3,5,2,6,4,7,completedTopics], sparkClass: 'purple' })}
        ${renderStatCard({ icon: 'fa-fire', iconClass: 'orange', label: 'Current Streak', value: `${streak.current}🔥`, meta: `Best: ${streak.longest} days`, metaClass: streak.current > 0 ? 'positive' : '', sparkData: [1,2,3,4,5,streak.current,streak.current], sparkClass: 'orange' })}
        ${renderStatCard({ icon: 'fa-star', iconClass: 'blue', label: 'Total XP', value: profile.xp, meta: `Level ${profile.level} · ${xpPct}% to next`, metaClass: 'positive', sparkData: [100,200,250,300,350,400,xpInLevel], sparkClass: 'blue' })}
      </div>

      <div class="dashboard-lower">
        <div class="dashboard-lower-left">

          <!-- Weekly Activity -->
          <div class="weekly-chart-card">
            <div class="section-header">
              <span class="section-title"><i class="fas fa-chart-bar"></i> Weekly Activity</span>
              <span class="section-action" id="view-progress-btn">View Full Progress →</span>
            </div>
            <div class="chart-bars">
              ${days.map(d => `
                <div class="chart-bar-col">
                  <div class="chart-bar-value">${d.minutes > 0 ? SNS.utils.formatMinutes(d.minutes) : ''}</div>
                  <div class="chart-bar ${d.isToday ? 'today' : ''}" style="height: ${Math.max((d.minutes/maxMin)*68, d.minutes > 0 ? 8 : 4)}px;" title="${d.label}: ${d.minutes} min"></div>
                  <div class="chart-bar-label">${d.label}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="activity-card">
            <div class="section-header">
              <span class="section-title"><i class="fas fa-history"></i> Recent Activity</span>
            </div>
            <div class="activity-list">
              ${recentSessions.length ? recentSessions.map(s => {
                const result = SNS.findSubtopic(s.topicId);
                const name = result ? result.sub.title : (s.topicId || 'Unknown Topic');
                const subject = result ? result.subject.label : '';
                const iconClass = result ? result.subject.colorVar : '--accent';
                return `
                  <div class="activity-item">
                    <div class="activity-icon" style="background:rgba(0,212,170,0.1);color:var(${iconClass})">
                      <i class="fas fa-book-open"></i>
                    </div>
                    <div class="activity-info">
                      <div class="activity-text">Studied <strong>${SNS.utils.escapeHtml(name)}</strong>${subject ? ` · ${subject}` : ''}</div>
                      <div class="activity-time">${SNS.utils.timeAgo(s.date)} · ${SNS.utils.formatMinutes(s.durationMin || 0)}</div>
                    </div>
                    ${s.quizScore != null ? `<div class="activity-score">${s.quizScore}%</div>` : ''}
                  </div>
                `;
              }).join('') : `
                <div class="empty-state" style="padding:30px;">
                  <div style="font-size:22px;margin-bottom:8px;">📚</div>
                  <p>No activity yet. Start your first study session!</p>
                </div>
              `}
            </div>
          </div>

        </div>

        <!-- Right column: Goals + Leaderboard -->
        <div style="display:flex;flex-direction:column;gap:16px;">

          <!-- Daily Goals -->
          <div class="goals-card">
            <div class="section-header">
              <span class="section-title"><i class="fas fa-list-check"></i> Daily Goals</span>
              <span class="text-muted" style="font-size:12px;">${goalStats.done}/${goalStats.total}</span>
            </div>
            <div class="goals-input-row">
              <input type="text" class="input" id="goal-input" placeholder="Add a goal for today..." maxlength="120">
              <button class="btn btn-primary btn-sm" id="goal-add-btn">Add</button>
            </div>
            <div class="goals-list" id="goals-list"></div>
            ${goalStats.total > 0 ? `
              <div class="goals-progress-bar">
                <div class="progress-bar-wrap">
                  <div class="progress-bar-fill" style="width:${goalStats.pct}%"></div>
                </div>
                <span class="goals-count">${goalStats.pct}% done</span>
              </div>
            ` : ''}
          </div>

          <!-- Leaderboard -->
          <div class="leaderboard-card">
            <div class="section-header">
              <span class="section-title"><i class="fas fa-trophy"></i> Leaderboard</span>
              <span class="section-action" id="view-social-btn">See All →</span>
            </div>
            <div class="leaderboard-list">
              ${lb.map(f => `
                <div class="leaderboard-item ${f.isMe ? 'is-me' : ''}">
                  <div class="lb-rank ${f.rank === 1 ? 'gold' : f.rank === 2 ? 'silver' : f.rank === 3 ? 'bronze' : ''}">${f.rank === 1 ? '🥇' : f.rank === 2 ? '🥈' : f.rank === 3 ? '🥉' : f.rank}</div>
                  <div class="lb-avatar" style="background:linear-gradient(135deg,var(--purple),var(--blue));">${SNS.utils.escapeHtml(f.avatar || f.name[0])}</div>
                  <div class="lb-name">${SNS.utils.escapeHtml(f.name)}${f.isMe ? ' <span style="font-size:11px;color:var(--accent)">(you)</span>' : ''}</div>
                  <div class="lb-xp">${f.xp} XP</div>
                  <div class="lb-streak"><i class="fas fa-fire"></i>${f.streak || 0}</div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>
      </div>
    `;

    // Render goals
    SNS.goals.renderGoalsList(document.getElementById('goals-list'), {
      onToggle: () => {
        const stats = SNS.goals.getStats();
        const countEl = document.querySelector('.section-title + .text-muted');
        if (countEl) countEl.textContent = `${stats.done}/${stats.total}`;
      }
    });

    // Animate stat values
    requestAnimationFrame(() => {
      container.querySelectorAll('.card-value[data-target]').forEach(el => {
        SNS.utils.animateCount(el, parseInt(el.dataset.target) || 0);
      });
    });

    // Wire events
    document.getElementById('goal-add-btn')?.addEventListener('click', addGoal);
    document.getElementById('goal-input')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') addGoal();
    });

    document.getElementById('dash-start-btn')?.addEventListener('click', () => {
      SNS.router.navigate('study');
    });

    document.getElementById('view-progress-btn')?.addEventListener('click', () => {
      SNS.router.navigate('progress');
    });

    document.getElementById('view-social-btn')?.addEventListener('click', () => {
      SNS.router.navigate('friends');
    });

    SNS.utils.initScrollReveal(container);
  }
};

function renderStatCard({ icon, iconClass, label, value, meta, metaClass, sparkData, sparkClass }) {
  const maxSpark = Math.max(...sparkData, 1);
  const sparkBars = sparkData.map((v, i) => {
    const h = Math.max(Math.round((v / maxSpark) * 32), 3);
    const isLast = i === sparkData.length - 1;
    return `<div class="spark-bar ${isLast ? sparkClass : ''}" style="height:${h}px"></div>`;
  }).join('');

  return `
    <div class="stat-card">
      <div class="stat-header">
        <div class="stat-icon ${iconClass}"><i class="fas ${icon}"></i></div>
        <div class="stat-sparkline">${sparkBars}</div>
      </div>
      <div class="card-title">${SNS.utils.escapeHtml(label)}</div>
      <div class="card-value">${SNS.utils.escapeHtml(String(value))}</div>
      <div class="card-meta ${metaClass}">${SNS.utils.escapeHtml(meta)}</div>
    </div>
  `;
}

function addGoal() {
  const input = document.getElementById('goal-input');
  if (!input || !input.value.trim()) return;
  SNS.goals.add(input.value);
  input.value = '';
  SNS.goals.renderGoalsList(document.getElementById('goals-list'));
  const stats = SNS.goals.getStats();
  SNS.utils.toast('Goal added!', 'success', 1500);
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}
