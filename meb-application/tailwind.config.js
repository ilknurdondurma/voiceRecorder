/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      colors: {
        primary:'#d2392e',//green
        secondary:'#6366f1',//purple
        tertiary:"#111111",
        
        text_primary:"#52525b", //text-zinc-[600]
        text_secondary:"#00ce98",// green

        my_border_color:"#d4d4d8", //border-zinc-[300]
        my_input_bg:"#f4f4f5", //bg-zinc-[100]
      },
      
      height:{
        "brands":"3.50rem",
        "buttons-large":"3rem",
        "buttons-normal":"2rem",
        "buttons-small":"2rem",
        "buttons-xsmall":"1.50rem"

      },
      width:{
        "brands":"3.50rem"
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      
    },
    screens: {
      'sm': {'min': '0', 'max': '767px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }

      'md': {'min': '768px', 'max': '1023px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': {'min': '1024px', 'max': '1279px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      'xl': {'min': '1280px', 'max': '1535px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      '2xl': {'min': '1536px'},
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
}

