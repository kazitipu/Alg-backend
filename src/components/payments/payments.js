import React, { Component, Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import Datatable from "./paymentsDatatable";
import { connect } from "react-redux";
import { getAllPaymentDayRedux } from "../../actions/index";

export class Payments extends Component {
  componentDidMount = async () => {
    await this.props.getAllPaymentDayRedux();
  };
  render() {
    return (
      <Fragment>
        <Breadcrumb title="Payments Days" parent="Payments" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Payments</h5>
                </div>
                <div className="card-body">
                  <div
                    id="batchDelete"
                    className="category-table order-table coupon-list-delete"
                  >
                    <Datatable
                      multiSelectOption={false}
                      myData={this.props.allPaymentDays}
                      pageSize={10}
                      pagination={true}
                      class="-striped -highlight"
                      {...this.props}
                    />
                  </div>
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
    allPaymentDays: state.payments.paymentDaysArray,
  };
};
export default connect(mapStateToProps, { getAllPaymentDayRedux })(Payments);
