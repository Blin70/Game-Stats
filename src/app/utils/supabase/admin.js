import { createClient } from '@supabase/supabase-js';

export function createAdmin() {
    return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
});
}

//Use only in server components!!!