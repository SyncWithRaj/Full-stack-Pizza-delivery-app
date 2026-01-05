import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await API.get("/cart");
        setCart(res.data.data || []);
      } catch (err) {
        console.error("Failed to load cart", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const addToCart = async (pizza, quantity = 1) => {
    try {
      const res = await API.post("/cart/add", {
        pizzaId: pizza._id,
        quantity,
      });
      setCart(res.data.data);
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };


  const removeFromCart = async (pizzaId) => {
    try {
      const res = await API.post("/cart/remove", { pizzaId });
      setCart(res.data.data);
    } catch (err) {
      console.error("Remove from cart failed", err);
    }
  };

  const clearCart = async () => {
    try {
      await API.delete("/cart/clear");
      setCart([]);
    } catch (err) {
      console.error("Failed to clear cart", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
