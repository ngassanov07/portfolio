/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#0d1117",
        panel: "#161b22",
        chrome: "#1f2937",
        "panel-soft": "#111827",
        syntax: {
          string: "#34d399",
          function: "#38bdf8",
          keyword: "#c084fc",
          property: "#facc15",
          comment: "#94a3b8",
          operator: "#f472b6",
          number: "#fb923c",
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
