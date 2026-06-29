# 🔌 API Reference & Configuration

## AIEngine API Reference

### Class: AIEngine

Main AI engine untuk emotion detection menggunakan Face-API.js

#### Constructor
```javascript
const aiEngine = new AIEngine();
```

#### Properties
```javascript
aiEngine.modelsLoaded        // boolean - status model loading
aiEngine.engineMode          // string - 'ai-active' | 'fallback'
aiEngine.emotionLabels       // array - ['neutral','happy','sad','angry','fearful','disgusted','surprised']
aiEngine.detectionHistory    // array - history of last 30 detections
aiEngine.maxHistoryLength    // number - 30 (default)
```

#### Methods

##### loadModels()
Load semua AI models dari CDN
```javascript
const result = await aiEngine.loadModels();

// Returns:
{
  success: boolean,
  mode: 'ai-active' | 'fallback',
  error?: string
}

// Usage
try {
  const result = await aiEngine.loadModels();
  if (result.success) {
    console.log('✅ AI ready!');
  } else {
    console.log('⚠️ Fallback mode:', result.error);
  }
} catch (error) {
  console.error('Model load error:', error);
}
```

##### detectEmotion(videoElement)
Deteksi emotion dari video stream
```javascript
const detection = await aiEngine.detectEmotion(videoElement);

// Returns:
{
  success: boolean,
  emotion: string,              // detected emotion
  confidence: number,           // 0-1
  allExpressions: {
    happy: 0.8,
    sad: 0.1,
    neutral: 0.05,
    // ... other emotions
  },
  detection?: {
    face: {...},
    expressions: {...}
  },
  message?: string,
  isFromAI?: boolean
}

// Usage
const video = document.getElementById('video');
const result = await aiEngine.detectEmotion(video);

if (result.success) {
  console.log(`Emotion: ${result.emotion}`);
  console.log(`Confidence: ${(result.confidence * 100).toFixed(1)}%`);
} else {
  console.log('Detection failed, using fallback');
}
```

##### calculateDominantEmotion()
Hitung emotion dominan dari detection history
```javascript
const dominant = aiEngine.calculateDominantEmotion();
// Returns: 'happy' | 'sad' | 'neutral' | 'angry' | 'fearful' | 'disgusted' | 'surprised'

// Usage
const mood = aiEngine.calculateDominantEmotion();
console.log(`Dominant mood: ${mood}`);
```

##### resetHistory()
Clear detection history
```javascript
aiEngine.resetHistory();

// Usage
// Before starting new scan
aiEngine.resetHistory();
startScan();
```

##### getStatus()
Get current engine status
```javascript
const status = aiEngine.getStatus();

// Returns:
{
  modelsLoaded: boolean,
  engineMode: string,
  detectionHistoryLength: number
}

// Usage
const status = aiEngine.getStatus();
console.log(JSON.stringify(status, null, 2));
// Output:
// {
//   "modelsLoaded": true,
//   "engineMode": "ai-active",
//   "detectionHistoryLength": 15
// }
```

##### getFallbackEmotion()
Get random emotion (untuk fallback mode)
```javascript
const fallback = aiEngine.getFallbackEmotion();

// Returns:
{
  success: false,
  emotion: string,
  confidence: 0.5,
  message: 'Using fallback detection (models not fully loaded)',
  isFromAI: false
}
```

---

## App Functions Reference

### Camera Setup

#### setupCamera()
Initialize webcam dan setup video stream
```javascript
await setupCamera();

// What it does:
// 1. Request camera permission
// 2. Get video stream
// 3. Attach to <video> element
// 4. Setup canvas size matching video
// 5. Hide placeholder

// Usage (automatic on load)
```

### Scan Flow

#### startScan()
Mulai 10 detik scanning session
```javascript
startScan();

// Flow:
// 1. Disable start button
// 2. Add 'scanning' class to camera
// 3. Reset AI detection history
// 4. Loop every 1 second for 10 seconds:
//    - Update countdown display
//    - Detect emotion
//    - Capture frame
//    - Update progress bar
// 5. Call completeScan() when done
```

#### completeScan(detection)
Complete scan & show results
```javascript
completeScan(detection);

// Parameters:
// detection: { emotion, confidence, ... }

// What it does:
// 1. Stop scanning
// 2. Get mood data from bank
// 3. Generate random narration
// 4. Display results
// 5. Show TikTok form

// Usage (automatic after 10s scan)
```

### Template Generation

#### generateTemplate()
Generate promo template dengan user data
```javascript
generateTemplate();

// Gets data from:
// - greetingSelect.value     // Mau dipanggil apa?
// - messageInput.value       // Pesan hari ini
// - tiktokInput.value        // TikTok handle
// - lastResult               // Previous scan result

// What it does:
// 1. Validate message input
// 2. Update template UI with all data
// 3. Show template card
// 4. Play success sound

// Usage (triggered by button click)
```

#### downloadTemplate()
Download template sebagai PNG image
```javascript
downloadTemplate();

// What it does:
// 1. Use html2canvas to render template
// 2. Convert to PNG
// 3. Trigger browser download
// 4. Activate WhatsApp button
// 5. Play download sound

// File naming:
// nasipadangMAX-{timestamp}.png
// Example: nasipadangMAX-1719638399000.png

// Usage (triggered by button click)
```

### Social Sharing

#### openWhatsApp()
Open WhatsApp share dialog
```javascript
openWhatsApp();

// What it does:
// 1. Get template data
// 2. Build share message
// 3. Generate WhatsApp URL
// 4. Open in new tab

// Message format:
// "Cek hasil AI mood scan aku di nasipadangMAX! 🤖 
//  Menu favorit aku hari ini: {menu_name}"

// Usage (triggered by button click)
```

#### playSound(type)
Play audio notification
```javascript
playSound(type);

// Supported types:
// - 'scan'     : 400Hz, 0.1s
// - 'complete' : 800Hz, 0.3s
// - 'success'  : 1000Hz, 0.2s
// - 'download' : 600Hz, 0.15s

// Usage
playSound('scan');
playSound('complete');
playSound('success');
playSound('download');
```

#### toggleSound()
Toggle sound on/off
```javascript
toggleSound();

// Updates button text:
// "Sound: ON" → "Sound: OFF"
// "Sound: OFF" → "Sound: ON"

// Affects playSound() function
```

---

## Configuration Options

### AI Engine Config

Edit dalam `ai-engine.js`:
```javascript
// Emotion labels
const emotionLabels = [
  'neutral', 'happy', 'sad', 'angry', 
  'fearful', 'disgusted', 'surprised'
];

// Detection history size (untuk smoothing)
this.maxHistoryLength = 30;  // Change this

// Model URL (CDN)
const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/';
```

### App Config

Edit dalam `app.js`:
```javascript
// Scan duration (seconds)
const SCAN_DURATION = 10;  // Change this

// Sound enabled by default
let soundEnabled = true;   // Change this

// Mood bank (customize messages & menus)
const moodBank = {
  happy: { ... },
  sad: { ... },
  // ... etc
};
```

### UI Config

Edit dalam `index.html`:
```html
<!-- Model URL -->
<script src="https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.14/dist/face-api.min.js"></script>

<!-- Canvas utility -->
<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
```

---

## Events & Callbacks

### Automatic Events

```javascript
// On page load
document.addEventListener('DOMContentLoaded', () => {
  console.log('📱 DOM loaded, initializing app...');
  initApp();
});

// On video metadata loaded
video.onloadedmetadata = () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  placeholder.classList.add('hidden');
};
```

### Button Events

```javascript
// Start scan button
startBtn.addEventListener('click', startScan);

// Sound toggle button
soundBtn.addEventListener('click', toggleSound);

// Generate template button
generateTemplateBtn.addEventListener('click', generateTemplate);

// Skip form button
skipHandleBtn.addEventListener('click', skipToTemplate);

// Download button
downloadBtn.addEventListener('click', downloadTemplate);

// WhatsApp button
waBtn.addEventListener('click', openWhatsApp);
```

---

## Data Structures

### Detection Result
```javascript
{
  success: boolean,
  emotion: 'happy' | 'sad' | 'neutral' | 'angry' | 'fearful' | 'disgusted' | 'surprised',
  confidence: 0-1,
  allExpressions: {
    happy: 0-1,
    sad: 0-1,
    neutral: 0-1,
    angry: 0-1,
    fearful: 0-1,
    disgusted: 0-1,
    surprised: 0-1
  },
  detection: {
    face: FaceDetection,
    expressions: Object
  }
}
```

### Mood Data
```javascript
{
  intros: string[],          // Opening narrations
  feelings: string[],        // Feeling descriptions
  menus: [
    {
      name: string,          // Menu name
      reason: string         // Why this menu
    },
    ...
  ]
}
```

### Scan Result
```javascript
{
  emotion: string,
  confidence: number,
  timestamp: Date,
  photo: string,             // Base64 data URL
  moodData: MoodData
}
```

---

## Error Handling

### Common Errors & Solutions

```javascript
// Error: Models not loading
if (!aiEngine.modelsLoaded) {
  console.warn('AI models failed to load');
  aiEngine.engineMode = 'fallback';
  // App continues with random detection
}

// Error: No face detected
if (detections.length === 0) {
  return {
    success: false,
    emotion: 'neutral',
    message: 'Face not detected, try again'
  };
}

// Error: Camera permission denied
try {
  stream = await navigator.mediaDevices.getUserMedia({video: {...}});
} catch (error) {
  if (error.name === 'NotAllowedError') {
    console.error('Camera permission denied');
    // Show user message
  }
}

// Error: Download failed
try {
  const canvas = await html2canvas(exportCard);
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = `nasipadangMAX-${Date.now()}.png`;
  link.click();
} catch (error) {
  console.error('Download error:', error);
  alert('Error mengunduh template');
}
```

---

## Performance Metrics

### Expected Timings
```
Model loading:       3-5 seconds (first load)
                     0 seconds (cached)
Emotion detection:   50-200ms per frame
Scan completion:     10 seconds (user holds still)
Template rendering:  1-2 seconds
Template download:   Instant
```

### Memory Usage
```
Base app:            ~5MB
AI models (cached):  ~50-100MB (browser cache)
Detection history:   ~1MB (30 frames)
Template canvas:     ~2-5MB (temporary)
```

---

## Browser APIs Used

```javascript
// Camera access
navigator.mediaDevices.getUserMedia()

// Canvas rendering
canvas.getContext('2d')
canvas.toDataURL()

// File download
HTMLAnchorElement.click()

// Audio synthesis
window.AudioContext || window.webkitAudioContext

// DOM manipulation
document.getElementById()
element.classList.add/remove()
element.addEventListener()
```

---

## Debug Mode

Enable debug logging:
```javascript
// In browser console
localStorage.setItem('DEBUG', 'true');

// Then in code (add this at start of app.js):
if (localStorage.getItem('DEBUG')) {
  window.DEBUG = true;
  console.log = function(...args) {
    console.debug('[DEBUG]', ...args);
  };
}

// All console.log() will now show with [DEBUG] prefix
```

---

**Last Updated:** 2026-06-29
**API Version:** 1.0.0
**Status:** ✅ Complete & Documented
