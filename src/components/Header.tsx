import { Button } from "antd";

interface HeaderDocument {
  headerName: String;
  setShowAdd: any;
  type?: string;
}

const Header = ({ headerName, setShowAdd, type } : HeaderDocument) => {
  const handleClickAdd = () => {
    setShowAdd(true);
  }

  return (
    <div className="header">
      <h3 className="header__title">{headerName}</h3>
      {
        type !== 'product' && <Button className="header__button" onClick={handleClickAdd}>
          + Thêm
        </Button>
      }
    </div>
  )
}

export default Header
