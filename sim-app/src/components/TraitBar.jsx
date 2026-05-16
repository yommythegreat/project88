export default function TraitBar({ label, value }) {
  const isHigh = value >= 70
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium" style={{ color: '#58606E' }}>{label}</span>
        <span className="text-xs font-semibold tabular-nums" style={{ color: isHigh ? '#C9B76A' : '#EDE9E0' }}>
          {value}
        </span>
      </div>
      <div className="h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${value}%`,
            background: isHigh
              ? 'linear-gradient(to right, #C9B76A, #E8D485)'
              : 'linear-gradient(to right, #3A4A5C, #5B9BD5)',
            boxShadow: isHigh ? '0 0 8px rgba(201,183,106,0.6)' : 'none',
          }}
        />
      </div>
    </div>
  )
}
