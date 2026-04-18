// Основной JavaScript для сайта Site of Sotik
console.log('Site of Sotik loaded');

// ===== Утилиты и вспомогательные функции =====
const Utils = {
  /**
   * Проверка, поддерживает ли браузер функцию
   * @param {string} feature - название функции
   * @returns {boolean}
   */
  hasFeature: function(feature) {
    return feature in window;
  },

  /**
   * Получение значения параметра URL
   * @param {string} param - название параметра
   * @returns {string|null}
   */
  getQueryParam: function(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  },

  /**
   * Форматирование даты
   * @param {Date} date - объект даты
   * @param {string} format - формат (YYYY-MM-DD или DD.MM.YYYY)
   * @returns {string}
   */
  formatDate: function(date, format = 'YYYY-MM-DD') {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    if (format === 'DD.MM.YYYY') {
      return `${day}.${month}.${year}`;
    }
    return `${year}-${month}-${day}`;
  },

  /**
   * Глубокое копирование объекта
   * @param {*} obj - объект для копирования
   * @returns {*}
   */
  deepClone: function(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => this.deepClone(item));
    if (obj instanceof Object) {
      const cloneObj = {};
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          cloneObj[key] = this.deepClone(obj[key]);
        }
      }
      return cloneObj;
    }
  },

  /**
   * Прерывистое выполнение функции
   * @param {function} func - функция
   * @param {number} wait - задержка в мс
   * @returns {function}
   */
  debounce: function(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Ограничение частоты вызовов функции
   * @param {function} func - функция
   * @param {number} limit - минимальный интервал в мс
   * @returns {function}
   */
  throttle: function(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  /**
   * Генерация уникального ID
   * @returns {string}
   */
  generateId: function() {
    return '_' + Math.random().toString(36).substr(2, 9);
  },

  /**
   * Проверка мобильного устройства
   * @returns {boolean}
   */
  isMobile: function() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },

  /**
   * Сохранение в localStorage с сериализацией
   * @param {string} key - ключ
   * @param {*} value - значение
   */
  saveToStorage: function(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage error:', e);
    }
  },

  /**
   * Получение из localStorage с десериализацией
   * @param {string} key - ключ
   * @returns {*}
   */
  getFromStorage: function(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Storage error:', e);
      return null;
    }
  }
};

// ===== DOM Манипуляции =====
const DOM = {
  /**
   * Выбор первого элемента по селектору
   * @param {string} selector - CSS селектор
   * @returns {Element|null}
   */
  select: function(selector) {
    return document.querySelector(selector);
  },

  /**
   * Выбор всех элементов по селектору
   * @param {string} selector - CSS селектор
   * @returns {NodeList}
   */
  selectAll: function(selector) {
    return document.querySelectorAll(selector);
  },

  /**
   * Создание элемента
   * @param {string} tag - тег элемента
   * @param {object} attributes - атрибуты
   * @param {string} content - содержимое
   * @returns {Element}
   */
  create: function(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);
    for (let key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        element.setAttribute(key, attributes[key]);
      }
    }
    if (content) element.textContent = content;
    return element;
  },

  /**
   * Добавление класса
   * @param {Element} element - элемент
   * @param {string} className - название класса
   */
  addClass: function(element, className) {
    if (element) element.classList.add(className);
  },

  /**
   * Удаление класса
   * @param {Element} element - элемент
   * @param {string} className - название класса
   */
  removeClass: function(element, className) {
    if (element) element.classList.remove(className);
  },

  /**
   * Проверка наличия класса
   * @param {Element} element - элемент
   * @param {string} className - название класса
   * @returns {boolean}
   */
  hasClass: function(element, className) {
    return element ? element.classList.contains(className) : false;
  },

  /**
   * Переключение класса
   * @param {Element} element - элемент
   * @param {string} className - название класса
   */
  toggleClass: function(element, className) {
    if (element) element.classList.toggle(className);
  },

  /**
   * Установка атрибутов
   * @param {Element} element - элемент
   * @param {object} attributes - атрибуты
   */
  setAttributes: function(element, attributes) {
    for (let key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        element.setAttribute(key, attributes[key]);
      }
    }
  },

  /**
   * Установка стилей
   * @param {Element} element - элемент
   * @param {object} styles - стили
   */
  setStyles: function(element, styles) {
    for (let key in styles) {
      if (styles.hasOwnProperty(key)) {
        element.style[key] = styles[key];
      }
    }
  },

  /**
   * Получение вычисленного стиля
   * @param {Element} element - элемент
   * @param {string} property - свойство стиля
   * @returns {string}
   */
  getStyle: function(element, property) {
    return window.getComputedStyle(element).getPropertyValue(property);
  },

  /**
   * Показание элемента
   * @param {Element} element - элемент
   */
  show: function(element) {
    if (element) element.style.display = '';
  },

  /**
   * Скрытие элемента
   * @param {Element} element - элемент
   */
  hide: function(element) {
    if (element) element.style.display = 'none';
  },

  /**
   * Удаление элемента из DOM
   * @param {Element} element - элемент
   */
  remove: function(element) {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  },

  /**
   * Очистка содержимого элемента
   * @param {Element} element - элемент
   */
  empty: function(element) {
    if (element) element.innerHTML = '';
  },

  /**
   * Получение текстового содержимого
   * @param {Element} element - элемент
   * @returns {string}
   */
  getText: function(element) {
    return element ? element.textContent : '';
  },

  /**
   * Установка текстового содержимого
   * @param {Element} element - элемент
   * @param {string} text - текст
   */
  setText: function(element, text) {
    if (element) element.textContent = text;
  },

  /**
   * Получение HTML содержимого
   * @param {Element} element - элемент
   * @returns {string}
   */
  getHtml: function(element) {
    return element ? element.innerHTML : '';
  },

  /**
   * Установка HTML содержимого
   * @param {Element} element - элемент
   * @param {string} html - HTML
   */
  setHtml: function(element, html) {
    if (element) element.innerHTML = html;
  },

  /**
   * Добавление дочернего элемента
   * @param {Element} parent - родитель
   * @param {Element} child - дочерний элемент
   */
  append: function(parent, child) {
    if (parent) parent.appendChild(child);
  },

  /**
   * Вставка элемента перед другим
   * @param {Element} newElement - новый элемент
   * @param {Element} referenceElement - элемент для сравнения
   */
  insertBefore: function(newElement, referenceElement) {
    if (referenceElement && referenceElement.parentNode) {
      referenceElement.parentNode.insertBefore(newElement, referenceElement);
    }
  },

  /**
   * Вставка элемента после другого
   * @param {Element} newElement - новый элемент
   * @param {Element} referenceElement - элемент для сравнения
   */
  insertAfter: function(newElement, referenceElement) {
    if (referenceElement && referenceElement.parentNode) {
      referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);
    }
  },

  /**
   * Проверка наличия элемента в DOM
   * @param {Element} element - элемент
   * @returns {boolean}
   */
  isInDOM: function(element) {
    return document.body.contains(element);
  }
};

// ===== События =====
const Events = {
  /**
   * Добавление обработчика события
   * @param {Element} element - элемент
   * @param {string} event - название события
   * @param {function} handler - функция-обработчик
   */
  on: function(element, event, handler) {
    if (element) element.addEventListener(event, handler);
  },

  /**
   * Удаление обработчика события
   * @param {Element} element - элемент
   * @param {string} event - название события
   * @param {function} handler - функция-обработчик
   */
  off: function(element, event, handler) {
    if (element) element.removeEventListener(event, handler);
  },

  /**
   * Одноразовое добавление события
   * @param {Element} element - элемент
   * @param {string} event - название события
   * @param {function} handler - функция-обработчик
   */
  once: function(element, event, handler) {
    const wrapper = (e) => {
      handler(e);
      this.off(element, event, wrapper);
    };
    this.on(element, event, wrapper);
  },

  /**
   * Добавление события на все элементы по селектору
   * @param {string} selector - CSS селектор
   * @param {string} event - название события
   * @param {function} handler - функция-обработчик
   */
  onAll: function(selector, event, handler) {
    DOM.selectAll(selector).forEach(element => {
      this.on(element, event, handler);
    });
  },

  /**
   * Запуск пользовательского события
   * @param {Element} element - элемент
   * @param {string} eventName - название события
   * @param {object} detail - дополнительные данные
   */
  trigger: function(element, eventName, detail = {}) {
    if (element) {
      const event = new CustomEvent(eventName, { detail });
      element.dispatchEvent(event);
    }
  },

  /**
   * Остановка распространения события
   * @param {Event} e - объект события
   */
  stopPropagation: function(e) {
    if (e) e.stopPropagation();
  },

  /**
   * Предотвращение поведения по умолчанию
   * @param {Event} e - объект события
   */
  preventDefault: function(e) {
    if (e) e.preventDefault();
  }
};

// ===== AJAX/Fetch =====
const HTTP = {
  /**
   * GET запрос
   * @param {string} url - URL
   * @returns {Promise}
   */
  get: function(url) {
    return fetch(url)
      .then(response => {
        if (!response.ok) throw new Error('Network error: ' + response.status);
        return response.json();
      })
      .catch(error => console.error('GET error:', error));
  },

  /**
   * POST запрос
   * @param {string} url - URL
   * @param {object} data - данные
   * @returns {Promise}
   */
  post: function(url, data) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) throw new Error('Network error: ' + response.status);
        return response.json();
      })
      .catch(error => console.error('POST error:', error));
  },

  /**
   * PUT запрос
   * @param {string} url - URL
   * @param {object} data - данные
   * @returns {Promise}
   */
  put: function(url, data) {
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) throw new Error('Network error: ' + response.status);
        return response.json();
      })
      .catch(error => console.error('PUT error:', error));
  },

  /**
   * DELETE запрос
   * @param {string} url - URL
   * @returns {Promise}
   */
  delete: function(url) {
    return fetch(url, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) throw new Error('Network error: ' + response.status);
        return response.json();
      })
      .catch(error => console.error('DELETE error:', error));
  }
};

// ===== Валидация формы =====
const Validator = {
  /**
   * Проверка Email
   * @param {string} email - email
   * @returns {boolean}
   */
  isEmail: function(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  /**
   * Проверка URL
   * @param {string} url - URL
   * @returns {boolean}
   */
  isUrl: function(url) {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  },

  /**
   * Проверка телефонного номера
   * @param {string} phone - номер телефона
   * @returns {boolean}
   */
  isPhone: function(phone) {
    const regex = /^[\d\s\-\+\(\)]{10,}$/;
    return regex.test(phone);
  },

  /**
   * Проверка пароля (минимум 6 символов)
   * @param {string} password - пароль
   * @returns {boolean}
   */
  isStrongPassword: function(password) {
    return password && password.length >= 6 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password);
  },

  /**
   * Проверка пустого поля
   * @param {string} value - значение
   * @returns {boolean}
   */
  isEmpty: function(value) {
    return value === null || value === undefined || value.toString().trim() === '';
  }
};

// ===== Анимации =====
const Animations = {
  /**
   * Плавное прокручивание до элемента
   * @param {Element} element - элемент или его селектор
   * @param {number} duration - продолжительность в мс
   */
  scrollToElement: function(element, duration = 1000) {
    if (typeof element === 'string') {
      element = DOM.select(element);
    }
    if (!element) return;

    const targetPosition = element.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let start = null;

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollBy(0, distance * progress - (distance * (start === currentTime ? 0 : 1)));

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  },

  /**
   * Постепенное появление элемента
   * @param {Element} element - элемент
   * @param {number} duration - продолжительность в мс
   */
  fadeIn: function(element, duration = 500) {
    if (!element) return;
    element.style.opacity = '0';
    element.style.display = '';
    let start = null;

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      element.style.opacity = progress;

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  },

  /**
   * Постепенное исчезновение элемента
   * @param {Element} element - элемент
   * @param {number} duration - продолжительность в мс
   */
  fadeOut: function(element, duration = 500) {
    if (!element) return;
    let start = null;

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      element.style.opacity = 1 - progress;

      if (progress < 1) {
        requestAnimationFrame(animation);
      } else {
        element.style.display = 'none';
      }
    };

    requestAnimationFrame(animation);
  },

  /**
   * Переход между двумя элементами
   * @param {Element} elementOut - элемент для исчезновения
   * @param {Element} elementIn - элемент для появления
   * @param {number} duration - продолжительность в мс
   */
  crossfade: function(elementOut, elementIn, duration = 500) {
    this.fadeOut(elementOut, duration);
    setTimeout(() => {
      this.fadeIn(elementIn, duration);
    }, duration);
  },

  /**
   * Слайдинг вверх
   * @param {Element} element - элемент
   * @param {number} duration - продолжительность в мс
   */
  slideUp: function(element, duration = 500) {
    if (!element) return;
    const height = element.offsetHeight;
    let start = null;

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      element.style.overflow = 'hidden';
      element.style.height = height * (1 - progress) + 'px';

      if (progress < 1) {
        requestAnimationFrame(animation);
      } else {
        element.style.display = 'none';
      }
    };

    requestAnimationFrame(animation);
  },

  /**
   * Слайдинг вниз
   * @param {Element} element - элемент
   * @param {number} duration - продолжительность в мс
   */
  slideDown: function(element, duration = 500) {
    if (!element) return;
    element.style.display = '';
    const height = element.scrollHeight;
    element.style.height = '0px';
    let start = null;

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      element.style.overflow = 'hidden';
      element.style.height = height * progress + 'px';

      if (progress < 1) {
        requestAnimationFrame(animation);
      } else {
        element.style.height = 'auto';
      }
    };

    requestAnimationFrame(animation);
  }
};

// ===== Модальные окна =====
const Modal = {
  /**
   * Открытие модального окна
   * @param {string} selector - селектор модального окна
   */
  open: function(selector) {
    const modal = DOM.select(selector);
    if (modal) {
      DOM.removeClass(modal, 'hidden');
      Animations.fadeIn(modal, 300);
    }
  },

  /**
   * Закрытие модального окна
   * @param {string} selector - селектор модального окна
   */
  close: function(selector) {
    const modal = DOM.select(selector);
    if (modal) {
      Animations.fadeOut(modal, 300);
      setTimeout(() => {
        DOM.addClass(modal, 'hidden');
      }, 300);
    }
  },

  /**
   * Инициализация модальных окон
   */
  init: function() {
    // Закрытие при клике на фон
    Events.onAll('[data-modal]', 'click', (e) => {
      if (e.target.matches('[data-modal]')) {
        this.close('[data-modal]');
      }
    });

    // Закрытие по кнопке
    Events.onAll('[data-modal-close]', 'click', (e) => {
      const modal = e.target.closest('[data-modal]');
      if (modal) this.close('[data-modal]');
    });
  }
};

// ===== Табуляция =====
const Tabs = {
  /**
   * Инициализация табов
   * @param {string} containerSelector - селектор контейнера табов
   */
  init: function(containerSelector) {
    const container = DOM.select(containerSelector);
    if (!container) return;

    Events.onAll(containerSelector + ' [data-tab]', 'click', (e) => {
      e.preventDefault();
      const button = e.target;
      const tabName = button.getAttribute('data-tab');
      const panes = container.querySelectorAll('[data-tab-pane]');
      const buttons = container.querySelectorAll('[data-tab]');

      buttons.forEach(btn => DOM.removeClass(btn, 'active'));
      panes.forEach(pane => DOM.addClass(pane, 'hidden'));

      DOM.addClass(button, 'active');
      const pane = DOM.select('[data-tab-pane="' + tabName + '"]');
      if (pane) DOM.removeClass(pane, 'hidden');
    });
  }
};

// ===== Аккордеон =====
const Accordion = {
  /**
   * Инициализация аккордеона
   * @param {string} containerSelector - селектор контейнера
   */
  init: function(containerSelector) {
    const container = DOM.select(containerSelector);
    if (!container) return;

    Events.onAll(containerSelector + ' [data-accordion-header]', 'click', (e) => {
      const header = e.target;
      const content = header.nextElementSibling;
      const isOpen = DOM.hasClass(content, 'show');

      container.querySelectorAll('[data-accordion-content]').forEach(el => {
        DOM.removeClass(el, 'show');
      });

      if (!isOpen && content) {
        DOM.addClass(content, 'show');
      }
    });
  }
};

// ===== Получение данных с API (пример) =====
const DataManager = {
  /**
   * Загрузка пользователя по ID
   * @param {number} userId - ID пользователя
   * @returns {Promise}
   */
  loadUser: function(userId) {
    return HTTP.get(`/api/users/${userId}`);
  },

  /**
   * Создание пользователя
   * @param {object} userData - данные пользователя
   * @returns {Promise}
   */
  createUser: function(userData) {
    return HTTP.post('/api/users', userData);
  },

  /**
   * Обновление пользователя
   * @param {number} userId - ID пользователя
   * @param {object} userData - новые данные
   * @returns {Promise}
   */
  updateUser: function(userId, userData) {
    return HTTP.put(`/api/users/${userId}`, userData);
  },

  /**
   * Удаление пользователя
   * @param {number} userId - ID пользователя
   * @returns {Promise}
   */
  deleteUser: function(userId) {
    return HTTP.delete(`/api/users/${userId}`);
  }
};

// ===== Инициализация страницы =====
function initHeader() {
  console.log('Initializing header...');
  const header = DOM.select('header');
  if (header) {
    DOM.addClass(header, 'fade-in');
  }
}

function initNavigation() {
  console.log('Initializing navigation...');
  const nav = DOM.select('nav');
  if (nav) {
    Events.onAll('nav a', 'click', (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        Animations.scrollToElement(href);
      }
    });
  }
}

function initButtons() {
  console.log('Initializing buttons...');
  Events.onAll('.button, .btn', 'click', function(e) {
    console.log('Button clicked:', e.target.textContent);
  });

  Events.onAll('.button, .btn', 'mouseenter', function(e) {
    this.style.transform = 'scale(1.05)';
  });

  Events.onAll('.button, .btn', 'mouseleave', function(e) {
    this.style.transform = 'scale(1)';
  });
}

function initScrollEffects() {
  console.log('Initializing scroll effects...');
  const handleScroll = Utils.throttle(() => {
    const scrollY = window.scrollY;
    const header = DOM.select('header');
    if (header) {
      if (scrollY > 50) {
        DOM.addClass(header, 'shadow');
      } else {
        DOM.removeClass(header, 'shadow');
      }
    }
  }, 100);

  Events.on(window, 'scroll', handleScroll);
}

function initFormHandling() {
  console.log('Initializing form handling...');
  Events.onAll('form', 'submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log('Form submitted:', data);
    
    // Валидация
    if (data.email && !Validator.isEmail(data.email)) {
      console.warn('Invalid email');
      return;
    }
  });
}

function initCards() {
  console.log('Initializing cards...');
  Events.onAll('.card', 'mouseenter', function() {
    this.style.boxShadow = '0 1rem 3rem rgba(0,0,0,0.175)';
  });

  Events.onAll('.card', 'mouseleave', function() {
    this.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
  });
}

function initSocialLinks() {
  console.log('Initializing social links...');
  Events.onAll('a[href*="facebook"], a[href*="twitter"], a[href*="instagram"]', 'click', (e) => {
    const href = e.target.getAttribute('href');
    if (href) {
      window.open(href, '_blank', 'width=600,height=400');
    }
  });
}

function initTheme() {
  console.log('Initializing theme...');
  const savedTheme = Utils.getFromStorage('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

function initPerformance() {
  console.log('Initializing performance monitoring...');
  if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
      }, 0);
    });
  }
}

function initAccessibility() {
  console.log('Initializing accessibility features...');
  Events.onAll('[data-tooltip]', 'mouseenter', function(e) {
    const tooltip = this.getAttribute('data-tooltip');
    this.setAttribute('title', tooltip);
  });
}

function initNotifications() {
  console.log('Initializing notifications...');
  window.showNotification = function(message, type = 'info') {
    const notification = DOM.create('div', {
      class: 'notification notification-' + type
    }, message);
    
    document.body.appendChild(notification);
    Animations.fadeIn(notification);
    
    setTimeout(() => {
      Animations.fadeOut(notification);
      setTimeout(() => DOM.remove(notification), 500);
    }, 3000);
  };
}

function initSliders() {
  console.log('Initializing sliders...');
  Events.onAll('[data-slider]', 'input', function(e) {
    const value = this.value;
    const max = this.max;
    const percentage = (value / max) * 100;
    this.style.background = `linear-gradient(to right, #007bff 0%, #007bff ${percentage}%, #ddd ${percentage}%, #ddd 100%)`;
  });
}

function initResponsive() {
  console.log('Initializing responsive features...');
  const handleResize = Utils.throttle(() => {
    const isMobile = Utils.isMobile();
    document.body.setAttribute('data-device', isMobile ? 'mobile' : 'desktop');
  }, 200);

  Events.on(window, 'resize', handleResize);
  handleResize();
}

// ===== Дополнительные утилиты для работы с localStorage =====
const Storage = {
  /**
   * Сохранение настроек пользователя
   * @param {string} key - ключ
   * @param {*} value - значение
   */
  setUserPreference: function(key, value) {
    Utils.saveToStorage('user_' + key, value);
  },

  /**
   * Получение настроек пользователя
   * @param {string} key - ключ
   * @returns {*}
   */
  getUserPreference: function(key) {
    return Utils.getFromStorage('user_' + key);
  },

  /**
   * Сохранение истории просмотров
   * @param {string} pageId - ID страницы
   */
  addPageView: function(pageId) {
    const views = Utils.getFromStorage('page_views') || [];
    views.push({
      pageId: pageId,
      timestamp: Date.now()
    });
    Utils.saveToStorage('page_views', views.slice(-100));
  },

  /**
   * Получение истории просмотров
   * @returns {array}
   */
  getPageViews: function() {
    return Utils.getFromStorage('page_views') || [];
  }
};

// ===== Трекинг анализов =====
const Analytics = {
  pageLoadTime: 0,
  interactionCount: 0,
  startTime: Date.now(),

  /**
   * Отслеживание взаимодействия пользователя
   */
  trackInteraction: function() {
    this.interactionCount++;
    if (this.interactionCount % 10 === 0) {
      console.log('Total interactions:', this.interactionCount);
    }
  },

  /**
   * Получение времени на странице
   * @returns {number} - в миллисекундах
   */
  getTimeOnPage: function() {
    return Date.now() - this.startTime;
  },

  /**
   * Инициализация трекинга
   */
  init: function() {
    document.addEventListener('click', () => this.trackInteraction());
    document.addEventListener('scroll', () => this.trackInteraction());
    document.addEventListener('keydown', () => this.trackInteraction());
  }
};

// ===== Поддержка браузера =====
const BrowserCompat = {
  /**
   * Проверка поддержки локального хранилища
   * @returns {boolean}
   */
  hasLocalStorage: function() {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  },

  /**
   * Проверка поддержки Service Workers
   * @returns {boolean}
   */
  hasServiceWorker: function() {
    return 'serviceWorker' in navigator;
  },

  /**
   * Проверка поддержки Web Notifications
   * @returns {boolean}
   */
  hasNotifications: function() {
    return 'Notification' in window;
  },

  /**
   * Получение информации о браузере
   * @returns {object}
   */
  getBrowserInfo: function() {
    const ua = navigator.userAgent;
    return {
      userAgent: ua,
      language: navigator.language,
      onLine: navigator.onLine,
      cores: navigator.hardwareConcurrency || 'unknown'
    };
  }
};

// ===== Управление историей браузера =====
const HistoryManager = {
  /**
   * Добавление записи в историю
   * @param {string} title - название
   * @param {string} url - URL
   */
  pushState: function(title, url) {
    history.pushState({ title: title }, title, url);
  },

  /**
   * Обработка события popstate
   */
  onPopState: function(callback) {
    window.addEventListener('popstate', callback);
  }
};

// ===== Главная функция инициализации =====
function init() {
  console.log('Site of Sotik initializing...');
  console.log('Device:', Utils.isMobile() ? 'Mobile' : 'Desktop');
  console.log('Browser:', BrowserCompat.getBrowserInfo());
  
  // Инициализация всех компонентов
  initTheme();
  initHeader();
  initNavigation();
  initButtons();
  initScrollEffects();
  initFormHandling();
  initCards();
  initSocialLinks();
  initPerformance();
  initAccessibility();
  initNotifications();
  initSliders();
  initResponsive();
  
  // Инициализация дополнительных функций
  Analytics.init();
  Storage.addPageView('home');
  
  console.log('Site of Sotik loaded and initialized successfully');
  console.log('Local storage available:', BrowserCompat.hasLocalStorage());
  console.log('Service Worker available:', BrowserCompat.hasServiceWorker());
}

// Вызов инициализации при загрузке страницы
document.addEventListener('DOMContentLoaded', init);