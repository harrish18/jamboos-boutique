"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { orders } from "@/data/orders";
import { products } from "@/data/products";
import { users } from "@/data/users";

export default function AdminDashboard() {
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalUsers = users.filter((u) => u.role === "user").length;
  const totalProducts = products.length;

  const stats = [
    {
      label: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      change: "+12.5%",
      positive: true,
      icon: DollarSign,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Total Orders",
      value: totalOrders,
      change: "+8.2%",
      positive: true,
      icon: ShoppingBag,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Total Users",
      value: totalUsers,
      change: "+15.3%",
      positive: true,
      icon: Users,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Total Products",
      value: totalProducts,
      change: "-2.1%",
      positive: false,
      icon: Package,
      color: "bg-amber-50 text-amber-600",
    },
  ];

  const recentOrders = orders.slice(0, 5);

  const topProducts = [...products]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 5);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold">Dashboard</h1>
        <p className="text-neutral-500 text-sm mt-1">
          Welcome back! Here&apos;s what&apos;s happening with your store.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-5 border border-neutral-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}
              >
                <stat.icon size={20} />
              </div>
              <span
                className={`text-xs font-medium flex items-center gap-0.5 ${
                  stat.positive ? "text-emerald-600" : "text-red-500"
                }`}
              >
                {stat.positive ? (
                  <ArrowUpRight size={14} />
                ) : (
                  <ArrowDownRight size={14} />
                )}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-neutral-400 mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-neutral-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
            <h2 className="font-semibold">Recent Orders</h2>
            <TrendingUp size={18} className="text-neutral-400" />
          </div>
          <div className="divide-y divide-neutral-50">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="px-6 py-3.5 flex items-center justify-between hover:bg-neutral-50 transition-colors"
              >
                <div>
                  <p className="font-medium text-sm">{order.id}</p>
                  <p className="text-xs text-neutral-400">
                    {order.items[0]?.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">
                    ₹{order.total.toLocaleString()}
                  </p>
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      order.status === "delivered"
                        ? "bg-emerald-100 text-emerald-700"
                        : order.status === "shipped"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "confirmed"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-neutral-100 text-neutral-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl border border-neutral-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
            <h2 className="font-semibold">Top Products</h2>
            <Package size={18} className="text-neutral-400" />
          </div>
          <div className="divide-y divide-neutral-50">
            {topProducts.map((product, i) => (
              <div
                key={product.id}
                className="px-6 py-3.5 flex items-center gap-3 hover:bg-neutral-50 transition-colors"
              >
                <span className="text-xs font-bold text-neutral-300 w-5">
                  {i + 1}
                </span>
                <img
                  src={product.images[0]}
                  alt=""
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-neutral-400">
                    ₹{product.price.toLocaleString()} •{" "}
                    {product.reviewCount} reviews
                  </p>
                </div>
                <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full">
                  {product.stock} in stock
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
