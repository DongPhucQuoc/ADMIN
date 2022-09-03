import HttpService from "./getWays/Setting.GetWay";
import { ProductDocument } from "../interfaces/Product.Interface";
import { EnumURL, getTokenLocal } from "../utils/Common";
import axios from "axios";
import UserDocument from "interfaces/User.Interface";
const headers = {
  headers: {
    Authorization: "Bearer " + getTokenLocal(),
  },
}

export const CreateAccountForStaff = async (user: UserDocument) => {
  return await HttpService.post(EnumURL.staff, {
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    phone: user.phone,
    email: user.email,
    password: user.password,
    cPassword: user.cPassword,
  }, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const Login = async (email: string, password: string) => {
  console.log('call login function api')
  return HttpService.post(EnumURL.login, {
    email: email,
    password: password,
  });
};

export const GetProfile = async () => {
  return await HttpService.get(EnumURL.profile, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

//---CATEGORY
export const AddCategory = async (name: String) => {
  return await HttpService.post(`${EnumURL.category}`, {
    name: name,
  }, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const GetCategory = async (_id: String) => {
  return await HttpService.get(`${EnumURL.category}/${_id}`, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const GetListCategories = async () => {
  return await HttpService.get(EnumURL.categories, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const GetListCategorySorted = async (type: string) => {
  return await HttpService.post(EnumURL.sort.category, {
    type: type,
  }, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const EditCategory = async (_id: String, name: String) => {
  return await HttpService.put(`${EnumURL.category}/${_id}`, {
    name: name,
  }, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const DeleteCategory = async (_id: String) => {
  return await HttpService.delete(`${EnumURL.category}/${_id}`, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

//---PRODUCTS
export const AddProduct = async (Product: ProductDocument) => {
  return await HttpService.post(EnumURL.product, {
    name: Product.name,
    price: Product.price,
    images: Product.images,
    description: Product.description,
    category: Product.category._id,
  }, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const GetLengthOfProduct = async () => {
  return await HttpService.get(`${EnumURL.products}/length`, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const GetLengthOfProductWithCategory = async (category: string) => {
  return await HttpService.get(`${EnumURL.products}/length/${category}`, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const GetProduct = async (_id: string) => {
  return await HttpService.get(`${EnumURL.product}/${_id}`, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const GetListProducts = async () => {
  return await HttpService.get(EnumURL.products, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const GetListProductWithPage = async (page: number) => {
  return await HttpService.get(`${EnumURL.products}/search/${page}`, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const GetListProductSortByName = async (type: string) => {
  return await HttpService.post(EnumURL.sort.product.name, {
    type: type,
  }, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const GetListProductSortByNameWithPage = async (
  page: number,
  type: string
) => {
  return await HttpService.post(`${EnumURL.sort.product.name}/${page}`, {
    type: type,
  }, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const GetListProductSortedByPrice = async (type: string) => {
  return await HttpService.post(EnumURL.sort.product.price, {
    type: type,
  }, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const GetListProductSortedByPriceWithPage = async (
  page: number,
  type: string
) => {
  return await HttpService.post(`${EnumURL.sort.product.price}/${page}`, {
    type: type,
  }, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const GetListProductWithCategory = async (idCategory: string) => {
  return await HttpService.get(`${EnumURL.products}/${idCategory}`, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const EditProduct = async (Product: ProductDocument) => {
  console.log(Product);
  return await HttpService.put(`${EnumURL.product}/${Product._id}`, {
    name: Product.name,
    price: Product.price,
    images: Product.images,
    description: Product.description,
    category: Product.category._id,
  }, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const DeleteProduct = async (_id: string) => {
  return await HttpService.delete(`${EnumURL.product}/${_id}`, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

//---ORDER
export const GetListOrders = async (page: number) => {
  return await HttpService.get(`${EnumURL.orders}/${page}`, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const GetListOrdersWithStatus = async (status: string) => {
  return await HttpService.get(`${EnumURL.orders}/status/${status}`, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const UpdateStatusOrder = async (id: string, status: string) => {
  return await HttpService.post(`${EnumURL.orderUpdate}/${id}`, {
    status: status,
  }, headers);
};

export const OrderIsPaid = async (id: string) => {
  return await HttpService.post(`${EnumURL.order}/paid/${id}`, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const GetListOrderSortedByTime = async (type: string, page: number) => {
  return await HttpService.post(`${EnumURL.order}/sorted`, {
    type: type,
    page: page,
  }, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

//Statistic
export const StatisticOrderByDay = async (dateString: string) => {
  return await HttpService.post(`${EnumURL.statistic}/day`, {
    dateString: dateString,
  }, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const StatisticOrderByMonth = async (year: number) => {
  return await HttpService.post(`${EnumURL.statistic}/month`, {
    year: year,
  }, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const StatisticOrderByYear = async () => {
  return await HttpService.get(`${EnumURL.statistic}/year`, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

//Image
export const UploadImage = async (file: any, id: string) => {
  const fd = new FormData();
  fd.append("image", file);
  return await axios.post(`${EnumURL.baseUrl}/${EnumURL.image}/${id}`, fd, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const UpdateImage = async (file: any, id: string) => {
  const fd = new FormData();
  fd.append("image", file);
  return await axios.put(`${EnumURL.baseUrl}/${EnumURL.image}/${id}`, fd, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

//Receipt
export const GetListReceipt = async () => {
  return await HttpService.get(EnumURL.receipt, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const GetReceiptByID = async (id: string) => {
  return await HttpService.get(`${EnumURL.receipt}/${id}`, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const AddReceipt = async (
  quantityStock: number,
  price: number,
  categoryID: string,
  productName: string,
) => {
  return await HttpService.post(EnumURL.receipt, {
    quantityStock: quantityStock,
    price: price,
    category: categoryID,
    product: productName,
  }, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const EditReceipt = async (
  id: string,
  quantityStock: number,
  price: number,
  categoryID: string
) => {
  return await HttpService.put(`${EnumURL.receipt}/${id}`, {
    quantityStock: quantityStock,
    price: price,
    category: categoryID,
  }, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const DeleteReceipt = async (id: string) => {
  return await HttpService.delete(`${EnumURL.receipt}/${id}`, {
    headers: {
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};
