interface EnvConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
}

export const env: EnvConfig = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
};