import type { Food } from "./foodTypes";
export interface OrderItem {
_id:string;
   food: Food;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  token: string;
  items: OrderItem[];
  totalAmount: number;
  deliveryAddress: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: "cash" | "card";
  paymentStatus: "pending" | "paid" | "failed";
  createdAt: string;
  updatedAt: string;
}

export interface OrderState {
  orders: Order[];
  isOrderSubmitting: boolean;
  isOrdercreated:boolean;
  isOrderfetching:boolean;
  error: string | null;
}