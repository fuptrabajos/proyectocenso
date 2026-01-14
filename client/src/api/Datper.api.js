import axios from 'axios'

// API para operaciones CRUD completas (editar, eliminar, obtener uno, reportes)
const DatPerApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/TblDatPer/',
});

// API para listado limitado con búsqueda
const DatPerListApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/TblDatPerList/',
});

// Obtener comuneros con límite de 5 o buscar por múltiples campos
export const getAllTblDatPer = (searchParams = {}) => {
    const params = new URLSearchParams();
    
    if (searchParams.identificacion) {
        params.append('identificacion', searchParams.identificacion);
    }
    if (searchParams.nombre) {
        params.append('nombre', searchParams.nombre);
    }
    if (searchParams.apellido) {
        params.append('apellido', searchParams.apellido);
    }
    if (searchParams.search) {
        params.append('search', searchParams.search);
    }
    
    const queryString = params.toString();
    return DatPerListApi.get(`/${queryString ? `?${queryString}` : ''}`);
};

// Buscar por cédula específicamente (mantener compatibilidad)
export const searchTblDatPerByCedula = (identificacion) => {
    return DatPerListApi.get(`/?identificacion=${identificacion}`);
};

// Buscar por nombre
export const searchTblDatPerByNombre = (nombre) => {
    return DatPerListApi.get(`/?nombre=${nombre}`);
};

// Buscar por apellido
export const searchTblDatPerByApellido = (apellido) => {
    return DatPerListApi.get(`/?apellido=${apellido}`);
};

// Búsqueda general (en todos los campos)
export const searchTblDatPerGeneral = (searchTerm) => {
    return DatPerListApi.get(`/?search=${searchTerm}`);
};

// Operaciones CRUD completas (usar la API original)
export const getTblDatPer = (id) => DatPerApi.get(`/${id}/`);
export const createTblDatPer = (TblDatPer) => DatPerApi.post("/", TblDatPer);
export const updateTblDatPer = (id_paciente, TblDatPer) => DatPerApi.put(`/${id_paciente}/`, TblDatPer);
export const deleteTblDatPer = (id_paciente) => DatPerApi.delete(`/${id_paciente}/`);

// Para otros reportes que necesiten TODOS los datos
export const getAllTblDatPerComplete = () => DatPerApi.get("/");