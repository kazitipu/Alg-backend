import React, { Component } from "react";
import "./createOrderModal.css";
import { updateOrderRedux } from "../../actions/index";
import { connect } from "react-redux";
import { toast } from "react-toastify";

class DeliveryAndNoteModal extends Component {
  state = { note: "", parcelStatus: "" };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const { parcelsArray } = this.props;
    parcelsArray.forEach(async (parcelObj) => {
      const updatedOrder = await this.props.updateOrderRedux({
        ...parcelObj,
        parcelStatus: this.state.parcelStatus,
        note: this.state.note,
        from: "Delivery",
      });
    });

    this.setState({ note: "", parcelStatus: "" });
  };

  render() {
    const { parcelsArray } = this.props;
    return (
      <>
        {parcelsArray && parcelsArray.length > 0 ? (
          <>
            <div
              className={
                this.props.toggleModalDeliveryAndNote
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
                  style={{ backgroundColor: "#4e074e" }}
                >
                  <div className="modal-body p-0">
                    <section className="pos-rel bg-light-gray">
                      <div className="container-fluid p-3">
                        <a
                          onClick={() => {
                            this.props.startToggleModalDeliveryAndNote(null);
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

                                <span style={{ color: "#13c9ca" }}>
                                  &nbsp; Update Status
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
                                    Update Status
                                  </label>

                                  <select
                                    title="Please choose a package"
                                    required
                                    name="parcelStatus"
                                    className="custom-select"
                                    aria-required="true"
                                    aria-invalid="false"
                                    onChange={this.handleChange}
                                    value={this.state.parcelStatus}
                                    required
                                  >
                                    <option value="">Change Status</option>
                                    <option value="Delivered">Delivered</option>
                                  </select>
                                </div>
                                <div className="form-row mb-4">
                                  <label
                                    style={{
                                      color: "white",
                                      marginBottom: "8px",
                                      fontSize: "130%",
                                    }}
                                  >
                                    Note:
                                  </label>
                                  <textarea
                                    name="note"
                                    type="text"
                                    className="form-control"
                                    value={this.state.note}
                                    onChange={this.handleChange}
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

// const mapStateToProps = (state) => {
//   return {
//     allUsers: state.users.users,
//   };
// };
export default connect(null, { updateOrderRedux })(DeliveryAndNoteModal);
