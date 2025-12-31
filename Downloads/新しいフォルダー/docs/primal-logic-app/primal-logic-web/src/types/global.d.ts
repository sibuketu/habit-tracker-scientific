interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
}

declare var SpeechRecognition: any;
declare var webkitSpeechRecognition: any;

declare class BarcodeDetector {
    constructor(options?: { formats: string[] });
    detect(image: ImageBitmapSource): Promise<Array<{ rawValue: string; format: string }>>;
    static getSupportedFormats(): Promise<string[]>;
}
