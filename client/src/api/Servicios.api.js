import axios from 'axios'

const ServiciosApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/TblTiposServiPubli/',
});

    export const getAllTblTiposServiPubli = () => ServiciosApi.get("/");  
    export const getTblTiposServiPubli = (id) => ServiciosApi.get(`/${id}/`);
    export const createTblTiposServiPubli = (TblTiposServiPubli) => ServiciosApi.post("/",TblTiposServiPubli);
    export const updateTblTiposServiPubli = (id_tip_ser_publi, TblTiposServiPubli) => ServiciosApi.put(`/${id_tip_ser_publi}/`, TblTiposServiPubli) 
    export const deleteTblTiposServiPubli = (id_tip_ser_publi) => ServiciosApi.delete(`/${id_tip_ser_publi}/`)
    
