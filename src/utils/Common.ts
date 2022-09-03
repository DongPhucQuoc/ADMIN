export const setTokenLocal = (token: string) => {
  sessionStorage.setItem("token", token);
};

export const getTokenLocal = () => {
  return sessionStorage.getItem("token") || null;
};

export const removeUserSession = () => {
  sessionStorage.removeItem("token");
};

export const formatMoney = (money: number) => {
  return (money?.toString()?.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ") || 0) + " đồng";
};

export const priceSize = {
  S: 0,
  M: 5000,
  L: 10000,
};

export const ConvertDate = (date: Date) => {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

export const FormatDate = (timestamp: any) => {
  const x = new Date(timestamp);
  const hh = x.getHours();
  const min = x.getMinutes();
  const dd = x.getDate();
  const mm = x.getMonth() + 1;
  const yy = x.getFullYear();
  return hh + "h:" + min + "p " + dd + "/" + mm + "/" + yy;
};

export const EnumURL = {
  baseUrl: "http://127.0.0.1:2000",
  login: "/login",
  category: "/category",
  categories: "/categories",
  product: "/product",
  products: "/products",
  sort: {
    product: {
      name: "/products/sort/name",
      price: "/products/sort/price",
    },
    category: "/categories/sort",
  },
  order: "/order",
  orders: "/orders",
  orderUpdate: "/order/update",
  statistic: "/statistic",
  image: "image",
  profile: "/profile",
  staff: "/staff",
  receipt: "/receipt",
};

export const AnimationModal = (setVisible: any, setConfirmLoading: any) => {
  setVisible(false);
  setConfirmLoading(false);
};

export const ConvertStatus = (status: string) => {
  switch (status) {
    case "unconfirmed": {
      return "Chưa xác nhận";
    }
    case "waiting": {
      return "Đang chờ";
    }
    case "shipping": {
      return "Đang giao";
    }
    case "shipped": {
      return "Đã giao";
    }
    case "canceled": {
      return "Đã hủy";
    }
  }
};

export const ConvertStatusButton = (status: string) => {
  switch (status) {
    case "unconfirmed": {
      return "Xác nhận";
    }
    case "waiting": {
      return "Đang giao";
    }
    case "shipping": {
      return "Đã nhận";
    }
  }
};

export const RefeshRoute = (history: any, path: string) => {
  history.push("/");
  history.push(path);
};

export const FormatQuantityStock = (quantity: number) => {
  return (quantity/1000).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ") + " kg";
}

export const FormatQuantityStockV2 = (quantity: number) => {
  return `${quantity} đvt`
}
