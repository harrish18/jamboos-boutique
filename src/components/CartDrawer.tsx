"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2, Tag } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { useState } from "react";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    setCartOpen,
    removeItem,
    updateQuantity,
    getSubtotal,
    getTotal,
    getItemCount,
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
      setCouponError("Invalid coupon code");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            onClick={() => setCartOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-neutral-700" />
                <h2 className="font-heading text-lg font-semibold">
                  Your Cart
                </h2>
                <span className="bg-primary-100 text-primary-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  {getItemCount()}
                </span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag
                    size={48}
                    className="text-neutral-200 mb-4"
                  />
                  <p className="text-neutral-500 mb-2">
                    Your cart is empty
                  </p>
                  <p className="text-sm text-neutral-400 mb-6">
                    Discover our curated collection of premium fashion
                  </p>
                  <Link
                    href="/shop"
                    onClick={() => setCartOpen(false)}
                    className="btn-primary text-sm"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-3 bg-neutral-50 rounded-xl p-3"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-neutral-800 line-clamp-1">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-neutral-400 mt-0.5">
                          Size: {item.size} • {item.color}
                        </p>
                        <p className="font-semibold text-sm mt-1">
                          ₹{item.product.price.toLocaleString()}
                        </p>

                        <div className="flex items-center justify-between mt-2">
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
                              className="p-1.5 hover:bg-neutral-100 rounded-l-lg transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-3 text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.size,
                                  item.color,
                                  item.quantity + 1
                                )
                              }
                              className="p-1.5 hover:bg-neutral-100 rounded-r-lg transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            onClick={() =>
                              removeItem(
                                item.product.id,
                                item.size,
                                item.color
                              )
                            }
                            className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer (with coupon & total) */}
            {items.length > 0 && (
              <div className="border-t border-neutral-100 px-5 py-4 space-y-3">
                {/* Coupon */}
                {couponCode ? (
                  <div className="flex items-center justify-between bg-emerald-50 rounded-lg px-3 py-2">
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
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon code"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        setCouponError("");
                      }}
                      className="flex-1 px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary-400"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-neutral-900 text-white text-sm rounded-lg hover:bg-neutral-800 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {couponError && (
                  <p className="text-xs text-red-500">{couponError}</p>
                )}

                {/* Summary */}
                <div className="space-y-1.5 text-sm">
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
                  <div className="flex justify-between font-semibold text-base pt-2 border-t border-neutral-100">
                    <span>Total</span>
                    <span>₹{Math.round(getTotal()).toLocaleString()}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="block w-full btn-primary text-center"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={() => setCartOpen(false)}
                  className="block w-full text-center text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
