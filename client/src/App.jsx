import { BrowserRouter,  Routes, Route, Navigate } from 'react-router-dom';
import {TasksPage} from "./pages/tasksPage";
import {AfiliacionFormPage} from "./pages/AfiliacionFormPage";
import {AfiliacionPage} from "./pages/AfiliacionPage"
import {TasksFormPage } from "./pages/TasksFormPage";
import {Navigation} from './components/Navigation';
import {DatperFormPage} from './pages/DatperFormPage';
import {DatperPage} from './pages/DatperPage';
import {IdentidadPage} from './pages/IdentidadPage';
import {IdentidadFormPage} from './pages/IdentidadFormPage';
import {Toaster} from 'react-hot-toast';
import {ViviendaFormPage} from './pages/ViviendaFormPage';
import {ViviendaPage} from './pages/ViviendaPage';
import {CultivoFormPage} from './pages/CultivoFormPage';
import {CultivoPage} from './pages/CultivoPage';
import {AcademicoFormPage} from './pages/AcademicoFormPage';
import {AcademicoPage} from './pages/AcademicoPage';
import {RegimenFormPage} from './pages/RegimenFormPage';
import {RegimenPage} from './pages/RegimenPage';
import {BasuraFormPage} from './pages/BasuraFormPage';
import {BasuraPage} from './pages/BasuraPage';
import {ServiciosFormPage} from './pages/ServiciosFormPage';
import {ServiciosPage} from './pages/ServiciosPage'



function App() {
  return (
    < BrowserRouter>
     <div className="container mx-auto">
     <Navigation />
      <Routes>
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/tasks-create" element={<TasksFormPage />} />
        <Route path="/tasks/:id" element={<TasksFormPage />} />

        <Route path="/" element={<Navigate to="/Afiliacion" />} />
        <Route path="/Afiliacion" element={<AfiliacionPage />} />
        <Route path="/Afiliacion/:id" element={<AfiliacionFormPage />} />
        <Route path="/Afiliacion-create" element={<AfiliacionFormPage />} />
        
        <Route path="/" element={<Navigate to="/Datper" />} />
        <Route path="/Datper" element={<DatperPage />} />
        <Route path="/Datper/:id" element={<DatperFormPage />} />
        <Route path="/Datper-create" element={<DatperFormPage />} />

        <Route path="/" element={<Navigate to="/Identidad" />} />
        <Route path="/Identidad" element={<IdentidadPage />} />
        <Route path="/Identidad/:id" element={<IdentidadFormPage />} />
        <Route path="/Identidad-create" element={<IdentidadFormPage />} />

        <Route path="/" element={<Navigate to="/Vivienda" />} />
        <Route path="/Vivienda" element={<ViviendaPage />} />
        <Route path="/Vivienda/:id" element={<ViviendaFormPage />} />
        <Route path="/Vivienda-create" element={<ViviendaFormPage />} />

        <Route path="/" element={<Navigate to="/Cultivo" />} />
        <Route path="/Cultivo" element={<CultivoPage />} />
        <Route path="/Cultivo/:id" element={<CultivoFormPage />} />
        <Route path="/Cultivo-create" element={<CultivoFormPage />} />       
    
        <Route path="/" element={<Navigate to="/Academico" />} />
        <Route path="/Academico" element={<AcademicoPage />} />
        <Route path="/Academico/:id" element={<AcademicoFormPage />} />
        <Route path="/Academico-create" element={<AcademicoFormPage />} />  
      
        <Route path="/" element={<Navigate to="/Regimen" />} />
        <Route path="/Regimen" element={<RegimenPage />} />
        <Route path="/Regimen/:id" element={<RegimenFormPage />} />
        <Route path="/Regimen-create" element={<RegimenFormPage />} /> 

        <Route path="/" element={<Navigate to="/Basura" />} />
        <Route path="/Basura" element={<BasuraPage />} />
        <Route path="/Basura/:id" element={<BasuraFormPage />} />
        <Route path="/Basura-create" element={<BasuraFormPage />} /> 

        <Route path="/" element={<Navigate to="/Servicios" />} />
        <Route path="/Servicios" element={<ServiciosPage />} />
        <Route path="/Servicios/:id" element={<ServiciosFormPage />} />
        <Route path="/Servicios-create" element={<ServiciosFormPage />} /> 

      </Routes>
      <Toaster />
     </div>
    </BrowserRouter>
  );

}

export default App;