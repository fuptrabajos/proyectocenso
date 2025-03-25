import axios from 'axios'

const SexoApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/TblSexo/',
});

    export const getAllTblSexo = () => SexoApi.get("/");  
    export const getTblSexo = (id) => SexoApi.get(`/${id}/`);
    export const createTblSexo = (TblSexo) => SexoApi.post("/",TblSexo);
    export const updateTblSexo = (id_sexo, TblSexo) => SexoApi.put(`/${id_sexo}/`, TblSexo) 
    export const deleteTblSexo = (id_sexo) => SexoApi.delete(`/${id_sexo}/`)
    
