"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import ClientLayout from "@/components/ClientLayout";

export default function OrderConfirmationPage() {
  const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;

  return (
    <ClientLayout>
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <CheckCircle
            size={80}
            className="text-emerald-500 mx-auto mb-6"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            Order Confirmed! 🎉
          </h1>
          <p className="text-neutral-500 text-lg mb-2">
            Thank you for shopping with Jamboos Boutique
          </p>
          <p className="text-sm text-neutral-400 mb-8">
            Your order <span className="font-mono font-bold text-neutral-700">{orderId}</span> has been
            placed successfully.
          </p>

          <div className="card p-6 text-left mb-8">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Package size={18} className="text-primary-500" />
              What&apos;s Next?
            </h3>
            <div className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Order Processing",
                  desc: "We're preparing your order with care",
                },
                {
                  step: "2",
                  title: "Shipping",
                  desc: "Your order will be shipped within 2-3 business days",
                },
                {
                  step: "3",
                  title: "Delivery",
                  desc: "Estimated delivery in 5-7 business days",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-neutral-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/profile/orders" className="btn-primary flex items-center justify-center gap-2">
              Track Order <ArrowRight size={16} />
            </Link>
            <Link href="/shop" className="btn-secondary">
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    </ClientLayout>
  );
}
