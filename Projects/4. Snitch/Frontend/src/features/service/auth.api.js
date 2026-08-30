import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true,
})

export const Register = async ({ email, contact, password, fullname, isSeller }) => {
    try {
        const response = await api.post("/register", {
            email,
            contact,
            password,
            fullname,
            isSeller
        })
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const Login = async ({ email, password }) => {
    try {
        const response = await api.post("/login", {
            email,
            password
        })
        return response.data;
    } catch (error) {
        console.log(error);
    }
}