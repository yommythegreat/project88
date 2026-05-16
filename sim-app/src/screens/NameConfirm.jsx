import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSimulationContext } from '../state/SimulationContext.jsx'
import { seedTraits } from '../logic/seedTraits.js'
import { LIFE_GOALS } from '../logic/phaseConfig.js'

function levelLabel(v) { return v >= 70 ? 'High' : v >= 40 ? 'Medium' : 'Low' }
function levelColor(v) { return v >= 70 ? '#C9B76A' : v >= 40 ? '#EDE9E0' : '#58606E' }

const ORIGIN_LABELS = {
  wealthy: 'Wealthy', middleClass: 'Middle class', scarce: 'Scarce',
  warm: 'Warm', reserved: 'Reserved', tense: 'Tense',
  tight: 'Tight community', urban: 'Urban', isolated: 'Isolated',
}
const GOAL_COLORS = {
  humility: '#9B72CF', resilience: '#E07070', communication: '#5B9BD5', empathy: '#5BBFBF',
}

function Row({ label, value, valueColor }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-xs" style={{ color: 'rgba(88,96,110,0.9)' }}>{label}</span>
      <span className="text-xs font-semibold" style={{ color: valueColor ?? '#EDE9E0' }}>{value}</span>
    </div>
  )
}
function Divider() {
  return <div style={{ height: 1, background: 'rgba(237,233,224,0.06)' }} />
}

export default function NameConfirm() {
  const navigate = useNavigate()
  const { state, setCharacter } = useSimulationContext()
  const [name, setName] = useState(state.character?.name ?? '')
  const [focused, setFocused] = useState(false)

  const char = state.character
  const goalObj = LIFE_GOALS.find(g => g.value === char?.lifeGoal)
  const goalLabel = goalObj?.label ?? '—'
  const goalColor = GOAL_COLORS[char?.lifeGoal] ?? '#C9B76A'
  const mother = char?.parents?.mother
  const father = char?.parents?.father
  const originComplete = !!(char?.origin?.wealth && char?.origin?.family && char?.origin?.social)
  const canBegin = name.trim() && originComplete

  function handleBegin() {
    if (!canBegin) return
    const personality = {
      confidence: char.traits?.confidence ?? 50,
      curiosity: char.traits?.curiosity ?? 50,
      emotionalOpenness: char.traits?.emotionalOpenness ?? 50,
    }
    const parents = char.parents ?? { mother: null, father: null }
    const { traits, shadows } = seedTraits(personality, parents, char.origin)
    setCharacter({
      id: `char_${Date.now()}`,
      name: name.trim(),
      lifeGoal: char.lifeGoal,
      age: 0,
      currentPhase: 0,
      phaseComplete: false,
      parents,
      traits,
      shadows,
      wellbeing: 60,
      influencePoints: 5,
      origin: char.origin,
      narrative: [],
      phaseHistory: [],
      legacyScore: null,
    })
    navigate('/phase/0/intro')
  }

  return (
    <div className="creation-screen">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none transition-all duration-700"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${goalColor}0D 0%, transparent 65%)` }} />

      <div className="flex-1 flex flex-col relative z-10 py-8">
        <p className="step-indicator">Step 5 of 5</p>
        <h1 className="screen-heading">Name your character</h1>
        <p className="screen-subtext">This is who they will be. Choose deliberately.</p>

        <div className="flex-1 space-y-5">
          {/* Name input */}
          <div className="rounded-xl px-4 py-1 transition-all duration-200"
            style={{
              background: 'linear-gradient(155deg, #14141C 0%, #0E0E14 100%)',
              border: focused ? `1px solid ${goalColor}80` : '1px solid rgba(237,233,224,0.11)',
              boxShadow: focused ? `0 0 20px ${goalColor}15` : 'inset 0 1px 0 rgba(237,233,224,0.04)',
            }}>
            <input type="text" value={name} maxLength={30}
              onChange={e => setName(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Enter a name…"
              className="w-full bg-transparent py-3.5 text-base outline-none"
              style={{ color: '#EDE9E0', caretColor: '#C9B76A' }}
            />
          </div>

          {/* Summary */}
          <div className="rounded-2xl p-5 space-y-1"
            style={{
              background: 'linear-gradient(155deg, #14141C 0%, #0E0E14 100%)',
              border: '1px solid rgba(237,233,224,0.09)',
              boxShadow: 'inset 0 1px 0 rgba(237,233,224,0.04), 0 8px 32px rgba(0,0,0,0.35)',
            }}>
            <p className="text-[10px] tracking-[0.2em] uppercase mb-3 font-medium"
              style={{ color: 'rgba(201,183,106,0.5)' }}>Character Summary</p>

            {/* Goal row */}
            <div className="flex items-center justify-between rounded-lg px-3 py-2 mb-3"
              style={{ background: `${goalColor}0D`, border: `1px solid ${goalColor}25` }}>
              <span className="text-xs" style={{ color: 'rgba(88,96,110,0.9)' }}>Life goal</span>
              <span className="text-xs font-bold" style={{ color: goalColor }}>{goalLabel}</span>
            </div>

            <Row label="Confidence"        value={levelLabel(char?.traits?.confidence ?? 50)}        valueColor={levelColor(char?.traits?.confidence ?? 50)} />
            <Divider />
            <Row label="Curiosity"         value={levelLabel(char?.traits?.curiosity ?? 50)}         valueColor={levelColor(char?.traits?.curiosity ?? 50)} />
            <Divider />
            <Row label="Emotional openness" value={levelLabel(char?.traits?.emotionalOpenness ?? 50)} valueColor={levelColor(char?.traits?.emotionalOpenness ?? 50)} />

            <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(237,233,224,0.06)' }}>
              <Row label="Mother" value={mother ? mother.name : 'None'} valueColor={mother ? '#EDE9E0' : 'rgba(88,96,110,0.6)'} />
              <Divider />
              <Row label="Father" value={father ? father.name : 'None'} valueColor={father ? '#EDE9E0' : 'rgba(88,96,110,0.6)'} />
            </div>

            <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(237,233,224,0.06)' }}>
              <Row label="Wealth" value={ORIGIN_LABELS[char?.origin?.wealth] ?? '—'} />
              <Divider />
              <Row label="Family" value={ORIGIN_LABELS[char?.origin?.family] ?? '—'} />
              <Divider />
              <Row label="Social" value={ORIGIN_LABELS[char?.origin?.social] ?? '—'} />
            </div>
          </div>

          <p className="text-[11px] text-center italic" style={{ color: 'rgba(88,96,110,0.6)' }}>
            Once the simulation begins, these conditions are permanent.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {!originComplete && (
            <p className="text-xs text-center" style={{ color: '#E07070' }}>
              Go back and complete your origin conditions first.
            </p>
          )}
          <button onClick={handleBegin} disabled={!canBegin} className="btn-primary"
            style={{ opacity: canBegin ? 1 : 0.35 }}>Begin life</button>
          <button onClick={() => navigate('/create/origin')} className="btn-secondary">Back</button>
        </div>
      </div>
    </div>
  )
}
