module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      "heading": ["Josefin Sans", "sans-serif"],
      "body": ["Lato", "sans-serif"]
    },
    extend: {
      colors: {
        "primary": "#96D0CF",
        "secondary": "#D1C482", 
        "accent": "#5BD9D7",
        "black": "#000",
        "white": "#FFF",
        "hover": "#699191"
      },
    },
  },
}
