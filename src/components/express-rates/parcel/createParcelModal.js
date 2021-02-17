import React, { Component } from "react";
import "./createParcelModal.css";
import { uploadLot, updateLot } from "../../../firebase/firebase.utils";
import {
  uploadExpressRatesParcelRedux,
  updateExpressRatesParcelRedux,
} from "../../../actions/index";
import { connect } from "react-redux";
import { toast } from "react-toastify";
class CreateParcelModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      half: "",
      one: "",
      oneAndHalf: "",
      two: "",
      twoAndHalf: "",
      three: "",
    };
  }

  componentWillReceiveProps = (nextProps) => {
    const { singleLot } = nextProps;
    console.log(singleLot);
    console.log("create Lot modal component will receive props is called");
    if (singleLot != null) {
      this.setState(
        {
          country: singleLot.Country,
          half: singleLot["0.5kg"].replace("tk", ""),
          one: singleLot["1kg"].replace("tk", ""),
          oneAndHalf: singleLot["1.5kg"].replace("tk", ""),
          two: singleLot["2kg"].replace("tk", ""),
          twoAndHalf: singleLot["2.5kg"].replace("tk", ""),
          three: singleLot["3kg"].replace("tk", ""),
        },
        () => {
          console.log(this.state);
        }
      );
    } else {
      this.setState({
        country: "",
        half: "",
        one: "",
        oneAndHalf: "",
        two: "",
        twoAndHalf: "",
        three: "",
      });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state);
    console.log(this.props.singleLot);
    if (this.props.singleLot === null) {
      await this.props.uploadExpressRatesParcelRedux(this.state);
      toast.success(`Successfully created rate for ${this.state.country}`);
    } else {
      await this.props.updateExpressRatesParcelRedux(this.state);
      toast.success(`successfully updated rate for ${this.state.country}`);
    }

    this.setState({
      country: "",
      half: "",
      one: "",
      oneAndHalf: "",
      two: "",
      twoAndHalf: "",
      three: "",
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
              className="modal-content visible-modal-content"
              style={{ backgroundColor: "#ff8084" }}
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
                            {!this.props.singleLot
                              ? "Create New Country Rate"
                              : "Update Country Rate"}
                          </h2>
                          <form
                            onSubmit={this.handleSubmit}
                            noValidate="novalidate"
                            className="rounded-field mt-4"
                          >
                            <div className="form-row mb-2">
                              <div className="col">
                                <label
                                  style={{
                                    color: "white",
                                    fontSize: "130%",
                                    marginBottom: "0px",
                                  }}
                                >
                                  Country
                                </label>
                                <input
                                  type="text"
                                  name="country"
                                  className="form-control"
                                  placeholder="Country name"
                                  style={{ fontSize: "1rem" }}
                                  onChange={this.handleChange}
                                  value={this.state.country}
                                  required
                                  readOnly={this.props.singleLot ? true : false}
                                />
                              </div>
                            </div>
                            <div className="form-row mb-2">
                              <div className="col">
                                <label
                                  style={{
                                    color: "white",
                                    fontSize: "130%",
                                    marginBottom: "0px",
                                  }}
                                >
                                  0.5kg
                                </label>
                                <input
                                  type="text"
                                  required
                                  name="half"
                                  className="form-control"
                                  placeholder="Enter rate"
                                  onChange={this.handleChange}
                                  value={this.state.half}
                                  required
                                />
                              </div>
                              <div className="col">
                                <label
                                  style={{
                                    color: "white",
                                    fontSize: "130%",
                                    marginBottom: "0px",
                                  }}
                                >
                                  1kg
                                </label>
                                <input
                                  type="text"
                                  required
                                  name="one"
                                  className="form-control"
                                  placeholder="Enter rate"
                                  onChange={this.handleChange}
                                  value={this.state.one}
                                  required
                                />
                              </div>
                            </div>
                            <div className="form-row mb-2">
                              <div className="col">
                                <label
                                  style={{
                                    color: "white",
                                    fontSize: "130%",
                                    marginBottom: "0px",
                                  }}
                                >
                                  1.5kg
                                </label>
                                <input
                                  type="text"
                                  name="oneAndHalf"
                                  className="form-control"
                                  placeholder="Enter rate"
                                  onChange={this.handleChange}
                                  value={this.state.oneAndHalf}
                                  required
                                />
                              </div>
                              <div className="col">
                                <label
                                  style={{
                                    color: "white",
                                    fontSize: "130%",
                                    marginBottom: "0px",
                                  }}
                                >
                                  2kg
                                </label>
                                <input
                                  type="text"
                                  name="two"
                                  className="form-control"
                                  placeholder="Enter rate"
                                  onChange={this.handleChange}
                                  value={this.state.two}
                                  required
                                />
                              </div>
                            </div>
                            <div className="form-row mb-2">
                              <div className="col">
                                <label
                                  style={{
                                    color: "white",
                                    fontSize: "130%",
                                    marginBottom: "0px",
                                  }}
                                >
                                  2.5kg
                                </label>
                                <input
                                  type="text"
                                  name="twoAndHalf"
                                  className="form-control"
                                  placeholder="Enter rate"
                                  onChange={this.handleChange}
                                  value={this.state.twoAndHalf}
                                  required
                                />
                              </div>
                              <div className="col">
                                <label
                                  style={{
                                    color: "white",
                                    fontSize: "130%",
                                    marginBottom: "0px",
                                  }}
                                >
                                  3kg
                                </label>
                                <input
                                  type="text"
                                  name="three"
                                  className="form-control"
                                  placeholder="Enter rate"
                                  onChange={this.handleChange}
                                  value={this.state.three}
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
                                {this.props.singleLot == null ? (
                                  <button
                                    type="submit"
                                    className="btn btn-secondary"
                                  >
                                    Create Rate
                                    <i className="icofont-rounded-right"></i>
                                  </button>
                                ) : (
                                  <button
                                    type="submit"
                                    className="btn btn-secondary"
                                  >
                                    Update Rate
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

export default connect(null, {
  updateExpressRatesParcelRedux,
  uploadExpressRatesParcelRedux,
})(CreateParcelModal);
