import { Dispatch, SetStateAction, useState } from 'react';
import { DeleteProduct } from 'services/Setting.Service';
import { Modal, notification } from "antd";
import { useHistory } from "react-router-dom";
import { AnimationModal, RefeshRoute } from 'utils/Common';

interface ProductDelete {
  _id: string;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const ProductModalDelete = ({ _id, visible, setVisible }: ProductDelete) => {
  const [modalText, setModalText] = useState<string>('');
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const history = useHistory();

  const handleOk = () => {
    setConfirmLoading(true);
    DeleteProduct(_id)
      .then(() => {
        AnimationModal(setVisible, setConfirmLoading);
        RefeshRoute(history, "/product");
        handleNotificationSuccess();
      })
      .catch((e) => {
        console.log(e);
        setModalText("Đã xảy ra lỗi!");
        handleNotificationFailed();
        AnimationModal(setVisible, setConfirmLoading);
      });
  }

  const handleNotificationSuccess = () => {
    notification['success']({
      message: 'Thông báo',
      description:
        'Xóa sản phẩm thành công',
    });
  }

  const handleNotificationFailed = () => {
    notification['warning']({
      message: 'Thông báo',
      description:
        'Đã xảy ra lỗi',
    });
  }

  return (
    <Modal
      title="Xóa sản phẩm"
      visible={visible}
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={() => setVisible(false)}
    >
      {
        modalText ? (
          <p className="modal__status__error">{modalText}</p>
        ) : (
          <p>Bạn có chắc chắn muốn xóa ?</p>
        )
      }
    </Modal>
  )
}

export default ProductModalDelete
