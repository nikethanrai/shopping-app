import "./App.css";
import { useEffect, useState } from "react";
import { Products, Navbar, Cart, Checkout } from "./components";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

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

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };
  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
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
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                order={order}
                onCaptureCheckout={handleCaptureCheckout}
                error={errorMessage}
                refreshCart={refreshCart}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
