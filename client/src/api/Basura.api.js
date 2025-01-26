import axios from 'axios'

const BasuraApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/TblDisBasuras/',
});

    export const getAllTblDisBasuras = () => BasuraApi.get("/");  
    export const getTblDisBasuras = (id) => BasuraApi.get(`/${id}/`);
    export const createTblDisBasuras = (TblDisBasuras) => BasuraApi.post("/",TblDisBasuras);
    export const updateTblDisBasuras = (id_dis_basuras, TblDisBasuras) => BasuraApi.put(`/${id_dis_basuras}/`, TblDisBasuras) 
    export const deleteTblDisBasuras = (id_dis_basuras) => BasuraApi.delete(`/${id_dis_basuras}/`)
 