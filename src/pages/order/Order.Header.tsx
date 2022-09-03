import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { FC } from "react";

interface OrderHeaderProps {
  handleChangeTypeTime(value: string): void;
}

const OrderHeader: FC<OrderHeaderProps> = ({ handleChangeTypeTime }) => {
  return (
    <div className="order__header">
      <span className="order__header__text">
        <ArrowUpOutlined onClick={() => handleChangeTypeTime("increment")} />
        <ArrowDownOutlined onClick={() => handleChangeTypeTime("decrement")} />
        Thời gian
      </span>
      <span className="order__header__text">Khách hàng</span>
      <span className="order__header__text">Tổng</span>
      <span className="order__header__text">Địa chỉ</span>
      <span className="order__header__text">Trạng thái đơn</span>
      <span className="order__header__text">Thay đổi</span>
      <span className="order__header__text">Thanh toán</span>
    </div>
  )
}

export default OrderHeader
