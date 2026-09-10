# Huffman Heating & Air Conditioning

Full-stack Next.js website with MongoDB CMS admin panel for Huffman Heating & Air Conditioning.

## Tech Stack

- **Frontend & Backend:** Next.js 16 (App Router)
- **Database:** MongoDB Atlas
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Auth:** JWT (httpOnly cookies)

## Getting Started

### 1. Install dependencies

```bash
cd huffman-heating
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env.local` and update:

```env
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/huffman-heating
ADMIN_EMAIL=admin@huffmanheating.net
ADMIN_PASSWORD=HuffmanAdmin2026!
JWT_SECRET=your-super-secret-jwt-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Seed the database

```bash
npm run dev
```

Then visit: `http://localhost:3000/api/seed` (POST request)

Or run in browser console:
```js
fetch('/api/seed', { method: 'POST' }).then(r => r.json()).then(console.log)
```

### 4. Run development server

```bash
npm run dev
```

- **Website:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin/login

### Admin Login
- Email: `admin@huffmanheating.net`
- Password: `HuffmanAdmin2026!`

## Pages

| Page | URL |
|------|-----|
| Home | `/` |
| About Us | `/about` |
| Services | `/services` |
| Service Detail | `/services/[slug]` |
| Gallery | `/gallery` |
| Our Team | `/team` |
| Testimonials | `/testimonials` |
| FAQs | `/faqs` |
| Contact | `/contact` |

## Admin Panel

Access at `/admin/login` with sidebar navigation:

- **Dashboard** — Site stats and recent leads
- **Pages** — Edit all page content section-by-section with images
- **Services** — Add/edit/delete services with listing + detail page tabs
- **Gallery** — Manage categories and images
- **Testimonials** — Add/edit customer reviews
- **FAQs** — Manage questions and answers
- **Settings** — Contact info, social links, special offers (updates footer & contact page)

## Image Uploads

Images are stored in MongoDB (not local disk) — works on Vercel/serverless:

- Upload via admin panel → stored in `StoredUpload` collection
- Served at `/api/uploads/[folder]/[filename]`
- Folders: `products`, `gallery`, `pages`, `misc`

## Adding Your Images

Place service images in `public/images/services/` and gallery images in `public/images/gallery/`, then upload via admin panel or reference paths directly.

For videos on homepage, edit the Home page in admin → `video` section → set video URL in extra field.

## Deploy to Vercel

1. Push to GitHub
2. Import in Vercel
3. Add environment variables from `.env.local`
4. Deploy
5. Run seed endpoint once after deploy

## Project Structure

```
src/
├── app/
│   ├── (public)/          # Public website pages
│   ├── admin/             # Admin CMS panel
│   └── api/               # API routes
├── components/
│   ├── admin/             # Admin components
│   ├── layout/            # Header, Footer, Intro
│   └── ui/                # Reusable UI components
├── lib/                   # Utilities, auth, upload
└── models/                # Mongoose models
```
