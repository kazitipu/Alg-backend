import React, { Component, Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/orders";
import Datatable from "./ordersD2DLotsDatatable";
import { getAllLotsRedux } from "../../actions/index";
import CreateOrderModal from "./createOrderModal";
import SelectLotModal from "./selectLotModal";
import { connect } from "react-redux";

export class OrdersD2DLots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allLotsD2D: [],
      toggleModalSelectLot: true,
      toggleModalCreateOrder: true,
      singleLot: null,
    };
  }

  componentDidMount = async () => {
    await this.props.getAllLotsRedux();
    this.setState({ allLotsD2D: this.props.allLotsD2D });
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({ allLotsD2D: nextProps.allLotsD2D });
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

  startToggleModalSelectLot = async (button) => {
    this.setState({ toggleModalSelectLot: !this.state.toggleModalSelectLot });
    // if (button !== "close") {
    //   this.setState({
    //     toggleModalCreateOrder: !this.state.toggleModalCreateOrder,
    //   });
    // }
  };

  render() {
    const { allLotsD2D } = this.state;
    return (
      <Fragment>
        <CreateOrderModal
          toggleModalCreateOrder={this.state.toggleModalCreateOrder}
          startToggleModalCreateOrder={this.startToggleModalCreateOrder}
          singleLot={this.state.singleLot}
        />
        <SelectLotModal
          toggleModalSelectLot={this.state.toggleModalSelectLot}
          startToggleModalSelectLot={this.startToggleModalSelectLot}
          startToggleModalCreateOrder={this.startToggleModalCreateOrder}
          singleLot={this.state.singleLot}
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
                  <h5>Manage Orders</h5>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => {
                      this.startToggleModalSelectLot(null);
                    }}
                  >
                    Create Order
                  </button>
                </div>

                <div className="card-body order-datatable">
                  <Datatable
                    multiSelectOption={false}
                    myData={allLotsD2D}
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
    allLotsD2D: state.lots.lots.filter((lot) =>
      lot.shipmentMethod.includes("D2D")
    ),
  };
};

export default connect(mapStateToProps, { getAllLotsRedux })(OrdersD2DLots);
