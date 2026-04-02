/* ═══════════════════════════════════════════
   sNibaStudy — NIS Program Page
   ═══════════════════════════════════════════ */

window.SNS = window.SNS || {};
SNS.pages = SNS.pages || {};

SNS.pages.nis = {
  activeSubjectId: 'math',

  render(container, params) {
    if (params && params.subject) this.activeSubjectId = params.subject;
    const subjects = Object.values(SNS.CURRICULUM);

    container.innerHTML = `
      <div class="page-header">
        <div class="page-header-text">
          <h2><i class="fas fa-graduation-cap" style="color:var(--purple);margin-right:8px;"></i>NIS Program</h2>
          <p>Browse curriculum topics aligned with Nazarbayev Intellectual Schools</p>
        </div>
      </div>

      <div class="nis-layout">

        <!-- Subject Panel -->
        <div class="subject-panel">
          <div class="subject-panel-header">Subjects</div>
          ${subjects.map(s => this.renderSubjectBtn(s)).join('')}
        </div>

        <!-- Topics Panel -->
        <div class="topics-panel" id="topics-panel">
          ${this.renderTopicsPanel(SNS.CURRICULUM[this.activeSubjectId])}
        </div>

      </div>
    `;

    // Wire subject buttons
    container.querySelectorAll('.subject-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeSubjectId = btn.dataset.subject;
        container.querySelectorAll('.subject-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('topics-panel').innerHTML = this.renderTopicsPanel(SNS.CURRICULUM[this.activeSubjectId]);
        this.wireTopics();
      });
    });

    this.wireTopics();
  },

  renderSubjectBtn(subject) {
    const scores = SNS.store.get('quizScores');
    let studiedCount = 0;
    subject.topics.forEach(t => {
      (t.subtopics || []).forEach(s => {
        if (scores[s.id]) studiedCount++;
      });
    });

    const totalSubs = subject.topics.reduce((n, t) => n + (t.subtopics || []).length, 0);

    return `
      <button class="subject-btn ${subject.id === this.activeSubjectId ? 'active' : ''}" data-subject="${subject.id}">
        <div class="subject-icon" style="background:rgba(0,0,0,0.2);color:var(${subject.colorVar})">
          <i class="fas ${subject.icon}"></i>
        </div>
        <div class="subject-info">
          <div class="subject-name">${SNS.utils.escapeHtml(subject.label)}</div>
          <div class="subject-grade">${SNS.utils.escapeHtml(subject.grade)}</div>
        </div>
        <span class="subject-count">${studiedCount}/${totalSubs}</span>
      </button>
    `;
  },

  renderTopicsPanel(subject) {
    if (!subject) return '<div class="empty-state"><p>Subject not found.</p></div>';
    const scores = SNS.store.get('quizScores');

    const topicsHtml = subject.topics.map((topic, ti) => {
      const subtopics = topic.subtopics || [];
      const studiedSubs = subtopics.filter(s => scores[s.id]).length;
      const pct = subtopics.length ? Math.round((studiedSubs / subtopics.length) * 100) : 0;

      const subtopicsHtml = subtopics.map(sub => {
        const quizData = scores[sub.id];
        const lastScore = quizData && quizData.length ? quizData[quizData.length - 1].score : null;
        const studied = !!quizData;

        return `
          <div class="subtopic-item ${studied ? 'studied' : ''}" data-subtopic="${sub.id}">
            <div class="subtopic-dot"></div>
            <span class="subtopic-name">${SNS.utils.escapeHtml(sub.title)}</span>
            <div class="subtopic-meta">
              ${lastScore != null ? `<span class="badge badge-${SNS.utils.getScoreColor(lastScore)}" style="font-size:10px">${lastScore}%</span>` : ''}
              <span class="subtopic-time"><i class="fas fa-clock"></i>${sub.estimatedMin || 20}m</span>
              <span class="difficulty ${sub.difficulty}" style="font-size:10px">${SNS.utils.capitalize(sub.difficulty || 'medium')}</span>
            </div>
          </div>
        `;
      }).join('') || '<div class="subtopic-item"><div class="subtopic-dot"></div><span class="subtopic-name text-muted">Coming soon...</span></div>';

      return `
        <div class="topic-item">
          <div class="topic-header" data-topic="${ti}">
            <div class="topic-expand-icon"><i class="fas fa-chevron-right"></i></div>
            <div class="topic-number">${ti + 1}</div>
            <div class="topic-text">
              <div class="topic-name">${SNS.utils.escapeHtml(topic.title)}</div>
              <div class="topic-subtopic-count">${subtopics.length} subtopics · ${studiedSubs} studied</div>
            </div>
            <div class="topic-progress">
              <div class="progress-bar-wrap" style="width:60px;height:4px">
                <div class="progress-bar-fill ${subject.colorVar === '--blue' ? 'blue' : subject.colorVar === '--green' ? 'green' : subject.colorVar === '--orange' ? 'orange' : subject.colorVar === '--purple' ? 'purple' : ''}" style="width:${pct}%"></div>
              </div>
              <span class="topic-progress-pct">${pct}%</span>
            </div>
          </div>
          <div class="subtopic-list" id="subtopic-list-${ti}">
            ${subtopicsHtml}
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="subject-hero">
        <div class="subject-hero-inner">
          <div class="subject-hero-icon" style="background:rgba(0,0,0,0.3);color:var(${subject.colorVar});font-size:28px">
            <i class="fas ${subject.icon}"></i>
          </div>
          <div class="subject-hero-info">
            <h2>${SNS.utils.escapeHtml(subject.label)}</h2>
            <div style="font-size:13px;color:var(--text-muted)">${SNS.utils.escapeHtml(subject.grade)}</div>
            <div class="subject-hero-stats">
              <span class="subject-hero-stat"><i class="fas fa-layer-group"></i>${subject.topics.length} topics</span>
              <span class="subject-hero-stat"><i class="fas fa-book-open"></i>${subject.topics.reduce((n,t)=>n+(t.subtopics||[]).length,0)} lessons</span>
            </div>
          </div>
        </div>
      </div>
      <div class="topic-list">
        ${topicsHtml || '<div class="empty-state" style="padding:30px;"><p>No topics available yet.</p></div>'}
      </div>
    `;
  },

  wireTopics() {
    // Topic accordion
    document.querySelectorAll('.topic-header').forEach((header, i) => {
      header.addEventListener('click', () => {
        const list = document.getElementById(`subtopic-list-${i}`);
        if (!list) return;
        const isOpen = list.classList.contains('open');
        // Close all
        document.querySelectorAll('.subtopic-list').forEach(l => l.classList.remove('open'));
        document.querySelectorAll('.topic-header').forEach(h => h.classList.remove('expanded'));
        // Toggle this one
        if (!isOpen) {
          list.classList.add('open');
          header.classList.add('expanded');
        }
      });
    });

    // Subtopic click → navigate to study
    document.querySelectorAll('.subtopic-item[data-subtopic]').forEach(item => {
      item.addEventListener('click', () => {
        const tid = item.dataset.subtopic;
        SNS.router.navigate('study', { topic: tid });
      });
    });
  }
};
