import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { getParentLibrary } from '../api/generateParent.js'

const STORAGE_KEY = 'simulation_state'

const defaultState = {
  character:     null,
  parentLibrary: getParentLibrary(),
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : defaultState
  } catch {
    return defaultState
  }
}

function save(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) } catch {}
}

const SimulationContext = createContext(null)

export function SimulationProvider({ children }) {
  const [state, setState] = useState(load)

  useEffect(() => { save(state) }, [state])

  const updateCharacter = useCallback(patch => {
    setState(s => ({ ...s, character: { ...s.character, ...patch } }))
  }, [])

  const setCharacter = useCallback(char => {
    setState(s => ({ ...s, character: char }))
  }, [])

  const addToParentLibrary = useCallback(parent => {
    setState(s => ({
      ...s,
      parentLibrary: s.parentLibrary.some(p => p.id === parent.id)
        ? s.parentLibrary
        : [...s.parentLibrary, parent],
    }))
  }, [])

  const resetSimulation = useCallback(() => {
    setState({ ...defaultState, parentLibrary: getParentLibrary() })
  }, [])

  return (
    <SimulationContext.Provider value={{ state, updateCharacter, setCharacter, addToParentLibrary, resetSimulation }}>
      {children}
    </SimulationContext.Provider>
  )
}

export function useSimulationContext() {
  const ctx = useContext(SimulationContext)
  if (!ctx) throw new Error('useSimulationContext must be used inside SimulationProvider')
  return ctx
}
