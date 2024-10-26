import { createClient, SupabaseClient } from '@supabase/supabase-js';

export type AnonClient = SupabaseClient

export const useAnonClient = () => 
    createClient('https://jpakcykxyuqogffggbyp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwYWtjeWt4eXVxb2dmZmdnYnlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5MjM4MzYsImV4cCI6MjA0NTQ5OTgzNn0._Jp7IoG26TxKbtYNiNG6CElz5LwVjoZnXbiqslHecqg')
