"use client";

import { useState } from "react";
import { orders as initialOrders, Order } from "@/data/orders";
import { ChevronDown, Eye, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const statusColors: Record<string, string> = {
  pending: "bg-neutral-100 text-neutral-700",
  confirmed: "bg-amber-100 text-amber-700",
  shipped: "bg-blue-100 text-blue-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminOrdersPage() {
  const [orderList, setOrderList] = useState<Order[]>(initialOrders);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = statusFilter === "all" ? orderList : orderList.filter((o) => o.status === statusFilter);

  const updateStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrderList(orderList.map((o) => o.id === orderId ? { ...o, status: newStatus, updatedAt: new Date().toISOString().split("T")[0] } : o));
    if (selectedOrder?.id === orderId) setSelectedOrder({ ...selectedOrder, status: newStatus });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div><h1 className="font-heading text-2xl font-bold">Orders</h1><p className="text-sm text-neutral-500">{orderList.length} total orders</p></div>
        <div className="flex gap-2">
          {["all", "pending", "confirmed", "shipped", "delivered"].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 text-xs font-medium rounded-full capitalize transition-colors ${statusFilter === s ? "bg-primary-500 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"}`}>{s}</button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-neutral-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-neutral-100 bg-neutral-50/50">
            <th className="text-left px-4 py-3 font-semibold">Order ID</th>
            <th className="text-left px-4 py-3 font-semibold">Customer</th>
            <th className="text-left px-4 py-3 font-semibold">Items</th>
            <th className="text-left px-4 py-3 font-semibold">Total</th>
            <th className="text-left px-4 py-3 font-semibold">Status</th>
            <th className="text-right px-4 py-3 font-semibold">Actions</th>
          </tr></thead>
          <tbody className="divide-y divide-neutral-50">
            {filtered.map((order) => (
              <tr key={order.id} className="hover:bg-neutral-50">
                <td className="px-4 py-3 font-medium">{order.id}</td>
                <td className="px-4 py-3 text-neutral-600">{order.shippingAddress.fullName}</td>
                <td className="px-4 py-3 text-neutral-600">{order.items.length} item(s)</td>
                <td className="px-4 py-3 font-medium">₹{order.total.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <div className="relative inline-block">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value as Order["status"])}
                      className={`appearance-none text-xs font-medium pl-3 pr-7 py-1.5 rounded-full cursor-pointer border-0 ${statusColors[order.status]}`}
                    >
                      {["pending", "confirmed", "shipped", "delivered", "cancelled"].map((s) => (
                        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                      ))}
                    </select>
                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setSelectedOrder(order)} className="p-2 text-neutral-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg"><Eye size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-50" onClick={() => setSelectedOrder(null)} />
            <motion.div initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }} className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white shadow-2xl z-50 overflow-y-auto">
              <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
                <h2 className="font-heading text-lg font-semibold">Order {selectedOrder.id}</h2>
                <button onClick={() => setSelectedOrder(null)} className="p-1 hover:bg-neutral-100 rounded-full">✕</button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-sm mb-2">Items</h3>
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex gap-3 py-2">
                      <img src={item.image} alt="" className="w-14 h-16 rounded-lg object-cover" />
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-neutral-400">{item.size} • {item.color} × {item.quantity}</p>
                        <p className="text-sm font-medium mt-1">₹{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-2">Shipping</h3>
                  <div className="text-sm text-neutral-600 space-y-1">
                    <p>{selectedOrder.shippingAddress.fullName}</p>
                    <p>{selectedOrder.shippingAddress.street}</p>
                    <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}</p>
                    <p>{selectedOrder.shippingAddress.phone}</p>
                  </div>
                </div>
                <div className="flex justify-between pt-4 border-t"><span className="font-semibold">Total</span><span className="font-bold text-lg">₹{selectedOrder.total.toLocaleString()}</span></div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
