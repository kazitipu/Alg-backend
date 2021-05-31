import React, { Component, Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import Datatable from "./ordersD2DFreightDatatable";
import { getAllOrdersOfSingleLotRedux, get } from "../../actions/index";
import CreateOrderModal from "./createOrderModal";
import SelectLotModal from "./selectLotModal";
import AdditionalInfoModal from "./additionalInfoModal";
import { connect } from "react-redux";
import { Search } from "react-feather";
import { ExportCSV } from "./exportCsv";
import { withRouter } from "react-router-dom";
import PrintSticker from "./printSticker";
export class OrdersD2DFreight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFor: "",
      allOrders: [],
      toggleModalSelectLot: true,
      toggleModalCreateOrder: true,
      toggleModalAdditionalInfo: true,
      singleLot: null,
      parcelObj: null,
    };
  }

  componentDidMount = async () => {
    const [shipmentMethod, lotNo] =
      this.props.match.params.shipmentMethodLotNo.split("-");
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

  handleSearchBarChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
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
                            onChange={this.handleSearchBarChange}
                          />
                          <span
                          // className="d-sm-none mobile-search"
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
                        className="btn"
                        type="button"
                        style={{ background: "rgb(68 0 97)", color: "white" }}
                        onClick={() => this.startToggleModalSelectLot(lotNo)}
                      >
                        Create Order
                      </button>
                    </li>
                  </div>
                </div>
                {allOrders.length > 0 ? (
                  <ExportCSV csvData={allOrders} fileName={lotNo} />
                ) : null}
                {/* <PrintSticker /> */}
                <div className="card-body order-datatable">
                  <Datatable
                    startToggleModalAdditionalInfo={
                      this.startToggleModalAdditionalInfo
                    }
                    multiSelectOption={false}
                    myData={
                      !this.state.searchFor
                        ? allOrders
                        : allOrders.filter(
                            (orderObj) =>
                              orderObj.shippingMark
                                .toLowerCase()
                                .includes(this.state.searchFor) ||
                              orderObj.cartonNo.includes(this.state.searchFor)
                          )
                    }
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

export default withRouter(
  connect(mapStateToProps, { getAllOrdersOfSingleLotRedux })(OrdersD2DFreight)
);
