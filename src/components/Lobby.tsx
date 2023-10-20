'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { getRoomName } from 'utils/helpers'
import Footer from 'components/Footer'
import { useUser } from 'context/UserContext'

export default function Lobby({ room }: { room: string }) {
  const router = useRouter()
  const { setUsername } = useUser()

  const [username, setusername] = useState('')
  const [error, setError] = useState<string>('')

  async function handleJoin(e: any) {
    e.preventDefault()

    if (room) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user?username=${username}&room=${room}`)
        const result = await res.json()
        if (result.exists) {
          throw new Error('There is already a user with this name in the room.')
        }
        setUsername(username)
      } catch (err: any) {
        return setError(err.message)
      }
    } else {
      room = getRoomName()
      setUsername(username)
      router.push(`/room/${room}`)
    }
  }

  return (
    <>
      <form
        onSubmit={handleJoin}
        className="h-screen p-4 flex flex-col justify-center items-center text-2xl sm:text-3xl gap-3"
      >
        <h1 className="text-center text-7xl mb-2 mt-8 font-sans font-bold bg-gradient-to-b from-yellow to-orange text-[transparent] bg-clip-text">
          Bump in the Dark
        </h1>
        <input
          placeholder="Enter your name"
          onChange={(e) => setusername(e.target.value)}
          className="rounded-lg w-full sm:w-96 text-white text-5xl font-sans p-2 pb-1.5 pt-3 bg-[transparent] border-2 border-yellow text-center placeholder:text-yellow placeholder:opacity-60"
        />
        {error && <div className="text-red text-lg">{error}</div>}
        <button disabled={!username} className="w-full sm:w-96 btn-filled-disableable !text-5xl">
          Join game
        </button>
      </form>
      <Footer />
    </>
  )
}
