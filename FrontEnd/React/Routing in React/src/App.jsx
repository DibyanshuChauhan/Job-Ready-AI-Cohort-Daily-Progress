import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Deals from "./pages/Deals";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="pt-2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          {/* Dynamic Route */}
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;