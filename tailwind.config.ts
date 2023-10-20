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
      yellow: '#f2b479',
      orange: '#d55641',
      darkorange: '#b24430',
      brown: '#913827',
      darkbrown: '#6d190e',
    },
    extend: {
      fontFamily: {
        serif: ['var(--font-spectral)'],
        sans: ['var(--font-cryptCreep)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
export default config
