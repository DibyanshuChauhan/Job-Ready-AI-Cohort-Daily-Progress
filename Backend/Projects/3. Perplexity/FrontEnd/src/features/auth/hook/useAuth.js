/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux";
import { login, register, getMe, logout } from "../service/auth.api";
import { setUser, setLoading, setError, setAuthChecked, logoutSuccess } from "../auth.slice";

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

const handleLogout = async () => {
    try {
      // 1. Fire API request to backend to destroy the HttpOnly token cookie
      await logout();
      
      // 2. Clear browser session persistence storage locks
      localStorage.removeItem("active_chat_id");
      
      // 3. Wipe the Redux state profile
      dispatch(logoutSuccess());
      
      // 4. Cleanly force redirect the browser viewport back to login route
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout runtime sequence execution failure:", error);
    }
  };

    return {
        handleRegister,
        handleLogin,
        handleGetMe,
        handleLogout,
    }

}