import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkout } from '../api/client';

export default function Checkout() {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    checkout(cart, { address })
      .then((order) => {
        localStorage.removeItem('cart');
        navigate('/');
      })
      .catch(() => {});

    setSubmitting(false);
  };

  return (
    <div>
      <h1 style={{ marginBottom: 16 }}>Checkout</h1>
      <form onSubmit={handleSubmit} className="card" style={{ maxWidth: 500 }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>Shipping Address</label>
          <textarea
            value={address}
            onChange={e => setAddress(e.target.value)}
            rows={3}
            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ddd' }}
            required
          />
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}
