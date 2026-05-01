import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSimulationContext } from '../state/SimulationContext.jsx'
import ParentCard from '../components/ParentCard.jsx'
import GenerateParentForm from '../components/GenerateParentForm.jsx'

export default function SelectParents() {
  const navigate = useNavigate()
  const { state, updateCharacter, addToParentLibrary } = useSimulationContext()
  const [mother, setMother] = useState(state.character?.parents?.mother ?? null)
  const [father, setFather] = useState(state.character?.parents?.father ?? null)
  const [showForm, setShowForm] = useState(null)

  const mothers = state.parentLibrary.filter(p => p.role === 'mother')
  const fathers = state.parentLibrary.filter(p => p.role === 'father')

  function handleGenerated(parent) {
    addToParentLibrary(parent)
    if (showForm === 'mother') setMother(parent)
    if (showForm === 'father') setFather(parent)
    setShowForm(null)
  }

  function handleNext() {
    updateCharacter({ parents: { mother, father } })
    navigate('/create/origin')
  }

  const SectionLabel = ({ children }) => (
    <p className="text-[11px] tracking-[0.18em] uppercase font-medium"
      style={{ color: 'rgba(201,183,106,0.55)' }}>{children}</p>
  )

  return (
    <div className="creation-screen">
      <div className="absolute top-0 left-0 w-full h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 30% 0%, rgba(201,183,106,0.06) 0%, transparent 70%)' }} />

      <div className="flex-1 flex flex-col relative z-10 py-8">
        <p className="step-indicator">Step 3 of 5</p>
        <h1 className="screen-heading">Who raises your character?</h1>
        <p className="screen-subtext">Parents shape the earliest version of who we become. Both slots are optional.</p>

        <div className="flex-1 space-y-7">
          {/* Mother */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <SectionLabel>Mother</SectionLabel>
              {mother && (
                <button onClick={() => setMother(null)} className="text-xs"
                  style={{ color: 'rgba(237,233,224,0.35)' }}>Remove</button>
              )}
            </div>
            {mother ? (
              <ParentCard parent={mother} selected onSelect={() => {}} />
            ) : (
              <>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {mothers.map(p => <ParentCard key={p.id} parent={p} selected={false} onSelect={setMother} />)}
                </div>
                {showForm === 'mother'
                  ? <GenerateParentForm lockedRole="mother" onGenerated={handleGenerated} onCancel={() => setShowForm(null)} />
                  : <button onClick={() => setShowForm('mother')} className="btn-secondary text-sm">+ Generate a mother</button>
                }
              </>
            )}
          </section>

          {/* Father */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <SectionLabel>Father</SectionLabel>
              {father && (
                <button onClick={() => setFather(null)} className="text-xs"
                  style={{ color: 'rgba(237,233,224,0.35)' }}>Remove</button>
              )}
            </div>
            {father ? (
              <ParentCard parent={father} selected onSelect={() => {}} />
            ) : (
              <>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {fathers.map(p => <ParentCard key={p.id} parent={p} selected={false} onSelect={setFather} />)}
                </div>
                {showForm === 'father'
                  ? <GenerateParentForm lockedRole="father" onGenerated={handleGenerated} onCancel={() => setShowForm(null)} />
                  : <button onClick={() => setShowForm('father')} className="btn-secondary text-sm">+ Generate a father</button>
                }
              </>
            )}
          </section>
        </div>

        <div className="mt-8 space-y-3">
          <button onClick={handleNext} className="btn-primary">Next</button>
          <button onClick={() => navigate('/create/personality')} className="btn-secondary">Back</button>
        </div>
      </div>
    </div>
  )
}
