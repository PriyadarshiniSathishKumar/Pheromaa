
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  gender: 'men' | 'women' | 'unisex';
  images: string[];
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  ribbonColor: 'pink' | 'green' | 'purple';
  isLimited: boolean;
  size: number;
  inStock: boolean;
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: Address;
  paymentMethod: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface Address {
  fullName: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}
