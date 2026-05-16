export default function InfluencePoints({ points }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="w-2.5 h-2.5 rounded-full transition-all duration-300"
          style={i < points ? {
            background: 'radial-gradient(circle at 35% 35%, #E8D485, #9C8A44)',
            boxShadow: '0 0 6px rgba(201,183,106,0.6)',
            border: '1px solid rgba(201,183,106,0.5)',
          } : {
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        />
      ))}
    </div>
  )
}
