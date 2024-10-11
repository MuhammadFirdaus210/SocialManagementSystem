// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust the paths according to your project structure
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}" // Add this line to include Flowbite components
  ],
  theme: {
    extend: {
      colors: {
        customColor: {
          light: '#7ed6df',
          DEFAULT: '#22a6b3',
          dark: '#1e3799',
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin') // Ensure this line is included
  ],
};
