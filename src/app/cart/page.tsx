"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, Tag, ArrowLeft, ShoppingBag } from "lucide-react";
import ClientLayout from "@/components/ClientLayout";
import { useCartStore } from "@/store/cart-store";
import { useState } from "react";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    getSubtotal,
    getTotal,
    couponCode,
    couponDiscount,
    applyCoupon,
    removeCoupon,
  } = useCartStore();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  const handleApplyCoupon = () => {
    if (applyCoupon(couponInput)) {
      setCouponError("");
      setCouponInput("");
    } else {
      setCouponError("Invalid coupon code. Try JAMBOOS10, FIRST20, or FESTIVE15");
    }
  };

  if (items.length === 0) {
    return (
      <ClientLayout>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <ShoppingBag size={64} className="text-neutral-200 mx-auto mb-6" />
          <h1 className="font-heading text-3xl font-bold mb-3">Your Cart is Empty</h1>
          <p className="text-neutral-500 mb-8">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Link href="/shop" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <h1 className="font-heading text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={`${item.product.id}-${item.size}-${item.color}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="card p-4 lg:p-6 flex gap-4 lg:gap-6"
              >
                <Link href={`/product/${item.product.id}`}>
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-24 h-32 lg:w-32 lg:h-40 object-cover rounded-xl"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <div>
                      <Link
                        href={`/product/${item.product.id}`}
                        className="font-medium text-neutral-800 hover:text-primary-600 transition-colors line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-neutral-400 mt-0.5">
                        Size: {item.size} • Color: {item.color}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        removeItem(item.product.id, item.size, item.color)
                      }
                      className="text-neutral-300 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex items-end justify-between mt-4">
                    <div className="flex items-center border border-neutral-200 rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.color,
                            item.quantity - 1
                          )
                        }
                        className="p-2 hover:bg-neutral-50 rounded-l-lg"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 font-medium">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.color,
                            item.quantity + 1
                          )
                        }
                        className="p-2 hover:bg-neutral-50 rounded-r-lg"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">
                        ₹{(item.product.price * item.quantity).toLocaleString()}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-neutral-400">
                          ₹{item.product.price.toLocaleString()} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-primary-600 font-medium text-sm hover:gap-3 transition-all"
            >
              <ArrowLeft size={16} /> Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div>
            <div className="card p-6 sticky top-32">
              <h2 className="font-heading text-xl font-semibold mb-6">
                Order Summary
              </h2>

              {/* Coupon */}
              {couponCode ? (
                <div className="flex items-center justify-between bg-emerald-50 rounded-lg px-4 py-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-emerald-700">
                    <Tag size={14} />
                    <span className="font-medium">{couponCode}</span>
                    <span>({couponDiscount}% off)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="mb-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon code"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        setCouponError("");
                      }}
                      className="flex-1 input-field text-sm py-2.5"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-neutral-900 text-white text-sm rounded-lg hover:bg-neutral-800 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-xs text-red-500 mt-1">{couponError}</p>
                  )}
                </div>
              )}

              <div className="space-y-3 text-sm border-t border-neutral-100 pt-4">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span>₹{getSubtotal().toLocaleString()}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount ({couponDiscount}%)</span>
                    <span>
                      -₹
                      {((getSubtotal() * couponDiscount) / 100).toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping</span>
                  <span className="text-emerald-600">Free</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Tax (Estimated)</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-3 border-t border-neutral-100">
                  <span>Total</span>
                  <span>₹{Math.round(getTotal()).toLocaleString()}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full btn-primary text-center mt-6"
              >
                Proceed to Checkout
              </Link>

              <p className="text-xs text-neutral-400 text-center mt-3">
                Free shipping on orders above ₹1,999
              </p>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
