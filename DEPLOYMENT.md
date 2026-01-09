# Deployment Guide for ps.kz

Step-by-step guide to deploy Telfera.kz to ps.kz hosting

## 📋 Pre-Deployment Checklist

- [ ] PostgreSQL database is set up (Railway or ps.kz)
- [ ] All environment variables are ready
- [ ] Code is tested locally
- [ ] Dependencies are up to date
- [ ] Security measures reviewed

## 🚀 Step 1: Prepare Your Code

```bash
# Build your application
npm run build

# Test the production build locally
npm run start
```

## 🔐 Step 2: Set Environment Variables on ps.kz

In your ps.kz hosting control panel, set these variables:

### Required Variables:

```env
DATABASE_URL=postgresql://user:password@host:5432/database
AUTH_SECRET=your-32-character-random-string
NODE_ENV=production
```

### Generate AUTH_SECRET:
```bash
openssl rand -base64 32
```

## 📦 Step 3: Upload Files to ps.kz

Upload these files/folders to your ps.kz hosting:

```
Required:
├── .next/              (built files)
├── node_modules/       (or install on server)
├── prisma/
│   └── schema.prisma
├── public/             (if any)
├── src/
├── package.json
├── package-lock.json
├── next.config.ts
├── tsconfig.json
└── .env.production     (with your production variables)
```

## 🗄️ Step 4: Set Up Database on ps.kz

### If using ps.kz PostgreSQL:

1. Create a new PostgreSQL database in ps.kz panel
2. Note down the connection details
3. Update `DATABASE_URL` in environment variables

### If using Railway:

1. Keep your Railway PostgreSQL URL
2. Make sure it's accessible from ps.kz servers
3. No changes needed

### Create Database Tables:

```bash
# SSH into your ps.kz server and run:
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts
```

## ⚙️ Step 5: Configure ps.kz

### Node.js Settings:

- **Node Version:** 18.x or higher
- **Start Command:** `npm run start`
- **Build Command:** `npm run build`
- **Port:** 3000 (or as configured by ps.kz)

### Install Dependencies:

```bash
npm install --production
```

## 🔧 Step 6: Post-Deployment Tasks

1. **Test the website:**
   - Visit your domain
   - Test login functionality
   - Submit a test lead
   - Verify it appears in admin panel

2. **Change default passwords:**
   ```
   Login as admin@telfera.kz
   Go to Settings (future feature) or manually update in database
   ```

3. **Set up HTTPS:**
   - ps.kz usually provides free SSL
   - Enable in control panel
   - Force HTTPS redirects

4. **Configure domain:**
   - Point your domain to ps.kz nameservers
   - Wait for DNS propagation (up to 48 hours)

## 🔄 Updating Your Application

When you need to update:

```bash
# Local machine
npm run build

# Upload new .next/ folder to ps.kz

# Restart the application in ps.kz panel
```

## 🐛 Troubleshooting

### Issue: "Cannot connect to database"
- Check DATABASE_URL is correct
- Verify database is accessible
- Check firewall rules

### Issue: "Authentication not working"
- Verify AUTH_SECRET is set
- Check session settings
- Clear browser cookies

### Issue: "500 Internal Server Error"
- Check server logs in ps.kz panel
- Verify all environment variables
- Check Node.js version compatibility

### Issue: "Module not found"
- Run `npm install` on server
- Check all dependencies are installed
- Verify package.json is present

## 📊 Monitoring

Set up monitoring for:
- [ ] Uptime monitoring
- [ ] Error logging
- [ ] Database performance
- [ ] Failed login attempts
- [ ] Lead submissions

## 🔒 Security (Production)

After deployment:
1. Generate new AUTH_SECRET (different from dev)
2. Change admin password immediately
3. Use strong database password
4. Enable HTTPS
5. Set up regular backups
6. Review security headers
7. Monitor access logs

## 📞 Support

If you need help:
1. Check ps.kz documentation
2. Review error logs
3. Contact ps.kz support
4. Check Railway logs (if using Railway DB)

## 🎉 Success Checklist

- [ ] Website loads correctly
- [ ] HTTPS is working
- [ ] Login/logout works
- [ ] Lead submissions work
- [ ] Admin panel accessible
- [ ] Manager panel accessible
- [ ] Database is connected
- [ ] No console errors
- [ ] All pages load quickly
- [ ] Mobile responsive

Your Telfera.kz is now live! 🚀
