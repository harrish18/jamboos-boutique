"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Package,
} from "lucide-react";
import { products as initialProducts, Product } from "@/data/products";

export default function AdminProductsPage() {
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    originalPrice: "",
    category: "ethnic-wear",
    subcategory: "",
    description: "",
    stock: "",
    imageUrl: "",
    sizes: "S,M,L,XL",
  });

  const filtered = productsList.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.includes(searchQuery.toLowerCase())
  );

  const openAdd = () => {
    setEditProduct(null);
    setForm({ name: "", price: "", originalPrice: "", category: "ethnic-wear", subcategory: "", description: "", stock: "", imageUrl: "", sizes: "S,M,L,XL" });
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setEditProduct(p);
    setForm({
      name: p.name,
      price: p.price.toString(),
      originalPrice: p.originalPrice.toString(),
      category: p.category,
      subcategory: p.subcategory,
      description: p.description,
      stock: p.stock.toString(),
      imageUrl: p.images[0] || "",
      sizes: p.sizes.join(","),
    });
    setShowForm(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseInt(form.price);
    const origPrice = parseInt(form.originalPrice) || price;
    const discount = origPrice > price ? Math.round(((origPrice - price) / origPrice) * 100) : 0;

    if (editProduct) {
      setProductsList(
        productsList.map((p) =>
          p.id === editProduct.id
            ? {
                ...p,
                name: form.name,
                price,
                originalPrice: origPrice,
                discount,
                category: form.category,
                subcategory: form.subcategory,
                description: form.description,
                stock: parseInt(form.stock),
                images: form.imageUrl ? [form.imageUrl, ...p.images.slice(1)] : p.images,
                sizes: form.sizes.split(",").map((s) => s.trim()),
              }
            : p
        )
      );
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: form.name,
        slug: form.name.toLowerCase().replace(/\s+/g, "-"),
        description: form.description,
        price,
        originalPrice: origPrice,
        discount,
        category: form.category,
        subcategory: form.subcategory,
        sizes: form.sizes.split(",").map((s) => s.trim()),
        colors: [{ name: "Default", hex: "#e14d6f" }],
        images: [form.imageUrl || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80"],
        rating: 0,
        reviewCount: 0,
        stock: parseInt(form.stock) || 0,
        tags: [],
        featured: false,
        trending: false,
        newArrival: true,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setProductsList([newProduct, ...productsList]);
    }
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProductsList(productsList.filter((p) => p.id !== id));
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold">Products</h1>
          <p className="text-sm text-neutral-500">{productsList.length} total products</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center bg-white border border-neutral-200 rounded-lg px-3 gap-2">
            <Search size={16} className="text-neutral-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-2 text-sm outline-none w-48"
            />
          </div>
          <button onClick={openAdd} className="btn-primary text-sm flex items-center gap-2">
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      {/* Product Form Modal */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-50" onClick={() => setShowForm(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[600px] md:max-h-[80vh] bg-white rounded-2xl shadow-2xl z-50 overflow-y-auto"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
                <h2 className="font-heading text-lg font-semibold">{editProduct ? "Edit Product" : "Add Product"}</h2>
                <button onClick={() => setShowForm(false)} className="p-1 hover:bg-neutral-100 rounded-full"><X size={20} /></button>
              </div>
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Product Name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Price (₹)</label>
                    <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input-field" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Original Price (₹)</label>
                    <input type="number" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} className="input-field" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field">
                      <option value="ethnic-wear">Ethnic Wear</option>
                      <option value="western-wear">Western Wear</option>
                      <option value="party-wear">Party Wear</option>
                      <option value="bridal">Bridal</option>
                      <option value="seasonal">Seasonal</option>
                      <option value="accessories">Accessories</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Subcategory</label>
                    <input value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })} className="input-field" placeholder="e.g. Saree, Kurta" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="input-field resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Stock</label>
                    <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Sizes (comma-separated)</label>
                    <input value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} className="input-field" placeholder="S,M,L,XL" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="input-field" placeholder="https://..." />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="btn-primary text-sm">{editProduct ? "Save Changes" : "Add Product"}</button>
                  <button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm">Cancel</button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-neutral-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/50">
                <th className="text-left px-4 py-3 font-semibold text-neutral-600">Product</th>
                <th className="text-left px-4 py-3 font-semibold text-neutral-600">Category</th>
                <th className="text-left px-4 py-3 font-semibold text-neutral-600">Price</th>
                <th className="text-left px-4 py-3 font-semibold text-neutral-600">Stock</th>
                <th className="text-left px-4 py-3 font-semibold text-neutral-600">Rating</th>
                <th className="text-right px-4 py-3 font-semibold text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={product.images[0]} alt="" className="w-10 h-12 rounded-lg object-cover" />
                      <div>
                        <p className="font-medium truncate max-w-[200px]">{product.name}</p>
                        <p className="text-xs text-neutral-400">{product.subcategory}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{product.category}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium">₹{product.price.toLocaleString()}</p>
                    {product.discount > 0 && <p className="text-xs text-emerald-600">-{product.discount}%</p>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${product.stock > 10 ? "bg-emerald-100 text-emerald-700" : product.stock > 0 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                      {product.stock > 0 ? `${product.stock} left` : "Out of stock"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{product.rating} ⭐</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => openEdit(product)} className="p-2 text-neutral-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"><Edit2 size={16} /></button>
                      <button onClick={() => handleDelete(product.id)} className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Package size={40} className="text-neutral-200 mx-auto mb-3" />
            <p className="text-neutral-400">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}
