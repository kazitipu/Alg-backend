import React, { Component } from "react";
import "./rechargeWalletModal.css";
import {
  uploadLotRedux,
  updateLotRedux,
  getAllOrdersOfSingleLotRedux,
  rechargeUserRedux,
} from "../../../actions/index";
import { connect } from "react-redux";
import { toast } from "react-toastify";

class RechargeWalletModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethod: "",
      bankName: "",
      transactionId: "",
      mobileBanking: "",
      amount: "",
      receitNo: "",
    };
  }
  uniqueId = (length = 16) => {
    return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length));
  };

  componentDidMount = () => {
    console.log(this.uniqueId());
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { userObj } = this.props;
    console.log(this.props);
    if (userObj) {
      let rechargedAt = new Date().toLocaleDateString();
      rechargedAt = rechargedAt.replaceAll("/", "-");
      console.log(rechargedAt);
      const dayInDigit = new Date().getDay();
      let day;
      if (dayInDigit == 0) {
        day = "Saturday";
      }
      if (dayInDigit == 1) {
        day = "Sunday";
      }
      if (dayInDigit == 2) {
        day = "Monday";
      }
      if (dayInDigit == 3) {
        day = "Tuesday";
      }
      if (dayInDigit == 4) {
        day = "Wednesday";
      }
      if (dayInDigit == 5) {
        day = "Thursday";
      }
      if (dayInDigit == 6) {
        day = "Friday";
      }
      const rechargeId = this.uniqueId();
      console.log(userObj);
      await this.props.rechargeUserRedux({
        ...userObj,
        ...this.state,
        rechargedAt,
        day,
        rechargeId,
        rechargeBy: "Md tipu",
      });
      toast.success(
        `Recharge succesful to ${userObj.Name} of amount ${this.state.amount}`
      );
    }

    this.setState({
      paymentMethod: "",
      bankName: "",
      transactionId: "",
      mobileBanking: "",
      amount: "",
      receitNo: "",
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
              style={{
                backgroundColor: "green",

                boxShadow: "#052f05 1px 5px 24px 0px",
              }}
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
                            {this.props.userObj
                              ? `Recharge ${this.props.userObj.Name}`
                              : "Recharge"}
                          </h2>
                          <form
                            onSubmit={this.handleSubmit}
                            className="rounded-field mt-4"
                          >
                            <div className="form-row mb-4">
                              <label
                                style={{
                                  color: "white",
                                  marginBottom: "5px",
                                  fontSize: "130%",
                                }}
                              >
                                Payment Method:
                              </label>
                              <select
                                title="Please choose a payment Method"
                                required
                                name="paymentMethod"
                                className="custom-select"
                                aria-required="true"
                                aria-invalid="false"
                                onChange={this.handleChange}
                                value={this.state.paymentMethod}
                                required
                              >
                                <option value="">Select Payment Method</option>
                                <option value="Cash">Cash</option>
                                <option value="Bank">Bank</option>
                                <option value="Mobile Banking">
                                  Mobile Banking
                                </option>
                              </select>
                            </div>

                            {this.state.paymentMethod === "Bank" ? (
                              <div className="form-row mb-4">
                                <div className="col">
                                  <label
                                    style={{
                                      color: "white",
                                      marginBottom: "5px",
                                      fontSize: "130%",
                                    }}
                                  >
                                    Bank Name:
                                  </label>
                                  <input
                                    type="text"
                                    name="bankName"
                                    className="form-control"
                                    placeholder="Enter Bank Name"
                                    style={{ fontSize: "1rem" }}
                                    onChange={this.handleChange}
                                    value={this.state.bankName}
                                    required
                                  />
                                </div>
                                <div className="col">
                                  <label
                                    style={{
                                      color: "white",
                                      marginBottom: "5px",
                                      fontSize: "130%",
                                    }}
                                  >
                                    Transaction Id:
                                  </label>
                                  <input
                                    type="text"
                                    name="transactionId"
                                    className="form-control"
                                    placeholder="Enter Transaction Id"
                                    style={{ fontSize: "1rem" }}
                                    onChange={this.handleChange}
                                    value={this.state.transactionId}
                                  />
                                </div>
                              </div>
                            ) : null}
                            {this.state.paymentMethod === "Mobile Banking" ? (
                              <div className="form-row mb-4">
                                <div className="col">
                                  <label
                                    style={{
                                      color: "white",
                                      marginBottom: "5px",
                                      fontSize: "130%",
                                    }}
                                  >
                                    Modbile Banking via
                                  </label>
                                  <input
                                    type="text"
                                    name="mobileBanking"
                                    className="form-control"
                                    placeholder="Enter Mobile Baniking via"
                                    style={{ fontSize: "1rem" }}
                                    onChange={this.handleChange}
                                    value={this.state.mobileBanking}
                                    required
                                  />
                                </div>
                                <div className="col">
                                  <label
                                    style={{
                                      color: "white",
                                      marginBottom: "5px",
                                      fontSize: "130%",
                                    }}
                                  >
                                    Transaction Id:
                                  </label>
                                  <input
                                    type="text"
                                    name="transactionId"
                                    className="form-control"
                                    placeholder="Enter Transaction Id"
                                    style={{ fontSize: "1rem" }}
                                    onChange={this.handleChange}
                                    value={this.state.transactionId}
                                  />
                                </div>
                              </div>
                            ) : null}
                            {this.state.paymentMethod ? (
                              <div className="form-row mb-4">
                                <div className="col">
                                  <label
                                    style={{
                                      color: "white",
                                      marginBottom: "5px",
                                      fontSize: "130%",
                                    }}
                                  >
                                    Amount:
                                  </label>
                                  <input
                                    type="text"
                                    name="amount"
                                    className="form-control"
                                    placeholder="Enter Amount"
                                    style={{ fontSize: "1rem" }}
                                    onChange={this.handleChange}
                                    value={this.state.amount}
                                    required
                                  />
                                </div>
                                <div className="col">
                                  <label
                                    style={{
                                      color: "white",
                                      marginBottom: "5px",
                                      fontSize: "130%",
                                    }}
                                  >
                                    Receit No:
                                  </label>
                                  <input
                                    type="text"
                                    name="receitNo"
                                    className="form-control"
                                    placeholder="Enter Receit No"
                                    style={{ fontSize: "1rem" }}
                                    onChange={this.handleChange}
                                    value={this.state.receitNo}
                                    required
                                  />
                                </div>
                              </div>
                            ) : null}

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
                                  Confirm
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

const mapStateToProps = (state) => {
  return {
    allUsers: state.users.users,
  };
};
export default connect(mapStateToProps, {
  uploadLotRedux,
  updateLotRedux,
  rechargeUserRedux,
  getAllOrdersOfSingleLotRedux,
})(RechargeWalletModal);
