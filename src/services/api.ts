import axios from "axios";


const api = axios.create({

  baseURL:
    "https://tedcom-backend-system.onrender.com/api",

});




// Attach token automatically

api.interceptors.request.use(

  (config)=>{


    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");



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








// Handle expired tokens

api.interceptors.response.use(


  (response)=>{


    return response;


  },



  (error)=>{


    if(error.response?.status === 401){


      localStorage.removeItem("token");

      sessionStorage.removeItem("token");


      localStorage.removeItem("user");

      sessionStorage.removeItem("user");



      window.location.href =
        "/auth/login";


    }



    return Promise.reject(error);


  }


);



export default api;