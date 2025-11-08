import { useState } from 'react';
import { checkout } from '../api';

export default function CheckoutModal({ onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const data = await checkout({ name, email });
      setReceipt(data);
    } catch (e) {
      setError(e.message || 'Checkout failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        {!receipt ? (
          <>
            <h3>Checkout</h3>
            <form onSubmit={submit} className="section" style={{display:'grid', gap:12}}>
              <input className="input" placeholder="Your Name" value={name} onChange={e=>setName(e.target.value)} required />
              <input className="input" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
              {error && <div style={{color:'crimson'}}>{error}</div>}
              <button className="btn primary" disabled={busy}>{busy ? 'Processing…' : 'Pay (Mock)'}</button>
            </form>
          </>
        ) : (
          <>
            <h3>Receipt</h3>
            <div className="section" style={{display:'grid', gap:8}}>
              <div>Order ID: <b>{receipt.orderId}</b></div>
              <div>Name: {receipt.name}</div>
              <div>Email: {receipt.email}</div>
              <div>When: {new Date(receipt.timestamp).toLocaleString()}</div>
              <div className="card" style={{padding:12}}>
                {receipt.items.length === 0 ? 'No items (cart cleared).' : receipt.items.map(i => (
                  <div key={i.id} className="space-between" style={{padding:'4px 0'}}>
                    <div>{i.name} x {i.qty}</div>
                    <div>₹{i.subtotal}</div>
                  </div>
                ))}
                <div className="space-between" style={{marginTop:8, borderTop:'1px solid #eee', paddingTop:8}}>
                  <div>Total</div><div className="price">₹{receipt.total}</div>
                </div>
              </div>
            </div>
            <div className="row" style={{justifyContent:'flex-end', marginTop:12}}>
              <button className="btn primary" onClick={onClose}>Close</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}