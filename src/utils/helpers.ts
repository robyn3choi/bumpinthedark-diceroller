import { uniqueNamesGenerator, colors, animals, NumberDictionary } from 'unique-names-generator'

export const cyberpunkAdjectives = [
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
    dictionaries: [colors, cyberpunkAdjectives, animals, numberDictionary],
    separator: '-',
  }
  return uniqueNamesGenerator(config)
}
