import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  return {
    // هذا السطر هو الحل الأساسي لمشكلة عدم فتح الموقع
    base: './', 
    
    plugins: [
      react(), 
      tailwindcss()
    ],
    
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './'),
      },
    },
    
    server: {
      // إعدادات التطوير
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    
    build: {
      outDir: 'dist', // المجلد الذي سيبحث عنه Netlify
      sourcemap: false,
    }
  };
});