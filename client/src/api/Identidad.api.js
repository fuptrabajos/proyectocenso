import axios from 'axios'

const IdentidadApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/TblTipIdentidad/',
});

    export const getAllTblTipIdentidad = () => IdentidadApi.get("/");  
    export const getTblTipIdentidad = (id) => IdentidadApi.get(`/${id}/`);
    export const createTblTipIdentidad = (TblTipIdentidad) => IdentidadApi.post("/",TblTipIdentidad);
    export const updateTblTipIdentidad = (id_tipo_identidad, TblTipIdentidad) => IdentidadApi.put(`/${id_tipo_identidad}/`, TblTipIdentidad) 
    export const deleteTblTipIdentidad = (id_tipo_identidad) => IdentidadApi.delete(`/${id_tipo_identidad}/`)
    

    
   