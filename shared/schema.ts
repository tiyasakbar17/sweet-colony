import { z } from 'zod';

// Simple TypeScript types for in-memory storage (no database required)

export interface Order {
  id: number;
  name: string;
  class: string;
  whatsapp: string;
  paymentMethod: string;
  total: number;
  items: any; // JSON array of cart items
  createdAt: Date;
}

export type InsertOrder = Omit<Order, 'id' | 'createdAt'>;

export const insertOrderSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  class: z.string().min(1, 'Class is required'),
  whatsapp: z.string().min(1, 'WhatsApp is required'),
  paymentMethod: z.string().min(1, 'Payment method is required'),
  total: z.number().min(1, 'Total is required'),
  items: z.array(z.any()).min(1, 'Items are required'),
});

export const orderSchema = z.object({
  id: z.number(),
  name: z.string(),
  class: z.string(),
  whatsapp: z.string(),
  paymentMethod: z.string(),
  total: z.number(),
  items: z.array(z.any()),
  createdAt: z.date(),
});