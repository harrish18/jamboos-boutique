"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CreditCard, Truck, Shield, ChevronRight } from "lucide-react";
import ClientLayout from "@/components/ClientLayout";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getTotal, couponDiscount, clearCart } =
    useCartStore();
  const { user } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const [form, setForm] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "card",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    clearCart();
    router.push("/order-confirmation");
  };

  if (items.length === 0) {
    return (
      <ClientLayout>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="font-heading text-3xl font-bold mb-4">
            Your cart is empty
          </h1>
          <Link href="/shop" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
          <Link href="/cart" className="hover:text-neutral-600">Cart</Link>
          <ChevronRight size={14} />
          <span className="text-neutral-700">Checkout</span>
        </nav>

        <h1 className="font-heading text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left — Address & Payment */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Address */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-6"
              >
                <h2 className="font-heading text-xl font-semibold mb-6 flex items-center gap-2">
                  <Truck size={20} className="text-primary-500" />
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Full Name
                    </label>
                    <input
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Phone
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      PIN Code
                    </label>
                    <input
                      name="pincode"
                      value={form.pincode}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Street Address
                    </label>
                    <input
                      name="street"
                      value={form.street}
                      onChange={handleChange}
                      placeholder="House no., Street, Area"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      City
                    </label>
                    <input
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      State
                    </label>
                    <input
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card p-6"
              >
                <h2 className="font-heading text-xl font-semibold mb-6 flex items-center gap-2">
                  <CreditCard size={20} className="text-primary-500" />
                  Payment Method
                </h2>
                <div className="space-y-3">
                  {[
                    { value: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay" },
                    { value: "upi", label: "UPI", desc: "Google Pay, PhonePe, Paytm" },
                    { value: "netbanking", label: "Net Banking", desc: "All major banks" },
                    { value: "cod", label: "Cash on Delivery", desc: "Pay when delivered" },
                  ].map((method) => (
                    <label
                      key={method.value}
                      className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                        form.paymentMethod === method.value
                          ? "border-primary-500 bg-primary-50"
                          : "border-neutral-200 hover:border-neutral-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={form.paymentMethod === method.value}
                        onChange={handleChange}
                        className="accent-primary-500"
                      />
                      <div>
                        <p className="font-medium text-sm">{method.label}</p>
                        <p className="text-xs text-neutral-400">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right — Order Summary */}
            <div>
              <div className="card p-6 sticky top-32">
                <h2 className="font-heading text-xl font-semibold mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      className="flex gap-3"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-14 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-neutral-400">
                          {item.size} • {item.color} × {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium">
                        ₹{(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-sm border-t border-neutral-100 pt-4">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span>₹{getSubtotal().toLocaleString()}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount ({couponDiscount}%)</span>
                      <span>
                        -₹{((getSubtotal() * couponDiscount) / 100).toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-neutral-600">
                    <span>Shipping</span>
                    <span className="text-emerald-600">Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-3 border-t border-neutral-100">
                    <span>Total</span>
                    <span>₹{Math.round(getTotal()).toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full btn-primary mt-6 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Shield size={16} /> Place Order
                    </>
                  )}
                </button>

                <p className="text-xs text-neutral-400 text-center mt-3 flex items-center justify-center gap-1">
                  <Shield size={12} /> Secure checkout — your data is protected
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </ClientLayout>
  );
}
