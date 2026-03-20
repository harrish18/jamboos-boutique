"use client";

import { orders } from "@/data/orders";
import { useAuthStore } from "@/store/auth-store";

export default function OrdersPage() {
  const { user } = useAuthStore();
  const userOrders = orders.filter((o) => o.userId === user?.id);

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold mb-6">My Orders</h1>

      {userOrders.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-neutral-400">No orders yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {userOrders.map((order) => (
            <div key={order.id} className="card p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-neutral-100">
                <div>
                  <p className="font-semibold">{order.id}</p>
                  <p className="text-xs text-neutral-400">
                    Placed on {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-medium px-3 py-1.5 rounded-full ${
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
              </div>

              {order.items.map((item, i) => (
                <div key={i} className="flex gap-4 py-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                    </p>
                    <p className="text-sm font-semibold mt-1">
                      ₹{item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center pt-4 border-t border-neutral-100 mt-2">
                <span className="text-sm text-neutral-500">
                  Payment: {order.paymentMethod}
                </span>
                <span className="font-semibold">
                  Total: ₹{order.total.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
