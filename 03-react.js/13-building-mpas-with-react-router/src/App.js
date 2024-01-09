import { Navigate, Route, Routes } from "react-router-dom";

import MainHeader from "./components/MainHeader";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <div>
      <MainHeader />
      <main>
        <Routes>
          <Route path={"/"} element={<Navigate to={"/welcome"} />} />
          <Route path={"/welcome/*"} element={<Welcome />}>
            <Route path="new-user" element={<p>Welcome, new user!</p>} />
          </Route>
          <Route path={"/products"} element={<Products />} />
          <Route path={"/products/:productId"} element={<ProductDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

// our-domain.com/welcome => welcome component
// our-domain.com/products => products component
// our-domain.com/product-details/<any value> => product-details component (dynamic segment)
