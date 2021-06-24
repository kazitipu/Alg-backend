import React, { Component, Fragment } from "react";
import { ShoppingBag, DollarSign, AlertCircle } from "react-feather";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class Notification extends Component {
  render() {
    const { allRechargeRequest, allRefundRequest, allBookingRequest } =
      this.props;
    const totalNotificationCount =
      allRechargeRequest.length +
      allRefundRequest.length +
      allBookingRequest.length;
    return (
      <Fragment>
        <ul className="notification-dropdown onhover-show-div p-0">
          <li>
            Notification
            <span className="badge badge-pill badge-primary pull-right">
              {totalNotificationCount}
            </span>
          </li>
          {allBookingRequest.length > 0 && (
            <li>
              <Link to={`${process.env.PUBLIC_URL}/booking-request/Pending`}>
                <div className="media">
                  <div className="media-body">
                    <h6 className="mt-0">
                      <span>
                        <ShoppingBag />
                      </span>
                      Booking Requests..!
                    </h6>
                    <p className="mb-0">
                      ALG Cargos has {allBookingRequest.length} pending
                      Bookings.
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          )}
          {allRechargeRequest.length > 0 && (
            <li>
              <Link to={`${process.env.PUBLIC_URL}/recharge/recharge-request`}>
                <div className="media">
                  <div className="media-body">
                    <h6 className="mt-0 txt-success">
                      <span>
                        <DollarSign />
                      </span>
                      Recharge Requests
                    </h6>
                    <p className="mb-0">
                      {allRechargeRequest.length} unverified recharge requests
                      needs to be reviewed
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          )}
          {allRefundRequest.length > 0 && (
            <li>
              <Link to={`${process.env.PUBLIC_URL}/refund/refund-request`}>
                <div className="media">
                  <div className="media-body">
                    <h6 className="mt-0 txt-success">
                      <span>
                        <DollarSign />
                      </span>
                      Refund Requests
                    </h6>
                    <p className="mb-0">
                      {allRefundRequest.length} Refund Requests needs to be
                      reviewed
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          )}
        </ul>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allRechargeRequest: state.recharge.rechargeRequestArray,
    allRefundRequest: state.refunds.refunds,
    allBookingRequest: state.bookings.bookings,
  };
};

export default connect(mapStateToProps)(Notification);
