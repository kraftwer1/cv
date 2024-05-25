import { resolve } from "path"
import { defineConfig } from "vite"
import handlebars from "vite-plugin-handlebars"
import i18n from "./i18n.json"

export default defineConfig({
  server: {
    host: true,
  },
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        en: resolve(__dirname, "en/index.html"),
        de: resolve(__dirname, "de/index.html"),
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "partials"),
      helpers: {
        translate: (lang, key) =>
          lang === "de" && i18n[key] ? i18n[key] : key,
      },
    }),
  ],
})
