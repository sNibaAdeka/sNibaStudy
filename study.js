/* ═══════════════════════════════════════════
   sNibaStudy — Study System Page
   ═══════════════════════════════════════════ */

window.SNS = window.SNS || {};
SNS.pages = SNS.pages || {};

SNS.pages.study = {
  currentSubtopic: null,
  sessionStart: null,

  render(container, params) {
    const preloadTopicId = params && params.topic;

    container.innerHTML = `
      <div class="page-header">
        <div class="page-header-text">
          <h2><i class="fas fa-brain" style="color:var(--accent);margin-right:8px;"></i>Study System</h2>
          <p>Enter any topic to get an instant explanation, quiz, and flashcards</p>
        </div>
      </div>

      <div class="study-layout">

        <!-- Input Panel -->
        <div class="topic-input-panel">
          <h3><i class="fas fa-search"></i> Study a Topic</h3>

          <div class="study-input-wrap">
            <textarea id="study-topic-input" placeholder="e.g. Quadratic equations, Newton's laws, Cell mitosis..."></textarea>
          </div>

          <select class="subject-select" id="study-subject-select">
            <option value="">All Subjects</option>
            <option value="math">Mathematics</option>
            <option value="physics">Physics</option>
            <option value="biology">Biology</option>
            <option value="chemistry">Chemistry</option>
            <option value="english">English</option>
          </select>

          <div class="study-action-row">
            <button class="btn btn-primary" id="study-go-btn">
              <i class="fas fa-bolt"></i> Study Now
            </button>
            <button class="btn btn-secondary" id="study-save-btn" style="display:none;">
              <i class="fas fa-bookmark"></i> Save
            </button>
          </div>

          <div class="quick-topics">
            <div class="quick-topics-label">Quick Start</div>
            <div class="quick-topic-chips">
              <div class="quick-chip" data-topic="quadratic">Quadratics</div>
              <div class="quick-chip" data-topic="newton">Newton's Laws</div>
              <div class="quick-chip" data-topic="cell">Cell Biology</div>
              <div class="quick-chip" data-topic="periodic">Periodic Table</div>
              <div class="quick-chip" data-topic="tense">Verb Tenses</div>
              <div class="quick-chip" data-topic="sin">Trigonometry</div>
            </div>
          </div>
        </div>

        <!-- Output Panel -->
        <div class="study-output-panel" id="study-output">
          <div class="study-placeholder">
            <div class="placeholder-icon"><i class="fas fa-brain"></i></div>
            <h3>What do you want to study?</h3>
            <p>Enter a topic on the left or click a quick-start chip to begin. You'll get an explanation, quiz, and flashcards instantly.</p>
          </div>
        </div>

      </div>
    `;

    // Wire input events
    document.getElementById('study-go-btn')?.addEventListener('click', () => {
      this.loadTopic();
    });

    document.getElementById('study-topic-input')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) this.loadTopic();
    });

    document.getElementById('study-save-btn')?.addEventListener('click', () => {
      this.saveSession();
    });

    document.querySelectorAll('.quick-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.getElementById('study-topic-input').value = chip.dataset.topic;
        this.loadTopic();
      });
    });

    // Auto-load if navigated from NIS page
    if (preloadTopicId) {
      const result = SNS.findSubtopic(preloadTopicId);
      if (result) {
        document.getElementById('study-topic-input').value = result.sub.title;
        document.getElementById('study-subject-select').value = result.subject.id;
        this.currentSubtopic = result.sub;
        this.renderStudyContent(result.sub, result.subject);
      }
    }
  },

  loadTopic() {
    const input = document.getElementById('study-topic-input');
    const subjectFilter = document.getElementById('study-subject-select')?.value;
    const query = input?.value.trim();
    if (!query) {
      SNS.utils.toast('Enter a topic to study!', 'info');
      return;
    }

    // Search curriculum
    const results = SNS.searchTopics(query);
    const filtered = subjectFilter ? results.filter(r => r.subject.id === subjectFilter) : results;
    const best = filtered[0] || results[0];

    if (best) {
      this.currentSubtopic = best.sub;
      this.sessionStart = Date.now();
      this.renderStudyContent(best.sub, best.subject);
    } else {
      this.renderNoMatch(query);
    }
  },

  renderStudyContent(sub, subject) {
    const output = document.getElementById('study-output');
    if (!output) return;

    document.getElementById('study-save-btn').style.display = '';

    output.innerHTML = `

      <!-- Explanation -->
      <div class="explanation-box card-appear">
        <div class="explanation-header">
          <div class="explanation-title">
            <i class="fas fa-book-open"></i>
            ${SNS.utils.escapeHtml(sub.title)}
            <span class="badge badge-${subject.colorVar === '--blue' ? 'blue' : subject.colorVar === '--green' ? 'green' : subject.colorVar === '--orange' ? 'orange' : subject.colorVar === '--purple' ? 'purple' : 'accent'}" style="font-size:11px">${SNS.utils.escapeHtml(subject.label)}</span>
          </div>
          <div class="explanation-controls">
            <button class="btn btn-sm btn-ghost" id="explain-simple-btn">🐣 Explain Simple</button>
            <button class="btn btn-sm btn-ghost" id="explain-deep-btn">🔬 Explain Deeper</button>
          </div>
        </div>
        <div class="explanation-body" id="explanation-body">${formatExplanation(sub.explanation || 'Explanation coming soon...')}</div>
        <div class="explanation-footer">
          <div class="explanation-meta">
            <span><i class="fas fa-clock"></i> ~${sub.estimatedMin || 20} min</span>
            <span class="difficulty ${sub.difficulty}">${SNS.utils.capitalize(sub.difficulty || 'medium')}</span>
          </div>
        </div>
      </div>

      <!-- Study Tabs: Quiz, Flashcards, Chat -->
      <div class="study-tabs-container card-appear">
        <div class="study-tabs-header">
          <button class="study-tab active" data-tab="quiz"><i class="fas fa-file-circle-question"></i> Quiz</button>
          <button class="study-tab" data-tab="flashcards"><i class="fas fa-layer-group"></i> Flashcards</button>
          <button class="study-tab" data-tab="chat"><i class="fas fa-comments"></i> AI Chat</button>
        </div>

        <div class="study-tab-panel active" data-panel="quiz" id="quiz-panel"></div>
        <div class="study-tab-panel" data-panel="flashcards" id="flashcards-panel"></div>
        <div class="study-tab-panel" data-panel="chat" id="chat-panel"></div>
      </div>
    `;

    // Explanation mode buttons
    document.getElementById('explain-simple-btn')?.addEventListener('click', () => {
      document.getElementById('explanation-body').innerHTML = formatExplanation(sub.simpleExplanation || sub.explanation || '');
      SNS.utils.toast('Simplified explanation loaded!', 'info', 1500);
    });

    document.getElementById('explain-deep-btn')?.addEventListener('click', () => {
      document.getElementById('explanation-body').innerHTML = formatExplanation(sub.deepExplanation || sub.explanation || '');
      SNS.utils.toast('Deep explanation loaded!', 'info', 1500);
    });

    // Tabs
    output.querySelectorAll('.study-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        output.querySelectorAll('.study-tab').forEach(t => t.classList.remove('active'));
        output.querySelectorAll('.study-tab-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const panel = output.querySelector(`[data-panel="${tab.dataset.tab}"]`);
        if (panel) panel.classList.add('active');

        // Lazy init panels
        if (tab.dataset.tab === 'quiz' && !panel.dataset.loaded) {
          this.initQuiz(sub);
          panel.dataset.loaded = '1';
        }
        if (tab.dataset.tab === 'flashcards' && !panel.dataset.loaded) {
          this.initFlashcards(sub);
          panel.dataset.loaded = '1';
        }
        if (tab.dataset.tab === 'chat' && !panel.dataset.loaded) {
          this.initChat(sub, subject);
          panel.dataset.loaded = '1';
        }
      });
    });

    // Auto-init quiz
    this.initQuiz(sub);
    document.getElementById('quiz-panel').dataset.loaded = '1';

    SNS.pomodoro.setSubject(sub.title);
  },

  initQuiz(sub) {
    const panel = document.getElementById('quiz-panel');
    if (!panel) return;
    if (!sub.quiz || !sub.quiz.length) {
      panel.innerHTML = '<div class="empty-state" style="padding:30px;"><p>No quiz available for this topic yet.</p></div>';
      return;
    }
    SNS.quiz.load(sub.quiz, sub.id);
    SNS.quiz.render(panel, (score) => {
      this.autoSaveSession(sub, score);
    });
  },

  initFlashcards(sub) {
    const panel = document.getElementById('flashcards-panel');
    if (!panel) return;
    if (!sub.flashcards || !sub.flashcards.length) {
      panel.innerHTML = '<div class="empty-state" style="padding:30px;"><p>No flashcards for this topic yet.</p></div>';
      return;
    }
    SNS.flashcards.load(sub.flashcards, sub.id);
    SNS.flashcards.renderCard(panel);
  },

  initChat(sub, subject) {
    const panel = document.getElementById('chat-panel');
    if (!panel) return;

    panel.innerHTML = `
      <div class="chatbot-messages" id="chat-messages">
        <div class="chat-msg bot">
          <div class="chat-avatar"><i class="fas fa-robot"></i></div>
          <div class="chat-bubble">
            Hi! I'm your AI study assistant for <strong>${SNS.utils.escapeHtml(sub.title)}</strong>. 🤖<br>
            Ask me anything about this topic — I can explain concepts, give examples, and simplify difficult parts!
          </div>
        </div>
      </div>
      <div class="chatbot-input-row">
        <input type="text" class="input" id="chat-input" placeholder="Ask about ${SNS.utils.escapeHtml(sub.title)}...">
        <button class="btn btn-primary btn-icon" id="chat-send-btn">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    `;

    const sendMsg = () => {
      const input = document.getElementById('chat-input');
      const text = input?.value.trim();
      if (!text) return;

      addChatMessage(text, 'user');
      input.value = '';

      setTimeout(() => {
        const response = SNS.chatbot.findResponse(text, subject.id);
        const formatted = SNS.chatbot.formatResponse(response);
        addChatMessage(formatted, 'bot', true);
      }, 400);
    };

    document.getElementById('chat-send-btn')?.addEventListener('click', sendMsg);
    document.getElementById('chat-input')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') sendMsg();
    });
  },

  renderNoMatch(query) {
    const output = document.getElementById('study-output');
    const relatedResults = SNS.searchTopics(query.split(' ')[0]);

    output.innerHTML = `
      <div class="study-placeholder">
        <div class="placeholder-icon" style="background:var(--orange-dim);color:var(--orange)">
          <i class="fas fa-magnifying-glass"></i>
        </div>
        <h3>Topic not found in NIS curriculum</h3>
        <p>No exact match for <strong>"${SNS.utils.escapeHtml(query)}"</strong>. Try these related topics or check the Resources Hub.</p>
        ${relatedResults.length ? `
          <div class="quick-topic-chips" style="margin-top:12px;">
            ${relatedResults.slice(0, 5).map(r => `
              <div class="quick-chip" onclick="document.getElementById('study-topic-input').value='${SNS.utils.escapeHtml(r.sub.title)}';SNS.pages.study.loadTopic()">
                ${SNS.utils.escapeHtml(r.sub.title)}
              </div>
            `).join('')}
          </div>
        ` : ''}
        <button class="btn btn-secondary" style="margin-top:12px" onclick="SNS.router.navigate('resources')">
          <i class="fas fa-link"></i> Browse Resources Hub
        </button>
      </div>
    `;
  },

  autoSaveSession(sub, quizScore) {
    if (!this.sessionStart) return;
    const durationMin = Math.round((Date.now() - this.sessionStart) / 60000) || 1;
    SNS.store.saveSession({
      topicId: sub.id,
      subject: sub.id.split('-')[0],
      durationMin,
      quizScore
    });
  },

  saveSession() {
    if (!this.currentSubtopic) return;
    const sub = this.currentSubtopic;
    const durationMin = this.sessionStart ? Math.round((Date.now() - this.sessionStart) / 60000) || 1 : 5;

    SNS.store.update('savedSessions', sessions => {
      const exists = sessions.find(s => s.topicId === sub.id);
      if (exists) return sessions;
      return [{
        topicId: sub.id,
        title: sub.title,
        date: SNS.utils.today(),
        durationMin,
        explanation: sub.explanation ? sub.explanation.slice(0, 300) : ''
      }, ...sessions].slice(0, 50);
    });

    SNS.store.update('savedTopics', topics => {
      if (!topics.includes(sub.id)) return [sub.id, ...topics].slice(0, 100);
      return topics;
    });

    SNS.utils.toast('Session saved!', 'success');
  }
};

function addChatMessage(text, role, isHtml = false) {
  const messages = document.getElementById('chat-messages');
  if (!messages) return;

  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;

  const avatarContent = role === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';

  div.innerHTML = `
    <div class="chat-avatar">${avatarContent}</div>
    <div class="chat-bubble">${isHtml ? text : SNS.utils.escapeHtml(text)}</div>
  `;

  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function formatExplanation(text) {
  if (!text) return '<em style="color:var(--text-muted)">No explanation available.</em>';
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>')
    .replace(/`([^`]+)`/g, '<code class="math-formula">$1</code>');
}
