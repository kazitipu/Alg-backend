import React, { Component, Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/orders";
import Datatable from "./ordersD2DFreightDatatable";

import { getAllOrdersOfSingleLotRedux, get } from "../../actions/index";
import CreateOrderModal from "./createOrderModal";
import SelectLotModal from "./selectLotModal";
import AdditionalInfoModal from "./additionalInfoModal";
import { connect } from "react-redux";
import { Search } from "react-feather";

export class OrdersD2DFreight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allOrders: [],
      toggleModalSelectLot: true,
      toggleModalCreateOrder: true,
      toggleModalAdditionalInfo: true,
      singleLot: null,
      parcelObj: null,
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

  startToggleModalCreateOrder = async (lotObj) => {
    if (lotObj == null) {
      this.setState({
        toggleModalCreateOrder: !this.state.toggleModalCreateOrder,
        singleLot: null,
      });
    } else {
      console.log(lotObj);
      this.setState({
        toggleModalCreateOrder: !this.state.toggleModalCreateOrder,
        singleLot: lotObj,
      });
    }
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

  startToggleModalSelectLot = async (fixedLot) => {
    this.setState(
      {
        toggleModalSelectLot: !this.state.toggleModalSelectLot,
        fixedLot,
      },
      console.log(fixedLot)
    );
  };

  render() {
    const { allOrders } = this.state;
    const lotNo = this.props.match.params.shipmentMethodLotNo.split("-")[1];
    return (
      <Fragment>
        <CreateOrderModal
          toggleModalCreateOrder={this.state.toggleModalCreateOrder}
          startToggleModalCreateOrder={this.startToggleModalCreateOrder}
          singleLot={this.state.singleLot}
        />
        <AdditionalInfoModal
          toggleModalAdditionalInfo={this.state.toggleModalAdditionalInfo}
          startToggleModalAdditionalInfo={this.startToggleModalAdditionalInfo}
          parcelObj={this.state.parcelObj}
        />
        <SelectLotModal
          toggleModalSelectLot={this.state.toggleModalSelectLot}
          startToggleModalSelectLot={this.startToggleModalSelectLot}
          startToggleModalCreateOrder={this.startToggleModalCreateOrder}
          singleLot={this.state.singleLot}
          fixedLot={this.state.fixedLot}
        />
        <Breadcrumb title="Orders" parent="Sales" />

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
                    <li>
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => this.startToggleModalSelectLot(lotNo)}
                      >
                        Create Order
                      </button>
                    </li>
                  </div>
                </div>

                <div className="card-body order-datatable">
                  <Datatable
                    startToggleModalAdditionalInfo={
                      this.startToggleModalAdditionalInfo
                    }
                    multiSelectOption={false}
                    myData={allOrders}
                    pageSize={10}
                    pagination={true}
                    class="-striped -highlight"
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

export default connect(mapStateToProps, { getAllOrdersOfSingleLotRedux })(
  OrdersD2DFreight
);
