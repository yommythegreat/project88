const INTERVENTIONS = [
  {
    id: 'iv_therapy',
    type: 'reflection',
    title: 'Enter therapy',
    description: 'A structured space to examine patterns that keep repeating.',
    coreDelta: 6,
    wellbeingDelta: 5,
  },
  {
    id: 'iv_mentor',
    type: 'relationship',
    title: 'Seek a mentor',
    description: 'Someone who has walked further. Their perspective reshapes the path.',
    coreDelta: 5,
    wellbeingDelta: 2,
  },
  {
    id: 'iv_retreat',
    type: 'perspective',
    title: 'Take a retreat',
    description: 'Withdrawal from noise. The self becomes audible again.',
    coreDelta: 4,
    wellbeingDelta: 8,
  },
  {
    id: 'iv_confront',
    type: 'conflict',
    title: 'Confront the shadow',
    description: 'Face the pattern directly. Painful — but the only path through.',
    coreDelta: 8,
    wellbeingDelta: -4,
  },
]

export async function generateInterventions() {
  await new Promise(r => setTimeout(r, 400))
  return [...INTERVENTIONS]
}
