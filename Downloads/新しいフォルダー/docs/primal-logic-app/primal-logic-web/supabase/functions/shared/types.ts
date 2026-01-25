// 共通型定義

export interface CarnivoreContent {
  topic: string;
  title: string;
  script: string;
  hook: string;
  scientificEvidence?: string;
  hashtags: string[];
  keywords: string[];
  duration: number;
}

export interface VideoOutput {
  video_url: string;
  video_id?: string;
  status: 'completed' | 'failed';
}

export interface SNSPublishResult {
  platform: string;
  status: 'success' | 'failed';
  url?: string;
  post_id?: string;
  error?: string;
}

export interface OrchestratorResponse {
  content_id: string;
  video_url: string;
  posts: SNSPublishResult[];
  manual_post_urls: string[];
  summary: {
    total: number;
    success: number;
    failed: number;
  };
}

