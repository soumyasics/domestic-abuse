import axios from "axios";

const axiosMultipartInstance = axios.create({

   baseURL: "http://hybrid.srishticampus.in/domestic_abuse_api/",

  //baseURL:  "http://localhost:4039/domestic_abuse_api",

  headers: {
    "Content-Type": "multipart/form-data", 
  },
});

export default axiosMultipartInstance;