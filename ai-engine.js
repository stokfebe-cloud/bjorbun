/**
 * AI Engine untuk nasipadangMAX - Mood Detection
 * Menggunakan TensorFlow.js + Face-api untuk deteksi emosi real-time
 */

class AIEngine {
  constructor() {
    this.modelsLoaded = false;
    this.engineMode = 'fallback';
    this.emotionLabels = ['neutral', 'happy', 'sad', 'angry', 'fearful', 'disgusted', 'surprised'];
    this.detectionHistory = [];
    this.maxHistoryLength = 30;
  }

  /**
   * Load semua model yang diperlukan
   */
  async loadModels() {
    try {
      console.log('🤖 Loading AI models...');
      
      // Check jika face-api sudah loaded
      if (typeof faceapi === 'undefined') {
        throw new Error('face-api.js not loaded');
      }

      // Load face detection models dari CDN
      const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/';
      
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
      ]);

      this.modelsLoaded = true;
      this.engineMode = 'ai-active';
      
      console.log('✅ AI Models loaded successfully');
      return { success: true, mode: 'ai-active' };
      
    } catch (error) {
      console.warn('⚠️ AI Models failed to load, using fallback mode:', error.message);
      this.modelsLoaded = false;
      this.engineMode = 'fallback';
      return { success: false, mode: 'fallback', error: error.message };
    }
  }

  /**
   * Deteksi emosi dari frame video
   */
  async detectEmotion(videoElement) {
    if (!videoElement) {
      return this.getFallbackEmotion();
    }

    try {
      // Jika models tidak loaded, gunakan fallback
      if (!this.modelsLoaded || this.engineMode === 'fallback') {
        return this.getFallbackEmotion();
      }

      // Deteksi wajah dan expression
      const detections = await faceapi
        .detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      if (detections.length === 0) {
        return {
          success: false,
          emotion: 'neutral',
          confidence: 0,
          message: 'Wajah tidak terdeteksi'
        };
      }

      // Ambil deteksi wajah pertama
      const detection = detections[0];
      const expressions = detection.expressions;

      // Cari emosi dengan confidence tertinggi
      let topEmotion = 'neutral';
      let topConfidence = 0;

      for (const [emotion, confidence] of Object.entries(expressions)) {
        if (confidence > topConfidence) {
          topConfidence = confidence;
          topEmotion = emotion;
        }
      }

      // Tambah ke history untuk smoothing
      this.detectionHistory.push({
        emotion: topEmotion,
        confidence: topConfidence,
        timestamp: Date.now(),
        allExpressions: expressions
      });

      if (this.detectionHistory.length > this.maxHistoryLength) {
        this.detectionHistory.shift();
      }

      // Hitung dominant emotion dari history
      const dominantEmotion = this.calculateDominantEmotion();

      return {
        success: true,
        emotion: dominantEmotion,
        confidence: topConfidence,
        allExpressions: expressions,
        detection: {
          face: detection.detection,
          expressions: expressions
        }
      };

    } catch (error) {
      console.error('Error detecting emotion:', error);
      return this.getFallbackEmotion();
    }
  }

  /**
   * Hitung emosi dominan dari history deteksi
   */
  calculateDominantEmotion() {
    if (this.detectionHistory.length === 0) return 'neutral';

    const emotionCounts = {};
    this.emotionLabels.forEach(e => emotionCounts[e] = 0);

    this.detectionHistory.forEach(detection => {
      emotionCounts[detection.emotion]++;
    });

    let dominant = 'neutral';
    let maxCount = 0;

    for (const [emotion, count] of Object.entries(emotionCounts)) {
      if (count > maxCount) {
        maxCount = count;
        dominant = emotion;
      }
    }

    return dominant;
  }

  /**
   * Fallback emotion detection (random)
   */
  getFallbackEmotion() {
    const fallbackEmotions = ['happy', 'sad', 'neutral', 'surprised'];
    const randomEmotion = fallbackEmotions[Math.floor(Math.random() * fallbackEmotions.length)];
    
    return {
      success: false,
      emotion: randomEmotion,
      confidence: 0.5,
      message: 'Using fallback detection (models not fully loaded)',
      isFromAI: false
    };
  }

  /**
   * Reset detection history
   */
  resetHistory() {
    this.detectionHistory = [];
  }

  /**
   * Get engine status
   */
  getStatus() {
    return {
      modelsLoaded: this.modelsLoaded,
      engineMode: this.engineMode,
      detectionHistoryLength: this.detectionHistory.length
    };
  }
}

// Export untuk digunakan
const aiEngine = new AIEngine();
