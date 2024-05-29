export interface Option {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Product {
  _id: string;
  product?: string;
  name: string;
  description: string;
  image: string;
  price: number;
  options: Option[] | [];
  sku: string;
  quantity: number;
  productsData?: Product[];
  show: boolean;
  business?: { price: number; unit: number; name: string }[];
}
