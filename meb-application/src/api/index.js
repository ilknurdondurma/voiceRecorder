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

export const add = (product) => API.post(`//`,product, {headers: {'Content-Type':'multipart/form-data'}})



