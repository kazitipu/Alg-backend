import React, { Component, Fragment } from "react";
import Breadcrumb from "../../components/common/breadcrumb";
import {
  getSingleOrderRedux,
  updateOrderAfterInvoiceRedux,
} from "../../actions/index";
import "./css/invoice-by-order.css";
import Alg from "./alg.png";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Search } from "react-feather";
import Print from "./print";
export class InvoiceByOrder extends Component {
  state = {
    userObj: null,
    discountInvoice: "",
    otherCharges: "",
  };
  componentDidMount = async () => {
    const [shipmentMethod, lotNo, cartonNo] =
      this.props.match.params.orderId.split("-");
    const parcelId = `${lotNo}-${cartonNo}`;
    await this.props.getSingleOrderRedux(parcelId);
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

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { orderObj } = this.props;
    const { userObj } = this.state;
    if (userObj && orderObj) {
      const updatedOrder = await this.props.updateOrderAfterInvoiceRedux({
        ...orderObj,
        invoiceGenerated: true,
        discountInvoice: this.state.discountInvoice,
        otherCharges: this.state.otherCharges,
      });
      if (updatedOrder) {
        const [shipmentMethod, lotNo, cartonNo] =
          this.props.match.params.orderId.split("-");

        if (shipmentMethod.includes("D2D")) {
          await this.props.getSingleOrderRedux({
            shipmentMethod: "D2D",
            orderId: `${lotNo}-${cartonNo}`,
          });
        } else {
          await this.props.getSingleOrderRedux({
            shipmentMethod: "Freight",
            orderId: `${lotNo}-${cartonNo}`,
          });
        }
      }
      this.setState({ discountInvoice: "", otherCharges: "" });
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
                  <div
                    style={{
                      boxShadow: "rgb(78 50 50) 1px 5px 24px 0px",
                      borderRadius: "10px",
                    }}
                  >
                    <form
                      className="form"
                      onSubmit={this.handleSubmit}
                      style={{
                        padding: "15px",
                        background: "#8a0368",
                        borderRadius: "10px",
                      }}
                    >
                      <div className="form-row">
                        <div className="col">
                          <label
                            style={{
                              color: "white",
                              marginBottom: "5px",
                              fontWeight: "bold",
                            }}
                          >
                            Discount Amount
                          </label>
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
                        <div className="col">
                          <label
                            style={{
                              color: "white",
                              marginBottom: "5px",
                              fontWeight: "bold",
                            }}
                          >
                            Other charges
                          </label>

                          <input
                            style={{
                              padding: "10px",
                              marginTop: "2px",
                              outline: "none",
                            }}
                            className="form-control"
                            name="otherCharges"
                            value={this.state.otherCharges}
                            type="number"
                            placeholder="Enter Amount"
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div
                        className="form-row mt-3"
                        style={{
                          justifyContent: "flex-end",
                          marginRight: "4px",
                        }}
                      >
                        <button className="btn btn-secondary">UPDATE!</button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="card-body">
                  <Print orderObj={true} />
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
    orderObj: state.ordersAlg.orderObj,
    users: state.users.users,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    getSingleOrderRedux,
    updateOrderAfterInvoiceRedux,
  })(InvoiceByOrder)
);
