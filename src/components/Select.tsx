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
    <div className="w-full">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <ReactSelect
        id={id}
        options={options.map((rt) => ({ value: rt, label: rt }))}
        defaultValue={{ label: 'Action', value: 'Action' }}
        onChange={(opn) => onChange(opn!.value)}
        unstyled
        classNames={{
          container: () => '-mt-1',
          control: () =>
            'font-sans px-4 pt-2 pb-1 text-4xl rounded-lg !cursor-pointer bg-[transparent] text-white border-2 border-orange hover:border-yellow',
          dropdownIndicator: () => '-mt-1',
          menu: () => 'border-2 border-t-0 border-orange rounded-lg',
          option: ({ isSelected }) =>
            clsx(
              isSelected ? 'text-white bg-orange' : '!cursor-pointer bg-darkbrown hover:text-black hover:bg-yellow',
              'select-option font-sans px-4 pt-2 pb-1 !text-4xl p-2'
            ),
        }}
      />
    </div>
  )
}
