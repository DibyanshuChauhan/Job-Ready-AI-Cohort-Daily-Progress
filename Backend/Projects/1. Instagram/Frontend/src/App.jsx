import { RouterProvider } from "react-router-dom"
import { routes } from "./routes"
import "./features/shared/global.scss"
import { AuthProvider } from "./features/auth/auth.context"

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  )
}

export default App