# Google Sheets Integration Setup

## Overview
This guide explains how to set up Google Sheets integration for collecting form submissions and managing data from the Kaneki Creatives website.

## Prerequisites
- Google account
- Google Sheets access
- Basic understanding of web forms

## Setup Steps

### 1. Create Google Sheet
1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Kaneki Creatives - Form Submissions"
4. Create columns for:
   - Timestamp
   - Name
   - Email
   - Phone
   - Service Interest
   - Message
   - Source Page

### 2. Set Up Form Handler
For form submissions, you'll need a backend service. Here are the options:

#### Option A: Google Apps Script (Recommended)
1. In your Google Sheet, go to Extensions → Apps Script
2. Create a new script with this code:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date(),
    data.name || '',
    data.email || '',
    data.phone || '',
    data.service || '',
    data.message || '',
    data.source || ''
  ]);
  
  return ContentService.createTextOutput('Success');
}
```

3. Deploy as web app with execute permissions for "Anyone"

#### Option B: Netlify Forms (Easiest)
1. Add `netlify` attribute to your forms
2. Forms will be available in Netlify dashboard
3. Export data to Google Sheets manually

### 3. Update HTML Forms
Add the necessary attributes to your contact forms:

```html
<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="contact">
  <p class="hidden">
    <label>Don't fill this out: <input name="bot-field"></label>
  </p>
  
  <input type="text" name="name" placeholder="Your Name" required>
  <input type="email" name="email" placeholder="Your Email" required>
  <input type="tel" name="phone" placeholder="Your Phone">
  <select name="service">
    <option value="">Select Service</option>
    <option value="seo">SEO Services</option>
    <option value="web-design">Web Design</option>
    <option value="social-media">Social Media Marketing</option>
  </select>
  <textarea name="message" placeholder="Your Message"></textarea>
  <button type="submit">Send Message</button>
</form>
```

### 4. Data Management
- Set up automatic email notifications for new submissions
- Create filters and sorting for better data organization
- Export data regularly for backup
- Set up data validation rules

### 5. Privacy and Security
- Ensure GDPR compliance for data collection
- Add privacy policy to website
- Implement data retention policies
- Secure access to Google Sheets

## Troubleshooting
- **Forms not submitting**: Check form attributes and Netlify configuration
- **Data not appearing**: Verify Apps Script deployment and permissions
- **Duplicate entries**: Add validation to prevent duplicate submissions

## Best Practices
- Regular data backup
- Monitor form submissions daily
- Respond to inquiries within 24 hours
- Keep data organized and clean
- Respect user privacy and data protection laws
