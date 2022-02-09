import "./App.css";
import { useEffect, useState } from "react";
import { Products, Navbar } from "./components";
import { commerce } from "./lib/commerce";

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
    <div className="App">
      <Navbar totalItems={cart.total_items} />
      <Products products={products} handleAddToCart={handleAddToCart} />
    </div>
  );
}

export default App;
