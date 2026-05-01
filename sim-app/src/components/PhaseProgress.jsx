import { PHASES } from '../logic/phaseConfig.js'

export default function PhaseProgress({ currentPhase, eventsDone, eventsTotal }) {
  return (
    <div className="flex gap-1">
      {PHASES.map((p, i) => {
        const isDone   = i < currentPhase
        const isActive = i === currentPhase
        return (
          <div key={i} className="flex-1 h-[3px] rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={isDone ? {
                width: '100%',
                background: 'linear-gradient(to right, #C9B76A, #E8D485)',
              } : isActive ? {
                width: `${(eventsDone / eventsTotal) * 100}%`,
                background: 'linear-gradient(to right, #C9B76A, #E8D485)',
                boxShadow: '0 0 6px rgba(201,183,106,0.7)',
              } : { width: '0%' }}
            />
          </div>
        )
      })}
    </div>
  )
}
