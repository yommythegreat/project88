import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSimulationContext } from '../state/SimulationContext.jsx'
import { computeLegacyScore, scoreTier } from '../logic/scoreLogic.js'
import TraitBar from '../components/TraitBar.jsx'

const STROKE = 12

function ScoreRing({ total, displayValue, size = 200 }) {
  const radius = (size - STROKE * 2) / 2
  const circ   = 2 * Math.PI * radius
  const offset = circ - (displayValue / 100) * circ
  const tier   = scoreTier(total)

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <defs>
          <filter id="ring-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* Track */}
        <circle cx={size/2} cy={size/2} r={radius} fill="none"
          stroke="rgba(255,255,255,0.06)" strokeWidth={STROKE} />
        {/* Progress */}
        <circle cx={size/2} cy={size/2} r={radius} fill="none"
          stroke={tier.color} strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          filter="url(#ring-glow)"
          style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.34,1.3,0.64,1)' }}
        />
      </svg>
      {/* Center */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontSize: 42, fontWeight: 700, color: tier.color, letterSpacing: '-0.03em', lineHeight: 1 }}>
          {displayValue}
        </span>
        <span style={{ fontSize: 11, color: tier.color, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: 4 }}>
          {tier.label}
        </span>
      </div>
    </div>
  )
}

export default function LegacyScore() {
  const navigate = useNavigate()
  const { state, updateCharacter, resetSimulation } = useSimulationContext()
  const character = state.character
  const [displayValue, setDisplayValue] = useState(0)
  const [ringValue, setRingValue] = useState(0)
  const didRun = useRef(false)

  useEffect(() => {
    if (!character || didRun.current) return
    didRun.current = true
    const total = computeLegacyScore(character)
    updateCharacter({ legacyScore: total })

    // Animate count-up
    const duration = 2000
    const start = Date.now()
    function tick() {
      const elapsed = Date.now() - start
      const t = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      const val = Math.round(ease * total)
      setDisplayValue(val)
      setRingValue(val)
      if (t < 1) requestAnimationFrame(tick)
    }
    setTimeout(() => requestAnimationFrame(tick), 400)
  }, [character, updateCharacter])

  if (!character) { navigate('/'); return null }

  const total = character.legacyScore ?? computeLegacyScore(character)
  const tier  = scoreTier(total)
  const traits = character.traits ?? {}

  function handleRestart() {
    resetSimulation()
    navigate('/')
  }

  return (
    <div className="screen" style={{ position: 'relative', overflow: 'hidden', alignItems: 'center' }}>
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 35%, ${tier.color}12 0%, transparent 65%)` }} />

      <div className="relative z-10 flex flex-col items-center w-full">
        <p style={{ fontSize: 11, color: 'rgba(201,183,106,0.5)', textTransform: 'uppercase', letterSpacing: '0.22em', marginBottom: 8, marginTop: 16 }}>
          Legacy Score
        </p>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#EDE9E0', marginBottom: 32, letterSpacing: '-0.01em' }}>
          {character.name}'s Life
        </h1>

        {/* Ring */}
        <div style={{ marginBottom: 40 }}>
          <ScoreRing total={total} displayValue={displayValue} size={200} />
        </div>

        {/* Tier label */}
        <div className="rounded-2xl px-6 py-3 mb-8"
          style={{ background: `${tier.color}12`, border: `1px solid ${tier.color}30` }}>
          <p style={{ fontSize: 14, color: tier.color, fontWeight: 600, textAlign: 'center' }}>
            {tier.label} Legacy
          </p>
        </div>

        {/* Final traits */}
        <div className="w-full space-y-2 mb-8">
          <p style={{ fontSize: 10, color: 'rgba(88,96,110,0.6)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 8 }}>
            Final Character
          </p>
          <TraitBar label="Resilience"         value={traits.resilience ?? 50} />
          <TraitBar label="Empathy"            value={traits.empathy ?? 50} />
          <TraitBar label="Emotional Openness" value={traits.emotionalOpenness ?? 50} />
          <TraitBar label="Confidence"         value={traits.confidence ?? 50} />
          <TraitBar label="Curiosity"          value={traits.curiosity ?? 50} />
        </div>

        <div className="w-full space-y-3">
          <button onClick={handleRestart} className="btn-primary">Simulate Another Life</button>
        </div>
      </div>
    </div>
  )
}
