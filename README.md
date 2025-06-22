# Интерфейс для Сервиса межгалактической аналитики

## Содержание

- [Обзор](#обзор)
- [Начало работы](#начало-работы)
  - [Требования](#требования)
  - [Установка](#установка)
- [Структура проекта](#структура-проекта)
- [Архитектура](#архитектура)
  - [Точка входа и маршрутизация](#точка-входа-и-маршрутизация)
  - [Управление состоянием](#управление-состоянием)
  - [Модули-фичи](#модули-фичи)
    - [Генератор](#генератор)
    - [Агрегатор](#агрегатор)
    - [История](#история)
  - [Общие компоненты и сущности](#общие-компоненты-и-сущности)
  - [Стилизация](#стилизация)
  - [Конфигурация и окружение](#конфигурация-и-окружение)
- [Скрипты](#скрипты)
- [Зависимости](#зависимости)
- [Контрибьюция](#контрибьюция)
- [Лицензия](#лицензия)

## Начало работы

### Требования

- Node.js (>=14.x)
- npm или yarn
- желательно браузер Chrome

### Установка

1. Клонируйте репозиторий:
   ```bash
   git clone <repo-url>
   cd intergalactic_analytics_client
   ```
2. Установите зависимости:
   ```bash
   npm install
   ```
3. Запустите dev-сервер:
   ```bash
   npm run dev
   ```

Приложение будет доступно по адресу `http://localhost:3000`.

## Структура проекта

```
intergalactic_analytics_client/
├── public/              # Статические ресурсы
├── src/                 # Исходный код приложения
│   ├── app/             # Настройка приложения
│   │   ├── App.tsx      # Корневой компонент и маршруты
│   │   ├── store/       # Конфигурация Zustand
│   │   └── helpers/     # Утилитарные функции
│   ├── features/        # Фичи (доменные модули)
│   │   ├── generator/   # Генерация аналитики
│   │   ├── aggregator/  # Агрегация метрик
│   │   └── history/     # Просмотр истории
│   ├── pages/           # Страницы для роутинга
│   ├── widgets/         # Виджеты (например, Header)
│   ├── shared/          # Общие UI-компоненты (кнопки, модалки и т. д.)
│   └── entities/        # Доменные сущности (Cell, Row, Highlights)
├── .env                 # Переменные окружения
├── vite.config.ts       # Конфигурация Vite
├── tsconfig.json        # Конфигурация TypeScript
├── package.json         # Скрипты и зависимости
└── README.md            # Этот файл
```

## Архитектура

### Точка входа и маршрутизация

- **main.tsx**: монтирует React-приложение в DOM.
- **App.tsx**: определяет общую раскладку через `Container` и `Header`, настраивает маршруты с помощью **React Router DOM**:
  - `/` → `AnalyticPage`
  - `/generator` → `GeneratorPage`
  - `/history` → `HistoryPage`

### Управление состоянием

Для глобального состояния используется **Zustand** с middleware **devtools**:

- Срезы состояния (`slices`) создаются для каждой фичи в `src/features/*/model/index.ts`.
- Хук **useStore** объединяет срезы для **generator**, **aggregator** и **history**.

### Модули-фичи

Каждая фича организована по структуре **`api`**, **`model`** и **`UI`**:

#### Генератор

- **API** (`src/features/generator/api/generator.ts`): HTTP-запросы для генерации новых данных для аналитики.
- **Model** (`src/features/generator/model/index.ts`): срез состояния, экшены и асинхронные операции.
- **UI** (`src/features/generator/UI/generator/Generator.tsx`): форма ввода параметров и отображение результата.

#### Агрегатор

- **API** (`src/features/aggregator/api/aggregator.ts`): получение агрегированных метрик с бэкенда.
- **Model** (`src/features/aggregator/model/index.ts`): хранит данные метрик, статус загрузки и ошибки.
- **UI** (`src/features/aggregator/UI/analyticForm/AnalyticForm.tsx` & `/galacticDisplay/GalacticDisplay.tsx`): форма для загрузки файла и визуализация результатов.

#### История

- **API** (`src/features/history/api/metrics_access_api.ts`): получение истории запросов.
- **Model** (`src/features/history/model/index.ts`): отслеживает записи истории, статус загрузки и ошибки.
- **UI** (`src/features/history/UI/history/History.tsx` & `/historyPopUp/HistoryPopUp.tsx`): отображение списка записей и подробных попапов.

### Общие компоненты и сущности

- **Shared** (`src/shared/`): переиспользуемые UI-компоненты:
  - `Button`, `ButtonUpload`, `MenuItem`, `Modal`, `Loader`, `DragAndDropUpload`
  - Иконки (`SadIcon`, `SmileIcon`)
- **Widgets** (`src/widgets/`): компоненты уровня макета, например `Header`.
- **Entities** (`src/entities/`): презентационные компоненты доменных сущностей:
  - `Cell`, `Row`, `Highlights`.

### Стилизация

- **CSS Modules** для локальных стилей компонентов (файлы `ComponentName/styles.module.css`).
- Глобальные стили в `src/app/index.css`.

### Конфигурация и окружение

Настройки через переменные окружения в `.env`:

- `VITE_API_BASE_URL`: базовый URL бэкенда.
- `VITE_SIZE`, `VITE_WITH_ERRORS`, `VITE_MAX_SPEND`: флаги и лимиты.

### Сборка и инструменты

- **Vite** для dev сборки и бандлинга (`vite.config.ts`).
- **ESLint** и **Prettier** для качества кода.
- **TypeScript** для статической типизации.

## Скрипты

```bash
npm run dev     # Запуск dev-сервера
npm run build   # Сборка для продакшна
npm run preview # Предпросмотр продакшн-сборки
npm run lint    # Проверка кода ESLint
```

## Зависимости

- **React** ^19.1.0
- **Zustand** ^5.0.5
- **React Router DOM** ^7.6.2
- **Vite** ^6.3.5
- **TypeScript** ~5.8.3






