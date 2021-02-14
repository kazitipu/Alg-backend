import React, { Component } from "react";
import "./createOrderModal.css";
import { uploadLotRedux, updateLotRedux } from "../../actions/index";
import { connect } from "react-redux";
import { toast } from "react-toastify";
class SelectLotModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lotNo: "",
    };
  }

  componentWillReceiveProps = (nextProps) => {};

  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.startToggleModalSelectLot(null);
    this.props.startToggleModalCreateOrder(this.state);
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
            this.props.toggleModalSelectLot
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
                        this.setState({ lotNo: "" });
                        this.props.startToggleModalSelectLot(null);
                      }}
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
                            Select Lot No
                          </h2>
                          <form
                            onSubmit={this.handleSubmit}
                            noValidate="novalidate"
                            className="rounded-field mt-4"
                          >
                            <div className="form-row mb-4">
                              <div className="col">
                                <select
                                  title="Please choose a package"
                                  required
                                  name="lotNo"
                                  className="custom-select"
                                  aria-required="true"
                                  aria-invalid="false"
                                  onChange={this.handleChange}
                                  value={this.state.lotNo}
                                  required
                                >
                                  <option value="">Select Lot No</option>
                                  <option value="ALG551">ALG551</option>
                                  <option value="ALG552">ALG552</option>
                                  <option value="ALG553">ALG553</option>
                                  <option value="ALG554">ALG554</option>
                                  <option value="ALG555">ALG555</option>
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
                                  style={{
                                    display:
                                      this.state.lotNo == "" ? "none" : "block",
                                  }}
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

export default connect(null, { uploadLotRedux, updateLotRedux })(
  SelectLotModal
);
