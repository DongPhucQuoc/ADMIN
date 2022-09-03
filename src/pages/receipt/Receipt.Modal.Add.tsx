import { useState, useEffect, FC, Dispatch, SetStateAction, ChangeEvent } from 'react';
import { GetListCategories, AddReceipt } from "services/Setting.Service";
import { Modal, Input, Form, Select, notification } from "antd";
import { useHistory } from "react-router-dom";
import { CategoryDocument } from 'interfaces/Category.Inteface';
import { AnimationModal, RefeshRoute } from 'utils/Common';
import Spinner from 'components/Spinner';

interface ReceiptAddProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const { Option } = Select;

const ReceiptModalAdd: FC<ReceiptAddProps> = ({ show, setShow }) => {
  const [receipt, setReceipt] = useState({ quantityStock: 0, price: 0, productName: '' });
  const [categories, setCategories] = useState<CategoryDocument[]>();
  const [categoryID, setCategoryID] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    GetListCategories()
      .then(res => {
        setLoading(false);
        setCategories(res.data.result);
      })
      .catch(e => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  const handleOk = () => {
    if (!receipt.quantityStock || !receipt.price || !categoryID) {
      setMessage("Thông tin không được trống");
      return;
    }
    setConfirmLoading(true);
    AddReceipt(receipt.quantityStock, receipt.price, categoryID, receipt.productName)
      .then(() => {
        handleNotificationSuccess();
        AnimationModal(setShow, setConfirmLoading);
        RefeshRoute(history, "/receipt");
      })
      .catch(e => {
        console.log(e);
        AnimationModal(setShow, setConfirmLoading);
        handleNotificationFailed();
        setMessage("Thêm phiếu nhập thất bại");
      })
  }

  const handleCancel = () => {
    setShow(false);
  }

  const onChange = (value: string) => {
    setCategoryID(value);
  }

  const handleInputQuantityStock = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    setReceipt(prev => ({ ...prev, quantityStock: e.target.value as any }));
  }

  const handleInputPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    setReceipt(prev => ({ ...prev, price: e.target.value as any }));
  }

  const handleInputProductName = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    setReceipt(prev => ({ ...prev, productName: e.target.value as any }));
  }

  const handleNotificationSuccess = () => {
    notification["success"]({
      message: 'Thông báo',
      description:
        'Thêm phiếu nhập kho thành công',
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
      title="Thêm phiếu nhập"
      visible={show}
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {
        loading ? <Spinner /> : (
          <>
            <Form.Item
              label="Tên sản phẩm"
              name="quantityStock"
              rules={[
                {
                  required: true,
                  message: 'Tên sản phẩm không được trống!',
                },
              ]}
            >
              <Input onChange={(e) => handleInputProductName(e)} />
            </Form.Item>

            <Form.Item
              label="Số lượng nhập"
              name="quantityStock"
              rules={[
                {
                  required: true,
                  message: 'Số lượng nhập không được trống!',
                },
              ]}
            >
              <Input onChange={(e) => handleInputQuantityStock(e)} type="number" />
            </Form.Item>
            <Form.Item
              label="Giá nhập"
              name="quantityStock"
              rules={[
                {
                  required: true,
                  message: 'Giá nhập không được trống!',
                },
              ]}
            >
              <Input onChange={(e) => handleInputPrice(e)} type="number" />
            </Form.Item>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Loại sản phẩm"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={(input, option) =>
                //@ts-ignore
                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {
                categories && categories.map(category => {
                  return (
                    <Option
                      key={category._id}
                      value={category._id}
                    >
                      {category.name}
                    </Option>
                  )
                })
              }
            </Select>
            <p className="modal__status__error">{message}</p>
          </>
        )
      }
    </Modal>
  )
}

export default ReceiptModalAdd
