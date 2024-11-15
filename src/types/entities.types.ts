export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends BaseEntity {
  email: string;
  password: string;
  role: Role;
  isActive: boolean;
}

export enum Role {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}

export interface IProduct extends BaseEntity {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}

export interface ICustomer extends BaseEntity {
  name: string;
  email: string;
  address: string;
  phone: string;
  userId: string;
}

export enum OrderStatus {
  PENDING = 'Pending',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
}

export interface IOrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface IOrder extends BaseEntity {
  customerId: string;
  orderDate: Date;
  status: OrderStatus;
  items: IOrderItem[];
  total: number;
}
