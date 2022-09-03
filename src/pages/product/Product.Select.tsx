import { FC } from "react";
import { Select } from "antd";
import { CategoryDocument } from "interfaces/Category.Inteface";

interface ProductSelectProps {
  typeSelected: string;
  categories: CategoryDocument[] | undefined;
  handleChange(value: string): void;
}

const { Option } = Select;

const ProductSelect: FC<ProductSelectProps> = ({ typeSelected, categories, handleChange }) => {
  return (
    <div className="product__select">
      <span className="product__select__type">Loại: </span>
      <Select defaultValue={typeSelected} style={{ width: 150 }} onChange={handleChange}>
        <Option value="all">Tất cả</Option>
        {
          categories && categories.map(category => {
            return (
              <Option key={category._id} value={category._id}>{category.name}</Option>
            )
          })
        }
      </Select>
    </div>
  )
}

export default ProductSelect
