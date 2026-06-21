import { RouterProvider } from "react-router-dom"
import { routes } from "./routes"
import "./style.scss"

const App = () => {
  return (
    <RouterProvider router={routes} />
  )
}

export default App