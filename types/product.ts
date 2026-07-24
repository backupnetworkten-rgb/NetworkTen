export interface ProductSpecification {
  key: string;
  value: string;
}

export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  salePrice: number;
  category: string;
  brand: string;
  stock: number;
  image: string;
  images?: string[];
  specifications?: ProductSpecification[];
  datasheet?: string;
  video?: string;
  featured: boolean;
  status: string;
  createdAt: number;
}