'use client';
import { useEffect, useState, useRef } from 'react';
import ProductList from './ProductList';
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';
import CartSummary from './CartSummary';
import StatusMessage from './StatusMessage';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [cart, setCart] = useState({});

  const intervalRef = useRef();

  // Fetch products
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch('/api/products')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        setProducts(data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || 'Error fetching');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, []);

  // Simulate stock changes
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProducts((prev) =>
        prev.map((p) => {
          if (Math.random() < 0.2) {
            const change = Math.random() < 0.5 ? -1 : 1;
            return { ...p, stock: Math.max(0, p.stock + change) };
          }
          return p;
        })
      );
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  // Cart handlers
  const handleAddToCart = (id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };
  const handleDecrement = (id) => {
    setCart((prev) => {
      const copy = { ...prev };
      if (copy[id] > 1) copy[id] -= 1;
      else delete copy[id];
      return copy;
    });
  };
  const handleResetCart = () => setCart({});

  // Filtered products
  const filteredProducts = products.filter((p) => {
    const catMatch = category === 'All' || p.category === category;
    const priceMatch = maxPrice === Infinity || p.price <= maxPrice;
    return catMatch && priceMatch;
  });

  // Categories
  const categories = ['All', ...new Set(products.map((p) => p.category))];

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {/* Filters + Cart */}
      <aside className="md:col-span-1 space-y-4">
        <CategoryFilter value={category} onChange={setCategory} options={categories} />
        <PriceFilter
          value={maxPrice}
          onChange={setMaxPrice}
          max={Math.max(...products.map(p => p.price), 1000)}
        />
        <CartSummary
          cart={cart}
          products={products}
          onDecrement={handleDecrement}
          onReset={handleResetCart}
        />
      </aside>

      {/* Product List */}
      <main className="md:col-span-3">
        <StatusMessage
          loading={loading}
          error={error}
          empty={!loading && filteredProducts.length === 0}
        />
        {!loading && !error && filteredProducts.length > 0 && (
          <ProductList products={filteredProducts} onAdd={handleAddToCart} />
        )}
      </main>
    </div>
  );
}