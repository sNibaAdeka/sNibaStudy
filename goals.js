/* ═══════════════════════════════════════════
   sNibaStudy — Daily Goals Module
   ═══════════════════════════════════════════ */

window.SNS = window.SNS || {};

SNS.goals = (function () {

  function getToday() {
    return SNS.utils.today();
  }

  function getGoals() {
    const all = SNS.store.get('dailyGoals');
    // Keep today's goals + last 3 days for history
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 3);
    return all.filter(g => g.date >= cutoff.toISOString().slice(0, 10));
  }

  function getTodaysGoals() {
    return getGoals().filter(g => g.date === getToday());
  }

  function add(text) {
    if (!text || !text.trim()) return null;
    const goal = {
      id: SNS.utils.generateId(),
      text: text.trim().slice(0, 120),
      done: false,
      date: getToday(),
      createdAt: new Date().toISOString()
    };
    SNS.store.update('dailyGoals', goals => [goal, ...goals].slice(0, 200));
    return goal;
  }

  function toggle(id) {
    SNS.store.update('dailyGoals', goals =>
      goals.map(g => g.id === id ? { ...g, done: !g.done } : g)
    );
  }

  function remove(id) {
    SNS.store.update('dailyGoals', goals => goals.filter(g => g.id !== id));
  }

  function getStats() {
    const todays = getTodaysGoals();
    const done = todays.filter(g => g.done).length;
    const total = todays.length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    return { done, total, pct };
  }

  function renderGoalsList(container, { onToggle, onDelete } = {}) {
    const goals = getTodaysGoals();

    if (!goals.length) {
      container.innerHTML = `
        <div class="empty-state" style="padding:24px;">
          <div style="font-size:24px;margin-bottom:8px;">🎯</div>
          <div style="font-size:13px;color:var(--text-muted);">No goals yet. Add your first goal above!</div>
        </div>
      `;
      return;
    }

    container.innerHTML = goals.map(g => `
      <div class="goal-item ${g.done ? 'done' : ''}" data-id="${g.id}">
        <div class="goal-checkbox ${g.done ? 'checked' : ''}" data-toggle="${g.id}">
          ${g.done ? '<i class="fas fa-check"></i>' : ''}
        </div>
        <span class="goal-text">${SNS.utils.escapeHtml(g.text)}</span>
        <button class="goal-delete" data-delete="${g.id}" aria-label="Delete goal">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `).join('');

    container.querySelectorAll('[data-toggle]').forEach(el => {
      el.addEventListener('click', () => {
        toggle(el.dataset.toggle);
        if (onToggle) onToggle();
        renderGoalsList(container, { onToggle, onDelete });
      });
    });

    container.querySelectorAll('[data-delete]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        remove(el.dataset.delete);
        if (onDelete) onDelete();
        renderGoalsList(container, { onToggle, onDelete });
      });
    });
  }

  return { add, toggle, remove, getStats, getTodaysGoals, renderGoalsList };

})();
