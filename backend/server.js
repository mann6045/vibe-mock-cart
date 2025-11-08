import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Database from 'better-sqlite3';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5050;

// DB setup
const db = new Database('data.db');
db.exec(`
  CREATE TABLE IF NOT EXISTS cart_items (
    product_id TEXT PRIMARY KEY,
    qty INTEGER NOT NULL
  );
`);

const products = [
  { id: 'p1', name: 'Vibe Tee', price: 499 },
  { id: 'p2', name: 'Vibe Hoodie', price: 1499 },
  { id: 'p3', name: 'Vibe Cap', price: 299 },
  { id: 'p4', name: 'Vibe Mug', price: 249 },
  { id: 'p5', name: 'Vibe Bottle', price: 699 },
  { id: 'p6', name: 'Vibe Stickers (Pack)', price: 199 },
  { id: 'p7', name: 'Vibe Tote', price: 399 },
  { id: 'p8', name: 'Vibe Socks', price: 349 }
];

const stmtGetAll = db.prepare('SELECT product_id AS id, qty FROM cart_items');
const stmtGetOne = db.prepare('SELECT product_id AS id, qty FROM cart_items WHERE product_id=?');
const stmtUpsert = db.prepare('INSERT INTO cart_items(product_id, qty) VALUES (?, ?) ON CONFLICT(product_id) DO UPDATE SET qty=excluded.qty');
const stmtDelete = db.prepare('DELETE FROM cart_items WHERE product_id=?');
const stmtClear = db.prepare('DELETE FROM cart_items');

function buildCartResponse() {
  const rows = stmtGetAll.all();
  const items = [];
  let total = 0;
  rows.forEach(r => {
    const product = products.find(p => p.id === r.id);
    if (!product) return;
    const subtotal = product.price * r.qty;
    total += subtotal;
    items.push({ id: product.id, name: product.name, price: product.price, qty: r.qty, subtotal });
  });
  return { items, total };
}

app.get('/api/products', (req, res) => res.json(products));
app.get('/api/cart', (req, res) => res.json(buildCartResponse()));

app.post('/api/cart', (req, res) => {
  const { productId, qty } = req.body || {};
  const product = products.find(p => p.id === productId);
  if (!product) return res.status(400).json({ error: 'Invalid productId' });
  const q = Number(qty);
  if (Number.isNaN(q)) return res.status(400).json({ error: 'qty must be a number' });
  if (q <= 0) {
    stmtDelete.run(productId);
  } else {
    stmtUpsert.run(productId, q);
  }
  res.json(buildCartResponse());
});

app.delete('/api/cart/:id', (req, res) => {
  const { id } = req.params;
  if (!products.find(p => p.id === id)) return res.status(400).json({ error: 'Invalid productId' });
  stmtDelete.run(id);
  res.json(buildCartResponse());
});

app.post('/api/checkout', (req, res) => {
  const { name, email } = req.body || {};
  const { items, total } = buildCartResponse();
  const receipt = {
    orderId: 'ORD-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
    name: name || 'Guest',
    email: email || 'guest@example.com',
    items,
    total,
    timestamp: new Date().toISOString()
  };
  stmtClear.run();
  res.json(receipt);
});

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));