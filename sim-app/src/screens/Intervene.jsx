import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSimulationContext } from '../state/SimulationContext.jsx'
import { generateInterventions } from '../api/generateIntervention.js'
import { applyEventToTraits } from '../logic/applyEvent.js'
import EventCard from '../components/EventCard.jsx'

export default function Intervene() {
  const { phaseIndex } = useParams()
  const navigate = useNavigate()
  const { state, updateCharacter } = useSimulationContext()
  const idx = Number(phaseIndex)
  const character = state.character
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    generateInterventions().then(ev => { setEvents(ev); setLoading(false) })
  }, [])

  function handleSelect(event) {
    if (!character || (character.influencePoints ?? 0) <= 0) return
    const impact = { coreDelta: event.coreDelta ?? 0, wellbeingDelta: event.wellbeingDelta ?? 0 }
    const updated = applyEventToTraits(character, impact)
    const entry = {
      ...event,
      text: event.description,
      phaseIndex: idx,
      id: `iv_${Date.now()}`,
      isIntervention: true,
    }
    updateCharacter({
      narrative: [...(character.narrative ?? []), entry],
      traits: updated.traits,
      wellbeing: updated.wellbeing,
      influencePoints: (character.influencePoints ?? 1) - 1,
    })
    navigate(`/phase/${idx}/observe`)
  }

  if (!character) { navigate('/'); return null }

  return (
    <div className="screen">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(201,183,106,0.08) 0%, transparent 60%)' }} />

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="mb-6">
          <p style={{ fontSize: 11, color: 'rgba(201,183,106,0.5)', textTransform: 'uppercase', letterSpacing: '0.22em', marginBottom: 8 }}>
            Crucible Intervention
          </p>
          <h1 className="screen-heading">Choose an intervention</h1>
          <p className="screen-subtext">
            You have {character.influencePoints ?? 0} influence point{character.influencePoints !== 1 ? 's' : ''} remaining.
            This choice will shape what follows.
          </p>
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center opacity-40">
            <p style={{ fontSize: 13, color: '#58606E' }}>Loading options…</p>
          </div>
        ) : (
          <div className="space-y-3 flex-1">
            {events.map(event => (
              <EventCard key={event.id} event={event} onSelect={handleSelect} />
            ))}
          </div>
        )}

        <div className="mt-6">
          <button onClick={() => navigate(`/phase/${idx}/observe`)} className="btn-secondary">
            Cancel — return to observation
          </button>
        </div>
      </div>
    </div>
  )
}
