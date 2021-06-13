import React, { Component } from "react";
import "./changeStatusModal.css";
import { updateBookingRedux } from "../../actions/index";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { makeBookingReceived } from "../../firebase/firebase.utils";
class ChangeStatusModalExpress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingStatus: "",
    };
  }

  getMonth = async (year) => {
    const t = new Date();
    const monthInDigit = t.getMonth();

    let month;
    if (monthInDigit == 0) {
      month = `January,${year}`;
    }
    if (monthInDigit == 1) {
      month = `February,${year}`;
    }
    if (monthInDigit == 2) {
      month = `March,${year}`;
    }
    if (monthInDigit == 3) {
      month = `April,${year}`;
    }
    if (monthInDigit == 4) {
      month = `May,${year}`;
    }
    if (monthInDigit == 5) {
      month = `June,${year}`;
    }
    if (monthInDigit == 6) {
      month = `July,${year}`;
    }
    if (monthInDigit == 7) {
      month = `August,${year}`;
    }
    if (monthInDigit == 8) {
      month = `September,${year}`;
    }
    if (monthInDigit == 9) {
      month = `October,${year}`;
    }
    if (monthInDigit == 10) {
      month = `November,${year}`;
    }
    if (monthInDigit == 11) {
      month = `December,${year}`;
    }
    console.log(month);

    return month;
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const date = new Date();
    const receivedAt = date.toLocaleDateString();
    const year = receivedAt.split("/")[2];
    const month = await this.getMonth(year);
    console.log(receivedAt);
    await this.props.bookingIdArray.forEach(async (bookingId) => {
      if (this.state.bookingStatus === "Received") {
        await this.props.updateBookingRedux({
          bookingId: bookingId,
          ...this.state,
          receivedAt,
          month,
          orderStatus: "Local Warehouse",
        });
      } else {
        await this.props.updateBookingRedux({
          bookingId: bookingId,
          ...this.state,
          rejectedAt: receivedAt,
          month,
          orderStatus: "Rejected",
        });
      }

      console.log(this.state.bookingStatus);
      if (this.state.bookingStatus === "Received") {
        console.log(this.state.bookingStatus);
        await makeBookingReceived({
          bookingId: bookingId,
          ...this.state,
          receivedAt,
          month,
        });
      }
      this.setState({
        bookingStatus: "",
      });
    });
    toast.success("successfully updated booking status");
    this.props.startToggleModalExpress(null);
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
            this.props.toggleModalExpress
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
                      onClick={() => this.props.startToggleModalExpress(null)}
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
                                  Update Booking Staus
                                </label>
                                <select
                                  title="Please choose a package"
                                  required
                                  name="bookingStatus"
                                  className="custom-select"
                                  aria-required="true"
                                  aria-invalid="false"
                                  onChange={this.handleChange}
                                  value={this.state.bookingStatus}
                                  required
                                >
                                  <option value="">Select Status</option>
                                  <option value="Received">Received</option>
                                  <option value="Reject">Reject</option>
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

export default connect(null, { updateBookingRedux })(ChangeStatusModalExpress);
