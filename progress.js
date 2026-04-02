/* ═══════════════════════════════════════════
   sNibaStudy — My Progress Page
   ═══════════════════════════════════════════ */

window.SNS = window.SNS || {};
SNS.pages = SNS.pages || {};

SNS.pages.progress = {

  render(container) {
    const profile    = SNS.store.get('profile');
    const streak     = SNS.store.get('streak');
    const studyTime  = SNS.store.get('studyTime');
    const quizScores = SNS.store.get('quizScores');
    const weakAreas  = SNS.store.get('weakAreas');
    const sessions   = SNS.store.get('studySessions');
    const achievements = SNS.store.get('achievements');

    // Total study minutes
    const totalMin = Object.values(studyTime).reduce((s, v) => s + v, 0);

    // Subject breakdown
    const subjectTime = {};
    sessions.forEach(s => {
      const subId = s.subject || (s.topicId || '').split('-')[0];
      subjectTime[subId] = (subjectTime[subId] || 0) + (s.durationMin || 0);
    });

    // Quiz history flat list
    const quizHistory = [];
    Object.entries(quizScores).forEach(([topicId, scores]) => {
      const result = SNS.findSubtopic(topicId);
      const topicName = result ? result.sub.title : topicId;
      scores.forEach(sc => quizHistory.push({ ...sc, topicId, topicName }));
    });
    quizHistory.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

    // Top weak areas
    const weakList = Object.entries(weakAreas)
      .map(([id, data]) => {
        const result = SNS.findSubtopic(id);
        return { id, ...data, name: result ? result.sub.title : id, subject: result ? result.subject.label : '' };
      })
      .sort((a, b) => b.failCount - a.failCount)
      .slice(0, 5);

    // Achievement definitions
    const ACHIEVEMENTS = [
      { id: 'first_session', icon: '🎯', name: 'First Study', earned: sessions.length >= 1 },
      { id: 'week_streak',   icon: '🔥', name: '7-day Streak', earned: streak.current >= 7 },
      { id: 'perfect_quiz',  icon: '💯', name: 'Perfect Quiz', earned: quizHistory.some(q => q.score === 100) },
      { id: '10_sessions',   icon: '📚', name: '10 Sessions', earned: sessions.length >= 10 },
      { id: 'all_subjects',  icon: '🌟', name: 'All Subjects', earned: Object.keys(subjectTime).length >= 5 },
      { id: '1h_day',        icon: '⏱️', name: '1 Hour Day', earned: Math.max(...Object.values(studyTime), 0) >= 60 },
      { id: 'flashmaster',   icon: '🃏', name: 'Flash Master', earned: false },
      { id: 'month_streak',  icon: '🏆', name: '30-day Streak', earned: streak.longest >= 30 }
    ];

    container.innerHTML = `
      <div class="page-header">
        <div class="page-header-text">
          <h2><i class="fas fa-chart-line" style="color:var(--accent);margin-right:8px;"></i>My Progress</h2>
          <p>Track your learning journey and identify areas to improve</p>
        </div>
      </div>

      <div class="progress-layout">

        <!-- Main content -->
        <div style="display:flex;flex-direction:column;gap:16px;">

          <!-- Heatmap -->
          <div class="heatmap-card">
            <div class="section-header">
              <span class="section-title"><i class="fas fa-calendar-check"></i> Study Activity</span>
              <span style="font-size:12px;color:var(--text-muted)">${Object.keys(studyTime).length} days studied</span>
            </div>
            ${this.renderHeatmap(studyTime)}
          </div>

          <!-- Subject Breakdown -->
          <div class="subject-breakdown-card">
            <div class="section-header">
              <span class="section-title"><i class="fas fa-chart-pie"></i> Subject Breakdown</span>
            </div>
            <div class="subject-bar-list">
              ${this.renderSubjectBreakdown(subjectTime, totalMin)}
            </div>
          </div>

          <!-- Quiz History -->
          <div class="quiz-history-card">
            <div class="section-header">
              <span class="section-title"><i class="fas fa-file-circle-check"></i> Quiz History</span>
              <span style="font-size:12px;color:var(--text-muted)">${quizHistory.length} attempts</span>
            </div>
            <div class="quiz-history-list">
              ${quizHistory.length ? quizHistory.slice(0, 20).map(q => `
                <div class="quiz-history-item">
                  <div class="quiz-score-pill ${SNS.utils.getScoreColor(q.score)}">${q.score}%</div>
                  <div class="quiz-history-info">
                    <div class="quiz-history-topic">${SNS.utils.escapeHtml(q.topicName)}</div>
                    <div class="quiz-history-date">${q.correct}/${q.total} correct · ${SNS.utils.formatDate(q.date)}</div>
                  </div>
                  <button class="btn btn-sm btn-ghost" onclick="SNS.router.navigate('study',{topic:'${SNS.utils.escapeHtml(q.topicId)}'})">
                    <i class="fas fa-redo"></i>
                  </button>
                </div>
              `).join('') : '<div style="padding:20px;text-align:center;font-size:13px;color:var(--text-muted);">No quizzes completed yet. Start studying!</div>'}
            </div>
          </div>

        </div>

        <!-- Stats Sidebar -->
        <div class="stats-sidebar">

          <!-- XP & Level -->
          <div class="stat-summary-card">
            <div class="big-number-stat">
              <div class="big-number text-accent">${profile.xp}</div>
              <div class="big-number-label">Total XP · Level ${profile.level}</div>
            </div>
            <div style="margin-top:12px;">
              <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-muted);margin-bottom:5px;">
                <span>${profile.xp % 500} XP</span>
                <span>500 XP to Level ${profile.level + 1}</span>
              </div>
              <div class="progress-bar-wrap" style="height:6px">
                <div class="progress-bar-fill" style="width:${(profile.xp % 500) / 500 * 100}%"></div>
              </div>
            </div>
          </div>

          <!-- Streak -->
          <div class="stat-summary-card">
            <div class="big-number-stat">
              <div class="streak-flame">🔥</div>
              <div class="big-number text-orange">${streak.current}</div>
              <div class="big-number-label">Day Streak</div>
              <div style="font-size:12px;color:var(--text-muted);margin-top:4px">Best: ${streak.longest} days</div>
            </div>
          </div>

          <!-- Study Total -->
          <div class="stat-summary-card">
            <div class="big-number-stat">
              <div class="big-number text-blue">${SNS.utils.formatMinutes(totalMin)}</div>
              <div class="big-number-label">Total Study Time</div>
              <div style="font-size:12px;color:var(--text-muted);margin-top:4px">${sessions.length} sessions completed</div>
            </div>
          </div>

          <!-- Weak Areas -->
          ${weakList.length ? `
            <div class="weak-areas-card">
              <div class="section-header">
                <span class="section-title"><i class="fas fa-triangle-exclamation text-orange"></i> Focus Areas</span>
              </div>
              <div class="weak-area-list">
                ${weakList.map(w => `
                  <div class="weak-area-item" onclick="SNS.router.navigate('study',{topic:'${SNS.utils.escapeHtml(w.id)}'})">
                    <div class="weak-area-icon"><i class="fas fa-triangle-exclamation"></i></div>
                    <div class="weak-area-info">
                      <div class="weak-area-name">${SNS.utils.escapeHtml(w.name)}</div>
                      <div class="weak-area-meta">${w.failCount} incorrect answers · ${SNS.utils.escapeHtml(w.subject)}</div>
                    </div>
                    <div class="weak-area-score">${w.failCount}✗</div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Achievements -->
          <div class="achievements-card">
            <div class="section-header">
              <span class="section-title"><i class="fas fa-medal text-yellow"></i> Achievements</span>
              <span style="font-size:12px;color:var(--text-muted)">${ACHIEVEMENTS.filter(a => a.earned).length}/${ACHIEVEMENTS.length}</span>
            </div>
            <div class="achievement-grid">
              ${ACHIEVEMENTS.map(a => `
                <div class="achievement-badge ${a.earned ? 'earned' : ''}" title="${a.name}${a.earned ? ' (earned!)' : ' (locked)'}">
                  <div class="ach-icon">${a.icon}</div>
                  <div class="ach-name">${a.name}</div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>
      </div>
    `;
  },

  renderHeatmap(studyTime) {
    const today = new Date();
    const cells = [];
    const weeks = 26;

    for (let w = weeks - 1; w >= 0; w--) {
      const weekCells = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(today);
        date.setDate(today.getDate() - (w * 7) - (6 - d));
        if (date > today) {
          weekCells.push('<div class="heatmap-cell" style="opacity:0"></div>');
          continue;
        }
        const key = date.toISOString().slice(0, 10);
        const minutes = studyTime[key] || 0;
        let level = 0;
        if (minutes > 0)   level = 1;
        if (minutes >= 30)  level = 2;
        if (minutes >= 60)  level = 3;
        if (minutes >= 120) level = 4;
        const label = `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}: ${minutes}m`;
        weekCells.push(`<div class="heatmap-cell" data-level="${level}" title="${label}"></div>`);
      }
      cells.push(`<div class="heatmap-week">${weekCells.join('')}</div>`);
    }

    return `
      <div style="display:flex;gap:0;">
        <div class="heatmap-day-labels">
          <div class="heatmap-day-label">M</div>
          <div class="heatmap-day-label"></div>
          <div class="heatmap-day-label">W</div>
          <div class="heatmap-day-label"></div>
          <div class="heatmap-day-label">F</div>
          <div class="heatmap-day-label"></div>
          <div class="heatmap-day-label">S</div>
        </div>
        <div style="flex:1;overflow-x:auto;">
          <div class="heatmap-grid">${cells.join('')}</div>
        </div>
      </div>
      <div class="heatmap-legend">
        <span>Less</span>
        <div class="legend-cell" style="background:var(--bg-surface);border:1px solid var(--border)"></div>
        <div class="legend-cell" style="background:rgba(0,212,170,0.15)"></div>
        <div class="legend-cell" style="background:rgba(0,212,170,0.35)"></div>
        <div class="legend-cell" style="background:rgba(0,212,170,0.60)"></div>
        <div class="legend-cell" style="background:rgba(0,212,170,0.90)"></div>
        <span>More</span>
      </div>
    `;
  },

  renderSubjectBreakdown(subjectTime, totalMin) {
    if (!totalMin) {
      return '<div style="padding:20px;text-align:center;font-size:13px;color:var(--text-muted);">No study data yet. Complete some sessions to see your breakdown!</div>';
    }

    const subjects = [
      { id: 'math',     label: 'Mathematics', icon: 'fa-square-root-variable', colorClass: 'blue' },
      { id: 'physics',  label: 'Physics',     icon: 'fa-atom',   colorClass: '' },
      { id: 'biology',  label: 'Biology',     icon: 'fa-dna',    colorClass: 'green' },
      { id: 'chemistry',label: 'Chemistry',   icon: 'fa-flask',  colorClass: 'orange' },
      { id: 'english',  label: 'English',     icon: 'fa-book-open', colorClass: 'purple' }
    ];

    return subjects.map(s => {
      const min = subjectTime[s.id] || 0;
      const pct = totalMin > 0 ? Math.round((min / totalMin) * 100) : 0;
      if (!min) return '';

      return `
        <div class="subject-bar-item">
          <div class="subject-bar-header">
            <div class="subject-bar-name">
              <i class="fas ${s.icon} text-${s.colorClass || 'accent'}"></i>
              ${s.label}
            </div>
            <div class="subject-bar-meta">
              <span>${SNS.utils.formatMinutes(min)}</span>
              <span class="subject-bar-pct">${pct}%</span>
            </div>
          </div>
          <div class="progress-bar-wrap">
            <div class="progress-bar-fill ${s.colorClass}" style="width:${pct}%;transition:width 0.8s ease"></div>
          </div>
        </div>
      `;
    }).filter(Boolean).join('') || '<div style="padding:20px;text-align:center;font-size:13px;color:var(--text-muted);">No subject data yet.</div>';
  }
};
