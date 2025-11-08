export async function fetchProducts() {
    const res = await fetch('/api/products');
    if (!res.ok) throw new Error('Failed to load products');
    return res.json();
  }
  
  export async function fetchCart() {
    const res = await fetch('/api/cart');
    if (!res.ok) throw new Error('Failed to load cart');
    return res.json();
  }
  
  export async function addOrUpdateCart(productId, qty) {
    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, qty })
    });
    if (!res.ok) throw new Error('Failed to update cart');
    return res.json();
  }
  
  export async function removeFromCart(productId) {
    const res = await fetch(`/api/cart/${productId}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to remove item');
    return res.json();
  }
  
  export async function checkout(payload) {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Checkout failed');
    return res.json();
  }