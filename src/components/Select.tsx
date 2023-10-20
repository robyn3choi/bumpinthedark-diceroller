import clsx from 'clsx'
import ReactSelect from 'react-select'

export default function Select({
  id,
  label,
  options,
  onChange,
}: {
  id: string
  label: string
  options: string[]
  onChange: (value: string) => void
}) {
  return (
    <div className="text-left w-full">
      <label htmlFor={id} className="font-sans text-3xl">
        {label}
      </label>
      <ReactSelect
        id={id}
        options={options.map((rt) => ({ value: rt, label: rt }))}
        defaultValue={{ label: 'Action', value: 'Action' }}
        onChange={(opn) => onChange(opn!.value)}
        unstyled
        classNames={{
          control: () =>
            'rounded-lg text-2xl !cursor-pointer bg-[transparent] text-white border-2 border-orange px-4 py-2 text-left hover:border-yellow',
          dropdownIndicator: () => '-mt-1',
          menu: () => 'border-2 border-t-0 border-orange',
          option: ({ isSelected }) =>
            clsx(
              isSelected ? 'text-white bg-orange' : '!cursor-pointer bg-darkbrown hover:text-black hover:bg-yellow',
              '!text-2xl text-left p-2'
            ),
        }}
      />
    </div>
  )
}
