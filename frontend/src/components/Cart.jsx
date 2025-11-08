import { useCart } from '../CartContext';

export default function Cart({ onCheckoutClick }) {
  const { cart, loading, error, updateQty, remove } = useCart();

  if (loading) return <div className="card">Loading cart…</div>;
  if (error) return <div className="card">Error: {error}</div>;

  return (
    <div className="card">
      <div className="space-between">
        <h3>Your Cart</h3>
        <div className="price">Total: ₹{cart.total}</div>
      </div>
      <div className="section">
        {cart.items.length === 0 && <div>No items yet.</div>}
        {cart.items.map(item => (
          <div className="cart-item" key={item.id}>
            <div style={{display:'grid', gap:4}}>
              <div>{item.name}</div>
              <div style={{fontSize:12, color:'#666'}}>₹{item.price} x {item.qty} = ₹{item.subtotal}</div>
            </div>
            <div className="row">
              <input
                className="input"
                type="number"
                min="0"
                value={item.qty}
                onChange={e => updateQty(item.id, e.target.value)}
                style={{ width: 70 }}
              />
              <button className="btn ghost" onClick={() => remove(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <button className="btn primary" disabled={cart.items.length === 0} onClick={onCheckoutClick}>
        Checkout
      </button>
    </div>
  );
}