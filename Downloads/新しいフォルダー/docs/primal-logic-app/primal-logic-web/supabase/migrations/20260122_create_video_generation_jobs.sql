-- 動画生成ジョブテーブル
CREATE TABLE IF NOT EXISTS video_generation_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audio_url TEXT NOT NULL,
  images JSONB NOT NULL,
  subtitles JSONB,
  width INTEGER DEFAULT 1080,
  height INTEGER DEFAULT 1920,
  fps INTEGER DEFAULT 30,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, processing, completed, failed
  video_url TEXT,
  error TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_video_generation_jobs_status ON video_generation_jobs(status);
CREATE INDEX IF NOT EXISTS idx_video_generation_jobs_created_at ON video_generation_jobs(created_at);

-- 更新日時を自動更新するトリガー
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_video_generation_jobs_updated_at
  BEFORE UPDATE ON video_generation_jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
