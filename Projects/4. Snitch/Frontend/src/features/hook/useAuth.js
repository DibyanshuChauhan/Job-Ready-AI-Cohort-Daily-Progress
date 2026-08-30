import { setUser, setLoading, setError } from "../auth/state/auth.slice.js";
import { Register } from "../service/auth.api.js";
import { useDispatch } from "react-redux";

export const useAuth = () => {

    const dispatch = useDispatch();
    
    const handleRegister = async ({ email, contact, password, fullname, isSeller = false}) => {
        const data = await Register({ 
            email, 
            contact, 
            password, 
            fullname, 
            isSeller 
        })
        
        dispatch(setUser(data.user))
    }

    return { handleRegister }
}