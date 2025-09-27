import axios from 'axios';

const DatPerApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/TblDatPer/',
});

// Traer todos los comuneros
export const getAllTblDatPer = () => DatPerApi.get("/");
