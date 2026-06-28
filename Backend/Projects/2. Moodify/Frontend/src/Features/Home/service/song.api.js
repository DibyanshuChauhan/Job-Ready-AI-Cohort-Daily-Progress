import axios from "axios";

const api = axios.create({
    baseURL: "https://job-ready-ai-cohort-daily-progress-2.onrender.com/api/songs",
    withCredentials: true
})

export const getSong = async ({ mood }) => {
    const response = await api.get("?mood=" + mood )
    return response.data
}