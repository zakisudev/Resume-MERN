/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],

  theme: {
    extend: {
      colors: {
        primaryColorLight: '#0062ff',
        primaryVariantColorLight: '#003aaf',
        secondaryColorLight: '#ff5500',
        textPrimaryLight: '#1f1f1f',
        textBackgroundLight: '#f0f0f0',
        backgroundLight: '#ebebeb',
        boxShadowLight: '0 5px 20px 1px rgba(0, 0, 0, 0.5)',

        primaryColorDark: '#6e00ce',
        primaryVariantColorDark: '#2400a7',
        secondaryColorDark: '#00c194',
        textPrimaryDark: '#d8d8d8',
        textBackgroundDark: '#1f1f1f',
        backgroundDark: '#1f1f1f',
      },
    },
  },
  plugins: [],
};
