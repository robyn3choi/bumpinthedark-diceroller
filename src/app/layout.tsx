import './globals.css'
import { UserProvider } from 'context/UserContext'
import type { Metadata } from 'next'
import { Spectral, Jim_Nightshade } from 'next/font/google'
import localFont from 'next/font/local'

const cryptCreep = localFont({
  src: [
    {
      path: '../fonts/CryptCreep BB_reg.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/CryptCreepBB-Heavy.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-cryptCreep',
})

const spectral = Spectral({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-spectral' })
const jimNightShade = Jim_Nightshade({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-jimNightshade',
})

const title = 'Bump in the Dark | Dice Roller'
const description =
  'Roll dice and track clocks with this companion app for the tabletop roleplaying game, Bump in the Dark.'

export const metadata: Metadata = {
  title,
  description,
  themeColor: '#d55641',
  authors: { name: 'Robyn Choi', url: 'https://github.com/robyn3choi/bumpinthedark-diceroller' },
  openGraph: {
    type: 'website',
    url: 'https://bumpinthedark-diceroller.vercel.app/',
    title,
    description,
    images: [{ url: 'https://img.itch.zone/aW1hZ2UvMTQwNjM0MC84Njk0OTg0LmpwZw==/original/QWW1yv.jpg' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spectral.variable} ${cryptCreep.variable} ${jimNightShade.variable}`}>
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  )
}
