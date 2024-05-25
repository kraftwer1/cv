import { resolve } from "path"
import { defineConfig } from "vite"
import handlebars from "vite-plugin-handlebars"
import de from "./de.json"

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
        translate: (lang, key) => (lang === "de" && de[key] ? de[key] : key),
      },
    }),
  ],
})
