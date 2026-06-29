# 🤖 nasipadangMAX - AI Mood Scanner

**AI-powered mood detection system untuk warung makan dengan TikTok integration & WhatsApp funnel.**

## ✨ Fitur Utama

✅ **Real-time Face Expression Detection** - AI membaca ekspresi wajah real-time menggunakan Face-API.js
✅ **Mood-Based Menu Recommendation** - Sistem AI yang personalisasi menu berdasarkan mood customer
✅ **Template Generator** - Buat template promo otomatis dengan foto + analisis AI
✅ **TikTok Integration** - Share hasil scan langsung ke TikTok
✅ **WhatsApp Funnel** - Kirim hasil ke WhatsApp dengan satu klik
✅ **Fallback Mode** - Tetap berjalan bahkan jika model AI gagal load

---

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/stokfebe-cloud/bjorbun.git
cd bjorbun
```

### 2. Setup Lokal
```bash
# Tidak perlu install dependencies khusus - semua via CDN
# Cukup buka di browser atau jalankan local server
python -m http.server 8000
# atau
npx http-server
```

### 3. Buka di Browser
```
http://localhost:8000
```

---

## 📂 Struktur File

```
bjorbun/
├── index.html           # Main HTML - UI & layout
├── ai-engine.js        # AI Engine - Face detection & emotion analysis
├── app.js              # Main App Logic - Scan flow & templates
├── models/             # Face-API pre-trained models (CDN loaded)
├── README.md           # Dokumentasi (file ini)
└── .github/
    └── workflows/      # CI/CD workflows (opsional)
```

---

## 🧠 Bagaimana AI Bekerja?

### 1. **Load Models** (`ai-engine.js`)
- Download face detection models dari CDN (TinyFaceDetector)
- Load facial landmarks & expression recognition networks
- Fallback ke mode random jika gagal

### 2. **Detect Emotion** 
- Capture video frame setiap 1 detik
- Deteksi wajah & expressions menggunakan Face-API
- Simpan 30 deteksi terakhir untuk smoothing
- Hitung mood dominan dari history

### 3. **Generate Narration** (`app.js`)
- Map emotion ke mood bank (happy, sad, neutral, angry, surprised, fearful, disgusted)
- Pilih random narasi yang personal
- Rekomendasikan menu berdasarkan mood

### 4. **Create Template**
- Capture frame terakhir dari scan
- Generate template promo dengan html2canvas
- Export sebagai PNG image

---

## 💻 API References

### AIEngine Class (`ai-engine.js`)

```javascript
// Initialize
const aiEngine = new AIEngine();

// Load models
await aiEngine.loadModels();
// Returns: { success: true/false, mode: 'ai-active' | 'fallback', error?: string }

// Detect emotion dari video element
const result = await aiEngine.detectEmotion(videoElement);
// Returns: {
//   success: boolean,
//   emotion: 'happy' | 'sad' | 'neutral' | 'angry' | 'fearful' | 'disgusted' | 'surprised',
//   confidence: 0-1,
//   allExpressions: { happy: 0.8, sad: 0.1, ... },
//   detection: { face: {...}, expressions: {...} }
// }

// Get status
aiEngine.getStatus();
// Returns: { modelsLoaded: boolean, engineMode: string, detectionHistoryLength: number }

// Reset history
aiEngine.resetHistory();
```

### App Functions (`app.js`)

```javascript
// Start scanning (10 seconds)
startScan()

// Complete scan & show results
completeScan(detection)

// Generate template
generateTemplate()

// Download template as PNG
downloadTemplate()

// Open WhatsApp share
openWhatsApp()

// Toggle sound effects
toggleSound()
```

---

## 🎨 Emotion Mapping

Setiap emotion di-map ke mood yang berbeda dengan narasi unik:

| Emotion | Menu Examples | Vibe |
|---------|---------------|------|
| **Happy** | Dendeng Balado, Ayam Balado | Cerah, energik |
| **Sad** | Rendang, Ayam Gulai | Tenang, comfort |
| **Neutral** | Ayam Bakar, Rendang Telur | Balanced, thoughtful |
| **Angry** | Rendang Daging, Sambal Ijo | Tegas, kuat |
| **Surprised** | Lumpia, Perkedel | Fresh, energi baru |
| **Fearful** | Soto Ayam, Nasi Kuning | Grounding, aman |
| **Disgusted** | Premium dishes | Selective, quality |

---

## ⚙️ Konfigurasi

### Model URLs
Di `ai-engine.js`, models di-load dari CDN:
```javascript
const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/';
```

### Scan Duration
Di `app.js`, durasi scan bisa diubah:
```javascript
const SCAN_DURATION = 10; // detik
```

### Mood Bank
Edit `app.js` untuk add/modify mood descriptions dan menu recommendations

---

## 🔧 Troubleshooting

### ❌ "AI Models not loading"
**Solution:** Check browser console, pastikan CDN accessible
```javascript
// Fallback otomatis ke mode random
engineMode = 'fallback'
```

### ❌ "Kamera tidak bisa diakses"
**Solution:** Reload page, berikan permission kamera di browser
- Chrome/Edge: Settings → Privacy → Camera → Allow
- Firefox: Allow sharing camera

### ❌ "Template tidak bisa di-download"
**Solution:** Pastikan html2canvas library sudah load
```html
<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
```

### ❌ "WhatsApp button tidak aktif"
**Solution:** Download template dulu sebelum WhatsApp button aktif (by design)

---

## 🌐 Browser Support

| Browser | Support |
|---------|---------|
| Chrome/Chromium | ✅ Full support |
| Firefox | ✅ Full support |
| Safari | ⚠️ Limited (mediaDevices perlu permission) |
| Edge | ✅ Full support |
| Mobile Chrome | ✅ Full support |

---

## 📊 Performance Tips

1. **GPU Acceleration**
   - Models auto-detect GPU jika tersedia
   - Fallback ke CPU jika tidak

2. **Memory Optimization**
   - Detection history limited ke 30 frames
   - Auto-cleanup canvas setelah capture

3. **Network**
   - Semua dependencies via CDN (no node_modules)
   - Models di-cache browser

---

## 🚢 Deployment

### GitHub Pages
```bash
# Push ke main branch, enable GitHub Pages di settings
# Live di: https://stokfebe-cloud.github.io/bjorbun/
```

### Vercel/Netlify
```bash
# Deploy langsung dari GitHub repo
# Semua static files, zero config needed
```

### Self-Hosted
```bash
# Cukup upload ke web server
# Requirements: HTTP/HTTPS, JavaScript enabled
# No backend needed!
```

---

## 📝 Usage Example

```javascript
// 1. Initialize (otomatis di app.js)
await aiEngine.loadModels();

// 2. Start scanning
startScan();
// User holds still for 10 seconds

// 3. Get emotion result
const emotion = aiEngine.calculateDominantEmotion();
// Returns: 'happy', 'sad', 'neutral', dll

// 4. Show personalized narration & menu
const moodData = moodBank[emotion];
console.log(moodData.intros[0]); // Narasi personal
console.log(moodData.menus[0].name); // Menu rekomendasi

// 5. Generate & download template
generateTemplate();
downloadTemplate();

// 6. Share ke WhatsApp
openWhatsApp();
```

---

## 🎯 Next Features (Roadmap)

- [ ] Add analytics dashboard
- [ ] Store results ke database
- [ ] Leaderboard mood scan
- [ ] Custom mood categories
- [ ] Multi-language support
- [ ] Mobile app version
- [ ] AR filters saat scanning

---

## 👨‍💻 Contributing

Kontribusi welcome! Caranya:

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

MIT License - lihat LICENSE file

---

## 📞 Support

- **Issues:** GitHub Issues
- **Email:** stokfebe@gmail.com
- **Twitter:** @stokfebe

---

## 🙏 Credits

- Face-API.js untuk emotion detection
- html2canvas untuk template export
- Vladmandic untuk pre-trained models

---

**Built with ❤️ by Stokfebe Cloud**

Last updated: 2026-06-29
