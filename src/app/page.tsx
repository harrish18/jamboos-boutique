"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, ChevronLeft, ChevronRight, Send } from "lucide-react";
import { useState } from "react";
import ClientLayout from "@/components/ClientLayout";
import ProductCard from "@/components/ProductCard";
import { getTrendingProducts, getFeaturedProducts } from "@/data/products";
import { categories } from "@/data/categories";
import { testimonials, instagramPosts, banners } from "@/data/testimonials";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function HomePage() {
  const trendingProducts = getTrendingProducts();
  const featuredProducts = getFeaturedProducts();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [email, setEmail] = useState("");

  return (
    <ClientLayout>
      {/* ============ HERO SECTION ============ */}
      <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={banners[0].image}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/70 via-neutral-900/40 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl text-white"
          >
            <span className="text-primary-300 text-sm font-medium uppercase tracking-[0.2em] mb-4 block">
              Spring / Summer 2024
            </span>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
              {banners[0].title}
            </h1>
            <p className="text-neutral-200 text-lg md:text-xl mb-8 leading-relaxed">
              {banners[0].subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="bg-white text-neutral-900 px-8 py-3.5 rounded-lg font-semibold hover:bg-primary-50 transition-colors flex items-center gap-2"
              >
                Shop Now
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/shop?category=bridal"
                className="border-2 border-white/40 text-white px-8 py-3.5 rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                Explore Bridal
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative floating badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="hidden lg:block absolute right-16 bottom-16"
        >
          <div className="glass rounded-2xl px-6 py-4 text-white">
            <p className="font-heading text-2xl font-bold">500+</p>
            <p className="text-sm text-neutral-200">Designer Collections</p>
          </div>
        </motion.div>
      </section>

      {/* ============ FEATURED CATEGORIES ============ */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <h2 className="section-heading">Shop by Category</h2>
          <p className="section-subheading mx-auto">
            Explore our curated collections tailored for every occasion
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {categories.slice(0, 6).map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/shop?category=${cat.slug}`}
                className="group relative block aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                  <h3 className="text-white font-heading text-lg lg:text-xl font-semibold">
                    {cat.name}
                  </h3>
                  <p className="text-neutral-300 text-sm mt-1">
                    {cat.productCount} Products
                  </p>
                  <span className="inline-flex items-center gap-1 text-primary-300 text-sm font-medium mt-2 group-hover:gap-2 transition-all">
                    Explore <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============ TRENDING PRODUCTS ============ */}
      <section className="bg-neutral-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12"
          >
            <div>
              <h2 className="section-heading">Trending Now</h2>
              <p className="section-subheading">
                The most-loved pieces from our latest collections
              </p>
            </div>
            <Link
              href="/shop"
              className="text-primary-600 font-medium flex items-center gap-1 hover:gap-2 transition-all mt-4 md:mt-0"
            >
              View All <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {trendingProducts.slice(0, 8).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROMOTIONAL BANNER ============ */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <motion.div
          {...fadeInUp}
          className="relative rounded-3xl overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80"
            alt="Sale banner"
            className="w-full h-[300px] md:h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-600/40 flex items-center">
            <div className="px-8 lg:px-16 text-white max-w-lg">
              <span className="text-primary-200 text-sm font-medium uppercase tracking-[0.15em]">
                Limited Time Offer
              </span>
              <h2 className="font-heading text-3xl md:text-5xl font-bold mt-2 mb-3">
                Up to 40% Off
              </h2>
              <p className="text-neutral-200 mb-6">
                Shop our exclusive festive collection with incredible savings.
                Don&apos;t miss out!
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-white text-neutral-900 px-7 py-3 rounded-lg font-semibold hover:bg-neutral-100 transition-colors"
              >
                Shop the Sale <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ============ FEATURED PRODUCTS ============ */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 pb-16 lg:pb-24">
        <motion.div
          {...fadeInUp}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <h2 className="section-heading">Editor&apos;s Picks</h2>
            <p className="section-subheading">
              Handpicked selections from our fashion editors
            </p>
          </div>
          <Link
            href="/shop"
            className="text-primary-600 font-medium flex items-center gap-1 hover:gap-2 transition-all mt-4 md:mt-0"
          >
            View All <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {featuredProducts.slice(0, 8).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="bg-neutral-900 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold">
              What Our Customers Say
            </h2>
            <p className="text-neutral-400 text-lg mt-2">
              Real reviews from real fashion lovers
            </p>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                {Array.from({ length: testimonials[currentTestimonial].rating }).map(
                  (_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="fill-amber-400 text-amber-400"
                    />
                  )
                )}
              </div>
              <p className="text-lg md:text-xl text-neutral-200 leading-relaxed italic mb-6">
                &ldquo;{testimonials[currentTestimonial].comment}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-3">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="font-semibold">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-sm text-neutral-400">
                    {testimonials[currentTestimonial].location}
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-center gap-3 mt-8">
              <button
                onClick={() =>
                  setCurrentTestimonial(
                    (prev) => (prev - 1 + testimonials.length) % testimonials.length
                  )
                }
                className="p-2 rounded-full border border-neutral-600 hover:border-white transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    currentTestimonial === i
                      ? "bg-primary-400"
                      : "bg-neutral-600"
                  }`}
                />
              ))}
              <button
                onClick={() =>
                  setCurrentTestimonial(
                    (prev) => (prev + 1) % testimonials.length
                  )
                }
                className="p-2 rounded-full border border-neutral-600 hover:border-white transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ INSTAGRAM GALLERY ============ */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="section-heading">Follow Us on Instagram</h2>
            <p className="section-subheading mx-auto">
              @jamboosboutique — Tag us to get featured!
            </p>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 lg:gap-3">
            {instagramPosts.map((post, i) => (
              <motion.a
                key={i}
                href="#"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative aspect-square rounded-xl overflow-hidden"
              >
                <img
                  src={post}
                  alt={`Instagram post ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/30 transition-colors flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-2xl">
                    ♥
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ============ NEWSLETTER ============ */}
      <section className="bg-gradient-to-br from-primary-50 to-accent-50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div {...fadeInUp} className="max-w-xl mx-auto text-center">
            <h2 className="section-heading">Stay in Style</h2>
            <p className="text-neutral-500 mt-2 mb-8">
              Subscribe to get exclusive access to new arrivals, special
              offers, and style tips delivered to your inbox.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 input-field"
                required
              />
              <button type="submit" className="btn-primary flex items-center justify-center gap-2">
                Subscribe <Send size={16} />
              </button>
            </form>
            <p className="text-xs text-neutral-400 mt-3">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </motion.div>
        </div>
      </section>
    </ClientLayout>
  );
}
