import React, { Component, Fragment } from "react";
import {
  getSingleOrderRedux,
  updateOrderAfterInvoiceRedux,
} from "../../actions/index";
import { connect } from "react-redux";
import Barcode from "react-barcode";
import "./onlyStickerToPrint.css";
import { withRouter } from "react-router-dom";

export class OnlyStickerToPrint extends Component {
  render() {
    const lotNo = this.props.match.params.shipmentMethodLotNo.split("-")[1];
    return (
      <div className="sticker-container">
        <div className="flex-box">
          <div className="barcode">
            <div className="barcode-container">
              <Barcode
                value={`Id:${lotNo}-${this.props.cartonNo}`}
                width={2}
                height={50}
                displayValue={false}
              />
            </div>
            <div style={{ marginBottom: "50px", marginLeft: "120px" }}>
              AlgCargos.com
            </div>
          </div>
          <h1 className="carton-no">{this.props.cartonNo}</h1>
        </div>

        <div className="lot-no">Lot No: {lotNo}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    orderObj: state.ordersAlg.orderObj,
    users: state.users.users,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getSingleOrderRedux,
    updateOrderAfterInvoiceRedux,
  })(OnlyStickerToPrint)
);
