import { useState, useEffect } from 'react';
import { useSearch } from '../hooks/useSearch';
import { getProducts } from '../api/client';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const { results, loading: searchLoading } = useSearch(searchQuery);

  useEffect(() => {
    getProducts({ category, sort: 'newest' })
      .then(data => setProducts(data))
      .catch(() => {});
  }, [category]);

  const displayProducts = searchQuery.length >= 2 ? results : products;

  return (
    <div>
      <h1 style={{ marginBottom: 16 }}>Products</h1>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <input
          placeholder="Search products..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{ flex: 1 }}
        />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="home">Home & Garden</option>
        </select>
      </div>

      {searchLoading && <p>Searching...</p>}

      <div className="product-grid">
        {displayProducts.map(p => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
