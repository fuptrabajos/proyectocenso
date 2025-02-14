import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TasksPage } from "./pages/tasksPage";
import { AfiliacionFormPage } from "./pages/AfiliacionFormPage";
import { AfiliacionPage } from "./pages/AfiliacionPage";
import { TasksFormPage } from "./pages/TasksFormPage";
import { Navigation } from "./components/Navigation";  // 🔹 Barra de navegación
import { DatperFormPage } from "./pages/DatperFormPage";
import { DatperPage } from "./pages/DatperPage";
import { IdentidadPage } from "./pages/IdentidadPage";
import { IdentidadFormPage } from "./pages/IdentidadFormPage";
import { Toaster } from "react-hot-toast";
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
import Login from "./components/Login";  
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="container mx-auto">
        
        {/* 🔹 Ocultar Navigation cuando el usuario no está autenticado */}
        {user && <Navigation />}

        <Routes>
          {/* 🔹 Redirigir "/" a "/login" si no está autenticado */}
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

          {/* Página de Login - Solo accesible si no está autenticado */}
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />} />

          {/* Rutas protegidas */}
          {user ? (
            <>
              <Route path="/dashboard" element={<Dashboard setUser={setUser} />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/tasks-create" element={<TasksFormPage />} />
              <Route path="/tasks/:id" element={<TasksFormPage />} />

              <Route path="/Afiliacion" element={<AfiliacionPage />} />
              <Route path="/Afiliacion/:id" element={<AfiliacionFormPage />} />
              <Route path="/Afiliacion-create" element={<AfiliacionFormPage />} />

              <Route path="/Datper" element={<DatperPage />} />
              <Route path="/Datper/:id" element={<DatperFormPage />} />
              <Route path="/Datper-create" element={<DatperFormPage />} />

              <Route path="/Identidad" element={<IdentidadPage />} />
              <Route path="/Identidad/:id" element={<IdentidadFormPage />} />
              <Route path="/Identidad-create" element={<IdentidadFormPage />} />

              <Route path="/Vivienda" element={<ViviendaPage />} />
              <Route path="/Vivienda/:id" element={<ViviendaFormPage />} />
              <Route path="/Vivienda-create" element={<ViviendaFormPage />} />

              <Route path="/Cultivo" element={<CultivoPage />} />
              <Route path="/Cultivo/:id" element={<CultivoFormPage />} />
              <Route path="/Cultivo-create" element={<CultivoFormPage />} />

              <Route path="/Academico" element={<AcademicoPage />} />
              <Route path="/Academico/:id" element={<AcademicoFormPage />} />
              <Route path="/Academico-create" element={<AcademicoFormPage />} />

              <Route path="/Regimen" element={<RegimenPage />} />
              <Route path="/Regimen/:id" element={<RegimenFormPage />} />
              <Route path="/Regimen-create" element={<RegimenFormPage />} />

              <Route path="/Basura" element={<BasuraPage />} />
              <Route path="/Basura/:id" element={<BasuraFormPage />} />
              <Route path="/Basura-create" element={<BasuraFormPage />} />

              <Route path="/Servicios" element={<ServiciosPage />} />
              <Route path="/Servicios/:id" element={<ServiciosFormPage />} />
              <Route path="/Servicios-create" element={<ServiciosFormPage />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>

        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
