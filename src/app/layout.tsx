import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jamboos Boutique | Premium Fashion & Designer Collections",
  description:
    "Discover curated designer collections, ethnic wear, western fashion, and exclusive party wear at Jamboos Boutique. Shop the latest trends with premium quality.",
  keywords: [
    "fashion",
    "boutique",
    "designer wear",
    "ethnic wear",
    "western wear",
    "party dresses",
    "women fashion",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
