"use client";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert("Payment successful!");
    clearCart();
  };

  if (cart.length === 0) {
    return <div className="p-6 text-center">Your cart is empty</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <ul className="space-y-4">
        {cart.map((item) => (
          <li
            key={item._id}
            className="flex justify-between items-center border p-4 rounded"
          >
            <span>{item.name} (x{item.quantity})</span>
            <div className="flex gap-4 items-center">
              <span>${item.price * item.quantity}</span>
              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-between items-center">
        <span className="text-xl font-bold">Total: ${totalPrice}</span>
        <button
          onClick={handleCheckout}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
