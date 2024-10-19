/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['websocket'],
    },
    images: {
        remotePatterns: [ // Wildcard on all hostname is very bad practice, malicious threats can exploit this
          {
            protocol: 'https',
            hostname: '**',
            port: '',
            pathname: '/**',
          },
        ],
      },
};

module.exports = nextConfig;
