# 📝 SaaS Notes Application  

A **multi-tenant SaaS Notes Application** built with **Node.js, Express, MongoDB, and React (Vite)**.  
This application allows multiple companies (**tenants**) to securely manage their users and notes, while enforcing **role-based access** and **subscription limits**.  

Deployed on **Vercel** for both frontend and backend.  

---

## 🚀 Features  

### 🔑 Multi-Tenancy  
- Supports multiple tenants: **Acme** and **Globex**.  
- Strict isolation → one tenant’s data can never be accessed by another.  
- **Approach used:** *Shared schema with tenant ID reference.*  
  - Each `User` and `Note` contains a `tenant` field.  
  - All queries are scoped to `tenantId`.  

### 🔒 Authentication & Authorization  
- **JWT-based authentication.**  
- Roles:  
  - **Admin** → can invite users & upgrade subscription.  
  - **Member** → can only create, view, edit, delete notes.  

✅ Predefined test accounts (all passwords: `password`):  
- `admin@acme.test` → Admin (Tenant: Acme)  
- `user@acme.test` → Member (Tenant: Acme)  
- `admin@globex.test` → Admin (Tenant: Globex)  
- `user@globex.test` → Member (Tenant: Globex)  

### 📦 Subscription Plans  
- **Free Plan:** max **3 notes per tenant**.  
- **Pro Plan:** unlimited notes.  
- Upgrade instantly:  
  ```http
  POST /api/tenants/:slug/upgrade
(Admin only).

📝 Notes API (CRUD)
POST /api/notes → Create a note

GET /api/notes → List all notes for current tenant

GET /api/notes/:id → Retrieve a specific note

PUT /api/notes/:id → Update a note

DELETE /api/notes/:id → Delete a note

🖥️ Frontend
Minimal React (Vite) app deployed on Vercel.

Features:

Login with tenant accounts

List, create, delete notes

Show “Upgrade to Pro” banner when Free plan limit is reached

🛠️ Tech Stack
Backend: Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt

Frontend: React (Vite), TailwindCSS

Deployment: Vercel

Other: CORS enabled for API access

⚙️ Setup
Backend
bash
Copy code
cd backend
npm install
npm run seed   # Seed tenants & users
npm run dev    # Start backend
Backend URL → http://localhost:5000

Frontend
bash
Copy code
cd frontend
npm install
npm run dev
Frontend URL → http://localhost:5173

🌐 Deployment
Health Check Endpoint:

http
Copy code
GET /health → { "status": "ok" }
Backend + Frontend hosted on Vercel.

✅ Automated Evaluation Will Verify
Health endpoint availability

Login for all predefined accounts

Tenant isolation

Role-based restrictions (Member cannot invite or upgrade)

Free plan note limit (3 notes max)

Pro plan removes note limit instantly after upgrade

CRUD functionality for notes

Frontend accessibility on Vercel


structure
saas-note-app/
│
├── backend/                     # Node.js + Express + MongoDB (API server)
│   ├── server.js                 # Backend entry point
│   ├── .env                      # Env vars (DB, JWT_SECRET, PORT)
│   ├── package.json
│   │
│   ├── src/
│   │   ├── config/               # Database + config
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/          # Controller layer (business logic)
│   │   │   ├── authController.js
│   │   │   ├── noteController.js
│   │   │   ├── tenantController.js
│   │   │   └── userController.js
│   │   │
│   │   ├── middleware/           # Middlewares (auth, error, role-based)
│   │   │   ├── authMiddleware.js
│   │   │   ├── adminMiddleware.js
│   │   │   └── errorMiddleware.js
│   │   │
│   │   ├── models/               # Mongoose models
│   │   │   ├── Tenant.js
│   │   │   ├── User.js
│   │   │   └── Note.js
│   │   │
│   │   ├── routes/               # Express routes
│   │   │   ├── authRoutes.js
│   │   │   ├── noteRoutes.js
│   │   │   └── tenantRoutes.js
│   │   │
│   │   ├── utils/                # Utility scripts
│   │   │   └── seeder.js         # Seeder for tenants & users
│   │   │
│   │   └── app.js                # Express app config
│   │
│   └── package-lock.json
│
├── frontend/                     # React (Vite + TailwindCSS) app
│   ├── index.html                # HTML template
│   ├── package.json
│   ├── package-lock.json
│   │
│   ├── src/
│   │   ├── api/                  # API calls (axios/fetch wrappers)
│   │   │   └── s.js
│   │   │
│   │   ├── auth/                 # Auth context
│   │   │   └── Context.jsx
│   │   │
│   │   ├── components/           # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Notecard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages/                # Pages (mapped to routes)
│   │   │   ├── Login.jsx
│   │   │   ├── Notes.jsx
│   │   │   ├── InviteUser.jsx
│   │   │   └── Upgrade.jsx
│   │   │
│   │   ├── routes/               # Custom routing helpers
│   │   │   └── PrivateRoute.jsx
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └public
│       
│
└── README.md
