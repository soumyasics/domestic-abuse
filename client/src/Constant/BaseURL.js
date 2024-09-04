import axios from "axios"

const axiosInstance = axios.create({

    //server api
<<<<<<< HEAD
    // baseURL: 'http://hybrid.srishticampus.in:4039/domestic_abuse_api', 
     baseURL: 'http://localhost:4039/domestic_abuse_api', 
=======
    //baseURL: 'http://hybrid.srishticampus.in:4039/domestic_abuse_api', 
      baseURL: 'http://localhost:4039/domestic_abuse_api', 
>>>>>>> a74f5e5d60ad3748c2d01ebdd0a547996be9994f

    headers: {
      'Content-Type': 'application/json',
    },
    // baseURL: '', 
  
  //local api 
  
  
    // headers: {
    //   'Content-Type': 'application/json',
    // },

<<<<<<< HEAD
     url :"http://localhost:4038",
    //  url:  "http://hybrid.srishticampus.in:4039/"
=======
      url :"http://localhost:4038",
    // url:  "http://hybrid.srishticampus.in:4039/"
>>>>>>> a74f5e5d60ad3748c2d01ebdd0a547996be9994f
    // 
  });
   
  export default axiosInstance