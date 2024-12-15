import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import { CurrentlySupportedGames } from '../(authorized)/SupportedGames/page';

export async function checkUserAuthorization(request) {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_KEY;

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          const supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname.toLowerCase();

  const isUserPath = pathname.startsWith('/user/');
  
  if (
    (pathname.startsWith('/admin') && !user) ||
    isUserPath &&
    !pathname.startsWith("/user/signin") &&
    !pathname.startsWith("/user/signup")
  ) {
    if(!user){
      return NextResponse.redirect(new URL("/user/SignIn", request.nextUrl));
    }
  }

  const gamesEncoded = CurrentlySupportedGames.map(game => encodeURIComponent(game.name.toLowerCase()));

  if (pathname.startsWith('/games')) {
    const gameNameInUrl = pathname.split('/games/')[1]?.split('/')[0];
    
    if (!gamesEncoded.includes(gameNameInUrl)) {
        return NextResponse.redirect(new URL('/unauthorized', request.nextUrl));
    }
  }

  return NextResponse.next();
}