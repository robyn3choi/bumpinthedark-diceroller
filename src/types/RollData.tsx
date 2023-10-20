import Position from 'enums/Position'
import RollType from 'enums/RollType'

export default interface RollData {
  username: string
  rollType: RollType
  position: Position
  hasDisadvantage: boolean
  dice: number[]
  diceCount: number
  resultDie: number
  text: string
}
