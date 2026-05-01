const TYPE_META = {
  relationship: { color: '#5BBFBF', label: 'Relationship' },
  career:       { color: '#5B9BD5', label: 'Career'       },
  loss:         { color: '#E07070', label: 'Loss'         },
  perspective:  { color: '#9B72CF', label: 'Perspective'  },
  reflection:   { color: '#C9B76A', label: 'Reflection'   },
  conflict:     { color: '#E07070', label: 'Conflict'     },
  achievement:  { color: '#5B9BD5', label: 'Achievement'  },
}

export default function NarrativeEvent({ event, index, isLast }) {
  const meta = TYPE_META[event.type] ?? { color: '#58606E', label: event.type }

  return (
    <div className="flex gap-3" style={{ animation: `slideIn 0.4s ease-out ${index * 0.05}s both` }}>
      {/* Timeline */}
      <div className="flex flex-col items-center" style={{ width: 20 }}>
        <div className="w-[3px] rounded-full shrink-0"
          style={{ height: 20, background: meta.color, boxShadow: `0 0 8px ${meta.color}60` }} />
        {!isLast && (
          <div className="flex-1 w-px mt-1"
            style={{ background: 'linear-gradient(to bottom, rgba(237,233,224,0.08), transparent)', minHeight: 16 }} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-4">
        <p className="text-[10px] font-medium tracking-widest uppercase mb-1"
          style={{ color: meta.color }}>{meta.label}</p>
        <p className="text-sm leading-relaxed italic" style={{ color: 'rgba(237,233,224,0.75)' }}>
          {event.text}
        </p>
        {(event.coreDelta !== 0 || event.wellbeingDelta !== 0) && (
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
        )}
      </div>
    </div>
  )
}
