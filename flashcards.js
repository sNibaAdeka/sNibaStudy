/* ═══════════════════════════════════════════
   sNibaStudy — Flashcard Engine
   ═══════════════════════════════════════════ */

window.SNS = window.SNS || {};

SNS.flashcards = (function () {

  let deck = [];
  let currentIndex = 0;
  let flipped = false;
  let container = null;
  let topicId = null;
  let onProgressUpdate = null;

  function load(cards, tid) {
    deck = cards.map((c, i) => ({
      ...c,
      id: c.id || `${tid}-fc-${i}`,
      known: false
    }));
    topicId = tid;

    // Merge with saved progress
    const saved = SNS.store.get('flashcardDecks')[tid];
    if (saved) {
      saved.forEach(s => {
        const card = deck.find(c => c.front === s.front);
        if (card) card.known = s.known;
      });
    }

    currentIndex = 0;
    flipped = false;
  }

  function renderCard(cont) {
    container = cont;
    if (!deck.length) {
      cont.innerHTML = '<div class="empty-state"><p>No flashcards available for this topic.</p></div>';
      return;
    }

    const card = deck[currentIndex];
    const knownCount = deck.filter(c => c.known).length;

    cont.innerHTML = `
      <div class="flashcard-counter">
        <span>${currentIndex + 1} / ${deck.length}</span>
        <span class="text-green">${knownCount} known</span>
      </div>

      <div class="flashcard-area">
        <div class="flashcard flip-container ${flipped ? 'flipped' : ''}" id="flashcard-flip" title="Click to flip">
          <div class="flip-inner">
            <div class="flip-front flashcard-front">
              <div class="flashcard-hint">TERM</div>
              <div class="flashcard-content">${SNS.utils.escapeHtml(card.front)}</div>
            </div>
            <div class="flip-back flashcard-back">
              <div class="flashcard-hint">ANSWER</div>
              <div class="flashcard-content">${SNS.utils.escapeHtml(card.back)}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="flashcard-nav">
        <button class="btn btn-secondary btn-sm" id="fc-prev" ${currentIndex === 0 ? 'disabled' : ''}>
          <i class="fas fa-arrow-left"></i> Prev
        </button>

        <div class="flashcard-actions">
          <button class="btn btn-sm ${card.known ? 'btn-ghost' : 'btn-blue'}" id="fc-mark-hard">
            <i class="fas fa-times"></i> Hard
          </button>
          <button class="btn btn-sm ${card.known ? 'btn-primary' : 'btn-ghost'}" id="fc-mark-known">
            <i class="fas fa-check"></i> Known
          </button>
        </div>

        <button class="btn btn-secondary btn-sm" id="fc-next" ${currentIndex === deck.length - 1 ? 'disabled' : ''}>
          Next <i class="fas fa-arrow-right"></i>
        </button>
      </div>

      <div style="margin-top: 12px;">
        <div class="progress-bar-wrap">
          <div class="progress-bar-fill" style="width: ${(knownCount/deck.length)*100}%"></div>
        </div>
      </div>
    `;

    document.getElementById('flashcard-flip')?.addEventListener('click', flip);
    document.getElementById('fc-prev')?.addEventListener('click', prev);
    document.getElementById('fc-next')?.addEventListener('click', next);
    document.getElementById('fc-mark-known')?.addEventListener('click', markKnown);
    document.getElementById('fc-mark-hard')?.addEventListener('click', markHard);
  }

  function flip() {
    flipped = !flipped;
    const el = document.getElementById('flashcard-flip');
    if (el) el.classList.toggle('flipped', flipped);
  }

  function next() {
    if (currentIndex < deck.length - 1) {
      currentIndex++;
      flipped = false;
      if (container) renderCard(container);
    }
  }

  function prev() {
    if (currentIndex > 0) {
      currentIndex--;
      flipped = false;
      if (container) renderCard(container);
    }
  }

  function markKnown() {
    deck[currentIndex].known = true;
    saveProgress();
    SNS.utils.toast('Marked as known!', 'success', 1500);
    if (container) renderCard(container);
    if (onProgressUpdate) onProgressUpdate(getProgress());
  }

  function markHard() {
    deck[currentIndex].known = false;
    saveProgress();
    SNS.utils.toast('Added to review list.', 'info', 1500);
    if (container) renderCard(container);
    if (onProgressUpdate) onProgressUpdate(getProgress());
  }

  function saveProgress() {
    if (!topicId) return;
    SNS.store.update('flashcardDecks', decks => ({
      ...decks,
      [topicId]: deck.map(c => ({ front: c.front, back: c.back, known: c.known }))
    }));
  }

  function getProgress() {
    const known = deck.filter(c => c.known).length;
    return { known, total: deck.length, pct: deck.length ? Math.round((known / deck.length) * 100) : 0 };
  }

  function reset() {
    deck.forEach(c => c.known = false);
    currentIndex = 0;
    flipped = false;
    saveProgress();
    if (container) renderCard(container);
  }

  function onProgress(fn) {
    onProgressUpdate = fn;
  }

  return { load, renderCard, flip, next, prev, markKnown, markHard, getProgress, reset, onProgress };

})();
