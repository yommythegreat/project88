import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSimulationContext } from '../state/SimulationContext.jsx'
import OriginCard from '../components/OriginCard.jsx'

const WEALTH_OPTIONS = [
  { value: 'wealthy',     label: 'Wealthy family',   hint: 'High comfort — seeds pride risk' },
  { value: 'middleClass', label: 'Middle class',      hint: 'Balanced exposure' },
  { value: 'scarce',      label: 'Scarce resources',  hint: 'Early hardship — seeds resilience early' },
]
const FAMILY_OPTIONS = [
  { value: 'warm',     label: 'Warm and expressive',    hint: 'Seeds high emotional openness' },
  { value: 'reserved', label: 'Reserved and stable',    hint: 'Average emotional baseline' },
  { value: 'tense',    label: 'Tense or unpredictable', hint: 'Seeds avoidance shadow trait' },
]
const SOCIAL_OPTIONS = [
  { value: 'tight',    label: 'Small tight community', hint: 'High belonging, low exposure' },
  { value: 'urban',    label: 'Urban, diverse',         hint: 'High exposure to difference' },
  { value: 'isolated', label: 'Isolated',               hint: 'Self-reliant, low social input' },
]

function previewSentence(origin) {
  const parts = []
  if (origin.wealth === 'scarce')   parts.push('material scarcity')
  if (origin.wealth === 'wealthy')  parts.push('comfortable privilege')
  if (origin.family === 'tense')    parts.push('an unpredictable home')
  if (origin.family === 'warm')     parts.push('warmth and expression')
  if (origin.social === 'isolated') parts.push('quiet isolation')
  if (origin.social === 'urban')    parts.push('a world of difference')
  if (parts.length === 0) return 'Every environment shapes what we become.'
  return `They will begin in ${parts.join(', and ')} — a world that will ask specific things of them.`
}

export default function SetOrigin() {
  const navigate = useNavigate()
  const { state, updateCharacter } = useSimulationContext()
  const [origin, setOrigin] = useState(state.character?.origin ?? { wealth: null, family: null, social: null })

  function set(key, val) { setOrigin(o => ({ ...o, [key]: val })) }

  const allSelected = origin.wealth && origin.family && origin.social

  function handleNext() {
    if (!allSelected) return
    updateCharacter({ origin })
    navigate('/create/confirm')
  }

  const GroupLabel = ({ children }) => (
    <p className="text-[11px] tracking-[0.18em] uppercase font-medium"
      style={{ color: 'rgba(201,183,106,0.55)' }}>{children}</p>
  )

  return (
    <div className="creation-screen">
      <p className="step-indicator" style={{ paddingTop: 32 }}>Step 4 of 5</p>
      <h1 className="screen-heading">What world do they enter?</h1>
      <p className="screen-subtext">These conditions are fixed from birth. They cannot be changed.</p>

      <div className="flex-1 space-y-6">
        <div className="space-y-2">
          <GroupLabel>Wealth</GroupLabel>
          <div className="space-y-2">
            {WEALTH_OPTIONS.map(o => (
              <OriginCard key={o.value} {...o} selected={origin.wealth === o.value} onSelect={v => set('wealth', v)} />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <GroupLabel>Family environment</GroupLabel>
          <div className="space-y-2">
            {FAMILY_OPTIONS.map(o => (
              <OriginCard key={o.value} {...o} selected={origin.family === o.value} onSelect={v => set('family', v)} />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <GroupLabel>Social environment</GroupLabel>
          <div className="space-y-2">
            {SOCIAL_OPTIONS.map(o => (
              <OriginCard key={o.value} {...o} selected={origin.social === o.value} onSelect={v => set('social', v)} />
            ))}
          </div>
        </div>

        {allSelected && (
          <div className="rounded-2xl p-5"
            style={{ background: 'rgba(201,183,106,0.04)', border: '1px solid rgba(201,183,106,0.15)' }}>
            <p className="text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(201,183,106,0.5)' }}>Origin</p>
            <p className="text-sm italic leading-relaxed" style={{ color: '#58606E' }}>{previewSentence(origin)}</p>
          </div>
        )}
      </div>

      <div className="mt-8 space-y-3">
        <button onClick={handleNext} disabled={!allSelected} className="btn-primary"
          style={{ opacity: allSelected ? 1 : 0.35 }}>Next</button>
        <button onClick={() => navigate('/create/parents')} className="btn-secondary">Back</button>
      </div>
    </div>
  )
}
