import React, { Component } from "react";
import "./createLotModal.css";
class CreateLotModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lotNo: "",
      selectCountry: "",
      shipmentMethod: "",
      shipmentStatus: "",
      shippingLine: "",
      shipmentDate: "",
      arrivalDate: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    this.setState({
      lotNo: "",
      selectCountry: "",
      shipmentMethod: "",
      shipmentStatus: "",
      shippingLine: "",
      shipmentDate: "",
      arrivalDate: "",
    });
    this.props.startToggleModal();
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
              className={
                this.props.toggleModal
                  ? "modal-content"
                  : "modal-content visible-modal-content"
              }
              style={{ backgroundColor: "#ff8084" }}
            >
              <div className="modal-body p-0">
                <section className="pos-rel bg-light-gray">
                  <div className="container-fluid p-3">
                    <a
                      onClick={() => this.props.startToggleModal()}
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
                            Create New Lot
                          </h2>
                          <form
                            onSubmit={this.handleSubmit}
                            noValidate="novalidate"
                            className="rounded-field mt-4"
                          >
                            <div className="form-row mb-4">
                              <div className="col">
                                <input
                                  type="text"
                                  name="lotNo"
                                  className="form-control"
                                  placeholder="Enter Lot no"
                                  style={{ fontSize: "1rem" }}
                                  onChange={this.handleChange}
                                  value={this.state.lotNo}
                                />
                              </div>
                              <div className="col">
                                <select
                                  title="Please choose a package"
                                  required=""
                                  name="selectCountry"
                                  className="custom-select"
                                  aria-required="true"
                                  aria-invalid="false"
                                  onChange={this.handleChange}
                                  value={this.state.selectCountry}
                                >
                                  <option value="">Select Country</option>
                                  <option value="China to Bangladesh">
                                    China to Bangladeh
                                  </option>
                                  <option value="Hongkong to Bangladesh">
                                    Hongkong to Bangladesh
                                  </option>
                                  <option value="Thailand to Bangladesh">
                                    Thailand to Bangladeh
                                  </option>
                                  <option value="India to Bangladesh">
                                    India to Bangladesh
                                  </option>
                                  <option value="Pakistan to Bangladesh">
                                    Pakistan to Bangladesh
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div className="form-row mb-4">
                              <div className="col">
                                <select
                                  title="Please choose a package"
                                  required=""
                                  name="shipmentMethod"
                                  className="custom-select"
                                  aria-required="true"
                                  aria-invalid="false"
                                  onChange={this.handleChange}
                                  value={this.state.shipmentMethod}
                                >
                                  <option value="">Shipment Method</option>
                                  <option value="Air (D2D)">Air (D2D)</option>
                                  <option value="Sea (D2D)">Sea (D2D)</option>
                                  <option value="Air (freight)">
                                    Air (freight)
                                  </option>
                                  <option value="Sea (freight)">
                                    Sea (freight)
                                  </option>
                                </select>
                              </div>
                              <div className="col">
                                <select
                                  title="Please choose a package"
                                  required=""
                                  name="shipmentStatus"
                                  className="custom-select"
                                  aria-required="true"
                                  aria-invalid="false"
                                  onChange={this.handleChange}
                                  value={this.state.shipmentStatus}
                                >
                                  <option value="">Shipment Status</option>
                                  <option value="Abroad Warehouse">
                                    Abroad Warehouse Received
                                  </option>
                                  <option value="Abroad Customs">
                                    Abroad Customs
                                  </option>
                                  <option value="Ready to Fly">
                                    Ready to Fly
                                  </option>
                                  <option value="Bangladesh Customs">
                                    Bangladesh Customs
                                  </option>
                                  <option value="Local Warehouse">
                                    Local Warehouse
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div className="form-row mb-4">
                              <div className="col">
                                <input
                                  type="text"
                                  name="shippingLine"
                                  className="form-control"
                                  placeholder="Enter shipping line"
                                  style={{ fontSize: "1rem" }}
                                  onChange={this.handleChange}
                                  value={this.state.shippingLine}
                                />
                              </div>
                            </div>
                            <div
                              className="form-row mb-3"
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <div>
                                <div style={{ color: "white" }}>
                                  Shipment Date
                                </div>
                                <input
                                  type="date"
                                  name="shipmentDate"
                                  className="form-control"
                                  placeholder="Shipment date"
                                  style={{ fontSize: "1rem" }}
                                  onChange={this.handleChange}
                                  value={this.state.shipmentDate}
                                />
                              </div>
                              <div>
                                <div style={{ color: "white" }}>
                                  Arrival Date(approx)
                                </div>
                                <input
                                  type="date"
                                  name="arrivalDate"
                                  className="form-control"
                                  placeholder="Approximate arrival date"
                                  style={{ fontSize: "1rem" }}
                                  onChange={this.handleChange}
                                  value={this.state.arrivalDate}
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
                                  Create Lot
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
export default CreateLotModal;
