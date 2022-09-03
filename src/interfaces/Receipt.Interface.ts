export default interface ReceiptDocument {
  _id: string;
  dateGet: Date;
  quantityStock: number;
  price: number;
  category: string;
  user: any;
  product: any;
}