/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // 1. FIX: Fixes the 'outputFileTracingRoot' warning/error
  outputFileTracingRoot: path.join(__dirname, '../../'),

  // 2. FIX: The official, stable way to disable Turbopack in Next.js 16 
  // (by enabling a feature Turbopack doesn't support, forcing fallback to Webpack)
  compiler: {
    // Setting any Webpack-only feature forces Next.js to use Webpack
    emotion: true, 
  },
  
  // 3. Monorepo Schema visibility (Prisma fix)
  output: 'standalone', 
};

module.exports = nextConfig;