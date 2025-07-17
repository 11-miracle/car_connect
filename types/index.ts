export interface Car {
  id: number;
  name: string;
  model: string;
  year: number;
  price: number;
  image: string;
  description: string;
}

export interface Customer {
  id?: number;
  name: string;
  email: string;
  phone: string;
  carInterest: string;
  message?: string;
  createdAt?: Date;
}