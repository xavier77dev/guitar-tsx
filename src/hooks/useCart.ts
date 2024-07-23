import { useEffect, useState, useMemo } from "react";
import { db } from "../data/db";
import { CartItem, Guitar } from "../types";


export default function useCart() {

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


  const isEmpty = useMemo(() => cart.length == 0, [cart]);

  const cartTotal = useMemo(() => {
    const total = cart?.reduce((total, item) => total + (item.quantity * item.price), 0);
    return total;
  }, [cart])

  const cartToAdd = (item: Guitar) => {
    const cartExists = cart.findIndex((product) => product.id == item.id);
    if (cartExists < 0) {
      const newItem: CartItem = { ...item, quantity: 1 };
      return setCart([...cart, newItem]);
    }

    if (cart[cartExists].quantity >= MAX_ITEMS) return;

    const updateCart = [...cart];
    updateCart[cartExists].quantity++;
    setCart(updateCart);
  };

  const removeFromCart = (id: Guitar["id"]) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const increaseQuantity = ((id: Guitar["id"]) => {
    const updateCart = cart.map((item) => {
      if (item.id == id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updateCart);
  });

  const decreaseQuantity = (id: Guitar["id"]) => {
    const updateCart = cart.map((item) => {
      if (item.id == id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });

    setCart(updateCart);
  };

  const clearCart = () => setCart([]);
  return {
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    cartToAdd,
    cart,
    setCart,
    data,
    initialCart,
    isEmpty,
    cartTotal
  }

}
