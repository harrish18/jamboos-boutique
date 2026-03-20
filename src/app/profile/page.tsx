"use client";

import Link from "next/link";
import { Package, Heart, MapPin, ShoppingBag } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { orders } from "@/data/orders";
import { useWishlistStore } from "@/store/wishlist-store";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const { items: wishlistItems } = useWishlistStore();
  const userOrders = orders.filter((o) => o.userId === user?.id);

  const stats = [
    {
      icon: Package,
      label: "Total Orders",
      value: userOrders.length,
      href: "/profile/orders",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Heart,
      label: "Wishlist Items",
      value: wishlistItems.length,
      href: "/profile/wishlist",
      color: "bg-red-50 text-red-600",
    },
    {
      icon: MapPin,
      label: "Addresses",
      value: 1,
      href: "/profile/addresses",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: ShoppingBag,
      label: "Delivered",
      value: userOrders.filter((o) => o.status === "delivered").length,
      href: "/profile/orders",
      color: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold mb-6">
        Welcome back, {user?.name?.split(" ")[0]}! 👋
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="card p-4 hover:shadow-md transition-shadow"
          >
            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon size={20} />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-neutral-500">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-lg font-semibold">Recent Orders</h2>
          <Link
            href="/profile/orders"
            className="text-sm text-primary-600 hover:underline"
          >
            View All
          </Link>
        </div>

        {userOrders.length === 0 ? (
          <p className="text-neutral-400 text-sm py-8 text-center">
            No orders yet.{" "}
            <Link href="/shop" className="text-primary-600 hover:underline">
              Start shopping
            </Link>
          </p>
        ) : (
          <div className="space-y-3">
            {userOrders.slice(0, 3).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={order.items[0].image}
                    alt=""
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium text-sm">{order.id}</p>
                    <p className="text-xs text-neutral-400">
                      {order.items.length} item(s) • ₹{order.total.toLocaleString()}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    order.status === "delivered"
                      ? "bg-emerald-100 text-emerald-700"
                      : order.status === "shipped"
                      ? "bg-blue-100 text-blue-700"
                      : order.status === "confirmed"
                      ? "bg-amber-100 text-amber-700"
                      : order.status === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-neutral-100 text-neutral-700"
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
