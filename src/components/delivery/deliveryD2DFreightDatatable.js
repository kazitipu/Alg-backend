import React, { Component, Fragment } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteSingleOrderRedux } from "../../actions/index";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import parcel, { Parcel } from "../express-rates/parcel/parcel";

export class Datatable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedValues: [],
      myData: this.props.myData,
    };
  }

  selectRow = (e, i) => {
    if (!e.target.checked) {
      this.setState({
        checkedValues: this.state.checkedValues.filter((item, j) => i !== item),
      });
    } else {
      this.state.checkedValues.push(i);
      this.setState({
        checkedValues: this.state.checkedValues,
      });
    }
  };

  handleRemoveRow = () => {
    const selectedValues = this.state.checkedValues;
    const updatedData = this.state.myData.filter(function (el) {
      return selectedValues.indexOf(el.id) < 0;
    });
    this.setState({
      myData: updatedData,
    });
    toast.success("Successfully Deleted !");
  };

  renderEditable = (cellInfo) => {
    const { myData } = this.props;
    if (myData.length > 0) {
      const newData = [];
      myData.forEach((order) => {
        //  this is not affecting my output see line 104
        newData.push({
          "Parcel Id": order.parcelId,
          Customer: order.shippingMark,
          "Tracking No": order.trackingNo,
          Carton: order.cartonNo,
          Product: order.productName,
          Quantity: order.quantity,
          CBM: order.totalCbm,
          grossWeight: `${order.grossWeight}kg`,
          "Delivery Address": order.deliveryAddress,
          "Delivery Cost": `${
            order.deliveryCost ? order.deliveryCost : "0"
          } Tk`,
        });
      });
      return (
        <div
          style={{ backgroundColor: "#fafafa" }}
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => {
            const data = [...newData];
            data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
            this.setState({ myData: data });
          }}
          dangerouslySetInnerHTML={{
            __html: newData[cellInfo.index][cellInfo.column.id],
          }}
        />
      );
    } else {
      return null;
    }
  };

  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  renderButton = (row, array) => {
    if (array.length > 0) {
      const lotNo = this.props.match.params.shipmentMethodLotNo.split("-")[1];
      const parcelId = `${lotNo}-${row.original.Carton}`;
      const parcelObj = array.find((parcel) => parcel.parcelId === parcelId);
      if (parcelObj.editRequested) {
        if (parcelObj.editApproved) {
          return (
            <div
              style={{
                padding: "8px 0px",
                backgroundColor: "green",
                color: "white",
                cursor: "pointer",
              }}
              onClick={() => {
                this.props.startToggleModalAdditionalInfo(parcelObj);
              }}
            >
              <i className="icofont-tick-mark"></i>&nbsp; Approved
            </div>
          );
        } else {
          return (
            <div
              style={{
                padding: "8px 0px",
                backgroundColor: "darkorange",
                color: "white",
                cursor: "pointer",
              }}
              onClick={() => {
                this.props.startToggleModalAdditionalInfo(parcelObj);
              }}
            >
              <i className="icofont-spinner"></i>&nbsp; Requested
            </div>
          );
        }
      } else {
        return (
          <div
            style={{
              padding: "8px 0px",
              backgroundColor: "red",
              color: "white",
            }}
          >
            <i className="icofont-close"></i>&nbsp; Not Added
          </div>
        );
      }
    }
  };

  renderOrderStatus = (lotNo, parcelId, array) => {
    const parcelObj = array.find((parcel) => parcel.parcelId === parcelId);
    if (parcelObj.parcelStatus && parcelObj.parcelStatus === "Delivered") {
      return (
        <div
          className=" icon-left no-shadow align-self-center my_parcel_update_button"
          style={{
            // background: backgroundColor,
            fontSize: "85%",
            fontFamily: "sans-serif",
            // color: "white",
            padding: "7px",
            color: "green",
          }}
        >
          <i className="icofont-like"></i> {parcelObj.parcelStatus}
        </div>
      );
    }
    if (this.props.allLots.length > 0) {
      const lotObj = this.props.allLots.find((lot) => lot.lotNo === lotNo);
      console.log(lotObj);
      let backgroundColor;
      let icofont;
      if (lotObj.shipmentStatus === "Bangladesh Customs") {
        backgroundColor = "#f99322";
        icofont = "icofont-hand";
      }
      if (lotObj.shipmentStatus === "Local Warehouse") {
        backgroundColor = "purple";
        icofont = "icofont-tick-boxed";
      }
      if (lotObj.shipmentStatus === "Ready to Fly") {
        backgroundColor = "#b11ad8";
        icofont = "icofont-airplane-alt";
      }
      if (lotObj.shipmentStatus === "Abroad Customs") {
        backgroundColor = "#ffbc58";
        icofont = "icofont-police";
      }
      if (lotObj.shipmentStatus === "Abroad Warehouse") {
        backgroundColor = "#13c9ca";
        icofont = "icofont-building-alt";
      }
      return (
        <div
          className=" icon-left no-shadow align-self-center my_parcel_update_button"
          style={{
            // background: backgroundColor,
            fontSize: "85%",
            fontFamily: "sans-serif",
            // color: "white",
            padding: "7px",
            color: backgroundColor,
          }}
        >
          <i className={icofont}></i> {lotObj.shipmentStatus}
        </div>
      );
    }
    return null;
  };

  renderInvoiceStatus = (array, parcelId) => {
    if (array.length > 0) {
      const parcelObj = array.find((parcel) => parcel.parcelId === parcelId);
      let backgroundColor;
      let icofont;
      if (parcelObj.invoiceStatus === "Not Created") {
        backgroundColor = "purple";
        icofont = "icofont-exclamation-circle";
      }
      if (parcelObj.invoiceStatus === "Not Paid") {
        backgroundColor = "red";
        icofont = "icofont-close-circled";
      }
      if (parcelObj.invoiceStatus === "Paid") {
        backgroundColor = "green";
        icofont = "icofont-check-circled";
      }

      return (
        <div
          className=" icon-left no-shadow align-self-center"
          style={{
            fontSize: "85%",
            fontFamily: "sans-serif",

            padding: "7px",
            color: backgroundColor,
          }}
        >
          <i className={icofont}></i> {parcelObj.invoiceStatus}
        </div>
      );
    }
    return null;
  };

  render() {
    const { pageSize, myClass, multiSelectOption, pagination } = this.props;
    console.log(this.props);
    const { myData } = this.props;
    console.log(myData);
    const newData = [];
    if (myData.length > 0) {
      myData.forEach((order) => {
        newData.push({
          "Parcel Id": order.parcelId,
          Customer: order.shippingMark,
          "Tracking No": order.trackingNo,
          Carton: order.cartonNo,
          Product: order.productName,
          Quantity: order.quantity,
          CBM: order.totalCbm,
          grossWeight: `${order.grossWeight}kg`,
          "Delivery Address": order.deliveryAddress,
          "Delivery Cost": `${
            order.deliveryCost ? order.deliveryCost : "0"
          } Tk`,
        });
      });
    }
    const columns = [];
    for (var key in newData[0]) {
      let editable = this.renderEditable;
      if (key == "image") {
        editable = null;
      }
      if (key == "status") {
        editable = null;
      }
      if (key === "avtar") {
        editable = null;
      }
      if (key === "vendor") {
        editable = null;
      }
      if (key === "order_status") {
        editable = null;
      }

      columns.push({
        Header: <b>{this.Capitalize(key.toString())}</b>,
        accessor: key,
        Cell: null,
        style: {
          textAlign: "center",
        },
      });
    }

    columns.push(
      {
        Header: <b>Parcel Status</b>,
        id: "orderDetails",
        accessor: (str) => "orderDetails",
        Cell: (row) => (
          <>
            {this.renderOrderStatus(
              this.props.lotNo,
              row.original["Parcel Id"],
              myData
            )}
          </>
        ),
        style: {
          textAlign: "center",
        },
        sortable: false,
      },
      {
        Header: <b>Invoice Status</b>,
        id: "orderDetails",
        accessor: (str) => "orderDetails",
        Cell: (row) => (
          <>{this.renderInvoiceStatus(myData, row.original["Parcel Id"])}</>
        ),
        style: {
          textAlign: "center",
        },
        sortable: false,
      }
    );

    if (multiSelectOption == true) {
      columns.push(
        {
          Header: <b>Cost </b>,
          id: "delete",
          accessor: (str) => "delete",
          Cell: (row) => {
            const parcelObj = myData.find(
              (parcel) => parcel.parcelId === row.original["Parcel Id"]
            );
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                {parcelObj.invoiceStatus === "Not Created" &&
                  parcelObj.deliveryAddress !== "ALG Office" && (
                    <span
                      onClick={() => {
                        this.props.startToggleModalAdditionalInfo(parcelObj);
                      }}
                    >
                      <i
                        className="fa fa-pencil"
                        style={{
                          width: 35,
                          fontSize: 20,
                          padding: 11,
                          color: "#e4566e",
                          cursor: "pointer",
                        }}
                      ></i>
                    </span>
                  )}
              </div>
            );
          },
          style: {
            textAlign: "center",
          },
          sortable: false,
        },
        {
          Header:
            this.state.checkedValues.length > 0 ? (
              <button
                className="btn btn-sm mb-0 b-r-4"
                style={{ background: "#4e074e", color: "white" }}
                onClick={async () => {
                  const parcelsArray = myData.filter((parcel) =>
                    this.state.checkedValues.includes(parcel.parcelId)
                  );
                  await this.props.startToggleModalDeliveryAndNote(
                    parcelsArray
                  );
                  this.setState({ checkedValues: [] });
                }}
              >
                Update
              </button>
            ) : null,
          id: "delete",
          accessor: (str) => "delete",
          sortable: false,
          style: {
            textAlign: "center",
          },
          Cell: (row) => {
            const parcelObj = myData.find(
              (parcel) => parcel.parcelId === row.original["Parcel Id"]
            );
            return (
              <div>
                {parcelObj.invoiceStatus === "Paid" && (
                  <span>
                    <input
                      type="checkbox"
                      name={row.original["Parcel Id"]}
                      defaultChecked={this.state.checkedValues.includes(
                        row.original["Parcel Id"]
                      )}
                      onChange={(e) =>
                        this.selectRow(e, row.original["Parcel Id"])
                      }
                    />
                  </span>
                )}
              </div>
            );
          },
          accessor: key,
          style: {
            textAlign: "center",
          },
        }
      );
    }

    return (
      <Fragment>
        <ReactTable
          data={newData}
          columns={columns}
          defaultPageSize={pageSize}
          className={myClass}
          showPagination={pagination}
        />
        <ToastContainer />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allLots: state.lots.lots,
  };
};
export default withRouter(
  connect(mapStateToProps, { deleteSingleOrderRedux })(Datatable)
);
