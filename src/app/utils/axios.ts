import axios from "axios"
console.log(process.env.API_ENDPOINT);

export default axios.create({
    baseURL: process.env.API_ENDPOINT,
    headers: { "Content-Type": "application/json" }
})

export const axiosAuth = axios.create({
    baseURL: process.env.API_ENDPOINT
})
