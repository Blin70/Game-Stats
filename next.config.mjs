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
          pathname: '/production/avatar/prod/**',
        },
        {
          protocol: 'https',
          hostname: 'avatars.trackercdn.com',
          port: '',
          pathname: '/api/avatar/**',
        },
        {
          protocol: 'https',
          hostname: 'trackercdn.com',
          port: '',
          pathname: '/cdn/**',
        },
        {
          protocol: 'https',
          hostname: 'ubisoft-avatars.akamaized.net',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'avatars.steamstatic.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  