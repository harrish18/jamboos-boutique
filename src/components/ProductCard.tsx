"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/data/products";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, setCartOpen } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.sizes[0], product.colors[0]?.name || "Default");
    setCartOpen(true);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/product/${product.id}`} className="group block">
        <div className="card overflow-hidden">
          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.discount > 0 && (
                <span className="badge-sale">-{product.discount}%</span>
              )}
              {product.newArrival && <span className="badge-new">NEW</span>}
              {product.trending && <span className="badge-trending">🔥 TRENDING</span>}
            </div>

            {/* Wishlist button */}
            <button
              onClick={handleToggleWishlist}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-sm"
            >
              <Heart
                size={16}
                className={inWishlist ? "fill-red-500 text-red-500" : "text-neutral-600"}
              />
            </button>

            {/* Quick add overlay */}
            <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <button
                onClick={handleAddToCart}
                className="w-full bg-neutral-900/90 backdrop-blur-sm text-white py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-neutral-900 transition-colors"
              >
                <ShoppingBag size={14} />
                Add to Cart
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="p-3 lg:p-4">
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">
              {product.subcategory}
            </p>
            <h3 className="font-medium text-neutral-800 text-sm lg:text-base line-clamp-1 group-hover:text-primary-600 transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-1.5">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={
                      i < Math.floor(product.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-neutral-200"
                    }
                  />
                ))}
              </div>
              <span className="text-xs text-neutral-400">
                ({product.reviewCount})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mt-2">
              <span className="font-semibold text-neutral-900">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-neutral-400 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Colors */}
            <div className="flex gap-1.5 mt-2">
              {product.colors.map((color) => (
                <span
                  key={color.hex}
                  className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
