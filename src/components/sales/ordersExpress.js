import React, { Component, Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/orders";
import Datatable from "./ordersExpressDatatable";
import { getAllReceivedExpressBookingsRedux } from "../../actions/index";
import ChangeExpressStatusModal from "./changeExpressStatusModal";
import SelectLotModal from "./selectLotModal";
import { connect } from "react-redux";
import { Search } from "react-feather";
import { ExportCSV } from "./exportCsv";
import { withRouter } from "react-router-dom";
export class OrdersExpress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allExpressOrders: [],
      toggleModal: true,
      singleParcel: null,
    };
  }

  componentDidMount = async () => {
    console.log(this.props);
    await this.props.getAllReceivedExpressBookingsRedux(
      this.props.match.params.month
    );
    this.setState({
      allExpressOrders: this.props.allExpressOrders.filter(
        (order) => order.orderStatus !== "Delivered"
      ),
    });
  };

  componentWillReceiveProps = async (nextProps) => {
    this.setState({
      allExpressOrders: nextProps.allExpressOrders.filter(
        (order) => order.orderStatus !== "Delivered"
      ),
    });
  };

  startToggleModal = async (parcelObj) => {
    if (parcelObj == null) {
      this.setState({
        toggleModal: !this.state.toggleModal,
        singleParcel: null,
      });
    } else {
      this.setState({
        toggleModal: !this.state.toggleModal,
        singleParcel: parcelObj,
      });
    }
  };

  render() {
    const { allExpressOrders } = this.state;
    const { month } = this.props.match.params;
    return (
      <Fragment>
        <ChangeExpressStatusModal
          toggleModal={this.state.toggleModal}
          startToggleModal={this.startToggleModal}
          singleParcel={this.state.singleParcel}
          {...this.props}
        />
        <Breadcrumb title="express" parent="orders" />

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
                    {" "}
                    <i
                      className="icofont-shopping-cart"
                      style={{
                        fontSize: "180%",
                        marginRight: "5px",
                        marginTop: "5px",
                        color: "#ff8084",
                      }}
                    ></i>
                    Manage Orders
                  </h5>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    {" "}
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
                            placeholder="Search Express Order"
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
                {allExpressOrders.length > 0 ? (
                  <ExportCSV csvData={allExpressOrders} fileName={month} />
                ) : null}

                <div className="card-body order-datatable">
                  <Datatable
                    multiSelectOption={false}
                    myData={allExpressOrders}
                    pageSize={10}
                    pagination={true}
                    class="-striped -highlight"
                    startToggleModal={this.startToggleModal}
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

const mapStateToProps = (state, ownProps) => {
  return {
    allExpressOrders: state.ordersAlg.ordersExpress,
  };
};

export default withRouter(
  connect(mapStateToProps, { getAllReceivedExpressBookingsRedux })(
    OrdersExpress
  )
);
