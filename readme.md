````md
# Intergalactic Analytics Client

Одностраничное приложение на React (Vite, TypeScript) для генерации и анализа галактических отчётов на основе пользовательских файлов.

---

## Содержание
1. [Введение](#введение)
2. [Архитектурная схема](#архитектурная-схема)
3. [Структура директорий](#структура-директорий)
4. [Компоненты и страницы](#компоненты-и-страницы)
5. [Управление состоянием (Zustand)](#управление-состоянием-zustand)
6. [Сервисный слой (API)](#сервисный-слой-api)
7. [Стилизация](#стилизация)
8. [Роутинг](#роутинг)
9. [Скрипты и сборка](#скрипты-и-сборка)
10. [Конфигурация и инструменты разработки](#конфигурация-и-инструменты-разработки)
11. [Переменные окружения](#переменные-окружения)
12. [Контакты и лицензия](#контакты-и-лицензия)

---

## Введение

`Intergalactic Analytics Client` — frontend на React/Vite/TypeScript для взаимодействия с API по генерации галактических отчётов и управления историей запросов.

- **Цель**: загрузить файл через браузер, запросить отчёт, отобразить результат и сохранить запись в локальном хранилище.
- **Основные технологии**: React 19, Vite 6, TypeScript 5, Zustand, React Router 7, CSS Modules.

---

## Архитектурная схема

```mermaid
flowchart LR
  subgraph UI
    A[<App/>]
    A --> C[<Container/>]
    C --> H[<Header/>]
    C --> R[<Routes/>]
    R -->|"/"| AP[<AnalyticPage/>]
    R -->|"/generator"| GP[<GeneratorPage/>]
    R -->|"/history"| HP[<HistoryPage/>]
  end

  subgraph Store (Zustand)
    S1[generatorSlice]
    S2[aggregatorSlice]
    S3[historySlice]
    A -->|useStore| S1
    A -->|useStore| S2
    A -->|useStore| S3
  end

  subgraph Services
    API1[analyticsApi]
    API2[metricsAccessApi]
    S1 --> API1
    S2 --> API1
    S2 --> API2
    S3 --> API2
  end

  subgraph Persistence
    LS[(localStorage)]
    API2 --> LS
  end
````

---

## Структура директорий

```text
intergalactic_analytics_client/
├── public/
│   └── vite.svg               # статика
├── src/
│   ├── api/                   # HTTP-клиенты
│   │   ├── analytics_api.ts
│   │   └── metrics_access_api.ts
│   ├── components/            # UI-компоненты
│   ├── pages/                 # страницы (роуты)
│   ├── store/                 # Zustand store (слайсы)
│   ├── App.tsx                # корневой компонент
│   ├── main.tsx               # точка входа (ReactDOM)
│   ├── index.css              # глобальные стили
│   └── vite-env.d.ts
├── .env                       # локальные переменные окружения
├── package.json               # зависимости и скрипты
├── tsconfig.json              # компилятор TypeScript
├── vite.config.ts             # конфиг Vite
├── eslint.config.js           # ESLint конфиг
└── .prettierrc                # Prettier конфиг
```

---

## Компоненты и страницы

### UI-компоненты (`src/components/`)

- **Container** — обёртка для лэйаута
- **Header** — навигация
- **AnalyticForm**, **Generator**, **GalacticDisplay**, **HistoryPopUp**, **Modal**, **DragAndDropUpload**, **ButtonUpload**, **MenuItem**, **Cell**, **Row**, **Loader**, **Icons** и др.

### Страницы (`src/pages/`)

- **AnalyticPage** — главная страница отчётов
- **GeneratorPage** — загрузка файла и запрос отчёта
- **HistoryPage** — история запросов и детальный просмотр метрик

Каждая страница объединяет соответствующие компоненты и использует store-слайсы.

---

## Управление состоянием (Zustand)

Слайсы хранят бизнес-логику и асинхронные операции:

- **generatorSlice** — состояние процесса генерации, методы `fetchToGenerate`
- **aggregatorSlice** — хранит метрики отчёта, методы обращения к `analyticsApi`
- **historySlice** — управление сохранёнными записями (`getRows`, `getMetric`, `deleteRow`, `clear`)

Используется `useStore` c middleware `devtools` для отладки.

---

## Сервисный слой (API)

- **analyticsApi** (`src/api/analytics_api.ts`): запрос генерации отчёта через `fetch` и запись в файловую систему браузера.
- **metricsAccessApi** (`src/api/metrics_access_api.ts`): хранение и извлечение метаданных запросов в `localStorage`.

---

## Стилизация

Используются **CSS Modules** (`*.module.css`) для компонента и глобальные стили (`index.css`).

---

## Роутинг

**React Router v7** в `App.tsx`:

```tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<AnalyticPage />} />
    <Route path="/generator" element={<GeneratorPage />} />
    <Route path="/history" element={<HistoryPage />} />
  </Routes>
</BrowserRouter>
```

---

## Скрипты и сборка

```bash
# разработка
npm run dev
# сборка
npm run build
# предпросмотр production
npm run preview
# проверка кода
npm run lint
```

---

## Конфигурация и инструменты разработки

- **Vite** (`vite.config.ts`)
- **TypeScript** (`tsconfig.json`)
- **ESLint** + **eslint-plugin-react-hooks** (`eslint.config.js`)
- **Prettier** (`.prettierrc`)

---

## Переменные окружения

- `VITE_API_BASE_URL` — базовый URL вашего бэкенда для запросов.

---

## Контакты и лицензия

- **Репозиторий**: https://github.com/marvin332
- **Автор**:  arthyrio@yandex.ru
- **Лицензия**: MIT 

```
```
