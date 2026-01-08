# Telfera.kz — Industrial Hoists Catalog + CRM

A production-ready Next.js 14 application for selling industrial hoists (тельферы) in Kazakhstan, with an integrated CRM system.

## 🚀 Features

### Public Website
- **Landing Page**: Hero section, features, product preview, FAQ (optimized for AI search)
- **Product Catalog**: Category filtering (Bulgarian/SHA8), detailed product pages
- **Contacts**: Contact form, map, delivery info
- **SEO Optimized**: Dynamic metadata, Schema.org JSON-LD, sitemap, robots.txt
- **GEO Ready**: Structured content for AI/LLM parsing

### Admin CRM
- **Dashboard**: Key metrics, lead statistics, conversion rates
- **Lead Management**: Status tracking, assignment, notes
- **Inventory**: Product catalog management
- **Audit Logs**: Complete action history

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS + Shadcn/ui
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js v5
- **Logging**: Winston

## 📦 Installation

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- pnpm (recommended) or npm

### Setup

1. **Clone and install dependencies**
```bash
git clone https://github.com/your-repo/telfera.kz.git
cd telfera.kz
pnpm install
```

2. **Configure environment**
```bash
cp env.example.txt .env
```

Edit `.env` with your values:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/telfera"
AUTH_SECRET="your-super-secret-key-min-32-chars"
AUTH_URL="http://localhost:3000"
SITE_URL="https://telfera.kz"
```

3. **Initialize database**
```bash
pnpm db:push    # Create tables
pnpm db:seed    # Seed demo data
```

4. **Start development server**
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔐 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@telfera.kz | admin123 |
| Manager | manager@telfera.kz | manager123 |
| Director | director@telfera.kz | director123 |

## 📁 Project Structure

```
src/
├── app/
│   ├── (public)/          # Public website
│   │   ├── page.tsx       # Landing page
│   │   ├── catalog/       # Product catalog
│   │   └── contacts/      # Contact page
│   ├── (admin)/           # Protected CRM
│   │   └── admin/
│   │       ├── dashboard/ # Analytics
│   │       ├── leads/     # Lead management
│   │       ├── inventory/ # Products
│   │       └── logs/      # Audit logs
│   ├── login/             # Auth page
│   └── api/auth/          # NextAuth routes
├── components/
│   ├── ui/                # Shadcn components
│   ├── public/            # Public site components
│   ├── admin/             # CRM components
│   └── forms/             # Form components
├── lib/
│   ├── prisma.ts          # DB client
│   ├── auth.ts            # Auth config
│   ├── logger.ts          # Winston logger
│   └── utils.ts           # Helpers
├── server/
│   └── actions/           # Server Actions
├── hooks/                 # React hooks
└── types/                 # TypeScript types
```

## 🗃️ Database Schema

```prisma
model User {
  id, email, passwordHash, role (ADMIN/MANAGER/DIRECTOR), name
}

model Product {
  id, slug, name, category (BULGARIAN/SHA8), description, specs (JSON), images
}

model Lead {
  id, status (NEW/IN_PROGRESS/OFFER_SENT/PAID/CLOSED/REJECTED), 
  clientName, clientPhone, clientEmail, source, assignedTo
}

model AuditLog {
  id, action, entity, entityId, userId, details (JSON), timestamp
}
```

## 🚢 Deployment

### VPS Deployment (Recommended)

1. **Server Setup**
```bash
# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Install PM2
sudo npm install -g pm2
```

2. **Deploy Application**
```bash
# Clone repository
git clone https://github.com/your-repo/telfera.kz.git
cd telfera.kz

# Install dependencies
npm install

# Build
npm run build

# Start with PM2
pm2 start npm --name "telfera" -- start
pm2 save
pm2 startup
```

3. **Nginx Configuration**
```nginx
server {
    listen 80;
    server_name telfera.kz www.telfera.kz;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

4. **SSL with Certbot**
```bash
sudo certbot --nginx -d telfera.kz -d www.telfera.kz
```

## 📊 SEO & GEO Features

- **Dynamic Metadata**: Every page generates title, description, OG tags
- **Schema.org**: Product, Organization, FAQPage structured data
- **Sitemap**: Auto-generated from database
- **AI Crawlers**: Explicit allow rules for GPTBot, ChatGPT, Anthropic
- **Hidden Context**: SR-only content for AI parsing

## 🔧 Scripts

```bash
pnpm dev          # Development server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm db:push      # Push schema to DB
pnpm db:migrate   # Create migration
pnpm db:seed      # Seed demo data
pnpm db:studio    # Open Prisma Studio
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file.

---

Built with ❤️ for the Kazakhstan market
