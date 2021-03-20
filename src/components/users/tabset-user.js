import React, { Component, Fragment } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import "./tabset-user.css";
import { connect } from "react-redux";

export class Tabset_user extends Component {
  toDateTime = (secs) => {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);

    return t.toLocaleDateString();
  };

  renderOrderStatus = (lotNo) => {
    if (this.props.allLots.length > 0) {
      const lotObj = this.props.allLots.find((lot) => lot.lotNo === lotNo);
      console.log(lotObj);
      let backgroundColor;
      let icofont;
      if (lotObj.shipmentStatus === "Bangladesh Customs") {
        backgroundColor = "#f99322";
        icofont = "icofont-hand";
      }
      if (lotObj.shipmentStatus === "Local Warehouse") {
        backgroundColor = "darkgreen";
        icofont = "icofont-tick-boxed";
      }
      if (lotObj.shipmentStatus === "Ready to Fly") {
        backgroundColor = "#b11ad8";
        icofont = "icofont-airplane-alt";
      }
      if (lotObj.shipmentStatus === "Abroad Customs") {
        backgroundColor = "#ffbc58";
        icofont = "icofont-police";
      }
      if (lotObj.shipmentStatus === "Abroad Warehouse") {
        backgroundColor = "#13c9ca";
        icofont = "icofont-building-alt";
      }
      return (
        <div
          className=" icon-left no-shadow align-self-center my_parcel_update_button"
          style={{
            // background: backgroundColor,
            fontSize: "85%",
            fontFamily: "sans-serif",
            // color: "white",
            padding: "7px",
            color: backgroundColor,
          }}
        >
          <i className={icofont}></i> {lotObj.shipmentStatus}
        </div>
      );
    }
    return null;
  };
  getPaymentMethod = (recharge) => {
    if (recharge.paymentMethod === "Cash") {
      return "Cash";
    }
    if (recharge.paymentMethod === "Bank") {
      return recharge.bankName;
    }
    if (recharge.paymentMethod === "Mobile Banking") {
      return recharge.mobileBanking;
    }
  };
  render() {
    const { user } = this.props;
    if (user) {
      console.log(this.toDateTime(user.createdAt.seconds));
      console.log(typeof this.toDateTime(user.createdAt.seconds));
    }

    return (
      <Fragment>
        <Tabs>
          <TabList
            className="nav nav-tabs tab-coupon"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Tab className="nav-link">Account info</Tab>
            <Tab className="nav-link">Bookings</Tab>
            <Tab className="nav-link">Parcels</Tab>
            <Tab className="nav-link">Recharge history</Tab>
            <Tab className="nav-link">Payment history</Tab>
            <Tab className="nav-link">Transaction history</Tab>
          </TabList>
          <TabPanel>
            <form className="needs-validation user-add" noValidate="">
              <h4>Account Details</h4>
              <div className="form-group row">
                <label className="col-xl-3 col-md-4">
                  <span>*</span> Name
                </label>
                <div
                  className="col-xl-8 col-md-7"
                  style={{ textTransform: "capitalize" }}
                >
                  {user && user.displayName}
                </div>
              </div>
              <div className="form-group row">
                <label className="col-xl-3 col-md-4">
                  <span>*</span> Wallet
                </label>
                <div className="col-xl-8 col-md-7">
                  {user && user.myWallet}Tk
                </div>
              </div>
              <div className="form-group row">
                <label className="col-xl-3 col-md-4">
                  <span>*</span> Status
                </label>
                <div className="col-xl-8 col-md-7">{user && user.status}</div>
              </div>
              <div className="form-group row">
                <label className="col-xl-3 col-md-4">
                  <span>*</span> Mobile No
                </label>
                <div className="col-xl-8 col-md-7">{user && user.mobileNo}</div>
              </div>
              <div className="form-group row">
                <label className="col-xl-3 col-md-4">
                  <span>*</span> Email
                </label>
                <div className="col-xl-8 col-md-7">{user && user.email}</div>
              </div>
              <div className="form-group row">
                <label className="col-xl-3 col-md-4">
                  <span>*</span> Address
                </label>
                <div className="col-xl-8 col-md-7">{user && user.address}</div>
              </div>
              <div className="form-group row">
                <label className="col-xl-3 col-md-4">
                  <span>*</span> Company
                </label>
                <div className="col-xl-8 col-md-7">{user && user.company}</div>
              </div>
              <div className="form-group row">
                <label className="col-xl-3 col-md-4">
                  <span>*</span> Total Recharge
                </label>
                <div className="col-xl-8 col-md-7">
                  {user && user.totalRecharge} Tk
                </div>
              </div>
              <div className="form-group row">
                <label className="col-xl-3 col-md-4">
                  <span>*</span> Total Paid
                </label>
                <div className="col-xl-8 col-md-7">
                  {user && user.totalPaid} Tk
                </div>
              </div>
              <div className="form-group row">
                <label className="col-xl-3 col-md-4">
                  <span>*</span> User Id
                </label>
                <div className="col-xl-8 col-md-7">{user && user.userId}</div>
              </div>
              <div className="form-group row">
                <label className="col-xl-3 col-md-4">
                  <span>*</span> Uid
                </label>
                <div className="col-xl-8 col-md-7">{user && user.uid}</div>
              </div>
              <div className="form-group row">
                <label className="col-xl-3 col-md-4">
                  <span>*</span> Created At
                </label>
                <div className="col-xl-8 col-md-7">
                  {user && this.toDateTime(user.createdAt.seconds)}
                </div>
              </div>
            </form>
          </TabPanel>
          <TabPanel>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Booking Id</th>
                  <th scope="col">Method</th>
                  <th scope="col">Date</th>

                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {user && user.bookingArray.length > 0
                  ? user.bookingArray.map((booking, index) => (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{booking.bookingId}</td>
                        <td>{booking.bookingObj.shipmentMethod}</td>
                        <td>{booking.bookingObj.date}</td>
                        <td
                          style={{
                            color:
                              booking.bookingObj.bookingStatus == "Success"
                                ? "green"
                                : "orange",
                          }}
                        >
                          {booking.bookingObj.bookingStatus}
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Parcel Id</th>
                  <th scope="col">Lot No</th>
                  <th scope="col">Carton No</th>
                  <th scope="col">Tracking No</th>
                  <th scope="col">Parcel Status</th>
                </tr>
              </thead>
              <tbody>
                {user && user.parcelArray.length > 0
                  ? user.parcelArray.map((parcel, index) => (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{parcel.parcelId}</td>
                        <td>{parcel.lotNo}</td>
                        <td>{parcel.cartonNo}</td>
                        <td>{parcel.trackingNo}</td>
                        <td>{this.renderOrderStatus(parcel.lotNo)}</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Date</th>
                  <th scope="col">Recharge Id</th>
                  <th scope="col">Receit No</th>
                  <th scope="col">Payment Method</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Recharge By</th>
                </tr>
              </thead>
              <tbody>
                {user && user.rechargeArray.length > 0
                  ? user.rechargeArray.map((recharge, index) => (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{recharge.rechargedAt}</td>
                        <td>{recharge.rechargeId}</td>
                        <td>{recharge.receitNo}</td>
                        <td>{this.getPaymentMethod(recharge)}</td>
                        <td>{recharge.amount}Tk</td>
                        <td>{recharge.rechargeBy}</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </TabPanel>

          <TabPanel>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Date</th>
                  <th scope="col">Payment Id</th>
                  <th scope="col">Payment Method</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Paid Invoice</th>
                </tr>
              </thead>
              <tbody>
                {user && user.paymentArray.length > 0
                  ? user.transactionArray.map((payment, index) => (
                      <tr style={{ background: "#ff8084", color: "white" }}>
                        <th scope="row">{index + 1}</th>
                        <td>{payment.paidAt}</td>
                        <td>{payment.paymentId}</td>
                        <td>{payment.paymentMethod}</td>
                        <td>{payment.amount}Tk</td>
                        <td>
                          {payment.paidInvoice.map(
                            (parcelId) => `${parcelId}, `
                          )}
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Date</th>
                  <th scope="col">Id</th>
                  <th scope="col">Payment Method</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Recharge By</th>
                  <th scope="col">Paid Invoice</th>
                </tr>
              </thead>
              <tbody>
                {user && user.transactionArray.length > 0
                  ? user.transactionArray.map((transaction, index) =>
                      transaction.paymentMethod !== "ALG wallet" ? (
                        <tr style={{ background: "green", color: "white" }}>
                          <th scope="row">{index + 1}</th>
                          <td>{transaction.rechargedAt}</td>
                          <td>{transaction.rechargeId}</td>

                          <td>{this.getPaymentMethod(transaction)}</td>
                          <td>{transaction.amount}Tk</td>
                          <td>{transaction.rechargeBy}</td>
                          <td></td>
                        </tr>
                      ) : (
                        <tr style={{ background: "red", color: "white" }}>
                          <th scope="row">{index + 1}</th>
                          <td>{transaction.paidAt}</td>
                          <td>{transaction.paymentId}</td>
                          <td>{transaction.paymentMethod}</td>
                          <td>{transaction.amount}Tk</td>
                          <td></td>
                          <td>
                            {transaction.paidInvoice.map(
                              (parcelId) => `${parcelId}, `
                            )}
                          </td>
                        </tr>
                      )
                    )
                  : null}
              </tbody>
            </table>
          </TabPanel>
        </Tabs>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allLots: state.lots.lots,
  };
};
export default connect(mapStateToProps)(Tabset_user);
