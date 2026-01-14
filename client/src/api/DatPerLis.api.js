import axios from 'axios'

const DatPerListApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/TblDatPerList/',
});



    export const getAllTblDatPer = () => DatPerListApi.get("/");  
    export const getTblDatPer = (id) => DatPerListApi.get(`/${id}/`);
    export const createTblDatPer = (TblDatPer) => DatPerListApi.post("/",TblDatPer);
    export const updateTblDatPer = (id_paciente, TblDatPer) => DatPerListApi.put(`/${id_paciente}/`, TblDatPer) 
    export const deleteTblDatPer = (id_paciente) => DatPerListApi.delete(`/${id_paciente}/`)
    

    