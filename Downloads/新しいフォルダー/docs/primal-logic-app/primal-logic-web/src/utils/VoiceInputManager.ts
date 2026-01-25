/**
 * Voice Input Manager
 * 
 * Handles speech recognition interactions.
 */

export interface VoiceInputResult {
    text: string;
    isFinal: boolean;
}

type ResultCallback = (result: VoiceInputResult) => void;
type ErrorCallback = (error: any) => void;
type EndCallback = () => void;

export default class VoiceInputManager {
    private recognition: any;
    private isListening: boolean = false;
    private onResultCallback: ResultCallback | null = null;
    private onErrorCallback: ErrorCallback | null = null;
    private onEndCallback: EndCallback | null = null;

    constructor(options: { language: string; continuous: boolean; interimResults: boolean }) {
        // FIX: Call static method correctly
        if (VoiceInputManager.isAvailable()) {
            // @ts-ignore
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.lang = options.language;
            this.recognition.continuous = options.continuous;
            this.recognition.interimResults = options.interimResults;

            this.recognition.onresult = (event: any) => {
                let final = '';
                let interim = '';

                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        final += event.results[i][0].transcript;
                    } else {
                        interim += event.results[i][0].transcript;
                    }
                }

                if (this.onResultCallback) {
                    this.onResultCallback({
                        text: final || interim,
                        isFinal: !!final
                    });
                }
            };

            this.recognition.onerror = (event: any) => {
                if (this.onErrorCallback) {
                    this.onErrorCallback(event.error);
                }
            };

            this.recognition.onend = () => {
                this.isListening = false;
                if (this.onEndCallback) {
                    this.onEndCallback();
                }
            };
        }
    }

    static isAvailable(): boolean {
        // @ts-ignore
        return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
    }

    start() {
        if (this.recognition && !this.isListening) {
            try {
                this.recognition.start();
                this.isListening = true;
            } catch (e) {
                console.error('Failed to start recognition', e);
            }
        }
    }

    stop() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
            this.isListening = false;
        }
    }

    onResult(callback: ResultCallback) {
        this.onResultCallback = callback;
        return this;
    }

    onError(callback: ErrorCallback) {
        this.onErrorCallback = callback;
        return this;
    }

    onEnd(callback: EndCallback) {
        this.onEndCallback = callback;
        return this;
    }
}
