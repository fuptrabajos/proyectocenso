import axios from 'axios'

const CultivoApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/TblTiposCultivo/',
});

    export const getAllTblTiposCultivo = () => CultivoApi.get("/");  
    export const getTblTiposCultivo = (id) => CultivoApi.get(`/${id}/`);
    export const createTblTiposCultivo = (TblTiposCultivo) => CultivoApi.post("/",TblTiposCultivo);
    export const updateTblTiposCultivo = (id_tip_cultivo, TblTiposCultivo) => CultivoApi.put(`/${id_tip_cultivo}/`,TblTiposCultivo) 
    export const deleteTblTiposCultivo = (id_tip_cultivo) => CultivoApi.delete(`/${id_tip_cultivo}/`)
    
