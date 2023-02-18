module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      heading: ["Montserrat", "sans-serif"],
      body: ["Lato", "sans-serif"],
    },
    // extend: {
    //   colors: {
    //     primary: "#96D0CF",
    //     secondary: "#84B8B7",
    //     accent: "#A0DEDD",
    //     black: "#3B5251",
    //     white: "#FFF",
    //     hover: "#699191",
    //   },
    // },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["cupcake"],
  },
};
