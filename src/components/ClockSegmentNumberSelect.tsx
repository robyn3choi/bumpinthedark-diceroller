import {
  TbCaretDown,
  TbCaretDownFilled,
  TbCaretLeftFilled,
  TbCaretRightFilled,
  TbCaretUp,
  TbCaretUpFilled,
  TbChevronLeft,
  TbChevronRight,
} from 'react-icons/tb'

type Props = {
  value: number
  onChange: (value: number) => void
}

export default function ClockSegmentNumberSelect({ value, onChange }: Props) {
  function decrement() {
    if (value > 2) {
      onChange(value - 1)
    }
  }

  function increment() {
    if (value < 16) {
      onChange(value + 1)
    }
  }

  return (
    <div className="text-white flex">
      <button
        onClick={decrement}
        className="w-10 h-10 btn-filled !font-serif !text-2xl !border-b-orange !p-0 flex justify-center items-center text-center !rounded-r-none rounded-l-lg shrink-0"
      >
        <TbChevronLeft className="w-4 h-4" />
      </button>
      <input
        disabled
        type="number"
        className="px-0 w-10 h-10 bg-darkgrey text-lg appearance-none text-center border-y-2 border-x-0 border-orange"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <button
        onClick={increment}
        className="w-10 h-10 btn-filled !font-serif !text-2xl !border-b-orange !p-0 flex justify-center items-center !rounded-l-none rounded-r-lg shrink-0"
      >
        <TbChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}
