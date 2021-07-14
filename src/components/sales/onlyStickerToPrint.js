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
      <div className="main-sticker">
        <div className="sticker-container">
          <div className="lot-no">Lot No: {lotNo}</div>
          <div className="flex-box">
            <h1 className="carton-no">ALG-{this.props.cartonNo}</h1>
          </div>
          <div className="barcode-container">
            <div className="barcode">
              <Barcode
                value={`Id:${lotNo}-${this.props.cartonNo}`}
                width={2}
                height={40}
                displayValue={false}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                AlgCargos.com
              </div>
            </div>
          </div>
        </div>
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
