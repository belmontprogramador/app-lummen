const path = require("path");

module.exports = {
  contextSeparator: "_",
  createOldCatalogs: false,
  defaultNamespace: "translation",
  defaultValue: "",
  lexers: {
    js: ["JsxLexer"],
    jsx: ["JsxLexer"],
    ts: ["JsxLexer"],
    tsx: ["JsxLexer"],
  },
  locales: ["en", "pt", "es", "fr", "de", "it", "ja", "zh", "ru", "ar"],
  namespaceSeparator: false,
  output: "service/i18n/locales/$LOCALE/translation.json",

  // 👇 CAMINHO ABSOLUTO, INDEPENDENTE DE ONDE O SCRIPT É EXECUTADO
  input: [
    path.resolve(__dirname, "../../app/**/*.{js,jsx,ts,tsx}"),
    path.resolve(__dirname, "../../components/**/*.{js,jsx,ts,tsx}"),
  ],

  useKeysAsDefaultValue: true,
  sort: true,
};
