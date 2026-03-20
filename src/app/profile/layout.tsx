"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Package,
  Heart,
  MapPin,
  Settings,
  User,
  ChevronRight,
} from "lucide-react";
import ClientLayout from "@/components/ClientLayout";
import { useAuthStore } from "@/store/auth-store";

const profileLinks = [
  { href: "/profile", label: "Overview", icon: User },
  { href: "/profile/orders", label: "My Orders", icon: Package },
  { href: "/profile/wishlist", label: "Wishlist", icon: Heart },
  { href: "/profile/addresses", label: "Addresses", icon: MapPin },
  { href: "/profile/settings", label: "Settings", icon: Settings },
];

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuthStore();

  if (!user) {
    return (
      <ClientLayout>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <User size={64} className="text-neutral-200 mx-auto mb-6" />
          <h1 className="font-heading text-3xl font-bold mb-3">
            Sign in to view your profile
          </h1>
          <p className="text-neutral-500 mb-8">
            Access your orders, wishlist, and account settings
          </p>
          <Link href="/login" className="btn-primary">
            Sign In
          </Link>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="card p-6 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-lg">
                  {user.name[0]}
                </div>
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-neutral-400">{user.email}</p>
                </div>
              </div>
            </div>

            <nav className="card overflow-hidden">
              {profileLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary-50 text-primary-600 border-r-2 border-primary-500"
                        : "text-neutral-600 hover:bg-neutral-50"
                    }`}
                  >
                    <Icon size={18} />
                    {link.label}
                    <ChevronRight size={14} className="ml-auto text-neutral-300" />
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 min-w-0"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </ClientLayout>
  );
}
