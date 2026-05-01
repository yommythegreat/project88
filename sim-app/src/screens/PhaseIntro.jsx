import { useParams, useNavigate } from 'react-router-dom'
import { useSimulationContext } from '../state/SimulationContext.jsx'
import { PHASES } from '../logic/phaseConfig.js'

const PHASE_GLOW = [
  'rgba(180,200,230,0.06)', 'rgba(91,155,213,0.08)', 'rgba(155,114,207,0.08)',
  'rgba(201,183,106,0.11)', 'rgba(91,191,191,0.08)',  'rgba(212,168,67,0.10)',
]
const PHASE_ACCENT = ['#B4C8E6', '#5B9BD5', '#9B72CF', '#C9B76A', '#5BBFBF', '#D4A843']

export default function PhaseIntro() {
  const { phaseIndex } = useParams()
  const navigate = useNavigate()
  const { state } = useSimulationContext()
  const idx = Number(phaseIndex)
  const phase = PHASES[idx]
  const character = state.character
  if (!phase || !character) { navigate('/'); return null }

  const accent = PHASE_ACCENT[idx]
  const glow   = PHASE_GLOW[idx]

  return (
    <div className="screen" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Atmospheric glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse at 50% 20%, ${glow} 0%, transparent 65%)`,
      }} />

      <div className="flex-1 flex flex-col justify-between relative z-10">
        <div>
          {/* Phase label */}
          <p className="text-[11px] tracking-[0.22em] uppercase font-medium mb-8"
            style={{ color: `${accent}88` }}>
            Phase {idx + 1} of {PHASES.length} · {phase.ageRange}
          </p>

          {/* Core orb */}
          <div className="stat-orb mb-8" style={{
            width: 64, height: 64,
            border: `1px solid ${accent}38`,
            background: `radial-gradient(circle at 40% 35%, ${accent}18 0%, rgba(8,10,12,0.6) 70%)`,
          }}>
            <span style={{ fontSize: 22, color: accent, fontWeight: 700 }}>
              {character.traits?.resilience ?? 50}
            </span>
          </div>

          {/* Phase name */}
          <h1 style={{
            fontSize: 'clamp(40px, 11vw, 56px)',
            fontWeight: 700,
            color: '#EDE9E0',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: 16,
          }}>
            {phase.name}
          </h1>

          <p style={{ fontSize: 15, color: 'rgba(88,96,110,0.9)', lineHeight: 1.65, marginBottom: 40, maxWidth: 340 }}>
            {phase.description}
          </p>

          {/* Quote */}
          <div style={{
            borderLeft: `3px solid ${accent}55`,
            paddingLeft: 16,
            marginBottom: 40,
          }}>
            <p style={{ fontSize: 13, color: `${accent}99`, fontStyle: 'italic', lineHeight: 1.6 }}>
              "{phase.quote}"
            </p>
          </div>

          {/* Character stats row */}
          <div className="flex gap-6 flex-wrap">
            {[
              { label: 'Wellbeing',  value: character.wellbeing ?? 60 },
              { label: 'Resilience', value: character.traits?.resilience ?? 50 },
              { label: 'Empathy',    value: character.traits?.empathy ?? 50 },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ fontSize: 10, color: 'rgba(88,96,110,0.6)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 2 }}>{label}</p>
                <p style={{ fontSize: 20, fontWeight: 700, color: accent, letterSpacing: '-0.02em' }}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 mt-8">
          <button onClick={() => navigate(`/phase/${idx}/observe`)} className="btn-primary">
            Enter {phase.name}
          </button>
        </div>
      </div>
    </div>
  )
}
