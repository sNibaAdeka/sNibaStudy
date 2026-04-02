/* ═══════════════════════════════════════════
   sNibaStudy — Utility Functions
   ═══════════════════════════════════════════ */

window.SNS = window.SNS || {};

SNS.utils = (function () {

  let toastTimer = null;

  function toast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('global-toast');
    if (!container) return;

    const iconMap = { info: 'fa-circle-info', success: 'fa-circle-check', error: 'fa-circle-xmark', warning: 'fa-triangle-exclamation' };
    const icon = iconMap[type] || iconMap.info;

    container.innerHTML = `
      <div class="toast ${type}" role="alert">
        <i class="fas ${icon}" aria-hidden="true"></i>
        <span>${escapeHtml(message)}</span>
      </div>
    `;

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      container.innerHTML = '';
    }, duration);
  }

  function debounce(fn, ms) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  function throttle(fn, ms) {
    let last = 0;
    return function (...args) {
      const now = Date.now();
      if (now - last >= ms) {
        last = now;
        fn.apply(this, args);
      }
    };
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function formatMinutes(minutes) {
    if (minutes < 60) return `${minutes}m`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }

  function animateCount(el, target, duration = 800) {
    if (!el) return;
    const start = parseInt(el.textContent) || 0;
    const range = target - start;
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(start + range * eased);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
    el.classList.add('count-animated');
    setTimeout(() => el.classList.remove('count-animated'), duration + 100);
  }

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function timeAgo(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1)  return 'just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffH = Math.floor(diffMin / 60);
    if (diffH < 24) return `${diffH}h ago`;
    const diffD = Math.floor(diffH / 24);
    if (diffD < 7) return `${diffD}d ago`;
    return formatDate(dateStr);
  }

  function escapeHtml(str) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return String(str).replace(/[&<>"']/g, m => map[m]);
  }

  function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function capitalize(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
  }

  function getScoreColor(score) {
    if (score >= 80) return 'high';
    if (score >= 50) return 'medium';
    return 'low';
  }

  function scoreToGrade(score) {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    return 'F';
  }

  // Observe elements with .animate-on-scroll and trigger .visible
  function initScrollReveal(container) {
    if (!('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    (container || document).querySelectorAll('.animate-on-scroll').forEach(el => obs.observe(el));
  }

  return {
    toast,
    debounce,
    throttle,
    formatTime,
    formatMinutes,
    animateCount,
    generateId,
    today,
    formatDate,
    timeAgo,
    escapeHtml,
    clamp,
    lerp,
    randomInt,
    shuffle,
    capitalize,
    getScoreColor,
    scoreToGrade,
    initScrollReveal
  };

})();
