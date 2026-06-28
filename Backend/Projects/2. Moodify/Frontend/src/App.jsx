import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes";
import "./Features/shared/styles/global.scss";
import { AuthProvider } from "./Features/auth/auth.context";

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
