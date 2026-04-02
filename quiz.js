/* ═══════════════════════════════════════════
   sNibaStudy — Quiz Engine
   ═══════════════════════════════════════════ */

window.SNS = window.SNS || {};

SNS.quiz = (function () {

  let questions = [];
  let currentQ = 0;
  let answers = [];
  let container = null;
  let topicId = null;
  let onComplete = null;

  function load(qs, tid) {
    questions = SNS.utils.shuffle([...qs]);
    topicId = tid;
    currentQ = 0;
    answers = [];
  }

  function render(cont, onDone) {
    container = cont;
    onComplete = onDone || null;
    if (!questions.length) {
      cont.innerHTML = '<div class="empty-state"><p>No quiz questions for this topic yet.</p></div>';
      return;
    }
    renderQuestion();
  }

  function renderQuestion() {
    if (currentQ >= questions.length) {
      renderResults();
      return;
    }

    const q = questions[currentQ];
    const letters = ['A', 'B', 'C', 'D'];
    const optionsHtml = q.options.map((opt, i) => `
      <button class="quiz-option" data-index="${i}">
        <span class="quiz-option-letter">${letters[i]}</span>
        <span>${SNS.utils.escapeHtml(opt)}</span>
      </button>
    `).join('');

    const progress = ((currentQ) / questions.length) * 100;

    container.innerHTML = `
      <div class="quiz-progress">
        <div class="progress-bar-wrap">
          <div class="progress-bar-fill" style="width: ${progress}%"></div>
        </div>
        <span class="quiz-progress-label">${currentQ + 1}/${questions.length}</span>
      </div>

      <div class="quiz-question-number">Question ${currentQ + 1}</div>
      <div class="quiz-question-text">${SNS.utils.escapeHtml(q.q)}</div>

      <div class="quiz-options" id="quiz-options">
        ${optionsHtml}
      </div>

      <div id="quiz-feedback" style="display:none"></div>
      <div id="quiz-next-wrap" style="display:none">
        <button class="btn btn-primary" id="quiz-next-btn">
          ${currentQ < questions.length - 1 ? 'Next Question <i class="fas fa-arrow-right"></i>' : 'See Results <i class="fas fa-chart-bar"></i>'}
        </button>
      </div>
    `;

    container.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => selectAnswer(parseInt(btn.dataset.index)));
    });
  }

  function selectAnswer(selectedIndex) {
    const q = questions[currentQ];
    const isCorrect = selectedIndex === q.correct;
    answers.push({ questionIndex: currentQ, selected: selectedIndex, correct: q.correct, isCorrect });

    // Disable all options
    container.querySelectorAll('.quiz-option').forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.correct) btn.classList.add('correct');
      if (i === selectedIndex && !isCorrect) btn.classList.add('wrong');
      if (i === selectedIndex && isCorrect) btn.classList.add('selected');
    });

    // Show feedback
    const feedbackEl = document.getElementById('quiz-feedback');
    if (feedbackEl) {
      feedbackEl.style.display = 'block';
      feedbackEl.className = `quiz-feedback ${isCorrect ? 'correct' : 'wrong'}`;
      feedbackEl.innerHTML = isCorrect
        ? `<i class="fas fa-circle-check"></i> Correct! ${SNS.utils.escapeHtml(q.explanation || 'Well done!')}`
        : `<i class="fas fa-circle-xmark"></i> Not quite. ${SNS.utils.escapeHtml(q.explanation || `The correct answer is: ${q.options[q.correct]}`)}`;
    }

    // Update weak areas
    if (!isCorrect && topicId) {
      SNS.store.update('weakAreas', areas => {
        const existing = areas[topicId] || { failCount: 0, lastAttempt: '' };
        return {
          ...areas,
          [topicId]: {
            failCount: existing.failCount + 1,
            lastAttempt: SNS.utils.today()
          }
        };
      });
    }

    const nextWrap = document.getElementById('quiz-next-wrap');
    if (nextWrap) nextWrap.style.display = 'block';

    document.getElementById('quiz-next-btn')?.addEventListener('click', () => {
      currentQ++;
      renderQuestion();
    });
  }

  function renderResults() {
    const correct = answers.filter(a => a.isCorrect).length;
    const total = questions.length;
    const score = Math.round((correct / total) * 100);
    const grade = SNS.utils.scoreToGrade(score);
    const scoreClass = SNS.utils.getScoreColor(score);

    // Save quiz score
    if (topicId) {
      SNS.store.update('quizScores', scores => ({
        ...scores,
        [topicId]: [
          ...(scores[topicId] || []),
          { score, date: SNS.utils.today(), correct, total }
        ].slice(-20)
      }));

      // Award XP
      SNS.store.addXP(score);
    }

    const wrongOnes = answers.filter(a => !a.isCorrect).map(a => ({
      q: questions[a.questionIndex].q,
      yourAnswer: questions[a.questionIndex].options[a.selected],
      correctAnswer: questions[a.questionIndex].options[a.correct]
    }));

    const wrongHtml = wrongOnes.length ? `
      <div style="text-align:left; margin-top:20px; padding-top:20px; border-top:1px solid var(--border);">
        <div class="section-title" style="margin-bottom:10px;"><i class="fas fa-exclamation-circle text-red"></i> Review Mistakes</div>
        ${wrongOnes.map(w => `
          <div style="padding:10px;background:var(--bg-surface);border-radius:var(--radius-xs);margin-bottom:8px;font-size:13px;">
            <div style="color:var(--text-primary);font-weight:600;margin-bottom:4px;">${SNS.utils.escapeHtml(w.q)}</div>
            <div style="color:var(--red);">✗ ${SNS.utils.escapeHtml(w.yourAnswer || 'Not answered')}</div>
            <div style="color:var(--green);">✓ ${SNS.utils.escapeHtml(w.correctAnswer)}</div>
          </div>
        `).join('')}
      </div>
    ` : '';

    container.innerHTML = `
      <div class="quiz-score-card">
        <div class="quiz-score-big ${scoreClass === 'high' ? 'text-green' : scoreClass === 'medium' ? 'text-yellow' : 'text-red'}">${score}%</div>
        <div class="quiz-score-label">${correct} / ${total} correct · Grade: ${grade}</div>
        <div style="margin-top:20px;display:flex;gap:10px;justify-content:center;">
          <button class="btn btn-primary" id="quiz-retry-btn">
            <i class="fas fa-rotate-right"></i> Try Again
          </button>
          <button class="btn btn-secondary" id="quiz-close-btn">
            <i class="fas fa-bookmark"></i> Save & Close
          </button>
        </div>
        ${wrongHtml}
      </div>
    `;

    document.getElementById('quiz-retry-btn')?.addEventListener('click', () => {
      currentQ = 0;
      answers = [];
      questions = SNS.utils.shuffle([...questions]);
      renderQuestion();
    });

    document.getElementById('quiz-close-btn')?.addEventListener('click', () => {
      if (onComplete) onComplete(score);
    });

    if (onComplete) onComplete(score);
    SNS.utils.toast(`Quiz complete! Score: ${score}% (${grade})`, score >= 70 ? 'success' : 'info');
  }

  function getLastScore() {
    if (!topicId) return null;
    const scores = SNS.store.get('quizScores')[topicId];
    return scores && scores.length ? scores[scores.length - 1] : null;
  }

  return { load, render, getLastScore };

})();
