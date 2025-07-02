export interface Food {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
  preparationTime: number;
}

export interface FoodFilter {
  category: string;
  minPrice: number;
  maxPrice: number;
  sortBy: string;
}

export interface FoodState {
  foods: Food[];
  loading: boolean;
  error: string | null;
  filters: FoodFilter;
}