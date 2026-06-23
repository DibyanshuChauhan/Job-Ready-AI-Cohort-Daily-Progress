import axios from "axios"

const api = axios.create({
    baseURL: "https://job-ready-ai-cohort-daily-progress-2.onrender.com",
    withCredentials: true,
})

export const login = async (username, password) => {
    const response = await api.post("/login", {
        username, password
    })
    return response.data
}

export const register = async (username, email, password) => {
    const response = await api.post("/register", {
        username, email, password
    })
    return response.data
}