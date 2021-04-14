import React, { Component } from "react";
import "./updateProfileModal.css";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { updateAdminRedux } from "../../actions/index";
class UpdateProfileModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      additionalEmail: "",
      mobileNo: "",
      address: "",
      company: "",
    };
  }

  componentWillReceiveProps = (nextProps) => {
    const { currentAdmin } = nextProps;
    console.log("create Lot modal component will receive props is called");
    if (currentAdmin != null) {
      this.setState(
        {
          name: currentAdmin.name ? currentAdmin.name : "",
          additionlEmail: currentAdmin.additionalEmail
            ? currentAdmin.additionalEmail
            : "",
          mobileNo: currentAdmin.mobileNo ? currentAdmin.mobileNo : "",
          address: currentAdmin.address ? currentAdmin.address : "",
          company: currentAdmin.company ? currentAdmin.company : "",
        },
        () => {
          console.log(this.state);
        }
      );
    } else {
      this.setState({
        name: "",
        additionalEmail: "",
        mobileNo: "",
        address: "",
        company: "",
      });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state);
    const { currentAdmin } = this.props;
    await this.props.updateAdminRedux({ ...currentAdmin, ...this.state });

    this.setState({
      name: "",
      additionalEmail: "",
      mobileNo: "",
      address: "",
      company: "",
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
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div
              className="modal-content visible-modal-content-4"
              style={{ backgroundColor: "rgb(57 124 125)", maxWidth: "500px" }}
            >
              <div className="modal-body p-0">
                <section className="pos-rel">
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
                            Update Profile information
                          </h2>
                          <form
                            onSubmit={this.handleSubmit}
                            className="rounded-field mt-4"
                          >
                            <div className="form-row mb-4">
                              <label
                                style={{
                                  color: "white",
                                  marginBottom: "7px",
                                  fontSize: "150%",
                                }}
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Enter Full Name"
                                style={{ fontSize: "1rem" }}
                                onChange={this.handleChange}
                                value={this.state.name}
                                required
                              />
                            </div>
                            <div className="form-row mb-4">
                              <label
                                style={{
                                  color: "white",
                                  marginBottom: "7px",
                                  fontSize: "150%",
                                }}
                              >
                                Additional Email
                              </label>
                              <input
                                type="text"
                                name="additionalEmail"
                                className="form-control"
                                placeholder="Enter Additioanl Email account"
                                style={{ fontSize: "1rem" }}
                                onChange={this.handleChange}
                                value={this.state.additionalEmail}
                              />
                            </div>
                            <div className="form-row mb-4">
                              <label
                                style={{
                                  color: "white",
                                  marginBottom: "7px",
                                  fontSize: "150%",
                                }}
                              >
                                Mobile No
                              </label>
                              <input
                                type="text"
                                name="mobileNo"
                                className="form-control"
                                placeholder="Enter Mobile No"
                                style={{ fontSize: "1rem" }}
                                onChange={this.handleChange}
                                value={this.state.mobileNo}
                                required
                              />
                            </div>
                            <div className="form-row mb-4">
                              <label
                                style={{
                                  color: "white",
                                  marginBottom: "7px",
                                  fontSize: "150%",
                                }}
                              >
                                Address
                              </label>
                              <textarea
                                type="text"
                                name="address"
                                className="form-control"
                                placeholder="Enter Your Detail Address"
                                style={{ fontSize: "1rem" }}
                                onChange={this.handleChange}
                                value={this.state.address}
                                required
                              />
                            </div>
                            <div className="form-row mb-4">
                              <label
                                style={{
                                  color: "white",
                                  marginBottom: "7px",
                                  fontSize: "150%",
                                }}
                              >
                                Company
                              </label>
                              <input
                                type="text"
                                name="company"
                                className="form-control"
                                placeholder="Comapany Name"
                                style={{ fontSize: "1rem" }}
                                onChange={this.handleChange}
                                value={this.state.company}
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
    );
  }
}

export default connect(null, { updateAdminRedux })(UpdateProfileModal);
