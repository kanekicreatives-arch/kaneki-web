# Deployment Guide for Kaneki Creatives Website

## Netlify Deployment

### Prerequisites
- Netlify account
- All website files ready
- Domain name (optional)

### Deployment Steps

1. **Login to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign in to your account

2. **Deploy from Folder**
   - Click "Add new site" → "Deploy manually"
   - Drag and drop your website folder
   - Wait for deployment to complete

3. **Configure Custom Domain (Optional)**
   - Go to Site settings → Domain management
   - Add your custom domain
   - Update DNS records as instructed

### Environment Variables
No environment variables required for this static website.

### Build Settings
- Build command: None (static site)
- Publish directory: Root directory
- Node version: Not applicable

### Performance Optimizations
- Gzip/Brotli compression enabled via `netlify.toml`
- HTTP/2 Server Push configured
- Security headers implemented
- Cache headers optimized

### Monitoring
- Check deployment status in Netlify dashboard
- Monitor site performance in Netlify Analytics
- Use Google Analytics for visitor tracking

### Troubleshooting
- If images don't load: Check file paths and case sensitivity
- If CSS doesn't apply: Verify `style.css` is in root directory
- If JavaScript doesn't work: Check browser console for errors

## File Structure
```
website/
├── index.html
├── service.html
├── our-work.html
├── style.css
├── main.js
├── robots.txt
├── sitemap.xml
├── netlify.toml
└── images/
    ├── 2.webp
    ├── aditya-siva-HlQi14Q_iO0-unsplash.webp
    ├── amit-jain-FYGEA9aezAw-unsplash.webp
    ├── mondakranta-saikia-Xqw7XgnvU3w-unsplash.webp
    ├── nilotpal-kalita-IpRIguCAQes-unsplash.webp
    ├── nilotpal-kalita-Q-7foDSBxDA-unsplash.webp
    ├── Screenshot 2025-09-23 110515.webp
    ├── Screenshot 2025-09-23 111353.webp
    └── google-my-business-logo.svg
```

## Post-Deployment Checklist
- [ ] Test all pages load correctly
- [ ] Verify all images display properly
- [ ] Check contact forms work
- [ ] Test mobile responsiveness
- [ ] Verify SEO meta tags
- [ ] Check page load speed
- [ ] Test on different browsers
- [ ] Submit sitemap to Google Search Console
