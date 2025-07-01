// App.tsx
import { Routes, Route } from 'react-router-dom';
import LayoutPanel from '../layout/LayoutPanel';
import Inicio from '../pages/Inicio';
import Clientes from '../pages/Clientes';
import Metricas from '../pages/Metricas';
import { Login as Acceso} from '../pages/Acceso';
import PlanAjustes from '../pages/PlanAjustes';
import { AuthProvider } from '../src/context/authContext';
import { PrivateRoute } from '../components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/acceso" element={<Acceso />} />
        
        <Route
          path="/"
          element={
            <PrivateRoute>
              <LayoutPanel />
            </PrivateRoute>
          }
        >
          <Route index element={<Inicio />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="ajustes" element={<PlanAjustes />} />
          <Route path='metricas' element={<Metricas />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
