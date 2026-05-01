/**
 * Apply an event's impact to a character's traits and wellbeing.
 */
export function applyEventToTraits(character, impact) {
  const { coreDelta = 0, wellbeingDelta = 0 } = impact

  // Shadow level affects growth multiplier
  const shadows = character.shadows ?? {}
  const avgShadow = ((shadows.pride ?? 0) + (shadows.avoidance ?? 0) + (shadows.rigidity ?? 0)) / 3
  const multiplier = avgShadow > 66 ? 0.4 : avgShadow > 33 ? 1.0 : 1.5

  const wellbeing = Math.min(100, Math.max(0, (character.wellbeing ?? 60) + wellbeingDelta))

  // Wellbeing below 25 caps positive trait growth
  const effectiveCore = (wellbeing < 25 && coreDelta > 0) ? 0 : coreDelta

  const clamp = v => Math.min(100, Math.max(0, Math.round(v)))

  const traits = { ...character.traits }
  if (effectiveCore !== 0) {
    const delta = effectiveCore * multiplier
    // Spread growth across primary traits
    traits.resilience        = clamp((traits.resilience        ?? 50) + delta * 0.4)
    traits.empathy           = clamp((traits.empathy           ?? 50) + delta * 0.3)
    traits.emotionalOpenness = clamp((traits.emotionalOpenness ?? 50) + delta * 0.3)
  }

  return { traits, wellbeing }
}
