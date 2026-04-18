// Скрипты для страницы доната Site of Sotik

// ===== Конфигурация =====
const DonateConfig = {
  minAmount: 1,
  maxAmount: 1000000,
  currency: 'RUB',
  apiEndpoint: '/api/donations',
  notificationDuration: 5000,
  historyLimit: 50
};

console.log('Donate page loaded');

// ===== Утилиты =====
const DonateUtils = {
  /**
   * Форматирование денежной суммы
   * @param {number} amount - сумма
   * @param {string} currency - валюта (RUB, USD, EUR)
   * @returns {string}
   */
  formatMoney: function(amount, currency = DonateConfig.currency) {
    const symbols = {
      'RUB': '₽',
      'USD': '$',
      'EUR': '€'
    };
    const symbol = symbols[currency] || currency;
    return amount.toLocaleString('ru-RU') + ' ' + symbol;
  },

  /**
   * Валидация суммы доната
   * @param {number} amount - сумма
   * @returns {boolean}
   */
  validateAmount: function(amount) {
    return !isNaN(amount) && amount >= DonateConfig.minAmount && amount <= DonateConfig.maxAmount;
  },

  /**
   * Получение текущей даты и времени
   * @returns {string}
   */
  getCurrentDateTime: function() {
    const now = new Date();
    return now.toLocaleString('ru-RU');
  },

  /**
   * Генерация уникального ID доната
   * @returns {string}
   */
  generateDonationId: function() {
    return 'DONATE_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  },

  /**
   * Сохранение истории донатов
   * @param {object} donation - информация о донате
   */
  saveDonationHistory: function(donation) {
    const history = JSON.parse(localStorage.getItem('donationHistory') || '[]');
    history.push({
      ...donation,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('donationHistory', JSON.stringify(history.slice(-DonateConfig.historyLimit)));
  },

  /**
   * Получение истории донатов
   * @returns {array}
   */
  getDonationHistory: function() {
    return JSON.parse(localStorage.getItem('donationHistory') || '[]');
  },

  /**
   * Очистка истории донатов
   */
  clearDonationHistory: function() {
    localStorage.removeItem('donationHistory');
  },

  /**
   * Расчет суммы всех донатов
   * @returns {number}
   */
  getTotalDonations: function() {
    const history = this.getDonationHistory();
    return history.reduce((sum, donation) => sum + (parseFloat(donation.amount) || 0), 0);
  },

  /**
   * Получение среднего размера доната
   * @returns {number}
   */
  getAverageDonation: function() {
    const history = this.getDonationHistory();
    if (history.length === 0) return 0;
    return this.getTotalDonations() / history.length;
  },

  /**
   * Получение максимального доната
   * @returns {number}
   */
  getMaxDonation: function() {
    const history = this.getDonationHistory();
    if (history.length === 0) return 0;
    return Math.max(...history.map(d => parseFloat(d.amount) || 0));
  }
};

// ===== Способы оплаты =====
const PaymentMethods = {
  /**
   * Доступные методы оплаты
   */
  methods: [
    {
      id: 'yandex',
      name: 'Яндекс.Касса',
      icon: '💳',
      description: 'Оплата через Яндекс.Касса',
      fee: 2.9
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: '🌐',
      description: 'Оплата через PayPal',
      fee: 3.4
    },
    {
      id: 'crypto',
      name: 'Криптовалюта',
      icon: '₿',
      description: 'Оплата криптовалютой',
      fee: 0
    },
    {
      id: 'card',
      name: 'Банковская карта',
      icon: '💳',
      description: 'Оплата банковской картой',
      fee: 2.5
    },
    {
      id: 'transfer',
      name: 'Денежный перевод',
      icon: '💰',
      description: 'Денежный перевод',
      fee: 1.5
    }
  ],

  /**
   * Получение метода по ID
   * @param {string} methodId - ID метода
   * @returns {object|null}
   */
  getMethod: function(methodId) {
    return this.methods.find(m => m.id === methodId) || null;
  },

  /**
   * Все ли методы доступны
   * @returns {boolean}
   */
  areAllAvailable: function() {
    return this.methods.length > 0;
  },

  /**
   * Получение комиссии метода
   * @param {string} methodId - ID метода
   * @returns {number}
   */
  getFee: function(methodId) {
    const method = this.getMethod(methodId);
    return method ? method.fee : 0;
  }
};

// ===== Управление суммами доната =====
const DonationAmounts = {
  presets: [10, 50, 100, 500, 1000],

  /**
   * Получение предустановок
   * @returns {array}
   */
  getPresets: function() {
    return this.presets;
  },

  /**
   * Добавление своей суммы
   * @param {number} amount - сумма
   * @returns {boolean}
   */
  addCustomAmount: function(amount) {
    if (DonateUtils.validateAmount(amount)) {
      if (!this.presets.includes(amount)) {
        this.presets.push(amount);
        this.presets.sort((a, b) => a - b);
      }
      return true;
    }
    return false;
  },

  /**
   * Удаление суммы из предустановок
   * @param {number} amount - сумма
   */
  removeAmount: function(amount) {
    const index = this.presets.indexOf(amount);
    if (index > -1 && this.presets.length > 1) {
      this.presets.splice(index, 1);
    }
  }
};

// ===== Форма доната =====
const DonationForm = {
  /**
   * Инициализация формы доната
   */
  init: function() {
    console.log('Initializing donation form...');
    
    const form = document.querySelector('form[data-donate-form]');
    if (!form) return;

    // Добавление кнопок для предустановленных сумм
    this.initPresetAmounts();

    // Обработка отправки формы
    form.addEventListener('submit', (e) => {
      this.handleSubmit(e);
    });

    // Валидация в реальном времени
    const amountInput = form.querySelector('input[name="amount"]');
    if (amountInput) {
      amountInput.addEventListener('input', (e) => {
        this.validateAmount(e.target.value);
      });
    }
  },

  /**
   * Инициализация кнопок предустановок
   */
  initPresetAmounts: function() {
    const container = document.querySelector('[data-amount-presets]');
    if (!container) return;

    container.innerHTML = '';
    DonationAmounts.getPresets().forEach(amount => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'amount-btn';
      button.textContent = DonateUtils.formatMoney(amount);
      button.setAttribute('data-amount', amount);

      button.addEventListener('click', (e) => {
        e.preventDefault();
        const amountInput = document.querySelector('input[name="amount"]');
        if (amountInput) {
          amountInput.value = amount;
          document.querySelectorAll('.amount-btn').forEach(btn => {
            btn.classList.remove('active');
          });
          button.classList.add('active');
        }
      });

      container.appendChild(button);
    });
  },

  /**
   * Валидация суммы
   * @param {string} value - значение
   */
  validateAmount: function(value) {
    const amount = parseFloat(value);
    const errorContainer = document.querySelector('[data-amount-error]');
    
    if (!DonateUtils.validateAmount(amount)) {
      if (errorContainer) {
        errorContainer.textContent = `Сумма должна быть от ${DonateConfig.minAmount} до ${DonateConfig.maxAmount}`;
        errorContainer.style.display = 'block';
      }
      return false;
    } else {
      if (errorContainer) {
        errorContainer.style.display = 'none';
      }
      return true;
    }
  },

  /**
   * Обработка отправки формы
   * @param {Event} e - событие
   */
  handleSubmit: function(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    if (!this.validateAmount(data.amount)) {
      console.warn('Invalid amount');
      return;
    }

    // Создание объекта доната
    const donation = {
      id: DonateUtils.generateDonationId(),
      amount: parseFloat(data.amount),
      method: data.method || 'yandex',
      name: data.name || 'Анонимный',
      email: data.email || '',
      message: data.message || '',
      timestamp: DonateUtils.getCurrentDateTime()
    };

    // Сохранение в историю
    DonateUtils.saveDonationHistory(donation);

    // Показ подтверждения
    this.showConfirmation(donation);

    // Очистка формы
    form.reset();
  },

  /**
   * Показ подтверждения доната
   * @param {object} donation - информация о донате
   */
  showConfirmation: function(donation) {
    const confirmationDiv = document.querySelector('[data-donation-confirmation]') || 
                           document.createElement('div');
    
    confirmationDiv.className = 'donation-confirmation';
    confirmationDiv.innerHTML = `
      <div class="confirmation-content">
        <h3>✓ Спасибо за доната!</h3>
        <p>Сумма: ${DonateUtils.formatMoney(donation.amount)}</p>
        <p>ID доната: ${donation.id}</p>
        <p>Время: ${donation.timestamp}</p>
        <button class="btn btn-close">Закрыть</button>
      </div>
    `;

    if (!document.querySelector('[data-donation-confirmation]')) {
      document.body.appendChild(confirmationDiv);
    }

    confirmationDiv.style.display = 'flex';
    
    confirmationDiv.querySelector('.btn-close').addEventListener('click', () => {
      confirmationDiv.style.display = 'none';
    });

    setTimeout(() => {
      confirmationDiv.style.display = 'none';
    }, DonateConfig.notificationDuration);
  }
};

// ===== Статистика =====
const DonationStats = {
  /**
   * Инициализация статистики
   */
  init: function() {
    console.log('Initializing donation statistics...');
    this.updateStats();
    
    // Обновление каждую минуту
    setInterval(() => this.updateStats(), 60000);
  },

  /**
   * Обновление статистики на странице
   */
  updateStats: function() {
    const totalDonations = DonateUtils.getTotalDonations();
    const donationCount = DonateUtils.getDonationHistory().length;
    const avgDonation = DonateUtils.getAverageDonation();
    const maxDonation = DonateUtils.getMaxDonation();
    
    const totalElement = document.querySelector('[data-total-donations]');
    const countElement = document.querySelector('[data-donation-count]');
    const avgElement = document.querySelector('[data-avg-donation]');
    const maxElement = document.querySelector('[data-max-donation]');
    const historyElement = document.querySelector('[data-donation-history]');

    if (totalElement) {
      totalElement.textContent = DonateUtils.formatMoney(totalDonations);
    }

    if (countElement) {
      countElement.textContent = donationCount;
    }

    if (avgElement) {
      avgElement.textContent = DonateUtils.formatMoney(avgDonation);
    }

    if (maxElement) {
      maxElement.textContent = DonateUtils.formatMoney(maxDonation);
    }

    if (historyElement) {
      this.renderHistory(historyElement);
    }
  },

  /**
   * Отображение истории донатов
   * @param {Element} container - контейнер для истории
   */
  renderHistory: function(container) {
    const history = DonateUtils.getDonationHistory();
    container.innerHTML = '';

    if (history.length === 0) {
      container.innerHTML = '<p class="no-donations">Нет донатов</p>';
      return;
    }

    const list = document.createElement('ul');
    list.className = 'donation-history-list';

    history.slice().reverse().slice(0, 10).forEach(donation => {
      const li = document.createElement('li');
      li.className = 'donation-item';
      const method = PaymentMethods.getMethod(donation.method);
      li.innerHTML = `
        <div class="donation-info">
          <span class="donor-name">${donation.name}</span>
          <span class="donation-amount">${DonateUtils.formatMoney(donation.amount)}</span>
        </div>
        <div class="donation-meta">
          <span class="donation-time">${new Date(donation.timestamp).toLocaleTimeString('ru-RU')}</span>
          <span class="donation-method">${method?.name || donation.method}</span>
        </div>
        ${donation.message ? `<div class="donation-message">"${donation.message}"</div>` : ''}
      `;
      list.appendChild(li);
    });

    container.appendChild(list);
  }
};

// ===== Интеграция dalink =====
const DalinkIntegration = {
  /**
   * Открытие ссылки dalink с параметрами
   * @param {object} params - параметры
   */
  openDalink: function(params = {}) {
    const baseUrl = 'https://dalink.to/cynepmactep';
    const url = new URL(baseUrl);

    if (params.amount) url.searchParams.append('amount', params.amount);
    if (params.name) url.searchParams.append('name', params.name);
    if (params.message) url.searchParams.append('message', params.message);

    window.location.href = url.toString();
  },

  /**
   * Обработка кнопки dalink
   */
  initDalinkButton: function() {
    const button = document.querySelector('[data-dalink-button]');
    if (button) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const amount = document.querySelector('input[name="amount"]')?.value;
        const name = document.querySelector('input[name="name"]')?.value;
        const message = document.querySelector('textarea[name="message"]')?.value;

        this.openDalink({
          amount: amount,
          name: name,
          message: message
        });
      });
    }
  }
};

// ===== Фильтрация способов оплаты =====
const PaymentMethodFilter = {
  /**
   * Инициализация фильтра
   */
  init: function() {
    console.log('Initializing payment method filter...');
    this.renderMethods();
    
    document.addEventListener('change', (e) => {
      if (e.target.matches('input[name="method"]')) {
        this.onMethodChange(e.target.value);
      }
    });
  },

  /**
   * Отображение способов оплаты
   */
  renderMethods: function() {
    const container = document.querySelector('[data-payment-methods]');
    if (!container) return;

    container.innerHTML = '';
    PaymentMethods.methods.forEach(method => {
      const label = document.createElement('label');
      label.className = 'payment-method-label';
      label.innerHTML = `
        <input type="radio" name="method" value="${method.id}" ${method.id === 'yandex' ? 'checked' : ''}>
        <span class="method-icon">${method.icon}</span>
        <span class="method-name">${method.name}</span>
        <span class="method-description">${method.description}</span>
      `;
      container.appendChild(label);
    });
  },

  /**
   * Обработка смены способа оплаты
   * @param {string} methodId - ID способа
   */
  onMethodChange: function(methodId) {
    console.log('Payment method changed to:', methodId);
    const method = PaymentMethods.getMethod(methodId);
    const descriptionElement = document.querySelector('[data-method-description]');
    
    if (method && descriptionElement) {
      descriptionElement.textContent = method.description + (method.fee > 0 ? ` (комиссия ${method.fee}%)` : '');
    }
  }
};

// ===== Анимации =====
const DonateAnimations = {
  /**
   * Анимация увеличения счетчика
   * @param {Element} element - элемент
   * @param {number} finalValue - финальное значение
   * @param {number} duration - продолжительность в мс
   */
  animateCounter: function(element, finalValue, duration = 2000) {
    let current = 0;
    const step = finalValue / (duration / 16);
    
    const animate = () => {
      current += step;
      if (current >= finalValue) {
        current = finalValue;
      }
      element.textContent = Math.floor(current);
      
      if (current < finalValue) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  },

  /**
   * Пульс анимация для важных элементов
   * @param {Element} element - элемент
   */
  pulse: function(element) {
    if (!element) return;
    element.style.animation = 'pulse 1.5s ease-in-out infinite';
  },

  /**
   * Анимация "полета" элемента
   * @param {Element} element - элемент
   * @param {object} target - целевые координаты
   */
  fly: function(element, target = { x: 0, y: -100 }) {
    if (!element) return;
    
    const start = element.getBoundingClientRect();
    const keyframes = [
      { transform: 'translate(0, 0)', opacity: 1 },
      { transform: `translate(${target.x}px, ${target.y}px)`, opacity: 0 }
    ];
    
    element.animate(keyframes, {
      duration: 1000,
      easing: 'ease-out'
    });
  }
};

// ===== Нотификации доната =====
const DonateNotifications = {
  /**
   * Показ нотификации о новом донате
   * @param {object} donation - информация о донате
   */
  show: function(donation) {
    const notification = document.createElement('div');
    notification.className = 'donation-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-donor">${donation.name}</span> 
        пожертвовал(а) 
        <span class="notification-amount">${DonateUtils.formatMoney(donation.amount)}</span>
      </div>
    `;

    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);

    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, DonateConfig.notificationDuration);
  }
};

// ===== Экспорт статистики =====
const DonateExport = {
  /**
   * Экспорт истории в CSV
   */
  exportToCSV: function() {
    const history = DonateUtils.getDonationHistory();
    let csv = 'Имя,Сумма,Способ оплаты,Сообщение,Время\n';

    history.forEach(donation => {
      const row = [
        donation.name,
        donation.amount,
        donation.method,
        `"${donation.message}"`,
        donation.timestamp
      ].join(',');
      csv += row + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'donation_history.csv';
    link.click();
  },

  /**
   * Экспорт в JSON
   */
  exportToJSON: function() {
    const history = DonateUtils.getDonationHistory();
    const json = JSON.stringify(history, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'donation_history.json';
    link.click();
  }
};

// ===== Клавиатурные скоросты =====
const DonateKeyboardShortcuts = {
  /**
   * Инициализация сокращений
   */
  init: function() {
    document.addEventListener('keydown', (e) => {
      // Alt + D - фокус на сумму доната
      if (e.altKey && e.key === 'd') {
        e.preventDefault();
        const amountInput = document.querySelector('input[name="amount"]');
        if (amountInput) amountInput.focus();
      }

      // Enter - отправка формы
      if (e.key === 'Enter' && e.ctrlKey) {
        const form = document.querySelector('form[data-donate-form]');
        if (form) form.dispatchEvent(new Event('submit'));
      }
    });
  }
};

// ===== Главная инициализация =====
function initDonate() {
  console.log('Initializing donate page...');
  console.log('Current time:', DonateUtils.getCurrentDateTime());
  
  DonationForm.init();
  DonationStats.init();
  DalinkIntegration.initDalinkButton();
  PaymentMethodFilter.init();
  DonateKeyboardShortcuts.init();
  
  console.log('Donate page initialized successfully');
}

// Вызов инициализации при загрузке страницы
document.addEventListener('DOMContentLoaded', initDonate);
// ===== Расширенный логирование и отладка =====
const DonateLogger = {
  logs: [],
  maxLogs: 100,
  
  log: function(type, message, data = null) {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, type, message, data };
    this.logs.push(logEntry);
    if (this.logs.length > this.maxLogs) this.logs.shift();
    console.log(\[\] \\, data || '');
  },
  
  getLogs: function() { return [...this.logs]; },
  clearLogs: function() { this.logs = []; }
};

// ===== Расширенная аналитика =====
const DonateAnalytics = {
  pageViews: 0,
  formInteractions: 0,
  donationAttempts: 0,
  successfulDonations: 0,
  
  trackPageView: function() {
    this.pageViews++;
    DonateLogger.log('ANALYTICS', 'Page viewed', { views: this.pageViews });
  },
  
  trackFormInteraction: function(field) {
    this.formInteractions++;
    DonateLogger.log('FORM', \Field \ interacted\, { total: this.formInteractions });
  },
  
  trackDonationAttempt: function() {
    this.donationAttempts++;
    DonateLogger.log('DONATION', 'Donation attempt', { total: this.donationAttempts });
  },
  
  trackSuccessfulDonation: function(amount) {
    this.successfulDonations++;
    DonateLogger.log('SUCCESS', 'Donation successful', { amount, total: this.successfulDonations });
  },
  
  getStats: function() {
    return {
      pageViews: this.pageViews,
      formInteractions: this.formInteractions,
      donationAttempts: this.donationAttempts,
      successfulDonations: this.successfulDonations,
      successRate: this.donationAttempts > 0 ? ((this.successfulDonations / this.donationAttempts) * 100).toFixed(2) + '%' : '0%'
    };
  }
};

// ===== Кэширование данных =====
const DonateCache = {
  cache: {},
  ttl: {},
  
  set: function(key, value, ttlSeconds = 300) {
    this.cache[key] = value;
    this.ttl[key] = Date.now() + (ttlSeconds * 1000);
  },
  
  get: function(key) {
    if (!this.cache[key]) return null;
    const now = Date.now();
    if (now > this.ttl[key]) {
      delete this.cache[key];
      delete this.ttl[key];
      return null;
    }
    return this.cache[key];
  },
  
  remove: function(key) {
    delete this.cache[key];
    delete this.ttl[key];
  },
  
  clear: function() {
    this.cache = {};
    this.ttl = {};
  }
};

// ===== Управление уведомлениями =====
const NotificationManager = {
  notifications: [],
  
  show: function(message, type = 'info', duration = 3000) {
    const notification = {
      id: DonateUtils.generateId(),
      message,
      type,
      createdAt: new Date(),
      dismissed: false
    };
    
    this.notifications.push(notification);
    DonateLogger.log('NOTIFICATION', \\ notification shown\, { message });
    
    if (duration > 0) {
      setTimeout(() => {
        this.dismiss(notification.id);
      }, duration);
    }
    
    return notification.id;
  },
  
  dismiss: function(id) {
    const index = this.notifications.findIndex(n => n.id === id);
    if (index > -1) {
      this.notifications[index].dismissed = true;
      this.notifications.splice(index, 1);
    }
  },
  
  getActive: function() {
    return this.notifications.filter(n => !n.dismissed);
  }
};

// ===== Управление состоянием приложения =====
const AppState = {
  state: {
    currentUser: null,
    totalDonated: 0,
    lastDonation: null,
    isProcessing: false,
    preferences: {}
  },
  
  listeners: [],
  
  setState: function(newState) {
    this.state = { ...this.state, ...newState };
    this.notifyListeners();
    DonateLogger.log('STATE', 'State updated', newState);
  },
  
  getState: function() {
    return { ...this.state };
  },
  
  subscribe: function(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  },
  
  notifyListeners: function() {
    this.listeners.forEach(listener => listener(this.state));
  }
};

// ===== Валидация сложных форм =====
const AdvancedValidator = {
  validateCardNumber: function(number) {
    const cleanNumber = number.replace(/\s/g, '');
    if (!/^\d{13,19}\$/.test(cleanNumber)) return false;
    
    let sum = 0;
    let isEven = false;
    
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber[i], 10);
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  },
  
  validateExpiryDate: function(expiryDate) {
    const [month, year] = expiryDate.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    if (!month || !year) return false;
    
    const expMonth = parseInt(month, 10);
    const expYear = parseInt(year, 10);
    
    if (expMonth < 1 || expMonth > 12) return false;
    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;
    
    return true;
  },
  
  validateCVC: function(cvc) {
    return /^\d{3,4}\$/.test(cvc);
  }
};

// ===== Обработка ошибок =====
const ErrorHandler = {
  errors: [],
  maxErrors: 50,
  
  addError: function(error, context = {}) {
    const errorRecord = {
      message: error.message || error,
      stack: error.stack || null,
      timestamp: new Date(),
      context
    };
    
    this.errors.push(errorRecord);
    if (this.errors.length > this.maxErrors) this.errors.shift();
    
    DonateLogger.log('ERROR', error.message || error, context);
  },
  
  getLastError: function() {
    return this.errors[this.errors.length - 1] || null;
  },
  
  getAllErrors: function() {
    return [...this.errors];
  },
  
  clearErrors: function() {
    this.errors = [];
  }
};

// ===== Менеджер конфигурации =====
const ConfigManager = {
  config: { ...DonateConfig },
  
  update: function(newConfig) {
    this.config = { ...this.config, ...newConfig };
    DonateLogger.log('CONFIG', 'Configuration updated', newConfig);
  },
  
  get: function(key) {
    return key ? this.config[key] : this.config;
  },
  
  set: function(key, value) {
    this.config[key] = value;
  },
  
  reset: function() {
    this.config = { ...DonateConfig };
  }
};

// ===== Расширенные анимации =====
const AdvancedAnimations = {
  animateCounter: function(element, targetValue, duration = 2000) {
    const startValue = 0;
    const startTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
      
      element.textContent = DonateUtils.formatMoney(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  },
  
  animateProgressBar: function(element, targetPercent, duration = 1500) {
    const startPercent = 0;
    const startTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const currentPercent = Math.floor(startPercent + (targetPercent - startPercent) * progress);
      
      element.style.width = currentPercent + '%';
      element.textContent = currentPercent + '%';
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }
};

// ===== Инициализация с глобальными обработчиками ошибок =====
window.addEventListener('error', (event) => {
  ErrorHandler.addError(event.error, { type: 'uncaughtError' });
});

window.addEventListener('unhandledrejection', (event) => {
  ErrorHandler.addError(event.reason, { type: 'unhandledRejection' });
});

DonateAnalytics.trackPageView();
AppState.setState({
  totalDonated: DonateUtils.getTotalDonations(),
  lastDonation: DonateUtils.getLastDonation()
});

// ===== Дополнительные утилиты для работы с временем =====
const TimeUtils = {
  formatTime: function(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return \\:\:\\;
  },
  
  getTimeElapsed: function(startTime, endTime) {
    const diff = endTime - startTime;
    return Math.floor(diff / 1000);
  },
  
  sleep: function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};

// ===== Работа с DOM элементами (расширение) =====
const DOMUtils = {
  createElement: function(tag, className = '', innerHTML = '') {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (innerHTML) el.innerHTML = innerHTML;
    return el;
  },
  
  removeElement: function(element) {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  },
  
  hasClass: function(element, className) {
    return element.classList.contains(className);
  }
};

// ===== Вспомогательные функции локального хранилища =====
const StorageUtils = {
  setItem: function(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      DonateLogger.log('ERROR', 'Failed to set localStorage item', { key, error: e.message });
      return false;
    }
  },
  
  getItem: function(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      DonateLogger.log('ERROR', 'Failed to get localStorage item', { key, error: e.message });
      return null;
    }
  },
  
  removeItem: function(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      DonateLogger.log('ERROR', 'Failed to remove localStorage item', { key });
      return false;
    }
  }
};

// ===== Инициализация при загрузке =====
document.addEventListener('DOMContentLoaded', function() {
  initDonate();
  DonateLogger.log('SYSTEM', 'Page fully loaded and initialized');
});
