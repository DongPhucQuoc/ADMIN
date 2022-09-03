import { useState, useEffect } from "react";
import Header from "components/Header";
import SHeader from "./Receipt.Header";
import ReceiptDocument from "interfaces/Receipt.Interface";
import { GetListReceipt } from "services/Setting.Service";
import { FormatDate, formatMoney, FormatQuantityStockV2 } from "utils/Common";
import Spinner from "components/Spinner";
import Add from "./Receipt.Modal.Add";
import Edit from "./Receipt.Modal.Edit";
import Delete from "./Receipt.Modal.Delete";

const ReceiptForm = () => {
  const [receipts, setReceipts] = useState<ReceiptDocument[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [id, setID] = useState<string>("");

  useEffect(() => {
    GetListReceipt()
      .then((res) => {
        setLoading(false);
        console.log(res.data.result)
        setReceipts(res.data.result);
      })
      .catch(e => console.log(e));
  }, []);

  const handleClickEdit = (id: string) => {
    setID(id);
    setShowEdit(true);
  }

  const handleClickDelete = (id: string) => {
    setID(id);
    setShowDelete(true);
  }

  return (
    <>
      <div className="receipt">
        <Header headerName="Phiếu nhập" setShowAdd={setShowAdd} />
        <SHeader />
        {
          loading ? <Spinner /> : (
            <>
              {
                receipts && receipts.map(item => {
                  return (
                    <div className="receipt__item" key={item._id}>
                      <span className="receipt__item__text">{FormatDate(item.dateGet)}</span>
                      <span className="receipt__item__text">{item.product[0].name}</span>
                      <span className="receipt__item__text">{FormatQuantityStockV2(item.quantityStock)}</span>
                      <span className="receipt__item__text">{formatMoney(item.price)}</span>
                      <span className="receipt__item__text">{item.user[0].lastName + ' ' + item.user[0].firstName}</span>
                      <span className="receipt__item__text">
                        <span className="receipt__item__text__button" onClick={() => handleClickEdit(item._id)}>📝</span>
                        <span className="receipt__item__text__button" onClick={() => handleClickDelete(item._id)}>🗑️</span>
                      </span>
                    </div>
                  )
                })
              }
              {
                showAdd && <Add show={showAdd} setShow={setShowAdd} />
              }
              {
                showEdit && <Edit id={id} show={showEdit} setShow={setShowEdit} />
              }
              {
                showDelete && <Delete id={id} show={showDelete} setShow={setShowDelete} />
              }
            </>
          )
        }
      </div>
    </>
  )
}

export default ReceiptForm
