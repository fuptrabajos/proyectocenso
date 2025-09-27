

import axios from "axios";

const AfiliacionApi = axios.create({
  baseURL: "http://localhost:8000/tasks/api/v1/",
});

export const getAllTblDatPer = () => AfiliacionApi.get("TblDatPer/");
