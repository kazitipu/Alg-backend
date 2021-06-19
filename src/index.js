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

//Payments

import Payments from "./components/payments/payments";
import PaymentsByDate from "./components/payments/paymentsByDate";

// delivery
import DeliveryLots from "./components/delivery/deliveryLots";
import DeliveryD2DFreight from "./components/delivery/deliveryD2DFreight";
import DeliveryExpressMonth from "./components/delivery/deliveryExpressMonth";
import DeliveryExpress from "./components/delivery/deliveryExpress";

// refund
import RefundRequest from "./components/refund/refundRequest";
import AllRefunds from "./components/refund/allRefunds";
import AllRefundsByLots from "./components/refund/allRefundsByLot";

//Pages
import ProductToOrder from "./components/pages/product-to-order";
import Create_page from "./components/pages/create-page";
import Media from "./components/media/media";
import List_menu from "./components/menus/list-menu";
import Create_menu from "./components/menus/create-menu";
import List_user from "./components/users/list-user";
import List_admin from "./components/admins/list-admin";
import DetailUser from "./components/users/detail-user";
import ListSuppliers from "./components/suppliers/list-suppliers";

import Currency from "./components/localization/currency";
import Taxes from "./components/localization/taxes";
import Add_Product_Tax from "./components/localization/add_product_tax";
import Update_Product_Tax from "./components/localization/update-product-tax";
import Profile from "./components/settings/profile";
import Reports from "./components/reports/report";
import Invoice from "./components/invoice/invoice";
import InvoiceExpress from "./components/invoice/invoiceExpress";
import InvoiceExpressByMonth from "./components/invoice/invoiceExpressByMonth";
import InvoiceOrderList from "./components/invoice/invoiceOrderList";
import InvoiceByOrder from "./components/invoice/invoice-by-order";
import InvoiceByOrderExpress from "./components/invoice/invoiceByOrderExpress";
import Print from "./components/invoice/print";
import Datatable from "./components/common/datatable";
import Login from "./components/auth/login";
import SearchedOrder from "./components/searched-order/searched-order";

// communication
import CommunicationByLots from "./components/communication/lots/lotList";
import CommunicationByCustomers from "./components/communication/customers/customerList";
import IntroModal from "./components/communication/introModal/introModalList";
import Notice from "./components/notice/notice";

// recharge
import RechargeRequest from "./components/recharge/recharge-request/rechargeRequest";
import RechargeWallet from "./components/recharge/recharge-wallet/rechargeWallet";
import RechargeHistory from "./components/recharge/recharge-history/rechargeHistory";
import RechargeHistoryByDate from "./components/recharge/recharge-history/rechargeHistoryByDate";

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
                  <Login setCurrentAdmin={this.setCurrentAdmin} />
                )}
              />

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
                  path={`${process.env.PUBLIC_URL}/delivery-express`}
                  component={DeliveryExpressMonth}
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
                  path={`${process.env.PUBLIC_URL}/delivery-express/:month`}
                  component={DeliveryExpress}
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
                  path={`${process.env.PUBLIC_URL}/calcualation/expressOrder/:month`}
                  component={(props) => (
                    <OrdersExpress props={props} calculation={true} />
                  )}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/expressOrder/:month`}
                  component={OrdersExpress}
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
                  path={`${process.env.PUBLIC_URL}/invoice-d2d-freight/:shipmentMethodLotNo`}
                  component={InvoiceOrderList}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/invoice-by-orderId/:orderId`}
                  component={InvoiceByOrder}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/invoice-by-bookingId/:bookingId`}
                  component={InvoiceByOrderExpress}
                />

                {/* express  */}

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

                {/* payments  */}
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/payments`}
                  component={Payments}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/payments/:date`}
                  component={PaymentsByDate}
                />

                {/* delivery  */}
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/delivery/:shipmentMethod`}
                  component={DeliveryLots}
                />

                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/delivery/d2d-freight/:shipmentMethodLotNo`}
                  component={DeliveryD2DFreight}
                />

                {/* refund  */}
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/refund/refund-request`}
                  component={RefundRequest}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/refund/all-refunds`}
                  component={AllRefunds}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/refund/all-refunds/:lotNo`}
                  component={AllRefundsByLots}
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
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/communication/notice`}
                  component={Notice}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/communication/intro-modal`}
                  component={IntroModal}
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
                  path={`${process.env.PUBLIC_URL}/recharge/recharge-history/:date`}
                  component={RechargeHistoryByDate}
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
                  path={`${process.env.PUBLIC_URL}/admins/list-admin`}
                  component={List_admin}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/users/list-user/:userId`}
                  component={DetailUser}
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
                  path={`${process.env.PUBLIC_URL}/invoice-d2d-freight`}
                  component={Invoice}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/invoice-express`}
                  component={InvoiceExpress}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/invoice-express/:month`}
                  component={InvoiceExpressByMonth}
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
