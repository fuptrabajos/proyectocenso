import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import Login from "./components/Login";
import { DashboardPage } from './pages/DashboardPage';
import { AfiliacionFormPage } from "./pages/AfiliacionFormPage";
import { AfiliacionPage } from "./pages/AfiliacionPage";
import { DatperFormPage } from "./pages/DatperFormPage";
import { DatperPage } from "./pages/DatperPage";
import { IdentidadPage } from "./pages/IdentidadPage";
import { IdentidadFormPage } from "./pages/IdentidadFormPage";
import { ViviendaFormPage } from "./pages/ViviendaFormPage";
import { ViviendaPage } from "./pages/ViviendaPage";
import { CultivoFormPage } from "./pages/CultivoFormPage";
import { CultivoPage } from "./pages/CultivoPage";
import { AcademicoFormPage } from "./pages/AcademicoFormPage";
import { AcademicoPage } from "./pages/AcademicoPage";
import { RegimenFormPage } from "./pages/RegimenFormPage";
import { RegimenPage } from "./pages/RegimenPage";
import { BasuraFormPage } from "./pages/BasuraFormPage";
import { BasuraPage } from "./pages/BasuraPage";
import { ServiciosFormPage } from "./pages/ServiciosFormPage";
import { ServiciosPage } from "./pages/ServiciosPage";
import { SexoPage } from './pages/SexoPage';
import { SexoFormPage } from './pages/SexoFormPage';
import { Toaster } from 'react-hot-toast';
import Mapa from "./components/Mapa";

function App() {
  const [user, setUser] = useState(null);

  // Verificar si el usuario está autenticado al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(true); // Si hay un token, el usuario está autenticado
    }
  }, []);

  return (
    <Router>
      <div className="container max-w-full">
        <Routes>
          {/* Redirigir "/" a "/login" si no está autenticado, o a "/dashboard" si está autenticado */}
          <Route
            path="/"
            element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />

          {/* Página de Login - Solo accesible si no está autenticado */}
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />}
          />

          {/* Rutas protegidas - Solo accesibles si el usuario está autenticado */}
          {user && (
            <Route path="/dashboard" element={<DashboardPage setUser={setUser} />}>
              <Route index element={<Mapa/>} /> {/* Página por defecto del dashboard */}
              <Route path="crear" element={<AfiliacionFormPage />} />
              <Route path="listar" element={<AfiliacionPage />} />
              <Route path="Afiliacion/:id" element={<AfiliacionFormPage />} />
              <Route path="reportes" element={<DatperPage />} />
              <Route path="graficas" element={<div>Gráficas</div>} />

              <Route path="Sexo" element={<SexoPage />} />
              <Route path="Sexo/:id" element={<SexoFormPage />} />
              <Route path="Sexo-create" element={<SexoFormPage />} />

              <Route path="Afiliacion" element={<AfiliacionPage />} />
              <Route path="Afiliacion/:id" element={<AfiliacionFormPage />} />
              <Route path="Afiliacion-create" element={<AfiliacionFormPage />} />

              <Route path="Datper" element={<DatperPage />} />
              <Route path="Datper/:id" element={<DatperFormPage />} />
              <Route path="Datper-create" element={<DatperFormPage />} />

              <Route path="Identidad" element={<IdentidadPage />} />
              <Route path="Identidad/:id" element={<IdentidadFormPage />} />
              <Route path="Identidad-create" element={<IdentidadFormPage />} />

              <Route path="Vivienda" element={<ViviendaPage />} />
              <Route path="Vivienda/:id" element={<ViviendaFormPage />} />
              <Route path="Vivienda-create" element={<ViviendaFormPage />} />

              <Route path="Cultivo" element={<CultivoPage />} />
              <Route path="Cultivo/:id" element={<CultivoFormPage />} />
              <Route path="Cultivo-create" element={<CultivoFormPage />} />

              <Route path="Academico" element={<AcademicoPage />} />
              <Route path="Academico/:id" element={<AcademicoFormPage />} />
              <Route path="Academico-create" element={<AcademicoFormPage />} />

              <Route path="Regimen" element={<RegimenPage />} />
              <Route path="Regimen/:id" element={<RegimenFormPage />} />
              <Route path="Regimen-create" element={<RegimenFormPage />} />

              <Route path="Basura" element={<BasuraPage />} />
              <Route path="Basura/:id" element={<BasuraFormPage />} />
              <Route path="Basura-create" element={<BasuraFormPage />} />

              <Route path="Servicios" element={<ServiciosPage />} />
              <Route path="Servicios/:id" element={<ServiciosFormPage />} />
              <Route path="Servicios-create" element={<ServiciosFormPage />} />
            </Route>
          )}

          {/* Redirigir cualquier otra ruta no válida */}
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        </Routes>

        <Toaster /> {/* Asegúrate de que Toaster esté importado y configurado correctamente */}
      </div>
    </Router>
  );
}

export default App;