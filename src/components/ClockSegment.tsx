import { useUser } from 'context/UserContext'

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
  const { isKeeper } = useUser()

  // svg logic from https://david-gilbertson.medium.com/a-simple-pie-chart-in-svg-dbdd653b6936
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
        fill={isPreviewing ? yellow : isFilled ? brown : beige}
        onMouseEnter={isKeeper ? onMouseEnter : undefined}
        onMouseLeave={isKeeper ? onMouseLeave : undefined}
        onClick={isKeeper ? onClick : undefined}
        cursor={isKeeper ? 'pointer' : undefined}
      />
      {/* stroke */}
      <path d={strokePathData} fill="none" stroke={black} strokeWidth="0.05" />
    </>
  )
}

const yellow = '#ffb56f'
const brown = '#913827'
const black = '#171515'
const beige = '#96837d'
