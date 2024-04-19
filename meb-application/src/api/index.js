import axios from "axios";

const API=axios.create({baseURL:''})

// const token = JSON.parse(localStorage.getItem('token'));


// API.interceptors.request.use(
//   (config) => {
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
    
//   }
// );
//tts
export const TTS = (data) => API.post('/Quiz/TTS', data)

//user
export const signUp = (user) => API.post('/Auth/SignUp', user)
export const login = (user) => API.post('/Auth/Login', user)

//text
export const getAllText = () => API.get('/Text')
export const getTextById = (id) => API.get(`/Text/${id}`)

//rapor
export const getAllStandartReport = () => API.get('/Quiz/Standart/GetAll')
export const getAllCEFRReport = () => API.get('/Quiz/CEFR/GetAll')
export const getStandartReportById = (id) => API.get(`/Quiz/Standart/${id}`)
export const getCEFRReportById = (id) => API.get(`/Quiz/CEFR/${id}`)

export const createStandartReport = (formData) => API.post(`/Quiz/Standart`,formData, {headers: {'Content-Type':'multipart/form-data'}})
export const createStartCEFRReport = (formData) => API.post(`/Quiz/CEFR`,formData)
export const createAttempt = (formData) => API.post(`/Quiz/CEFR/AddAttempt`,formData, {headers: {'Content-Type':'multipart/form-data'}})






