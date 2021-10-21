import { API_URL } from "./constants"
import axios from "axios"

var axiosInstance = axios.create({
    baseURL: API_URL,
})

export default axiosInstance
