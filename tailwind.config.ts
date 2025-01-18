import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily:{
        kobe : ["var(--font-kobe)"],
        kobe2 : ["var(--font-kobe2)"],
        voyage : ["var(--font-voyage)"],
      }
    },
  },
  plugins: [],
} satisfies Config;
