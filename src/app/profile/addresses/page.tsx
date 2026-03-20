"use client";

import { useState } from "react";
import { MapPin, Plus, Edit2, Trash2 } from "lucide-react";

interface Address {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1", label: "Home", fullName: "Priya Sharma", phone: "+91 9876543211",
      street: "42, Rose Garden Apartments, MG Road", city: "Mumbai",
      state: "Maharashtra", pincode: "400001", isDefault: true,
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ label: "", fullName: "", phone: "", street: "", city: "", state: "", pincode: "" });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      setAddresses(addresses.map((a) => a.id === editId ? { ...a, ...form } : a));
    } else {
      setAddresses([...addresses, { ...form, id: Date.now().toString(), isDefault: false }]);
    }
    setShowForm(false);
    setEditId(null);
    setForm({ label: "", fullName: "", phone: "", street: "", city: "", state: "", pincode: "" });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold">Saved Addresses</h1>
        <button onClick={() => { setShowForm(true); setEditId(null); }} className="btn-primary text-sm flex items-center gap-2">
          <Plus size={16} /> Add Address
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="card p-6 mb-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Label</label><input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className="input-field" placeholder="Home / Office" required /></div>
            <div><label className="block text-sm font-medium mb-1">Full Name</label><input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="input-field" required /></div>
            <div><label className="block text-sm font-medium mb-1">Phone</label><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" required /></div>
            <div><label className="block text-sm font-medium mb-1">PIN Code</label><input value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} className="input-field" required /></div>
            <div className="col-span-2"><label className="block text-sm font-medium mb-1">Street</label><input value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} className="input-field" required /></div>
            <div><label className="block text-sm font-medium mb-1">City</label><input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="input-field" required /></div>
            <div><label className="block text-sm font-medium mb-1">State</label><input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="input-field" required /></div>
          </div>
          <div className="flex gap-3"><button type="submit" className="btn-primary text-sm">Save Address</button><button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm">Cancel</button></div>
        </form>
      )}

      <div className="space-y-4">
        {addresses.map((addr) => (
          <div key={addr.id} className="card p-5 flex gap-4">
            <MapPin size={20} className="text-primary-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm">{addr.label}</span>
                {addr.isDefault && <span className="text-[10px] bg-primary-100 text-primary-600 px-2 py-0.5 rounded-full font-medium">Default</span>}
              </div>
              <p className="text-sm text-neutral-600">{addr.fullName}</p>
              <p className="text-sm text-neutral-500">{addr.street}, {addr.city}, {addr.state} - {addr.pincode}</p>
              <p className="text-sm text-neutral-400">{addr.phone}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setForm(addr); setEditId(addr.id); setShowForm(true); }} className="p-2 text-neutral-400 hover:text-primary-500"><Edit2 size={16} /></button>
              <button onClick={() => setAddresses(addresses.filter((a) => a.id !== addr.id))} className="p-2 text-neutral-400 hover:text-red-500"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
