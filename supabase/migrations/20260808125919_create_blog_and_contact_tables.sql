/*
# Create blog posts and contact messages tables

1. New Tables
- `blog_posts`
  - `id` (uuid, primary key)
  - `title` (text, not null)
  - `slug` (text, unique, not null)
  - `summary` (text, not null)
  - `content` (text, not null) — markdown body
  - `cover_image` (text) — optional URL
  - `tags` (text[]) — optional array of tags
  - `published` (boolean, default false)
  - `published_at` (timestamptz) — when the post goes live
  - `created_at` (timestamptz, default now())
  - `updated_at` (timestamptz, default now())
- `contact_messages`
  - `id` (uuid, primary key)
  - `name` (text, not null)
  - `email` (text, not null)
  - `subject` (text)
  - `message` (text, not null)
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on both tables.
- blog_posts: public read for published posts; writes restricted to authenticated (site owner).
- contact_messages: public insert (anyone can submit); reads restricted to authenticated (site owner).
3. Indexes
- blog_posts slug (unique)
- blog_posts published_at desc
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  summary text NOT NULL,
  content text NOT NULL,
  cover_image text,
  tags text[] DEFAULT '{}',
  published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- blog_posts: anyone can read published posts
DROP POLICY IF EXISTS "public_read_published_posts" ON blog_posts;
CREATE POLICY "public_read_published_posts" ON blog_posts FOR SELECT
  TO anon, authenticated USING (published = true);

-- blog_posts: authenticated owner can do everything
DROP POLICY IF EXISTS "owner_insert_posts" ON blog_posts;
CREATE POLICY "owner_insert_posts" ON blog_posts FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "owner_update_posts" ON blog_posts;
CREATE POLICY "owner_update_posts" ON blog_posts FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "owner_delete_posts" ON blog_posts;
CREATE POLICY "owner_delete_posts" ON blog_posts FOR DELETE
  TO authenticated USING (true);

-- contact_messages: anyone can submit a message
DROP POLICY IF EXISTS "public_insert_messages" ON contact_messages;
CREATE POLICY "public_insert_messages" ON contact_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- contact_messages: only authenticated owner can read
DROP POLICY IF EXISTS "owner_read_messages" ON contact_messages;
CREATE POLICY "owner_read_messages" ON contact_messages FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "owner_delete_messages" ON contact_messages;
CREATE POLICY "owner_delete_messages" ON contact_messages FOR DELETE
  TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts (published_at DESC);

-- updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS blog_posts_updated_at ON blog_posts;
CREATE TRIGGER blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
