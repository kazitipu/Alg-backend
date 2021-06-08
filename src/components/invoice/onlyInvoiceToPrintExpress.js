import React, { Component, Fragment } from "react";
import {
  getSingleOrderRedux,
  getSingleBookingRedux,
  updateOrderAfterInvoiceRedux,
} from "../../actions/index";
import { connect } from "react-redux";
import "./css/invoice-by-order.css";
import Alg from "./alg.png";
import { withRouter } from "react-router-dom";

export class OnlyInvoieToPrintExpress extends Component {
  state = {
    userObj: null,
    bookingObj: null,
  };
  componentDidMount = async () => {
    await this.props.getSingleBookingRedux(this.props.match.params.bookingId);

    console.log(this.props.bookingObj);
    if (this.props.bookingObj) {
      this.setState({
        userObj: this.props.users.find(
          (user) => user.uid == this.props.bookingObj.userId
        ),
      });
    }
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.bookingObj) {
      this.setState({
        userObj: nextProps.users.find(
          (user) => user.uid == nextProps.bookingObj.userId
        ),
      });
    }
  };

  handleClick = async () => {
    const { bookingObj, orderObj } = this.props;
    const { userObj } = this.state;
    if (userObj && bookingObj) {
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
      bookingObj: null,
    });
  };

  render() {
    const { bookingObj } = this.props;
    const { userObj } = this.state;
    let total;

    if (bookingObj && bookingObj.discountInvoice) {
      total = bookingObj.total - bookingObj.discountInvoice;
    } else {
      total = bookingObj ? bookingObj.total : null;
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
              #{bookingObj && bookingObj.bookingId}
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

                  <th>Type</th>
                  <th>Box </th>
                  <th>Products Value</th>

                  <th>Used/new</th>
                  <th>In Total</th>
                </tr>

                <tr data-iterate="item">
                  <td>1</td>
                  <td style={{ maxWidth: "50px" }}>
                    {bookingObj && bookingObj.productName}
                  </td>

                  <td>{bookingObj && bookingObj.parcelType}</td>
                  <td>{bookingObj && bookingObj.parcelBox}kg</td>
                  <td>{bookingObj && bookingObj.productsTotalCost}tk</td>
                  <td>{bookingObj && bookingObj.usedOrNew}</td>

                  <td>
                    {bookingObj && bookingObj.total}
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
                  <td>
                    {bookingObj && bookingObj.total}
                    Tk
                  </td>
                </tr>

                <tr data-iterate="tax">
                  <th>Packaging Charge</th>
                  <td></td>
                </tr>
                <tr data-iterate="tax">
                  <th>Insurance</th>
                  <td></td>
                </tr>

                <tr className="amount-total">
                  <th>TOTAL</th>
                  <td>{bookingObj && bookingObj.total}tk</td>
                </tr>

                <tr data-hide-on-quote="true">
                  <th>paid</th>
                  <td>0tk</td>
                </tr>
                {bookingObj && bookingObj.discountInvoice ? (
                  <tr data-hide-on-quote="true">
                    <th>Discount</th>
                    <td>{bookingObj.discountInvoice}tk</td>
                  </tr>
                ) : null}

                <tr data-hide-on-quote="true">
                  <th>AMOUNT DUE</th>
                  <td>{total}tk</td>
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
              <span>MD.Tipu</span>
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

            <br />

            <div className="payment-info">
              <div style={{ marginBottom: "10px" }}>Receiver's Information</div>
              <div style={{ marginBottom: "3px" }}>
                Name: {bookingObj && bookingObj.receiversName}{" "}
              </div>

              <div style={{ marginBottom: "3px" }}>
                Mobile No: {bookingObj && bookingObj.receiversMobileNo}
              </div>

              <div style={{ marginBottom: "3px" }}>
                Delivery Address: {bookingObj && bookingObj.receiversAddress}
              </div>
            </div>
          </section>

          <div className="clearfix"></div>

          <div className="thank-you" style={{ backgroundColor: "#8a0368" }}>
            THANKS!
          </div>

          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    bookingObj: state.bookings.bookingObj,
    users: state.users.users,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    getSingleOrderRedux,
    getSingleBookingRedux,
    updateOrderAfterInvoiceRedux,
  })(OnlyInvoieToPrintExpress)
);
