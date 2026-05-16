export default function OriginCard({ value, label, hint, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(value)}
      className="w-full text-left rounded-xl px-4 py-3.5 transition-all duration-200 active:scale-[0.98]"
      style={selected ? {
        background: 'linear-gradient(155deg, #1A1A26 0%, #13131F 100%)',
        border: '1px solid rgba(201,183,106,0.45)',
        boxShadow: '0 0 20px rgba(201,183,106,0.08), inset 0 1px 0 rgba(201,183,106,0.1)',
      } : {
        background: 'linear-gradient(155deg, #14141C 0%, #0E0E14 100%)',
        border: '1px solid rgba(237,233,224,0.09)',
        boxShadow: 'inset 0 1px 0 rgba(237,233,224,0.04)',
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium text-sm transition-colors duration-200"
            style={{ color: selected ? '#C9B76A' : '#EDE9E0' }}>
            {label}
          </p>
          <p className="text-xs mt-0.5" style={{ color: '#58606E' }}>{hint}</p>
        </div>
        <div
          className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center transition-all duration-200"
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
