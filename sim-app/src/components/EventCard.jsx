const TYPE_COLOR = {
  relationship: '#5BBFBF',
  career:       '#5B9BD5',
  loss:         '#E07070',
  perspective:  '#9B72CF',
  reflection:   '#C9B76A',
  conflict:     '#E07070',
  achievement:  '#5B9BD5',
}

export default function EventCard({ event, onSelect }) {
  const color = TYPE_COLOR[event.type] ?? '#C9B76A'
  return (
    <button
      onClick={() => onSelect(event)}
      className="w-full text-left rounded-2xl p-4 transition-all duration-200 active:scale-[0.98]"
      style={{
        background: 'linear-gradient(155deg, #14141C 0%, #0E0E14 100%)',
        border: `1px solid ${color}30`,
        boxShadow: `0 0 16px ${color}08, inset 0 1px 0 rgba(255,255,255,0.04)`,
      }}
    >
      <div className="flex gap-3">
        <div className="w-[3px] rounded-full shrink-0 mt-1"
          style={{ height: 40, background: color, boxShadow: `0 0 8px ${color}60` }} />
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-medium tracking-widest uppercase mb-1" style={{ color }}>
            {event.type}
          </p>
          <p className="text-sm text-sim-text leading-relaxed">{event.title}</p>
          <p className="text-xs mt-1 leading-relaxed" style={{ color: '#58606E' }}>{event.description}</p>
          <div className="flex gap-3 mt-2">
            {event.coreDelta !== 0 && (
              <span className="text-[10px] font-medium"
                style={{ color: event.coreDelta > 0 ? '#5BBFBF' : '#E07070' }}>
                Core {event.coreDelta > 0 ? '+' : ''}{event.coreDelta}
              </span>
            )}
            {event.wellbeingDelta !== 0 && (
              <span className="text-[10px] font-medium"
                style={{ color: event.wellbeingDelta > 0 ? '#5BBFBF' : '#E07070' }}>
                Wellbeing {event.wellbeingDelta > 0 ? '+' : ''}{event.wellbeingDelta}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}
