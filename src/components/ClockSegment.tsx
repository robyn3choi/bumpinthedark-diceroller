const yellow = '#f8b87b'
const orange = '#d55641'
const brown = '#913827'
const darkBrown = '#6d190e'
const black = '#171515'

function getCoordinatesForPercent(percent) {
  const x = Math.cos(2 * Math.PI * percent)
  const y = Math.sin(2 * Math.PI * percent)
  return [x, y]
}

type Props = {
  segmentCount: number
  index: number
  isFilled: boolean
  isPreviewing: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: () => void
}

export default function ClockSegment({
  segmentCount,
  index,
  isFilled,
  isPreviewing,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: Props) {
  const segmentPercent = 1 / segmentCount
  const [startX, startY] = getCoordinatesForPercent(index * segmentPercent)
  const [endX, endY] = getCoordinatesForPercent((index + 1) * segmentPercent)
  const largeArcFlag = segmentPercent > 0.5 ? 1 : 0

  // create an array and join it just for code readability
  const fillPathData = [
    `M ${startX} ${startY}`, // Move
    `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
    `L 0 0`, // Line
  ].join(' ')

  const strokePathData = fillPathData + `L ${startX} ${startY}`

  return (
    <>
      <path
        d={fillPathData}
        fill={isPreviewing ? orange : isFilled ? yellow : brown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        cursor="pointer"
      />
      {/* stroke */}
      <path d={strokePathData} fill="none" stroke={black} strokeWidth="0.05" />
    </>
  )
}
