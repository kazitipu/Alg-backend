import React, { Component, Fragment } from "react";
import Breadcrumb from "../../components/common/breadcrumb";
import { getSingleBookingRedux, updateBookingRedux } from "../../actions/index";
import "./css/invoice-by-order.css";
import Alg from "./alg.png";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Search } from "react-feather";
import Print from "./print";
export class InvoiceByOrderExpress extends Component {
  state = {
    userObj: null,
    discountInvoice: "",
  };
  componentDidMount = async () => {
    await this.props.getSingleBookingRedux(this.props.match.params.bookingId);
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
          (user) => user.uid == nextProps.bookingObj.userUid
        ),
      });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { bookingObj } = this.props;
    const { userObj } = this.state;
    if (userObj && bookingObj) {
      const updatedBooking = await this.props.updateBookingRedux({
        ...bookingObj,
        discountInvoice: this.state.discountInvoice,
      });
      //   if (updatedBooking) {

      //     if (shipmentMethod.includes("D2D")) {
      //       await this.props.getSingleOrderRedux({
      //         shipmentMethod: "D2D",
      //         orderId: `${lotNo}-${cartonNo}`,
      //       });
      //     } else {
      //       await this.props.getSingleOrderRedux({
      //         shipmentMethod: "Freight",
      //         orderId: `${lotNo}-${cartonNo}`,
      //       });
      //     }
      //   }
      this.setState({ discountInvoice: "" });
    }
  };

  render() {
    return (
      <Fragment>
        <Breadcrumb title="Invoice" parent="Invoice" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div
                  className="card-header"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <h5>Invoice</h5>
                  <div>
                    <form
                      className="form"
                      onSubmit={this.handleSubmit}
                      style={{ padding: "15px", background: "#8a0368" }}
                    >
                      <label
                        style={{
                          color: "white",
                          marginBottom: "5px",
                          fontWeight: "bold",
                        }}
                      >
                        Discount Amount
                      </label>
                      <div
                        // className="form-group"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          marginRight: "10px",
                        }}
                      >
                        <div className="form-row">
                          <input
                            style={{
                              padding: "10px",
                              marginTop: "2px",
                              outline: "none",
                            }}
                            className="form-control"
                            name="discountInvoice"
                            value={this.state.discountInvoice}
                            type="number"
                            placeholder="Enter Amount"
                            onChange={this.handleChange}
                          />
                        </div>
                        <button className="btn btn-secondary">Discount!</button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="card-body">
                  <Print orderObj={false} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
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
    getSingleBookingRedux,

    updateBookingRedux,
  })(InvoiceByOrderExpress)
);
