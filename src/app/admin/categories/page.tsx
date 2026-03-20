"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, FolderOpen } from "lucide-react";
import { categories as initialCategories, Category } from "@/data/categories";
import { AnimatePresence, motion } from "framer-motion";

export default function AdminCategoriesPage() {
  const [catList, setCatList] = useState<Category[]>(initialCategories);
  const [showForm, setShowForm] = useState(false);
  const [editCat, setEditCat] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: "", description: "", image: "" });

  const openAdd = () => { setEditCat(null); setForm({ name: "", description: "", image: "" }); setShowForm(true); };
  const openEdit = (c: Category) => { setEditCat(c); setForm({ name: c.name, description: c.description, image: c.image }); setShowForm(true); };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editCat) {
      setCatList(catList.map((c) => c.id === editCat.id ? { ...c, name: form.name, slug: form.name.toLowerCase().replace(/\s+/g, "-"), description: form.description, image: form.image || c.image } : c));
    } else {
      setCatList([...catList, { id: Date.now().toString(), name: form.name, slug: form.name.toLowerCase().replace(/\s+/g, "-"), description: form.description, image: form.image || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80", productCount: 0 }]);
    }
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this category?")) setCatList(catList.filter((c) => c.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="font-heading text-2xl font-bold">Categories</h1><p className="text-sm text-neutral-500">{catList.length} categories</p></div>
        <button onClick={openAdd} className="btn-primary text-sm flex items-center gap-2"><Plus size={16} /> Add Category</button>
      </div>

      <AnimatePresence>
        {showForm && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-50" onClick={() => setShowForm(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white rounded-2xl shadow-2xl z-50">
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
                <h2 className="font-heading text-lg font-semibold">{editCat ? "Edit" : "Add"} Category</h2>
                <button onClick={() => setShowForm(false)}><X size={20} /></button>
              </div>
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div><label className="block text-sm font-medium mb-1">Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" required /></div>
                <div><label className="block text-sm font-medium mb-1">Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field resize-none" rows={2} /></div>
                <div><label className="block text-sm font-medium mb-1">Image URL</label><input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="input-field" /></div>
                <div className="flex gap-3"><button type="submit" className="btn-primary text-sm">Save</button><button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm">Cancel</button></div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {catList.map((cat) => (
          <div key={cat.id} className="bg-white rounded-xl border border-neutral-100 shadow-sm overflow-hidden group">
            <div className="aspect-video relative overflow-hidden"><img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" /></div>
            <div className="p-4">
              <h3 className="font-semibold">{cat.name}</h3>
              <p className="text-sm text-neutral-500 mt-1">{cat.description}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full">{cat.productCount} products</span>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(cat)} className="p-1.5 text-neutral-400 hover:text-primary-500"><Edit2 size={14} /></button>
                  <button onClick={() => handleDelete(cat.id)} className="p-1.5 text-neutral-400 hover:text-red-500"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
