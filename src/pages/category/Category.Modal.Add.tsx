import { useState, ChangeEvent, SetStateAction, Dispatch } from 'react';
import { Modal, Input, Form, notification } from "antd";
import { AddCategory } from 'services/Setting.Service';
import { AnimationModal, RefeshRoute } from "utils/Common";
import { useHistory } from "react-router-dom";

interface CategoryAdd {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const CategoryModalAdd = ({ show, setShow }: CategoryAdd) => {
  const [modalText, setModalText] = useState<string>('');
  const [name, setName] = useState<string>("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const history = useHistory();

  const handleOk = () => {
    if (!name) {
      setMessage("Tên danh mục không được trống");
      return;
    }

    setConfirmLoading(true);
    AddCategory(name)
      .then(() => {
        AnimationModal(setShow, setConfirmLoading);
        RefeshRoute(history, "/category");
        handleNotificationSuccess();
      })
      .catch((e) => {
        console.log(e);
        setModalText('Thêm danh mục thất bại');
        handleNotificationFailed();
        AnimationModal(setShow, setConfirmLoading);
      })
  };

  const handleCancel = () => {
    setShow(false);
  };

  const handleInputText = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setMessage("");
    setName(e.target.value);
  }

  const handleNotificationSuccess = () => {
    notification["success"]({
      message: 'Thông báo',
      description:
        'Thêm danh mục thành công',
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
    title="Thêm danh mục"
    visible={show}
    confirmLoading={confirmLoading}
    onOk={handleOk}
    onCancel={handleCancel}
  >
    {
      modalText ? (
        <p className="modal__status__error">{modalText}</p>
      ) : (
        <Form.Item
          label="Tên danh mục"
          name="username"
          rules={[
            {
              required: true,
              message: 'Tên danh mục không được trống!',
            },
          ]}
        >
          <Input onChange={(e) => handleInputText(e)} />
          <p className="modal__status__error">{message}</p>
        </Form.Item>

      )
    }
  </Modal>
);
}

export default CategoryModalAdd
