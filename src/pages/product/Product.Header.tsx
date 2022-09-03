import { Select } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

interface ProductHeaderDocument {
  nameSelected: string;
  priceSelected: string;
  handleSelectName(value: string): void;
  handleSelectPrice(value: string): void;
}

const { Option } = Select;

const ProductHeader = ({ nameSelected, priceSelected, handleSelectName, handleSelectPrice }: ProductHeaderDocument) => {
  return (
    <div className="product__header">
      <div className="product__header__item__text">
        <span className={nameSelected === "increment" ? "product__header__item__selected" : ""}>
          <ArrowUpOutlined className="product__header__item__arrow" onClick={() => handleSelectName("increment")} />
        </span>
        <span className={nameSelected === "decrement" ? "product__header__item__selected" : ""}>
          <ArrowDownOutlined className="product__header__item__arrow" onClick={() => handleSelectName("decrement")} />
        </span>
        <span>Tên sản phẩm</span>
      </div>
      <span className="product__header__item__text">Hình ảnh</span>
      <div className="product__header__item__text">
        <span className={priceSelected === "decrement" ? "product__header__item__selected" : ""}>
          <ArrowUpOutlined className="product__header__item__arrow" onClick={() => handleSelectPrice("decrement")} />
        </span>
        <span className={priceSelected === "increment" ? "product__header__item__selected" : ""}>
          <ArrowDownOutlined className="product__header__item__arrow" onClick={() => handleSelectPrice("increment")} />
        </span>
        <span>Giá</span>
      </div>
      <span className="product__header__item__text">Mô tả</span>
      <span className="product__header__item__text">Số lượng</span>
      <span className="product__header__item__text">Sửa</span>
      <span className="product__header__item__text">Xóa</span>
    </div>
  )
}

export default ProductHeader
