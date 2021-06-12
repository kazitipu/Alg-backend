import React, { Component } from "react";
import "./changeExpressStatusModal.css";

import {
  uploadLotRedux,
  updateLotRedux,
  updateBookingRedux,
  getAllReceivedExpressBookingsRedux,
} from "../../actions/index";
import { connect } from "react-redux";
import { toast } from "react-toastify";

class ChangeExpressStatusModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderStatus: "",
    };
  }

  componentWillReceiveProps = (nextProps) => {
    const { singleParcel } = nextProps;

    if (singleParcel != null) {
      this.setState({
        orderStatus: singleParcel["Order Status"],
      });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state.orderStatus);
    // let shipmentStatusScore;
    // const { shipmentStatus } = this.state;
    // if (shipmentStatus === "Abroad Warehouse") shipmentStatusScore = 1;
    // if (shipmentStatus === "Abroad Customs") shipmentStatusScore = 2;
    // if (shipmentStatus === "Ready to Fly") shipmentStatusScore = 3;
    // if (shipmentStatus === "Bangladesh Customs") shipmentStatusScore = 4;
    // if (shipmentStatus === "Local Warehouse") shipmentStatusScore = 5;
    if (this.state.orderStatus) {
      await this.props.updateBookingRedux({
        ...this.props.bookingObj,
        orderStatus: this.state.orderStatus,
      });
      await this.props.getAllReceivedExpressBookingsRedux(
        this.props.match.params.month
      );
    }

    this.setState({
      orderStatus: "",
    });
    this.props.startToggleModal(null);
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <>
        <div
          className={
            this.props.toggleModal
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
              className="modal-content visible-modal-content-3"
              style={{ backgroundColor: "rgb(68 0 97)" }}
            >
              <div className="modal-body p-0">
                <section className="pos-rel bg-light-gray">
                  <div className="container-fluid p-3">
                    <a
                      onClick={() => this.props.startToggleModal(null)}
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <i
                        className="icofont-close-line"
                        style={{ color: "white" }}
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
                            Change Order Status
                          </h2>
                          <form
                            onSubmit={this.handleSubmit}
                            className="rounded-field mt-4"
                          >
                            <div className="form-row mb-4">
                              <div className="col">
                                <select
                                  title="Please choose a package"
                                  required
                                  name="orderStatus"
                                  className="custom-select"
                                  aria-required="true"
                                  aria-invalid="false"
                                  onChange={this.handleChange}
                                  value={this.state.orderStatus}
                                  required
                                >
                                  <option value="">Select Order Status</option>

                                  <option value="Local Warehouse">
                                    Local Warehouse
                                  </option>
                                  <option value="Bangladesh Customs">
                                    Bangladesh Customs
                                  </option>
                                  <option value="Ready to Fly">
                                    Ready to Fly
                                  </option>
                                  <option value="Abroad Customs">
                                    Abroad Customs
                                  </option>
                                  <option value="Abroad Warehouse">
                                    Abroad Warehouse Received
                                  </option>
                                  <option value="Delivered">Delivered</option>
                                </select>
                              </div>
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
                                  Update
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
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    bookingObj: ownProps.singleParcel
      ? state.ordersAlg.ordersExpress.find(
          (booking) => booking.bookingId === ownProps.singleParcel["Booking Id"]
        )
      : null,
  };
};
export default connect(mapStateToProps, {
  uploadLotRedux,
  updateLotRedux,
  updateBookingRedux,
  getAllReceivedExpressBookingsRedux,
})(ChangeExpressStatusModal);
