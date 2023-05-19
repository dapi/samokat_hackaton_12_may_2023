const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#1E1E1E",
        yellow: "#F7EDBD",
        green: "#16615D",
        coral: "#FF3B65",
        coralDark: "#ce2f51",
      },
    },
  },
  plugins: [],
});
