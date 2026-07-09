/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux";
import { login, register, getMe } from "../service/auth.api";
import { setUser, setLoading, setError, setAuthChecked } from "../auth.slice";

export const useAuth = () => {
    const dispatch = useDispatch();

    const handleRegister = async ({ username, email, password }) => {
        try {
            dispatch(setLoading(true));

    const data = await register({
    username,
    email,
    password,
});
dispatch(setUser(data.user));
return data;
} catch (error) {
    dispatch(setError(error.response?.data?.message || "Registration failed")
    );
    
    throw error;
} finally {
    dispatch(setLoading(false));
}
};
    const handleLogin = async ({email, password}) => {
        try {
            dispatch(setLoading(true));
            const data = await login({email, password});
            dispatch(setUser(data.user));
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Login failed"))
            throw error
        }
        finally {
            dispatch(setLoading(false))
        }
    }

  const handleGetMe = async () => {
  try {
    dispatch(setLoading(true));

    const data = await getMe();

    dispatch(setUser(data.user));
  } catch (error) {
    dispatch(setUser(null));
  } finally {
    dispatch(setLoading(false));
    dispatch(setAuthChecked(true));
  }
};
    return {
        handleRegister,
        handleLogin,
        handleGetMe
    }

}