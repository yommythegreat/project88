import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSimulationContext } from '../state/SimulationContext.jsx'
import { LIFE_GOALS } from '../logic/phaseConfig.js'

const GOAL_ACCENT = {
  humility:      { color: '#9B72CF', glow: 'rgba(155,114,207,0.10)' },
  resilience:    { color: '#E07070', glow: 'rgba(224,112,112,0.10)' },
  communication: { color: '#5B9BD5', glow: 'rgba(91,155,213,0.10)'  },
  empathy:       { color: '#5BBFBF', glow: 'rgba(91,191,191,0.10)'  },
}

function GoalOption({ value, label, description, selected, onSelect }) {
  const accent = GOAL_ACCENT[value] ?? { color: '#C9B76A', glow: 'rgba(201,183,106,0.10)' }
  return (
    <button onClick={() => onSelect(value)}
      className="w-full text-left rounded-2xl p-5 transition-all duration-200 active:scale-[0.98]"
      style={selected ? {
        background: 'linear-gradient(155deg, #1A1A26 0%, #13131F 100%)',
        border: `1px solid ${accent.color}55`,
        boxShadow: `0 0 28px ${accent.glow}, inset 0 1px 0 ${accent.color}20, 0 8px 32px rgba(0,0,0,0.4)`,
      } : {
        background: 'linear-gradient(155deg, #14141C 0%, #0E0E14 100%)',
        border: '1px solid rgba(237,233,224,0.11)',
        boxShadow: 'inset 0 1px 0 rgba(237,233,224,0.05), 0 4px 16px rgba(0,0,0,0.3)',
      }}>
      <div className="flex items-start gap-4">
        <div className="w-[3px] rounded-full shrink-0 mt-1 transition-all duration-300"
          style={{
            height: 36,
            background: selected ? accent.color : 'rgba(255,255,255,0.08)',
            boxShadow: selected ? `0 0 8px ${accent.color}80` : 'none',
          }} />
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-base leading-tight transition-colors duration-200"
            style={{ color: selected ? accent.color : '#EDE9E0' }}>
            {label}
          </p>
          <p className="text-sm mt-1.5 leading-relaxed" style={{ color: '#58606E' }}>{description}</p>
        </div>
      </div>
    </button>
  )
}

export default function ChooseGoal() {
  const navigate = useNavigate()
  const { state, updateCharacter } = useSimulationContext()
  const [selected, setSelected] = useState(state.character?.lifeGoal ?? null)
  const accent = selected ? GOAL_ACCENT[selected] : null

  function handleNext() {
    if (!selected) return
    updateCharacter({ lifeGoal: selected })
    navigate('/create/personality')
  }

  return (
    <div className="creation-screen">
      <div className="absolute top-0 right-0 w-[280px] h-[280px] pointer-events-none transition-all duration-700"
        style={{
          background: accent
            ? `radial-gradient(ellipse at 100% 0%, ${accent.glow} 0%, transparent 70%)`
            : 'radial-gradient(ellipse at 100% 0%, rgba(201,183,106,0.04) 0%, transparent 70%)',
        }} />

      <div className="flex-1 flex flex-col relative z-10 py-8">
        <p className="step-indicator">Step 1 of 5</p>
        <h1 className="screen-heading">What does your character need to learn?</h1>
        <p className="screen-subtext">This becomes the lens through which their entire life is measured.</p>

        <div className="space-y-3 flex-1">
          {LIFE_GOALS.map(goal => (
            <GoalOption key={goal.value} {...goal} selected={selected === goal.value} onSelect={setSelected} />
          ))}
        </div>

        <div className="mt-8">
          <button onClick={handleNext} disabled={!selected} className="btn-primary"
            style={{ opacity: selected ? 1 : 0.35 }}>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
