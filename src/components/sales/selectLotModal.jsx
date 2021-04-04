import React, { Component } from "react";
import "./createOrderModal.css";
import { uploadLotRedux, updateLotRedux } from "../../actions/index";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "./selectLotModal.css";

class SelectLotModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lotNo: "",
      showSuggestion: true,
    };
  }

  componentDidMount = () => {
    if (this.props.fixedLot) {
      this.setState({ lotNo: this.props.fixedLot });
    }
  };
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.fixedLot) {
      this.setState({ lotNo: nextProps.fixedLot });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.startToggleModalSelectLot(null);
    const lotObj = this.props.allLots.find(
      (lot) => lot.lotNo === this.state.lotNo
    );
    this.props.startToggleModalCreateOrder(lotObj);
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, showSuggestion: true });
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
              className="modal-content visible-modal-content-3"
              style={{ backgroundColor: "rgb(68 0 97)" }}
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
                                <input
                                  title="Please choose a package"
                                  required
                                  name="lotNo"
                                  className="form-control"
                                  aria-required="true"
                                  aria-invalid="false"
                                  onChange={this.handleChange}
                                  value={this.state.lotNo}
                                  placeholder="Enter lot No"
                                  required
                                  autoComplete="off"
                                  readOnly={this.props.fixedLot ? true : false}
                                />
                                <ul
                                  className="below-searchbar-recommendation"
                                  style={{
                                    display: this.state.showSuggestion
                                      ? "flex"
                                      : "none",
                                  }}
                                >
                                  {this.state.lotNo
                                    ? this.props.allLots
                                        .filter((lot) =>
                                          lot.lotNo.includes(this.state.lotNo)
                                        )
                                        .slice(0, 5)
                                        .map((lot) => (
                                          <li
                                            style={{ minWidth: "400px" }}
                                            key={lot.lotNo}
                                            onClick={() =>
                                              this.setState({
                                                lotNo: lot.lotNo,
                                                showSuggestion: false,
                                              })
                                            }
                                          >
                                            {lot.lotNo}
                                          </li>
                                        ))
                                    : null}
                                </ul>
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
const mapStateToProps = (state) => {
  return {
    allLots: state.lots.lots,
  };
};
export default connect(mapStateToProps, { uploadLotRedux, updateLotRedux })(
  SelectLotModal
);
