import React, { Component, Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/orders";
import Datatable from "./ordersExpressDatatable";
import { getAllExpressOrdersRedux } from "../../actions/index";
import CreateOrderModal from "./createOrderModal";
import SelectLotModal from "./selectLotModal";
import { connect } from "react-redux";

export class OrdersExpress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allExpressOrders: [],
    };
  }

  componentDidMount = async () => {
    console.log(this.props);
    await this.props.getAllExpressOrdersRedux();
    this.setState({ allExpressOrders: this.props.allExpressOrders });
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({ allExpressOrders: nextProps.allExpressOrders });
  };

  render() {
    const { allExpressOrders } = this.state;
    return (
      <Fragment>
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
                  <h5>Manage Orders</h5>
                </div>

                <div className="card-body order-datatable">
                  <Datatable
                    multiSelectOption={false}
                    myData={allExpressOrders}
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

const mapStateToProps = (state, ownProps) => {
  const allOrders = state.ordersAlg.ordersExpress
    .filter((order) => order.month == ownProps.match.params.month)
    .map((order) => order.allOrders);

  var allOrdersArray = [].concat.apply([], allOrders);
  console.log(allOrdersArray);

  return {
    allExpressOrders: allOrdersArray,
  };
};

export default connect(mapStateToProps, { getAllExpressOrdersRedux })(
  OrdersExpress
);
