import { createClient, SupabaseClient } from '@supabase/supabase-js';

export type AnonClient = SupabaseClient

const key = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY
const url = import.meta.env.VITE_SUPABASE_URL
export const useAdminClient = () => 
    createClient(url as string, key as string)
