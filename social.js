/* ═══════════════════════════════════════════
   sNibaStudy — Social Page (Friends, Rooms, Leaderboard)
   ═══════════════════════════════════════════ */

window.SNS = window.SNS || {};
SNS.pages = SNS.pages || {};

const STUDY_ROOMS = [
  { id: 'room-algebra',   name: 'Algebra Focus',    subject: 'Mathematics', icon: '📐', iconBg: 'var(--blue-dim)',   color: '--blue',   participants: ['AN', 'DB'], status: 'live',      timerMin: 18 },
  { id: 'room-ielts',     name: 'IELTS Prep',       subject: 'English',     icon: '📝', iconBg: 'var(--purple-dim)', color: '--purple', participants: ['ZS'],       status: 'live',      timerMin: 7 },
  { id: 'room-bio',       name: 'Biology Review',   subject: 'Biology',     icon: '🧬', iconBg: 'var(--green-dim)',  color: '--green',  participants: ['MO', 'AT'], status: 'open',      timerMin: 0 },
  { id: 'room-free',      name: 'Free Study',       subject: 'Any Subject', icon: '✨', iconBg: 'var(--accent-dim)', color: '--accent', participants: [],           status: 'open',      timerMin: 0 }
];

SNS.pages.social = {
  activeTab: 'friends',

  render(container, params) {
    if (params && params.tab) this.activeTab = params.tab;
    const profile = SNS.store.get('profile');
    const friends = SNS.store.get('friends');
    const streak  = SNS.store.get('streak');
    const todayMin = (SNS.store.get('studyTime') || {})[SNS.utils.today()] || 0;

    // Build leaderboard
    const self = { id: 'self', name: profile.name, avatar: profile.avatar, grade: profile.grade, school: profile.school, level: profile.level, xp: profile.xp, streak: streak.current, studyTimeToday: todayMin, isMe: true };
    const lb = [self, ...friends].sort((a, b) => b.xp - a.xp).map((f, i) => ({ ...f, rank: i + 1 }));

    container.innerHTML = `
      <div class="page-header">
        <div class="page-header-text">
          <h2><i class="fas fa-user-group" style="color:var(--green);margin-right:8px;"></i>Social</h2>
          <p>Study with friends, compete on the leaderboard, and join study rooms</p>
        </div>
        <div class="page-header-actions">
          <button class="btn btn-secondary" id="add-friend-modal-btn">
            <i class="fas fa-user-plus"></i> Add Friend
          </button>
        </div>
      </div>

      <!-- Tab Bar -->
      <div class="tabs" style="margin-bottom:20px;max-width:400px;">
        <button class="tab ${this.activeTab === 'friends' ? 'active' : ''}" data-tab="friends">
          <i class="fas fa-user-group"></i> Friends (${friends.length})
        </button>
        <button class="tab ${this.activeTab === 'leaderboard' ? 'active' : ''}" data-tab="leaderboard">
          <i class="fas fa-trophy"></i> Leaderboard
        </button>
        <button class="tab ${this.activeTab === 'rooms' ? 'active' : ''}" data-tab="rooms">
          <i class="fas fa-door-open"></i> Rooms
        </button>
      </div>

      <!-- Tab Content -->
      <div id="social-tab-content">
        ${this.renderTabContent(this.activeTab, friends, lb)}
      </div>
    `;

    container.querySelectorAll('.tab[data-tab]').forEach(tab => {
      tab.addEventListener('click', () => {
        container.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.activeTab = tab.dataset.tab;
        document.getElementById('social-tab-content').innerHTML = this.renderTabContent(this.activeTab, friends, lb);
        this.wireTabContent();
      });
    });

    document.getElementById('add-friend-modal-btn')?.addEventListener('click', () => {
      showAddFriendModal();
    });

    this.wireTabContent();
  },

  renderTabContent(tab, friends, lb) {
    if (tab === 'friends') return this.renderFriends(friends);
    if (tab === 'leaderboard') return this.renderLeaderboard(lb);
    if (tab === 'rooms') return this.renderRooms();
    return '';
  },

  renderFriends(friends) {
    const friendCards = friends.map(f => `
      <div class="friend-card card-appear">
        <div class="friend-card-header">
          <div class="friend-avatar-wrap">
            <div class="friend-avatar">${SNS.utils.escapeHtml(f.avatar || f.name[0])}</div>
            <div class="online-indicator ${f.status}"></div>
          </div>
          <div class="friend-info">
            <div class="friend-name">${SNS.utils.escapeHtml(f.name)}</div>
            <div class="friend-school">${SNS.utils.escapeHtml(f.school)} · ${SNS.utils.escapeHtml(f.grade)}</div>
          </div>
          <span class="badge badge-${f.status === 'online' ? 'green' : f.status === 'busy' ? 'orange' : 'neutral'}" style="font-size:10px">${f.status}</span>
        </div>

        <div class="friend-stats">
          <div class="friend-stat">
            <div class="friend-stat-value text-accent">${f.xp}</div>
            <div class="friend-stat-label">XP</div>
          </div>
          <div class="friend-stat">
            <div class="friend-stat-value text-orange">${f.streak}🔥</div>
            <div class="friend-stat-label">Streak</div>
          </div>
          <div class="friend-stat">
            <div class="friend-stat-value">${SNS.utils.formatMinutes(f.studyTimeToday)}</div>
            <div class="friend-stat-label">Today</div>
          </div>
          <div class="friend-stat">
            <div class="friend-stat-value">Lv.${f.level}</div>
            <div class="friend-stat-label">Level</div>
          </div>
        </div>

        <div class="friend-study-bar">
          <div class="friend-study-label">
            <span>Study time today</span>
            <span>${SNS.utils.formatMinutes(f.studyTimeToday)}</span>
          </div>
          <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${Math.min((f.studyTimeToday/180)*100,100)}%;background:var(--accent)"></div></div>
        </div>

        <div class="friend-actions">
          ${f.status !== 'offline' ? `<button class="btn btn-sm btn-secondary" onclick="SNS.utils.toast('Inviting ${SNS.utils.escapeHtml(f.name)} to study room...', 'info')"><i class="fas fa-door-open"></i> Invite</button>` : ''}
          <button class="btn btn-sm btn-ghost" onclick="SNS.utils.toast('View profile coming soon!', 'info')">
            <i class="fas fa-user"></i> Profile
          </button>
        </div>
      </div>
    `).join('');

    return `
      <div class="friends-grid stagger">
        ${friendCards}
        <div class="add-friend-card" id="add-friend-cta">
          <div class="add-friend-icon"><i class="fas fa-user-plus"></i></div>
          <div class="add-friend-label">Add a Friend</div>
          <p style="font-size:12px;color:var(--text-muted);text-align:center;">Study together and stay motivated!</p>
        </div>
      </div>
    `;
  },

  renderLeaderboard(lb) {
    const rowsHtml = lb.map(f => `
      <div class="lb-table-row ${f.isMe ? 'is-me' : ''}">
        <div class="lb-rank-cell ${f.rank === 1 ? 'gold' : f.rank === 2 ? 'silver' : f.rank === 3 ? 'bronze' : ''}">
          ${f.rank <= 3 ? ['🥇','🥈','🥉'][f.rank-1] : f.rank}
        </div>
        <div class="lb-user-cell">
          <div class="lb-avatar">${SNS.utils.escapeHtml(f.avatar || f.name[0])}</div>
          <div>
            <div class="lb-user-name">${SNS.utils.escapeHtml(f.name)}${f.isMe ? ' <span style="color:var(--accent);font-size:11px">(you)</span>' : ''}</div>
            <div class="lb-user-grade">${SNS.utils.escapeHtml(f.school || 'NIS')} · ${SNS.utils.escapeHtml(f.grade || 'Grade 10')}</div>
          </div>
        </div>
        <div class="lb-xp-cell">${f.xp} XP</div>
        <div class="lb-time-cell"><i class="fas fa-clock"></i> ${SNS.utils.formatMinutes(f.studyTimeToday || 0)}</div>
        <div class="lb-streak-cell"><i class="fas fa-fire"></i> ${f.streak || 0}</div>
      </div>
    `).join('');

    return `
      <div class="leaderboard-full">
        <div class="leaderboard-full-header">
          <i class="fas fa-trophy" style="color:var(--yellow)"></i>
          <span>Weekly Leaderboard</span>
          <span class="badge badge-accent" style="font-size:10px">Live</span>
        </div>
        <div class="lb-table-head">
          <span>Rank</span>
          <span>Student</span>
          <span>XP</span>
          <span>Study Time</span>
          <span>Streak</span>
        </div>
        ${rowsHtml}
      </div>
    `;
  },

  renderRooms() {
    const roomsHtml = STUDY_ROOMS.map(room => {
      const timerDisplay = room.status === 'live' && room.timerMin > 0
        ? `<div class="room-timer"><i class="fas fa-circle" style="color:var(--green);font-size:8px"></i>${room.timerMin}:00 left</div>`
        : '';

      const participantAvatars = room.participants.map(p =>
        `<div class="mini-avatar">${p[0]}</div>`
      ).join('');

      return `
        <div class="room-card ${room.status === 'live' ? 'active' : ''} card-appear">
          <div class="room-card-header">
            <div class="room-icon" style="background:${room.iconBg};font-size:20px">${room.icon}</div>
            <div class="room-info">
              <div class="room-name">${SNS.utils.escapeHtml(room.name)}</div>
              <div class="room-subject">${SNS.utils.escapeHtml(room.subject)}</div>
            </div>
            <span class="room-status ${room.status}">${room.status === 'live' ? '🔴 LIVE' : room.status === 'open' ? '✅ OPEN' : '📅 Soon'}</span>
          </div>

          <div class="room-participants">
            <div class="room-avatars">${participantAvatars}</div>
            <span class="room-participant-count">${room.participants.length} studying${room.status === 'open' ? ' · Be the first!' : ''}</span>
            ${timerDisplay}
          </div>

          <button class="btn btn-primary w-full" style="justify-content:center;" data-room="${room.id}">
            <i class="fas fa-door-open"></i> Join Room
          </button>
        </div>
      `;
    }).join('');

    return `
      <div style="display:flex;gap:10px;align-items:center;margin-bottom:16px;">
        <h3 style="font-size:14px;font-weight:600;color:var(--text-primary)">Active Study Rooms</h3>
        <button class="btn btn-secondary btn-sm" onclick="SNS.utils.toast('Create room feature coming soon!', 'info')">
          <i class="fas fa-plus"></i> Create Room
        </button>
      </div>
      <div class="rooms-grid stagger">${roomsHtml}</div>
    `;
  },

  wireTabContent() {
    // Room join buttons
    document.querySelectorAll('[data-room]').forEach(btn => {
      btn.addEventListener('click', () => {
        const room = STUDY_ROOMS.find(r => r.id === btn.dataset.room);
        if (room) showRoomModal(room);
      });
    });

    // Add friend CTA
    document.getElementById('add-friend-cta')?.addEventListener('click', () => {
      showAddFriendModal();
    });
  }
};

function showRoomModal(room) {
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';

  const timerState = SNS.pomodoro.getState();

  backdrop.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title">${room.icon} ${SNS.utils.escapeHtml(room.name)}</div>
        <div class="modal-close" id="room-modal-close"><i class="fas fa-times"></i></div>
      </div>
      <div class="room-modal-timer">
        <div class="room-modal-time" id="room-modal-time">${SNS.utils.formatTime(timerState.timeLeft)}</div>
        <div class="room-modal-phase">Focus Session · ${SNS.utils.escapeHtml(room.subject)}</div>
      </div>
      <div style="display:flex;gap:10px;justify-content:center;margin-top:16px;">
        <button class="btn btn-primary" id="room-pomodoro-toggle">
          <i class="fas fa-${timerState.running ? 'pause' : 'play'}"></i> ${timerState.running ? 'Pause' : 'Start'} Timer
        </button>
        <button class="btn btn-secondary" onclick="SNS.router.navigate('tools')">
          <i class="fas fa-stopwatch"></i> Full Timer
        </button>
      </div>
      <div class="room-modal-participants">
        <div class="section-title" style="margin-bottom:10px;"><i class="fas fa-users"></i> Participants</div>
        ${[...room.participants, 'YOU'].map(p => `
          <div class="room-participant-item">
            <div class="user-avatar" style="width:28px;height:28px;font-size:11px">${p[0]}</div>
            <span style="font-size:13px;color:var(--text-primary)">${p === 'YOU' ? 'You' : p}</span>
            <span class="badge badge-green" style="font-size:10px;margin-left:auto">Studying</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  document.body.appendChild(backdrop);
  document.getElementById('room-modal-close')?.addEventListener('click', () => backdrop.remove());
  backdrop.addEventListener('click', e => { if (e.target === backdrop) backdrop.remove(); });

  document.getElementById('room-pomodoro-toggle')?.addEventListener('click', () => {
    SNS.pomodoro.toggle();
    const btn = document.getElementById('room-pomodoro-toggle');
    const running = SNS.pomodoro.isRunning();
    if (btn) btn.innerHTML = `<i class="fas fa-${running ? 'pause' : 'play'}"></i> ${running ? 'Pause' : 'Start'} Timer`;
  });

  // Live clock update
  const clock = setInterval(() => {
    const el = document.getElementById('room-modal-time');
    if (!el) { clearInterval(clock); return; }
    el.textContent = SNS.utils.formatTime(SNS.pomodoro.getState().timeLeft);
  }, 1000);
}

function showAddFriendModal() {
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title"><i class="fas fa-user-plus"></i> Add Friend</div>
        <div class="modal-close" id="af-close"><i class="fas fa-times"></i></div>
      </div>
      <div class="input-group">
        <label class="input-label">Search by name or school</label>
        <input type="text" class="input" id="af-search" placeholder="e.g. Asel Nurmagambetova...">
      </div>
      <div id="af-results" style="margin-top:12px;display:flex;flex-direction:column;gap:6px;"></div>
      <div class="modal-footer">
        <button class="btn btn-ghost" id="af-close2">Cancel</button>
      </div>
    </div>
  `;

  document.body.appendChild(backdrop);
  backdrop.querySelector('#af-close')?.addEventListener('click', () => backdrop.remove());
  backdrop.querySelector('#af-close2')?.addEventListener('click', () => backdrop.remove());
  backdrop.addEventListener('click', e => { if (e.target === backdrop) backdrop.remove(); });

  backdrop.querySelector('#af-search')?.addEventListener('input', SNS.utils.debounce((e) => {
    const q = e.target.value.trim().toLowerCase();
    const resultsEl = document.getElementById('af-results');
    if (!q) { resultsEl.innerHTML = ''; return; }

    const mockUsers = [
      { name: 'Aliya Bekova', school: 'NIS Astana', avatar: 'AB' },
      { name: 'Nursultan Ahmetov', school: 'NIS Karaganda', avatar: 'NA' },
      { name: 'Fatima Zhaksybekov', school: 'NIS Shymkent', avatar: 'FZ' }
    ].filter(u => u.name.toLowerCase().includes(q));

    resultsEl.innerHTML = mockUsers.length ? mockUsers.map(u => `
      <div style="display:flex;align-items:center;gap:10px;padding:10px;background:var(--bg-surface);border-radius:var(--radius-xs);border:1px solid var(--border);">
        <div class="user-avatar" style="width:32px;height:32px;font-size:13px">${u.avatar}</div>
        <div style="flex:1"><div style="font-size:13px;font-weight:600">${SNS.utils.escapeHtml(u.name)}</div><div style="font-size:11px;color:var(--text-muted)">${SNS.utils.escapeHtml(u.school)}</div></div>
        <button class="btn btn-sm btn-primary" onclick="SNS.utils.toast('Friend request sent to ${SNS.utils.escapeHtml(u.name)}!', 'success')">Add</button>
      </div>
    `).join('') : '<p style="font-size:13px;color:var(--text-muted);text-align:center;padding:16px;">No users found</p>';
  }, 300));
}
