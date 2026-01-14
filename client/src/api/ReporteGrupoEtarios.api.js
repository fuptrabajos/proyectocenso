import axios from 'axios'

const GrupoEtariosApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/TblDatPer/',
});

export const getAllTblDatPer = () => GrupoEtariosApi.get("/");