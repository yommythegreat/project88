import { useNavigate } from 'react-router-dom'
import { useSimulationContext } from '../state/SimulationContext.jsx'

export default function Welcome() {
  const navigate = useNavigate()
  const { state, resetSimulation } = useSimulationContext()
  const hasCharacter = !!state.character?.name

  function handleBegin() {
    resetSimulation()
    navigate('/create/goal')
  }

  return (
    <div className="screen" style={{ justifyContent: 'center', gap: 0 }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 40%, rgba(201,183,106,0.07) 0%, transparent 65%)',
      }} />

      <div className="relative z-10 flex flex-col items-center text-center" style={{ gap: 0 }}>
        {/* Title */}
        <h1 style={{
          background: 'linear-gradient(160deg, #EDE9E0 0%, #C9B76A 55%, #8B7635 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontSize: 72,
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1,
          marginBottom: 12,
        }}>SIM</h1>

        <p style={{ fontSize: 13, color: 'rgba(88,96,110,0.9)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 48 }}>
          Life Simulation
        </p>

        <p style={{ fontSize: 15, color: 'rgba(237,233,224,0.55)', lineHeight: 1.7, maxWidth: 280, marginBottom: 64 }}>
          Design a life. Watch it unfold. Discover what was always there.
        </p>

        <div style={{ width: '100%', maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button onClick={handleBegin} className="btn-primary">
            Begin
          </button>
          {hasCharacter && (
            <button onClick={() => navigate(`/phase/${state.character.currentPhase}/observe`)} className="btn-secondary">
              Continue — {state.character.name}
            </button>
          )}
        </div>

        <p style={{ fontSize: 11, color: 'rgba(88,96,110,0.4)', marginTop: 48, letterSpacing: '0.1em' }}>
          Every choice matters. Every shadow costs.
        </p>
      </div>
    </div>
  )
}
