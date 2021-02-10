import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./index.scss";
import App from "./components/app";
import { ScrollContext } from "react-router-scroll-4";
import { Provider } from "react-redux";

// Components
import store from "./store";
import Dashboard from "./components/dashboard";

// Products physical
import LotList from "./components/lot/physical/lotlist";
import Sub_category from "./components/lot/physical/sub-category";
import Product_list from "./components/lot/physical/product-list";
import Add_product from "./components/lot/physical/add-product";
import Add_Aliexpress_product from "./components/lot/physical/add-aliexpress-product";
import Update_product from "./components/lot/physical/update-product";
import Product_detail from "./components/lot/physical/product-detail";

//Sales
import Orders from "./components/sales/orders";
import PendingOrders from "./components/sales/pendingOrders";
import PaymentApproved from "./components/sales/paymentApproved";
import Ordered from "./components/sales/ordered";
import ChinaWarehouse from "./components/sales/chinaWarehouse";
import InShipment from "./components/sales/inShipment";
import InStock from "./components/sales/inStock";
import Delivered from "./components/sales/delivered";
import UpdateOrder from "./components/sales/updateOrder";

//Coupons
import UnverifiedPayments from "./components/payments/unVerifiedPayments";
import VerifiedPayments from "./components/payments/verifiedPayments";
import Create_coupons from "./components/payments/create-coupons";

//Pages
import ProductToOrder from "./components/pages/product-to-order";
import Create_page from "./components/pages/create-page";
import Media from "./components/media/media";
import List_menu from "./components/menus/list-menu";
import Create_menu from "./components/menus/create-menu";
import List_user from "./components/users/list-user";
import Create_user from "./components/users/create-user";
import ListSuppliers from "./components/suppliers/list-suppliers";

import Currency from "./components/localization/currency";
import Taxes from "./components/localization/taxes";
import Add_Product_Tax from "./components/localization/add_product_tax";
import Update_Product_Tax from "./components/localization/update-product-tax";
import Profile from "./components/settings/profile";
import Reports from "./components/reports/report";
import Invoice from "./components/invoice";
import Datatable from "./components/common/datatable";
import Login from "./components/auth/login";
import SearchedOrder from "./components/searched-order/searched-order";
import CreateLotModal from "./components/lot/physical/createLotModal";

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAdmin: null,
    };
  }

  setCurrentAdmin = (adminObj) => {
    this.setState({ currentAdmin: adminObj });
    console.log(this.state.currentAdmin);
  };

  render() {
    const { currentAdmin } = this.state;
    return (
      <Provider store={store}>
        <BrowserRouter basename={"/"}>
          <ScrollContext>
            <Switch>
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/`}
                component={() => (
                  <Login
                    setCurrentAdmin={this.setCurrentAdmin}
                    currentAdmin={currentAdmin}
                  />
                )}
              />
              {/* <Route exact path={`${process.env.PUBLIC_URL}/auth/login`} component={Login} /> */}

              <App>
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/dashboard`}
                  component={Dashboard}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/searched-order/:orderId`}
                  component={SearchedOrder}
                />

                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/lot/lot-list`}
                  component={LotList}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/products/physical/sub-category`}
                  component={Sub_category}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/products/physical/product-list`}
                  component={Product_list}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/products/physical/product-detail`}
                  component={Product_detail}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/products/physical/add-product`}
                  component={Add_product}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/products/physical/add-aliexpress-product`}
                  component={Add_Aliexpress_product}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/products/physical/add-product/:id`}
                  component={Update_product}
                />

                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/sales/orders`}
                  component={Orders}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/sales/orders/update-status/:orderId`}
                  component={UpdateOrder}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/sales/order_pending`}
                  component={PendingOrders}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/sales/payment_approved`}
                  component={PaymentApproved}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/sales/ordered`}
                  component={Ordered}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/sales/china_warehouse`}
                  component={ChinaWarehouse}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/sales/in-shipping`}
                  component={InShipment}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/sales/in_stock`}
                  component={InStock}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/sales/delivered`}
                  component={Delivered}
                />

                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/payments/unVerified`}
                  component={UnverifiedPayments}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/payments/verified`}
                  component={VerifiedPayments}
                />

                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/pages/product-to-order`}
                  component={ProductToOrder}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/pages/create-page`}
                  component={Create_page}
                />

                {/* <Route exact epath={`${process.env.PUBLIC_URL}/media`} component={Media} /> */}

                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/menus/list-menu`}
                  component={List_menu}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/menus/create-menu`}
                  component={Create_menu}
                />

                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/users/list-user`}
                  component={List_user}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/users/create-user`}
                  component={Create_user}
                />

                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/suppliers/list_suppliers`}
                  component={ListSuppliers}
                />

                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/localization/currency-rates`}
                  component={Currency}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/localization/shipping-charges`}
                  component={Taxes}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/localization/shipping-charge/add-product`}
                  component={Add_Product_Tax}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/localization/shipping-charges/add-product/:id`}
                  component={Update_Product_Tax}
                />

                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/settings/profile`}
                  component={Profile}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/invoice`}
                  component={Invoice}
                />

                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/data-table`}
                  component={Datatable}
                />
              </App>
            </Switch>
          </ScrollContext>
        </BrowserRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById("root"));
