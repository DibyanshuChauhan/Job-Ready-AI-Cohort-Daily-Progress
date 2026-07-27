import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes";
import "./Features/shared/styles/global.scss";
import { AuthProvider } from "./Features/auth/auth.context";
import { SongContextProvider } from "./Features/Home/song.context";

const App = () => {
  return (
    <AuthProvider>
      <SongContextProvider>
        <RouterProvider router={router} />
      </SongContextProvider>
    </AuthProvider>
  );
};

export default App;
