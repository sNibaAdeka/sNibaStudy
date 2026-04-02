/* ═══════════════════════════════════════════
   sNibaStudy — Profile Page
   ═══════════════════════════════════════════ */

window.SNS = window.SNS || {};
SNS.pages = SNS.pages || {};

SNS.pages.profile = {

  render(container) {
    const profile = SNS.store.get('profile');
    const streak  = SNS.store.get('streak');
    const sessions = SNS.store.get('studySessions');
    const studyTime = SNS.store.get('studyTime');
    const totalMin = Object.values(studyTime).reduce((s, v) => s + v, 0);
    const xpInLevel = profile.xp % 500;

    container.innerHTML = `
      <div class="page-header">
        <div class="page-header-text">
          <h2><i class="fas fa-circle-user" style="color:var(--accent);margin-right:8px;"></i>My Profile</h2>
          <p>Manage your profile and settings</p>
        </div>
      </div>

      <div class="grid-2" style="align-items:start;">

        <!-- Profile Card -->
        <div class="card">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;">
            <div class="user-avatar lg" style="width:64px;height:64px;font-size:24px;border-radius:var(--radius)" id="profile-avatar-display">${SNS.utils.escapeHtml(profile.avatar)}</div>
            <div>
              <div style="font-size:20px;font-weight:700;color:var(--text-primary)" id="profile-name-display">${SNS.utils.escapeHtml(profile.name)}</div>
              <div style="font-size:13px;color:var(--text-muted)">${SNS.utils.escapeHtml(profile.school)} · ${SNS.utils.escapeHtml(profile.grade)}</div>
              <div style="margin-top:6px;"><span class="badge badge-accent">Level ${profile.level}</span> <span class="badge badge-neutral">${profile.xp} XP</span></div>
            </div>
          </div>

          <div style="margin-bottom:16px;">
            <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-muted);margin-bottom:5px;">
              <span>XP Progress to Level ${profile.level + 1}</span>
              <span>${xpInLevel}/500</span>
            </div>
            <div class="progress-bar-wrap" style="height:7px">
              <div class="progress-bar-fill" style="width:${(xpInLevel/500)*100}%"></div>
            </div>
          </div>

          <div class="divider"></div>

          <!-- Edit Form -->
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div class="input-group">
              <label class="input-label">Display Name</label>
              <input type="text" class="input" id="profile-name-input" value="${SNS.utils.escapeHtml(profile.name)}" maxlength="50">
            </div>
            <div class="grid-2" style="gap:12px;">
              <div class="input-group">
                <label class="input-label">Grade</label>
                <select class="input" id="profile-grade">
                  ${['Grade 9','Grade 10','Grade 11','Grade 12'].map(g => `<option ${profile.grade===g?'selected':''}>${g}</option>`).join('')}
                </select>
              </div>
              <div class="input-group">
                <label class="input-label">School</label>
                <input type="text" class="input" id="profile-school" value="${SNS.utils.escapeHtml(profile.school)}" maxlength="50">
              </div>
            </div>
            <button class="btn btn-primary" id="save-profile-btn">
              <i class="fas fa-save"></i> Save Changes
            </button>
          </div>
        </div>

        <!-- Stats Summary -->
        <div style="display:flex;flex-direction:column;gap:16px;">
          <div class="card">
            <div class="section-title" style="margin-bottom:14px;"><i class="fas fa-chart-bar"></i> Study Stats</div>
            ${[
              { label: 'Total Study Time', value: SNS.utils.formatMinutes(totalMin), icon: 'fa-clock', color: 'accent' },
              { label: 'Sessions Completed', value: sessions.length, icon: 'fa-book-open', color: 'blue' },
              { label: 'Current Streak', value: `${streak.current} days 🔥`, icon: 'fa-fire', color: 'orange' },
              { label: 'Longest Streak', value: `${streak.longest} days`, icon: 'fa-trophy', color: 'yellow' },
              { label: 'Member Since', value: SNS.utils.formatDate(profile.joinDate || SNS.utils.today()), icon: 'fa-calendar', color: '' }
            ].map(stat => `
              <div class="daily-summary-row">
                <span class="daily-summary-key"><i class="fas ${stat.icon}"></i> ${stat.label}</span>
                <span class="daily-summary-val ${stat.color ? 'text-'+stat.color : ''}">${SNS.utils.escapeHtml(String(stat.value))}</span>
              </div>
            `).join('')}
          </div>

          <div class="card">
            <div class="section-title" style="margin-bottom:14px;"><i class="fas fa-gear"></i> Settings</div>
            ${[
              { id: 'toggle-notif', label: 'Notifications', desc: 'Study reminders and updates' },
              { id: 'toggle-sound', label: 'Sound Effects', desc: 'Timer and achievement sounds' }
            ].map(opt => `
              <div class="focus-option">
                <div class="focus-option-info">
                  <div class="focus-option-name">${opt.label}</div>
                  <div class="focus-option-desc">${opt.desc}</div>
                </div>
                <div class="toggle on" id="${opt.id}"><div class="toggle-thumb"></div></div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    document.getElementById('save-profile-btn')?.addEventListener('click', () => {
      const name   = document.getElementById('profile-name-input')?.value.trim();
      const grade  = document.getElementById('profile-grade')?.value;
      const school = document.getElementById('profile-school')?.value.trim();
      if (!name) { SNS.utils.toast('Name cannot be empty', 'error'); return; }

      SNS.store.update('profile', p => ({ ...p, name, grade, school, avatar: name[0].toUpperCase() }));
      // Update sidebar
      document.getElementById('sidebar-name').textContent = name;
      document.getElementById('sidebar-avatar').textContent = name[0].toUpperCase();
      document.getElementById('header-avatar').textContent = name[0].toUpperCase();
      SNS.utils.toast('Profile saved!', 'success');
    });

    container.querySelectorAll('.toggle').forEach(t => {
      t.addEventListener('click', () => t.classList.toggle('on'));
    });
  }
};

// Stub pages for flashcards, tests, friends, rooms routes
SNS.pages.flashcards_page = {
  render(container) {
    const decks = SNS.store.get('flashcardDecks');
    const deckEntries = Object.entries(decks);

    container.innerHTML = `
      <div class="page-header">
        <div class="page-header-text">
          <h2><i class="fas fa-layer-group" style="color:var(--orange);margin-right:8px;"></i>Flashcards</h2>
          <p>Review all your saved flashcard decks</p>
        </div>
      </div>
      ${deckEntries.length ? `
        <div class="flashcard-decks-grid stagger">
          ${deckEntries.map(([topicId, cards]) => {
            const result = SNS.findSubtopic(topicId);
            if (!result) return '';
            const { sub, subject } = result;
            const known = cards.filter(c => c.known).length;
            const pct = cards.length ? Math.round((known/cards.length)*100) : 0;
            return `
              <div class="deck-card" onclick="SNS.router.navigate('study',{topic:'${SNS.utils.escapeHtml(topicId)}'})">
                <div class="deck-icon" style="background:rgba(0,0,0,0.2);color:var(${subject.colorVar})"><i class="fas ${subject.icon}"></i></div>
                <div class="deck-name">${SNS.utils.escapeHtml(sub.title)}</div>
                <div class="deck-count">${cards.length} cards · ${known} known</div>
                <div class="deck-progress">
                  <div class="deck-progress-label"><span>Mastery</span><span>${pct}%</span></div>
                  <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pct}%;background:var(${subject.colorVar})"></div></div>
                </div>
              </div>`;
          }).filter(Boolean).join('')}
        </div>
      ` : `
        <div class="empty-state">
          <div class="empty-state-icon"><i class="fas fa-layer-group"></i></div>
          <h3>No flashcard decks yet</h3>
          <p>Study a topic and use the Flashcards tab to create decks automatically.</p>
          <button class="btn btn-primary" onclick="SNS.router.navigate('study')" style="margin-top:8px">Start Studying</button>
        </div>
      `}
    `;
  }
};

SNS.pages.tests = {
  render(container) {
    const subjects = Object.values(SNS.CURRICULUM);
    container.innerHTML = `
      <div class="page-header">
        <div class="page-header-text">
          <h2><i class="fas fa-file-circle-check" style="color:var(--purple);margin-right:8px;"></i>Tests</h2>
          <p>Practice tests organized by subject</p>
        </div>
      </div>
      <div class="grid-3 stagger">
        ${subjects.map(s => {
          const allSubs = s.topics.flatMap(t => t.subtopics || []);
          const withQuiz = allSubs.filter(sub => sub.quiz && sub.quiz.length);
          return `
            <div class="card interactive" onclick="SNS.router.navigate('nis',{subject:'${s.id}'})">
              <div class="stat-header">
                <div class="stat-icon" style="background:rgba(0,0,0,0.2);color:var(${s.colorVar})"><i class="fas ${s.icon}"></i></div>
                <span class="badge badge-neutral" style="font-size:10px">${withQuiz.length} tests</span>
              </div>
              <div style="font-size:16px;font-weight:700;color:var(--text-primary);margin:10px 0 4px">${SNS.utils.escapeHtml(s.label)}</div>
              <p style="font-size:13px;color:var(--text-muted)">Click to browse topics and start practice quizzes</p>
              <button class="btn btn-sm btn-primary" style="margin-top:12px"><i class="fas fa-play"></i> Start Test</button>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }
};

SNS.pages.friends = {
  render(container, params) {
    SNS.pages.social.activeTab = 'friends';
    SNS.pages.social.render(container, { ...(params || {}), tab: 'friends' });
  }
};

SNS.pages.rooms = {
  render(container, params) {
    SNS.pages.social.activeTab = 'rooms';
    SNS.pages.social.render(container, { ...(params || {}), tab: 'rooms' });
  }
};
