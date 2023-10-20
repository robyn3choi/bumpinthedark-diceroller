'use client'

import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import Lobby from 'components/Lobby'
import Footer from 'components/Footer'
import { useUser } from 'context/UserContext'
import RollType from 'enums/RollType'
import Position from 'enums/Position'
import RollData from 'types/RollData'
import Die from 'components/Die'
import * as copy from 'utils/copy'
import RollResultType from 'enums/RollResultType'
import Select from 'components/Select'
import DiceNumberSelect from 'components/DiceNumberSelect'
import Checkbox from 'components/Checkbox'

const socket = io(process.env.NEXT_PUBLIC_SERVER_URL!, { autoConnect: false })

export default function Room({ params }: { params: { room: string } }) {
  const { username } = useUser()
  const [users, setUsers] = useState<string[]>([])
  const [rollType, setRollType] = useState<RollType>(RollType.Action)
  const [position, setPosition] = useState<Position>(Position.Risky)
  const [diceCount, setDiceCount] = useState<number>(0)
  const [hasDisadvantage, setHasDisadvantage] = useState<boolean>(false)
  const [rollData, setRollData] = useState<RollData>()

  const room = params.room

  useEffect(() => {
    async function initSocket() {
      console.log('init', socket)

      socket.connect()

      socket.on('connect', () => {
        console.log('joining')
        console.log(room)
        socket.emit('userJoined', { username, room })
      })

      socket.on('usersUpdated', (updatedUsers) => {
        console.log('updatedUsers ', updatedUsers)
        setUsers(updatedUsers)
      })

      socket.on('rolled', ({ rollType, position, hasDisadvantage, dice, diceCount, username }) => {
        const resultDie = diceCount === 0 ? Math.min(...dice) : Math.max(...dice)

        let rollResultType = RollResultType.Miss

        if (resultDie === 6) {
          if (diceCount > 0 && dice.filter((die) => die === 6).length > 1) {
            rollResultType = RollResultType.Critical
          } else {
            rollResultType = RollResultType.StrongHit
          }
        } else if (resultDie > 3) {
          rollResultType = RollResultType.WeakHit
        }

        let text = ''
        console.log(rollType)
        if (rollType === RollType.Action) {
          text = copy.rollResults[RollType.Action][position][rollResultType]
        } else {
          text = copy.rollResults[rollType][rollResultType]
        }

        setRollData({
          rollType,
          position,
          hasDisadvantage,
          dice,
          diceCount,
          username,
          resultDie,
          text,
        })
      })
    }
    if (username) {
      initSocket()
    }
    return () => {
      if (socket) {
        socket.emit('userLeft', username)
      }
    }
  }, [username, room])

  if (!username) return <Lobby />

  function roll() {
    socket.emit('roll', { room, username, rollType, position, diceCount })
  }
  console.log(Object.values(RollType))

  return (
    <>
      <div className="p-4 sm:p-8">
        <h1 className="text-center text-7xl mb-2 mt-8 font-sans font-bold bg-gradient-to-b from-yellow to-orange text-[transparent] bg-clip-text">
          Bump in the Dark
        </h1>
        <div className="text-center mb-10">To invite players to join this room, send them this page’s URL.</div>
        <div className="absolute top-4 text-4xl font-sans">
          {users.map((user) => (
            <div key={user}>{user}</div>
          ))}
        </div>
        <div className="w-[26.5rem] mx-auto">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Select
              id="roll-type"
              label="Roll Type"
              options={Object.values(RollType)}
              onChange={(value) => setRollType(value as RollType)}
            />
            <DiceNumberSelect value={diceCount} onChange={setDiceCount} />
          </div>
          {rollType === RollType.Action && (
            <div className="mt-6">
              <div className="label">Position</div>
              <div className="flex justify-between">
                {Object.values(Position).map((pos) => (
                  <button key={pos} onClick={() => setPosition(pos)} disabled={pos === position} className="btn-filled">
                    {pos}
                  </button>
                ))}
              </div>
              <div className="mt-6 font-bold text-xl text-center">{copy.position[position]}</div>
            </div>
          )}
          {position === Position.Hopeless && <div className="text-lg text-center">{copy.hopeless}</div>}
          <div className="text-center mt-8">
            <label className="flex items-center justify-center gap-2.5 mb-3 cursor-pointer w-fit mx-auto">
              <Checkbox isChecked={hasDisadvantage} onChange={(e) => setHasDisadvantage(e.target.checked)} />
              <div className="text-4xl font-sans mt-1.5">Disadvantage</div>
            </label>
            <button
              disabled={position === Position.Hopeless}
              onClick={roll}
              className="btn-filled-disableable !border-3 !text-7xl !pt-3"
            >
              ROLL
            </button>
            <hr className="text-orange mt-8" />
            {rollData && (
              <div>
                <div className="text-2xl mt-6 mb-2">
                  <span className="font-bold">{rollData.username}</span>
                  {` rolled${rollData.diceCount === 0 ? ' (0 dice)' : ''}: `}
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {rollData?.dice.map((die, i) => (
                    <Die key={i} num={die} isResult={die === rollData.resultDie} />
                  ))}
                </div>
                <div className="mt-3 text-2xl">{rollData.text}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
