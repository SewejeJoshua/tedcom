import axios from "axios";


const API =
  import.meta.env.VITE_TEDCOM_API ||
  "https://tedcom-backend-system.onrender.com";



const api = axios.create({

  baseURL: API,

});




// Attach token automatically

api.interceptors.request.use(

  (config) => {


    const token =
      localStorage.getItem("access") ||
      sessionStorage.getItem("access");



    if(token){

      config.headers.Authorization =
        `Bearer ${token}`;

    }


    return config;

  },


  (error)=>{

    return Promise.reject(error);

  }

);








// Handle expired token globally

api.interceptors.response.use(


  (response)=>response,


  (error)=>{


    if(error.response?.status === 401){



      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");



      sessionStorage.removeItem("access");
      sessionStorage.removeItem("refresh");
      sessionStorage.removeItem("user");



      window.location.href =
        "/auth/login";


    }



    return Promise.reject(error);

  }

);




export default api;