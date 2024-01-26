import axios from "axios";

const API=axios.create()


const storedUser = JSON.parse(localStorage.getItem('formData'));
const token = storedUser ? storedUser.token : null;


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
export const login = (formdata) => API.post('/User/login', formdata)
//product
export const getAll = (userId) => API.get(`//${userId}`)
export const getById = (id) => API.get(`//${id}`)

export const add = (product) => API.post(`//`,product, {headers: {'Content-Type':'multipart/form-data'}})



