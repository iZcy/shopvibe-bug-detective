import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    setItems(stored);

    return () => {
      setItems([]);
    };
  }, []);

  const removeItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div>
        <h1>Your Cart</h1>
        <p style={{ marginTop: 20 }}>Your cart is empty.</p>
        <Link to="/"><button style={{ marginTop: 12 }}>Continue Shopping</button></Link>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ marginBottom: 16 }}>Your Cart</h1>
      {items.map((item, i) => (
        <div key={i} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div>
            <strong>{item.name}</strong>
            <p style={{ fontSize: 13, color: '#666' }}>Qty: {item.quantity} × ${item.price}</p>
          </div>
          <button onClick={() => removeItem(i)} style={{ background: '#dc2626' }}>Remove</button>
        </div>
      ))}
      <div style={{ marginTop: 20 }}>
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>
      <Link to="/checkout"><button style={{ marginTop: 12 }}>Proceed to Checkout</button></Link>
    </div>
  );
}
