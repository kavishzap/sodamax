import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-deep": "#050301",
        "bg-section": "#120804",
        "bg-card": "#1E0F06",
        "amber-custom": "#C97818",
        "amber-light": "#F6A735",
        "citrus": "#FFD35A",
        "chrome": "#D8D8D8",
        "cream": "#FFF4DD",
        "cream-muted": "#B8946A",
      },
      backgroundImage: {
        "gradient-hero": "linear-gradient(180deg, #050301 0%, #120804 50%, #050301 100%)",
        "gradient-amber": "linear-gradient(135deg, #C97818 0%, #F6A735 50%, #C97818 100%)",
        "gradient-text": "linear-gradient(135deg, #FFF4DD 0%, #C97818 40%, #F6A735 100%)",
      },
      fontFamily: {
        garamond: ["Cormorant Garamond", "serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
