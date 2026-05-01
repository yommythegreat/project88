import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSimulationContext } from '../state/SimulationContext.jsx'

const DEFAULT = { confidence: 50, curiosity: 50, emotionalOpenness: 50 }

function levelLabel(v) { return v >= 70 ? 'High' : v >= 40 ? 'Medium' : 'Low' }
function levelColor(v) { return v >= 70 ? '#C9B76A' : v >= 40 ? '#EDE9E0' : '#58606E' }

function previewSentence(p) {
  if (p.confidence >= 70 && p.emotionalOpenness <= 30)
    return 'A highly confident, emotionally closed character will resist change — but change will hit harder when it finally comes.'
  if (p.curiosity >= 70 && p.emotionalOpenness >= 70)
    return 'A curious and open character will move quickly — but may lack the resilience that comes from real resistance.'
  return 'Every starting point leads somewhere. The goal shapes the journey.'
}

function Slider({ label, value, onChange }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold" style={{ color: '#EDE9E0' }}>{label}</span>
        <span className="text-sm font-bold tabular-nums transition-colors duration-300" style={{ color: levelColor(value) }}>
          {levelLabel(value)} · {value}
        </span>
      </div>
      <input type="range" min={0} max={100} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full" style={{ '--fill': `${value}%` }} />
      <div className="flex justify-between text-[10px] tracking-widest uppercase"
        style={{ color: 'rgba(88,96,110,0.5)' }}>
        <span>Low</span><span>High</span>
      </div>
    </div>
  )
}

export default function SetPersonality() {
  const navigate = useNavigate()
  const { state, updateCharacter } = useSimulationContext()
  const initial = state.character?.traits
    ? { confidence: state.character.traits.confidence, curiosity: state.character.traits.curiosity, emotionalOpenness: state.character.traits.emotionalOpenness }
    : DEFAULT
  const [personality, setPersonality] = useState(initial)

  function set(key, val) { setPersonality(p => ({ ...p, [key]: val })) }

  function handleNext() {
    updateCharacter({ traits: { ...state.character?.traits, ...personality } })
    navigate('/create/parents')
  }

  return (
    <div className="creation-screen">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[250px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(201,183,106,0.05) 0%, transparent 70%)' }} />

      <div className="flex-1 flex flex-col relative z-10 py-8">
        <p className="step-indicator">Step 2 of 5</p>
        <h1 className="screen-heading">How does your character begin?</h1>
        <p className="screen-subtext">These starting traits will be shaped — and tested — by everything that follows.</p>

        <div className="space-y-8 flex-1">
          <Slider label="Confidence"         value={personality.confidence}        onChange={v => set('confidence', v)} />
          <Slider label="Curiosity"          value={personality.curiosity}         onChange={v => set('curiosity', v)} />
          <Slider label="Emotional Openness" value={personality.emotionalOpenness} onChange={v => set('emotionalOpenness', v)} />

          <div className="rounded-2xl p-5"
            style={{ background: 'rgba(201,183,106,0.04)', border: '1px solid rgba(201,183,106,0.15)' }}>
            <p className="text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(201,183,106,0.5)' }}>Preview</p>
            <p className="text-sm italic leading-relaxed" style={{ color: '#58606E' }}>{previewSentence(personality)}</p>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <button onClick={handleNext} className="btn-primary">Next</button>
          <button onClick={() => navigate('/create/goal')} className="btn-secondary">Back</button>
        </div>
      </div>
    </div>
  )
}
