/* ═══════════════════════════════════════════
   sNibaStudy — Hash-based SPA Router
   ═══════════════════════════════════════════ */

window.SNS = window.SNS || {};

SNS.router = (function () {

  const routes = {};
  let currentRoute = null;
  let beforeNavigate = null;

  function register(hash, config) {
    routes[hash] = config;
  }

  function navigate(hash, params = {}) {
    if (beforeNavigate && typeof beforeNavigate === 'function') {
      beforeNavigate(currentRoute, hash);
    }
    const url = params && Object.keys(params).length
      ? `#${hash}?${new URLSearchParams(params).toString()}`
      : `#${hash}`;
    window.location.hash = url.replace('#', '');
  }

  function parseHash() {
    const full = window.location.hash.replace('#', '');
    const [hash, queryStr] = full.split('?');
    const params = {};
    if (queryStr) {
      queryStr.split('&').forEach(pair => {
        const [k, v] = pair.split('=');
        if (k) params[decodeURIComponent(k)] = decodeURIComponent(v || '');
      });
    }
    return { hash: hash || 'dashboard', params };
  }

  function render(hash, params) {
    const route = routes[hash];
    if (!route) {
      navigate('dashboard');
      return;
    }

    // Update sidebar active states
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.route === hash);
    });

    // Update header title
    const titleEl = document.getElementById('page-title');
    if (titleEl) titleEl.textContent = route.title || hash;

    const subtitleEl = document.getElementById('page-subtitle');
    if (subtitleEl) subtitleEl.textContent = route.subtitle || '';

    // Render into container
    const container = document.getElementById('page-container');
    if (!container) return;

    container.innerHTML = '';
    container.classList.add('page-enter');

    try {
      route.render(container, params);
    } catch (e) {
      console.error(`[SNS.router] Error rendering "${hash}":`, e);
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon"><i class="fas fa-triangle-exclamation"></i></div>
          <h3>Page Error</h3>
          <p>${SNS.utils.escapeHtml(e.message)}</p>
        </div>
      `;
    }

    requestAnimationFrame(() => container.classList.remove('page-enter'));
    currentRoute = hash;
    document.title = `${route.title} — sNibaStudy`;
  }

  function handleHashChange() {
    const { hash, params } = parseHash();
    render(hash, params);
  }

  function init() {
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
  }

  function getCurrent() {
    return currentRoute;
  }

  function onBeforeNavigate(fn) {
    beforeNavigate = fn;
  }

  return {
    register,
    navigate,
    init,
    getCurrent,
    onBeforeNavigate,
    parseHash
  };

})();
