import { useMemo } from 'react';

/**
 * カートの計算ロジックを提供するカスタムフック
 */
export const useCartCalculations = (cartItems) => {
  const calculations = useMemo(() => {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    return {
      subtotal,
      tax,
      total,
    };
  }, [cartItems]);

  return calculations;
}; 