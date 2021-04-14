import React, { Component, Fragment } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { connect } from "react-redux";

export class Tabset_profile extends Component {
  toDateTime = (secs) => {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);

    return t.toLocaleDateString();
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
                  {currentAdmin && currentAdmin.name}
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

export default connect(null)(Tabset_profile);
