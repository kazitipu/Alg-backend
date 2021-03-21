import React, { Component } from "react";
import "./changeStatusModal.css";
import { updateRefundRedux } from "../../actions/index";
import { connect } from "react-redux";
import { toast } from "react-toastify";
class ChangeStatusModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refundStatus: "",
      refundAmount: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { parcelArray } = this.props;
    await this.props.refundIdArray.forEach((refundId) => {
      const parcelObj = parcelArray.find(
        (parcel) => parcel.parcelId === refundId
      );

      this.props.updateRefundRedux({
        refundId: refundId,
        ...parcelObj,
        ...this.state,
      });
    });
    toast.success("successfully updated booking status");
    this.setState({
      refundStatus: "",
      refundAmount: "",
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
              className="modal-content visible-modal-content-2"
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
                      {/* <div className="col bg-fixed bg-img-7 request_pag_img">
                        &nbsp;
                      </div> */}

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
                            Change Status
                          </h2>
                          <form
                            onSubmit={this.handleSubmit}
                            noValidate="novalidate"
                            className="rounded-field mt-4"
                          >
                            <div className="form-row mb-4">
                              <div className="col">
                                <label
                                  style={{
                                    color: "white",
                                    marginBottom: "5px",
                                  }}
                                >
                                  Update Refund Status
                                </label>
                                <select
                                  title="Please choose a package"
                                  required
                                  name="refundStatus"
                                  className="custom-select"
                                  aria-required="true"
                                  aria-invalid="false"
                                  onChange={this.handleChange}
                                  value={this.state.refundStatus}
                                  required
                                >
                                  <option value="">Select Status</option>
                                  <option value="Claimed">Approve</option>
                                  <option value="Rejected">Reject</option>
                                </select>
                              </div>
                            </div>
                            <div className="form-row mb-4">
                              <div className="col">
                                <label
                                  style={{
                                    color: "white",
                                    marginBottom: "5px",
                                  }}
                                >
                                  Refund Amount
                                </label>
                                <input
                                  type="number"
                                  name="refundAmount"
                                  className="form-control"
                                  placeholder="Enter Refund Amount"
                                  style={{ fontSize: "1rem" }}
                                  onChange={this.handleChange}
                                  value={this.state.refundAmount}
                                  required
                                />
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
                                  Submit
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

export default connect(null, { updateRefundRedux })(ChangeStatusModal);
