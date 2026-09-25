import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Placeholder-waarden uit .env.example tellen niet als "geconfigureerd".
export const supabaseConfigured = Boolean(url && anonKey && !url.includes('xxxxx'));

export const supabase = supabaseConfigured ? createClient(url, anonKey) : null;
