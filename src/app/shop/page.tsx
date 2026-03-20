"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import ClientLayout from "@/components/ClientLayout";
import ProductCard from "@/components/ProductCard";
import { products as allProducts, Product } from "@/data/products";
import { categories } from "@/data/categories";

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "");
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [categoryParam]);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => selectedSizes.includes(s))
      );
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    return result;
  }, [selectedCategory, sortBy, priceRange, selectedSizes]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const allSizes = ["XS", "S", "M", "L", "XL", "XXL", "Free Size"];

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setPriceRange([0, 50000]);
    setSelectedSizes([]);
    setCurrentPage(1);
  };

  const activeFilterCount =
    (selectedCategory ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 50000 ? 1 : 0) +
    (selectedSizes.length > 0 ? 1 : 0);

  return (
    <ClientLayout>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-neutral-900">
              {selectedCategory
                ? categories.find((c) => c.slug === selectedCategory)?.name ||
                  "Shop"
                : "Shop All"}
            </h1>
            <p className="text-neutral-500 mt-1">
              {filteredProducts.length} products found
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-neutral-200 rounded-lg text-sm font-medium hover:bg-neutral-50"
            >
              <SlidersHorizontal size={16} />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-primary-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-4 py-2.5 pr-10 border border-neutral-200 rounded-lg text-sm font-medium bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside
            className={`${
              isFilterOpen
                ? "fixed inset-0 z-50 bg-white p-6 overflow-y-auto lg:static lg:z-auto lg:p-0"
                : "hidden"
            } lg:block w-full lg:w-64 flex-shrink-0`}
          >
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={() => setIsFilterOpen(false)}>
                <X size={24} />
              </button>
            </div>

            {/* Clear filters */}
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:underline mb-4 block"
              >
                Clear all filters
              </button>
            )}

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-neutral-600 mb-3">
                Categories
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setSelectedCategory("");
                    setCurrentPage(1);
                  }}
                  className={`block text-sm w-full text-left py-1.5 px-2 rounded transition-colors ${
                    !selectedCategory
                      ? "bg-primary-50 text-primary-600 font-medium"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.slug);
                      setCurrentPage(1);
                    }}
                    className={`block text-sm w-full text-left py-1.5 px-2 rounded transition-colors ${
                      selectedCategory === cat.slug
                        ? "bg-primary-50 text-primary-600 font-medium"
                        : "text-neutral-600 hover:text-neutral-900"
                    }`}
                  >
                    {cat.name}
                    <span className="text-neutral-400 ml-1">
                      ({allProducts.filter((p) => p.category === cat.slug).length})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-neutral-600 mb-3">
                Price Range
              </h3>
              <div className="space-y-3">
                <input
                  type="range"
                  min={0}
                  max={50000}
                  step={500}
                  value={priceRange[1]}
                  onChange={(e) => {
                    setPriceRange([priceRange[0], parseInt(e.target.value)]);
                    setCurrentPage(1);
                  }}
                  className="w-full accent-primary-500"
                />
                <div className="flex justify-between text-xs text-neutral-500">
                  <span>₹{priceRange[0].toLocaleString()}</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-neutral-600 mb-3">
                Sizes
              </h3>
              <div className="flex flex-wrap gap-2">
                {allSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`px-3 py-1.5 border rounded-lg text-sm font-medium transition-colors ${
                      selectedSizes.includes(size)
                        ? "bg-primary-500 border-primary-500 text-white"
                        : "border-neutral-200 text-neutral-600 hover:border-primary-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Apply button (mobile) */}
            <button
              onClick={() => setIsFilterOpen(false)}
              className="lg:hidden w-full btn-primary mt-4"
            >
              Show {filteredProducts.length} Results
            </button>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-neutral-400 text-lg mb-2">
                  No products found
                </p>
                <p className="text-sm text-neutral-400">
                  Try adjusting your filters
                </p>
                <button
                  onClick={clearFilters}
                  className="btn-secondary text-sm mt-4"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                  {paginatedProducts.map((product, i) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={i}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-12">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setCurrentPage(i + 1);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={`w-10 h-10 rounded-lg font-medium text-sm transition-colors ${
                          currentPage === i + 1
                            ? "bg-primary-500 text-white"
                            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
