import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Feed from "./features/post/pages/Feed";
import CreatePost from "./features/post/pages/CreatePost";

export const routes = createBrowserRouter([{
    path: "/register",
    element: <Register />,
},
{
    path: "/login",
    element: <Login />,
},
{
    path: "/",
    element: <Feed />
},
{
    path: "/create-post",
    element: <CreatePost />
},
]);