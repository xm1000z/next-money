/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['notas.ai'],
    // O usar remotePatterns para más seguridad
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'notas.ai',
        pathname: '/**',
      },
    ],
  },
  // ... resto de la configuración
}; 