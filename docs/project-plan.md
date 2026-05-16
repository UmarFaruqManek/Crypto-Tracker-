# Roadmap Project - Crypto Savings Tracker

Dokumentasi tahap-tahap development project Crypto Savings Tracker.

## 📊 Overview

Project ini akan dikembangkan dalam 9 tahap, dari prototype sederhana hingga full-stack application dengan database.

---

## 🎯 Tahap Development

### ✅ Tahap 1: Rapikan Folder Prototype

**Status**: SELESAI

**Tujuan**:

- Reorganisir file struktur
- Memisahkan CSS dan JS dari HTML
- Persiapkan untuk migrasi React

**Deliverables**:

- Folder structure rapi
- HTML dengan path referensi yang benar
- File dokumentasi project

**File yang dihasilkan**:

- `prototype/index.html`
- `prototype/css/style.css`
- `prototype/js/index.js`
- `README.md`
- `docs/project-plan.md`
- `docs/feature-list.md`

---

### ⏳ Tahap 2: Setup Frontend React

**Status**: TODO

**Durasi estimasi**: 1-2 minggu

**Tujuan**:

- Setup project React (Vite atau Create React App)
- Konfigurasi routing
- Setup styling system
- Setup folder structure

**Tasks**:

- [ ] Initialize Vite/CRA project di folder `client/`
- [ ] Setup React Router
- [ ] Setup Tailwind CSS atau CSS Modules
- [ ] Buat folder structure components
- [ ] Setup global state management (Context API)
- [ ] Setup API service layer

**Deliverables**:

- React project siap development
- Folder structure untuk components
- Configurasi build tools

---

### ⏳ Tahap 3: Konversi UI ke React Components

**Status**: TODO

**Durasi estimasi**: 2-3 minggu

**Tujuan**:

- Breakdown UI menjadi React components
- Konversi dari HTML statis ke JSX
- Tidak mengubah styling atau layout

**Tasks**:

- [ ] Buat Layout component (Sidebar, Topbar)
- [ ] Buat Page components (Dashboard, Transactions, Assets, etc)
- [ ] Buat Card components (SummaryCard, AssetCard, etc)
- [ ] Buat Form components (TransactionForm)
- [ ] Buat Table component (TransactionTable)
- [ ] Render semua components dengan dummy data

**Deliverables**:

- React UI yang sama persis dengan prototype
- Reusable components
- Props documentation

---

### ⏳ Tahap 4: Pindahkan Logic ke React State

**Status**: TODO

**Durasi estimasi**: 2 minggu

**Tujuan**:

- Extract logic JavaScript dari prototype
- Integrate ke React state
- Setup transaction management

**Tasks**:

- [ ] Setup Context untuk transactions
- [ ] Implement add/edit/delete transaction
- [ ] Implement search functionality
- [ ] Setup LocalStorage dengan React
- [ ] Implement toast notifications
- [ ] Implement form validation
- [ ] Implement responsive behavior

**Deliverables**:

- Fully functional React frontend
- Transaction CRUD operations
- LocalStorage persistence
- Form validation

---

### ⏳ Tahap 5: Setup Backend Node.js + Express

**Status**: TODO

**Durasi estimasi**: 1-2 minggu

**Tujuan**:

- Setup server Express
- Setup folder structure backend
- Setup routing skeleton
- Setup middleware

**Tasks**:

- [ ] Initialize Node.js project di folder `server/`
- [ ] Setup Express server
- [ ] Setup routing structure
- [ ] Setup error handling middleware
- [ ] Setup CORS
- [ ] Setup environment variables
- [ ] Setup logging

**Deliverables**:

- Express server berjalan
- Routing structure
- Basic middleware setup

---

### ⏳ Tahap 6: Buat API Transaksi

**Status**: TODO

**Durasi estimasi**: 2-3 minggu

**Tujuan**:

- Buat API endpoints untuk semua operasi transaksi
- API-first development

**Tasks**:

- [ ] GET /api/transactions - List transactions
- [ ] POST /api/transactions - Create transaction
- [ ] GET /api/transactions/:id - Get single transaction
- [ ] PUT /api/transactions/:id - Update transaction
- [ ] DELETE /api/transactions/:id - Delete transaction
- [ ] POST /api/transactions/search - Search transactions
- [ ] Implement validation
- [ ] Implement error handling

**API Documentation**:

```
GET    /api/transactions
POST   /api/transactions
GET    /api/transactions/:id
PUT    /api/transactions/:id
DELETE /api/transactions/:id
GET    /api/transactions/search?q=BTC
```

**Deliverables**:

- REST API endpoints
- Request/response validation
- Error handling

---

### ⏳ Tahap 7: Hubungkan React ke API Backend

**Status**: TODO

**Durasi estimasi**: 1-2 minggu

**Tujuan**:

- Replace LocalStorage dengan API calls
- Implementasi HTTP requests
- Error handling

**Tasks**:

- [ ] Setup Axios client
- [ ] Replace LocalStorage dengan API calls
- [ ] Implement loading states
- [ ] Implement error states
- [ ] Setup error boundaries
- [ ] Add retry logic
- [ ] Implement optimistic updates

**Deliverables**:

- React frontend terhubung dengan backend
- Proper loading/error states
- User feedback for async operations

---

### ⏳ Tahap 8: Setup Database & Persistensi

**Status**: TODO

**Durasi estimasi**: 2-3 minggu

**Tujuan**:

- Setup database (PostgreSQL/MongoDB)
- Migrasi data dari LocalStorage
- Implement persistent storage

**Tasks**:

- [ ] Choose database (PostgreSQL/MongoDB)
- [ ] Setup database connection
- [ ] Design schema/collections
- [ ] Setup ORM (Sequelize/TypeORM/Prisma)
- [ ] Create models
- [ ] Create migrations
- [ ] Implement repository layer
- [ ] Update API untuk menggunakan database

**Deliverables**:

- Database setup
- Data models
- Persistent storage
- Migration scripts

---

### ⏳ Tahap 9: Finalisasi & Enhancement

**Status**: TODO

**Durasi estimasi**: 1-2 minggu

**Tujuan**:

- Polishing
- Testing
- Documentation
- Deployment preparation

**Tasks**:

- [ ] Setup authentication (JWT)
- [ ] Add comprehensive testing
- [ ] Performance optimization
- [ ] Security hardening
- [ ] API documentation (Swagger)
- [ ] Deployment setup (Docker, Vercel, Heroku)
- [ ] Setup CI/CD pipeline
- [ ] Final QA testing

**Deliverables**:

- Production-ready application
- Full test coverage
- Complete documentation
- Deployment ready

---

## 📅 Timeline Estimasi

```
Tahap 1: ✅ Selesai (1 hari)
Tahap 2: ⏳ 1-2 minggu
Tahap 3: ⏳ 2-3 minggu
Tahap 4: ⏳ 2 minggu
Tahap 5: ⏳ 1-2 minggu
Tahap 6: ⏳ 2-3 minggu
Tahap 7: ⏳ 1-2 minggu
Tahap 8: ⏳ 2-3 minggu
Tahap 9: ⏳ 1-2 minggu
---------------------------------
Total: 13-20 minggu (~3-5 bulan)
```

## 🎓 Learning Goals

Setiap tahap dirancang untuk belajar:

- **Tahap 1**: Folder structure organization
- **Tahap 2**: React ecosystem setup
- **Tahap 3**: Component-based architecture
- **Tahap 4**: State management
- **Tahap 5**: Backend fundamentals
- **Tahap 6**: REST API design
- **Tahap 7**: Frontend-Backend integration
- **Tahap 8**: Database design & operations
- **Tahap 9**: Testing, deployment, DevOps

## ✅ Checklist

- [x] Tahap 1: Rapikan folder prototype
- [ ] Tahap 2: Setup Frontend React
- [ ] Tahap 3: Konversi UI ke React Components
- [ ] Tahap 4: Pindahkan logic ke React State
- [ ] Tahap 5: Setup Backend Node.js
- [ ] Tahap 6: Buat API Transaksi
- [ ] Tahap 7: Hubungkan React ke API
- [ ] Tahap 8: Setup Database
- [ ] Tahap 9: Finalisasi & Enhancement

---

**Last Updated**: May 2026  
**Next Phase**: Tahap 2 - Setup Frontend React
