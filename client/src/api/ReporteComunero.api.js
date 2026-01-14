import axios from 'axios';

const DatPerApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/',
});

// NUEVA API paginada (para este reporte)
export const getTblDatPerPaginated = (params) => 
    DatPerApi.get("TblDatPerPaginated/", { params });

export const exportTblDatPer = (params) => 
    DatPerApi.get("TblDatPerPaginated/export/", { params });

// API ORIGINAL (para otros reportes - mantener sin cambios)
export const getAllTblDatPer = () => 
    DatPerApi.get("TblDatPer/");