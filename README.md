# FutBrain ⚽🧠

**Отключи своя футболен интелект.**

FutBrain е динамично уеб приложение, създадено за страстни футболни фенове. Това е нещо повече от обикновен уебсайт; това е общностен център, където потребителите могат да обсъждат последните новини, да анализират представянето на играчите, да гласуват за своите фаворити и да разглеждат специализиран магазин за футболни аксесоари.

Изграден с модерен технологичен стек и задвижван от изкуствен интелект, FutBrain осигурява безопасна и ангажираща среда за всеки футболен ентусиаст.

---

## 🌟 Функционалности

### За потребители
- **Общностен форум**: Създавайте, четете и се включвайте в дискусии. Споделяйте мислите си и се присъединете към общността.
- **База данни с играчи**: Разглеждайте подробни профили на футболни играчи и клубове.
- **Интерактивно гласуване**: Участвайте в класациите за "Играч на седмицата" и анкети на общността.
- **Магазин FutBrain**: Разгледайте и открийте футболни аксесоари и екипировка.
- **Персонализирани профили**: Управлявайте акаунта си, качвайте профилна снимка и следете своите приноси.
- **Контакт с поддръжката**: Вградена система за съобщения за връзка с екипа.

### За администратори
- **Модерация на съдържанието**: Мощна модерация, задвижвана от AI, за поддържане на добрия тон в общността.
- **Контролно табло**: Управлявайте цялата платформа, преглеждайте доклади и следете активността.
- **Управление на базата данни**: Добавяйте, актуализирайте или премахвайте играчи, аксесоари и публикации безпроблемно.
- **Система за доклади**: Обработвайте потребителски доклади и поддържайте интегритета на платформата.

### 🤖 AI Интеграция
FutBrain използва **Google Gemini AI** (чрез `gemini-2.5-flash-lite`) за автоматична модерация на съдържанието. Нашият персонализиран AI агент филтрира реч на омразата, обиди и спам на български език, осигурявайки високо качество на дискусиите.

---

## 🛠️ Технологичен стек

### Фронтенд (Frontend)
- **React 19** с **TypeScript**
- **Vite** (Следващо поколение инструменти за фронтенд)
- **React Router 7** за навигация
- **React Toastify** за интерактивни известия
- **Vanilla CSS** с модерен дизайн

### Бекенд (Backend)
- **Node.js** & **Express**
- **TypeScript** за типизирана сървърна логика
- **MongoDB** с **Mongoose** (ODM)
- **JWT** (JSON Web Tokens) & **Cookies** за сигурна автентификация
- **Multer** за управление на качванията на изображения
- **Nodemailer** за имейл услуги
- **Google Generative AI SDK** за модерация на съдържанието

---

## 🚀 Първи стъпки

Следвайте тези стъпки, за да настроите проекта локално.

### Предварителни изисквания
- [Node.js](https://nodejs.org/) (препоръчително v18 или по-нова версия)
- [MongoDB](https://www.mongodb.com/) (Локална инсталация или Atlas URI)
- Google Gemini API Key (Опционално, за функциите за модерация)

### 1. Клониране на хранилището
```bash
git clone https://github.com/your-username/FutBrain.git
cd FutBrain
```

### 2. Настройка на бекенда
Бекендът се намира в директорията `src/`.

```bash
# Влезте в папката на бекенда
cd src

# Инсталирайте зависимостите
npm install

# Създайте .env файл
touch .env
```

Добавете следните променливи в `src/.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
VITE_FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 3. Настройка на фронтенда
Фронтендът се намира в директорията `frontend/`.

```bash
# Влезте в папката на фронтенда
cd ../frontend

# Инсталирайте зависимостите
npm install

# Създайте .env файл
touch .env
```

Добавете следната променлива в `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000
```

### 4. Стартиране на приложението

**Стартиране на бекенда:**
```bash
# В директория src/
tsc # (Ако е необходимо)
npm start
```

**Стартиране на фронтенда:**
```bash
# В директория frontend/
npm run dev
```

Отворете браузъра си на `http://localhost:5173`.

---

## 📁 Структура на проекта

```text
FutBrain/
├── frontend/           # React + Vite приложение
│   ├── src/
│   │   ├── auth/       # Аутентификация
│   │   ├── components/ # Компоненти за многократна употреба
│   │   ├── pages/      # Страници на приложението
│   │   └── styles/     # CSS файлове
├── src/                # Express бекенд
│   ├── controllers/    # Хендлъри на заявки
│   ├── models/         # MongoDB схеми
│   ├── routes/         # API ендпойнти
│   ├── services/       # Бизнес логика (AI, Auth и т.н.)
│   └── uploads/        # Съхранени изображения
└── README.md
```

---

## 📄 Лиценз
Този проект е лицензиран под ISC лиценз.

Разработено с ❤️ за футболната общност.

---
---

# FutBrain ⚽🧠

**Unlock your football intelligence.**

FutBrain is a dynamic web application designed for passionate football fans. It's more than just a website; it's a community hub where users can discuss the latest news, analyze player performances, vote for their favorites, and explore a specialized store for football accessories.

Built with a modern tech stack and powered by AI, FutBrain ensures a safe and engaging environment for every football enthusiast.

---

## 🌟 Features

### For Users
- **Community Forum**: Create, read, and engage with posts. Share your thoughts and join the discussion.
- **Player Database**: Explore detailed profiles of football players and clubs.
- **Interactive Voting**: Participate in "Player of the Week" rankings and community polls.
- **FutBrain Store**: Browse and discover football-related accessories and gear.
- **Personalized Profiles**: Manage your account, upload a profile picture, and track your contributions.
- **Contact Support**: Built-in messaging system to reach out to the team.

### For Admins
- **Content Moderation**: Powerful AI-driven moderation to keep the community respectful.
- **Dashboard**: Oversee the entire platform, manage reports, and monitor activity.
- **Database Management**: Add, update, or remove players, accessories, and posts seamlessly.
- **Report System**: Handle user reports and maintain platform integrity.

### 🤖 AI Integration
FutBrain leverages **Google Gemini AI** (via `gemini-2.5-flash-lite`) to automatically moderate community content. Our custom AI agent filters out hate speech, insults, and spam in Bulgarian, ensuring a high-quality discussion environment.

---

## 🛠️ Tech Stack

### Frontend
- **React 19** with **TypeScript**
- **Vite** (Next-generation frontend tooling)
- **React Router 7** for navigation
- **React Toastify** for interactive notifications
- **Vanilla CSS** with modern layouts

### Backend
- **Node.js** & **Express**
- **TypeScript** for type-safe server-side logic
- **MongoDB** with **Mongoose** (ODM)
- **JWT** (JSON Web Tokens) & **Cookies** for secure authentication
- **Multer** for handling image uploads
- **Nodemailer** for email services
- **Google Generative AI SDK** for content moderation

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or Atlas URI)
- A Google Gemini API Key (Optional, for moderation features)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/FutBrain.git
cd FutBrain
```

### 2. Backend Setup
The backend is located in the `src/` directory.

```bash
# Navigate to the backend folder
cd src

# Install dependencies
npm install

# Create a .env file
touch .env
```

Add the following environment variables to `src/.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
VITE_FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 3. Frontend Setup
The frontend is located in the `frontend/` directory.

```bash
# Navigate to the frontend folder
cd ../frontend

# Install dependencies
npm install

# Create a .env file
touch .env
```

Add the following environment variable to `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000
```

### 4. Running the Application

**Start the Backend:**
```bash
# In the src/ directory
tsc # (Only if needed)
npm run start
```

**Start the Frontend:**
```bash
# In the frontend/ directory
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

---

## 📁 Project Structure

```text
FutBrain/
├── frontend/           # React + Vite application
│   ├── src/
│   │   ├── auth/       # Authentication context & routes
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Application views
│   │   └── styles/     # CSS files
├── src/                # Express backend
│   ├── controllers/    # Request handlers
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API endpoints
│   ├── services/       # Business logic (AI, Auth, etc.)
│   └── uploads/        # Stored images
└── README.md
```

---

## 📄 License
This project is licensed under the ISC License.

Developed with ❤️ for the football community.
