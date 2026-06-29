# 📋 Installation & Setup Guide

## ✅ Checklist Setup Awal

Pastikan semua ini sudah done sebelum test aplikasi:

- [x] Clone repo dari GitHub
- [x] Buka di browser (index.html)
- [x] Beri akses kamera
- [x] Tunggu AI models load (±3-5 detik)
- [x] Klik "Mulai Scan"
- [x] Tahan posisi wajah selama 10 detik
- [x] Lihat hasil mood + menu recommendation
- [x] Isi form (pesan & TikTok)
- [x] Generate template
- [x] Download template
- [x] Share ke WhatsApp

---

## 🔧 Technical Setup

### Prerequisites
- Modern browser (Chrome, Firefox, Edge, Safari)
- Webcam/Camera
- Internet connection (untuk load CDN libraries)

### Tidak diperlukan:
- ❌ Node.js / npm
- ❌ Python / backend server
- ❌ Database
- ❌ API keys

---

## 📥 Installation Methods

### Method 1: GitHub Pages (Recommended)
```bash
1. Enable GitHub Pages di repo settings
2. Build from main branch
3. Live di: https://stokfebe-cloud.github.io/bjorbun
4. Done! 🎉
```

### Method 2: Local Development
```bash
# Clone repo
git clone https://github.com/stokfebe-cloud/bjorbun.git
cd bjorbun

# Start local server (pilih salah satu)

# Option A: Python 3
python -m http.server 8000

# Option B: Python 2
python -m SimpleHTTPServer 8000

# Option C: Node.js
npx http-server

# Open http://localhost:8000
```

### Method 3: Vercel/Netlify
```bash
1. Login ke Vercel/Netlify
2. Import dari GitHub
3. Select stokfebe-cloud/bjorbun
4. Deploy (auto)
5. Live in seconds ⚡
```

### Method 4: Direct Upload (cPanel/FTP)
```bash
1. FTP ke web hosting
2. Upload semua files:
   - index.html
   - ai-engine.js
   - app.js
   - models/ folder
3. Access via domain
4. Done!
```

---

## 🎬 First Run Checklist

### Step 1: Browser Check
```
✅ JavaScript enabled
✅ Webcam available
✅ HTTPS or localhost (required for camera access)
✅ Modern browser (2020+)
```

### Step 2: Load Page
```
1. Open index.html
2. See "🤖 Loading AI..." badge
3. Wait for models to load (indicator berubah jadi "🤖 AI LIVE")
4. Enable camera permissions
5. Ready to scan!
```

### Step 3: Test Scan
```
1. Click "Mulai Scan"
2. Position face in frame
3. Hold still for 10 seconds
4. See countdown: 10s → 9s → ... → 0s
5. Results appear instantly
```

### Step 4: Generate Template
```
1. Fill "Mau dipanggil apa?"
2. Write your message in "Berikan pesan hari ini"
3. Enter TikTok handle (optional)
4. Click "Bikin Template"
5. See preview
```

### Step 5: Download & Share
```
1. Click "Unduh Template"
2. PNG file downloaded automatically
3. "Chat WhatsApp" button now active
4. Share to WhatsApp with one click
```

---

## 🐛 Common Issues & Fixes

### Issue: "Models failed to load"
```
❌ Error: AI Models not loading

Fix:
1. Check internet connection
2. Check CDN status (cdn.jsdelivr.net)
3. Check browser console (F12 → Console)
4. Reload page
5. App falls back to random detection (still works!)
```

### Issue: "Kamera tidak terdeteksi"
```
❌ Error: Camera not found

Fix:
1. Reload page
2. Give camera permission (browser will ask)
3. Check if other apps using camera
4. Try different browser
5. Restart browser
```

### Issue: "Webcam shows black screen"
```
❌ Error: Video stream loading

Fix:
1. Wait 3-5 seconds for camera to initialize
2. Check camera light (LED blink)
3. Reload page
4. Try different browser
```

### Issue: "Can't download template"
```
❌ Error: Download failed

Fix:
1. Check browser download settings
2. Allow pop-ups for this site
3. Try different browser
4. Check disk space (need ≥1MB)
```

### Issue: "WhatsApp button disabled"
```
❌ Error: By design - download template first

Fix:
1. Download template successfully
2. WhatsApp button automatically enabled
3. Click to share
```

---

## 🔐 Security & Privacy

### Data Handling
- ✅ All processing happens in browser (client-side)
- ✅ No data sent to server
- ✅ No cookies or tracking
- ✅ No personal data stored
- ✅ Photos only exist in browser memory

### Camera Access
- ✅ Permission requested by browser
- ✅ User can deny/revoke anytime
- ✅ No background recording
- ✅ HTTPS required for production

### HTTPS Requirement
```
Production: https://yoursite.com ✅
Development: http://localhost ✅
Development: http://127.0.0.1 ✅
Other domains: ❌ (camera will fail)
```

---

## ⚡ Performance Optimization

### Slow Performance? Try:
```
1. Close other browser tabs
2. Disable browser extensions
3. Clear browser cache
4. Update browser to latest version
5. Restart device
6. Check internet speed (≥2Mbps recommended)
```

### Mobile Performance:
```
- Performance best on modern phones (2020+)
- Works on older phones (slower detection)
- Use good lighting for better accuracy
- Hold phone steady during scan
```

---

## 📱 Mobile Setup

### iOS Safari
```
1. Open Safari
2. Go to your domain/localhost
3. Tap Share button
4. Tap "Add to Home Screen"
5. App installed! 🎉
```

### Android Chrome
```
1. Open Chrome
2. Go to your domain
3. Tap menu (⋯)
4. Tap "Install app"
5. App installed! 🎉
```

---

## 📊 Browser Compatibility Matrix

| Browser | Desktop | Mobile | Audio | Camera | Download |
|---------|---------|--------|-------|--------|----------|
| Chrome | ✅ | ✅ | ✅ | ✅ | ✅ |
| Firefox | ✅ | ✅ | ✅ | ✅ | ✅ |
| Safari | ✅ | ⚠️ | ⚠️ | ✅ | ✅ |
| Edge | ✅ | N/A | ✅ | ✅ | ✅ |
| Opera | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## 🎯 Testing Scenarios

### Scenario 1: Happy Mood
```
✓ Smile big
✓ Relax face
✓ Look energetic
→ Result: Happy mood detected
→ Menu: Dendeng Balado / Ayam Balado
```

### Scenario 2: Sad Mood
```
✓ Relax face
✓ Look thoughtful
✓ Slightly down expression
→ Result: Sad mood detected
→ Menu: Rendang / Ayam Gulai
```

### Scenario 3: Neutral Mood
```
✓ Natural face expression
✓ Don't smile or frown
✓ Look calm
→ Result: Neutral mood detected
→ Menu: Ayam Bakar / Rendang Telur
```

---

## 🚀 Production Deployment

### Pre-Launch Checklist
```
[ ] All files uploaded
[ ] index.html loads correctly
[ ] ai-engine.js loaded (check console)
[ ] app.js loaded (check console)
[ ] Models loading from CDN
[ ] Camera permission working
[ ] Scan functionality tested
[ ] Template download working
[ ] WhatsApp share working
[ ] Responsive design tested (mobile)
[ ] All emotions tested (7 emotions)
[ ] Performance acceptable (< 5s for scan)
```

### Launch Command
```bash
# If using GitHub Pages
git push origin main
# GitHub auto-deploys

# If using Vercel/Netlify
# Auto-deploys on git push

# If manual upload
# Just access the domain - done!
```

---

## 📞 Support & Troubleshooting

### Getting Help
1. Check console: F12 → Console tab
2. Look for error messages
3. Check browser compatibility
4. Try incognito mode
5. Clear browser cache

### Debug Mode (Console Commands)
```javascript
// Check AI engine status
console.log(aiEngine.getStatus());

// Check if models loaded
console.log(aiEngine.modelsLoaded);

// Check current emotion detection history
console.log(aiEngine.detectionHistory);

// Force fallback mode (for testing)
aiEngine.engineMode = 'fallback';
```

---

## 📖 Additional Resources

- [Face-API.js Docs](https://github.com/vladmandic/face-api)
- [html2canvas Docs](https://html2canvas.hertzen.com/)
- [Web APIs - Camera](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
- [GitHub Pages Docs](https://pages.github.com/)

---

**Last Updated:** 2026-06-29
**Status:** ✅ Production Ready
