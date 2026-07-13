import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const API_SECRET = import.meta.env.VITE_GA_API_SECRET;

function sendEvent(name, params = {}) {
  if (!MEASUREMENT_ID || !API_SECRET) return;

  const body = {
    client_id: 'shopvibe-' + (localStorage.getItem('clientId') || 'anonymous'),
    events: [{ name, params }]
  };

  fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`, {
    method: 'POST',
    body: JSON.stringify(body)
  }).catch(() => {});
}

export function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    sendEvent('page_view', { page_title: document.title, page_location: window.location.href });
  }, []);

  useEffect(() => {
    sendEvent('page_view', { page_title: document.title, page_location: window.location.href });
  }, [location]);
}

export function trackAddToCart(product) {
  sendEvent('add_to_cart', {
    currency: 'USD',
    value: product.price,
    product_id: product._id,
    product_name: product.name
  });
}

export function trackPurchase(order) {
  sendEvent('purchase', {
    currency: 'USD',
    transaction_id: order.id || Date.now().toString(),
    value: order.total,
    items: order.items
  });
}
