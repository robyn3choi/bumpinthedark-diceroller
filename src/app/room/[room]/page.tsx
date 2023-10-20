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
import { getRollResultTypePunctuation } from 'utils/helpers'

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

      // diceCount can be 0
      socket.on('rolled', ({ rollType, position, hasDisadvantage, dice, diceCount, username }) => {
        console.log('rolled')
        const sortedDice = [...dice].sort((a, b) => a - b)
        const lowestDie = sortedDice[0]
        const highestDie = sortedDice[dice.length - 1]
        const secondHighestDie = sortedDice[dice.length - 2]

        let resultDie = diceCount === 0 ? lowestDie : highestDie
        let eliminatedDieIndex = null

        // if you rolled more than 1 die with disadvantage
        if (hasDisadvantage && diceCount > 1) {
          // remove the single highest die from the roll
          resultDie = secondHighestDie
          eliminatedDieIndex = dice.findIndex((d) => d === highestDie)
        }

        let resultDieIndex = dice.findIndex((d) => d === resultDie)

        // if there are multiple result dice then we need to prevent the result die and disadvantage die from being the same die
        // make the result die the 2nd die
        if (eliminatedDieIndex === resultDieIndex) {
          let hasFoundFirstResultDie = false

          for (let i = 0; i < dice.length; i++) {
            if (dice[i] === resultDie) {
              if (hasFoundFirstResultDie) {
                resultDieIndex = i
                break
              } else {
                hasFoundFirstResultDie = true
              }
            }
          }
        }

        let eliminatedRollResultType: RollResultType | null = null
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

        // if you rolled one or fewer dice with disadvantage
        if (hasDisadvantage && diceCount <= 1) {
          // take -1 result level
          const rollResultTypeValues = Object.values(RollResultType)
          const rollResultTypeIndex = rollResultTypeValues.findIndex((r) => r === rollResultType)
          if (rollResultTypeIndex < rollResultTypeValues.length - 1) {
            eliminatedRollResultType = rollResultType
            rollResultType = rollResultTypeValues[rollResultTypeIndex + 1]
          }
        }

        let text = ''

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
          resultDieIndex,
          eliminatedDieIndex,
          eliminatedRollResultType,
          rollResultType,
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

  if (!username) return <Lobby room={room} />

  function roll() {
    socket.emit('roll', {
      room,
      username,
      rollType,
      position: rollType === RollType.Action ? position : null,
      diceCount,
      hasDisadvantage,
    })
  }

  return (
    <>
      <div className="px-6 py-4 sm:p-8">
        <h1 className="text-center text-7xl mb-2 mt-8 font-sans font-bold bg-gradient-to-b from-yellow to-orange text-[transparent] bg-clip-text">
          Bump in the Dark
        </h1>
        <div className="text-center text-yellow mb-10">
          To invite players to join this room, send them this page’s URL.
        </div>
        <div className="absolute top-4 text-4xl font-sans">
          {users.map((user) => (
            <div key={user}>{user}</div>
          ))}
        </div>
        <div className="max-w-[28rem] mx-auto">
          <div className="xs:flex justify-center items-center gap-3 mb-4">
            <Select
              id="roll-type"
              label="Roll Type"
              options={Object.values(RollType)}
              onChange={(value) => setRollType(value as RollType)}
            />
            <DiceNumberSelect value={diceCount} onChange={setDiceCount} />
          </div>
          {rollType === RollType.Action && (
            <div className="mt-4">
              <div className="label">Position</div>
              <div className="grid grid-cols-2 gap-1.5 xs:flex">
                {Object.values(Position).map((pos) => (
                  <button
                    key={pos}
                    onClick={() => setPosition(pos)}
                    disabled={pos === position}
                    className="btn-filled grow"
                  >
                    {pos}
                  </button>
                ))}
              </div>
              <div className="mt-6 font-bold text-xl text-center text-yellow">{copy.position[position]}</div>
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
            {rollData && (
              <>
                <hr className="text-orange mt-8" />
                <div className="text-xl mt-6 mb-6">
                  <strong>{rollData.username} </strong>
                  {`made a `}
                  {rollData.position && <strong className="text-yellow">{position.toLowerCase()} </strong>}
                  <strong>{rollType.toLowerCase()} </strong>
                  {`roll with `}
                  <strong className="text-yellow">{diceCount} </strong>
                  {rollData.diceCount === 1 ? 'die' : 'dice'}
                  {rollData.hasDisadvantage ? (
                    <>
                      {` and`} <strong className="text-yellow">disadvantage</strong>:
                    </>
                  ) : (
                    ':'
                  )}
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {rollData?.dice.map((die, i) => (
                    <Die
                      key={i}
                      num={die}
                      isResult={i === rollData.resultDieIndex}
                      isEliminated={i === rollData.eliminatedDieIndex}
                    />
                  ))}
                </div>
                <div className="mt-6 text-xl">
                  <span className="line-through">{rollData.eliminatedRollResultType}</span>
                  {'  '}
                  <strong>{rollData.rollResultType + getRollResultTypePunctuation(rollData.rollResultType)}</strong>
                </div>
                {rollData.rollType !== RollType.Fortune && <div className="mt-1 text-xl">{rollData.text}</div>}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
