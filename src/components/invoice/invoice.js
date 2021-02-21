import React, { Component, Fragment } from "react";
import Breadcrumb from "../../components/common/breadcrumb";
import data from "../../assets/data/invoice";
import Datatable from "../../components/invoice/invoiceDatatable";
import { getAllLotsRedux } from "../../actions/index";
import { connect } from "react-redux";
export class Invoice extends Component {
  componentDidMount = async () => {
    this.props.getAllLotsRedux();
  };

  render() {
    return (
      <Fragment>
        <Breadcrumb title="Invoice" parent="Invoice" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Invoice List</h5>
                </div>
                <div className="card-body">
                  <div id="basicScenario" className="product-list">
                    <Datatable
                      multiSelectOption={false}
                      myData={this.props.allLots}
                      pageSize={10}
                      pagination={true}
                      class="-striped -highlight"
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
    allLots: state.lots.lots,
  };
};
export default connect(mapStateToProps, { getAllLotsRedux })(Invoice);
