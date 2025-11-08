# 🛍️ Vibe Commerce — Mock E-Com Cart

A simple full-stack shopping cart application built for **Vibe Commerce** screening.  
It demonstrates core e-commerce flows — product listing, cart management, and a mock checkout — using a modern web stack.

---

## 🚀 Features

✅ Product grid with mock items (id, name, price)  
✅ Add / Remove / Update quantities in cart  
✅ Auto-calculated subtotal and total  
✅ Checkout form (name + email) with mock receipt  
✅ Responsive layout (mobile-friendly)  
✅ Backend REST API integration  
✅ Optional SQLite persistence  
✅ Error handling and clean UI  

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React (Vite), Fetch API, CSS |
| **Backend** | Node.js, Express.js, CORS, dotenv |
| **Database** | In-memory (default) or SQLite (optional) |
| **Version Control** | Git & GitHub |

---

## 📂 Project Structure

vibe-mock-cart/
│
├── backend/                # Express + Node.js API
│   ├── server.js           # Main server file
│   ├── package.json
│   └── .env (optional)
│
├── frontend/               # React (Vite) app
│   ├── src/
│   │   ├── components/     # UI components (Cart, ProductGrid, CheckoutModal)
│   │   ├── CartContext.jsx # Global cart context
│   │   ├── api.js          # API helper functions
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│ 
└── .gitignore

---

## ⚙️ Setup Instructions

### 🖥️ Prerequisites
- Node.js (v18+ recommended)
- npm (v9+)
- Git

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/vibe-mock-cart.git
cd vibe-mock-cart

Backend Setup

cd backend
npm install
npm run dev

Frontend Setup

cd Frontend
npm install
npm run dev

🗄️ Optional: Enable SQLite Persistence

If you want the cart data to survive server restarts:
	1.	Install SQLite dependency (already done if you followed earlier):

cd backend
npm install better-sqlite3

	2.	Replace your current server.js with the SQLite version (provided in the docs).
	3.	A file named data.db will be created in /backend.
⸻
🧠 How It Works
	1.	Frontend: React app displays mock products and lets users manage the cart.
	2.	Backend: Express REST API stores cart data (in memory or DB) and computes totals.
	3.	Checkout: When the user submits the form, backend returns a mock receipt object.
	4.	Cart Reset: The cart clears automatically after checkout.

⸻

🧪 Test Checklist
	•	Products load correctly
	•	Add product → cart updates
	•	Change quantity → subtotal & total update
	•	Set quantity = 0 → item removed
	•	Checkout form works and shows receipt
	•	Responsive layout verified

📸 Screenshots
<img width="1710" height="990" alt="Screenshot 2025-11-08 at 2 28 46 PM" src="https://github.com/user-attachments/assets/893ad51a-1c52-432c-8085-453a46400c97" />
<img width="1710" height="992" alt="Screenshot 2025-11-08 at 2 29 44 PM" src="https://github.com/user-attachments/assets/571ee20a-7661-4421-8261-4fb98c7461ed" />

🤝 Contributing

Pull requests are welcome!
If you’d like to extend functionality (e.g., add users, authentication, product images, or payment gateway), open an issue or PR.

⸻

🧑‍💻 Author

PATEL MANKUMAR
Full-Stack Developer
📧 mp0668693gmail.com￼

🪪 License

This project is open-source and available under the MIT License.

⸻

