import { useState } from 'react'
import { nanoid } from 'nanoid'
import ClockData from 'types/ClockData'
import Clock from './Clock'

export default function ClocksPanel() {
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

  return (
    <div className="text-center">
      <button className="btn-filled" onClick={addClock}>
        Add clock
      </button>
      <div className="flex flex-col items-center gap-6 mt-6">
        {clocks.map((c, i) => (
          <Clock
            key={c.id}
            name={c.name}
            segmentCount={c.segmentCount}
            highestFilledSegmentIndex={c.highestFilledSegmentIndex}
            onSegmentChange={(segmentIndex) => handleSegmentChange(segmentIndex, i)}
            onEdit={(name, segmentCount) => handleEdit(name, segmentCount, i)}
          />
        ))}
      </div>
    </div>
  )
}
