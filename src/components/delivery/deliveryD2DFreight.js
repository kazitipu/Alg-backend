import React, { Component, Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import Datatable from "./deliveryD2DFreightDatatable";
import { getAllOrdersOfSingleLotRedux } from "../../actions/index";

import AdditionalInfoModal from "./additionalInfoModal";
import DeliveryAndNoteModal from "./deliveryAndNoteModal";
import { connect } from "react-redux";
import { Search } from "react-feather";

import { withRouter } from "react-router-dom";

export class DeliveryD2DFreight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allOrders: [],
      toggleModalAdditionalInfo: true,
      toggleModalDeliveryAndNote: true,
      parcelObj: null,
      parcelsArray: [],
    };
  }

  componentDidMount = async () => {
    const [
      shipmentMethod,
      lotNo,
    ] = this.props.match.params.shipmentMethodLotNo.split("-");
    await this.props.getAllOrdersOfSingleLotRedux({ shipmentMethod, lotNo });
    this.setState({ allOrders: this.props.orders });
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState(
      { allOrders: nextProps.orders },
      console.log(nextProps.orders)
    );
  };

  startToggleModalAdditionalInfo = async (parcelObj) => {
    if (parcelObj) {
      this.setState({
        toggleModalAdditionalInfo: !this.state.toggleModalAdditionalInfo,
        parcelObj,
      });
    } else {
      this.setState({
        toggleModalAdditionalInfo: !this.state.toggleModalAdditionalInfo,
        parcelObj: null,
      });
    }
  };
  startToggleModalDeliveryAndNote = async (parcelsArray) => {
    if (parcelsArray && parcelsArray.length > 0) {
      this.setState({
        toggleModalDeliveryAndNote: !this.state.toggleModalDeliveryAndNote,
        parcelsArray,
      });
    } else {
      this.setState({
        toggleModalDeliveryAndNote: !this.state.toggleModalDeliveryAndNote,
        parcelsArray: [],
      });
    }
  };

  render() {
    const { allOrders } = this.state;
    const lotNo = this.props.match.params.shipmentMethodLotNo.split("-")[1];
    return (
      <Fragment>
        <AdditionalInfoModal
          toggleModalAdditionalInfo={this.state.toggleModalAdditionalInfo}
          startToggleModalAdditionalInfo={this.startToggleModalAdditionalInfo}
          parcelObj={this.state.parcelObj}
        />
        <DeliveryAndNoteModal
          toggleModalDeliveryAndNote={this.state.toggleModalDeliveryAndNote}
          startToggleModalDeliveryAndNote={this.startToggleModalDeliveryAndNote}
          parcelsArray={this.state.parcelsArray}
        />
        <Breadcrumb title={lotNo} parent="Delivery" />

        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div
                  className="card-header"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <h5>
                    <span
                      style={{
                        color: "#5ec3db",
                        fontSize: "150%",
                        fontWeight: "bold",
                        textTransform: "none",
                      }}
                    >
                      <i
                        className="icofont-ship"
                        style={{ color: "black" }}
                      ></i>
                      Lot No: {lotNo}
                    </span>
                  </h5>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <li
                      style={{
                        border: "1px solid gainsboro",
                        borderRadius: "5rem",
                        padding: "0px 20px",
                        background: "whitesmoke",
                        marginRight: "20px",
                      }}
                    >
                      <form
                        className="form-inline search-form"
                        onSubmit={this.handleSubmit}
                      >
                        <div
                          // className="form-group"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                          }}
                        >
                          <input
                            className={
                              "form-control-plaintext " +
                              (this.state.searchbar ? "open" : "")
                            }
                            name="searchFor"
                            value={this.state.searchFor}
                            type="search"
                            placeholder="Search Order"
                            onChange={this.handleChange}
                          />
                          <span
                            // className="d-sm-none mobile-search"
                            onClick={() => this.handleSearchClick()}
                          >
                            <Search
                              style={{
                                marginTop: "5px",
                                borderLeft: "1px solid gainsboro",
                                paddingLeft: "7px",
                                color: "gray",
                              }}
                            />
                          </span>
                        </div>
                      </form>
                    </li>
                  </div>
                </div>

                <div className="card-body order-datatable">
                  <Datatable
                    startToggleModalAdditionalInfo={
                      this.startToggleModalAdditionalInfo
                    }
                    startToggleModalDeliveryAndNote={
                      this.startToggleModalDeliveryAndNote
                    }
                    multiSelectOption={true}
                    myData={allOrders}
                    pageSize={10}
                    pagination={true}
                    class="-striped -highlight"
                    lotNo={lotNo}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.ordersAlg.orders,
  };
};

export default withRouter(
  connect(mapStateToProps, { getAllOrdersOfSingleLotRedux })(DeliveryD2DFreight)
);
