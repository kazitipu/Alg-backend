import React, { Component, Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import Datatable from "./invoiceOrderListDatatable";
import { getAllOrdersOfSingleLotRedux } from "../../actions/index";
import { connect } from "react-redux";
import { Search } from "react-feather";
export class OrdersD2D extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFor: "",
      allOrders: [],
      toggleModalSelectLot: true,
      toggleModalCreateOrder: true,
      singleLot: null,
    };
  }

  componentDidMount = async () => {
    const [
      shipmentMethod,
      lotNo,
    ] = this.props.match.params.shipmentMethodLotNo.split("-");
    let shippingMethod;
    if (shipmentMethod.includes("D2D")) {
      shippingMethod = "D2D";
    } else {
      shippingMethod = "Freight";
    }
    await this.props.getAllOrdersOfSingleLotRedux({
      shipmentMethod: shippingMethod,
      lotNo,
    });
    this.setState({ allOrders: this.props.orders });
  };
  componentWillReceiveProps = (nextProps) => {
    this.setState({ allOrders: nextProps.orders });
  };

  handleSearchBarChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { allOrders } = this.state;
    return (
      <Fragment>
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
                  <h5>Invoice Orders</h5>
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
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
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
                    multiSelectOption={false}
                    myData={
                      !this.state.searchFor
                        ? allOrders
                        : allOrders.filter(
                            (order) =>
                              order.shippingMark
                                .toLowerCase()
                                .includes(this.state.searchFor) ||
                              order.cartonNo.includes(this.state.searchFor)
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

export default connect(mapStateToProps, { getAllOrdersOfSingleLotRedux })(
  OrdersD2D
);
