/*
 * ═══════════════════════════════════════════════════════
 *  SUPABASE CONFIGURATION — Launch My Clothing Brand
 *  File: supabase-config.js
 *  Include this script in every HTML page
 * ═══════════════════════════════════════════════════════
 *
 *  SETUP STEPS (one time only):
 *  1. Go to https://supabase.com → Sign up free
 *  2. Create a new project (name: lmcb, region: South Asia)
 *  3. Wait ~2 min for project to spin up
 *  4. Go to Project Settings → API
 *  5. Copy "Project URL" → paste below as SUPABASE_URL
 *  6. Copy "anon public" key → paste below as SUPABASE_ANON_KEY
 *  7. Go to SQL Editor → run the SQL below to create tables
 *
 * ═══════════════════════════════════════════════════════
 *  SQL TO RUN IN SUPABASE SQL EDITOR:
 * ═══════════════════════════════════════════════════════

-- Users table (extends Supabase auth)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text,
  email text unique not null,
  plan text default 'free' check (plan in ('free','basic','brand_builder','pro_elite')),
  plan_started_at timestamptz,
  plan_expires_at timestamptz,
  downloads_used integer default 0,
  downloads_limit integer default 0,
  reset_requested boolean default false,
  reset_requested_at timestamptz,
  created_at timestamptz default now(),
  last_login timestamptz
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name)
  values (new.id, new.email, new.raw_user_meta_data->>'name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Password reset log
create table public.password_resets (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  requested_at timestamptz default now(),
  account_found boolean default false
);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.password_resets enable row level security;

-- Policies: users can read/update their own profile
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Admin can read all (use service role key for admin panel)
create policy "Service role has full access to profiles" on public.profiles
  using (true) with check (true);

 * ═══════════════════════════════════════════════════════
 */

// ── PASTE YOUR SUPABASE CREDENTIALS HERE ────────────────
const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL';       // e.g. https://abcxyz.supabase.co
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';     // long string starting with eyJ...

// ── PLAN CONFIG ──────────────────────────────────────────
const PLANS = {
  basic: {
    name: 'Basic',
    price: 499,
    downloads: 4,
    features: ['4 Pattern downloads per month', 'Email support', 'Pattern library access']
  },
  brand_builder: {
    name: 'Brand Builder',
    price: 999,
    downloads: 9,
    features: ['9 Pattern downloads per month', 'Full manufacturer database', 'Priority email support', 'WhatsApp support', 'Early access to new patterns']
  },
  pro_elite: {
    name: 'Pro Elite',
    price: 1599,
    downloads: 15,
    features: ['15 Pattern downloads per month', 'Complete manufacturer database', 'Direct phone support', 'Priority expert consultation', 'Custom pattern requests', 'Spec sheet access']
  }
};

// ── PLAN ACCESS RULES ────────────────────────────────────
const PLAN_ACCESS = {
  manufacturer_contacts: ['brand_builder', 'pro_elite'],
  spec_sheets:           ['brand_builder', 'pro_elite'],
  pattern_library:       ['basic', 'brand_builder', 'pro_elite'],
  industry_insights:     ['brand_builder', 'pro_elite'],
  whatsapp_support:      ['brand_builder', 'pro_elite'],
  phone_support:         ['pro_elite'],
  custom_patterns:       ['pro_elite']
};

// ── SUPABASE CLIENT (loaded via CDN in each page) ────────
let _supabase = null;

function getSupabase() {
  if (_supabase) return _supabase;
  if (typeof window !== 'undefined' && window.supabase) {
    _supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return _supabase;
}

// ── AUTH HELPERS ─────────────────────────────────────────

async function signUp(email, password, name) {
  const sb = getSupabase();
  const { data, error } = await sb.auth.signUp({
    email, password,
    options: { data: { name } }
  });
  return { data, error };
}

async function signIn(email, password) {
  const sb = getSupabase();
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (!error && data.user) {
    // Update last login
    await sb.from('profiles').update({ last_login: new Date().toISOString() }).eq('id', data.user.id);
  }
  return { data, error };
}

async function signOut() {
  const sb = getSupabase();
  return await sb.auth.signOut();
}

async function getCurrentUser() {
  const sb = getSupabase();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return null;
  const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
  return { ...user, profile };
}

async function sendPasswordReset(email) {
  const sb = getSupabase();
  // Log the request
  await sb.from('password_resets').insert({ email, account_found: true });
  // Send actual reset email via Supabase
  const { error } = await sb.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password.html`
  });
  return { error };
}

async function getUserProfile(userId) {
  const sb = getSupabase();
  const { data, error } = await sb.from('profiles').select('*').eq('id', userId).single();
  return { data, error };
}

// ── ADMIN HELPERS (use service role in production) ───────

async function getAllUsers() {
  const sb = getSupabase();
  const { data, error } = await sb.from('profiles').select('*').order('created_at', { ascending: false });
  return { data, error };
}

async function deleteUserById(userId) {
  const sb = getSupabase();
  const { error } = await sb.from('profiles').delete().eq('id', userId);
  return { error };
}

async function getPasswordResets() {
  const sb = getSupabase();
  const { data, error } = await sb.from('password_resets').select('*').order('requested_at', { ascending: false });
  return { data, error };
}

// ── PLAN CHECK ────────────────────────────────────────────

function hasPlanAccess(userPlan, feature) {
  const allowed = PLAN_ACCESS[feature] || [];
  return allowed.includes(userPlan);
}

function getPlanDetails(planKey) {
  return PLANS[planKey] || null;
}

// ── SESSION GUARD (call on protected pages) ──────────────

async function requireLogin(redirectTo = '/login.html') {
  const sb = getSupabase();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) {
    window.location.href = redirectTo;
    return null;
  }
  return user;
}
