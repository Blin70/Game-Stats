import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_KEY;

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, 
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // `setAll` method gets from a Server Component so it throws an error, but this 
            // can be ignored because we have middleware refreshing the user sessions.
          }
        },
      },
    }
  )
}