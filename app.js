/**
 * Main Application Logic - nasipadangMAX AI Mood Scanner
 * Integrates with AI Engine untuk real emotion detection
 */

// ========== INITIALIZATION ==========
let stream = null;
let audioCtx = null;
let soundEnabled = true;
let isScanning = false;
let lastCaptureDataUrl = null;
let lastResult = null;
let scanTimer = null;

// DOM Elements
const engineBadge = document.getElementById('engineBadge');
const statusText = document.getElementById('statusText');
const helperText = document.getElementById('helperText');
const liveChipText = document.getElementById('liveChipText');

const video = document.getElementById('video');
const canvas = document.getElementById('faceCanvas');
const ctx = canvas.getContext('2d');

const placeholder = document.getElementById('placeholder');
const cameraBox = document.getElementById('cameraBox');
const countdownText = document.getElementById('countdownText');
const progressBar = document.getElementById('progressBar');

const startBtn = document.getElementById('startBtn');
const soundBtn = document.getElementById('soundBtn');

const moodPill = document.getElementById('moodPill');
const headlineText = document.getElementById('headlineText');
const resultText = document.getElementById('resultText');

const tiktokCard = document.getElementById('tiktokCard');
const templateCard = document.getElementById('templateCard');
const greetingSelect = document.getElementById('greetingSelect');
const messageInput = document.getElementById('messageInput');
const tiktokInput = document.getElementById('tiktokInput');
const generateTemplateBtn = document.getElementById('generateTemplateBtn');
const skipHandleBtn = document.getElementById('skipHandleBtn');

// Mood Analysis Bank
const moodBank = {
  happy: {
    intros: [
      "auramu keliatan cerah dan enteng",
      "senyum kamu bawa vibe yang hidup",
      "AI nangkep energi kamu lagi enak dibawa jalan",
      "ekspresi kamu keliatan lagi punya cahaya yang bagus"
    ],
    feelings: [
      "kayak hari ini kamu pengen semuanya jalan lebih enak",
      "kayak kamu lagi nyimpen semangat yang gak mau padam",
      "kayak hati kamu lagi pengen sesuatu yang seru tapi tetap nyaman",
      "kayak kamu lagi pengen menikmati hidup tanpa terlalu berat"
    ],
    menus: [
      { name: "Dendeng Balado + Nasi", reason: "karena rasanya bold dan serame energi kamu sekarang" },
      { name: "Ayam Balado + Nasi Hangat", reason: "pedas gurihnya relate sama mood kamu yang lagi naik" }
    ]
  },
  sad: {
    intros: [
      "ekspresi kamu keliatan lagi nyimpen capek yang halus",
      "wajah kamu keliatan tenang, tapi ada beban kecil yang kebaca",
      "AI baca ada sisi lembut yang lagi pengen ditenangin",
      "vibes kamu nunjukin kamu lagi gak pengen terlalu ramai"
    ],
    feelings: [
      "kayak ada hal yang belum selesai sepenuhnya di hati kamu",
      "kayak kamu lagi butuh sesuatu yang gak banyak nanya tapi bikin lega",
      "kayak kamu capek pura-pura baik-baik aja",
      "kayak hati kamu lagi pengen dipeluk diam-diam"
    ],
    menus: [
      { name: "Rendang + Nasi Hangat", reason: "karena kamu butuh rasa yang hangat, padat, dan bikin hati turun pelan" },
      { name: "Ayam Gulai + Nasi Panas", reason: "kuah hangatnya cocok buat vibe kamu yang lagi lembut" }
    ]
  },
  neutral: {
    intros: [
      "wajah kamu keliatan kalem, tapi isi kepala kamu gak sesepi itu",
      "AI baca ekspresi kamu netral, tapi ada banyak hal yang lagi muter di dalem",
      "muka kamu keliatan santai, padahal vibe-nya lagi banyak mikir",
      "tatapan kamu nunjukin kamu lagi nyimpen banyak hal sendiri"
    ],
    feelings: [
      "kayak kamu lagi mikirin masa depan lebih serius dari yang orang kira",
      "kayak ada overthinking kecil yang lagi kamu rapihin sendiri",
      "kayak kamu pengen keliatan biasa aja, padahal kepala lagi penuh",
      "kayak kamu lagi nahan banyak pertanyaan yang belum ketemu jawaban"
    ],
    menus: [
      { name: "Ayam Bakar + Nasi Hangat", reason: "karena kamu butuh rasa yang balance: kuat tapi tetap nyaman" },
      { name: "Rendang Telur + Nasi", reason: "menu ini relate sama vibe kamu yang kalem di luar tapi aktif di dalam" }
    ]
  },
  angry: {
    intros: [
      "AI nangkep intensitas di wajah kamu yang lagi tegas",
      "ekspresi kamu keliatan ada energi yang perlu dilepas",
      "aura kamu bawa vibe yang kuat dan penuh determinasi"
    ],
    feelings: [
      "kayak ada sesuatu yang perlu kamu handle dengan tegas",
      "kayak kamu lagi pengen sesuatu yang punya karakter dan daya",
      "kayak hati kamu pengen action, bukan cuma diam"
    ],
    menus: [
      { name: "Rendang Daging + Nasi", reason: "rasanya yang bold relate sama energi kamu sekarang" },
      { name: "Sambal Ijo + Ayam", reason: "pedasnya cocok buat vibe yang lagi tegas dan penuh action" }
    ]
  },
  surprised: {
    intros: [
      "AI nangkep ada momen fresh di ekspresi kamu",
      "wajah kamu keliatan lagi punya kejutan yang positif",
      "ada spark di mata kamu yang menunjukkan kamu lagi dalam momen baik"
    ],
    feelings: [
      "kayak kamu baru aja ketemu hal yang unexpected tapi bikin happy",
      "kayak ada energi baru yang kamu rasain hari ini",
      "kayak kamu lagi dalam momen yang bikin pikiran fresh"
    ],
    menus: [
      { name: "Lumpia + Nasi", reason: "variasi rasa yang fresh relate sama momen positif kamu" },
      { name: "Perkedel Goreng + Sambal", reason: "kombinasi yang bikin fresh sama energi kamu sekarang" }
    ]
  },
  fearful: {
    intros: [
      "AI baca ada sesuatu yang lagi kamu pikirkan dengan serius",
      "ekspresi kamu keliatan kamu lagi dalam proses adaptasi",
      "wajah kamu nunjukin kamu lagi dalam momen yang perlu kepastian"
    ],
    feelings: [
      "kayak ada hal yang membuat kamu perlu lebih careful dan thoughtful",
      "kayak kamu lagi butuh sesuatu yang grounding dan bikin tenang",
      "kayak hati kamu pengen stability dan comfort yang jelas"
    ],
    menus: [
      { name: "Soto Ayam + Nasi", reason: "kehangatan kuahnya cocok buat vibe yang butuh comfort" },
      { name: "Nasi Kuning + Lauk Pauk", reason: "kombinasi yang bikin merasa aman dan tenang"  }
    ]
  },
  disgusted: {
    intros: [
      "AI nangkep ada sisi critical dari ekspresi kamu",
      "wajah kamu keliatan kamu sedang evaluate sesuatu dengan detail",
      "ekspresi kamu menunjukkan kamu punya standar yang jelas"
    ],
    feelings: [
      "kayak kamu sedang dalam fase memilih yang terbaik aja",
      "kayak ada hal yang kamu filter dengan pertimbangan matang",
      "kayak kamu punya preferensi yang tegas dan jelas"
    ],
    menus: [
      { name: "Rendang Premium + Nasi Putih", reason: "kualitas rasa yang premium cocok sama standar kamu" },
      { name: "Tinggi Isi + Nasi Kuning", reason: "pilihan yang carefully crafted untuk vibe kamu yang particular" }
    ]
  }
};

// ========== MAIN FUNCTIONS ==========

/**
 * Initialize aplikasi
 */
async function initApp() {
  try {
    console.log('🚀 Initializing nasipadangMAX...');
    
    // Tampilkan loading state
    updateEngineStatus('loading');
    
    // Load AI Models
    const modelLoadResult = await aiEngine.loadModels();
    
    if (modelLoadResult.success) {
      console.log('✅ AI Engine ready - REAL MODE ACTIVE');
      updateEngineStatus('ai-active');
    } else {
      console.log('⚠️ AI Engine fallback mode');
      updateEngineStatus('fallback');
    }
    
    // Setup camera
    await setupCamera();
    
    // Setup event listeners
    setupEventListeners();
    
    console.log('✅ App initialized successfully');
    
  } catch (error) {
    console.error('❌ Initialization error:', error);
    updateEngineStatus('error');
  }
}

/**
 * Update engine status di UI
 */
function updateEngineStatus(status) {
  const statusMap = {
    'loading': { text: '⏳ Memuat AI...', color: '#d85050' },
    'ai-active': { text: '🤖 AI LIVE', color: '#4ade80' },
    'fallback': { text: '⚡ Mode Fallback', color: '#f59e0b' },
    'error': { text: '❌ Error', color: '#ef4444' }
  };
  
  const config = statusMap[status] || statusMap['fallback'];
  engineBadge.textContent = config.text;
}

/**
 * Setup camera access
 */
async function setupCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 640 },
        height: { ideal: 480 },
        facingMode: 'user'
      }
    });
    
    video.srcObject = stream;
    
    // Setup canvas size untuk matching video
    video.onloadedmetadata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      placeholder.classList.add('hidden');
      liveChipText.textContent = 'Ready';
      statusText.textContent = 'Kamera aktif, siap scanning';
    };
    
    console.log('✅ Camera setup complete');
    
  } catch (error) {
    console.error('❌ Camera error:', error);
    statusText.textContent = 'Kamera tidak bisa diakses';
    placeholder.innerHTML = `
      <div class="inner">
        <h3>Kamera Error</h3>
        <p>Silakan beri akses kamera di browser Anda. Refresh halaman setelah memberikan permission.</p>
      </div>
    `;
  }
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
  startBtn.addEventListener('click', startScan);
  soundBtn.addEventListener('click', toggleSound);
  generateTemplateBtn.addEventListener('click', generateTemplate);
  skipHandleBtn.addEventListener('click', skipToTemplate);
  downloadBtn.addEventListener('click', downloadTemplate);
  waBtn.addEventListener('click', openWhatsApp);
}

/**
 * Start mood scanning
 */
async function startScan() {
  if (isScanning || !video.srcObject) return;
  
  isScanning = true;
  startBtn.disabled = true;
  cameraBox.classList.add('scanning');
  tiktokCard.classList.add('hidden');
  templateCard.classList.add('hidden');
  
  aiEngine.resetHistory();
  
  let timeLeft = 10;
  const scanInterval = setInterval(async () => {
    // Update countdown
    countdownText.textContent = timeLeft + 's';
    progressBar.style.width = ((10 - timeLeft) / 10 * 100) + '%';
    liveChipText.textContent = 'Scanning...';
    
    // Detect emotion
    const detection = await aiEngine.detectEmotion(video);
    
    // Capture frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    lastCaptureDataUrl = canvas.toDataURL('image/jpeg');
    
    if (timeLeft <= 0) {
      clearInterval(scanInterval);
      completeScan(detection);
    }
    
    timeLeft--;
  }, 1000);
  
  playSound('scan');
}

/**
 * Complete scan dan tampilkan hasil
 */
async function completeScan(detection) {
  isScanning = false;
  startBtn.disabled = false;
  cameraBox.classList.remove('scanning');
  liveChipText.textContent = 'Scan Complete';
  
  const emotion = detection.emotion || 'neutral';
  const moodData = moodBank[emotion] || moodBank.neutral;
  
  // Simpan hasil
  lastResult = {
    emotion,
    confidence: detection.confidence,
    timestamp: new Date(),
    photo: lastCaptureDataUrl,
    moodData
  };
  
  // Display hasil
  const intro = moodData.intros[Math.floor(Math.random() * moodData.intros.length)];
  const feeling = moodData.feelings[Math.floor(Math.random() * moodData.feelings.length)];
  const selectedMenu = moodData.menus[0];
  
  const resultMessage = `
${intro}

${feeling}

Berdasarkan deteksi AI, menu yang paling cocok untuk vibe kamu hari ini adalah:
🍛 ${selectedMenu.name}
${selectedMenu.reason}
  `;
  
  moodPill.textContent = `Mood: ${emotion}`;
  headlineText.textContent = intro;
  resultText.textContent = resultMessage;
  
  // Show tiktok form
  tiktokCard.classList.remove('hidden');
  
  playSound('complete');
}

/**
 * Generate template
 */
async function generateTemplate() {
  if (!lastResult) return;
  
  const greeting = greetingSelect.value;
  const message = messageInput.value;
  const tiktok = tiktokInput.value;
  
  if (!message.trim()) {
    alert('Silakan isi pesan hari ini dulu');
    return;
  }
  
  const selectedMenu = lastResult.moodData.menus[0];
  
  // Update template
  const templatePhoto = document.getElementById('templatePhoto');
  const templatePhotoEmpty = document.getElementById('templatePhotoEmpty');
  templatePhoto.src = lastCaptureDataUrl;
  templatePhoto.classList.remove('hidden');
  templatePhotoEmpty.classList.add('hidden');
  
  document.getElementById('templateMood').textContent = lastResult.emotion;
  document.getElementById('templateMenu').textContent = selectedMenu.name;
  document.getElementById('templateMessage').textContent = resultText.textContent;
  document.getElementById('templateCustomerMessage').textContent = message;
  document.getElementById('templateCustomerLabel').textContent = `Pesan dari ${greeting}`;
  document.getElementById('templateFooterHandle').textContent = `TikTok: ${tiktok || '@usernamekamu'}`;
  
  // Show template
  tiktokCard.classList.add('hidden');
  templateCard.classList.remove('hidden');
  
  playSound('success');
}

/**
 * Skip form dan langsung ke template
 */
function skipToTemplate() {
  generateTemplate();
}

/**
 * Download template sebagai image
 */
async function downloadTemplate() {
  try {
    downloadBtn.disabled = true;
    downloadBtn.textContent = 'Downloading...';
    
    const exportCard = document.getElementById('exportCard');
    const canvas = await html2canvas(exportCard, {
      backgroundColor: null,
      scale: 2,
      logging: false
    });
    
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `nasipadangMAX-${new Date().getTime()}.png`;
    link.click();
    
    downloadBtn.disabled = false;
    downloadBtn.textContent = 'Unduh Template';
    waBtn.disabled = false;
    
    playSound('download');
    
  } catch (error) {
    console.error('Download error:', error);
    alert('Error mengunduh template');
    downloadBtn.disabled = false;
    downloadBtn.textContent = 'Unduh Template';
  }
}

/**
 * Open WhatsApp
 */
function openWhatsApp() {
  const message = `Cek hasil AI mood scan aku di nasipadangMAX! 🤖 Menu favorit aku hari ini: ${lastResult.moodData.menus[0].name}`;
  const waUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
}

/**
 * Toggle sound
 */
function toggleSound() {
  soundEnabled = !soundEnabled;
  soundBtn.textContent = `Sound: ${soundEnabled ? 'ON' : 'OFF'}`;
}

/**
 * Play sound effects
 */
function playSound(type) {
  if (!soundEnabled) return;
  
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  
  const soundMap = {
    scan: { freq: 400, duration: 0.1 },
    complete: { freq: 800, duration: 0.3 },
    success: { freq: 1000, duration: 0.2 },
    download: { freq: 600, duration: 0.15 }
  };
  
  const config = soundMap[type] || soundMap.scan;
  
  oscillator.frequency.value = config.freq;
  gain.gain.setValueAtTime(0.3, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + config.duration);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + config.duration);
}

// ========== START APP ==========
document.addEventListener('DOMContentLoaded', () => {
  console.log('📱 DOM loaded, initializing app...');
  initApp();
});
