import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { CartItem, CustomCakeConfig, Product } from '@/types';

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, quantity?: number) => void;
  addCustomCake: (product: Product, config: CustomCakeConfig, price: number, quantity?: number) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'golden-crumb-cart-v2';

function generateLineId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // ignore corrupted storage
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore quota errors
    }
  }, [items]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && !item.customConfig,
      );
      if (existing) {
        return prev.map((item) =>
          item.lineId === existing.lineId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { lineId: generateLineId(), product, quantity }];
    });
    setCartOpen(true);
  }, []);

  const addCustomCake = useCallback(
    (product: Product, config: CustomCakeConfig, price: number, quantity = 1) => {
      setItems((prev) => [
        ...prev,
        {
          lineId: generateLineId(),
          product,
          quantity,
          customConfig: config,
          customPrice: price,
        },
      ]);
      setCartOpen(true);
    },
    [],
  );

  const removeItem = useCallback((lineId: string) => {
    setItems((prev) => prev.filter((item) => item.lineId !== lineId));
  }, []);

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.lineId !== lineId));
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.lineId === lineId ? { ...item, quantity } : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) =>
      sum + (item.customPrice ?? item.product.price) * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        addItem,
        addCustomCake,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
