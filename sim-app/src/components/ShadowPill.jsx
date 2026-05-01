const LEVEL_STYLE = {
  low:    { background: 'rgba(88,96,110,0.15)',  color: '#58606E',  border: '1px solid rgba(88,96,110,0.2)' },
  medium: { background: 'rgba(155,114,207,0.12)', color: '#9B72CF', border: '1px solid rgba(155,114,207,0.25)' },
  high:   { background: 'rgba(224,112,112,0.15)', color: '#E07070', border: '1px solid rgba(224,112,112,0.3)', boxShadow: '0 0 8px rgba(224,112,112,0.2)' },
}

export default function ShadowPill({ name, value }) {
  const level = value >= 66 ? 'high' : value >= 33 ? 'medium' : 'low'
  const style = LEVEL_STYLE[level]
  return (
    <span className="text-[10px] px-2.5 py-1 rounded-full font-medium" style={style}>
      {name}
    </span>
  )
}
