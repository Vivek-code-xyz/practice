import axios from "axios";


const axiosClient = axios.create({
    baseURL:"http://localhost:5050",
    withCredentials:true,
    headers:{
        'Content-Type' : 'application/json'
    }
})

export default axiosClient