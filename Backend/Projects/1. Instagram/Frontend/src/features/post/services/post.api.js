import axios from "axios"

const api = axios.create({
    baseURL: "https://job-ready-ai-cohort-daily-progress-2.onrender.com",
    withCredentials: true
})

export const getFeed = async () => {
    const response = await api.get("/feed")
    return response.data
}

export const createPost = async (imageFile, caption) => {
    const formData = new FormData()
    formData.append("image", imageFile)
    formData.append("caption", caption)

    const response = await api.post("/", formData)
    return response.data
}

export const likePost = async (postId) => {
    const response = await api.post("/like/" + postId)
    return response.data
}

export const unLikePost = async (postId) => {
    const response = await api.post("/unlike/" + postId)
    return response.data
}