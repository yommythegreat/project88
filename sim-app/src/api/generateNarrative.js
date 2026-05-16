const PLACEHOLDERS = [
  {
    type: 'relationship',
    text: 'A bond formed quietly — one that would ask more than expected.',
    coreDelta: 2,
    wellbeingDelta: 2,
  },
  {
    type: 'career',
    text: 'A role taken not from passion but from necessity. It taught what passion costs.',
    coreDelta: 3,
    wellbeingDelta: -3,
  },
  {
    type: 'loss',
    text: 'Something ended. The kind of ending that reorders everything that follows.',
    coreDelta: 5,
    wellbeingDelta: -8,
  },
  {
    type: 'perspective',
    text: 'A stranger said something that couldn\'t be forgotten. The world shifted slightly.',
    coreDelta: 2,
    wellbeingDelta: 3,
  },
  {
    type: 'reflection',
    text: 'A quiet season arrived. For the first time, there was space to look inward.',
    coreDelta: 3,
    wellbeingDelta: 1,
  },
  {
    type: 'conflict',
    text: 'A rupture with someone close revealed something about the self that couldn\'t be unseen.',
    coreDelta: 4,
    wellbeingDelta: -5,
  },
  {
    type: 'achievement',
    text: 'A goal was reached. The satisfaction was real but briefer than expected.',
    coreDelta: 3,
    wellbeingDelta: 4,
  },
]

let _index = 0

export async function generateNarrative(character, phase) {
  await new Promise(r => setTimeout(r, 800 + Math.random() * 600))
  const event = PLACEHOLDERS[_index % PLACEHOLDERS.length]
  _index++
  return { ...event }
}
