export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  product: string;
  location: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
    comment: "Absolutely stunning lehenga! The embroidery work is even more beautiful in person. Got so many compliments at my sister's wedding. Will definitely order again!",
    product: "Pearl Embellished Lehenga Set",
    location: "Mumbai",
  },
  {
    id: "2",
    name: "Ananya Patel",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 5,
    comment: "The quality of the fabric is premium. I ordered the cocktail dress and it fits like a dream. Fast delivery too — received it within 3 days!",
    product: "Midnight Velvet Cocktail Dress",
    location: "Delhi",
  },
  {
    id: "3",
    name: "Meera Krishnan",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
    rating: 4,
    comment: "Love the boho maxi dress! Perfect for my Goa trip. The material is breathable and the print is gorgeous. Slightly longer than expected but still lovely.",
    product: "Boho Chic Maxi Dress",
    location: "Bangalore",
  },
  {
    id: "4",
    name: "Riya Gupta",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80",
    rating: 5,
    comment: "Jamboos Boutique never disappoints! This is my 5th order and each piece has been incredible. The Banarasi saree is a family heirloom quality piece. Worth every penny!",
    product: "Ivory Banarasi Silk Saree",
    location: "Jaipur",
  },
];

export const instagramPosts = [
  "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&q=80",
  "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=300&q=80",
  "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&q=80",
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&q=80",
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&q=80",
];

export const banners = [
  {
    id: "1",
    title: "New Season, New You",
    subtitle: "Discover the Spring/Summer 2024 Collection",
    cta: "Shop Now",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80",
    link: "/shop",
  },
  {
    id: "2",
    title: "Bridal Dreams",
    subtitle: "Handcrafted lehengas for your perfect day",
    cta: "Explore Bridal",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=1200&q=80",
    link: "/shop?category=bridal",
  },
];
