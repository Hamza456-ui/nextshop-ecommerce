"use client";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { cart } = useCart();
  const { data: session } = useSession();

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold">
        NextShop
      </Link>

      {/* Navigation Links */}
      <nav className="flex space-x-6">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/products" className="hover:underline">
          Products
        </Link>
        <Link href="/about" className="hover:underline">
          About
        </Link>
        <Link href="/contact" className="hover:underline">
          Contact
        </Link>
      </nav>

      {/* Right Section: Cart + Auth */}
      <div className="flex items-center gap-4">
        {/* Cart */}
        <Link href="/cart" className="relative">
          🛒 Cart
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white px-2 py-1 rounded-full">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </Link>

        {/* Auth Buttons */}
        {session ? (
          <div className="flex items-center gap-2">
            <span className="hidden sm:block">Hi, {session.user.name}</span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })} // ✅ redirect to Home after logout
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-green-500 px-3 py-1 rounded"
          >
            Login
          </button>
        )}

        {/* Show Admin Panel link only for admins */}
        {session?.user?.role === "admin" && (
          <Link href="/admin" className="px-4 py-2">
            Admin Panel
          </Link>
        )}
      </div>
    </header>
  );
}
