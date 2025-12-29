# BuildPro Construction - Deployment Guide

## Quick Start Commands

```bash
# Development
npm run dev          # Start development server on http://localhost:3000

# Production
npm run build       # Build for production
npm start          # Run production server

# Utilities
npm run lint       # Check code quality
```

---

## 🚀 Deployment Options

### 1️⃣ Vercel (Recommended - Zero Config)

**Best for**: Easiest deployment, automatic CI/CD, free SSL

#### Steps:
1. **Push to GitHub** (if not already)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-github-repo-url
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Done!** Your site will be live at `your-project.vercel.app`

#### Custom Domain:
- Go to Project Settings → Domains
- Add your custom domain
- Update DNS records as instructed

---

### 2️⃣ Netlify

**Best for**: Alternative to Vercel, drag-and-drop option available

#### Steps:
1. **Build Locally** (optional)
   ```bash
   npm run build
   ```

2. **Deploy via Git**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "New site from Git"
   - Connect GitHub repository
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Click "Deploy site"

3. **Or Drag-and-Drop**
   - Build locally: `npm run build`
   - Drag `.next` folder to Netlify drop zone

---

### 3️⃣ Static Export (Any Web Host)

**Best for**: Traditional hosting (cPanel, FTP, shared hosting)

#### Steps:
1. **Update next.config.js** for static export:
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
     },
   }
   
   module.exports = nextConfig
   ```

2. **Build Static Site**
   ```bash
   npm run build
   ```

3. **Upload `out/` folder** to your web host

4. **Configure** web server to serve index.html for all routes

---

### 4️⃣ AWS Amplify

**Best for**: AWS ecosystem integration

#### Steps:
1. Install Amplify CLI
   ```bash
   npm install -g @aws-amplify/cli
   amplify configure
   ```

2. Initialize and deploy
   ```bash
   amplify init
   amplify add hosting
   amplify publish
   ```

---

### 5️⃣ Self-Hosted (VPS/Cloud Server)

**Best for**: Full control, custom server setup

#### Using PM2 (Process Manager):
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start npm --name "buildpro-site" -- start

# Save PM2 configuration
pm2 save

# Setup auto-restart on server reboot
pm2 startup
```

#### Using Docker:
1. **Create Dockerfile**:
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and run**:
   ```bash
   docker build -t buildpro-construction .
   docker run -p 3000:3000 buildpro-construction
   ```

#### Nginx Reverse Proxy:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

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

---

## 🔒 Production Checklist

Before deploying to production:

### Environment & Configuration
- [ ] Set `NODE_ENV=production`
- [ ] Review and update contact information
- [ ] Replace placeholder company name if needed
- [ ] Add real images/content
- [ ] Configure custom domain
- [ ] Set up SSL certificate (automatic on Vercel/Netlify)

### SEO & Analytics
- [ ] Update meta tags in `src/app/layout.tsx`
- [ ] Add Google Analytics or similar
- [ ] Add favicon (place in `public/`)
- [ ] Create `robots.txt` in `public/`
- [ ] Create `sitemap.xml`

### Contact Form
- [ ] Connect to email service (SendGrid, Formspree, EmailJS)
- [ ] Test form submissions
- [ ] Set up email notifications
- [ ] Configure spam protection

### Performance
- [ ] Run Lighthouse audit
- [ ] Optimize images
- [ ] Test load times
- [ ] Verify mobile performance

### Testing
- [ ] Test all pages
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices
- [ ] Verify responsive design
- [ ] Check all links work

---

## 🌐 Custom Domain Setup

### For Vercel:
1. Go to Project Settings → Domains
2. Add your domain (e.g., `buildpro.com`)
3. Add DNS records at your domain registrar:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### For Netlify:
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Update DNS:
   ```
   Type: A
   Name: @
   Value: [Netlify's IP]
   
   Type: CNAME
   Name: www
   Value: [your-site].netlify.app
   ```

---

## 📧 Email Service Integration

### Using Formspree (Easiest):
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Update `ContactForm.tsx`:
   ```typescript
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
       method: 'POST',
       body: JSON.stringify(formData),
       headers: { 'Content-Type': 'application/json' }
     });
     // Handle response...
   };
   ```

### Using EmailJS:
1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Install package: `npm install @emailjs/browser`
3. Configure in `ContactForm.tsx`

### Using Next.js API Route + SendGrid:
1. Install: `npm install @sendgrid/mail`
2. Create `src/app/api/contact/route.ts`
3. Configure SendGrid API key
4. Update form to POST to `/api/contact`

---

## 🔧 Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Port Already in Use
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F

# Mac/Linux:
lsof -ti:3000 | xargs kill
```

### Deployment Issues
- Ensure `package.json` has correct scripts
- Check Node.js version (requires Node 18+)
- Verify all dependencies are installed
- Check build logs for specific errors

---

## 📊 Performance Optimization

### Already Implemented:
✅ Image optimization (Next.js built-in)  
✅ Code splitting  
✅ Static page generation  
✅ CSS optimization  
✅ Minimal dependencies

### Additional Optimizations:
- Add real images in WebP format
- Implement lazy loading for images
- Add cache headers
- Use CDN for static assets
- Compress images before uploading

---

## 📱 Mobile App Web Wrapper

To convert to a mobile app (PWA):

1. **Add manifest.json** in `public/`:
   ```json
   {
     "name": "BuildPro Construction",
     "short_name": "BuildPro",
     "description": "Construction Services",
     "start_url": "/",
     "display": "standalone",
     "background_color": "#1a1a1a",
     "theme_color": "#FDB913",
     "icons": [...]
   }
   ```

2. **Add to layout.tsx**:
   ```tsx
   <link rel="manifest" href="/manifest.json" />
   ```

3. **Add service worker** for offline support

---

## 🎯 Post-Deployment

After your site is live:

1. **Submit to Search Engines**
   - Google Search Console
   - Bing Webmaster Tools

2. **Set Up Monitoring**
   - Uptime monitoring (UptimeRobot, Pingdom)
   - Error tracking (Sentry)
   - Analytics (Google Analytics, Plausible)

3. **Backup Strategy**
   - Regular database backups (if added)
   - Git repository backup
   - Content backup plan

4. **Regular Maintenance**
   - Update dependencies monthly
   - Review analytics
   - Update content regularly
   - Monitor performance

---

**Your website is production-ready and can be deployed immediately!** 🚀

For questions or issues, refer to [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
