import htmlPurge from "vite-plugin-html-purgecss";

export default {
  assetsInclude: ["**/*.mp3"],
  plugins: [htmlPurge()]
};
