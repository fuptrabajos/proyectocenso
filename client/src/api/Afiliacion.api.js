import axios from 'axios'

const AfiliacionApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/TblAfiliacion/',
});

    export const getAllTblAfiliacion = () => AfiliacionApi.get("/");  
    export const getTblAfiliacion = (id) => AfiliacionApi.get(`/${id}/`);
    export const createTblAfiliacion = (TblAfiliacion) => AfiliacionApi.post("/",TblAfiliacion);
    export const updateTblAfiliacion = (id, TblAfiliacion) => AfiliacionApi.put(`/${id}/`,TblAfiliacion) 
    export const deleteTblAfiliacion = (id) => AfiliacionApi.delete(`/${id}/`)
    
