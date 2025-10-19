# 🐾 WhiskerTails

**WhiskerTails** — мой pet-проект, разработанный на стеке **Next.js + TypeScript + Tailwind CSS & HeroUI + Prisma**.  
Проект представляет собой платформу для управления профилями животных, с авторизацией, формами, загрузкой изображений и отправкой писем через Nodemailer.  
В процессе работы я освоил работу с современным стэком для fullstack-приложений, а также интеграцию с базой данных через Prisma.

---

## 🧰 Технологический стек

**Frontend:** Next.js, React, TypeScript, Tailwind CSS, HeroUI, Framer Motion  
**Backend:** Next.js API Routes, Node.js, Prisma (PostgreSQL)  
**Прочее:** NextAuth.js, Nodemailer, Zod, Zustand, bcryptjs, sharp  

---

## 🚀 Основной функционал

- 🐱 Управление профилями животных
- 🔐 Авторизация и аутентификация через **NextAuth.js + Prisma**
- 📧 Отправка писем через **Nodemailer**
- 📦 Валидация данных с **Zod**
- 🎨 UI/UX с **Tailwind CSS** и **HeroUI**, анимации через **Framer Motion**
- ⚡ Управление состоянием через **Zustand**
- 🖼️ Загрузка и обработка изображений через **Sharp**

---

## ⚙️ Настройки окружения

Проект использует **Prisma**, **NextAuth** и **Nodemailer*, поэтому для запуска нужно создать `.env`  и `.local.env`в корне проекта с примерно такими переменными:

```env
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=your_api_key"
```

```local.env
AUTH_URL="your_auth_url"
AUTH_SECRET="your_auth_secret"

YANDEX_USER="your_email@example.com"
YANDEX_PASS="your_email_password"
```
---

## 📦 Команды для запуска и сборки

```bash
# 🧑‍💻 Клонирование репозитория
git clone https://github.com/gschernyshov/whiskerstails.git
cd whiskerstails

# 📦 Установка зависимостей
npm install

# 🏗️ Сборка проекта для продакшена
npm run build

# 🚀 Запуск сервера в продакшене
npm run start

# ⚙️ Запуск проекта в режиме разработки (Next.js + Turbopack)
npm run dev
```