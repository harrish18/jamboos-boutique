import Link from "next/link";
import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="font-heading text-2xl font-bold text-white">
              JAMBOOS
            </h2>
            <p className="text-sm leading-relaxed text-neutral-400">
              Curating premium fashion for the modern woman. From ethnic
              elegance to western chic — discover your style at Jamboos Boutique.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 uppercase text-sm tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/shop", label: "Shop All" },
                { href: "/shop?category=ethnic-wear", label: "Ethnic Wear" },
                { href: "/shop?category=western-wear", label: "Western Wear" },
                { href: "/shop?category=party-wear", label: "Party Wear" },
                { href: "/shop?category=bridal", label: "Bridal Collection" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-white mb-4 uppercase text-sm tracking-wider">
              Customer Service
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/profile/orders", label: "Track Order" },
                { href: "#", label: "Returns & Exchange" },
                { href: "#", label: "Size Guide" },
                { href: "#", label: "FAQ" },
                { href: "#", label: "Privacy Policy" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4 uppercase text-sm tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={16} className="text-primary-400 mt-0.5 flex-shrink-0" />
                <span>123 Fashion Street, Linking Road, Mumbai 400050</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={16} className="text-primary-400 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-primary-400 flex-shrink-0" />
                <span>hello@jamboos.in</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-xs text-neutral-500">
            © 2024 Jamboos Boutique. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-neutral-500">
            <a href="#" className="hover:text-neutral-300">
              Terms
            </a>
            <a href="#" className="hover:text-neutral-300">
              Privacy
            </a>
            <a href="#" className="hover:text-neutral-300">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
