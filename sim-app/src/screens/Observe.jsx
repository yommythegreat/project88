import { useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSimulationContext } from '../state/SimulationContext.jsx'
import { PHASES } from '../logic/phaseConfig.js'
import { generateNarrative } from '../api/generateNarrative.js'
import { applyEventToTraits } from '../logic/applyEvent.js'
import NarrativeEvent from '../components/NarrativeEvent.jsx'
import TraitBar from '../components/TraitBar.jsx'
import ShadowPill from '../components/ShadowPill.jsx'
import PhaseProgress from '../components/PhaseProgress.jsx'
import InfluencePoints from '../components/InfluencePoints.jsx'

const PHASE_ACCENT = ['#B4C8E6', '#5B9BD5', '#9B72CF', '#C9B76A', '#5BBFBF', '#D4A843']

export default function Observe() {
  const { phaseIndex } = useParams()
  const navigate = useNavigate()
  const { state, updateCharacter } = useSimulationContext()
  const idx = Number(phaseIndex)
  const phase = PHASES[idx]
  const character = state.character
  const narrative = character?.narrative ?? []
  const phaseEvents = narrative.filter(e => e.phaseIndex === idx)
  const eventsDone = phaseEvents.length
  const eventsTotal = phase?.eventCount ?? 4
  const isComplete = eventsDone >= eventsTotal
  const isGenerating = useRef(false)
  const feedRef = useRef(null)
  const accent = PHASE_ACCENT[idx]

  const generate = useCallback(async () => {
    if (isGenerating.current || isComplete || !character) return
    isGenerating.current = true
    try {
      const event = await generateNarrative(character, phase)
      const entry = { ...event, phaseIndex: idx, id: `ev_${Date.now()}` }
      const impact = { coreDelta: event.coreDelta ?? 0, wellbeingDelta: event.wellbeingDelta ?? 0 }
      const updated = applyEventToTraits(character, impact)
      updateCharacter({
        narrative: [...narrative, entry],
        traits:    updated.traits,
        wellbeing: updated.wellbeing,
      })
    } finally {
      isGenerating.current = false
    }
  }, [character, isComplete, idx, narrative, phase, updateCharacter])

  useEffect(() => {
    if (isComplete) return
    const timer = setTimeout(generate, 2000)
    return () => clearTimeout(timer)
  }, [generate, isComplete, eventsDone])

  useEffect(() => {
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: 'smooth' })
  }, [phaseEvents.length])

  if (!phase || !character) { navigate('/'); return null }

  const wellbeing = character.wellbeing ?? 60
  const wellbeingColor = wellbeing < 30 ? '#E07070' : wellbeing < 55 ? '#5B9BD5' : '#5BBFBF'
  const isCrucible = phase.isCrucible

  return (
    <div className="screen" style={{ gap: 0, paddingTop: 0 }}>
      {/* HUD */}
      <div style={{
        paddingTop: 'max(16px, env(safe-area-inset-top))',
        paddingBottom: 16,
        paddingLeft: 20,
        paddingRight: 20,
        background: 'rgba(8,10,12,0.95)',
        borderBottom: '1px solid rgba(237,233,224,0.07)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 20,
        marginLeft: -20,
        marginRight: -20,
      }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {/* Core orb */}
            <div className="stat-orb" style={{ width: 44, height: 44, border: `1px solid ${accent}40` }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: accent }}>
                {character.traits?.resilience ?? 50}
              </span>
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#EDE9E0' }}>{character.name}</p>
              <p style={{ fontSize: 10, color: 'rgba(88,96,110,0.8)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {phase.name} · {phase.ageRange}
              </p>
            </div>
          </div>
          <InfluencePoints points={character.influencePoints ?? 5} />
        </div>

        {/* Wellbeing bar */}
        <div className="flex items-center gap-2 mb-3">
          <span style={{ fontSize: 10, color: 'rgba(88,96,110,0.7)', textTransform: 'uppercase', letterSpacing: '0.12em', minWidth: 60 }}>
            Wellbeing
          </span>
          <div className="flex-1 h-[3px] rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width: `${wellbeing}%`, background: wellbeingColor, boxShadow: `0 0 6px ${wellbeingColor}80` }} />
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, color: wellbeingColor, minWidth: 24, textAlign: 'right' }}>
            {wellbeing}
          </span>
        </div>

        <PhaseProgress currentPhase={idx} eventsDone={eventsDone} eventsTotal={eventsTotal} />

        {isCrucible && (
          <div className="mt-2 text-center">
            <span style={{ fontSize: 10, color: 'rgba(201,183,106,0.6)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              ⚡ Crucible Phase
            </span>
          </div>
        )}
      </div>

      {/* Narrative feed */}
      <div ref={feedRef} className="flex-1 overflow-y-auto narrative-feed py-6" style={{ marginLeft: -20, marginRight: -20, paddingLeft: 20, paddingRight: 20 }}>
        {phaseEvents.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 opacity-40">
            <p style={{ fontSize: 13, color: '#58606E', textAlign: 'center' }}>The life is beginning to unfold…</p>
          </div>
        )}
        {phaseEvents.map((event, i) => (
          <NarrativeEvent key={event.id} event={event} index={i} isLast={i === phaseEvents.length - 1} />
        ))}
        {!isComplete && (
          <div className="flex items-center gap-2 pb-4" style={{ opacity: 0.4, animation: 'fadeIn 0.5s ease-out' }}>
            <div className="w-[3px] h-4 rounded-full" style={{ background: accent }} />
            <p style={{ fontSize: 12, color: '#58606E', fontStyle: 'italic' }}>Generating next event…</p>
          </div>
        )}
      </div>

      {/* Bottom panel */}
      <div style={{ paddingBottom: 'max(20px, env(safe-area-inset-bottom))', paddingTop: 16, borderTop: '1px solid rgba(237,233,224,0.07)' }}>
        {/* Traits summary */}
        <div className="space-y-2 mb-5">
          <TraitBar label="Resilience"        value={character.traits?.resilience        ?? 50} />
          <TraitBar label="Empathy"           value={character.traits?.empathy           ?? 50} />
          <TraitBar label="Emotional Openness" value={character.traits?.emotionalOpenness ?? 50} />
        </div>

        {/* Shadows */}
        {character.shadows && (
          <div className="flex flex-wrap gap-2 mb-5">
            <ShadowPill name="Pride"     value={character.shadows.pride ?? 0} />
            <ShadowPill name="Avoidance" value={character.shadows.avoidance ?? 0} />
            <ShadowPill name="Rigidity"  value={character.shadows.rigidity ?? 0} />
          </div>
        )}

        {isComplete ? (
          <button onClick={() => navigate(`/phase/${idx}/debrief`)} className="btn-primary">
            Review Phase →
          </button>
        ) : isCrucible && (character.influencePoints ?? 0) > 0 ? (
          <button onClick={() => navigate(`/phase/${idx}/intervene`)} className="btn-secondary">
            Intervene ({character.influencePoints} IP)
          </button>
        ) : null}
      </div>
    </div>
  )
}
