import { useState, useEffect, FC, Dispatch, SetStateAction, ChangeEvent } from 'react';
import { GetReceiptByID, GetListCategories, EditReceipt } from "services/Setting.Service";
import { Modal, Input, notification } from "antd";
import { CategoryDocument } from 'interfaces/Category.Inteface';
import { useHistory } from "react-router-dom";
import { Select } from "antd";
import Spinner from 'components/Spinner';
import { AnimationModal, RefeshRoute } from 'utils/Common';

interface ReceiptAddProps {
  id: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const { Option } = Select;

const ReceiptModalEdit: FC<ReceiptAddProps> = ({ id, show, setShow }) => {
  const [receipt, setReceipt] = useState({ quantityStock: 0, price: 0, category: "" });
  const [categories, setCategories] = useState<CategoryDocument[]>();
  const [loadingReceipt, setLoadingReceipt] = useState<boolean>(true);
  const [loadingCate, setLoadingCate] = useState<boolean>(true);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    GetReceiptByID(id)
      .then(res => {
        setLoadingReceipt(false);
        setReceipt(res.data.result);
      })
      .catch(e => {
        setLoadingReceipt(false);
        console.log(e);
      });
  }, []);

  useEffect(() => {
    GetListCategories()
      .then(res => {
        setLoadingCate(false);
        setCategories(res.data.result);
      })
      .catch(e => {
        setLoadingCate(false);
        console.log(e);
      });
  }, []);

  const handleOk = () => {
    if (receipt.quantityStock === 0 || receipt.price === 0 || !receipt.category) {
      setMessage("Thông tin không được trống");
      return;
    }

    setConfirmLoading(true);
    EditReceipt(id, receipt.quantityStock, receipt.price, receipt.category)
      .then(() => {
        handleNotificationSuccess();
        AnimationModal(setShow, setConfirmLoading);
        RefeshRoute(history, "/receipt");
      })
      .catch(e => {
        console.log(e);
        AnimationModal(setShow, setConfirmLoading);
        handleNotificationFailed();
        setMessage("Sửa phiếu nhập thất bại");
      })
  }

  const handleChangeSelect = (value: string) => {
    setReceipt(prev => ({ ...prev, category: value }));
  }

  const handleInputQuantityStock = (e: ChangeEvent<HTMLInputElement>) => {
    setReceipt(prev => ({ ...prev, quantityStock: e.target.value as any }));
  }

  const handleInputPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setReceipt(prev => ({ ...prev, price: e.target.value as any }));
  }

  const handleNotificationSuccess = () => {
    notification["success"]({
      message: 'Thông báo',
      description:
        'Sửa phiếu nhập kho thành công',
    });
  }

  const handleNotificationFailed = () => {
    notification["warning"]({
      message: 'Thông báo',
      description:
        'Đã xảy ra lỗi!',
    });
  }

  return (
    <Modal
      title="Sửa phiếu nhập"
      visible={show}
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={() => setShow(false)}
    >
      {
        ( loadingReceipt|| loadingCate) ? (
          <Spinner />
        ) : (
          <>
            <p>*Thể loại:</p>
            {
              receipt && categories && (
                <Select defaultValue={receipt.category} onChange={handleChangeSelect} style={{ width: 200 }}>
                  {
                    categories.map(category => {
                      return (
                        <Option key={category._id} value={category._id}>{category.name}</Option>
                      )
                    })
                  }
                </Select>
              )
            }
            <p>*Số lượng tồn:</p>
            <Input value={receipt?.quantityStock} type="number" onChange={(e) => handleInputQuantityStock(e)} />
            <p>*Giá:</p>
            <Input value={receipt?.price} type="number" onChange={(e) => handleInputPrice(e)} />
            {message && <p className="release-status">{message}</p>}
          </>
        )
      }
    </Modal>
  )
}

export default ReceiptModalEdit
