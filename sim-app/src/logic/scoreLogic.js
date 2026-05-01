/**
 * Compute the final legacy score (0–100) from the character's full history.
 */
export function computeLegacyScore(character) {
  const { traits, shadows, wellbeing, lifeGoal, phaseHistory } = character

  // Base trait score
  const traitScore = (
    (traits.resilience        ?? 50) * 0.25 +
    (traits.empathy           ?? 50) * 0.25 +
    (traits.emotionalOpenness ?? 50) * 0.20 +
    (traits.confidence        ?? 50) * 0.15 +
    (traits.curiosity         ?? 50) * 0.15
  )

  // Shadow penalty (high shadows reduce score)
  const avgShadow = (
    ((shadows?.pride      ?? 0) +
     (shadows?.avoidance  ?? 0) +
     (shadows?.rigidity   ?? 0)) / 3
  )
  const shadowPenalty = avgShadow * 0.2

  // Wellbeing contribution
  const wellbeingScore = (wellbeing ?? 60) * 0.15

  // Goal-alignment bonus (check if goal trait improved over phases)
  let goalBonus = 0
  const GOAL_TRAIT = {
    humility:      'emotionalOpenness',
    resilience:    'resilience',
    communication: 'emotionalOpenness',
    empathy:       'empathy',
  }
  const goalTrait = GOAL_TRAIT[lifeGoal]
  if (goalTrait && traits[goalTrait] > 65) goalBonus = 8
  if (goalTrait && traits[goalTrait] > 80) goalBonus = 15

  const raw = traitScore - shadowPenalty + wellbeingScore * 0.3 + goalBonus
  return Math.min(100, Math.max(0, Math.round(raw)))
}

export function scoreTier(score) {
  if (score >= 85) return { label: 'Transcendent', color: '#C9B76A' }
  if (score >= 70) return { label: 'Integrated',   color: '#5BBFBF' }
  if (score >= 55) return { label: 'Becoming',     color: '#5B9BD5' }
  if (score >= 40) return { label: 'Struggling',   color: '#9B72CF' }
  return                   { label: 'Unresolved',  color: '#E07070' }
}
