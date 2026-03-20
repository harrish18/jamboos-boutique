export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  shippingAddress: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

export const orders: Order[] = [
  {
    id: "ORD-001",
    userId: "user-1",
    items: [
      {
        productId: "5",
        name: "Pearl Embellished Lehenga Set",
        price: 18999,
        quantity: 1,
        size: "M",
        color: "Blush Pink",
        image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=200&q=80",
      },
    ],
    total: 18999,
    status: "delivered",
    shippingAddress: {
      fullName: "Priya Sharma",
      phone: "+91 9876543211",
      street: "42, Rose Garden Apartments, MG Road",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
    },
    paymentMethod: "UPI",
    createdAt: "2024-02-15",
    updatedAt: "2024-02-20",
  },
  {
    id: "ORD-002",
    userId: "user-1",
    items: [
      {
        productId: "4",
        name: "Boho Chic Maxi Dress",
        price: 2299,
        quantity: 1,
        size: "S",
        color: "Sage Green",
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=200&q=80",
      },
      {
        productId: "9",
        name: "Satin Slip Dress",
        price: 2499,
        quantity: 1,
        size: "S",
        color: "Champagne",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&q=80",
      },
    ],
    total: 4798,
    status: "shipped",
    shippingAddress: {
      fullName: "Priya Sharma",
      phone: "+91 9876543211",
      street: "42, Rose Garden Apartments, MG Road",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
    },
    paymentMethod: "Credit Card",
    createdAt: "2024-03-10",
    updatedAt: "2024-03-12",
  },
  {
    id: "ORD-003",
    userId: "user-2",
    items: [
      {
        productId: "2",
        name: "Midnight Velvet Cocktail Dress",
        price: 3499,
        quantity: 1,
        size: "M",
        color: "Midnight Blue",
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=200&q=80",
      },
    ],
    total: 3499,
    status: "pending",
    shippingAddress: {
      fullName: "Ananya Patel",
      phone: "+91 9876543212",
      street: "15, Lajpat Nagar, Central Market",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110024",
    },
    paymentMethod: "Debit Card",
    createdAt: "2024-03-18",
    updatedAt: "2024-03-18",
  },
  {
    id: "ORD-004",
    userId: "user-2",
    items: [
      {
        productId: "13",
        name: "Bridal Red Lehenga Choli",
        price: 45999,
        quantity: 1,
        size: "M",
        color: "Bridal Red",
        image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=200&q=80",
      },
    ],
    total: 45999,
    status: "confirmed",
    shippingAddress: {
      fullName: "Ananya Patel",
      phone: "+91 9876543212",
      street: "15, Lajpat Nagar, Central Market",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110024",
    },
    paymentMethod: "Net Banking",
    createdAt: "2024-03-15",
    updatedAt: "2024-03-16",
  },
];
