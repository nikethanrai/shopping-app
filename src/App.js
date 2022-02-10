import "./App.css";
import { useEffect, useState } from "react";
import { Products, Navbar, Cart, Checkout } from "./components";
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
  const handleUpdateCart = async (productId, quantity) => {
    const res = await commerce.cart.update(productId, { quantity });
    setCart(res.cart);
  };

  const handleRemoveCart = async (productId) => {
    const res = await commerce.cart.remove(productId);
    setCart(res.cart);
  };
  const handleEmptyCart = async () => {
    const res = await commerce.cart.empty();
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
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                handleUpdateCart={handleUpdateCart}
                handleRemoveCart={handleRemoveCart}
                handleEmptyCart={handleEmptyCart}
              />
            }
          />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
