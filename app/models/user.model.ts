export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  medicalHistory?: string[];
  orders?: Order[];
}

export type UserRole = 'user' | 'admin';

export interface Order {
  id: string;
  items: { medicineId: string; quantity: number }[];
  totalAmount: number;
  date: string;
  status: 'processing' | 'delivered' | 'cancelled';
  address: string;
}