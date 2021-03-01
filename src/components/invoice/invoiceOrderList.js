import React, { Component, Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import Datatable from "./invoiceOrderListDatatable";
import { getAllOrdersOfSingleLotRedux } from "../../actions/index";
import { connect } from "react-redux";

export class OrdersD2D extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
                  <h5>Manage Orders</h5>
                  <button className="btn btn-primary" type="button">
                    Create Order
                  </button>
                </div>

                <div className="card-body order-datatable">
                  <Datatable
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
  OrdersD2D
);
