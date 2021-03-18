import React, { Component } from "react";
import "./createOrderModal.css";
import { updateOrderRedux } from "../../actions/index";
import { connect } from "react-redux";
import { toast } from "react-toastify";

class AdditionalInfoModal extends Component {
  state = { localDeliveryCost: "" };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const { parcelObj } = this.props;

    const updatedOrder = await this.props.updateOrderRedux({
      ...parcelObj,
      localDeliveryCost: this.state.localDeliveryCost,
      from: "Delivery",
    });
    if (updatedOrder) {
      toast.success(
        `Successfully updated delivery cost for Parcel ${parcelObj.parcelId}`
      );
    }
    this.setState({ localDeliveryCost: "" });
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
                  className="modal-content visible-modal-content-2"
                  style={{ backgroundColor: "#4e074e" }}
                >
                  <div className="modal-body p-0">
                    <section className="pos-rel bg-light-gray">
                      <div className="container-fluid p-3">
                        <a
                          onClick={() => {
                            this.props.startToggleModalAdditionalInfo(null);
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
                                  <label
                                    style={{
                                      color: "white",
                                      marginBottom: "8px",
                                      fontSize: "130%",
                                    }}
                                  >
                                    Local Delivery Cost:
                                  </label>
                                  <input
                                    name="localDeliveryCost"
                                    type="number"
                                    className="form-control"
                                    value={this.state.localDeliveryCost}
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
        ) : (
          ""
        )}
      </>
    );
  }
}

export default connect(null, { updateOrderRedux })(AdditionalInfoModal);
