import React, { Component, Fragment } from "react";
import {
  getSingleOrderRedux,
  updateOrderAfterInvoiceRedux,
} from "../../actions/index";
import { connect } from "react-redux";
import "./css/invoice-by-order.css";
import Alg from "./alg.png";
import Paid from "./paid.png";
import { withRouter } from "react-router-dom";

export class OnlyInvoieToPrint extends Component {
  state = {
    userObj: null,
    orderObj: null,
  };
  componentDidMount = async () => {
    const [shipmentMethod, lotNo, cartonNo] =
      this.props.match.params.orderId.split("-");
    const parcelId = `${lotNo}-${cartonNo}`;
    await this.props.getSingleOrderRedux(parcelId);

    console.log(this.props.orderObj);
    if (this.props.orderObj) {
      this.setState({
        userObj: this.props.users.find(
          (user) => user.uid == this.props.orderObj.customerUid
        ),
      });
    }
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.orderObj) {
      this.setState({
        userObj: nextProps.users.find(
          (user) => user.uid == nextProps.orderObj.customerUid
        ),
      });
    }
  };

  handleClick = async () => {
    const { orderObj } = this.props;
    const { userObj } = this.state;
    if (userObj && orderObj) {
      const updatedOrder = await this.props.updateOrderAfterInvoiceRedux({
        ...orderObj,
        invoiceGenerated: true,
      });
      if (updatedOrder) {
        this.props.history.push(
          `${process.env.PUBLIC_URL}/invoice/${orderObj.shipmentMethod}-${orderObj.lotNo}`
        );
      }
    }
  };

  componentWillUnmount = () => {
    this.setState({
      userObj: null,
      orderObj: null,
    });
  };

  render() {
    const [shipmentMethod, lotNo, cartonNo] =
      this.props.match.params.orderId.split("-");
    const { orderObj, admin } = this.props;
    const { userObj } = this.state;
    let total;
    if (orderObj) {
      total = Math.round(
        parseInt(orderObj.grossWeight * orderObj.ratePerKg) +
          parseInt(
            orderObj.productsValue ? (orderObj.productsValue * 3) / 100 : 0
          ) +
          parseInt(orderObj.packagingCost) +
          parseInt(orderObj.localDeliveryCost)
      );
    }

    if (orderObj && orderObj.paid) {
      total = total - orderObj.paid;
    }
    if (orderObj && orderObj.discountInvoice) {
      total = total - orderObj.discountInvoice;
    }
    console.log(userObj);
    return (
      <div id="basicScenario" className="product-list">
        <div
          id="container"
          style={{ maxWidth: "1000px", borderRadius: ".2rem" }}
        >
          <section id="memo" style={{ height: "165px" }}>
            <div className="logo">
              <img style={{ width: "70px", height: "70px" }} src={Alg} />
            </div>

            <div className="company-info">
              <div>Alg Limited</div>
              <br />
              <span>
                37/2 Pritom-Zaman Tower, 10th Floor, suite 6A &nbsp;
              </span>{" "}
              <br />
              <span>Culvert Road, Dhaka-1000. Bangladesh</span>
              <br />
              <span>Hotline: 8801736404419,</span>
              <span>info@algcargos.com</span>
            </div>
          </section>

          <section id="invoice-title-number">
            <span id="title" style={{ backgroundColor: "#8a0368" }}>
              INVOICE
            </span>
            <span id="number" style={{ fontSize: "200%" }}>
              #{lotNo}-{cartonNo}
            </span>
          </section>

          <div className="clearfix"></div>

          <section id="client-info">
            <span>TO:</span>
            <div>
              <span className="bold">
                {userObj ? userObj.displayName : null}
              </span>
            </div>
            {userObj && userObj.address ? (
              <div>
                <span>{userObj.address}</span>
              </div>
            ) : null}
            {userObj && userObj.city ? (
              <div>
                <span>{userObj.city}</span>
              </div>
            ) : null}

            <div>
              <span>{userObj && userObj.mobileNo}</span>
            </div>

            <div>
              <span>{userObj && userObj.email}</span>
            </div>
          </section>

          <div className="clearfix"></div>

          <section id="items">
            <table cellPadding="0" cellSpacing="0">
              <tbody>
                <tr>
                  <th>#</th>
                  <th style={{ maxWidth: "50px" }}>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>CTN no</th>
                  <th>Tracking no</th>
                  <th>Weight</th>
                  <th>In Total</th>
                </tr>

                <tr data-iterate="item">
                  <td>1</td>
                  <td style={{ maxWidth: "50px" }}>
                    {orderObj && orderObj.productName}
                  </td>
                  <td>{orderObj && orderObj.quantity}</td>
                  <td>{orderObj && orderObj.ratePerKg}Tk</td>
                  <td>{orderObj && orderObj.cartonNo}</td>
                  <td>{orderObj && orderObj.trackingNo}</td>

                  <td>{orderObj && orderObj.grossWeight}</td>
                  <td>
                    {orderObj && orderObj.total}
                    Tk
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <section id="sums">
            <table cellPadding="0" cellSpacing="0">
              <tbody>
                <tr>
                  <th>Subtotal</th>
                  <td>{orderObj && orderObj.total}Tk</td>
                </tr>

                <tr data-iterate="tax">
                  <th>Packaging Charge</th>
                  <td>
                    {orderObj && orderObj.packagingCost
                      ? orderObj.packagingCost
                      : 0}
                    Tk
                  </td>
                </tr>
                <tr data-iterate="tax">
                  <th>Insurance</th>
                  <td>{orderObj && orderObj.insurance}Tk</td>
                </tr>
                <tr data-iterate="tax">
                  <th>Local Delivery</th>
                  <td>
                    {orderObj && orderObj.deliveryCost
                      ? orderObj.deliveryCost
                      : 0}
                    Tk
                  </td>
                </tr>
                {orderObj && orderObj.otherCharges ? (
                  <tr data-hide-on-quote="true">
                    <th>Other Charges</th>
                    <td>{orderObj.otherCharges}tk</td>
                  </tr>
                ) : null}
                <tr className="amount-total">
                  <th>TOTAL</th>
                  <td>{orderObj && orderObj.subTotal}tk</td>
                </tr>

                <tr data-hide-on-quote="true">
                  <th>Discount</th>
                  <td>
                    {orderObj && orderObj.discountInvoice
                      ? orderObj.discountInvoice
                      : 0}
                    tk
                  </td>
                </tr>

                <tr data-hide-on-quote="true">
                  <th>TOTAL </th>
                  <td>
                    {orderObj && orderObj.finalTotal
                      ? orderObj.finalTotal
                      : orderObj.subTotal}
                    tk
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="clearfix"></div>
          </section>

          <div className="clearfix"></div>

          <section id="invoice-info">
            <div>
              <span style={{ color: "#464242" }}>Created By</span>
            </div>
            <div>
              <span>{admin && admin.name}</span>
            </div>
            <br />
            <div>
              <span style={{ color: "#464242" }}>Delivered By</span>
            </div>
            <div>
              <span>Sagor</span>
            </div>
          </section>

          <section id="terms">
            <div className="notes">
              <span style={{ fontWeight: "bold", color: "darkorange" }}>
                {userObj && userObj.displayName}
              </span>
              , thank you very much.We really appreciate your buisness. <br />
              Pay through ALG wallet to get amazing discount.
            </div>
            {orderObj && orderObj.chineseNote ? (
              <div style={{ marginTop: "2rem", color: "gray" }}>
                {orderObj && orderObj.chineseNote}
              </div>
            ) : null}

            <br />

            <div className="payment-info">
              <div>Packaging</div>
              <div>
                {orderObj && orderObj.packagingChosed
                  ? orderObj.packagingChosed
                  : "None"}
              </div>
              <br />
              <div>Delivery Address</div>
              <div>
                {orderObj && orderObj.deliveryAddress
                  ? orderObj.deliveryAddress
                  : "Alg Office"}
              </div>
            </div>
          </section>

          <div className="clearfix"></div>

          <div className="thank-you" style={{ backgroundColor: "#8a0368" }}>
            THANKS!
          </div>

          <div className="clearfix"></div>
        </div>
        {orderObj && orderObj.invoiceStatus === "Paid" ? (
          <div>
            <img
              style={{
                position: "absolute",
                height: "220px",
                width: "220px",
                top: "50%",
                left: "25%",
              }}
              src={Paid}
            ></img>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    orderObj: state.ordersAlg.orderObj,
    users: state.users.users,
    admin: state.admins.currentAdmin,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    getSingleOrderRedux,
    updateOrderAfterInvoiceRedux,
  })(OnlyInvoieToPrint)
);
