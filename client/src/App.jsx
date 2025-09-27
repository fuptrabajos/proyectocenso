import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import { DashboardPage } from "./pages/DashboardPage";
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
import { Toaster } from "react-hot-toast";
import Mapa from "./components/Mapa";
import { ReportesAfiliacion } from "./components/Reportes/ReportesAfiliacion";
import { ReportesComunero } from "./components/Reportes/ReporteComunero";
import { ReporteVeredas } from "./components/Reportes/ReporteVeredas";
import { ReporteGruposEtarios } from "./components/Reportes/ReporteGruposEtarios";
import { ReportePoblacionEstudiantil } from "./components/Reportes/ReportePoblacionEstudiantil";
import { ReporteNivelAcademico } from "./components/Reportes/ReporteNivelAcademico";

// 🔒 Nuevos imports
import ProtectedRoute from "./components/ProtectedRoute";
import UserCreate from "./components/UserCreate";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(true);
    }
  }, []);

  return (
    <Router>
      <div className="container max-w-full">
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />

          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />}
          />

          {user && (
            <Route path="/dashboard" element={<DashboardPage setUser={setUser} />}>
              <Route index element={<Mapa />} />

              {/* 🔒 Solo admin puede crear usuarios */}
              <Route
                path="create-user"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <UserCreate />
                  </ProtectedRoute>
                }
              />

              {/* resto de rutas */}
              <Route path="crear" element={<AfiliacionFormPage />} />
              <Route path="listar" element={<AfiliacionPage />} />
              <Route path="Afiliacion/:id" element={<AfiliacionFormPage />} />
              <Route path="reportes" element={<ReportesAfiliacion />} />
              <Route path="reportes1" element={<ReportesComunero />} />
              <Route path="reportes2" element={<ReporteVeredas />} />
              <Route path="reportes3" element={<ReporteGruposEtarios />} />
              <Route path="reportes4" element={<ReportePoblacionEstudiantil />} />
              <Route path="reportes5" element={<ReporteNivelAcademico />} />
              <Route path="graficas" element={<div>Gráficas</div>} />
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

          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        </Routes>

        <Toaster />
      </div>
    </Router>
  );
}

export default App;
