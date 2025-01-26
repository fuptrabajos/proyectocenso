import axios from 'axios'

const ViviendaApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/TblTiposDeVivienda/',
});

    export const getAllTblTiposDeVivienda = () => ViviendaApi.get("/");  
    export const getTblTiposDeVivienda = (id) => ViviendaApi.get(`/${id}/`);
    export const createTblTiposDeVivienda = (TblTiposDeVivienda) => ViviendaApi.post("/",TblTiposDeVivienda);
    export const updateTblTiposDeVivienda = (id_tip_vivienda, TblTiposDeVivienda) => ViviendaApi.put(`/${id_tip_vivienda}/`, TblTiposDeVivienda) 
    export const deleteTblTiposDeVivienda = (id_tip_vivienda) => ViviendaApi.delete(`/${id_tip_vivienda}/`)
    

     