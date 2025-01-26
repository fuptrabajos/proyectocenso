import axios from 'axios'

const AcademicoApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/TblNivelAcademico/',
});

    export const getAllTblNivelAcademico = () => AcademicoApi.get("/");  
    export const getTblNivelAcademico = (id) => AcademicoApi.get(`/${id}/`);
    export const createTblNivelAcademico = (TblNivelAcademico) => AcademicoApi.post("/",TblNivelAcademico);
    export const updateTblNivelAcademico = (id_nivel_acad, TblNivelAcademico) => AcademicoApi.put(`/${id_nivel_acad}/`, TblNivelAcademico) 
    export const deleteTblNivelAcademico = (id_nivel_acad) => AcademicoApi.delete(`/${id_nivel_acad}/`)
    

   