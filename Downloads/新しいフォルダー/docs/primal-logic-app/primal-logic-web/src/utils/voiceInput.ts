/**
 * CarnivoreOS - Voice Input (Web Speech API)
 *
 * WindowsH繧ｭ繝ｼ縺ｧ縺ｮ髻ｳ螢ｰ蜈･蜉帛ｯｾ蠢・ * Web Speech API繧剃ｽｿ逕ｨ縺励◆髻ｳ螢ｰ隱崎ｭ俶ｩ溯・
 */

import { logError } from './errorHandler';

// Web Speech API縺ｮ蝙句ｮ夂ｾｩ
interface SpeechRecognitionInterface extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message: string;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

export interface VoiceInputOptions {
  language?: string; // 'ja-JP', 'en-US', 'fr-FR', 'de-DE'
  continuous?: boolean; // 騾｣邯夊ｪ崎ｭ・  interimResults?: boolean; // 荳ｭ髢鍋ｵ先棡繧定ｿ斐☆
  maxAlternatives?: number; // 蛟呵｣懈焚
}

export interface VoiceInputResult {
  text: string;
  confidence: number;
  isFinal: boolean;
}

export class VoiceInputManager {
  private recognition: SpeechRecognitionInterface | null = null;
  private isListening: boolean = false;
  private onResultCallback: ((result: VoiceInputResult) => void) | null = null;
  private onErrorCallback: ((error: string) => void) | null = null;
  private onEndCallback: (() => void) | null = null;

  constructor(options: VoiceInputOptions = {}) {
    // Web Speech API縺ｮ繧ｵ繝昴・繝育｢ｺ隱・    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      console.warn('Web Speech API is not supported in this browser.');
      return;
    }

    this.recognition = new SpeechRecognitionClass();
    if (!this.recognition) return;

    this.recognition.lang = options.language || 'ja-JP';
    this.recognition.continuous = options.continuous ?? false;
    this.recognition.interimResults = options.interimResults ?? true;
    this.recognition.maxAlternatives = options.maxAlternatives || 1;

    // 繧､繝吶Φ繝医ワ繝ｳ繝峨Λ繝ｼ
    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[event.results.length - 1];
      const transcript = result[0].transcript;
      const confidence = result[0].confidence || 0.8;

      if (this.onResultCallback) {
        this.onResultCallback({
          text: transcript,
          confidence,
          isFinal: result.isFinal,
        });
      }
    };

    this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      const error = event.error;
      if (this.onErrorCallback) {
        this.onErrorCallback(error);
      }
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (this.onEndCallback) {
        this.onEndCallback();
      }
    };
  }

  /**
   * 髻ｳ螢ｰ隱崎ｭ倥ｒ髢句ｧ・   */
  start(): void {
    if (!this.recognition) {
      logError(new Error('Speech Recognition is not available.'), {
        component: 'voiceInput',
        action: 'start',
      });
      return;
    }

    if (this.isListening) {
      console.warn('Voice input is already listening.');
      return;
    }

    try {
      this.recognition.start();
      this.isListening = true;
    } catch (error) {
      logError(error, { component: 'voiceInput', action: 'start' });
    }
  }

  /**
   * 髻ｳ螢ｰ隱崎ｭ倥ｒ蛛懈ｭ｢
   */
  stop(): void {
    if (!this.recognition || !this.isListening) {
      return;
    }

    try {
      this.recognition.stop();
      this.isListening = false;
    } catch (error) {
      logError(error, { component: 'voiceInput', action: 'stop' });
    }
  }

  /**
   * 邨先棡繧ｳ繝ｼ繝ｫ繝舌ャ繧ｯ繧定ｨｭ螳・   */
  onResult(callback: (result: VoiceInputResult) => void): void {
    this.onResultCallback = callback;
  }

  /**
   * 繧ｨ繝ｩ繝ｼ繧ｳ繝ｼ繝ｫ繝舌ャ繧ｯ繧定ｨｭ螳・   */
  onError(callback: (error: string) => void): void {
    this.onErrorCallback = callback;
  }

  /**
   * 邨ゆｺ・さ繝ｼ繝ｫ繝舌ャ繧ｯ繧定ｨｭ螳・   */
  onEnd(callback: () => void): void {
    this.onEndCallback = callback;
  }

  /**
   * 迴ｾ蝨ｨ縺ｮ險隱槭ｒ險ｭ螳・   */
  setLanguage(language: string): void {
    if (this.recognition) {
      this.recognition.lang = language;
    }
  }

  /**
   * 髻ｳ螢ｰ隱崎ｭ倥′蛻ｩ逕ｨ蜿ｯ閭ｽ縺九←縺・°
   */
  static isAvailable(): boolean {
    interface WindowWithSpeechRecognition {
      SpeechRecognition?: any;
      webkitSpeechRecognition?: any;
    }
    const win = window as unknown as WindowWithSpeechRecognition;
    const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;
    return !!SpeechRecognition;
  }
}

/**
 * WindowsH繧ｭ繝ｼ縺ｧ縺ｮ髻ｳ螢ｰ蜈･蜉幢ｼ医ヶ繝ｩ繧ｦ繧ｶ縺ｮ蛻ｶ邏・↓繧医ｊ螳悟・蟇ｾ蠢懊・蝗ｰ髮｣縺縺後∝庄閭ｽ縺ｪ遽・峇縺ｧ螳溯｣・ｼ・ *
 * 豕ｨ諢・ WindowsH繧ｭ繝ｼ縺ｯOS繝ｬ繝吶Ν縺ｮ繧ｷ繝ｧ繝ｼ繝医き繝・ヨ縺ｮ縺溘ａ縲√ヶ繝ｩ繧ｦ繧ｶ縺九ｉ逶ｴ謗･蛻ｶ蠕｡縺吶ｋ縺薙→縺ｯ縺ｧ縺阪∪縺帙ｓ縲・ * 莉｣繧上ｊ縺ｫ縲√・繧､繧ｯ繝懊ち繝ｳ繧偵け繝ｪ繝・け縺吶ｋ縺九√き繧ｹ繧ｿ繝繧ｷ繝ｧ繝ｼ繝医き繝・ヨ繧ｭ繝ｼ・井ｾ・ Ctrl+Shift+V・峨ｒ菴ｿ逕ｨ縺励∪縺吶・ */
export function setupVoiceInputShortcut(
  onStart: () => void,
  shortcutKey: string = 'v', // 繝・ヵ繧ｩ繝ｫ繝・ Ctrl+Shift+V
  modifiers: { ctrl?: boolean; shift?: boolean; alt?: boolean } = { ctrl: true, shift: true }
): void {
  document.addEventListener('keydown', (event) => {
    const isShortcut =
      event.key.toLowerCase() === shortcutKey.toLowerCase() &&
      (!modifiers.ctrl || event.ctrlKey) &&
      (!modifiers.shift || event.shiftKey) &&
      (!modifiers.alt || event.altKey);

    if (isShortcut) {
      event.preventDefault();
      onStart();
    }
  });
}

