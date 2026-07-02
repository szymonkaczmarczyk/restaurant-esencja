export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'starters' | 'mains' | 'desserts' | 'drinks';
  image: string;
  isChefSpecial?: boolean;
}

export interface Reservation {
  id: string;
  tableId: string;
  tableName: string;
  date: string;
  timeSlot: string;
  duration?: string;
  guestsCount: number;
  customerName: string;
  customerPhone: string;
  notes?: string;
  createdAt: string;
}

export interface User {
  username: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface UserRating {
  dishId: string;
  rating: number; // 1 to 5
}
