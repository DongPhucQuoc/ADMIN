export interface ProductDocument {
  _id: string;
  name: string ;
  price: number;
  images: [any];
  description: string;
  category: any;
  receipt: any
}