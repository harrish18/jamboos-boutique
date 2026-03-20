"use client";

import { useWishlistStore } from "@/store/wishlist-store";
import ProductCard from "@/components/ProductCard";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  const { items } = useWishlistStore();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold mb-6">My Wishlist</h1>

      {items.length === 0 ? (
        <div className="card p-12 text-center">
          <Heart size={48} className="text-neutral-200 mx-auto mb-4" />
          <p className="text-neutral-500 mb-2">Your wishlist is empty</p>
          <p className="text-sm text-neutral-400 mb-6">Save items you love for later</p>
          <Link href="/shop" className="btn-primary text-sm">Browse Collection</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
