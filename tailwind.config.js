/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'media',
  theme: {
    extend: {
            animation: {
        'spin-slow': 'spin 20s linear infinite',
      },
      colors: {
        darkText: 'var(--color-dark-text)',
        lightText: 'var(--color-light-text)',
        buttonBg: 'var(--color-button-bg)',
        lightButtonBg: 'var(--color-light-button-bg)',
        linkBlue: 'var(--color-link-blue)',
      },
      fontSize: {
        h1: ['3.2em', { lineHeight: '1.1' }],
      },
    },
  },
}