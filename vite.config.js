import { defineConfig } from "vite";
import htmlPurge from "vite-plugin-purgecss";
import { ViteMinifyPlugin } from "vite-plugin-minify";

export default defineConfig({
  plugins: [htmlPurge([htmlPurge()]), ViteMinifyPlugin({})]
});
