<div align="center">

# 🚀 NextStep Careers

### A modern full-stack job portal connecting recruiters and candidates — built with React, Supabase & Clerk.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-next--step--careers.netlify.app-brightgreen?style=for-the-badge&logo=netlify)](https://next-step-careers.netlify.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite)](https://vite.dev)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk)](https://clerk.com)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

</div>

---

## 📌 Live Demo

🌐 **[https://next-step-careers.netlify.app](https://next-step-careers.netlify.app)**

---

## 📸 Screenshots

> Sign up, browse jobs, apply, and manage postings — all in one place.

| Home Page | Job Listings | Job Detail |
|---|---|---|
| Hero section with role-based CTA | Multi-filter search by title, company & state | Full job description with Markdown requirements |

---

## ✨ Features

### 👤 For Candidates
- 🔐 Secure sign-up/login via Clerk authentication
- 🔍 Browse and search jobs with live filtering by **title**, **company**, and **Indian state**
- 📄 Apply to jobs by submitting name, email, and **PDF resume** (uploaded to Supabase Storage)
- 🔖 Save/unsave jobs for later review
- ✅ Duplicate application prevention — can't apply to the same job twice

### 🏢 For Recruiters
- 📝 Post jobs with a **Markdown-powered requirements editor** (`@uiw/react-md-editor`)
- 🔄 Toggle hiring status (Open / Closed) per job listing in real time
- 👥 View all applicants for each job with resume download links
- ✔️ Accept or reject applications directly from the dashboard

### 🔒 Auth & Access Control
- Role-based onboarding — users select **Candidate** or **Recruiter** on first login
- Route-level protection — all pages guarded by auth + role checks
- Automatic redirect to onboarding if role is not set

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Frontend** | React 19, React Router DOM v7 |
| **Build Tool** | Vite 7 |
| **Styling** | TailwindCSS v4 |
| **Authentication** | Clerk (`@clerk/clerk-react`) |
| **Database** | Supabase (PostgreSQL) |
| **File Storage** | Supabase Storage (resume uploads) |
| **Rich Text** | @uiw/react-md-editor |
| **Location Data** | country-state-city |
| **Icons** | Lucide React |
| **Deployment** | Netlify |

---

## 🏗️ Architecture

This is a **serverless, frontend-only** application — no custom backend or Express server required.

```
Browser (React + Vite)
    │
    ├── Clerk  →  Authentication & JWT token generation
    │
    └── Supabase  →  PostgreSQL Database + File Storage
            │
            ├── jobs          (job postings)
            ├── companies     (company profiles)
            ├── applications  (candidate applications)
            ├── saved_jobs    (bookmarked jobs)
            └── resumes       (Supabase Storage bucket)
```

### Key Design Decisions

- **Custom `useFetch` hook** — abstracts Clerk session token retrieval and injects it as a Supabase `Authorization` Bearer header on every request, enabling Row Level Security (RLS) without a backend.
- **JWT Template Integration** — Clerk issues a signed JWT using the Supabase signing secret, allowing Supabase RLS policies to identify and scope data per user.
- **Supabase Query Builder** — server-side filtering using `.eq()`, `.ilike()` and relational joins (`company:companies(name,logo_url)`) in a single query — no N+1 fetching.

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>=18`
- A [Supabase](https://supabase.com) project
- A [Clerk](https://clerk.com) application

### 1. Clone the Repository

```bash
git clone https://github.com/VikasGurjar94/NextStep-Careers.git
cd NextStep-Careers
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

### 4. Configure Supabase

Create the following tables in your Supabase project:

**`companies`**
```sql
id          bigint (PK, auto-increment)
name        text
logo_url    text
```

**`jobs`**
```sql
id            uuid (PK, default gen_random_uuid())
title         text
description   text
location      text
requirements  text
company_id    bigint (FK → companies.id)
recruiter_id  text   (Clerk user ID)
isOpen        boolean (default true)
created_at    timestamptz (default now())
```

**`applications`**
```sql
id            uuid (PK)
job_id        uuid (FK → jobs.id)
candidate_id  text   (Clerk user ID)
name          text
resume        text   (Supabase Storage public URL)
status        text   (pending / accepted / rejected)
```

**`saved_jobs`**
```sql
id       uuid (PK)
job_id   uuid (FK → jobs.id)
user_id  text (Clerk user ID)
```

### 5. Configure Clerk JWT Template

In Clerk Dashboard → **JWT Templates** → **New template**:
- Name: `supabase` (exact match required)
- Signing key: Your Supabase JWT Secret (`Settings → API → JWT Secret`)

### 6. Run Locally

```bash
npm run dev
```

Visit `http://localhost:5173`

---

## 📁 Project Structure

```
src/
├── components/
│   ├── api/
│   │   ├── apiJobs.js          # Job CRUD operations
│   │   ├── apiApplications.js  # Application submit & status update
│   │   └── apiCompanies.js     # Fetch company list
│   ├── hooks/
│   │   └── UseFetch.jsx        # Custom hook: Clerk token + async data fetching
│   ├── data/
│   │   ├── companyCarouselData.jsx
│   │   └── faq.js
│   ├── Header.jsx
│   ├── Home.jsx
│   ├── JobCard.jsx
│   ├── ProtectedRoute.jsx      # Auth + role guard for all routes
│   ├── Accordion.jsx
│   ├── Carousel.jsx
│   └── ButtonMain.jsx
├── pages/
│   ├── Job.jsx          # Job detail, apply, recruiter applicant management
│   ├── JobListings.jsx  # Browse + filter jobs
│   ├── PostJob.jsx      # Recruiter: create job with MD editor
│   ├── MyJobs.jsx       # Recruiter: view own postings
│   ├── Saved.jsx        # Candidate: saved jobs
│   └── Onboarding.jsx   # Role selection on first login
├── utils/
│   └── supabase.js      # Supabase client factory (with Clerk auth header)
├── App.jsx
└── main.jsx
```

---

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY` | Supabase anon/public key |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key (`pk_live_` for production) |

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

---

## 🌐 Deployment

This project is deployed on **Netlify**. The `public/_redirects` file handles SPA client-side routing:

```
/* /index.html 200
```

To deploy your own instance:
1. Fork this repo
2. Connect to Netlify via GitHub
3. Set build command: `npm run build`, publish directory: `dist`
4. Add all environment variables in Netlify → Site configuration → Environment variables

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Vikas Gurjar**

[![GitHub](https://img.shields.io/badge/GitHub-VikasGurjar94-181717?style=flat&logo=github)](https://github.com/VikasGurjar94)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  Made with ❤️ by Vikas Gurjar
</div>
