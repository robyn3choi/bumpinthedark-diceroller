import RollType from 'enums/RollType'
import RollData from 'types/RollData'
import { getRollResultTypePunctuation } from 'utils/helpers'
import Die from './Die'
import Edition from 'enums/Edition'
import ActionType from 'enums/ActionType'

const actionRollCopy = {
  [ActionType.Risky]: 'took a risky action',
  [ActionType.Desperate]: 'went for broke',
  [ActionType.Safe]: 'played it safe',
}

export default function RollResult({ rollData }: { rollData?: RollData }) {
  if (!rollData) return null

  return (
    <>
      <hr className="text-orange mt-8" />
      <div className="text-xl mt-6 mb-6">
        {rollData.edition === Edition.Original ? (
          <>
            <strong>{rollData.username} </strong>
            {`made a `}
            {rollData.position && <strong className="text-yellow">{rollData.position.toLowerCase()} </strong>}
            <strong>{rollData.rollType.toLowerCase()} </strong>
            {`roll with `}
            <strong className="text-yellow">{rollData.diceCount} </strong>
            {rollData.diceCount === 1 ? 'die' : 'dice'}
            {rollData.hasDisadvantage ? (
              <>
                {` and`} <strong className="text-yellow">disadvantage</strong>:
              </>
            ) : (
              ':'
            )}
          </>
        ) : (
          <>
            <strong>{rollData.username} </strong>
            {rollData.rollType === RollType.Action ? (
              <>
                <span className="text-yellow font-bold">{actionRollCopy[rollData.actionType]}</span> with{' '}
              </>
            ) : (
              <>
                {`made a `}
                {rollData.position && <strong className="text-yellow">{rollData.position.toLowerCase()} </strong>}
                <strong>{rollData.rollType.toLowerCase()} </strong>
                {`roll with `}
              </>
            )}
            <strong className="text-yellow">{rollData.diceCount} </strong>
            {rollData.diceCount === 1 ? 'die' : 'dice'}
            {rollData.hasDisadvantage ? (
              <>
                {` and`} <strong className="text-yellow">disadvantage</strong>:
              </>
            ) : (
              ':'
            )}
          </>
        )}
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {rollData?.dice.map((die, i) => (
          <Die
            key={i}
            num={die}
            isResult={i === rollData.resultDieIndex}
            isEliminated={i === rollData.eliminatedDieIndex}
          />
        ))}
      </div>
      <div className="mt-6 text-xl font-serifSc">
        <span className="line-through">{rollData.eliminatedRollResultType}</span>
        {'  '}
        <strong>{rollData.rollResultType + getRollResultTypePunctuation(rollData.rollResultType)}</strong>
      </div>
      {rollData.rollType !== RollType.Fortune && <div className="mt-1 text-xl">{rollData.text}</div>}
    </>
  )
}
