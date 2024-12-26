/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'jgimhxrvxhmownpbwmod.supabase.co',
          pathname: '/storage/v1/object/public/**',
        },
        {
          protocol: 'https',
          hostname: 'secure.download.dm.origin.com',
          port: '',
          pathname: '/production/avatar/prod/userAvatar/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  