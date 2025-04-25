module.exports = {
    darkMode: "class",
    content: [
      "./index.html",
      "./src/**/*.{js,jsx}",
      "./components/**/*.{js,jsx}",
    ],
    theme: {
      extend: {
        animation: {
          'fade-in': 'fadeIn 2s ease-in forwards',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
        },
      },
    },
    plugins: [],
  }

  