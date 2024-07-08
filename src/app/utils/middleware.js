import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

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
          supabaseResponse = NextResponse.next({
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
  const userNameFromPath = pathname.split('/')[2];

  const isUserPath = pathname.startsWith('/user/');

  if (
    isUserPath &&
    !pathname.startsWith("/user/signin") &&
    !pathname.startsWith("/user/signup") &&
    (!user || user.user_metadata.first_name.toLowerCase() !== userNameFromPath)
  ) {
    if(!user){
      return NextResponse.redirect(new URL("/user/SignIn", request.nextUrl));
    }else{
      return NextResponse.redirect(new URL("/unauthorized", request.nextUrl));
    }
    
  }

  return NextResponse.next();
}