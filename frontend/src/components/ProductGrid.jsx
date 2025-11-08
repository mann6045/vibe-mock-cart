import { useEffect, useState } from 'react';
import { fetchProducts } from '../api';
import { useCart } from '../CartContext';

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const { add } = useCart();

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (e) {
        setErr(e.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="card">Loading products…</div>;
  if (err) return <div className="card">Error: {err}</div>;

  return (
    <div className="grid">
      {products.map(p => (
        <div className="card" key={p.id}>
          <div className="space-between">
            <h3>{p.name}</h3>
            <div className="price">₹{p.price}</div>
          </div>
          <div className="row" style={{justifyContent:'space-between', marginTop: 12}}>
            <button className="btn primary" onClick={() => add(p.id)}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
}