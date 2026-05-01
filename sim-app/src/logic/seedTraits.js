/**
 * Derives final seeded traits from personality sliders + parents + origin.
 * Returns { traits, shadows }.
 */
export function seedTraits(personality, parents, origin) {
  let conf = personality.confidence
  let cur  = personality.curiosity
  let open = personality.emotionalOpenness

  // Parent influence
  const mother = parents?.mother
  const father = parents?.father

  if (mother) {
    conf += (mother.traits.warmth  - 50) * 0.10
    open += (mother.traits.empathy - 50) * 0.12
  }
  if (father) {
    conf += (father.traits.warmth  - 50) * 0.08
    cur  += (father.traits.empathy - 50) * 0.08
  }

  // Origin influence
  if (origin.wealth === 'scarce')   { conf -= 6; cur += 5 }
  if (origin.wealth === 'wealthy')  { conf += 8 }
  if (origin.family === 'tense')    { open -= 10; conf -= 4 }
  if (origin.family === 'warm')     { open += 8 }
  if (origin.social === 'isolated') { cur += 6; open -= 5 }
  if (origin.social === 'urban')    { cur += 4; open += 3 }

  const clamp = v => Math.min(100, Math.max(0, Math.round(v)))

  const traits = {
    confidence:        clamp(conf),
    curiosity:         clamp(cur),
    emotionalOpenness: clamp(open),
    resilience:        clamp(50 + (origin.wealth === 'scarce' ? 10 : 0) + (origin.family === 'tense' ? 5 : 0)),
    empathy:           clamp(open * 0.6 + (mother ? mother.traits.empathy * 0.25 : 0) + 20),
  }

  // Shadow traits
  const prideShadow = clamp(
    (origin.wealth === 'wealthy' ? 30 : 10) +
    (conf > 70 ? 20 : 0) +
    (mother ? (mother.shadows.pride * 0.2) : 0) +
    (father ? (father.shadows.pride * 0.2) : 0)
  )
  const avoidanceShadow = clamp(
    (origin.family === 'tense' ? 35 : 10) +
    (open < 40 ? 20 : 0)
  )
  const rigidity = clamp(
    (origin.social === 'isolated' ? 25 : 5) +
    (conf > 70 ? 15 : 0)
  )

  const shadows = { pride: prideShadow, avoidance: avoidanceShadow, rigidity }

  return { traits, shadows }
}
