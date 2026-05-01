function traitLevel(v) {
  return v >= 70 ? 'High' : v >= 40 ? 'Mid' : 'Low'
}

function pillStyle(label, value) {
  if (label.includes('warmth') || label.includes('empathy')) {
    return value >= 70
      ? { background: 'rgba(91,191,191,0.15)', color: '#5BBFBF', border: '1px solid rgba(91,191,191,0.25)' }
      : { background: 'rgba(255,255,255,0.04)', color: 'rgba(88,96,110,0.8)', border: '1px solid rgba(255,255,255,0.07)' }
  }
  if (label.includes('pride') || label.includes('shadow')) {
    return value >= 60
      ? { background: 'rgba(224,112,112,0.15)', color: '#E07070', border: '1px solid rgba(224,112,112,0.25)' }
      : { background: 'rgba(255,255,255,0.04)', color: 'rgba(88,96,110,0.8)', border: '1px solid rgba(255,255,255,0.07)' }
  }
  return { background: 'rgba(255,255,255,0.04)', color: 'rgba(88,96,110,0.8)', border: '1px solid rgba(255,255,255,0.07)' }
}

export default function ParentCard({ parent, selected, onSelect, disabled }) {
  const pills = [
    { label: 'warmth',       value: parent.traits.warmth },
    { label: 'empathy',      value: parent.traits.empathy },
    { label: 'pride shadow', value: parent.shadows.pride },
  ]

  return (
    <button
      onClick={() => !disabled && onSelect(parent)}
      disabled={disabled}
      className="w-full text-left rounded-xl px-4 py-3.5 transition-all duration-200 active:scale-[0.98]"
      style={selected ? {
        background: 'linear-gradient(155deg, #1A1A26 0%, #13131F 100%)',
        border: '1px solid rgba(201,183,106,0.45)',
        boxShadow: '0 0 20px rgba(201,183,106,0.08), inset 0 1px 0 rgba(201,183,106,0.1)',
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      } : {
        background: 'linear-gradient(155deg, #14141C 0%, #0E0E14 100%)',
        border: '1px solid rgba(237,233,224,0.09)',
        boxShadow: 'inset 0 1px 0 rgba(237,233,224,0.04)',
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-sm transition-colors duration-200"
              style={{ color: selected ? '#C9B76A' : '#EDE9E0' }}>
              {parent.name}
            </p>
            <span className="text-[10px] px-2 py-0.5 rounded-full capitalize"
              style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(88,96,110,0.9)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {parent.role}
            </span>
            {parent.type === 'generated' && (
              <span className="text-[10px] px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(201,183,106,0.12)', color: '#C9B76A', border: '1px solid rgba(201,183,106,0.2)' }}>
                Generated
              </span>
            )}
          </div>
          <p className="text-xs mt-1 leading-relaxed" style={{ color: 'rgba(88,96,110,0.9)' }}>
            {parent.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {pills.map(p => (
              <span key={p.label} className="text-[10px] px-2 py-0.5 rounded-full" style={pillStyle(p.label, p.value)}>
                {traitLevel(p.value)} {p.label}
              </span>
            ))}
          </div>
        </div>
        <div
          className="mt-0.5 w-4 h-4 rounded-full shrink-0 flex items-center justify-center transition-all duration-200"
          style={selected ? {
            background: 'radial-gradient(circle at 35% 35%, #E8D485, #9C8A44)',
            boxShadow: '0 0 8px rgba(201,183,106,0.5)',
            border: '1px solid rgba(201,183,106,0.6)',
          } : {
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          {selected && <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#080A0C' }} />}
        </div>
      </div>
    </button>
  )
}
