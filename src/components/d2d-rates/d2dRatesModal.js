import React, { Component } from "react";
import "./d2dRatesModal.css";
import { uploadD2DRatesRedux, updateD2DRatesRedux } from "../../actions/index";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
class D2DRatesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      parcel: "",
      ten: "",
      eleven: "",
      "100kg": "",
      below_1000kg: "",
      above_1000kg: "",
    };
  }

  componentWillReceiveProps = (nextProps) => {
    const { singleLot } = nextProps;
    console.log(singleLot);
    console.log("create Lot modal component will receive props is called");
    const [freightType, country] = nextProps.match.params.country.split("-");
    if (singleLot != null) {
      if (freightType === "air") {
        this.setState({
          id: singleLot["Product Type"],
          parcel: singleLot["Parcel"].replace("tk/kg", ""),
          ten: singleLot["Below 10kg"].replace("tk/kg", ""),
          eleven: singleLot["Above 10kg"].replace("tk/kg", ""),
        });
      } else {
        this.setState({
          id: singleLot["Product Type"],
          "100kg": singleLot["100kg"].replace("tk/kg", ""),
          below_1000kg: singleLot["Below 1000kg"].replace("tk/kg", ""),
          above_1000kg: singleLot["Above 1000kg"].replace("tk/kg", ""),
        });
      }
    } else {
      this.setState({
        id: "",
        parcel: "",
        ten: "",
        eleven: "",
        "100kg": "",
        below_1000kg: "",
        above_1000kg: "",
      });
    }
  };

  handleSubmit = async (event) => {
    const [freightType, country] = this.props.match.params.country.split("-");
    event.preventDefault();
    if (this.props.singleLot === null) {
      if (freightType === "air") {
        const airRateObj = {
          id: this.state.id,
          parcel: this.state.parcel,
          ten: this.state.ten,
          eleven: this.state.eleven,
        };
        await this.props.uploadD2DRatesRedux(freightType, country, airRateObj);
      } else {
        const seaRateObj = {
          id: this.state.id,
          "100kg": this.state["100kg"],
          below_1000kg: this.state.below_1000kg,
          above_1000kg: this.state.above_1000kg,
        };
        await this.props.uploadD2DRatesRedux(freightType, country, seaRateObj);
      }

      toast.success(`Successfully created rate for ${this.state.id}`);
    } else {
      if (freightType === "sea") {
        const airRateObj = {
          id: this.state.id,
          parcel: this.state.parcel,
          ten: this.state.ten,
          eleven: this.state.eleven,
        };
        await this.props.updateD2DRatesRedux(freightType, country, airRateObj);
      } else {
        const seaRateObj = {
          id: this.state.id,
          "100kg": this.state["100kg"],
          below_1000kg: this.state.below_1000kg,
          above_1000kg: this.state.above_1000kg,
        };
        await this.props.updateD2DRatesRedux(freightType, country, seaRateObj);
      }

      toast.success(`successfully updated rate for ${this.state.id}`);
    }

    this.setState({
      id: "",
      parcel: "",
      ten: "",
      eleven: "",
      "100kg": "",
      below_1000kg: "",
      above_1000kg: "",
    });
    this.props.startToggleModal(null);
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    console.log(this.props.singleLot);
    const [freightType, country] = this.props.match.params.country.split("-");
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
              className="modal-content visible-modal-content-3"
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
                            {!this.props.singleLot
                              ? "Create New Product Type"
                              : "Update Product Type"}
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
                                  Proudct Type
                                </label>
                                <input
                                  type="text"
                                  name="id"
                                  className="form-control"
                                  placeholder="Enter Product Type"
                                  style={{ fontSize: "1rem" }}
                                  onChange={this.handleChange}
                                  value={this.state.id}
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
                                  {freightType === "air" ? "Parcel" : "100kg"}{" "}
                                  Parcel
                                </label>
                                <input
                                  type="number"
                                  required
                                  name={
                                    freightType === "air" ? "parcel" : "100kg"
                                  }
                                  className="form-control"
                                  placeholder="Enter rate/kg"
                                  onChange={this.handleChange}
                                  value={
                                    freightType === "air"
                                      ? this.state.parcel
                                      : this.state["100kg"]
                                  }
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
                                  {freightType === "air"
                                    ? "Below 10kg"
                                    : "Below 1000kg"}
                                </label>
                                <input
                                  type="number"
                                  required
                                  name={
                                    freightType === "air"
                                      ? "ten"
                                      : "below_1000kg"
                                  }
                                  className="form-control"
                                  placeholder="Enter rate/kg"
                                  onChange={this.handleChange}
                                  value={
                                    freightType === "air"
                                      ? this.state.ten
                                      : this.state.below_1000kg
                                  }
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
                                  {freightType === "air"
                                    ? "Above 10kg"
                                    : "Above 1000kg"}
                                </label>
                                <input
                                  type="number"
                                  name={
                                    freightType === "air"
                                      ? "eleven"
                                      : "above_1000kg"
                                  }
                                  className="form-control"
                                  placeholder="Enter rate/kg"
                                  onChange={this.handleChange}
                                  value={
                                    freightType === "air"
                                      ? this.state.eleven
                                      : this.state.above_1000kg
                                  }
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
                                    Create Product Type
                                    <i className="icofont-rounded-right"></i>
                                  </button>
                                ) : (
                                  <button
                                    type="submit"
                                    className="btn btn-secondary"
                                  >
                                    Update Product Type
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

export default withRouter(
  connect(null, {
    updateD2DRatesRedux,
    uploadD2DRatesRedux,
  })(D2DRatesModal)
);
