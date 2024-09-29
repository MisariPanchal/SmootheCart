import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import TabView from "./components/TabView";
import UserPage from "./components/UserPage";
import ContentTable from "./components/ContentTable";
import CategoryPage from "./components/CategoryPage";
import { CartProvider } from "./context/CartContext";
import CartPage from "./components/CartPage";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/SmootheCart" element={<TabView />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/product-details" element={<ContentTable />} />
            <Route path="/user-page" element={<UserPage />} />
            <Route path="/category-page" element={<CategoryPage />} />
            <Route path="/cart-page" element={<CartPage />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;

export function ProtectedRoute() {
  const getProducts = JSON.parse(localStorage.getItem("items")) || [];
  const isLoggedIn = getProducts.some((item) => item.isLogin);

  return isLoggedIn ? <Outlet /> : <Navigate to="/SmootheCart" replace={true} />;
}
