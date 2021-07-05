import React, { Component } from "react";
import "./textOrMailModal.css";
import {
  uploadLotRedux,
  updateLotRedux,
  getAllOrdersOfSingleLotRedux,
} from "../../actions/index";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { SendSingleSms, SendBulkSms } from "../adnSms";
class TextOrMailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageBody: "",
      campaign_title: "",
    };
  }

  handleSubmitForLots = async (event) => {
    event.preventDefault();
    const { singleLot } = this.props;
    console.log(this.props);
    if (singleLot) {
      console.log(singleLot);
      const ordersArrayOfSinlgeLot =
        await this.props.getAllOrdersOfSingleLotRedux({
          lotNo: singleLot.Lot,
          shipmentMethod: singleLot.Shipment_Method.includes("D2D")
            ? "D2D"
            : "Freight",
        });
      if (ordersArrayOfSinlgeLot.length > 0) {
        const allCustomersUid = ordersArrayOfSinlgeLot.map(
          (order) => order.customerUid
        );
        const uniqueCustomerUids = [...new Set(allCustomersUid)];
        console.log(uniqueCustomerUids);

        const usersArray = this.props.allUsers.filter((user) =>
          uniqueCustomerUids.includes(user.uid)
        );

        const numberArray = usersArray
          .filter((user) => user.mobileNo)
          .map((user) => user.mobileNo);
        const numbers = [...new Set(numberArray)];
        // alert(numberArray);
        // alert(numbers);
        const emailArray = usersArray
          .filter((user) => user.email)
          .map((user) => user.email);
        // alert(emailArray);

        if (singleLot.action === "text") {
          // send text message to numbers
          console.log(numbers.toString());
          const response = await SendBulkSms(
            numbers.toString(),
            this.state.messageBody,
            this.state.campaign_title
          );
          if (response.data.api_response_code == 200) {
            toast.success("Message was sent successfully!");
          } else {
            toast.error("There was an error.Please try again.");
          }
          console.log(response);
        } else {
          // send email to emailArray
        }
      } else {
        alert(
          "There is no number added in this Lot's customer's profile to send sms."
        );
      }
    }
    this.setState({
      messageBody: "",
    });
    this.props.startToggleModal(null);
  };

  handleSubmitForCustomers = async (event) => {
    event.preventDefault();
    const { singleLot } = this.props;

    if (singleLot.allCustomers) {
      // send message to all Users
      const allUsers = this.props.allUsers;
      const numberArray = allUsers
        .filter((user) => user.mobileNo)
        .map((user) => user.mobileNo);
      const numbers = [...new Set(numberArray)];
      // alert(numberArray);
      // alert(numbers);

      const emailArray = allUsers
        .filter((user) => user.email)
        .map((user) => user.email);

      // alert(emailArray);
      if (singleLot.action === "text") {
        //  send text message to numberArray
        console.log(numbers.toString());
        const response = await SendBulkSms(
          numbers.toString(),
          this.state.messageBody,
          this.state.campaign_title
        );
        if (response.data.api_response_code == 200) {
          toast.success("Message was sent successfully!");
        } else {
          toast.error("There was an error.Please try again.");
        }
        console.log(response);
      } else {
        // send email to emailArray
      }
    } else {
      // send message or email to single User
      const userObj = this.props.allUsers.find(
        (user) => user.userId === singleLot["SL no"]
      );
      const number = userObj.mobileNo;
      const email = userObj.email;
      // alert(number);
      // alert(email);

      if (number && singleLot.action === "text") {
        // send text message to this number
        const response = await SendSingleSms(number, this.state.messageBody);
        if (response.data.api_response_code == 200) {
          toast.success("Message was sent successfully!");
        } else {
          toast.error(
            "An error occurred while sending message to this receipient. "
          );
        }
        console.log(response);
      } else {
        alert("This user don't have a number");
      }
      if (email && singleLot.action === "mail") {
        // send email to this number
      }
    }

    this.setState({
      messageBody: "",
    });
    this.props.startToggleModal(null);
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    console.log(this.props.singleLot);
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
              className="modal-content visible-modal-content-4"
              style={{
                backgroundColor:
                  this.props.singleLot && this.props.singleLot.action === "text"
                    ? "#67000a"
                    : "rgb(22 67 140)",
                boxShadow:
                  this.props.singleLot && this.props.singleLot.action === "text"
                    ? "rgb(107 58 63) 1px 5px 24px 0px"
                    : "rgb(29 47 76) 1px 5px 24px 0px",
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
                            {this.props.singleLot &&
                            this.props.singleLot.action === "text"
                              ? "Send Message"
                              : "Send Email"}
                          </h2>
                          <form
                            onSubmit={
                              this.props.singleLot &&
                              this.props.singleLot.from === "lots"
                                ? this.handleSubmitForLots
                                : this.handleSubmitForCustomers
                            }
                            className="rounded-field mt-4"
                          >
                            {this.props.singleLot &&
                              this.props.singleLot.allCustomers && (
                                <div className="form-row mb-4">
                                  <input
                                    type="text"
                                    name="campaign_title"
                                    className="form-control"
                                    placeholder="Campaign Title"
                                    style={{
                                      fontSize: "1rem",
                                    }}
                                    onChange={this.handleChange}
                                    value={this.state.campaign_title}
                                    required
                                  />
                                </div>
                              )}
                            {this.props.singleLot &&
                              this.props.singleLot.from === "lots" && (
                                <div className="form-row mb-4">
                                  <input
                                    type="text"
                                    name="campaign_title"
                                    className="form-control"
                                    placeholder="Campaign Title"
                                    style={{
                                      fontSize: "1rem",
                                    }}
                                    onChange={this.handleChange}
                                    value={this.state.campaign_title}
                                    required
                                  />
                                </div>
                              )}
                            <div className="form-row mb-4">
                              <textarea
                                type="text"
                                name="messageBody"
                                className="form-control"
                                placeholder="Enter text here..."
                                style={{ fontSize: "1rem", minHeight: "170px" }}
                                onChange={this.handleChange}
                                value={this.state.messageBody}
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
                                {this.props.singleLot &&
                                this.props.singleLot.action === "text" ? (
                                  <button
                                    type="submit"
                                    className="btn btn-secondary"
                                  >
                                    Send Message
                                    <i className="icofont-rounded-right"></i>
                                  </button>
                                ) : (
                                  <button
                                    type="submit"
                                    className="btn btn-secondary"
                                  >
                                    Send Email
                                    <i className="icofont-rounded-right"></i>
                                  </button>
                                )}
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
  getAllOrdersOfSingleLotRedux,
})(TextOrMailModal);
