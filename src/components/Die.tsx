import clsx from 'clsx'

export default function Die({ num, isResult, isEliminated }) {
  return (
    <div
      className={clsx(
        isResult ? 'bg-yellow text-darkbrown' : 'text-yellow',
        'relative flex justify-center items-center text-5xl w-20 h-20 rounded-lg border-3 border-yellow'
      )}
    >
      {num}
      {isEliminated && <div className="absolute border-t-3 border-yellow rotate-45 w-[110%]" />}
    </div>
  )
}
