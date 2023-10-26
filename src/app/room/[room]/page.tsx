'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import Drawer from 'react-modern-drawer'
import { useTour } from '@reactour/tour'
import Footer from 'components/Footer'
import { useUser } from 'context/UserContext'
import RollType from 'enums/RollType'
import Position from 'enums/Position'
import RollData from 'types/RollData'
import * as copy from 'utils/copy'
import RollResultType from 'enums/RollResultType'
import Select from 'components/Select'
import DiceNumberSelect from 'components/DiceNumberSelect'
import Checkbox from 'components/Checkbox'
import 'react-modern-drawer/dist/index.css'
import RollResult from 'components/RollResult'
import ClocksPanel from 'components/ClocksPanel'
import { TbChevronLeft, TbLayoutSidebarLeftExpandFilled, TbLayoutSidebarLeftCollapseFilled } from 'react-icons/tb'
import useElementSize from 'utils/useElementSize'
import socket from 'utils/socket'
import OnboardingProvider from 'components/OnboardingProvider'
import useLocalStorage from '@rehooks/local-storage'
import { ONBOARDING_STORAGE_KEY } from 'utils/constants'

const Lobby = dynamic(() => import('components/Lobby'), { ssr: false })

function Room({ room }: { room: string }) {
  const { username, isKeeper } = useUser()
  const [keeper, setKeeper] = useState<string>()
  const [hunters, setHunters] = useState<string[]>([])
  const [rollType, setRollType] = useState<RollType>(RollType.Action)
  const [position, setPosition] = useState<Position>(Position.Risky)
  const [diceCount, setDiceCount] = useState<number>(0)
  const [hasDisadvantage, setHasDisadvantage] = useState<boolean>(false)
  const [rollData, setRollData] = useState<RollData>()
  const [showSidebar, setShowSidebar] = useState(false)

  const [userPanelRef, userPanelSize, updateSize] = useElementSize()

  const [hasOnboarded] = useLocalStorage(ONBOARDING_STORAGE_KEY)
  const { setIsOpen: setIsOnboarding } = useTour()

  useEffect(() => {
    if (!hasOnboarded && username) {
      setIsOnboarding(true)
    }
  }, [setIsOnboarding, hasOnboarded, username])

  useEffect(() => {
    updateSize()
  }, [hunters, updateSize])

  useEffect(() => {
    async function initSocket() {
      console.log('init', socket)

      socket.connect()

      socket.on('connect', () => {
        socket.emit('userJoined', { username, room, isKeeper })
      })

      socket.on('usersUpdated', (updatedUsers) => {
        console.log('updatedUsers ', updatedUsers)

        const hunters = updatedUsers.filter((u) => !u.isKeeper).map((u) => u.name)
        const keeper = updatedUsers.find((u) => u.isKeeper)?.name
        setHunters(hunters)
        setKeeper(keeper)
      })

      // diceCount can be 0
      socket.on('rolled', ({ rollType, position, hasDisadvantage, dice, diceCount, username }) => {
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
          let numSixes = dice.filter((die) => die === 6).length
          // don't count eliminated 6's when determining if this roll is a critical
          if (eliminatedDieIndex != null && dice[eliminatedDieIndex] === 6) numSixes -= 1
          if (numSixes > 1 && diceCount > 0) {
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
        socket.disconnect()
      }
    }
  }, [username, room, isKeeper])

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
      <div className="flex justify-between w-full">
        <div className="px-6 py-4 sm:p-8 grow">
          <h1 className="text-center text-7xl mb-2 mt-6 font-sans font-bold bg-gradient-to-b from-yellow to-orange text-[transparent] bg-clip-text">
            Bump in the Dark
          </h1>
          <div className="text-center text-yellow mb-10 max-w-[500px] mx-auto">
            <p>To invite players to join this room, send them this page’s URL.</p>
            <p>
              If you are the keeper, use this page’s URL for your next session to restore your clocks from this session.
            </p>
          </div>
          <button
            onClick={() => setShowSidebar((prevState) => !prevState)}
            className="sidebar-btn icon-btn fixed hidden sm:block left-3 top-3 z-50"
          >
            <TbLayoutSidebarLeftExpandFilled className="w-10 h-10 text-brown" />
          </button>
          <button
            onClick={() => setShowSidebar((prevState) => !prevState)}
            className="sidebar-btn_mobile icon-btn fixed block sm:hidden bottom-5 right-5 z-50"
          >
            {showSidebar ? (
              <TbLayoutSidebarLeftCollapseFilled className="w-10 h-10 text-brown" />
            ) : (
              <TbLayoutSidebarLeftExpandFilled className="w-10 h-10 text-brown" />
            )}
          </button>
          <Drawer
            open={showSidebar}
            onClose={() => setShowSidebar(false)}
            direction="left"
            enableOverlay={false}
            className="!bg-darkgrey !w-60 text-xl relative"
          >
            <button
              onClick={() => setShowSidebar(false)}
              className="absolute block rounded-full hover:bg-grey p-1 top-1 right-1"
            >
              <TbChevronLeft className="text-yellow w-8 h-8" />
            </button>
            <div className="flex flex-col">
              <div ref={userPanelRef} className="border-b border-grey p-4">
                <div className="label !mb-1">Keeper</div>
                <div className="mb-4 text-yellow truncate">{keeper || <em className="text-beige">Missing</em>}</div>
                <div className="label !mb-1">Hunters</div>
                <div className="text-yellow">
                  {hunters.length ? (
                    hunters.map((hunter) => <div key={hunter}>{hunter}</div>)
                  ) : (
                    <em className="text-beige">No one’s here yet.</em>
                  )}
                </div>
              </div>
              <ClocksPanel socket={socket} room={room} yOffset={userPanelSize.height} />
            </div>
          </Drawer>
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
                <div className="mt-5 font-bold text-xl text-center text-yellow">{copy.position[position]}</div>
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
              <RollResult rollData={rollData} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default function RoomWithOnboarding({ params }: { params: { room: string } }) {
  return (
    <OnboardingProvider>
      <Room room={params.room} />
    </OnboardingProvider>
  )
}
