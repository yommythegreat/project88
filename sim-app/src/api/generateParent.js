const PARENT_LIBRARY = [
  {
    id: 'parent_adaeze',
    name: 'Adaeze',
    role: 'mother',
    type: 'preset',
    description: 'A warm, expressive woman who leads with empathy and rarely hides how she feels.',
    traits:  { warmth: 85, empathy: 80 },
    shadows: { pride: 15 },
  },
  {
    id: 'parent_fatima',
    name: 'Fatima',
    role: 'mother',
    type: 'preset',
    description: 'A quietly curious woman, deeply thoughtful but emotionally guarded.',
    traits:  { warmth: 55, empathy: 60 },
    shadows: { pride: 30 },
  },
  {
    id: 'parent_miriam',
    name: 'Miriam',
    role: 'mother',
    type: 'preset',
    description: 'Anxious and loving in equal measure — she carried her children\'s pain as her own.',
    traits:  { warmth: 70, empathy: 75 },
    shadows: { pride: 40 },
  },
  {
    id: 'parent_emeka',
    name: 'Emeka',
    role: 'father',
    type: 'preset',
    description: 'A driven, accomplished man who equates success with worth and finds vulnerability difficult.',
    traits:  { warmth: 45, empathy: 40 },
    shadows: { pride: 75 },
  },
  {
    id: 'parent_leon',
    name: 'Leon',
    role: 'father',
    type: 'preset',
    description: 'Steady and dependable. He showed love through presence, not words.',
    traits:  { warmth: 60, empathy: 50 },
    shadows: { pride: 25 },
  },
  {
    id: 'parent_david',
    name: 'David',
    role: 'father',
    type: 'preset',
    description: 'Absent more than present. His gap shaped what his child would always look for.',
    traits:  { warmth: 25, empathy: 30 },
    shadows: { pride: 55 },
  },
]

export function getParentLibrary() {
  return PARENT_LIBRARY
}

export async function generateParent(name, role, description) {
  await new Promise(r => setTimeout(r, 1200))
  // Infer traits from description keywords
  const lower = description.toLowerCase()
  const warmth = lower.includes('warm') || lower.includes('loving') || lower.includes('kind')  ? 75
               : lower.includes('cold') || lower.includes('distant') || lower.includes('strict') ? 35
               : 55
  const empathy = lower.includes('empathy') || lower.includes('caring') || lower.includes('understand') ? 72
                : lower.includes('harsh') || lower.includes('critical') ? 30
                : 50
  const pride = lower.includes('proud') || lower.includes('ambitious') || lower.includes('success') ? 65
              : lower.includes('humble') || lower.includes('gentle') ? 20
              : 40

  return {
    id: `parent_${Date.now()}`,
    name,
    role,
    type: 'generated',
    description,
    traits:  { warmth, empathy },
    shadows: { pride },
  }
}
