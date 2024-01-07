import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        black: "#020202",
        green: "#62aba1",
        purple: "#bc95d4",
        yellow: "#F4E76E",
        orange: "#FCA17D",
        offWhite: "#FFFDF7",
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        marquee: "marquee 5s linear infinite",
        marquee2: "marquee2 5s linear infinite",
        "slide-in-bottom": "slideInBottom 0.5s ease-out",
        "slide-out-bottom": "slideOutBottom 0.5s ease-in",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        slideInBottom: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideOutBottom: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
      },
      screens: {
        m1000: { raw: "(max-width: 1000px)" },
        // set medium breakpoint to 940px

        m900: { raw: "(max-width: 900px)" },
        m850: { raw: "(max-width: 850px)" },
        m800: { raw: "(max-width: 800px)" },
        m750: { raw: "(max-width: 750px)" },
        m700: { raw: "(max-width: 700px)" },
        m650: { raw: "(max-width: 650px)" },
        m600: { raw: "(max-width: 600px)" },
        m550: { raw: "(max-width: 550px)" },
        m500: { raw: "(max-width: 500px)" },
        m450: { raw: "(max-width: 450px)" },
        m400: { raw: "(max-width: 400px)" },
        m350: { raw: "(max-width: 350px)" },
      },
    },
  },
  plugins: [],
} satisfies Config;
