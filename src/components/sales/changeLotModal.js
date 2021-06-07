import React, { Component } from "react";
import "./createOrderModal.css";
import {
  uploadLotRedux,
  updateLotRedux,
  deleteSingleOrderRedux,
} from "../../actions/index";
import { getSingleOrder, changeLotOrder } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "./selectLotModal.css";

class ChangeLotModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lotNo: "",
      showSuggestion: false,
      cursor: -1,
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    console.log(this.state.lotNo);
    console.log(this.props.parcelIdArray);

    const lotObj = this.props.allLots.find(
      (lot) => lot.lotNo === this.state.lotNo
    );
    this.props.parcelIdArray.map(async (parcelId) => {
      const parcelObj = await getSingleOrder(parcelId);
      const newShipmentMethod = lotObj.shipmentMethod.includes("D2D")
        ? "D2D"
        : "Freight";
      const newLotNo = this.state.lotNo;
      const newParcelId = `${this.state.lotNo}-${parcelObj.cartonNo}`;

      await this.props.deleteSingleOrderRedux(parcelObj);
      await changeLotOrder(
        {
          ...parcelObj,
          lotNo: newLotNo,
          parcelId: newParcelId,
          shipmentMethod: newShipmentMethod,
        },
        parcelId
      );
    });
    console.log(lotObj);

    this.props.startToggleModalChangeLot([]);
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, showSuggestion: true }, () => {
      if (this.state.lotNo === "") {
        this.setState({ cursor: -1 });
      }
    });
  };

  handleKeyDown = (e) => {
    const { cursor } = this.state;
    const result = this.props.allLots
      .filter((lot) => {
        const lowerCaseLotNo = lot.lotNo.toLowerCase();
        const lowerCaseLotNoState = this.state.lotNo.toLowerCase();
        return lowerCaseLotNo.includes(lowerCaseLotNoState);
      })
      .slice(0, 5);

    if (e.keyCode === 38 && cursor > -1) {
      this.setState((prevState) => ({
        cursor: prevState.cursor - 1,
        // lotNo: result.find((lot, index) => cursor == index),
      }));
    } else if (e.keyCode === 40 && cursor < result.length - 1) {
      this.setState((prevState) => ({
        cursor: prevState.cursor + 1,
      }));
    }
  };

  render() {
    console.log(this.state.cursor);
    return (
      <>
        <div
          className={
            this.props.toggleModalChangeLot
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
                        this.props.startToggleModalChangeLot([]);
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
                                  onKeyDown={this.handleKeyDown}
                                  value={this.state.lotNo}
                                  placeholder="Enter lot No"
                                  required
                                  autoComplete="off"
                                  readOnly={this.props.fixedLot ? true : false}
                                />
                                <ul
                                  className="below-searchbar-recommendation"
                                  style={{
                                    display: !this.props.fixedLot
                                      ? this.state.showSuggestion
                                        ? "flex"
                                        : "none"
                                      : "none",
                                  }}
                                >
                                  {this.state.lotNo
                                    ? this.props.allLots
                                        .filter((lot) => {
                                          const lowerCaseLotNo =
                                            lot.lotNo.toLowerCase();
                                          const lowerCaseLotNoState =
                                            this.state.lotNo.toLowerCase();
                                          return lowerCaseLotNo.includes(
                                            lowerCaseLotNoState
                                          );
                                        })
                                        .slice(0, 5)
                                        .map((lot, index) => (
                                          <li
                                            style={{
                                              minWidth: "400px",
                                              backgroundColor:
                                                this.state.cursor == index
                                                  ? "gainsboro"
                                                  : "white",
                                            }}
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
export default connect(mapStateToProps, {
  uploadLotRedux,
  updateLotRedux,
  deleteSingleOrderRedux,
})(ChangeLotModal);
