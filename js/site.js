const SiteSotika = {
  selectors: {
    navToggle: '.nav-toggle',
    mainNav: '.main-nav',
    toast: '#toast',
    gameList: '#game-list',
    suggestionForm: '#suggestion-form',
    suggestionName: '#suggestion-name',
    suggestionReason: '#suggestion-reason',
  },

  games: [
    {
      title: 'Forza Motorsport',
      tagline: 'Реалистичный гоночный симулятор с профессиональной физикой.',
      description: 'Трассы мирового уровня, точные настройки и режимы карьеры.',
      url: '/games/forza-motorsport/index.html',
    },
    {
      title: 'Forza Motorsport 7',
      tagline: 'Коллекция автомобилей, сетевые турниры и легендарные трассы.',
      description: 'Подробные советы по шинам, аэродинамике и сборке болидов.',
      url: '/games/forza-motorsport-7/index.html',
    },
  ],

  init: function() {
    this.initNavToggle();
    this.initActiveLink();
    this.renderGameList();
    this.initSuggestionForm();
  },

  initNavToggle: function() {
    const toggle = document.querySelector(this.selectors.navToggle);
    const nav = document.querySelector(this.selectors.mainNav);
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('is-open');
    });
  },

  initActiveLink: function() {
    const links = document.querySelectorAll('.main-nav a');
    const current = window.location.pathname.replace(/\/$/, '');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const normalized = href.replace(/\/$/, '');
      if (normalized === current) {
        link.classList.add('active-link');
      }
    });
  },

  renderGameList: function() {
    const container = document.querySelector(this.selectors.gameList);
    if (!container) return;
    container.innerHTML = this.games.map(game => `
      <article class="game-card card-glow">
        <div class="game-label">${game.title}</div>
        <h3>${game.tagline}</h3>
        <p>${game.description}</p>
        <a class="button button-secondary" href="${game.url}">Открыть раздел</a>
      </article>
    `).join('');
  },

  initSuggestionForm: function() {
    const form = document.querySelector(this.selectors.suggestionForm);
    if (!form) return;

    form.addEventListener('submit', event => {
      event.preventDefault();
      const nameInput = document.querySelector(this.selectors.suggestionName);
      const reasonInput = document.querySelector(this.selectors.suggestionReason);
      const name = nameInput?.value.trim();
      const reason = reasonInput?.value.trim();
      if (!name) {
        this.showToast('Введите название игры', 'error');
        return;
      }
      const suggestions = this.loadSuggestions();
      suggestions.push({ title: name, reason, addedAt: new Date().toISOString() });
      window.localStorage.setItem('siteSotikaGameSuggestions', JSON.stringify(suggestions));
      this.showToast('Предложение отправлено. Спасибо!', 'success');
      form.reset();
    });
  },

  loadSuggestions: function() {
    try {
      const raw = window.localStorage.getItem('siteSotikaGameSuggestions');
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      return [];
    }
  },

  showToast: function(message, type = 'info') {
    const toast = document.querySelector(this.selectors.toast);
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    toast.style.borderColor = type === 'error' ? 'rgba(255, 93, 45, 0.45)' : 'rgba(0, 132, 255, 0.45)';
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 3200);
  },
};

window.addEventListener('DOMContentLoaded', () => SiteSotika.init());
