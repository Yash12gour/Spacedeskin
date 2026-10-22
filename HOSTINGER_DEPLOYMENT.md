# Hostinger Node.js Web App Deployment Guide

This document outlines how to deploy your Spacedesk React + Vite website on **Hostinger Node.js Web App Hosting** using a ZIP upload.

---

## 1. Project Overview & Architecture
- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS.
- **Backend / Production Server:** Express.js (`server.js`) serving static files from `dist/` and handling SPA fallback routing (`*` -> `dist/index.html`) along with form submission API endpoints.
- **CMS Integration:** Connects to Headless WordPress CMS (`https://cms.spacedesk.in/wp-json/wp/v2`).

---

## 2. Hostinger Configuration Settings
When configuring your Node.js application in the Hostinger hPanel:

- **Node.js Version:** `20.x` (or latest LTS)
- **Application Startup File:** `server.js`
- **Install Command:** `npm install` (Hostinger runs this automatically upon upload)
- **Build Command:** `npm run build`
- **Start Command:** `npm start` (runs `node server.js`)

---

## 3. Environment Variables (.env)
If your application uses environment variables in production, configure them in Hostinger's environment variables manager or include a `.env` file at the root:

```env
PORT=3000
NODE_ENV=production
VITE_WORDPRESS_API_URL=https://cms.spacedesk.in/wp-json
```

---

## 4. Step-by-Step Deployment Instructions

1. **Build the Project Locally (Optional test):**
   ```bash
   npm install
   npm run build
   npm start
   ```
   Verify that the app loads at `http://localhost:3000`.

2. **Prepare the ZIP Archive:**
   Create a ZIP archive of your project root containing:
   - `server.js`
   - `package.json`
   - `src/`, `public/`, `index.html`, `vite.config.ts`, `tsconfig.json` (all source & config files needed for `npm run build`)
   - `dist/` (pre-built production output, optional since Hostinger runs `npm run build`)
   
   *Note: Exclude `node_modules/` and local `.git/` folders to keep the ZIP size small and clean.*

3. **Upload to Hostinger:**
   - Log in to Hostinger hPanel.
   - Navigate to **Node.js** or **Web Applications**.
   - Create a new Node.js app pointing to your domain.
   - Upload your project ZIP file through the File Manager or Deployment tool and extract it to your app root directory.
   - Set **Startup File** to `server.js`.
   - Click **Restart App**.

4. **Verify Deployment:**
   Visit `https://yourdomain.com/health` to check the `/health` endpoint status, then browse your website to confirm all pages, animations, and WordPress blog posts load successfully.
