
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'kljixwlnnyjbcqeonizx.supabase.co', // Storage domain
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/blog/vantagens-de-antecipar-salario-com-antecipy-como-extrair-efici-ncia-m-xima-no-vantagens-de-antecipar-salario-com-antecipy',
        destination: '/blog/vantagens-antecipar-salario-antecipy',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
