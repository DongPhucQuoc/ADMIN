import { Select } from "antd";

interface OrderTopDocument {
  handleChange(value: string) : void;
}

const { Option } = Select;

const OrderTop = ({ handleChange } : OrderTopDocument) => {
  const handleSelect = (value: string) => {
    handleChange(value);
  }

  return (
    <div className="order__top">
      <h3 className="order__top__title">Đơn hàng</h3>
      <Select defaultValue="all" style={{ width: 150 }} onChange={handleSelect}>
        <Option value="all">Tất cả</Option>
        <Option value="unconfirmed">Chưa xác nhận</Option>
        <Option value="waiting">Đang chờ</Option>
        <Option value="shipping">Đang giao</Option>
        <Option value="shipped">Đã giao</Option>
        <Option value="cancled">Đã hủy</Option>
      </Select>
    </div>
  )
}

export default OrderTop
