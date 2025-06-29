import type { NextConfig } from "next";

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://m.stripe.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://avatars.githubusercontent.com https://stripe.com https://m.stripe.com;
    font-src 'self' https://esm.sh;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://m.stripe.com;
    frame-ancestors 'none';
    upgrade-insecure-requests;
`

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: ['@excalidraw/excalidraw', 'use-debounce'],
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
