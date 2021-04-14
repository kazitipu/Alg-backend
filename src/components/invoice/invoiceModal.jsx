import React, { Component } from "react";
import "./invoiceModal.css";
import { updateOrderBeforeInvoiceRedux } from "../../actions/index";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";

class InvoiceModal extends Component {
  state = {
    localDeliveryCost: "",
    ratePerKg: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.parcelObj) {
      this.setState({
        localDeliveryCost: nextProps.parcelObj.localDeliveryCost,
        ratePerKg: nextProps.parcelObj.ratePerKg,
      });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { parcelObj } = this.props;

    const updatedOrder = await this.props.updateOrderBeforeInvoiceRedux({
      ...parcelObj,
      ...this.state,
    });
    if (updatedOrder) {
      toast.success(`Successfully generated invoice for ${parcelObj.parcelId}`);
      this.props.history.push(
        `${process.env.PUBLIC_URL}/invoice-by-orderId/${parcelObj.shipmentMethod}-${parcelObj.parcelId}`
      );
    } else {
      alert("An error occured. try again later.");
    }
  };

  render() {
    const { parcelObj } = this.props;
    return (
      <>
        {parcelObj ? (
          <>
            <div
              className={
                this.props.toggleModalAdditionalInfo
                  ? "modal fade show"
                  : "modal fade show visible-modal"
              }
              id="request_popup"
              tabIndex="-1"
              role="dialog"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered request_popup"
                role="document"
              >
                <div
                  className="modal-content visible-modal-content"
                  style={{ backgroundColor: "#ff8084" }}
                >
                  <div className="modal-body p-0">
                    <section className="pos-rel bg-light-gray">
                      <div className="container-fluid p-3">
                        <a
                          onClick={() => {
                            this.props.startToggleModalInvoice(null);
                          }}
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <i
                            className="icofont-close-line"
                            style={{ color: "white", fontWeight: "bolder" }}
                          ></i>
                        </a>
                        <div className="d-lg-flex justify-content-end no-gutters mb-spacer-md">
                          <div className="col">
                            <div className="px-3 m-5">
                              <h2
                                className="h2-xl mb-3 fw-6 pb-2"
                                style={{
                                  color: "white",
                                  textTransform: "none",
                                  fontSize: "200%",
                                  borderBottom: "2px dotted white",
                                }}
                              >
                                <span>
                                  <i className="icofont-ship"></i>
                                </span>
                                Parcel Id:
                                <span style={{ color: "#13c9ca" }}>
                                  &nbsp;
                                  {parcelObj ? parcelObj.parcelId : ""}
                                </span>
                              </h2>
                              <form
                                onSubmit={this.handleSubmit}
                                className="rounded-field mt-4"
                              >
                                <div className="form-row mb-4">
                                  <div className="col">
                                    <label
                                      style={{
                                        color: "white",
                                        marginBottom: "0px",
                                        fontSize: "130%",
                                      }}
                                    >
                                      Products value:
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        parcelObj.productsValue
                                          ? `${parcelObj.productsValue} tk`
                                          : ""
                                      }
                                      required
                                      readOnly
                                    />
                                  </div>
                                  <div className="col">
                                    <label
                                      style={{
                                        color: "white",
                                        marginBottom: "0px",
                                        fontSize: "130%",
                                      }}
                                    >
                                      Gross Weight:
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        parcelObj.grossWeight
                                          ? `${parcelObj.grossWeight} kg`
                                          : ""
                                      }
                                      required
                                      readOnly
                                    />
                                  </div>
                                </div>
                                <div className="form-row mb-4">
                                  <div className="col">
                                    <label
                                      style={{
                                        color: "white",
                                        marginBottom: "0px",
                                        fontSize: "130%",
                                      }}
                                    >
                                      Product Type:
                                    </label>
                                    <input
                                      className="form-control"
                                      aria-required="true"
                                      aria-invalid="false"
                                      value={
                                        parcelObj.productType
                                          ? parcelObj.productType
                                          : ""
                                      }
                                      readOnly
                                    />
                                  </div>
                                  <div className="col">
                                    <label
                                      style={{
                                        color: "white",
                                        marginBottom: "0px",
                                        fontSize: "130%",
                                      }}
                                    >
                                      Product Name:
                                    </label>
                                    <input
                                      className="form-control"
                                      value={
                                        parcelObj.productName
                                          ? parcelObj.productName
                                          : ""
                                      }
                                      readOnly
                                    />
                                  </div>
                                </div>
                                <div className="form-row mb-4">
                                  <div className="col">
                                    <label
                                      style={{
                                        color: "white",
                                        marginBottom: "0px",
                                        fontSize: "130%",
                                      }}
                                    >
                                      Total CBM:
                                    </label>
                                    <input
                                      className="form-control"
                                      value={
                                        parcelObj.totalCbm
                                          ? parcelObj.totalCbm
                                          : ""
                                      }
                                      readOnly
                                      required
                                    />
                                  </div>
                                  <div className="col">
                                    <label
                                      style={{
                                        color: "white",
                                        marginBottom: "0px",
                                        fontSize: "130%",
                                      }}
                                    >
                                      Chargeable Weight:
                                    </label>
                                    <input
                                      className="form-control"
                                      value={
                                        parcelObj.totalCbm
                                          ? parcelObj.totalCbm * 167
                                          : ""
                                      }
                                      required
                                      readOnly
                                    />
                                  </div>
                                </div>
                                <div className="form-row mb-4">
                                  <label
                                    style={{
                                      color: "white",
                                      marginBottom: "0px",
                                      fontSize: "130%",
                                    }}
                                  >
                                    Delivery Address:
                                  </label>
                                  <textarea
                                    type="text"
                                    className="form-control"
                                    value={
                                      parcelObj.deliveryAddress
                                        ? parcelObj.deliveryAddress
                                        : "Alg office"
                                    }
                                    required
                                    readOnly
                                  />
                                </div>
                                <div className="form-row mb-4">
                                  <label
                                    style={{
                                      color: "white",
                                      marginBottom: "0px",
                                      fontSize: "130%",
                                    }}
                                  >
                                    Local Delivery Cost:
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    name="localDeliveryCost"
                                    value={this.state.localDeliveryCost}
                                    placeholder="Enter delivery cost"
                                    onChange={this.handleChange}
                                    required
                                  />
                                </div>
                                <div className="form-row mb-4">
                                  <label
                                    style={{
                                      color: "white",
                                      marginBottom: "0px",
                                      fontSize: "130%",
                                    }}
                                  >
                                    Rate/kg:
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    name="ratePerKg"
                                    placeholder="Enter rate per kg"
                                    value={this.state.ratePerKg}
                                    onChange={this.handleChange}
                                    required
                                  />
                                </div>
                                <div className="form-row">
                                  <div
                                    className="col pt-3"
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-end",
                                    }}
                                  >
                                    <button
                                      type="submit"
                                      className="btn btn-secondary"
                                    >
                                      Generate
                                      <i className="icofont-rounded-right"></i>
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     allUsers: state.users.users,
//   };
// };
export default withRouter(
  connect(null, { updateOrderBeforeInvoiceRedux })(InvoiceModal)
);
