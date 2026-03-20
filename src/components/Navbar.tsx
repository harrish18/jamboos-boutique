"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  LogOut,
  Package,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useAuthStore } from "@/store/auth-store";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  const { getItemCount, setCartOpen } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/shop?category=ethnic-wear", label: "Ethnic" },
    { href: "/shop?category=western-wear", label: "Western" },
    { href: "/shop?category=party-wear", label: "Party" },
  ];

  const itemCount = mounted ? getItemCount() : 0;
  const wishlistCount = mounted ? wishlistItems.length : 0;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-white"
        }`}
      >
        {/* Top announcement bar */}
        <div className="bg-neutral-900 text-white text-center py-1.5 text-xs md:text-sm font-medium tracking-wide">
          ✨ Free Shipping on orders above ₹1,999 | Use code{" "}
          <span className="text-primary-300 font-bold">JAMBOOS10</span> for 10% off
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 -ml-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <h1 className="font-heading text-2xl font-bold tracking-tight">
                JAMBOOS
              </h1>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-neutral-600 hover:text-primary-600 transition-colors text-sm font-medium uppercase tracking-wider"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Search + Icons */}
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Search (desktop) */}
              <div className="hidden md:flex items-center bg-neutral-100 rounded-full px-4 py-2 gap-2 w-48 lg:w-64">
                <Search size={16} className="text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm outline-none w-full placeholder:text-neutral-400"
                />
              </div>

              {/* Wishlist */}
              <Link
                href="/profile/wishlist"
                className="relative p-2 hover:bg-neutral-100 rounded-full transition-colors"
              >
                <Heart size={20} className="text-neutral-700" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-primary-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 hover:bg-neutral-100 rounded-full transition-colors"
              >
                <ShoppingBag size={20} className="text-neutral-700" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-primary-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                >
                  {user ? (
                    <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-xs font-bold">
                      {user.name[0]}
                    </div>
                  ) : (
                    <User size={20} className="text-neutral-700" />
                  )}
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-neutral-100 overflow-hidden"
                    >
                      {user ? (
                        <>
                          <div className="px-4 py-3 border-b border-neutral-100">
                            <p className="font-medium text-sm">{user.name}</p>
                            <p className="text-xs text-neutral-500">
                              {user.email}
                            </p>
                          </div>
                          <div className="py-1">
                            {user.role === "admin" && (
                              <Link
                                href="/admin"
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                                onClick={() => setIsProfileOpen(false)}
                              >
                                <LayoutDashboard size={16} />
                                Admin Dashboard
                              </Link>
                            )}
                            <Link
                              href="/profile"
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <User size={16} />
                              My Profile
                            </Link>
                            <Link
                              href="/profile/orders"
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <Package size={16} />
                              My Orders
                            </Link>
                            <Link
                              href="/profile/settings"
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <Settings size={16} />
                              Settings
                            </Link>
                          </div>
                          <div className="border-t border-neutral-100 py-1">
                            <button
                              onClick={() => {
                                logout();
                                setIsProfileOpen(false);
                              }}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                            >
                              <LogOut size={16} />
                              Logout
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="p-4 space-y-2">
                          <Link
                            href="/login"
                            className="block w-full text-center btn-primary text-sm py-2.5"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            Sign In
                          </Link>
                          <Link
                            href="/signup"
                            className="block w-full text-center btn-secondary text-sm py-2.5"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            Create Account
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-white border-t border-neutral-100 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {/* Mobile search */}
                <div className="flex items-center bg-neutral-100 rounded-full px-4 py-2.5 gap-2 mb-4">
                  <Search size={16} className="text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="bg-transparent text-sm outline-none w-full"
                  />
                </div>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-2.5 text-neutral-700 hover:text-primary-600 font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-[calc(4rem+28px)] lg:h-[calc(5rem+28px)]" />
    </>
  );
}
