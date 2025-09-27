import axios from 'axios'

const AfiliacionApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/',
});

    // export const getAllTblAfiliacion = () => AfiliacionApi.get("/");  
   
   
// Obtener todas las afiliaciones disponibles
export const getAllTblAfiliacion = () => AfiliacionApi.get("TblAfiliacion/");  

// Obtener todos los datos de personas para hacer el conteo en frontend
export const getAllTblDatPer = () => AfiliacionApi.get("TblDatPer/");