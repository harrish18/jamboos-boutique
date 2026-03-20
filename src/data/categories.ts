export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Ethnic Wear",
    slug: "ethnic-wear",
    description: "Traditional Indian outfits with modern elegance",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=80",
    productCount: 48,
  },
  {
    id: "2",
    name: "Western Wear",
    slug: "western-wear",
    description: "Contemporary western fashion for every occasion",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    productCount: 65,
  },
  {
    id: "3",
    name: "Party Wear",
    slug: "party-wear",
    description: "Stunning outfits for parties and celebrations",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80",
    productCount: 34,
  },
  {
    id: "4",
    name: "Bridal Collection",
    slug: "bridal",
    description: "Exquisite bridal wear for your special day",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
    productCount: 22,
  },
  {
    id: "5",
    name: "Seasonal Collection",
    slug: "seasonal",
    description: "Curated picks for the current season",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80",
    productCount: 28,
  },
  {
    id: "6",
    name: "Accessories",
    slug: "accessories",
    description: "Complete your look with premium accessories",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80",
    productCount: 56,
  },
];
