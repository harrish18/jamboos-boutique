export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  avatar: string;
  phone: string;
  addresses: Address[];
  createdAt: string;
}

export interface Address {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export const users: User[] = [
  {
    id: "admin-1",
    name: "Admin",
    email: "admin@jamboos.com",
    password: "$2a$10$dummyhashforadminpassword123",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    phone: "+91 9876543210",
    addresses: [],
    createdAt: "2024-01-01",
  },
  {
    id: "user-1",
    name: "Priya Sharma",
    email: "priya@example.com",
    password: "$2a$10$dummyhashforuserpassword123",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    phone: "+91 9876543211",
    addresses: [
      {
        id: "addr-1",
        label: "Home",
        fullName: "Priya Sharma",
        phone: "+91 9876543211",
        street: "42, Rose Garden Apartments, MG Road",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        isDefault: true,
      },
    ],
    createdAt: "2024-01-15",
  },
  {
    id: "user-2",
    name: "Ananya Patel",
    email: "ananya@example.com",
    password: "$2a$10$dummyhashforuserpassword456",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    phone: "+91 9876543212",
    addresses: [
      {
        id: "addr-2",
        label: "Home",
        fullName: "Ananya Patel",
        phone: "+91 9876543212",
        street: "15, Lajpat Nagar, Central Market",
        city: "New Delhi",
        state: "Delhi",
        pincode: "110024",
        isDefault: true,
      },
    ],
    createdAt: "2024-02-01",
  },
];

// Plain text passwords for demo login
export const demoCredentials = {
  admin: { email: "admin@jamboos.com", password: "admin123" },
  user: { email: "priya@example.com", password: "user123" },
};
