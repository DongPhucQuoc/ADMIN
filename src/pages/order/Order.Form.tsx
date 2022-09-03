import { useState, useEffect } from 'react'
import Spinner from 'components/Spinner';
import { GetListOrders, GetListOrdersWithStatus, GetListOrderSortedByTime, OrderIsPaid } from 'services/Setting.Service';
import OrderHeader from './Order.Top';
import HeaderBottom from "./Order.Header";
import { OrderDocument } from 'interfaces/Order.Interface';
import { Button, Pagination } from "antd";
import { formatMoney, ConvertStatus, ConvertStatusButton, FormatDate } from 'utils/Common';
import OrderModal from './Order.Modal';

const OrderForm = () => {
  const [orders, setOrders] = useState<OrderDocument[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [show, setShow] = useState<boolean>(false);
  const [id, setID] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pageLength, setPageLength] = useState<number>(6);

  useEffect(() => {
    GetListNormal();
  }, []);

  const handleChange = (value: string) => {
    setLoading(true);
    setPageLength(6);
    if (value === "all") {
      GetListNormal();
    }
    else {
      GetListOrdersWithStatus(value)
        .then(res => {
          setLoading(false);
          setOrders(res.data.result);
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
        })

    }
  }

  const GetListNormal = () => {
    GetListOrders(page)
      .then(res => {
        setPageLength(res.data.length);
        setOrders(res.data.result);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }

  const handleClickChangeStatus = (_id: string, status: string) => {
    setShow(true);
    setID(_id);
    if (status === "unconfirmed") {
      setStatus("waiting");
    }
    if (status === "waiting") {
      setStatus("shipping");
    }
    if (status === "shipping") {
      OrderIsPaid(_id)
        .catch(e => console.log(e));
    }
  }

  const handleChangeTypeTime = (value: string) => {
    setLoading(true);
    GetListOrderSortedByTime(value, page)
      .then(res => {
        setOrders(res.data.result);
        setPageLength(res.data.length);
        setLoading(false);
      })
      .catch(e => console.log(e));
  }

  const handleChangePage = (current: any) => {
    setPage(current);
  }

  return (
    <>
      <div className="order">
        <OrderHeader handleChange={handleChange} />
        <HeaderBottom handleChangeTypeTime={handleChangeTypeTime} />
        {
          loading ? (
            <Spinner />
          ) : (
            <>
              {
                orders && orders.map(order => {
                  return (
                    <div className="order__item" key={order._id}>
                      <span className="order__item__text">{FormatDate(order.requiredDate.toString())}</span>
                      <span className="order__item__text">{order.infoGuest.lastName + " " + order.infoGuest.firstName}</span>
                      <span className="order__item__text">{formatMoney(order.total)}</span>
                      <span className="order__item__text">{order.infoGuest.address}</span>
                      <span className="order__item__text">{ConvertStatus(order.status)}</span>
                      <span className="order__item__button">
                        {
                          ConvertStatusButton(order.status) && (
                            <Button onClick={() => handleClickChangeStatus(order._id, order.status)}>
                              {ConvertStatusButton(order.status)}
                            </Button>
                          )
                        }
                      </span>
                      <span className="order__item__button">
                        {
                          order.paid ? "Đã thanh toán" : "Chưa thanh toán" 
                        }
                      </span>
                    </div>
                  )
                })
              }
              {
                show === true && (
                  <OrderModal
                    _id={id}
                    status={status}
                    show={show}
                    setShow={setShow}
                  />
                )
              }
            </>
          )
        }
      </div>
      <div className="product__pagination">
        <Pagination defaultCurrent={1} onChange={handleChangePage} total={(pageLength / 6) * 10} />
      </div>
    </>
  )
}

export default OrderForm
