// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import partytown from "@astrojs/partytown";


// https://astro.build/config
export default defineConfig({
  site: 'https://ms-arifin.vercel.app',
  integrations: [mdx(), sitemap(), partytown()],


  vite: {
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [tailwindcss()],
  },
});