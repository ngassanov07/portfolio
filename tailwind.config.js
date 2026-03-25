/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "rgb(var(--surface) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
        chrome: "rgb(var(--chrome) / <alpha-value>)",
        "panel-soft": "rgb(var(--panel-soft) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-alt": "rgb(var(--accent-alt) / <alpha-value>)",
        syntax: {
          string: "rgb(var(--syntax-string) / <alpha-value>)",
          function: "rgb(var(--syntax-function) / <alpha-value>)",
          keyword: "rgb(var(--syntax-keyword) / <alpha-value>)",
          property: "rgb(var(--syntax-property) / <alpha-value>)",
          comment: "rgb(var(--syntax-comment) / <alpha-value>)",
          operator: "rgb(var(--syntax-operator) / <alpha-value>)",
          number: "rgb(var(--syntax-number) / <alpha-value>)",
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', "monospace"],
      },
      boxShadow: {
        editor: "0 24px 80px rgba(0, 0, 0, 0.45)",
      },
      keyframes: {
        caret: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        floatIn: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        caret: "caret 1s step-end infinite",
        "float-in": "floatIn 500ms ease-out",
      },
    },
  },
  plugins: [],
};
