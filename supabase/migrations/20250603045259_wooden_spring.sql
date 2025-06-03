/*
  # Create vocabulary database schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
    
    - `words`
      - `id` (uuid, primary key) 
      - `word` (text)
      - `part_of_speech` (text)
      - `meaning` (text)
      - `usage` (text)
      - `synonyms` (text[])
      - `antonyms` (text[])
      - `etymology` (text)
      - `root_info` (text)
      - `past_tense` (text)
      - `present_tense` (text)
      - `future_tense` (text)
      - `quote` (text)
      - `difficulty` (text)
      - `created_at` (timestamp)

    - `user_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `word_id` (uuid, foreign key)
      - `is_learned` (boolean)
      - `is_favorite` (boolean)
      - `last_reviewed` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Create words table
CREATE TABLE IF NOT EXISTS words (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  word text NOT NULL,
  part_of_speech text NOT NULL,
  meaning text NOT NULL,
  usage text,
  synonyms text[] DEFAULT '{}',
  antonyms text[] DEFAULT '{}',
  etymology text,
  root_info text,
  past_tense text,
  present_tense text,
  future_tense text,
  quote text,
  difficulty text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE words ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read words"
  ON words
  FOR SELECT
  TO authenticated
  USING (true);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  word_id uuid REFERENCES words(id) ON DELETE CASCADE,
  is_learned boolean DEFAULT false,
  is_favorite boolean DEFAULT false,
  last_reviewed timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, word_id)
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own progress"
  ON user_progress
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_words_word ON words(word);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_word_id ON user_progress(word_id);