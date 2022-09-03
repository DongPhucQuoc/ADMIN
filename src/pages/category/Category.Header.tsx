import { Select } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

interface CategoryHeaderDocument {
  nameSelected: string;
  handleSelectName(value: string): void;
}

const { Option } = Select;

const CategoryHeader = ({ nameSelected, handleSelectName }: CategoryHeaderDocument) => {
  return (
    <div className="category__header"> 
      <div className="category__header__item__text">
        <span className={nameSelected === "increment" ? "category__header__item__selected" : ""}>
          <ArrowUpOutlined className="category__header__item__arrow" onClick={() => handleSelectName("increment")} />
        </span>
        <span className={nameSelected === "decrement" ? "category__header__item__selected" : ""}>
          <ArrowDownOutlined className="category__header__item__arrow" onClick={() => handleSelectName("decrement")} />
        </span>
        <span>Tên loại</span>
      </div>
      <span className="category__header__item__text">Người tạo</span>
      <span className="category__header__item__text">Người chỉnh sửa</span>
      <span className="category__header__item__text">Sửa/Xóa</span>
    </div>
  )
}

export default CategoryHeader
