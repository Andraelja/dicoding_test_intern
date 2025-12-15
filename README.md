# Dicoding Jobs Platform

Platform lowongan kerja yang dibangun dengan Laravel (backend) dan Next.js (frontend) untuk membantu pengguna menemukan pekerjaan yang sesuai dengan kebutuhan mereka.

## 📋 Daftar Isi

- [Tentang Proyek](#tentang-proyek)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Fitur](#fitur)
- [Persyaratan Sistem](#persyaratan-sistem)
- [Instalasi dan Setup](#instalasi-dan-setup)
- [Konfigurasi Environment](#konfigurasi-environment)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [API Endpoints](#api-endpoints)
- [Struktur Proyek](#struktur-proyek)
- [Testing](#testing)
- [Deployment](#deployment)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)

## 🎯 Tentang Proyek

Dicoding Jobs Platform adalah aplikasi web full-stack yang memungkinkan pengguna untuk:
- Melihat daftar lowongan kerja terbaru
- Mencari lowongan berdasarkan kata kunci
- Admin dapat mengelola lowongan kerja (CRUD)
- Sistem autentikasi untuk admin dan user biasa

Backend menggunakan Laravel untuk menyediakan API RESTful, sementara frontend menggunakan Next.js untuk pengalaman user yang modern dan responsif.

## 🛠 Teknologi yang Digunakan

### Backend (Laravel)
- **Laravel Framework** v12.0
- **PHP** ^8.2
- **Laravel Sanctum** untuk autentikasi API
- **MySQL/SQLite** untuk database
- **Composer** untuk dependency management

### Frontend (Next.js)
- **Next.js** v16.0.10
- **React** v19.2.1
- **TypeScript** untuk type safety
- **Tailwind CSS** untuk styling
- **TanStack Query** untuk state management dan API calls
- **Axios** untuk HTTP requests
- **Lucide React** untuk icons

### Development Tools
- **ESLint** untuk code linting
- **Prettier** untuk code formatting
- **Vite** untuk build tool (backend)

## ✨ Fitur

### Untuk User Biasa
- ✅ Melihat daftar lowongan kerja
- ✅ Pencarian lowongan berdasarkan kata kunci
- ✅ Melihat detail lowongan kerja
- ✅ Registrasi dan login

### Untuk Admin
- ✅ Semua fitur user biasa
- ✅ Membuat lowongan kerja baru
- ✅ Mengedit lowongan kerja
- ✅ Menghapus lowongan kerja
- ✅ Mengelola posisi/jabatan

## 📋 Persyaratan Sistem

- **PHP** >= 8.2
- **Node.js** >= 18.0.0
- **Composer** >= 2.0
- **npm** atau **yarn**
- **MySQL** atau **SQLite**

## 🚀 Instalasi dan Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd dicoding_tes
```

### 2. Setup Backend (Laravel)
```bash
cd backend

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Setup database (jalankan salah satu)
# Untuk MySQL:
# Buat database di MySQL terlebih dahulu
php artisan migrate --seed

# Untuk SQLite (default):
touch database/database.sqlite
php artisan migrate --seed
```

### 3. Setup Frontend (Next.js)
```bash
cd ../frontend

# Install Node.js dependencies
npm install
```

## ⚙️ Konfigurasi Environment

### Backend (.env)
```env
APP_NAME="Dicoding Jobs API"
APP_ENV=local
APP_KEY=base64:generated-key
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite
DB_DATABASE=/absolute/path/to/database/database.sqlite

# Atau untuk MySQL:
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=dicoding_jobs
# DB_USERNAME=your_username
# DB_PASSWORD=your_password

SANCTUM_STATEFUL_DOMAINS=localhost:3000
```

### Frontend
Frontend akan mengambil API URL dari `lib/api.tsx`. Pastikan base URL mengarah ke backend yang berjalan.

## ▶️ Menjalankan Aplikasi

### Development Mode
```bash
# Terminal 1: Backend
cd backend
composer run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

### Production Build
```bash
# Backend
cd backend
composer run setup

# Frontend
cd frontend
npm run build
npm start
```

Aplikasi akan berjalan di:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000

## 📡 API Endpoints

### Authentication
- `POST /api/register` - Registrasi user baru
- `POST /api/login` - Login user
- `POST /api/logout` - Logout (perlu autentikasi)

### Vacancies (Lowongan Kerja)
- `GET /api/vacancies` - List semua lowongan
- `GET /api/vacancies/search?search=keyword` - Pencarian lowongan
- `GET /api/vacancies/{id}` - Detail lowongan
- `POST /api/vacancies` - Buat lowongan baru (Admin only)
- `PUT /api/vacancies/{id}` - Update lowongan (Admin only)
- `DELETE /api/vacancies/{id}` - Hapus lowongan (Admin only)

### Positions (Posisi/Jabatan)
- `GET /api/positions` - List semua posisi (Admin only)

### Authentication Headers
Untuk endpoint yang memerlukan autentikasi:
```
Authorization: Bearer {token}
Accept: application/json
```

## 📁 Struktur Proyek

```
dicoding_tes/
├── backend/                    # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   ├── Models/
│   │   ├── Services/
│   │   └── Traits/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/api.php
│   └── composer.json
├── frontend/                   # Next.js App
│   ├── app/                    # Next.js 13+ app directory
│   │   ├── admin/
│   │   ├── jobs/
│   │   ├── login/
│   │   └── register/
│   ├── components/
│   ├── lib/
│   └── package.json
└── README.md
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
php artisan test
```

### Frontend Tests
```bash
cd frontend
npm run lint
```

## 🚀 Deployment

### Backend (Laravel)
1. Setup server dengan PHP 8.2+
2. Upload kode ke server
3. Jalankan `composer install --optimize-autoloader --no-dev`
4. Setup environment variables
5. Jalankan `php artisan migrate --force`
6. Setup web server (Apache/Nginx) untuk serve `public/` directory

### Frontend (Next.js)
1. Build aplikasi: `npm run build`
2. Deploy ke Vercel/Netlify atau server static hosting
3. Pastikan API URL mengarah ke backend yang sudah di-deploy

## 🤝 Kontribusi

1. Fork repository
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 Lisensi

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Kontak

- **Developer**: Andra Elja Prama
- **Email**: andraeljaprama@gmail.com

---
