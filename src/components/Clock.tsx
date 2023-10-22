import { useRef, useState } from 'react'
import ClockSegment from './ClockSegment'
import { BiCheck, BiEdit, BiPencil, BiSolidPencil } from 'react-icons/bi'
import { TbCheck, TbPencil } from 'react-icons/tb'

const diameter = '140'

type Props = {
  name: string
  segmentCount: number
  highestFilledSegmentIndex: number
  onSegmentChange: (index: number) => void
  onEdit: (name, segmentCount) => void
}

export default function Clock({ name, segmentCount, highestFilledSegmentIndex, onSegmentChange, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [editingSegmentCount, setEditingSegmentCount] = useState(segmentCount)
  const [hoveredSegmentIndex, setHoveredSegmentIndex] = useState<number | null>(null)
  // justClickedSegmentIndex is set when segment is clicked, is unset when mouse leaves segment
  // this is so that when you click a segment, it doesn't immediately go into preview mode
  const [justClickedSegmentIndex, setJustClickedSegmentIndex] = useState<number | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)

  function handleSegmentClick(index) {
    if (index > highestFilledSegmentIndex) {
      onSegmentChange(index)
    } else {
      onSegmentChange(index - 1)
    }
    setJustClickedSegmentIndex(index)
  }

  function isPreviewingSegment(index) {
    return hoveredSegmentIndex === null || justClickedSegmentIndex === index
      ? false
      : (hoveredSegmentIndex >= index && highestFilledSegmentIndex < index) ||
          (hoveredSegmentIndex <= index && highestFilledSegmentIndex >= index)
  }

  function handleSegmentMouseLeave() {
    setJustClickedSegmentIndex(null)
    setHoveredSegmentIndex(null)
  }

  function toggleEditing() {
    if (isEditing) {
      onEdit(inputRef.current?.value || '', editingSegmentCount)
      setIsEditing(false)
    } else {
      setIsEditing(true)
    }
  }

  return (
    <div className="relative text-orange flex flex-col items-center w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={diameter}
        height={diameter}
        viewBox="-1 -1 2 2"
        style={{ transform: 'rotate(-0.25turn)' }}
        fill="none"
        overflow="visible"
      >
        {Array.from(Array(segmentCount)).map((num, i) => (
          <ClockSegment
            key={i}
            segmentCount={segmentCount}
            index={i}
            isFilled={i <= highestFilledSegmentIndex}
            isPreviewing={isPreviewingSegment(i)}
            onMouseEnter={() => setHoveredSegmentIndex(i)}
            onMouseLeave={handleSegmentMouseLeave}
            onClick={() => handleSegmentClick(i)}
          />
        ))}
      </svg>
      <div className="font-serif text-yellow text-lg mt-2.5 w-full h-8">
        {isEditing ? (
          <input
            ref={inputRef}
            defaultValue={name}
            className="bg-[transparent] -mt-1.5 text-lg p-1 focus:border-yellow focus:ring-yellow rounded-lg border-yellow text-center w-full"
          />
        ) : (
          <div className="">{name}</div>
        )}
      </div>
      <button
        onClick={toggleEditing}
        className="absolute rounded-full p-0.5 hover:bg-orange active:bg-darkorange -top-2 right-0"
      >
        {isEditing ? <TbCheck className="text-yellow w-7 h-7" /> : <TbPencil className="text-yellow w-7 h-7" />}
      </button>
    </div>
  )
}
