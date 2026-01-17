# ContentShelf — минимальный Next.js + Prisma + Neon (PostgreSQL)

Цель: после деплоя на Vercel открывается главная страница `/`, которая
читает данные из PostgreSQL (Neon) через Prisma и показывает их.

## Стек

- **Next.js** (TypeScript, App Router)
- **Prisma** (ORM)
- **NeonDB** (PostgreSQL)
- **Vercel** (деплой)

## Модель данных

`Note`:

- `id` — UUID
- `title` — string
- `createdAt` — DateTime

Схема: `prisma/schema.prisma`.

## Переменные окружения

В проекте используется только `DATABASE_URL`.

Возьмите шаблон из `env.example` и создайте файл `.env` в корне проекта:

```text
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DB?sslmode=require"
```

Рекомендация для Neon: используйте **Pooled connection string** (чтобы
не упираться в лимиты соединений в serverless окружении).

## Локальный запуск (PowerShell)

```powershell
Set-Location C:\Work\ContentShelf

# 1) Установить зависимости
npm install

# 2) Создать таблицы в Neon (миграция)
# (требует настроенный DATABASE_URL в .env)
npm run db:migrate:dev -- --name init

# 3) Засидить минимум данных (создаст 2 заметки, если таблица пустая)
npm run db:seed

# 4) Запуск
npm run dev
```

Откройте `http://localhost:3000` — увидите список заметок из БД.

## Где в коде запрос к БД

- Prisma singleton: `lib/prisma.ts`
- Чтение Notes и рендер: `app/page.tsx`

## Деплой на Vercel

1) Залейте репозиторий в GitHub/GitLab.

2) В Vercel создайте проект и добавьте **Environment Variable**:

- `DATABASE_URL` — строка подключения Neon (с `sslmode=require`)

3) Чтобы миграции применялись при деплое, в настройках проекта Vercel
поставьте **Build Command**:

```text
npm run db:migrate && npm run build
```

Где `db:migrate` = `prisma migrate deploy`.

4) Seed для production обычно запускают **один раз** вручную (по желанию):

```powershell
# ВНИМАНИЕ: это пишет в указанную БД
$env:DATABASE_URL="postgresql://..."
npm run db:seed
```

## Как создать проект с нуля (команды)

Если вы делаете новый проект, минимальный набор команд такой:

```powershell
New-Item -ItemType Directory -Path .\contentshelf | Out-Null
Set-Location .\contentshelf

npx create-next-app@latest . --ts --app --eslint --empty --use-npm `
  --disable-git --yes

npm install -D prisma@6.19.2
npm install @prisma/client@6.19.2

# Дальше: добавить файлы из этого репозитория:
# - prisma/schema.prisma
# - prisma/seed.mjs
# - lib/prisma.ts
# - app/page.tsx
# - scripts/postinstall.mjs
```
