import axios from "axios";

const API=axios.create({baseURL:'http://192.168.1.106:8083/api/v2'})


const token = JSON.parse(localStorage.getItem('token'));


API.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
    
  }
);

//user
export const signUp = (user) => API.post('/Auth/SignUp', user)
export const login = (user) => API.post('/Auth/Login', user)

//text
export const getAllText = () => API.get('/Text')
export const getTextById = (id) => API.get(`/Text/${id}`)

//rapor
export const getAllReport = () => API.get('/Quiz')
export const getReportById = (id) => API.get(`/Quiz/${id}`)
export const createReport = (formData) => API.post(`/Quiz`,formData, {headers: {'Content-Type':'multipart/form-data'}})





