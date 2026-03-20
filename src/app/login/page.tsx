"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, isLoading } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = await login(email, password);
    if (success) {
      router.push("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
          alt="Fashion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/60 to-neutral-900/20 flex items-end">
          <div className="p-12">
            <h2 className="font-heading text-4xl font-bold text-white mb-2">
              Welcome Back to <span className="text-primary-300 font-bold">JAMBOOS</span>
            </h2>
            <p className="text-neutral-200">
              Sign in to access your orders, wishlist, and exclusive offers.
            </p>
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link href="/" className="inline-block mb-8">
            <h1 className="font-heading text-3xl font-bold">
              JAMBOOS
            </h1>
          </Link>

          <h2 className="text-2xl font-semibold mb-1">Sign In</h2>
          <p className="text-neutral-500 mb-8">
            Enter your credentials to continue shopping
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field pl-11"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input-field pl-11 pr-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-neutral-600">
                <input type="checkbox" className="rounded border-neutral-300" />
                Remember me
              </label>
              <a href="#" className="text-primary-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
              {!isLoading && <ArrowRight size={16} />}
            </button>
          </form>

          <p className="text-center text-sm text-neutral-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary-600 font-medium hover:underline">
              Create one
            </Link>
          </p>

          {/* Demo credentials */}
          <div className="mt-8 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
            <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">
              Demo Credentials
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                onClick={() => {
                  setEmail("admin@jamboos.com");
                  setPassword("admin123");
                }}
                className="p-2.5 bg-white rounded-lg border border-neutral-200 hover:border-primary-300 transition-colors text-left"
              >
                <p className="font-medium text-neutral-700">Admin</p>
                <p className="text-neutral-400">admin@jamboos.com</p>
              </button>
              <button
                onClick={() => {
                  setEmail("priya@example.com");
                  setPassword("user123");
                }}
                className="p-2.5 bg-white rounded-lg border border-neutral-200 hover:border-primary-300 transition-colors text-left"
              >
                <p className="font-medium text-neutral-700">User</p>
                <p className="text-neutral-400">priya@example.com</p>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
