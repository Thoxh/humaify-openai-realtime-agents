// src/app/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Wrapper für SQL-Abfragen mit besserer Fehlerbehandlung
export async function executeQuery(sql: string) {
  try {
    const { data, error } = await supabase.rpc('execute_sql', { sql_query: sql });
    
    if (error) {
      console.error('Supabase query error:', error);
      throw error;
    }
    
    return { data, error: null };
  } catch (error) {
    console.error('Database query failed:', error);
    throw error;
  }
}