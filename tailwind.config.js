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
        "secondary": "#F29883", 
        "accent": "#CC8D00",
        "black": "#000",
        "white": "#FFF",
        "hover": "#84B8B7"
      },
    },
  },
}
