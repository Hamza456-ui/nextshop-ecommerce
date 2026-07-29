"use client";
import Header from "./Header";
import Footer from "./Footer";
import { CartProvider } from "../context/CartContext";

export default function Layout({ children }) {
  return (
    <CartProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </CartProvider>
  );
}
