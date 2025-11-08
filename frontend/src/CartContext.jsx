import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { fetchCart, addOrUpdateCart, removeFromCart } from './api';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchCart();
      setCart(data);
      setError('');
    } catch (e) {
      setError(e.message || 'Error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const add = async (productId) => {
    const existing = cart.items.find(i => i.id === productId);
    const newQty = (existing?.qty || 0) + 1;
    const data = await addOrUpdateCart(productId, newQty);
    setCart(data);
  };

  const updateQty = async (productId, qty) => {
    const n = Number(qty);
    const data = await addOrUpdateCart(productId, n);
    setCart(data);
  };

  const remove = async (productId) => {
    const data = await removeFromCart(productId);
    setCart(data);
  };

  return (
    <CartContext.Provider value={{ cart, loading, error, refresh, add, updateQty, remove }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}