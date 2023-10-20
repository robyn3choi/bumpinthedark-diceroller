import clsx from 'clsx'

export default function DiceNumberSelect({ value, onChange }) {
  function decrement() {
    if (value > 0) {
      onChange(value - 1)
    }
  }

  function increment() {
    onChange(value + 1)
  }

  return (
    <div className="text-left mt-4 xs:mt-0">
      <div className="label">Dice Count</div>
      <div className="flex justify-center">
        <button
          onClick={decrement}
          className="btn-filled !font-serif !text-2xl !border-b-orange !p-0 w-12 text-center !rounded-r-none rounded-l-lg shrink-0"
        >
          -
        </button>
        <input
          type="number"
          className="bg-[transparent] pt-2 pb-1 font-sans text-4xl appearance-none w-full xs:w-16 text-center border-y-2 border-x-0 border-orange"
          value={value}
          onChange={(e) => onChange(Number(e.target.value) || '')}
        />
        <button
          onClick={increment}
          className="btn-filled w-12 !font-serif !text-2xl !border-b-orange !p-0 text-center !rounded-l-none rounded-r-lg shrink-0"
        >
          +
        </button>
      </div>
    </div>
  )
}
