import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Deals from "./pages/Deals";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Layout from "./pages/Layout";

const allRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "categories",
        element: <Categories />,
        children: [
          {
            path: "men",
            element: <Men />
          },
          {
            path: "women",
            element: <Women />
          }
        ]
      },
      {
        path: "deals",
        element: <Deals />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "products",
        element: <Products />,
        children: [
          {
            path: "product-details",
            element: <ProductDetails />
          }
        ]
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

function App() {
  return <RouterProvider router={allRoutes} />;
}

export default App;