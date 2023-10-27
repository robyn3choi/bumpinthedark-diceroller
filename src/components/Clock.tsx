import { useRef, useState } from 'react'
import ClockSegment from './ClockSegment'
import { TbArrowDown, TbArrowUp, TbX } from 'react-icons/tb'
import { useUser } from 'context/UserContext'
import ClockSegmentNumberSelect from './ClockSegmentNumberSelect'

const diameter = '130'

type Props = {
  name: string
  segmentCount: number
  isEditing: boolean
  isFirst?: boolean
  isLast?: boolean
  highestFilledSegmentIndex: number
  onSegmentChange: (index: number) => void
  onEdit: (name, segmentCount) => void
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
}

export default function Clock({
  name,
  segmentCount,
  isEditing,
  isFirst,
  isLast,
  highestFilledSegmentIndex,
  onSegmentChange,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
}: Props) {
  const { isKeeper } = useUser()
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

  function handleSegmentMouseEnter(index) {
    if (!isEditing) {
      setHoveredSegmentIndex(index)
    }
  }

  function handleSegmentMouseLeave() {
    setJustClickedSegmentIndex(null)
    setHoveredSegmentIndex(null)
  }

  return (
    <div className="relative text-orange flex flex-col items-center w-full py-2">
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
            onMouseEnter={() => handleSegmentMouseEnter(i)}
            onMouseLeave={handleSegmentMouseLeave}
            onClick={() => handleSegmentClick(i)}
          />
        ))}
      </svg>
      <button className="absolute top-0 right-0 rounded-full p-1 hover:bg-grey"></button>
      <div className="font-serif text-yellow text-lg mt-2.5 w-full h-8">
        {isEditing ? (
          <input
            value={name}
            onChange={(e) => onEdit(e.target.value, segmentCount)}
            className="bg-[transparent] -mt-1.5 text-lg p-1 focus:border-yellow focus:ring-yellow rounded-lg border-yellow text-center w-full"
          />
        ) : (
          <div className="">{name}</div>
        )}
      </div>
      {isEditing && (
        <>
          {!isFirst && (
            <button
              onClick={onMoveUp}
              className="absolute rounded-full p-0.5 hover:bg-grey active:bg-orange top-7 left-1"
            >
              <TbArrowUp className="text-yellow w-8 h-8" />
            </button>
          )}

          {!isLast && (
            <button
              onClick={onMoveDown}
              className="absolute rounded-full p-0.5 hover:bg-grey active:bg-orange top-[5.4rem] left-1"
            >
              <TbArrowDown className="text-yellow w-8 h-8" />
            </button>
          )}
          <button
            onClick={onDelete}
            className="absolute rounded-full p-0.5 hover:bg-grey active:bg-orange top-0 right-1"
          >
            <TbX className="text-red w-8 h-8" />
          </button>
          <div className="absolute bottom-14 right-1">
            <ClockSegmentNumberSelect value={segmentCount} onChange={(value) => onEdit(name, value)} />
          </div>
        </>
      )}
    </div>
  )
}
