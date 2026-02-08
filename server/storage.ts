import { orders, type Order, type InsertOrder } from "@shared/schema";

export interface IStorage {
  createOrder(order: InsertOrder): Promise<Order>;
}

export class MemStorage implements IStorage {
  private orders: Map<number, Order>;
  private currentId: number;

  constructor() {
    this.orders = new Map();
    this.currentId = 1;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentId++;
    const order: Order = { ...insertOrder, id, createdAt: new Date() };
    this.orders.set(id, order);
    return order;
  }
}

export const storage = new MemStorage();
