-- Users table is handled by Supabase Auth

-- Organizations table
CREATE TABLE organizations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  owner_user_id UUID REFERENCES auth.users,
  org_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Persons table (Org Chart Nodes)
CREATE TABLE persons (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  org_id UUID REFERENCES organizations,
  title TEXT NOT NULL,
  position TEXT NOT NULL,
  background TEXT,
  job_function TEXT,
  reports_to UUID REFERENCES persons,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Agents table
CREATE TABLE agents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  org_id UUID REFERENCES organizations,
  person_id UUID REFERENCES persons,
  agent_name TEXT NOT NULL,
  role TEXT NOT NULL,
  goal TEXT,
  backstory TEXT,
  tool_use TEXT,
  expected_output TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Tasks table
CREATE TABLE tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  org_id UUID REFERENCES organizations,
  task_name TEXT NOT NULL,
  task_description TEXT,
  expected_output TEXT,
  agent_id UUID REFERENCES agents,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Organization sharing
CREATE TABLE org_shares (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  org_id UUID REFERENCES organizations,
  user_id UUID REFERENCES auth.users,
  access_level TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);
