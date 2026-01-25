-- Primal Logic - Supabase Database Schema
-- 
-- このSQLファイルをSupabaseのSQL Editorで実行して、テーブルを作成してください。

-- daily_logs テーブル
CREATE TABLE IF NOT EXISTS daily_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  date DATE NOT NULL,
  status JSONB NOT NULL,
  fuel JSONB NOT NULL,
  calculated_metrics JSONB NOT NULL,
  recovery_protocol JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- profiles テーブル
CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female')),
  height NUMERIC,
  weight NUMERIC,
  goal TEXT NOT NULL,
  dairy_tolerance BOOLEAN,
  metabolic_status TEXT NOT NULL CHECK (metabolic_status IN ('adapted', 'transitioning')),
  mode TEXT,
  target_carbs NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- streaks テーブル
CREATE TABLE IF NOT EXISTS streaks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_log_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックスを作成（パフォーマンス向上）
CREATE INDEX IF NOT EXISTS idx_daily_logs_user_id ON daily_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_logs_date ON daily_logs(date);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_streaks_user_id ON streaks(user_id);

-- Row Level Security (RLS) を有効化
ALTER TABLE daily_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;

-- RLSポリシー: ユーザーは自分のデータのみアクセス可能
CREATE POLICY "Users can view their own daily logs"
  ON daily_logs FOR SELECT
  USING (auth.uid()::text = user_id OR user_id LIKE 'anon_%');

CREATE POLICY "Users can insert their own daily logs"
  ON daily_logs FOR INSERT
  WITH CHECK (auth.uid()::text = user_id OR user_id LIKE 'anon_%');

CREATE POLICY "Users can update their own daily logs"
  ON daily_logs FOR UPDATE
  USING (auth.uid()::text = user_id OR user_id LIKE 'anon_%');

CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid()::text = user_id OR user_id LIKE 'anon_%');

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid()::text = user_id OR user_id LIKE 'anon_%');

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid()::text = user_id OR user_id LIKE 'anon_%');

CREATE POLICY "Users can view their own streak"
  ON streaks FOR SELECT
  USING (auth.uid()::text = user_id OR user_id LIKE 'anon_%');

CREATE POLICY "Users can insert their own streak"
  ON streaks FOR INSERT
  WITH CHECK (auth.uid()::text = user_id OR user_id LIKE 'anon_%');

CREATE POLICY "Users can update their own streak"
  ON streaks FOR UPDATE
  USING (auth.uid()::text = user_id OR user_id LIKE 'anon_%');

-- updated_at を自動更新するトリガー関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- トリガーを作成
CREATE TRIGGER update_daily_logs_updated_at
  BEFORE UPDATE ON daily_logs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_streaks_updated_at
  BEFORE UPDATE ON streaks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SNS自動投稿システム用テーブル
-- ============================================

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
