// App.tsx
import { Routes, Route } from 'react-router-dom'
import LayoutPanel from '../layout/LayoutPanel'
import Inicio from '../pages/Inicio'
import Clientes from '../pages/Clientes'
import Entrenamientos from '../pages/Entrenamientos'
import Acceso from '../pages/Acceso'

function App() {
  return (
    <Routes>
      <Route path="/acceso" element={<Acceso />} />
      <Route path="/" element={<LayoutPanel />}>
        <Route index element={<Inicio />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="entrenamientos" element={<Entrenamientos />} />
      </Route>
    </Routes>
  )
}

export default App
