import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      white: '#f7f7f7',
      black: '#171515',
      yellow: '#f8b87b',
      orange: '#d55641',
      darkorange: '#b24430',
      brown: '#913827',
      darkbrown: '#631f16',
      lightblack: '#28292b',
      darkgrey: '#35363a',
      grey: '#4e5059',
      lightgrey: '#61636e',
      beige: '#96837d',
      red: '#c02315',
    },
    extend: {
      screens: {
        xs: '480px',
      },
      fontFamily: {
        serif: ['var(--font-spectral)'],
        sans: ['var(--font-cryptCreep)'],
        handwriting: ['var(--font-jimNightshade)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderWidth: {
        '3': '3px',
      },
      fontSize: {
        '2.5xl': '1.7rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
export default config
