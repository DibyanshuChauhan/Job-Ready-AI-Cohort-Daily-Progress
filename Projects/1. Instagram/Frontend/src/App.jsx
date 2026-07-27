import { RouterProvider } from "react-router-dom"
import { routes } from "./routes"
import "./features/shared/global.scss"
import { AuthProvider } from "./features/auth/auth.context"
import { PostContextProvider } from "./features/post/post.context"

const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <RouterProvider router={routes} />
      </PostContextProvider>
    </AuthProvider>
  )
}

export default App