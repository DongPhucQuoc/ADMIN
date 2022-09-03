import "./styles/index.scss";
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './routes/Private.Route';
import LoginPage from 'pages/login/Login.Page';
import CategoryPage from 'pages/category/Category.Page';
import ProductPage from 'pages/product/Product.Page';
import OrderPage from 'pages/order/Order.Page';
import StatisticPage from 'pages/statistic/Statistic.Page';
import RegisterPage from "pages/register/Register.Page";
import ReceiptPage from "pages/receipt/Receipt.Page";

function App() {
  return (
    <Layout>
      <Router>
        <Route exact path="/" component={LoginPage} />
        <PrivateRoute path="/receipt" component={ReceiptPage} />
        <PrivateRoute path="/category" component={CategoryPage} />
        <PrivateRoute path="/product" component={ProductPage} />
        <PrivateRoute path="/order" component={OrderPage} />
        <PrivateRoute path="/statistic" component={StatisticPage} />
        <PrivateRoute path="/create-account" component={RegisterPage} />
      </Router>
    </Layout>
  );
}

export default App;
