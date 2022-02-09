import "./App.css";
import { useEffect, useState } from "react";
import { Products, Navbar, Cart } from "./components";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };
  const fetchCart = async () => {
    const response = await commerce.cart.retrieve();
    setCart(response);
  };
  const handleAddToCart = async (productId, quantity) => {
    const res = await commerce.cart.add(productId, quantity);
    setCart(res.cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  console.log(cart);
  return (
    <Router>
      <div className="App">
        <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route
            path="/"
            element={
              <Products products={products} handleAddToCart={handleAddToCart} />
            }
          />
          <Route path="/cart" element={<Cart cart={cart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
