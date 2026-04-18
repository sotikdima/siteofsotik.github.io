const RacingApp = {
  state: {
    selectedClass: 'all',
    selectedEngine: 'all',
    cars: [],
    tournaments: [],
    leaderboard: [],
    toastTimeout: null,
  },

  selectors: {
    carGrid: '#car-grid',
    carClass: '#car-class',
    carEngine: '#car-engine',
    resetFilters: '#reset-filters',
    tournamentList: '#tournament-list',
    leaderboardBody: '#leaderboard-body',
    buildForm: '#build-form',
    buildSummary: '#build-summary',
    downforceValue: '#downforce-value',
    accelerationValue: '#acceleration-value',
    summaryEngine: '#summary-engine',
    summaryBody: '#summary-body',
    summaryDownforce: '#summary-downforce',
    summaryAcceleration: '#summary-acceleration',
    summaryPackages: '#summary-packages',
    summaryScore: '#summary-score',
    newsletterForm: '#newsletter-form',
    newsletterEmail: '#newsletter-email',
    toast: '#toast',
    speedNeedle: '#speed-needle',
    speedValue: '#speed-value',
    statCounters: '[data-counter]',
    navToggle: '.nav-toggle',
    mainNav: '.main-nav',
  },

  storageKey: 'speedzone-newsletter',

  init: function() {
    this.cacheDom();
    this.buildData();
    this.renderStats();
    this.renderCars();
    this.renderTournaments();
    this.renderLeaderboard();
    this.initFilters();
    this.initBuildForm();
    this.initNewsletter();
    this.initScrollCounters();
    this.initNavToggle();
    this.animateSpeedometer();
    this.initSmoothAnchors();
  },

  cacheDom: function() {
    this.dom = {};
    Object.keys(this.selectors).forEach(key => {
      this.dom[key] = document.querySelector(this.selectors[key]);
    });
  },

  buildData: function() {
    this.state.cars = [
      {
        name: 'Nitro Shadow',
        class: 'pro',
        engine: 'v8',
        topSpeed: 330,
        acceleration: 92,
        handling: 84,
        drift: 68,
        description: 'Высокоскоростной прототип для прямых секций и спринтов.',
        tags: ['pro', 'спринт', 'элита'],
      },
      {
        name: 'Urban Raptor',
        class: 'street',
        engine: 'v6',
        topSpeed: 282,
        acceleration: 78,
        handling: 86,
        drift: 72,
        description: 'Идеальный болид для уличных гонок и технических трасс.',
        tags: ['street', 'универсал', 'город'],
      },
      {
        name: 'Eclipse Volt',
        class: 'electric',
        engine: 'electric',
        topSpeed: 305,
        acceleration: 98,
        handling: 82,
        drift: 60,
        description: 'Молниеносный электрический болид для захватывающих заездов.',
        tags: ['electric', 'быстрый', 'модерн'],
      },
      {
        name: 'Drift Phantom',
        class: 'drift',
        engine: 'v6',
        topSpeed: 248,
        acceleration: 80,
        handling: 90,
        drift: 96,
        description: 'Легенда дрифта с идеальной баллистикой на поворотах.',
        tags: ['drift', 'контроль', 'повороты'],
      },
      {
        name: 'Interceptor',
        class: 'pro',
        engine: 'v8',
        topSpeed: 312,
        acceleration: 88,
        handling: 80,
        drift: 70,
        description: 'Баланс скорости и управляемости для профессионалов.',
        tags: ['pro', 'баланс', 'турбо'],
      },
      {
        name: 'Street Nova',
        class: 'street',
        engine: 'hybrid',
        topSpeed: 290,
        acceleration: 86,
        handling: 83,
        drift: 74,
        description: 'Стабильный городской болид с современным дизайном.',
        tags: ['street', 'гибрид', 'ночь'],
      },
    ];

    this.state.tournaments = [
      {
        name: 'Neon Circuit Clash',
        mode: 'Спринт',
        date: this.getFutureDate(2),
        duration: '28 минут',
        track: 'Neon City',
        prize: '7500 очков',
      },
      {
        name: 'Midnight Drift Show',
        mode: 'Дрифт',
        date: this.getFutureDate(5),
        duration: '42 минуты',
        track: 'Tunnel Drift',
        prize: '8400 очков',
      },
      {
        name: 'Hypercharge Rally',
        mode: 'Мультигонка',
        date: this.getFutureDate(9),
        duration: '55 минут',
        track: 'Thunder Loop',
        prize: '10200 очков',
      },
      {
        name: 'Elite Cup Sprint',
        mode: 'Про',
        date: this.getFutureDate(14),
        duration: '50 минут',
        track: 'Velocity Ring',
        prize: '15000 очков',
      },
    ];

    this.state.leaderboard = [
      { rank: 1, pilot: 'Racer_One', points: 14420, specialty: 'Спринт' },
      { rank: 2, pilot: 'DriftKing', points: 13670, specialty: 'Дрифт' },
      { rank: 3, pilot: 'ElectricFlash', points: 13200, specialty: 'Электро' },
      { rank: 4, pilot: 'NitroNinja', points: 12830, specialty: 'Про' },
      { rank: 5, pilot: 'StreetShadow', points: 12450, specialty: 'Улица' },
    ];
  },

  getFutureDate: function(daysAhead) {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    return date.toISOString();
  },

  renderStats: function() {
    const counters = document.querySelectorAll(this.selectors.statCounters);
    counters.forEach(counter => {
      const target = Number(counter.dataset.counter);
      let current = 0;
      const step = Math.max(1, Math.floor(target / 130));
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(interval);
        } else {
          counter.textContent = current;
        }
      }, 20);
    });
  },

  renderCars: function() {
    const grid = document.querySelector(this.selectors.carGrid);
    if (!grid) return;
    const filteredCars = this.state.cars.filter(car => {
      const classMatch = this.state.selectedClass === 'all' || car.class === this.state.selectedClass;
      const engineMatch = this.state.selectedEngine === 'all' || car.engine === this.state.selectedEngine;
      return classMatch && engineMatch;
    });

    const markup = filteredCars.map(car => {
      const score = this.calculatePerformanceScore(car);
      return `
        <article class="car-card card-glow" data-class="${car.class}" data-engine="${car.engine}">
          <div class="car-headline">
            <h3>${car.name}</h3>
            <span class="badge">${car.class.toUpperCase()}</span>
          </div>
          <p>${car.description}</p>
          <div class="car-specs">
            <div class="spec-line"><span>Топ-скорость</span><strong>${car.topSpeed} км/ч</strong></div>
            <div class="spec-line"><span>Ускорение</span><strong>${car.acceleration}</strong></div>
            <div class="spec-line"><span>Управляемость</span><strong>${car.handling}</strong></div>
            <div class="spec-line"><span>Дрифт</span><strong>${car.drift}</strong></div>
          </div>
          <div class="car-chart"><span style="width: ${Math.min(100, score)}%"></span></div>
          <div class="car-stats">
            <div class="car-stat">Рейтинг: <strong>${score}</strong></div>
            <div class="car-stat">Двигатель: <strong>${car.engine.toUpperCase()}</strong></div>
          </div>
        </article>
      `;
    }).join('');

    grid.innerHTML = markup || '<p class="empty-state">Нет машин по выбранным фильтрам. Сбросьте фильтр или выберите другой класс.</p>';
  },

  calculatePerformanceScore: function(car) {
    return Math.round((car.topSpeed * 0.3) + (car.acceleration * 0.35) + (car.handling * 0.2) + (car.drift * 0.15));
  },

  renderTournaments: function() {
    const container = document.querySelector(this.selectors.tournamentList);
    if (!container) return;

    const markup = this.state.tournaments.map(tournament => {
      const eventTime = new Date(tournament.date);
      const formattedDate = eventTime.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'short',
      });
      return `
        <article class="tournament-card card-glow">
          <div class="tournament-meta">
            <span class="tournament-label">${tournament.mode}</span>
            <span>${formattedDate}</span>
          </div>
          <h3>${tournament.name}</h3>
          <p class="tournament-description">Трасса ${tournament.track}. ${tournament.duration} — за счет драйверов, нитро и стратегий.</p>
          <div class="tournament-countdown" data-event-date="${tournament.date}"></div>
          <div class="tournament-footer">
            <span>${tournament.prize}</span>
            <button class="button button-secondary" data-action="join-event">Участвовать</button>
          </div>
        </article>
      `;
    }).join('');

    container.innerHTML = markup;
    this.initCountdowns();
  },

  renderLeaderboard: function() {
    const body = document.querySelector(this.selectors.leaderboardBody);
    if (!body) return;

    body.innerHTML = this.state.leaderboard.map(item => `
      <tr>
        <td>${item.rank}</td>
        <td>${item.pilot}</td>
        <td>${item.points}</td>
        <td>${item.specialty}</td>
      </tr>
    `).join('');
  },

  initFilters: function() {
    const classSelect = document.querySelector(this.selectors.carClass);
    const engineSelect = document.querySelector(this.selectors.carEngine);
    const resetBtn = document.querySelector(this.selectors.resetFilters);

    classSelect?.addEventListener('change', event => {
      this.state.selectedClass = event.target.value;
      this.renderCars();
    });

    engineSelect?.addEventListener('change', event => {
      this.state.selectedEngine = event.target.value;
      this.renderCars();
    });

    resetBtn?.addEventListener('click', () => {
      this.state.selectedClass = 'all';
      this.state.selectedEngine = 'all';
      if (classSelect) classSelect.value = 'all';
      if (engineSelect) engineSelect.value = 'all';
      this.renderCars();
      this.showToast('Фильтры сброшены', 'info');
    });
  },

  initBuildForm: function() {
    const form = document.querySelector(this.selectors.buildForm);
    const downforce = document.querySelector('#downforce');
    const acceleration = document.querySelector('#acceleration');
    const packages = Array.from(document.querySelectorAll('[name="packages"]'));

    const updateSummary = () => {
      const engine = document.querySelector('#engine-type')?.value || 'V6';
      const body = document.querySelector('#body-style')?.value || 'Аэродинамический';
      const downValue = downforce?.value || 60;
      const accValue = acceleration?.value || 75;
      const selectedPackages = packages.filter(input => input.checked).map(input => input.value).join(', ') || 'нет';
      const score = this.calculateBuildScore(engine, downValue, accValue, selectedPackages);

      document.querySelector(this.selectors.downforceValue).textContent = downValue;
      document.querySelector(this.selectors.accelerationValue).textContent = accValue;
      document.querySelector(this.selectors.summaryEngine).textContent = engine.toUpperCase();
      document.querySelector(this.selectors.summaryBody).textContent = body;
      document.querySelector(this.selectors.summaryDownforce).textContent = downValue;
      document.querySelector(this.selectors.summaryAcceleration).textContent = accValue;
      document.querySelector(this.selectors.summaryPackages).textContent = selectedPackages;
      document.querySelector(this.selectors.summaryScore).textContent = score;
    };

    downforce?.addEventListener('input', updateSummary);
    acceleration?.addEventListener('input', updateSummary);
    packages.forEach(input => input.addEventListener('change', updateSummary));
    document.querySelector('#engine-type')?.addEventListener('change', updateSummary);
    document.querySelector('#body-style')?.addEventListener('change', updateSummary);

    form?.addEventListener('submit', event => {
      event.preventDefault();
      updateSummary();
      const engine = document.querySelector('#engine-type')?.value;
      const body = document.querySelector('#body-style')?.value;
      const packageNames = packages.filter(input => input.checked).map(input => input.value);
      const payload = {
        engine,
        body,
        downforce: downforce?.value,
        acceleration: acceleration?.value,
        packages: packageNames,
        builtAt: new Date().toISOString(),
      };
      window.localStorage.setItem('speedzone-build', JSON.stringify(payload));
      this.showToast('Билд сохранен в гараже', 'success');
    });

    updateSummary();
  },

  calculateBuildScore: function(engine, downforce, acceleration, packages) {
    const engineBonus = engine === 'v8' ? 35 : engine === 'electric' ? 40 : engine === 'hybrid' ? 32 : 28;
    const packageBonus = packages.length * 6;
    return Math.round(Number(downforce) * 0.55 + Number(acceleration) * 0.45 + engineBonus + packageBonus);
  },

  initNewsletter: function() {
    const form = document.querySelector(this.selectors.newsletterForm);
    const emailInput = document.querySelector(this.selectors.newsletterEmail);

    form?.addEventListener('submit', event => {
      event.preventDefault();
      const email = emailInput?.value.trim();
      if (!this.isValidEmail(email)) {
        this.showToast('Введите корректный email', 'error');
        return;
      }
      window.localStorage.setItem(this.storageKey, email);
      this.showToast('Подписка оформлена. Смотри трассы первыми!', 'success');
      if (emailInput) emailInput.value = '';
    });

    const existingEmail = window.localStorage.getItem(this.storageKey);
    if (existingEmail && emailInput) {
      emailInput.placeholder = 'Подписано: ' + existingEmail;
    }
  },

  isValidEmail: function(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  initCountdowns: function() {
    const countdownWrappers = document.querySelectorAll('.tournament-countdown');
    countdownWrappers.forEach(wrapper => {
      const eventDate = new Date(wrapper.dataset.eventDate);
      this.updateCountdown(wrapper, eventDate);
      setInterval(() => this.updateCountdown(wrapper, eventDate), 1000);
    });
  },

  updateCountdown: function(wrapper, eventDate) {
    const now = new Date();
    const diff = eventDate - now;
    if (diff <= 0) {
      wrapper.innerHTML = '<p class="countdown-ended">Гонка уже началась!</p>';
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    wrapper.innerHTML = `
      <div class="countdown-item"><strong>${days}</strong><span>дн</span></div>
      <div class="countdown-item"><strong>${hours}</strong><span>ч</span></div>
      <div class="countdown-item"><strong>${minutes}</strong><span>мин</span></div>
      <div class="countdown-item"><strong>${seconds}</strong><span>сек</span></div>
    `;
  },

  initScrollCounters: function() {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const counters = entry.target.querySelectorAll('[data-counter]');
        counters.forEach(counter => {
          const target = Number(counter.dataset.counter);
          let current = 0;
          const step = Math.max(1, Math.floor(target / 120));
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              counter.textContent = target;
              clearInterval(interval);
            } else {
              counter.textContent = current;
            }
          }, 25);
        });
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('#stats');
    if (statsSection) observer.observe(statsSection);
  },

  animateSpeedometer: function() {
    const needle = document.querySelector(this.selectors.speedNeedle);
    const value = document.querySelector(this.selectors.speedValue);
    if (!needle || !value) return;

    let angle = -90;
    const maxAngle = 90;
    const speedMax = 320;
    const animate = () => {
      if (angle >= maxAngle) return;
      angle += 2.7;
      needle.style.transform = `rotate(${angle}deg)`;
      const currentSpeed = Math.min(speedMax, Math.round(((angle + 90) / 180) * speedMax));
      value.textContent = currentSpeed;
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
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

  initSmoothAnchors: function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', event => {
        event.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  },

  showToast: function(message, status = 'info') {
    const toast = document.querySelector(this.selectors.toast);
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    toast.style.borderColor = status === 'error' ? 'rgba(255, 59, 59, 0.45)' : status === 'success' ? 'rgba(0, 216, 255, 0.45)' : 'rgba(255, 255, 255, 0.12)';
    clearTimeout(this.state.toastTimeout);
    this.state.toastTimeout = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 3200);
  },
};

window.addEventListener('DOMContentLoaded', () => RacingApp.init());
