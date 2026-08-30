import {createBrowserRouter} from "react-router";
import Register from "../features/auth/pages/Register";

export const router = createBrowserRouter([
    {
        path: "/register",
        element: <Register />
    }
])