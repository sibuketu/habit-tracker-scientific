-- SNS自動投稿システム用データベーススキーマ
-- 
-- このSQLファイルをSupabaseのSQL Editorで実行して、SNS自動投稿用のテーブルを作成してください。
-- 注意: 既に `update_updated_at_column()` 関数が存在する場合は、エラーが出ますが無視してOKです。

-- carnivore_content テーブル（コンテンツ保存）
CREATE TABLE IF NOT EXISTS carnivore_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL,
  title TEXT NOT NULL,
  script TEXT NOT NULL,
  hook TEXT NOT NULL,
  scientific_evidence TEXT,
  hashtags TEXT[] DEFAULT '{}',
  keywords TEXT[] DEFAULT '{}',
  duration INTEGER NOT NULL,
  video_url TEXT,
  video_status TEXT DEFAULT 'pending', -- pending, generating, completed, failed
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by TEXT DEFAULT 'agent1'
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_carnivore_content_status ON carnivore_content(video_status);
CREATE INDEX IF NOT EXISTS idx_carnivore_content_created_at ON carnivore_content(created_at DESC);

-- sns_posts テーブル（投稿履歴）
CREATE TABLE IF NOT EXISTS sns_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID REFERENCES carnivore_content(id) ON DELETE CASCADE,
  platform TEXT NOT NULL, -- youtube, instagram, tiktok, facebook, linkedin, pinterest
  post_id TEXT, -- 各プラットフォームの投稿ID
  post_url TEXT,
  status TEXT DEFAULT 'pending', -- pending, published, failed
  error_message TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_sns_posts_content_id ON sns_posts(content_id);
CREATE INDEX IF NOT EXISTS idx_sns_posts_platform ON sns_posts(platform);
CREATE INDEX IF NOT EXISTS idx_sns_posts_status ON sns_posts(status);
CREATE INDEX IF NOT EXISTS idx_sns_posts_published_at ON sns_posts(published_at DESC);

-- error_logs テーブル（エラーログ）
CREATE TABLE IF NOT EXISTS error_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID REFERENCES carnivore_content(id) ON DELETE SET NULL,
  function_name TEXT NOT NULL, -- orchestrator, create-video, publish-youtube, etc.
  platform TEXT, -- youtube, instagram, etc. (null if not platform-specific)
  error_type TEXT NOT NULL, -- api_error, timeout, validation_error, etc.
  error_message TEXT NOT NULL,
  error_stack TEXT,
  request_data JSONB,
  response_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_error_logs_content_id ON error_logs(content_id);
CREATE INDEX IF NOT EXISTS idx_error_logs_function_name ON error_logs(function_name);
CREATE INDEX IF NOT EXISTS idx_error_logs_platform ON error_logs(platform);
CREATE INDEX IF NOT EXISTS idx_error_logs_created_at ON error_logs(created_at DESC);

-- sns_manual_posts テーブル（X/Twitter手動投稿用）
CREATE TABLE IF NOT EXISTS sns_manual_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID REFERENCES carnivore_content(id) ON DELETE CASCADE,
  platform TEXT DEFAULT 'twitter', -- twitter, threads
  post_urls JSONB, -- 他のプラットフォームへの投稿URLリスト
  status TEXT DEFAULT 'pending', -- pending, posted, skipped
  posted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_sns_manual_posts_content_id ON sns_manual_posts(content_id);
CREATE INDEX IF NOT EXISTS idx_sns_manual_posts_status ON sns_manual_posts(status);

-- updated_at を自動更新するトリガー関数（既に存在する場合はスキップ）
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- トリガーを作成（updated_at自動更新）
CREATE TRIGGER update_carnivore_content_updated_at
  BEFORE UPDATE ON carnivore_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sns_posts_updated_at
  BEFORE UPDATE ON sns_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sns_manual_posts_updated_at
  BEFORE UPDATE ON sns_manual_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) を有効化
ALTER TABLE carnivore_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE sns_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE error_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sns_manual_posts ENABLE ROW LEVEL SECURITY;

-- RLSポリシー: Service Role Keyでアクセス可能にする（Functionsから使用）
CREATE POLICY "Service role can do everything on carnivore_content"
  ON carnivore_content
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can do everything on sns_posts"
  ON sns_posts
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can do everything on error_logs"
  ON error_logs
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can do everything on sns_manual_posts"
  ON sns_manual_posts
  FOR ALL USING (auth.role() = 'service_role');
