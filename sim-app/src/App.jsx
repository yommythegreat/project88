import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { SimulationProvider } from './state/SimulationContext.jsx'

import Welcome       from './screens/Welcome.jsx'
import ChooseGoal    from './screens/ChooseGoal.jsx'
import SetPersonality from './screens/SetPersonality.jsx'
import SelectParents from './screens/SelectParents.jsx'
import SetOrigin     from './screens/SetOrigin.jsx'
import NameConfirm   from './screens/NameConfirm.jsx'
import PhaseIntro    from './screens/PhaseIntro.jsx'
import Observe       from './screens/Observe.jsx'
import Intervene     from './screens/Intervene.jsx'
import PhaseDebrief  from './screens/PhaseDebrief.jsx'
import LegacyScore   from './screens/LegacyScore.jsx'

export default function App() {
  return (
    <SimulationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"                          element={<Welcome />} />
          <Route path="/create/goal"               element={<ChooseGoal />} />
          <Route path="/create/personality"        element={<SetPersonality />} />
          <Route path="/create/parents"            element={<SelectParents />} />
          <Route path="/create/origin"             element={<SetOrigin />} />
          <Route path="/create/confirm"            element={<NameConfirm />} />
          <Route path="/phase/:phaseIndex/intro"   element={<PhaseIntro />} />
          <Route path="/phase/:phaseIndex/observe" element={<Observe />} />
          <Route path="/phase/:phaseIndex/intervene" element={<Intervene />} />
          <Route path="/phase/:phaseIndex/debrief" element={<PhaseDebrief />} />
          <Route path="/legacy"                    element={<LegacyScore />} />
          <Route path="*"                          element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </SimulationProvider>
  )
}
