import { updateSession } from './app/utils/supabase/middleware';
import { checkUserAuthorization } from './app/utils/middleware';

export async function middleware(request) {
  await updateSession(request);

  const authResponse = await checkUserAuthorization(request);
  return authResponse;
  
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};