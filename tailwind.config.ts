import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    fontFamily: {
      header: ["'Amatic SC', sans-serif"],
      sans: ["'Questrial', system-ui, sans-serif"],
      button: ["system-ui, sans-sans"],
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#241414",
          50: "#D9BABA",
          100: "#D1ADAD",
          200: "#C39393",
          300: "#B47979",
          400: "#A65E5E",
          500: "#8D4E4E",
          600: "#734040",
          700: "#583131",
          800: "#3E2323",
          900: "#241414",
          950: "#120A0A",
        },
        yellow: {
          DEFAULT: "#FFFFB3",
          50: "#FFFFF0",
          100: "#FFFFDC",
          200: "#FFFFB3",
          300: "#FFFF7B",
          400: "#FFFF43",
          500: "#FFFF0B",
          600: "#D2D200",
          700: "#999A00",
          800: "#616100",
          900: "#292900",
          950: "#0D0D00",
        },
      },
      container: {
        center: true,
        padding: "1.25rem",
        screens: {
          "2xl": "1200px",
        },
      },
    },
  },
};
