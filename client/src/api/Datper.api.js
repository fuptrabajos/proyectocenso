import axios from 'axios'

const DatPerApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/TblDatPer/',
});

    export const getAllTblDatPer = () => DatPerApi.get("/");  
    export const getTblDatPer = (id) => DatPerApi.get(`/${id}/`);
    export const createTblDatPer = (TblDatPer) => DatPerApi.post("/",TblDatPer);
    export const updateTblDatPer = (id_paciente, TblDatPer) => DatPerApi.put(`/${id_paciente}/`, TblDatPer) 
    export const deleteTblDatPer = (id_paciente) => DatPerApi.delete(`/${id_paciente}/`)
    

    
   
    