import { trackAddToCart } from '../hooks/useAnalytics';

export default function ProductCard({ product }) {
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    trackAddToCart(product);
  };

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <div className="info">
        <h3>{product.name}</h3>
        <p className="price">${product.price?.toFixed(2)}</p>
        <p style={{ fontSize: 13, color: '#666', marginBottom: 12 }}>
          {product.description}
        </p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}
