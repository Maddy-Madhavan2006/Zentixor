import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Add this new function below ---
export const addToCart = (product) => {
  // 1. Get current cart from storage
  const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // 2. Check if item is already there
  const productExists = existingCart.find((item) => item.id === product.id);

  let updatedCart;

  if (productExists) {
    // If it exists, increase quantity
    updatedCart = existingCart.map((item) =>
      item.id === product.id ? { ...item, qty: item.qty + 1 } : item
    );
  } else {
    // If it's new, add it with qty 1
    updatedCart = [...existingCart, { ...product, qty: 1 }];
  }

  // 3. Save back to localStorage
  localStorage.setItem("cart", JSON.stringify(updatedCart));

  // 4. Dispatch a 'storage' event so the Navbar knows to update
  window.dispatchEvent(new Event("storage"));
  
  // Optional: Add a small alert or console log to confirm
  console.log("Added to cart:", product.title);
};