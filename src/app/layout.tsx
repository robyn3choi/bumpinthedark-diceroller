import './globals.css'
import { UserProvider } from 'context/UserContext'
import type { Metadata } from 'next'
import { Spectral, Spectral_SC, Jim_Nightshade } from 'next/font/google'
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
const spectralSc = Spectral_SC({ weight: ['600'], subsets: ['latin'], variable: '--font-spectralSc' })
const jimNightShade = Jim_Nightshade({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-jimNightshade',
})

const title = 'Bump in the Dark | Dice Roller & Clock Tracker'
const description =
  'Roll dice and track clocks with this companion app for the tabletop roleplaying game Bump in the Dark.'

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
    images: [{ url: 'https://i.postimg.cc/MGL4bXSG/QWW1yv.jpg' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spectral.variable} ${spectralSc.variable} ${cryptCreep.variable} ${jimNightShade.variable}`}
    >
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  )
}
