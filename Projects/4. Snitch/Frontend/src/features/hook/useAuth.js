import { setUser, setLoading, setError } from "../auth/state/auth.slice.js";
import { Register, Login } from "../service/auth.api.js";
import { useDispatch } from "react-redux";

export const useAuth = () => {
    const dispatch = useDispatch();

    const handleRegister = async ({ email, contact, password, fullname, isSeller = false }) => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const data = await Register({
                email,
                contact,
                password,
                fullname,
                isSeller
            });

            if (data && data.user) {
                dispatch(setUser(data.user));
                return { success: true, user: data.user };
            } else {
                const errMsg = data?.message || "Registration failed. Please check your credentials.";
                dispatch(setError(errMsg));
                return { success: false, error: errMsg };
            }
        } catch (error) {
            const errMsg = error.response?.data?.message || error.message || "An unexpected error occurred.";
            dispatch(setError(errMsg));
            return { success: false, error: errMsg };
        } finally {
            dispatch(setLoading(false));
        }
    }

    const handleLogin = async ({ email, password }) => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const data = await Login({ email, password });

            if (data && data.user) {
                dispatch(setUser(data.user));
                return { success: true, user: data.user };
            } else {
                const errMsg = data?.message || "Registration failed. Please check your credentials.";
                dispatch(setError(errMsg));
                return { success: false, error: errMsg };
            }
        } catch (error) {
            const errMsg = error.response?.data?.message || error.message || "An unexpected error occurred.";
            dispatch(setError(errMsg));
            return { success: false, error: errMsg };
        } finally {
            dispatch(setLoading(false));
        }
    }

    return { handleRegister, handleLogin }
}
