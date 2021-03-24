import React, { Component, Fragment } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { connect } from "react-redux";

export class Tabset_profile extends Component {
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
    const { currentAdmin } = this.props;
    if (currentAdmin) {
      console.log(this.toDateTime(currentAdmin.createdAt.seconds));
      console.log(typeof this.toDateTime(currentAdmin.createdAt.seconds));
    }

    return (
      <Fragment>
        <Tabs>
          <TabList
            className="nav nav-tabs tab-coupon"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Tab className="nav-link">Account info</Tab>
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
                  {currentAdmin && currentAdmin.displayName}
                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-md-4">
                  <span>*</span> Status
                </label>
                <div className="col-xl-8 col-md-7">
                  {currentAdmin && currentAdmin.status}
                </div>
              </div>
              <div className="form-group row">
                <label className="col-xl-3 col-md-4">
                  <span>*</span> Mobile No
                </label>
                <div className="col-xl-8 col-md-7">
                  {currentAdmin && currentAdmin.mobileNo}
                </div>
              </div>
              <div className="form-group row">
                <label className="col-xl-3 col-md-4">
                  <span>*</span> Email
                </label>
                <div className="col-xl-8 col-md-7">
                  {currentAdmin && currentAdmin.email}
                </div>
              </div>
              <div className="form-group row">
                <label className="col-xl-3 col-md-4">
                  <span>*</span> Address
                </label>
                <div className="col-xl-8 col-md-7">
                  {currentAdmin && currentAdmin.address}
                </div>
              </div>
              <div className="form-group row">
                <label className="col-xl-3 col-md-4">
                  <span>*</span> Company
                </label>
                <div className="col-xl-8 col-md-7">
                  {currentAdmin && currentAdmin.company}
                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-md-4">
                  <span>*</span> Admin Id
                </label>
                <div className="col-xl-8 col-md-7">
                  {currentAdmin && currentAdmin.adminId}
                </div>
              </div>
              <div className="form-group row">
                <label className="col-xl-3 col-md-4">
                  <span>*</span> Uid
                </label>
                <div className="col-xl-8 col-md-7">
                  {currentAdmin && currentAdmin.uid}
                </div>
              </div>
              <div className="form-group row">
                <label className="col-xl-3 col-md-4">
                  <span>*</span> Created At
                </label>
                <div className="col-xl-8 col-md-7">
                  {currentAdmin &&
                    this.toDateTime(currentAdmin.createdAt.seconds)}
                </div>
              </div>
            </form>
            <div
              className="row"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <button
                className="btn btn-secondary"
                onClick={() => this.props.startToggleModal(currentAdmin)}
              >
                Edit Profile
              </button>
            </div>
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
export default connect(mapStateToProps)(Tabset_profile);
