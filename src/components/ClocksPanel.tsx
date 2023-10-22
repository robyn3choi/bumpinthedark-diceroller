import { useState } from 'react'
import { nanoid } from 'nanoid'
import ClockData from 'types/ClockData'
import Clock from './Clock'

export default function ClocksPanel({ yOffset }: { yOffset: number }) {
  const [clocks, setClocks] = useState<ClockData[]>([])

  function addClock() {
    setClocks((prevState) => [
      { id: nanoid(), name: `Clock #${clocks.length + 1}`, segmentCount: 4, highestFilledSegmentIndex: -1 },
      ...prevState,
    ])
  }

  function handleSegmentChange(segmentIndex, clockIndex) {
    setClocks((prevState) => {
      const newState = [...prevState]
      newState[clockIndex].highestFilledSegmentIndex = segmentIndex
      return newState
    })
  }

  function handleEdit(name, segmentCount, clockIndex) {
    setClocks((prevState) => {
      const newState = [...prevState]
      newState[clockIndex].name = name
      newState[clockIndex].segmentCount = segmentCount
      return newState
    })
  }

  function handleDelete(clockIndex) {
    setClocks((prevState) => {
      const newState = [...prevState]
      newState.splice(clockIndex, 1)
      return newState
    })
  }

  function handleMoveUp(clockIndex) {
    setClocks((prevState) => {
      const newState = [...prevState]
      const movingClock = newState[clockIndex]
      newState[clockIndex] = newState[clockIndex - 1]
      newState[clockIndex - 1] = movingClock
      return newState
    })
  }

  function handleMoveDown(clockIndex) {
    setClocks((prevState) => {
      const newState = [...prevState]
      const movingClock = newState[clockIndex]
      newState[clockIndex] = newState[clockIndex + 1]
      newState[clockIndex + 1] = movingClock
      return newState
    })
  }

  return (
    <div className="text-center h-screen pt-2 px-2 overflow-y-auto" style={{ height: `calc(100vh - ${yOffset}px)` }}>
      <button className="btn-filled mt-4 mb-2" onClick={addClock}>
        Add clock
      </button>
      <div className="flex flex-col items-center gap-4 pt-4">
        {clocks.map((c, i) => (
          <Clock
            key={c.id}
            name={c.name}
            segmentCount={c.segmentCount}
            highestFilledSegmentIndex={c.highestFilledSegmentIndex}
            onSegmentChange={(segmentIndex) => handleSegmentChange(segmentIndex, i)}
            onEdit={(name, segmentCount) => handleEdit(name, segmentCount, i)}
            onDelete={() => handleDelete(i)}
            onMoveUp={() => handleMoveUp(i)}
            onMoveDown={() => handleMoveDown(i)}
            isFirst={i === 0}
            isLast={i === clocks.length - 1}
          />
        ))}
      </div>
    </div>
  )
}
