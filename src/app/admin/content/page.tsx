"use client";

import { useState } from "react";
import { banners as initialBanners } from "@/data/testimonials";
import { products } from "@/data/products";
import { Save, ImageIcon, Star } from "lucide-react";

export default function AdminContentPage() {
  const [bannerList, setBannerList] = useState(initialBanners);
  const [featuredIds, setFeaturedIds] = useState<string[]>(
    products.filter((p) => p.featured).map((p) => p.id)
  );
  const [saved, setSaved] = useState(false);

  const handleBannerChange = (index: number, field: string, value: string) => {
    setBannerList(bannerList.map((b, i) => i === index ? { ...b, [field]: value } : b));
  };

  const toggleFeatured = (id: string) => {
    setFeaturedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="font-heading text-2xl font-bold">Content Management</h1><p className="text-sm text-neutral-500">Manage banners and featured products</p></div>
        <button onClick={handleSave} className={`flex items-center gap-2 text-sm px-5 py-2.5 rounded-lg font-medium text-white ${saved ? "bg-emerald-500" : "bg-primary-600 hover:bg-primary-700"} transition-colors`}>
          <Save size={16} /> {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Banners */}
      <div className="bg-white rounded-xl border border-neutral-100 shadow-sm p-6 mb-6">
        <h2 className="font-semibold flex items-center gap-2 mb-4"><ImageIcon size={18} className="text-primary-500" /> Homepage Banners</h2>
        <div className="space-y-6">
          {bannerList.map((banner, i) => (
            <div key={banner.id} className="p-4 bg-neutral-50 rounded-xl space-y-3">
              <div className="flex gap-4">
                <img src={banner.image} alt="" className="w-32 h-20 rounded-lg object-cover" />
                <div className="flex-1 space-y-2">
                  <input value={banner.title} onChange={(e) => handleBannerChange(i, "title", e.target.value)} className="input-field text-sm py-2" placeholder="Banner title" />
                  <input value={banner.subtitle} onChange={(e) => handleBannerChange(i, "subtitle", e.target.value)} className="input-field text-sm py-2" placeholder="Subtitle" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input value={banner.image} onChange={(e) => handleBannerChange(i, "image", e.target.value)} className="input-field text-sm py-2" placeholder="Image URL" />
                <input value={banner.link} onChange={(e) => handleBannerChange(i, "link", e.target.value)} className="input-field text-sm py-2" placeholder="Link" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-white rounded-xl border border-neutral-100 shadow-sm p-6">
        <h2 className="font-semibold flex items-center gap-2 mb-4"><Star size={18} className="text-primary-500" /> Featured Products</h2>
        <p className="text-sm text-neutral-500 mb-4">Select products to feature on the homepage</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {products.map((product) => (
            <label key={product.id} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${featuredIds.includes(product.id) ? "border-primary-300 bg-primary-50" : "border-neutral-100 hover:border-neutral-200"}`}>
              <input type="checkbox" checked={featuredIds.includes(product.id)} onChange={() => toggleFeatured(product.id)} className="accent-primary-500" />
              <img src={product.images[0]} alt="" className="w-10 h-12 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{product.name}</p>
                <p className="text-xs text-neutral-400">₹{product.price.toLocaleString()}</p>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
