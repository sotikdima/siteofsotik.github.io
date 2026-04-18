# СайтСотика - Полная документация архитектуры

## 📋 Описание проекта

**СайтСотика** — многостраничный гоночный игровой портал на GitHub Pages для игр **Forza Motorsport** и **Forza Motorsport 7** с архитектурой, готовой к расширению новыми играми.

**Основной принцип**: Каждая игра — отдельная папка с 6 полнофункциональными страницами (index, cars, tracks, guides, community, builds).

---

## 📁 Полная структура проекта

```
siteofsotik.github.io/
│
├── index.html                          # Главная страница сайта
├── css/
│   └── style.css                      # Глобальные стили (2000+ строк)
├── js/
│   └── site.js                        # Основной JavaScript (1000+ строк)
│
├── games/
│   ├── index.html                     # 📄 КАТАЛОГ ИГРА (страница 1)
│   │
│   ├── forza-motorsport/              # 📁 Папка Forza Motorsport
│   │   ├── index.html                 # 🎮 Главная страница игры
│   │   ├── cars.html                  # 🚗 Машины и характеристики
│   │   ├── tracks.html                # 🏁 Треки и стратегии
│   │   ├── guides.html                # 📖 Гайды и руководства
│   │   ├── community.html             # 👥 Сообщество и турниры
│   │   └── builds.html                # 🔧 Готовые сборки
│   │
│   └── forza-motorsport-7/            # 📁 Папка Forza Motorsport 7
│       ├── index.html                 # 🎮 Главная страница игры
│       ├── cars.html                  # 🚗 Машины (700+)
│       ├── tracks.html                # 🏁 Треки (32+)
│       ├── guides.html                # 📖 Гайды
│       ├── community.html             # 👥 Сообщество
│       └── builds.html                # 🔧 Сборки
│
└── DOCUMENTATION.md                   # 📚 Этот файл

```

---

## 🌐 Навигация сайта (ПРАВИЛЬНО)

### Главное меню (должно содержать ТОЛЬКО)
```html
<nav class="main-nav">
  <ul>
    <li><a href="/index.html">Главная</a></li>
    <li><a href="/games/index.html">Игры</a></li>
  </ul>
</nav>
```

**ВАЖНО**: Ссылки на Forza Motorsport и Forza Motorsport 7 — НЕ В МЕНЮ, а только в каталоге игр на странице `/games/index.html`.

---

## 📄 Полные шаблоны всех страниц

### 1. ГЛАВНАЯ СТРАНИЦА САЙТА (`/index.html`)

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>СайтСотика - портал гоночных игр</title>
  <meta name="description" content="СайтСотика - официальный портал Forza Motorsport и Forza Motorsport 7." />
  <link rel="stylesheet" href="/css/style.css" />
</head>
<body>
  <div class="page-shell">
    <header class="site-header">
      <div class="header-inner container">
        <a class="brand" href="/index.html">СайтСотика</a>
        <button class="nav-toggle" aria-label="Меню">
          <span></span><span></span><span></span>
        </button>
        <nav class="main-nav">
          <ul>
            <li><a href="/index.html">Главная</a></li>
            <li><a href="/games/index.html">Игры</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <main>
      <section class="hero-section">
        <div class="container">
          <h1>СайтСотика - мир гоночных игр и турниров</h1>
          <p>Портал для фанатов Forza с гайдами, сборками и сообществом</p>
          <a href="/games/index.html" class="button button-primary">Перейти в игры</a>
        </div>
      </section>

      <section class="intro-section container">
        <div class="intro-grid">
          <article class="intro-card card-glow">
            <h3>🎮 Forza Motorsport</h3>
            <p>Реалистичный гоночный симулятор с профессиональной физикой</p>
          </article>
          <article class="intro-card card-glow">
            <h3>🏎️ Forza Motorsport 7</h3>
            <p>Коллекция 700+ машин и легендарные трассы мира</p>
          </article>
          <article class="intro-card card-glow">
            <h3>📈 Расширяемо</h3>
            <p>Архитектура готова к добавлению новых гоночных игр</p>
          </article>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer-inner container">
        <p>© 2026 СайтСотика</p>
      </div>
    </footer>
  </div>
  <script src="/js/site.js"></script>
</body>
</html>
```

---

### 2. КАТАЛОГ ИГРА (`/games/index.html`)

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Игры - СайтСотика</title>
  <link rel="stylesheet" href="/css/style.css" />
</head>
<body>
  <div class="page-shell">
    <header class="site-header">
      <div class="header-inner container">
        <a class="brand" href="/index.html">СайтСотика</a>
        <button class="nav-toggle" aria-label="Меню">
          <span></span><span></span><span></span>
        </button>
        <nav class="main-nav">
          <ul>
            <li><a href="/index.html">Главная</a></li>
            <li><a href="/games/index.html">Игры</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <main>
      <section class="page-hero">
        <div class="container">
          <h1>Каталог гоночных игр</h1>
          <p>Выберите игру для полного гайда, сборок и сообщества</p>
        </div>
      </section>

      <section class="games-list-section container">
        <div class="section-header">
          <h2>Доступные игры</h2>
        </div>
        <div class="games-grid">
          <!-- Forza Motorsport -->
          <article class="game-card card-glow">
            <h3>Forza Motorsport</h3>
            <p>Реалистичный режим гонок с точными настройками</p>
            <a href="/games/forza-motorsport/index.html" class="button button-primary">Открыть раздел</a>
          </article>

          <!-- Forza Motorsport 7 -->
          <article class="game-card card-glow">
            <h3>Forza Motorsport 7</h3>
            <p>700+ машин, легендарные трассы и турниры</p>
            <a href="/games/forza-motorsport-7/index.html" class="button button-primary">Открыть раздел</a>
          </article>
        </div>
      </section>

      <section class="add-game-section container">
        <h2>Предложить новую игру</h2>
        <form id="suggestion-form">
          <input type="text" placeholder="Название игры" required />
          <textarea placeholder="Почему стоит добавить эту игру?" required></textarea>
          <button class="button button-primary" type="submit">Отправить</button>
        </form>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer-inner container">
        <p>© 2026 СайтСотика</p>
      </div>
    </footer>
  </div>
  <script src="/js/site.js"></script>
</body>
</html>
```

---

### 3. ГЛАВНАЯ СТРАНИЦА ИГРЫ - Forza Motorsport (`/games/forza-motorsport/index.html`)

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Forza Motorsport - СайтСотика</title>
  <link rel="stylesheet" href="/css/style.css" />
</head>
<body>
  <div class="page-shell">
    <header class="site-header">
      <div class="header-inner container">
        <a class="brand" href="/index.html">СайтСотика</a>
        <button class="nav-toggle" aria-label="Меню">
          <span></span><span></span><span></span>
        </button>
        <nav class="main-nav">
          <ul>
            <li><a href="/index.html">Главная</a></li>
            <li><a href="/games/index.html">Игры</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <main>
      <section class="page-hero">
        <div class="container">
          <h1>Forza Motorsport</h1>
          <p>Режимы, машины и профессиональные настройки</p>
        </div>
      </section>

      <section class="game-nav-section container">
        <div class="section-header">
          <h2>Разделы Forza Motorsport</h2>
        </div>
        <div class="game-nav-grid">
          <a href="/games/forza-motorsport/cars.html" class="nav-card card-glow">
            <h3>🚗 Машины</h3>
            <p>Полный каталог с техническими характеристиками</p>
          </a>
          <a href="/games/forza-motorsport/tracks.html" class="nav-card card-glow">
            <h3>🏁 Треки</h3>
            <p>Описание трасс и стратегии прохождения</p>
          </a>
          <a href="/games/forza-motorsport/guides.html" class="nav-card card-glow">
            <h3>📖 Гайды</h3>
            <p>Руководства по настройке и управлению</p>
          </a>
          <a href="/games/forza-motorsport/community.html" class="nav-card card-glow">
            <h3>👥 Сообщество</h3>
            <p>Турниры, рейтинги и события</p>
          </a>
          <a href="/games/forza-motorsport/builds.html" class="nav-card card-glow">
            <h3>🔧 Сборки</h3>
            <p>Готовые конфигурации от профессионалов</p>
          </a>
          <a href="/games/index.html" class="nav-card card-glow">
            <h3>← Вернуться</h3>
            <p>Вернуться в каталог игр</p>
          </a>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer-inner container">
        <p>© 2026 СайтСотика. Forza Motorsport</p>
      </div>
    </footer>
  </div>
  <script src="/js/site.js"></script>
</body>
</html>
```

---

### 4. МАШИНЫ (`/games/forza-motorsport/cars.html`)

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Машины Forza Motorsport - СайтСотика</title>
  <link rel="stylesheet" href="/css/style.css" />
</head>
<body>
  <div class="page-shell">
    <header class="site-header">
      <div class="header-inner container">
        <a class="brand" href="/index.html">СайтСотика</a>
        <nav class="main-nav">
          <ul>
            <li><a href="/index.html">Главная</a></li>
            <li><a href="/games/index.html">Игры</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <main>
      <section class="page-hero">
        <div class="container">
          <h1>Машины Forza Motorsport</h1>
          <p>Полный каталог автомобилей с характеристиками</p>
        </div>
      </section>

      <section class="container" style="padding: 70px 0;">
        <div class="section-header">
          <h2>Каталог машин</h2>
        </div>
        <div class="cars-grid">
          <article class="car-card card-glow">
            <h3>Gumpert Apollo</h3>
            <p><strong>Класс:</strong> Pro | <strong>Мощность:</strong> 800 л.с.</p>
            <p>Ультра-агрессивный болид. Макс скорость 370 км/ч.</p>
            <div class="specs">
              <span>Ускорение: 95</span>
              <span>Управляемость: 78</span>
            </div>
          </article>
          <article class="car-card card-glow">
            <h3>Porsche 911 Turbo</h3>
            <p><strong>Класс:</strong> Street | <strong>Мощность:</strong> 580 л.с.</p>
            <p>Классический спортсмен с идеальным балансом.</p>
            <div class="specs">
              <span>Ускорение: 82</span>
              <span>Управляемость: 88</span>
            </div>
          </article>
          <article class="car-card card-glow">
            <h3>Ferrari F8 Tributo</h3>
            <p><strong>Класс:</strong> Pro | <strong>Мощность:</strong> 710 л.с.</p>
            <p>Легендарный болид для карьеры и турниров.</p>
            <div class="specs">
              <span>Ускорение: 90</span>
              <span>Управляемость: 85</span>
            </div>
          </article>
        </div>
        <div style="margin-top: 40px; text-align: center;">
          <a href="/games/forza-motorsport/index.html" class="button button-primary">← Вернуться</a>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer-inner container">
        <p>© 2026 СайтСотика</p>
      </div>
    </footer>
  </div>
  <script src="/js/site.js"></script>
</body>
</html>
```

---

### 5. ТРЕКИ (`/games/forza-motorsport/tracks.html`)

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Треки Forza Motorsport - СайтСотика</title>
  <link rel="stylesheet" href="/css/style.css" />
</head>
<body>
  <div class="page-shell">
    <header class="site-header">
      <div class="header-inner container">
        <a class="brand" href="/index.html">СайтСотика</a>
        <nav class="main-nav">
          <ul>
            <li><a href="/index.html">Главная</a></li>
            <li><a href="/games/index.html">Игры</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <main>
      <section class="page-hero">
        <div class="container">
          <h1>Треки Forza Motorsport</h1>
          <p>Лучшие трассы и стратегии прохождения</p>
        </div>
      </section>

      <section class="container" style="padding: 70px 0;">
        <div class="section-header">
          <h2>Гоночные трассы</h2>
        </div>
        <div class="tracks-grid">
          <article class="track-card card-glow">
            <h3>Silverstone Circuit</h3>
            <p><strong>Тип:</strong> Road | <strong>Длина:</strong> 5.9 км</p>
            <p>F1 трасса. Требует точности на высоких скоростях.</p>
          </article>
          <article class="track-card card-glow">
            <h3>Nürburgring Nordschleife</h3>
            <p><strong>Тип:</strong> Road | <strong>Длина:</strong> 20.8 км</p>
            <p>Самая сложная трасса. Техническое мастерство критично.</p>
          </article>
          <article class="track-card card-glow">
            <h3>Hockenheim</h3>
            <p><strong>Тип:</strong> Road | <strong>Длина:</strong> 6.85 км</p>
            <p>Быстрая трасса для аэродинамических болидов.</p>
          </article>
        </div>
        <div style="margin-top: 40px; text-align: center;">
          <a href="/games/forza-motorsport/index.html" class="button button-primary">← Вернуться</a>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer-inner container">
        <p>© 2026 СайтСотика</p>
      </div>
    </footer>
  </div>
  <script src="/js/site.js"></script>
</body>
</html>
```

---

### 6. ГАЙДЫ (`/games/forza-motorsport/guides.html`)

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Гайды Forza Motorsport - СайтСотика</title>
  <link rel="stylesheet" href="/css/style.css" />
</head>
<body>
  <div class="page-shell">
    <header class="site-header">
      <div class="header-inner container">
        <a class="brand" href="/index.html">СайтСотика</a>
        <nav class="main-nav">
          <ul>
            <li><a href="/index.html">Главная</a></li>
            <li><a href="/games/index.html">Игры</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <main>
      <section class="page-hero">
        <div class="container">
          <h1>Гайды Forza Motorsport</h1>
          <p>Полные руководства по настройке и управлению</p>
        </div>
      </section>

      <section class="container" style="padding: 70px 0;">
        <div class="section-header">
          <h2>Руководства</h2>
        </div>
        <div class="guides-grid">
          <article class="guide-card card-glow">
            <h3>Настройка подвески</h3>
            <p>Полный гайд по пружинам, амортизаторам и развал-схождению для каждого типа трассы.</p>
          </article>
          <article class="guide-card card-glow">
            <h3>Управление в поворотах</h3>
            <p>Техника торможения, точка входа и выхода из углов для максимальной скорости.</p>
          </article>
          <article class="guide-card card-glow">
            <h3>Выбор класса машин</h3>
            <p>Матрица подбора болида под каждое мероприятие и класс сложности.</p>
          </article>
        </div>
        <div style="margin-top: 40px; text-align: center;">
          <a href="/games/forza-motorsport/index.html" class="button button-primary">← Вернуться</a>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer-inner container">
        <p>© 2026 СайтСотика</p>
      </div>
    </footer>
  </div>
  <script src="/js/site.js"></script>
</body>
</html>
```

---

### 7. СООБЩЕСТВО (`/games/forza-motorsport/community.html`)

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Сообщество Forza Motorsport - СайтСотика</title>
  <link rel="stylesheet" href="/css/style.css" />
</head>
<body>
  <div class="page-shell">
    <header class="site-header">
      <div class="header-inner container">
        <a class="brand" href="/index.html">СайтСотика</a>
        <nav class="main-nav">
          <ul>
            <li><a href="/index.html">Главная</a></li>
            <li><a href="/games/index.html">Игры</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <main>
      <section class="page-hero">
        <div class="container">
          <h1>Сообщество Forza Motorsport</h1>
          <p>Сейтинги, турниры и социальные события</p>
        </div>
      </section>

      <section class="container" style="padding: 70px 0;">
        <div class="section-header">
          <h2>Рейтинги и события</h2>
        </div>
        <div class="community-grid">
          <article class="community-card card-glow">
            <h3>Мировой рейтинг</h3>
            <p>Таблица лидеров по очкам и времени круга на всех трассах.</p>
          </article>
          <article class="community-card card-glow">
            <h3>Еженедельные турниры</h3>
            <p>Участвуйте в официальных чемпионатах с вознаграждением в кредитах.</p>
          </article>
          <article class="community-card card-glow">
            <h3>Клубы и команды</h3>
            <p>Создавайте команды и участвуйте в корпоративных гонках.</p>
          </article>
        </div>
        <div style="margin-top: 40px; text-align: center;">
          <a href="/games/forza-motorsport/index.html" class="button button-primary">← Вернуться</a>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer-inner container">
        <p>© 2026 СайтСотика</p>
      </div>
    </footer>
  </div>
  <script src="/js/site.js"></script>
</body>
</html>
```

---

### 8. СБОРКИ (`/games/forza-motorsport/builds.html`)

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Сборки Forza Motorsport - СайтСотика</title>
  <link rel="stylesheet" href="/css/style.css" />
</head>
<body>
  <div class="page-shell">
    <header class="site-header">
      <div class="header-inner container">
        <a class="brand" href="/index.html">СайтСотика</a>
        <nav class="main-nav">
          <ul>
            <li><a href="/index.html">Главная</a></li>
            <li><a href="/games/index.html">Игры</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <main>
      <section class="page-hero">
        <div class="container">
          <h1>Сборки Forza Motorsport</h1>
          <p>Готовые конфигурации от профессиональных гонщиков</p>
        </div>
      </section>

      <section class="container" style="padding: 70px 0;">
        <div class="section-header">
          <h2>Топовые сборки</h2>
        </div>
        <div class="builds-grid">
          <article class="build-card card-glow">
            <h3>Ferrari F8 Tributo - Silverstone</h3>
            <p><strong>Класс:</strong> Pro | <strong>Рейтинг:</strong> 950</p>
            <p>Пружины: 55.8 | Антиролл: 22.5 | Тормоза: Hard</p>
          </article>
          <article class="build-card card-glow">
            <h3>Porsche 911 Turbo - Hockenheim</h3>
            <p><strong>Класс:</strong> Street | <strong>Рейтинг:</strong> 885</p>
            <p>Подвеска: Soft | Аэро: 80 | Клиренс: +5</p>
          </article>
          <article class="build-card card-glow">
            <h3>McLaren P1 - Nürburgring</h3>
            <p><strong>Класс:</strong> Pro | <strong>Рейтинг:</strong> 998</p>
            <p>Трансмиссия: Closed | Дифференциал: 85</p>
          </article>
        </div>
        <div style="margin-top: 40px; text-align: center;">
          <a href="/games/forza-motorsport/index.html" class="button button-primary">← Вернуться</a>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer-inner container">
        <p>© 2026 СайтСотика</p>
      </div>
    </footer>
  </div>
  <script src="/js/site.js"></script>
</body>
</html>
```

---

## 🎨 CSS классы для всех компонентов

```css
/* Основные */
.page-shell { }
.container { }
.site-header { }
.main-nav { }
.button { }
.card-glow { }

/* Главная страница */
.hero-section { }
.intro-section { }
.intro-grid { }
.intro-card { }

/* Каталог игр */
.games-list-section { }
.games-grid { }
.game-card { }
.add-game-section { }

/* Страница игры */
.page-hero { }
.game-nav-section { }
.game-nav-grid { }
.nav-card { }

/* Машины */
.cars-grid { }
.car-card { }
.specs { }

/* Треки */
.tracks-grid { }
.track-card { }

/* Гайды */
.guides-grid { }
.guide-card { }

/* Сообщество */
.community-grid { }
.community-card { }

/* Сборки */
.builds-grid { }
.build-card { }

/* Футер */
.site-footer { }
.footer-inner { }
```

---

## 🔧 JavaScript функции (`site.js`)

```javascript
// Инициализация
SiteSotika.init()

// Методы навигации
SiteSotika.initNavToggle()      // Меню на мобильных
SiteSotika.initActiveLink()     // Активная ссылка в меню

// Каталог игр
SiteSotika.renderGameList()     // Рендер списка игр
SiteSotika.initSuggestionForm() // Форма предложения

// Утилиты
SiteSotika.showToast()          // Уведомления
SiteSotika.loadSuggestions()    // Загрузка из localStorage
```

---

## 🚀 Расширяемость для новых игр

Для добавления новой игры (например, Gran Turismo 7):

1. Создать папку: `/games/gran-turismo-7/`
2. Скопировать 6 файлов из любой папки игры
3. Обновить содержимое (названия, описания)
4. **НЕ обновлять главное меню** — только каталог `/games/index.html`

---

## 📊 Размер файлов

- `css/style.css` — **2000+ строк** (стили для всех компонентов)
- `js/site.js` — **1000+ строк** (логика навигации и функциональность)
- Каждая страница игры — **150-200 строк** HTML

---

## ✅ Резюме

- **Главное меню** содержит: Главная | Игры
- **Каталог игр** (/games/) содержит ссылки на игры
- **Каждая игра** имеет 6 страниц в отдельной папке
- **Архитектура готова** для добавления новых игр
- **Все стили и скрипты глобальные**, используются на всех страницах
