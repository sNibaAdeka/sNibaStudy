/* ═══════════════════════════════════════════
   sNibaStudy — Main Application Entry Point
   Boot sequence, route registration, global UI
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Wait for DOM ──
  document.addEventListener('DOMContentLoaded', init);

  function init() {

    // 1. Load profile into UI
    updateProfileUI();

    // 2. Seed demo data if first launch
    seedDemoData();

    // 3. Register all routes
    registerRoutes();

    // 4. Wire sidebar navigation
    wireSidebar();

    // 5. Wire header
    wireHeader();

    // 6. Wire focus mode overlay
    wireFocusOverlay();

    // 7. Boot router (reads hash, renders first page)
    SNS.router.init();

    // 8. Check streak
    checkStreak();

    // 9. Populate notifications
    renderNotifications();

    console.log('%csNibaStudy loaded ✓', 'color:#00d4aa;font-weight:bold;font-size:14px');
  }

  // ── Route Registration ──
  function registerRoutes() {
    const R = SNS.router.register.bind(SNS.router);

    R('dashboard', {
      title: 'Dashboard',
      subtitle: 'Your study overview',
      render: (c, p) => SNS.pages.dashboard.render(c, p)
    });

    R('study', {
      title: 'Study System',
      subtitle: 'AI-powered learning',
      render: (c, p) => SNS.pages.study.render(c, p)
    });

    R('flashcards', {
      title: 'Flashcards',
      subtitle: 'Review your decks',
      render: (c, p) => SNS.pages.flashcards_page.render(c, p)
    });

    R('tests', {
      title: 'Tests',
      subtitle: 'Practice quizzes',
      render: (c, p) => SNS.pages.tests.render(c, p)
    });

    R('nis', {
      title: 'NIS Program',
      subtitle: 'School curriculum',
      render: (c, p) => SNS.pages.nis.render(c, p)
    });

    R('resources', {
      title: 'Resources Hub',
      subtitle: 'External learning links',
      render: (c, p) => SNS.pages.resources.render(c, p)
    });

    R('friends', {
      title: 'Friends',
      subtitle: 'Study together',
      render: (c, p) => SNS.pages.friends.render(c, p)
    });

    R('rooms', {
      title: 'Study Rooms',
      subtitle: 'Live study sessions',
      render: (c, p) => SNS.pages.rooms.render(c, p)
    });

    R('tools', {
      title: 'Study Tools',
      subtitle: 'Pomodoro & goals',
      render: (c, p) => SNS.pages.tools.render(c, p)
    });

    R('progress', {
      title: 'My Progress',
      subtitle: 'Analytics & achievements',
      render: (c, p) => SNS.pages.progress.render(c, p)
    });

    R('saved', {
      title: 'Saved Content',
      subtitle: 'Your library',
      render: (c, p) => SNS.pages.saved.render(c, p)
    });

    R('profile', {
      title: 'Profile',
      subtitle: 'Account settings',
      render: (c, p) => SNS.pages.profile.render(c, p)
    });
  }

  // ── Sidebar Navigation ──
  function wireSidebar() {
    const sidebar  = document.getElementById('sidebar');
    const overlay  = document.getElementById('sidebar-overlay');
    const toggleBtn = document.getElementById('sidebar-toggle');

    // Nav item clicks
    document.querySelectorAll('.nav-item[data-route]').forEach(item => {
      item.addEventListener('click', () => {
        SNS.router.navigate(item.dataset.route);
        // Close on mobile
        if (window.innerWidth < 768) closeSidebar();
      });

      item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') item.click();
      });
    });

    // Mobile sidebar toggle
    toggleBtn?.addEventListener('click', () => {
      const isOpen = sidebar?.classList.contains('open');
      isOpen ? closeSidebar() : openSidebar();
    });

    overlay?.addEventListener('click', closeSidebar);

    function openSidebar() {
      sidebar?.classList.add('open');
      overlay?.classList.add('visible');
      toggleBtn?.setAttribute('aria-expanded', 'true');
    }

    function closeSidebar() {
      sidebar?.classList.remove('open');
      overlay?.classList.remove('visible');
      toggleBtn?.setAttribute('aria-expanded', 'false');
    }

    // Sidebar user chip → profile
    document.getElementById('sidebar-user-chip')?.addEventListener('click', () => {
      SNS.router.navigate('profile');
    });
  }

  // ── Header Wiring ──
  function wireHeader() {
    const searchInput    = document.getElementById('global-search');
    const searchDropdown = document.getElementById('search-dropdown');
    const notifBtn       = document.getElementById('notif-btn');
    const notifPanel     = document.getElementById('notif-panel');
    const headerAvatar   = document.getElementById('header-avatar');
    const profileDropdown= document.getElementById('profile-dropdown');
    const clearDataBtn   = document.getElementById('clear-data-btn');
    const markAllRead    = document.getElementById('mark-all-read');

    // Search
    searchInput?.addEventListener('input', SNS.utils.debounce((e) => {
      const q = e.target.value.trim();
      if (!q) { searchDropdown.hidden = true; return; }
      const results = SNS.searchTopics(q);
      if (!results.length) { searchDropdown.hidden = true; return; }
      searchDropdown.hidden = false;
      searchDropdown.innerHTML = results.slice(0, 8).map(r => `
        <div class="search-result-item" data-topic="${SNS.utils.escapeHtml(r.sub.id)}">
          <i class="fas ${r.subject.icon}" style="color:var(${r.subject.colorVar});font-size:13px;width:16px"></i>
          <div>
            <div>${SNS.utils.escapeHtml(r.sub.title)}</div>
            <div class="result-subject">${SNS.utils.escapeHtml(r.subject.label)} · ${SNS.utils.escapeHtml(r.topic.title)}</div>
          </div>
        </div>
      `).join('');
    }, 250));

    searchDropdown?.addEventListener('click', (e) => {
      const item = e.target.closest('[data-topic]');
      if (!item) return;
      SNS.router.navigate('study', { topic: item.dataset.topic });
      searchInput.value = '';
      searchDropdown.hidden = true;
    });

    searchInput?.addEventListener('keydown', e => {
      if (e.key === 'Escape') { searchDropdown.hidden = true; searchInput.blur(); }
    });

    document.addEventListener('click', (e) => {
      if (!searchInput?.contains(e.target)) searchDropdown.hidden = true;
      if (!headerAvatar?.contains(e.target) && !profileDropdown?.contains(e.target)) profileDropdown.hidden = true;
      if (!notifBtn?.contains(e.target) && !notifPanel?.contains(e.target)) notifPanel.hidden = true;
    });

    // Notifications
    notifBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      profileDropdown.hidden = true;
      notifPanel.hidden = !notifPanel.hidden;
      if (!notifPanel.hidden) {
        positionDropdown(notifPanel, notifBtn);
        renderNotifications();
      }
    });

    markAllRead?.addEventListener('click', () => {
      SNS.store.update('notifications', notifs => notifs.map(n => ({ ...n, read: true })));
      document.getElementById('notif-dot').hidden = true;
      renderNotifications();
    });

    // Profile dropdown
    headerAvatar?.addEventListener('click', (e) => {
      e.stopPropagation();
      notifPanel.hidden = true;
      profileDropdown.hidden = !profileDropdown.hidden;
      if (!profileDropdown.hidden) positionDropdown(profileDropdown, headerAvatar);
    });

    // Profile dropdown nav items
    document.querySelectorAll('#profile-dropdown [data-route]').forEach(item => {
      item.addEventListener('click', () => {
        SNS.router.navigate(item.dataset.route);
        profileDropdown.hidden = true;
      });
    });

    // Clear data
    clearDataBtn?.addEventListener('click', () => {
      if (!confirm('Clear all sNibaStudy data? This cannot be undone.')) return;
      SNS.store.clearAll();
      profileDropdown.hidden = true;
      updateProfileUI();
      SNS.router.navigate('dashboard');
      SNS.utils.toast('All data cleared', 'info');
    });
  }

  // ── Focus Mode Overlay ──
  function wireFocusOverlay() {
    document.getElementById('focus-pause-btn')?.addEventListener('click', () => {
      SNS.pomodoro.toggle();
      const btn = document.getElementById('focus-pause-btn');
      if (btn) {
        const running = SNS.pomodoro.isRunning();
        btn.innerHTML = `<i class="fas fa-${running ? 'pause' : 'play'}"></i> ${running ? 'Pause' : 'Resume'}`;
      }
    });

    document.getElementById('focus-exit-btn')?.addEventListener('click', () => {
      document.getElementById('focus-overlay').hidden = true;
    });

    // Keyboard: Escape exits focus mode
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const overlay = document.getElementById('focus-overlay');
        if (overlay && !overlay.hidden) overlay.hidden = true;
      }
    });
  }

  // ── Update Profile in UI ──
  function updateProfileUI() {
    const profile = SNS.store.get('profile');
    const initial = profile.avatar || profile.name[0].toUpperCase();

    setTextContent('sidebar-name', profile.name);
    setTextContent('sidebar-avatar', initial);
    setTextContent('sidebar-level', profile.level);
    setTextContent('sidebar-xp', profile.xp);
    setTextContent('header-avatar', initial);
    setTextContent('dropdown-avatar', initial);
    setTextContent('dropdown-name', profile.name);
    setTextContent('dropdown-level-text', `Level ${profile.level} · ${profile.xp} XP`);
  }

  // ── Notifications ──
  function renderNotifications() {
    const panel = document.getElementById('notif-list');
    const dotEl = document.getElementById('notif-dot');
    if (!panel) return;

    const notifs = SNS.store.get('notifications').slice(0, 10);
    const unread = notifs.filter(n => !n.read).length;

    if (dotEl) dotEl.hidden = unread === 0;

    panel.innerHTML = notifs.map(n => `
      <div class="notif-item ${n.read ? '' : 'unread'}">
        ${!n.read ? '<div class="notif-dot-sm"></div>' : '<div style="width:8px"></div>'}
        <div>
          <div class="notif-text">${SNS.utils.escapeHtml(n.text)}</div>
          <div class="notif-time">${SNS.utils.timeAgo(n.time)}</div>
        </div>
      </div>
    `).join('') || '<div style="padding:20px;text-align:center;font-size:13px;color:var(--text-muted);">No notifications</div>';
  }

  // ── Streak Check ──
  function checkStreak() {
    const streak = SNS.store.get('streak');
    const todayStr = new Date().toISOString().slice(0, 10);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yStr = yesterday.toISOString().slice(0, 10);

    // If last study was before yesterday, reset streak
    if (streak.lastStudyDate && streak.lastStudyDate < yStr && streak.current > 0) {
      SNS.store.update('streak', s => ({ ...s, current: 0 }));

      // Add notification
      SNS.store.update('notifications', notifs => [{
        id: SNS.utils.generateId(),
        text: 'Your streak was reset. Study today to start a new one! 💪',
        time: new Date().toISOString(),
        read: false
      }, ...notifs].slice(0, 30));
    }

    // Streak milestone notifications
    if (streak.current > 0 && streak.current % 7 === 0) {
      SNS.store.update('notifications', notifs => {
        const exists = notifs.find(n => n.text.includes(`${streak.current}-day streak`));
        if (exists) return notifs;
        return [{
          id: SNS.utils.generateId(),
          text: `Amazing! You've reached a ${streak.current}-day streak! 🔥`,
          time: new Date().toISOString(),
          read: false
        }, ...notifs].slice(0, 30);
      });
    }
  }

  // ── Demo Data Seeding (first launch) ──
  function seedDemoData() {
    const seeded = localStorage.getItem('sniba_seeded');
    if (seeded) return;

    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yStr = yesterday.toISOString().slice(0, 10);
    const dayBefore = new Date();
    dayBefore.setDate(dayBefore.getDate() - 2);
    const dStr = dayBefore.toISOString().slice(0, 10);

    // Demo study time
    SNS.store.set('studyTime', {
      [dStr]: 45,
      [yStr]: 62,
      [today]: 20
    });

    // Demo sessions
    SNS.store.set('studySessions', [
      { id: 's1', topicId: 'math-quadratic', subject: 'math', durationMin: 25, quizScore: 80, date: yStr + 'T10:00:00Z' },
      { id: 's2', topicId: 'phys-newton',    subject: 'physics', durationMin: 30, quizScore: 60, date: yStr + 'T11:00:00Z' },
      { id: 's3', topicId: 'bio-cell-structure', subject: 'biology', durationMin: 20, quizScore: 100, date: dStr + 'T09:00:00Z' }
    ]);

    // Demo quiz scores
    SNS.store.set('quizScores', {
      'math-quadratic': [{ score: 80, date: yStr, correct: 4, total: 5 }],
      'phys-newton':    [{ score: 60, date: yStr, correct: 3, total: 5 }],
      'bio-cell-structure': [{ score: 100, date: dStr, correct: 5, total: 5 }]
    });

    // Demo streak
    SNS.store.set('streak', { current: 3, longest: 3, lastStudyDate: today });

    // Demo XP/level
    SNS.store.update('profile', p => ({ ...p, xp: 285, level: 1 }));

    // Demo pomodoro
    SNS.store.set('pomodoroStats', { totalSessions: 4, totalMinutes: 100, todaySessions: 1, todayDate: today });

    // Demo daily goals
    SNS.store.set('dailyGoals', [
      { id: 'g1', text: 'Study quadratic equations', done: true, date: today },
      { id: 'g2', text: 'Complete Newton\'s laws flashcards', done: false, date: today },
      { id: 'g3', text: 'Read IELTS vocabulary list', done: false, date: today }
    ]);

    // Demo saved topics
    SNS.store.set('savedTopics', ['math-quadratic', 'phys-newton', 'bio-cell-structure']);

    // Demo saved sessions
    SNS.store.set('savedSessions', [
      { topicId: 'math-quadratic', title: 'Quadratic Equations', date: yStr, durationMin: 25, quizScore: 80 },
      { topicId: 'phys-newton', title: "Newton's Laws of Motion", date: yStr, durationMin: 30, quizScore: 60 }
    ]);

    // Demo flashcard decks (partially completed)
    SNS.store.set('flashcardDecks', {
      'math-quadratic': [
        { front: 'Quadratic Formula', back: 'x = (-b ± √(b² - 4ac)) / 2a', known: true },
        { front: 'Discriminant', back: 'D = b² - 4ac', known: true },
        { front: 'Vertex of parabola', back: 'x = -b/2a', known: false },
        { front: 'Sum of roots (Vieta)', back: 'x₁ + x₂ = -b/a', known: false },
        { front: 'Product of roots (Vieta)', back: 'x₁ · x₂ = c/a', known: false },
        { front: 'Standard form', back: 'ax² + bx + c = 0', known: true }
      ]
    });

    localStorage.setItem('sniba_seeded', '1');
    updateProfileUI();
  }

  // ── Helpers ──
  function setTextContent(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function positionDropdown(panel, anchor) {
    const rect = anchor.getBoundingClientRect();
    panel.style.top  = (rect.bottom + 8) + 'px';
    panel.style.right = (window.innerWidth - rect.right) + 'px';
    panel.style.left  = 'auto';
  }

})();
