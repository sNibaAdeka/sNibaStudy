/* ═══════════════════════════════════════════
   sNibaStudy — Saved Content Page
   ═══════════════════════════════════════════ */

window.SNS = window.SNS || {};
SNS.pages = SNS.pages || {};

SNS.pages.saved = {

  render(container) {
    const savedSessions  = SNS.store.get('savedSessions');
    const savedTopics    = SNS.store.get('savedTopics');
    const flashcardDecks = SNS.store.get('flashcardDecks');

    container.innerHTML = `
      <div class="page-header">
        <div class="page-header-text">
          <h2><i class="fas fa-bookmark" style="color:var(--blue);margin-right:8px;"></i>Saved Content</h2>
          <p>Your bookmarked study sessions, topics, and flashcard decks</p>
        </div>
      </div>

      <div class="saved-layout">

        <!-- Saved Sessions -->
        <div>
          <div class="section-header">
            <span class="section-title"><i class="fas fa-history"></i> Saved Sessions</span>
            <span style="font-size:12px;color:var(--text-muted)">${savedSessions.length} sessions</span>
          </div>
          ${savedSessions.length ? `
            <div class="saved-sessions-grid stagger">
              ${savedSessions.map(s => this.renderSessionCard(s)).join('')}
            </div>
          ` : `
            <div class="empty-state">
              <div class="empty-state-icon"><i class="fas fa-bookmark"></i></div>
              <h3>No saved sessions</h3>
              <p>Study a topic and click "Save Session" to keep it here for quick review.</p>
              <button class="btn btn-primary" onclick="SNS.router.navigate('study')" style="margin-top:8px">
                <i class="fas fa-brain"></i> Start Studying
              </button>
            </div>
          `}
        </div>

        <!-- Saved Topics -->
        ${savedTopics.length ? `
          <div>
            <div class="section-header">
              <span class="section-title"><i class="fas fa-tags"></i> Saved Topics</span>
            </div>
            <div class="saved-topics-list">
              ${savedTopics.slice(0, 20).map(tid => {
                const result = SNS.findSubtopic(tid);
                if (!result) return '';
                const { sub, topic, subject } = result;
                return `
                  <div class="saved-topic-item" onclick="SNS.router.navigate('study',{topic:'${SNS.utils.escapeHtml(tid)}'})">
                    <div class="saved-topic-dot" style="background:var(${subject.colorVar})"></div>
                    <span class="saved-topic-name">${SNS.utils.escapeHtml(sub.title)}</span>
                    <span class="saved-topic-subject">${SNS.utils.escapeHtml(subject.label)}</span>
                    <i class="fas fa-chevron-right" style="font-size:11px;color:var(--text-muted)"></i>
                  </div>
                `;
              }).filter(Boolean).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Flashcard Decks -->
        ${Object.keys(flashcardDecks).length ? `
          <div>
            <div class="section-header">
              <span class="section-title"><i class="fas fa-layer-group"></i> My Flashcard Decks</span>
            </div>
            <div class="flashcard-decks-grid stagger">
              ${Object.entries(flashcardDecks).map(([topicId, cards]) => {
                const result = SNS.findSubtopic(topicId);
                if (!result) return '';
                const { sub, subject } = result;
                const knownCount = cards.filter(c => c.known).length;
                const pct = cards.length ? Math.round((knownCount / cards.length) * 100) : 0;

                return `
                  <div class="deck-card" onclick="SNS.router.navigate('study',{topic:'${SNS.utils.escapeHtml(topicId)}'})">
                    <div class="deck-icon" style="background:rgba(0,0,0,0.2);color:var(${subject.colorVar});font-size:18px">
                      <i class="fas ${subject.icon}"></i>
                    </div>
                    <div class="deck-name">${SNS.utils.escapeHtml(sub.title)}</div>
                    <div class="deck-count">${cards.length} cards · ${knownCount} known</div>
                    <div class="deck-progress">
                      <div class="deck-progress-label">
                        <span>Mastery</span>
                        <span>${pct}%</span>
                      </div>
                      <div class="progress-bar-wrap">
                        <div class="progress-bar-fill" style="width:${pct}%;background:var(${subject.colorVar})"></div>
                      </div>
                    </div>
                    <button class="btn btn-sm btn-secondary" style="width:100%;justify-content:center;margin-top:4px">
                      <i class="fas fa-rotate-right"></i> Review Deck
                    </button>
                  </div>
                `;
              }).filter(Boolean).join('')}
            </div>
          </div>
        ` : ''}

      </div>
    `;

    // Wire delete buttons
    container.querySelectorAll('[data-delete-session]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const topicId = btn.dataset.deleteSession;
        SNS.store.update('savedSessions', sessions => sessions.filter(s => s.topicId !== topicId));
        SNS.utils.toast('Session removed', 'info', 1500);
        this.render(container);
      });
    });
  },

  renderSessionCard(s) {
    const result = SNS.findSubtopic(s.topicId);
    const subject = result ? result.subject : null;
    const scoreClass = s.quizScore != null ? SNS.utils.getScoreColor(s.quizScore) : 'none';
    const subjectLabel = subject ? subject.label : 'General';
    const icon = subject ? subject.icon : 'fa-book-open';
    const colorVar = subject ? subject.colorVar : '--accent';

    return `
      <div class="saved-session-card card-appear">
        <div class="saved-session-header">
          <div class="saved-session-icon" style="background:rgba(0,0,0,0.2);color:var(${colorVar})">
            <i class="fas ${icon}"></i>
          </div>
          <div class="saved-session-info">
            <div class="saved-session-title">${SNS.utils.escapeHtml(s.title || s.topicId)}</div>
            <div class="saved-session-subject">${SNS.utils.escapeHtml(subjectLabel)}</div>
          </div>
        </div>

        <div class="saved-session-meta">
          <div class="saved-meta-item"><i class="fas fa-calendar"></i>${SNS.utils.formatDate(s.date)}</div>
          <div class="saved-meta-item"><i class="fas fa-clock"></i>${SNS.utils.formatMinutes(s.durationMin || 0)}</div>
          ${s.quizScore != null ? `<div class="saved-session-score ${scoreClass}">Quiz: ${s.quizScore}%</div>` : ''}
        </div>

        <div class="saved-session-actions">
          <button class="btn btn-sm btn-primary" onclick="SNS.router.navigate('study',{topic:'${SNS.utils.escapeHtml(s.topicId)}'})">
            <i class="fas fa-redo"></i> Review
          </button>
          <button class="saved-delete-btn" data-delete-session="${SNS.utils.escapeHtml(s.topicId)}" title="Remove">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `;
  }
};
