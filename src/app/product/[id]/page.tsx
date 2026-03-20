"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Star,
  Truck,
  Shield,
  RotateCcw,
  ChevronRight,
  Minus,
  Plus,
  Check,
} from "lucide-react";
import ClientLayout from "@/components/ClientLayout";
import ProductCard from "@/components/ProductCard";
import { getProductById, products } from "@/data/products";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = getProductById(id as string);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [addedToCart, setAddedToCart] = useState(false);

  const { addItem, setCartOpen } = useCartStore();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlistStore();

  if (!product) {
    return (
      <ClientLayout>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
          <Link href="/shop" className="btn-primary">
            Back to Shop
          </Link>
        </div>
      </ClientLayout>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(
      product,
      selectedSize || product.sizes[0],
      selectedColor || product.colors[0]?.name || "Default"
    );
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(
      product,
      selectedSize || product.sizes[0],
      selectedColor || product.colors[0]?.name || "Default"
    );
    setCartOpen(true);
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <ClientLayout>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
          <Link href="/" className="hover:text-neutral-600">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link href="/shop" className="hover:text-neutral-600">
            Shop
          </Link>
          <ChevronRight size={14} />
          <span className="text-neutral-700">{product.name}</span>
        </nav>

        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left — Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100 mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.discount > 0 && (
                <span className="absolute top-4 left-4 badge-sale text-sm px-3 py-1">
                  -{product.discount}% OFF
                </span>
              )}
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-24 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === i
                      ? "border-primary-500"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right — Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <p className="text-sm text-primary-500 font-medium uppercase tracking-wider mb-1">
                {product.subcategory}
              </p>
              <h1 className="font-heading text-2xl lg:text-3xl font-bold text-neutral-900">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.floor(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-neutral-200"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-neutral-400">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-neutral-900">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-xl text-neutral-400 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Save ₹
                    {(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            {/* Colors */}
            <div>
              <p className="text-sm font-medium text-neutral-700 mb-2">
                Color:{" "}
                <span className="text-neutral-500">
                  {selectedColor || product.colors[0]?.name}
                </span>
              </p>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                      (selectedColor || product.colors[0]?.name) === color.name
                        ? "border-primary-500 scale-110"
                        : "border-neutral-200"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {(selectedColor || product.colors[0]?.name) ===
                      color.name && (
                      <Check
                        size={16}
                        className={
                          color.hex === "#000000" ||
                          color.hex === "#0A0A0A" ||
                          color.hex === "#191970"
                            ? "text-white"
                            : "text-neutral-800"
                        }
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-neutral-700">
                  Size:{" "}
                  <span className="text-neutral-500">
                    {selectedSize || "Select a size"}
                  </span>
                </p>
                <button className="text-xs text-primary-600 hover:underline">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[3rem] px-4 py-2.5 border rounded-lg text-sm font-medium transition-all ${
                      selectedSize === size
                        ? "bg-neutral-900 border-neutral-900 text-white"
                        : "border-neutral-200 text-neutral-700 hover:border-neutral-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-sm font-medium text-neutral-700 mb-2">
                Quantity
              </p>
              <div className="inline-flex items-center border border-neutral-200 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-neutral-50 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="px-6 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-neutral-50 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              <span className="ml-3 text-sm text-neutral-400">
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                  addedToCart
                    ? "bg-emerald-500 text-white"
                    : "btn-primary"
                } disabled:opacity-50`}
              >
                {addedToCart ? (
                  <>
                    <Check size={18} /> Added!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} /> Add to Cart
                  </>
                )}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 btn-secondary"
              >
                Buy Now
              </button>
              <button
                onClick={() =>
                  inWishlist
                    ? removeFromWishlist(product.id)
                    : addToWishlist(product)
                }
                className="p-3.5 border-2 border-neutral-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors"
              >
                <Heart
                  size={20}
                  className={
                    inWishlist
                      ? "fill-red-500 text-red-500"
                      : "text-neutral-400"
                  }
                />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-100">
              {[
                { icon: Truck, text: "Free Shipping" },
                { icon: Shield, text: "Secure Payment" },
                { icon: RotateCcw, text: "Easy Returns" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex flex-col items-center text-center gap-1.5"
                >
                  <Icon size={20} className="text-primary-500" />
                  <span className="text-xs text-neutral-500">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs — Description & Reviews */}
        <div className="mt-16 border-t border-neutral-100 pt-12">
          <div className="flex gap-8 border-b border-neutral-100 mb-8">
            {["description", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium capitalize transition-colors border-b-2 ${
                  activeTab === tab
                    ? "text-primary-600 border-primary-500"
                    : "text-neutral-400 border-transparent hover:text-neutral-600"
                }`}
              >
                {tab}
                {tab === "reviews" && ` (${product.reviewCount})`}
              </button>
            ))}
          </div>

          {activeTab === "description" ? (
            <div className="prose max-w-3xl text-neutral-600">
              <p>{product.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-neutral-800 mb-2">
                    Details
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>Category: {product.subcategory}</li>
                    <li>
                      Available Sizes: {product.sizes.join(", ")}
                    </li>
                    <li>
                      Colors:{" "}
                      {product.colors.map((c) => c.name).join(", ")}
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-800 mb-2">
                    Care
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>Dry clean recommended</li>
                    <li>Store in a cool, dry place</li>
                    <li>Iron on low heat</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl space-y-6">
              {[
                {
                  name: "Priya S.",
                  rating: 5,
                  date: "Feb 2024",
                  comment:
                    "Absolutely love this piece! The quality is outstanding and it fits perfectly. The color is exactly as shown in the photos.",
                },
                {
                  name: "Ananya P.",
                  rating: 4,
                  date: "Jan 2024",
                  comment:
                    "Beautiful design and great fabric quality. Delivery was quick too. Slightly different shade than expected but still gorgeous.",
                },
                {
                  name: "Meera K.",
                  rating: 5,
                  date: "Dec 2023",
                  comment:
                    "Perfect for my sister's wedding! Got tons of compliments. The craftsmanship is impeccable. Highly recommend Jamboos Boutique!",
                },
              ].map((review, i) => (
                <div
                  key={i}
                  className="border-b border-neutral-100 pb-6 last:border-0"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-xs font-bold">
                        {review.name[0]}
                      </div>
                      <span className="font-medium text-sm">
                        {review.name}
                      </span>
                    </div>
                    <span className="text-xs text-neutral-400">
                      {review.date}
                    </span>
                  </div>
                  <div className="flex mb-2">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        size={14}
                        className={
                          j < review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-neutral-200"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-sm text-neutral-600">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-neutral-100">
            <h2 className="section-heading mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </ClientLayout>
  );
}
