import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      $content: './src/lib/content',
      $state: './src/lib/state',
      $shell: './src/lib/shell',
      $ui: './src/lib/ui'
    }
  }
};

export default config;
