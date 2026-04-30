/*
  # Create Portfolio Database Schema

  1. New Tables
    - `projects` - Portfolio projects showcase
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `tech_stack` (text[])
      - `image_url` (text)
      - `live_link` (text)
      - `source_link` (text)
      - `created_at` (timestamptz)
    
    - `skills` - Technical and professional skills
      - `id` (uuid, primary key)
      - `name` (text)
      - `category` (text: 'Office', 'Accounting', 'Coding')
      - `proficiency_level` (integer: 1-5)
      - `created_at` (timestamptz)
    
    - `experience` - Educational and professional experience
      - `id` (uuid, primary key)
      - `title` (text)
      - `institution` (text)
      - `start_date` (date)
      - `end_date` (date, nullable)
      - `description` (text)
      - `created_at` (timestamptz)
    
    - `certificates` - Certificates and credentials
      - `id` (uuid, primary key)
      - `title` (text)
      - `issue_date` (date)
      - `issuer` (text)
      - `file_url` (text)
      - `description` (text)
      - `created_at` (timestamptz)
    
    - `contact_submissions` - Contact form submissions
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `subject` (text)
      - `message` (text)
      - `read_status` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public SELECT policies for projects, skills, experience, certificates (read-only)
    - Public INSERT policy for contact_submissions (rate-limited via edge function)
    - No UPDATE/DELETE for public users

  3. Indexes
    - Index on contact_submissions.created_at for sorting
    - Index on skills.category for filtering
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  tech_stack text[] DEFAULT '{}',
  image_url text,
  live_link text,
  source_link text,
  created_at timestamptz DEFAULT now()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('Office', 'Accounting', 'Coding')),
  proficiency_level integer DEFAULT 3 CHECK (proficiency_level >= 1 AND proficiency_level <= 5),
  created_at timestamptz DEFAULT now()
);

-- Create experience table
CREATE TABLE IF NOT EXISTS experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  institution text NOT NULL,
  start_date date NOT NULL,
  end_date date,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  issue_date date NOT NULL,
  issuer text NOT NULL,
  file_url text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  read_status boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Projects: Public read-only access
CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  TO public
  USING (true);

-- Skills: Public read-only access
CREATE POLICY "Anyone can view skills"
  ON skills FOR SELECT
  TO public
  USING (true);

-- Experience: Public read-only access
CREATE POLICY "Anyone can view experience"
  ON experience FOR SELECT
  TO public
  USING (true);

-- Certificates: Public read-only access
CREATE POLICY "Anyone can view certificates"
  ON certificates FOR SELECT
  TO public
  USING (true);

-- Contact submissions: Public insert only (no delete/update)
CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "No one can view contact submissions"
  ON contact_submissions FOR SELECT
  TO public
  USING (false);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_experience_start_date ON experience(start_date DESC);