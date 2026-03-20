"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { Save, User, Mail, Phone, Lock } from "lucide-react";

export default function SettingsPage() {
  const { user } = useAuthStore();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+91 9876543211",
    currentPassword: "",
    newPassword: "",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold mb-6">Account Settings</h1>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold mb-2">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field pl-10" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field pl-10" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Phone</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field pl-10" />
              </div>
            </div>
          </div>
        </div>

        <div className="card p-6 space-y-4">
          <h2 className="font-semibold mb-2">Change Password</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Current Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input type="password" value={form.currentPassword} onChange={(e) => setForm({ ...form, currentPassword: e.target.value })} className="input-field pl-10" placeholder="••••••••" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">New Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input type="password" value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} className="input-field pl-10" placeholder="Min. 6 characters" />
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white transition-all ${saved ? "bg-emerald-500" : "bg-primary-600 hover:bg-primary-700"}`}>
          <Save size={16} />
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
