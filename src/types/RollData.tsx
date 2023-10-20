import Position from 'enums/Position'
import RollResultType from 'enums/RollResultType'
import RollType from 'enums/RollType'

export default interface RollData {
  username: string
  rollType: RollType
  position: Position
  dice: number[]
  diceCount: number
  resultDieIndex: number
  hasDisadvantage: boolean
  eliminatedDieIndex: number | null
  eliminatedRollResultType: RollResultType | null
  rollResultType: RollResultType
  text: string
}
