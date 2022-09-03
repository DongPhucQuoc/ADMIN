import { useState, useEffect } from 'react';
import Spinner from 'components/Spinner';
import {
  GetLengthOfProduct,
  GetLengthOfProductWithCategory,
  GetListCategories,
  GetListProductWithPage,
  GetListProductWithCategory,
  GetListProductSortByNameWithPage,
  GetListProductSortedByPriceWithPage
} from "services/Setting.Service";
import { ProductDocument } from 'interfaces/Product.Interface';
import Header from "components/Header";
import HeaderSort from "./Product.Header";
import ProductModalAdd from './Product.Modal.Add';
import ProductModalEdit from './Product.Modal.Edit';
import ProductModalDelete from './Product.Modal.Delete';
import { formatMoney, EnumURL } from 'utils/Common';
import Selecter from "./Product.Select";
import { CategoryDocument } from 'interfaces/Category.Inteface';
import { Pagination } from 'antd';

const ProductForm = () => {
  const [page, setPage] = useState<number>(1);
  const [pageLength, setPageLength] = useState<number>(6);
  const [products, setProducts] = useState<ProductDocument[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [visibleAdd, setVisibleAdd] = useState<boolean>(false);
  const [visibleEdit, setVisibleEdit] = useState<boolean>(false);
  const [visibleDelete, setVisibleDelete] = useState<boolean>(false);
  const [nameSelected, setNameSelected] = useState<string>("normal");
  const [priceSelected, setPriceSelected] = useState<string>("normal");
  const [categories, setCategories] = useState<CategoryDocument[]>();
  const [typeSelected, setTypeSelected] = useState<string>("all");
  const [id, setID] = useState<string>("");

  useEffect(() => {
    if (nameSelected === "") {
      return;
    }

    if (nameSelected === "normal") {
      GetListNormal();
      return;
    }

    ListSortByName();
  }, [nameSelected]);

  useEffect(() => {
    if (priceSelected === "") {
      return;
    }

    if (priceSelected === "normal") {
      GetListNormal();
      return;
    }

    ListSortByPrice();
  }, [priceSelected]);

  useEffect(() => {
    GetListNormal();
  }, [page]);

  useEffect(() => {
    GetListCategories()
      .then((res) => {
        setCategories(res.data.result);
      })
      .catch((e) => {
        console.log(e);
      })
  }, []);

  const GetListNormal = () => {
    GetLengthOfProduct()
      .then(res => setPageLength(res.data.result))
      .catch(e => console.log(e));

    GetListProductWithPage(page)
      .then(res => {
        setLoading(false);
        setProducts(res.data.result);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }

  const ListSortByName = () => {
    GetListProductSortByNameWithPage(page, nameSelected)
      .then(res => {
        setLoading(false);
        setProducts(res.data.result);
      })
      .catch(e => {
        setLoading(false);
        console.log(e);
      })
  }

  const ListSortByPrice = () => {
    GetListProductSortedByPriceWithPage(page, priceSelected)
      .then(res => {
        setLoading(false);
        setProducts(res.data.result);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      })
  }

  const handleClickEdit = (_id: string) => {
    setVisibleEdit(true);
    setID(_id);
  }

  const handleClickDelete = (_id: string) => {
    setVisibleDelete(true);
    setID(_id);
  }

  const handleSelectName = (value: string) => {
    setLoading(true);
    setNameSelected(value);
    setPriceSelected("");
  }

  const handleSelectPrice = (value: string) => {
    setLoading(true);
    setPriceSelected(value);
    setNameSelected("");
  }

  const handleChangeSelectType = (value: string) => {
    setTypeSelected(value);
    setLoading(true);

    GetLengthOfProductWithCategory(value)
      .then(res => setPageLength(res.data.result))
      .catch(e => console.log(e));

    if (value === "all") {
      GetListNormal();
      return;
    }

    GetListProductWithCategory(value)
      .then(res => {
        setProducts(res.data.result);
        setLoading(false);
      })
      .catch(e => {
        console.log(e)
        setLoading(false);
      });
  }

  const handleChangePagination = (current: any) => {
    setPage(current);
    setLoading(true);
  }

  return (
    <>
      <div className="product">
        <Header headerName="Sản phẩm" setShowAdd={setVisibleAdd} type={'product'} />
        <Selecter
          typeSelected={typeSelected}
          categories={categories}
          handleChange={handleChangeSelectType}
        />
        <HeaderSort
          nameSelected={nameSelected}
          priceSelected={priceSelected}
          handleSelectName={handleSelectName}
          handleSelectPrice={handleSelectPrice}
        />
        {
          loading ? (
            <Spinner />
          ) : (
            <>
              {
                products && products.map(product => {
                  return (
                    <div className="product__item" key={product._id}>
                      <span className="product__item__text">{product.name}</span>
                      <span className="product__item__text">
                        <img className="product__item__img" src={product.images && product.images[0] && `${EnumURL.baseUrl}${product.images[0].name}`} alt="i" />
                      </span>
                      <span className="product__item__text">{product.price ? formatMoney(product.price) : `${0}đồng`} </span>
                      <span className="product__item__text">{product.description && product.description}</span>
                      <span className="product__item__text">{product.receipt && product.receipt[0] && product.receipt[0].quantityStock}</span>
                      <span className="product__item__button">
                        <span onClick={() => handleClickEdit(product._id)}>📝</span>
                      </span>
                      <span className="product__item__button">
                        <span onClick={() => handleClickDelete(product._id)}>🗑️</span>
                      </span>
                    </div>
                  )
                })
              }
              {
                visibleAdd === true && (
                  <ProductModalAdd
                    visible={visibleAdd}
                    setVisible={setVisibleAdd}
                  />
                )
              }
              {
                visibleEdit === true && (
                  <ProductModalEdit
                    _id={id}
                    visible={visibleEdit}
                    setVisible={setVisibleEdit}
                  />
                )
              }
              {
                visibleDelete === true && (
                  <ProductModalDelete
                    _id={id}
                    visible={visibleDelete}
                    setVisible={setVisibleDelete}
                  />
                )
              }
            </>
          )
        }
      </div>
      <div className="product__pagination">
        <Pagination defaultCurrent={1} onChange={handleChangePagination} total={(pageLength / 6) * 10} />
      </div>
    </>
  )
}

export default ProductForm
