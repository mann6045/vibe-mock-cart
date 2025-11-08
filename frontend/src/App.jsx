import { useState } from 'react';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import { CartProvider } from './CartContext';
import './index.css';

export default function App() {
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <CartProvider>
      <div className="container">
        <header className="header">
          <h2>Vibe Commerce — Mock Cart</h2>
          <a href="https://github.com/" target="_blank" rel="noreferrer" style={{textDecoration:'none'}}>GitHub</a>
        </header>

        <section className="section">
          <h3>Products</h3>
          <ProductGrid />
        </section>

        <section className="section">
          <Cart onCheckoutClick={() => setShowCheckout(true)} />
        </section>

        <footer className="footer">Responsive • Mock checkout • No real payments</footer>
      </div>

      {showCheckout && <CheckoutModal onClose={() => window.location.reload()} />}
    </CartProvider>
  );
}