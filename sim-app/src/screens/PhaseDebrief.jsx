import { useParams, useNavigate } from 'react-router-dom'
import { useSimulationContext } from '../state/SimulationContext.jsx'
import { PHASES } from '../logic/phaseConfig.js'
import TraitBar from '../components/TraitBar.jsx'
import ShadowPill from '../components/ShadowPill.jsx'

const PHASE_ACCENT = ['#B4C8E6', '#5B9BD5', '#9B72CF', '#C9B76A', '#5BBFBF', '#D4A843']

function StatRow({ label, value, delta }) {
  const isPos = delta > 0, isNeg = delta < 0
  return (
    <div className="flex items-center justify-between py-2">
      <span style={{ fontSize: 12, color: 'rgba(88,96,110,0.9)' }}>{label}</span>
      <div className="flex items-center gap-2">
        <span style={{ fontSize: 13, fontWeight: 600, color: '#EDE9E0' }}>{value}</span>
        {delta !== 0 && (
          <span style={{ fontSize: 11, color: isPos ? '#5BBFBF' : '#E07070', fontWeight: 600 }}>
            {isPos ? '+' : ''}{delta}
          </span>
        )}
      </div>
    </div>
  )
}

export default function PhaseDebrief() {
  const { phaseIndex } = useParams()
  const navigate = useNavigate()
  const { state, updateCharacter } = useSimulationContext()
  const idx = Number(phaseIndex)
  const phase = PHASES[idx]
  const character = state.character
  const accent = PHASE_ACCENT[idx]
  const isLastPhase = idx === PHASES.length - 1

  if (!phase || !character) { navigate('/'); return null }

  // Snapshot from phaseHistory if available
  const prev = character.phaseHistory?.[idx - 1]
  const traits = character.traits ?? {}

  function handleContinue() {
    // Save current state to phaseHistory
    const history = [...(character.phaseHistory ?? []), {
      phaseIndex: idx,
      traits: { ...character.traits },
      wellbeing: character.wellbeing,
    }]
    if (isLastPhase) {
      updateCharacter({ phaseHistory: history, phaseComplete: true })
      navigate('/legacy')
    } else {
      const next = idx + 1
      updateCharacter({ phaseHistory: history, currentPhase: next, phaseComplete: false })
      navigate(`/phase/${next}/intro`)
    }
  }

  return (
    <div className="screen" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${accent}12 0%, transparent 65%)` }} />

      <div className="flex-1 flex flex-col relative z-10">
        {/* Header */}
        <div className="mb-6">
          <p style={{ fontSize: 10, color: `${accent}88`, textTransform: 'uppercase', letterSpacing: '0.22em', marginBottom: 6 }}>
            Phase Complete
          </p>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#EDE9E0', letterSpacing: '-0.01em', marginBottom: 4 }}>
            {phase.name}
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(88,96,110,0.8)' }}>{phase.ageRange}</p>
        </div>

        {/* Trait summary card */}
        <div className="rounded-2xl p-5 mb-5"
          style={{
            background: 'linear-gradient(155deg, #14141C 0%, #0E0E14 100%)',
            border: `1px solid ${accent}22`,
            boxShadow: `0 0 24px ${accent}08`,
          }}>
          <p style={{ fontSize: 10, color: `${accent}77`, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 12 }}>
            Trait Growth
          </p>
          <div className="space-y-1">
            <div style={{ height: 1, background: 'rgba(237,233,224,0.06)', marginBottom: 4 }} />
            <StatRow label="Resilience"        value={traits.resilience ?? 50}        delta={prev ? (traits.resilience ?? 50) - (prev.traits?.resilience ?? 50) : 0} />
            <div style={{ height: 1, background: 'rgba(237,233,224,0.06)' }} />
            <StatRow label="Empathy"           value={traits.empathy ?? 50}           delta={prev ? (traits.empathy ?? 50) - (prev.traits?.empathy ?? 50) : 0} />
            <div style={{ height: 1, background: 'rgba(237,233,224,0.06)' }} />
            <StatRow label="Emotional Openness" value={traits.emotionalOpenness ?? 50} delta={prev ? (traits.emotionalOpenness ?? 50) - (prev.traits?.emotionalOpenness ?? 50) : 0} />
            <div style={{ height: 1, background: 'rgba(237,233,224,0.06)' }} />
            <StatRow label="Wellbeing"         value={character.wellbeing ?? 60}      delta={prev ? (character.wellbeing ?? 60) - (prev.wellbeing ?? 60) : 0} />
          </div>
        </div>

        {/* Traits bars */}
        <div className="space-y-2 mb-5">
          <TraitBar label="Resilience"         value={traits.resilience ?? 50} />
          <TraitBar label="Empathy"            value={traits.empathy ?? 50} />
          <TraitBar label="Emotional Openness" value={traits.emotionalOpenness ?? 50} />
        </div>

        {/* Shadows */}
        {character.shadows && (
          <div className="flex flex-wrap gap-2 mb-6">
            <p style={{ fontSize: 10, color: 'rgba(88,96,110,0.6)', textTransform: 'uppercase', letterSpacing: '0.15em', width: '100%' }}>Active Shadows</p>
            <ShadowPill name="Pride"     value={character.shadows.pride ?? 0} />
            <ShadowPill name="Avoidance" value={character.shadows.avoidance ?? 0} />
            <ShadowPill name="Rigidity"  value={character.shadows.rigidity ?? 0} />
          </div>
        )}

        <div className="mt-auto space-y-3">
          <button onClick={handleContinue} className="btn-primary">
            {isLastPhase ? 'Calculate Legacy Score →' : `Enter ${PHASES[idx + 1]?.name} →`}
          </button>
        </div>
      </div>
    </div>
  )
}
