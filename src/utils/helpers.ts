import RollResultType from 'enums/RollResultType'
import { uniqueNamesGenerator, colors, animals, NumberDictionary } from 'unique-names-generator'

export function getStorageKey(room) {
  return `bumpinthedark-diceroller_${room}`
}

export function isVowel(c) {
  return ['a', 'e', 'i', 'o', 'u'].indexOf(c.toLowerCase()) !== -1
}

export function getRollResultTypePunctuation(rollResultType: RollResultType) {
  return rollResultType === RollResultType.Miss ? '.' : '!'
}

const adjectives = [
  'spooky',
  'dark',
  'scary',
  'shadow',
  'hidden',
  'creepy',
  'crawly',
  'zombie',
  'ghostly',
  'candy',
  'vampire',
  'haunted',
  'dead',
  'ghoulish',
  'chocolate',
  'skeletal',
  'screaming',
  'wailing',
  'wicked',
  'deathly',
  'evil',
  'dreadful',
  'eerie',
  'frightful',
  'ghastly',
  'grim',
  'grisly',
  'gruesome',
  'howling',
  'moonlit',
  'mysterious',
  'phantasmal',
  'spectral',
  'vanishing',
  'weird',
]

export function getRoomName() {
  const numberDictionary = NumberDictionary.generate({ min: 2050, max: 9999 })
  const config = {
    dictionaries: [colors, adjectives, animals, numberDictionary],
    separator: '-',
  }
  return uniqueNamesGenerator(config)
}
