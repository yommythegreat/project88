import { useState } from 'react'
import { generateParent } from '../api/generateParent.js'

const inputStyle = {
  background: '#080A0C',
  border: '1px solid rgba(237,233,224,0.1)',
  borderRadius: 12,
  padding: '12px 16px',
  fontSize: 14,
  color: '#EDE9E0',
  width: '100%',
  outline: 'none',
  caretColor: '#C9B76A',
}

export default function GenerateParentForm({ onGenerated, onCancel, lockedRole }) {
  const [name, setName] = useState('')
  const [role, setRole] = useState(lockedRole ?? 'mother')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !description.trim()) { setError('Name and description are required.'); return }
    setError('')
    setLoading(true)
    try {
      const parent = await generateParent(name.trim(), role, description.trim())
      onGenerated(parent)
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl p-5 space-y-4"
      style={{
        background: 'linear-gradient(155deg, #14141C 0%, #0E0E14 100%)',
        border: '1px solid rgba(201,183,106,0.18)',
        boxShadow: '0 0 24px rgba(201,183,106,0.06), inset 0 1px 0 rgba(201,183,106,0.08)',
      }}>
      <p className="text-[10px] tracking-[0.2em] uppercase font-medium"
        style={{ color: 'rgba(201,183,106,0.55)' }}>
        Generate a parent
      </p>

      <div className="space-y-1">
        <label className="text-xs" style={{ color: 'rgba(88,96,110,0.9)' }}>Name</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)}
          placeholder="e.g. Solomon" style={inputStyle} className="placeholder:text-[#58606E]" />
      </div>

      {!lockedRole && (
        <div className="space-y-1">
          <label className="text-xs" style={{ color: 'rgba(88,96,110,0.9)' }}>Role</label>
          <div className="flex gap-2">
            {['mother', 'father'].map(r => (
              <button key={r} type="button" onClick={() => setRole(r)}
                className="flex-1 py-2.5 rounded-xl text-sm capitalize transition-all duration-200"
                style={role === r ? {
                  background: 'rgba(201,183,106,0.1)', border: '1px solid rgba(201,183,106,0.4)', color: '#C9B76A',
                } : {
                  background: 'transparent', border: '1px solid rgba(237,233,224,0.1)', color: 'rgba(88,96,110,0.9)',
                }}>
                {r}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-1">
        <label className="text-xs" style={{ color: 'rgba(88,96,110,0.9)' }}>Personality in your own words</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)}
          placeholder="e.g. A strict but loving father who valued discipline above all else"
          rows={3} style={{ ...inputStyle, resize: 'none' }} className="placeholder:text-[#58606E]" />
      </div>

      {error && <p className="text-xs" style={{ color: '#E07070' }}>{error}</p>}

      <div className="flex gap-3 pt-1">
        <button type="button" onClick={onCancel} className="flex-1 btn-secondary" style={{ minHeight: 44, fontSize: 14 }}>
          Cancel
        </button>
        <button type="submit" disabled={loading} className="flex-1 btn-primary"
          style={{ minHeight: 44, fontSize: 14, opacity: loading ? 0.6 : 1 }}>
          {loading ? 'Generating…' : 'Generate'}
        </button>
      </div>
    </form>
  )
}
