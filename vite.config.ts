import { resolve } from "path"
import { defineConfig } from "vite"
import handlebars from "vite-plugin-handlebars"
import i18n from "./i18n.json"

// Transform { "Hello": "Hallo" } into { "Hallo": "Hallo" }
const de = Object.keys(i18n).reduce((acc, value) => {
  acc[value] = value
  return acc
}, {})

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
      context(pagePath) {
        return pagePath === "/de/index.html" ? de : i18n
      },
    }),
  ],
})
