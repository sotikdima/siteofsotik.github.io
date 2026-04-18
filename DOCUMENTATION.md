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

### Общий процесс добавления игры

Для добавления новой игры в портал:

1. **Создать папку игры**: `/games/[game-slug]/` (например, `/games/assetto-corsa-competizione/`)
2. **Создать 6 обязательных файлов**:
   - `index.html` — главная страница игры
   - `cars.html` — каталог машин
   - `tracks.html` — каталог трасс
   - `guides.html` — гайды и руководства
   - `community.html` — сообщество и турниры
   - `builds.html` — готовые сборки
3. **Обновить `/games/index.html`** — добавить ссылку на новую игру в каталог
4. **НЕ обновлять главное меню** (`index.html`) — игры ТОЛЬКО в каталоге

---

### Пример 1: Assetto Corsa (серия)

#### Структура папок
```
games/
├── assetto-corsa/              # 📁 Assetto Corsa (исходная игра)
│   ├── index.html             # 🎮 Главная страница
│   ├── cars.html              # 🚗 Машины (200+)
│   ├── tracks.html            # 🏁 Треки (100+)
│   ├── guides.html            # 📖 Гайды
│   ├── community.html         # 👥 Сообщество
│   └── builds.html            # 🔧 Сборки
│
└── assetto-corsa-competizione/ # 📁 Assetto Corsa Competizione
    ├── index.html             # 🎮 Главная страница
    ├── cars.html              # 🚗 GT машины (50+)
    ├── tracks.html            # 🏁 Реальные трассы (30+)
    ├── guides.html            # 📖 Туториалы
    ├── community.html         # 👥 Киберчемпионат
    └── builds.html            # 🔧 Setup'ы
```

#### Содержимое `/games/assetto-corsa/index.html`

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Assetto Corsa - СайтСотика</title>
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
          <h1>Assetto Corsa</h1>
          <p>Реалистичный симулятор гонок с точной физикой и 200+ машинами</p>
        </div>
      </section>

      <section class="game-nav-section container">
        <div class="section-header">
          <h2>Разделы Assetto Corsa</h2>
        </div>
        <div class="game-nav-grid">
          <a href="/games/assetto-corsa/cars.html" class="nav-card card-glow">
            <h3>🚗 Машины</h3>
            <p>200+ автомобилей с реалистичной физикой</p>
          </a>
          <a href="/games/assetto-corsa/tracks.html" class="nav-card card-glow">
            <h3>🏁 Треки</h3>
            <p>100+ трасс по всему миру</p>
          </a>
          <a href="/games/assetto-corsa/guides.html" class="nav-card card-glow">
            <h3>📖 Гайды</h3>
            <p>Мастер-классы по управлению и настройке</p>
          </a>
          <a href="/games/assetto-corsa/community.html" class="nav-card card-glow">
            <h3>👥 Сообщество</h3>
            <p>Лига гонщиков и события</p>
          </a>
          <a href="/games/assetto-corsa/builds.html" class="nav-card card-glow">
            <h3>🔧 Сборки</h3>
            <p>Setup'ы для каждой трассы</p>
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
        <p>© 2026 СайтСотика. Assetto Corsa</p>
      </div>
    </footer>
  </div>
  <script src="/js/site.js"></script>
</body>
</html>
```

#### Содержимое `/games/assetto-corsa/cars.html`

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Машины Assetto Corsa - СайтСотика</title>
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
          <h1>Машины Assetto Corsa</h1>
          <p>Более 200 лицензионных автомобилей с подлинной физикой</p>
        </div>
      </section>

      <section class="container" style="padding: 70px 0;">
        <div class="section-header">
          <h2>Каталог машин</h2>
        </div>
        <div class="cars-grid">
          <article class="car-card card-glow">
            <h3>Ferrari 458 Italia</h3>
            <p><strong>Класс:</strong> GT | <strong>Год:</strong> 2010</p>
            <p>Итальянский суперкар. Отличная управляемость на быстрых поворотах.</p>
            <div class="specs">
              <span>Мощность: 570 л.с.</span>
              <span>Макс скорость: 300 км/ч</span>
            </div>
          </article>
          <article class="car-card card-glow">
            <h3>Lamborghini Gallardo LP 560</h3>
            <p><strong>Класс:</strong> GT | <strong>Год:</strong> 2008</p>
            <p>Агрессивный суперкар с мощным V10.</p>
            <div class="specs">
              <span>Мощность: 560 л.с.</span>
              <span>Макс скорость: 315 км/ч</span>
            </div>
          </article>
          <article class="car-card card-glow">
            <h3>Porsche 991 Turbo</h3>
            <p><strong>Класс:</strong> GT | <strong>Год:</strong> 2013</p>
            <p>Немецкий спортсмен. Идеален для гоночной трассы.</p>
            <div class="specs">
              <span>Мощность: 560 л.с.</span>
              <span>Макс скорость: 318 км/ч</span>
            </div>
          </article>
          <article class="car-card card-glow">
            <h3>BMW M3 E30</h3>
            <p><strong>Класс:</strong> Touring | <strong>Год:</strong> 1986</p>
            <p>Культовый M3. Лёгкий и манёвренный.</p>
            <div class="specs">
              <span>Мощность: 238 л.с.</span>
              <span>Макс скорость: 235 км/ч</span>
            </div>
          </article>
          <article class="car-card card-glow">
            <h3>Nissan Skyline GT-R R34</h3>
            <p><strong>Класс:</strong> Touring | <strong>Год:</strong> 1999</p>
            <p>Японская легенда. Быстрая и стабильная.</p>
            <div class="specs">
              <span>Мощность: 330 л.с.</span>
              <span>Макс скорость: 270 км/ч</span>
            </div>
          </article>
          <article class="car-card card-glow">
            <h3>Formula K 3008</h3>
            <p><strong>Класс:</strong> Formulas | <strong>Год:</strong> 2012</p>
            <p>Формула-подобный болид. Экстремальная производительность.</p>
            <div class="specs">
              <span>Мощность: 440 л.с.</span>
              <span>Макс скорость: 340 км/ч</span>
            </div>
          </article>
        </div>
        <div style="margin-top: 40px; text-align: center;">
          <a href="/games/assetto-corsa/index.html" class="button button-primary">← Вернуться</a>
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

### Пример 2: Project Cars (серия)

#### Структура папок
```
games/
├── project-cars/               # 📁 Project Cars
│   ├── index.html             # 🎮 Главная страница
│   ├── cars.html              # 🚗 Машины (180+)
│   ├── tracks.html            # 🏁 Треки (50+)
│   ├── guides.html            # 📖 Гайды
│   ├── community.html         # 👥 Сообщество
│   └── builds.html            # 🔧 Сборки
│
└── project-cars-2/            # 📁 Project Cars 2
    ├── index.html             # 🎮 Главная страница
    ├── cars.html              # 🚗 Машины (220+)
    ├── tracks.html            # 🏁 Трассы (60+)
    ├── guides.html            # 📖 Туториалы
    ├── community.html         # 👥 Лига
    └── builds.html            # 🔧 Setup'ы
```

#### Содержимое `/games/project-cars/index.html`

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Project Cars - СайтСотика</title>
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
          <h1>Project Cars</h1>
          <p>Карьера гонщика с реалистичной физикой и погодой</p>
        </div>
      </section>

      <section class="game-nav-section container">
        <div class="section-header">
          <h2>Разделы Project Cars</h2>
        </div>
        <div class="game-nav-grid">
          <a href="/games/project-cars/cars.html" class="nav-card card-glow">
            <h3>🚗 Машины</h3>
            <p>180+ машин от Формул до уличных болидов</p>
          </a>
          <a href="/games/project-cars/tracks.html" class="nav-card card-glow">
            <h3>🏁 Треки</h3>
            <p>50+ гоночных трасс мира</p>
          </a>
          <a href="/games/project-cars/guides.html" class="nav-card card-glow">
            <h3>📖 Гайды</h3>
            <p>Стратегии и советы профессионалов</p>
          </a>
          <a href="/games/project-cars/community.html" class="nav-card card-glow">
            <h3>👥 Сообщество</h3>
            <p>Турниры и лига гонщиков</p>
          </a>
          <a href="/games/project-cars/builds.html" class="nav-card card-glow">
            <h3>🔧 Сборки</h3>
            <p>Готовые настройки и конфигурации</p>
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
        <p>© 2026 СайтСотика. Project Cars</p>
      </div>
    </footer>
  </div>
  <script src="/js/site.js"></script>
</body>
</html>
```

---

### Как добавить новую игру: Пошаговое руководство

#### Шаг 1: Создать папку игры

```
mkdir games/assetto-corsa-competizione
```

#### Шаг 2: Скопировать файлы

Скопируйте один из существующих наборов (например, из `/games/forza-motorsport/`):
- `index.html`
- `cars.html`
- `tracks.html`
- `guides.html`
- `community.html`
- `builds.html`

#### Шаг 3: Обновить content в каждом файле

Замените в каждом файле:
- `<title>` — название страницы
- `<h1>` — название игры
- Описания машин, треков, гайдов
- URL обратных ссылок

**Пример для `/games/assetto-corsa-competizione/index.html`:**

```html
<title>Assetto Corsa Competizione - СайтСотика</title>
<h1>Assetto Corsa Competizione</h1>
<p>Киберспортивный симулятор с официальной киберлигой</p>

<!-- В nav-card'ах обновить href'ы -->
<a href="/games/assetto-corsa-competizione/cars.html">...</a>
```

#### Шаг 4: Обновить каталог игр (`/games/index.html`)

Добавить новую игру в `.games-grid`:

```html
<!-- Assetto Corsa Competizione -->
<article class="game-card card-glow">
  <h3>Assetto Corsa Competizione</h3>
  <p>Киберспортивный симулятор GT с реалистичной физикой</p>
  <a href="/games/assetto-corsa-competizione/index.html" class="button button-primary">Открыть раздел</a>
</article>
```

#### Шаг 5: Коммитить изменения

```powershell
git add games/assetto-corsa-competizione/
git add games/index.html
git commit -m "Добавлена новая игра: Assetto Corsa Competizione"
git push origin main
```

---

### Текущий каталог игр (полный)

После расширения структура будет:

```
games/
├── index.html                                # Каталог всех игр
├── forza-motorsport/                        # ✅ Есть
├── forza-motorsport-7/                      # ✅ Есть
├── assetto-corsa/                           # 📝 Готов к добавлению
├── assetto-corsa-competizione/              # 📝 Готов к добавлению
├── project-cars/                            # 📝 Готов к добавлению
└── project-cars-2/                          # 📝 Готов к добавлению
```

Каждая папка содержит 6 файлов:
- `index.html`, `cars.html`, `tracks.html`, `guides.html`, `community.html`, `builds.html`

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
