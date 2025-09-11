/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        darkText: 'var(--color-dark-text)',
        lightText: 'var(--color-light-text)',
        buttonBg: 'var(--color-button-bg)',
        lightButtonBg: 'var(--color-light-button-bg)',
        linkBlue: 'var(--color-link-blue)',
      },
    },
  },
}