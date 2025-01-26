import axios from 'axios'

const tasksApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/tasks/',
});


    export const getAllTasks = () => tasksApi.get("/");
    
    export const createTask = (tasks) => tasksApi.post("/",tasks);
    export const deleteTask = (id) => tasksApi.delete(`/$(id)`)
  
      