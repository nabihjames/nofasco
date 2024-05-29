import { Option } from "./product";

export interface CardTypes {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  options: Option[] | [];
  sku: string;
  quantity: number;
  show: boolean;
  business?: { price: number; unit: number; name: string }[];
}
