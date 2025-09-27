
import axios from 'axios'

const DatPerApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/TblDatPer/',
});

    export const getAllTblDatPer = () => DatPerApi.get("/"); 


