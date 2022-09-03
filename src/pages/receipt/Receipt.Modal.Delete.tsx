import { Dispatch, SetStateAction, useState } from 'react';
import { DeleteReceipt } from 'services/Setting.Service';
import { AnimationModal, RefeshRoute } from 'utils/Common';
import { Modal, notification } from "antd";
import { useHistory } from "react-router-dom";

interface ReceiptDeleteProps {
  id: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const ReceiptModalDelete = ({ id, show, setShow }: ReceiptDeleteProps) => {
  const [modalText, setModalText] = useState<string>('');
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const history = useHistory();
  
  const handleOk = () => {
    setConfirmLoading(true);
    DeleteReceipt(id)
      .then(() => {
        AnimationModal(setShow, setConfirmLoading);
        handleNotificationSuccess();
        RefeshRoute(history, "/receipt");
      })
      .catch((e) => {
        console.log(e);
        handleNotificationFailed();
        setModalText("Đã xảy ra lỗi!");
        AnimationModal(setShow, setConfirmLoading);
      })
  }

  const handleCancel = () => {
    setShow(false);
  }

  const handleNotificationSuccess = () => {
    notification['success']({
      message: 'Thông báo',
      description:
        'Xóa phiếu nhập thành công',
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
      title="Xóa phiếu nhập"
      visible={show}
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={handleCancel}
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

export default ReceiptModalDelete
