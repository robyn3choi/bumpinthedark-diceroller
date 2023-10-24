'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useLocalStorage } from '@rehooks/local-storage'
import { getRoomName, getStorageKey } from 'utils/helpers'
import Footer from 'components/Footer'
import { useUser } from 'context/UserContext'

// if the url includes a room:
//    if the user has saved data for this room, they are the keeper
//    else if the room already exists, the user can join as a hunter
export default function Lobby({ room }: { room?: string }) {
  const router = useRouter()
  const { setUsername, setIsKeeper } = useUser()

  const [savedRoomData] = useLocalStorage(getStorageKey(room))

  const [username, setusername] = useState('')
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (room) {
      if (savedRoomData) {
        setIsKeeper(true)
      }
    } else {
      setIsKeeper(true)
    }
  }, [room, router, savedRoomData, setIsKeeper])

  async function handleJoin(e: any) {
    e.preventDefault()
    setIsLoading(true)

    if (room) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user?username=${username}&room=${room}`)
        const result = await res.json()
        if (result.doesUserExist) {
          throw new Error('There is already a user with this name in the room.')
        }
        setUsername(username)
      } catch (err: any) {
        setIsLoading(false)
        return setError(err.message)
      }
    } else {
      room = getRoomName()
      setUsername(username)
      router.push(`/room/${room}`)
    }
  }

  const text = !room ? (
    <>
      Since you are creating a new room, you will be the <strong>keeper</strong>. Your clocks will be saved to your
      browser storage, so make sure you are not using Incognito or Brave Shields.
    </>
  ) : savedRoomData ? (
    <>Welcome back to this room. You will be the keeper again and your clocks from last time will be restored.</>
  ) : null

  let buttonText = 'Create room'
  if (room) {
    if (isLoading) {
      buttonText = 'Joining...'
    } else {
      buttonText = 'Join room'
    }
  } else if (isLoading) {
    buttonText = 'Creating...'
  }

  return (
    <>
      <form
        onSubmit={handleJoin}
        className="h-screen p-4 flex flex-col justify-center items-center text-2xl sm:text-3xl"
      >
        <h1 className="text-center text-7xl mt-8 mb-2 font-sans font-bold bg-gradient-to-b from-yellow to-orange text-[transparent] bg-clip-text">
          Bump in the Dark
        </h1>
        {text && <div className="text-base text-center mb-2 max-w-[450px]">{text}</div>}
        <input
          placeholder="Enter your name"
          onChange={(e) => setusername(e.target.value)}
          className="my-3 focus:border-yellow focus:ring-yellow rounded-lg w-full sm:w-96 text-white text-5xl font-sans p-2 pb-1.5 pt-3 bg-[transparent] border-2 border-yellow text-center placeholder:text-yellow placeholder:opacity-60"
        />
        {error && <div className="text-red text-lg">{error}</div>}
        <button disabled={!username || isLoading} className="w-full sm:w-96 btn-filled-disableable !text-5xl">
          {buttonText}
        </button>
      </form>
      <Footer />
    </>
  )
}
