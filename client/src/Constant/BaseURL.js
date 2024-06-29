import axios from "axios"

const axiosInstance = axios.create({

    //server api
     baseURL: 'http://hybrid.srishticampus.in:4039/domestic_abuse_api', 
    // baseURL: 'http://localhost:4039/domestic_abuse_api', 

    headers: {
      'Content-Type': 'application/json',
    },
    // baseURL: '', 
  
  //local api 
  
  
    // headers: {
    //   'Content-Type': 'application/json',
    // },

    // url :"http://localhost:4038",
      url:  "http://hybrid.srishticampus.in:4039/"
    
  });
   
  export default axiosInstance