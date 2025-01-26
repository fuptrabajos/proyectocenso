import axios from 'axios'

const RegimenApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/TblRegimen/',
});

    export const getAllTblRegimen = () => RegimenApi.get("/");  
    export const getTblRegimen = (id) => RegimenApi.get(`/${id}/`);
    export const createTblRegimen = (TblRegimen) => RegimenApi.post("/",TblRegimen);
    export const updateTblRegimen = (id_regimen, TblRegimen) => RegimenApi.put(`/${id_regimen}/`, TblRegimen) 
    export const deleteTblRegimen = (id_regimen) => RegimenApi.delete(`/${id_regimen}/`)
    
