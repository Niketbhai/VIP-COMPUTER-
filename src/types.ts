export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  specs: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  inStock: boolean;
  isNew?: boolean;
  isHot?: boolean;
  rating?: number;
  warranty?: string;
  processor?: string;
  memory?: string;
  storage?: string;
  display?: string;
  keyFeatures?: string[];
  description?: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  type: string;
  subject: string;
  message: string;
  status: 'High Priority' | 'Urgent' | 'General' | 'Bulk Order' | 'Pending';
  date: string;
}

export interface BuilderPart {
  id: string;
  name: string;
  category: 'CPU' | 'GPU' | 'Motherboard' | 'RAM' | 'Storage' | 'Power Supply' | 'Case' | 'Cooler';
  brand: string;
  price: number;
  specs: string;
  image?: string;
}
