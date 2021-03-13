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

//  BookingRequests
import BookingList from "./components/bookings/bookingList";

// LotsList
import LotList from "./components/lot/physical/lotlist";

//Orders
import OrdersLots from "./components/sales/ordersLots";
import OrdersD2DFreight from "./components/sales/ordersD2DFreight";
import OrdersExpressMonth from "./components/sales/ordersExpressMonth";
import OrdersExpress from "./components/sales/ordersExpress";

// Express Rates
import Document from "./components/express-rates/document/document";
import Parcel from "./components/express-rates/parcel/parcel";

// D2D Rates
import D2DRates from "./components/d2d-rates/d2dRates";

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
import Invoice from "./components/invoice/invoice";
import InvoiceOrderList from "./components/invoice/invoiceOrderList";
import InvoiceByOrder from "./components/invoice/invoice-by-order";
import Print from "./components/invoice/print";
import Datatable from "./components/common/datatable";
import Login from "./components/auth/login";
import SearchedOrder from "./components/searched-order/searched-order";

// communication
import CommunicationByLots from "./components/communication/lots/lotList";
import CommunicationByCustomers from "./components/communication/customers/customerList";

// recharge
import RechargeRequest from "./components/recharge/recharge-request/rechargeRequest";
import RechargeWallet from "./components/recharge/recharge-wallet/rechargeWallet";
import RechargeHistory from "./components/recharge/recharge-history/rechargeHistory";
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
                  path={`${process.env.PUBLIC_URL}/booking-request/:bookingStatus`}
                  component={BookingList}
                />

                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/orders/express`}
                  component={OrdersExpressMonth}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/expressOrder/:month`}
                  component={OrdersExpress}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/orders/:shipmentMethod`}
                  component={OrdersLots}
                />

                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/orders/d2d-freight/:shipmentMethodLotNo`}
                  component={OrdersD2DFreight}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/calculation/express`}
                  component={(props) => (
                    <OrdersExpressMonth props={props} calculation={true} />
                  )}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/calcualation/expressOrder/:month`}
                  component={(props) => (
                    <OrdersExpress props={props} calculation={true} />
                  )}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/calculation/:shipmentMethod`}
                  component={(props) => (
                    <OrdersLots props={props} calculation={true} />
                  )}
                />

                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/calculation/d2d-freight/:shipmentMethodLotNo`}
                  component={(props) => (
                    <OrdersD2DFreight props={props} calculation={true} />
                  )}
                />

                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/invoice/:shipmentMethodLotNo`}
                  component={InvoiceOrderList}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/invoice-by-orderId/:orderId`}
                  component={InvoiceByOrder}
                />

                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/express-rates/document`}
                  component={Document}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/express-rates/parcel`}
                  component={Parcel}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/d2d-rates/:country`}
                  component={D2DRates}
                />

                {/* <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/sales/orders/update-status/:orderId`}
                  component={UpdateOrder}
                />
             */}

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

                {/* communication  */}
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/communication/lots`}
                  component={CommunicationByLots}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/communication/customers`}
                  component={CommunicationByCustomers}
                />

                {/* recharge  */}
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/recharge/recharge-request`}
                  component={RechargeRequest}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/recharge/recharge-wallet`}
                  component={RechargeWallet}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/recharge/recharge-history`}
                  component={RechargeHistory}
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
