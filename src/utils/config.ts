const dev = process.env.NODE_ENV !== 'production';

export const isProduction = !dev;
export const server = dev
  ? 'http://localhost:3000'
  : 'https://eco-admin-self.vercel.app';
