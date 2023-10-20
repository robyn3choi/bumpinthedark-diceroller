import clsx from 'clsx'

export default function Die({ num, isResult }) {
  return (
    <div
      className={clsx(
        isResult ? 'bg-yellow text-darkbrown' : 'text-yellow',
        'flex justify-center items-center text-5xl w-20 h-20 rounded-lg border-3 border-yellow'
      )}
    >
      {num}
    </div>
  )
}
