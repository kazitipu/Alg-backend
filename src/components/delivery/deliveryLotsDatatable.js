import React, { Component, Fragment } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

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
      if (!this.props.calculation) {
        myData.forEach((lot) => {
          newData.push({
            Lot: lot ? lot.lotNo : "",
            Country: lot ? lot.selectCountry : "",
            Method: lot ? lot.shipmentMethod : "",

            Line: lot ? lot.shippingLine : "",
            Shipment_Date: lot ? lot.shipmentDate : "",
            Arrival_Date: lot ? lot.arrivalDate : "",
          });
        });
      } else {
        myData.forEach((lot) => {
          newData.push({
            Lot: lot ? lot.lotNo : "",
            "C&F Bill": lot.cAndFBill ? `${lot.cAndFBill}Tk` : "0Tk",
            "Freight Charge": lot.freightCharge
              ? `${lot.freightCharge}Tk`
              : "0Tk",
            "Other Charge": lot.otherCharge ? `${lot.otherCharge}Tk` : `0Tk`,
          });
        });
      }

      return (
        <div
          style={{ backgroundColor: "#fafafa" }}
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

  renderOrderStatus = (lotNo) => {
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
        backgroundColor = "darkgreen";
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

  render() {
    const { pageSize, myClass, multiSelectOption, pagination } = this.props;
    console.log(this.props);
    const { myData } = this.props;
    console.log(myData);
    const newData = [];
    if (myData.length > 0) {
      myData.forEach((lot) => {
        newData.push({
          Lot: lot ? lot.lotNo : "",
          Country: lot ? lot.selectCountry : "",
          Method: lot ? lot.shipmentMethod : "",

          Line: lot ? lot.shippingLine : "",
          Shipment_Date: lot ? lot.shipmentDate : "",
          Arrival_Date: lot ? lot.arrivalDate : "",
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
        Cell: editable,
        style: {
          textAlign: "center",
        },
      });
    }
    columns.push({
      Header: <b>Status</b>,
      id: "orderDetails",
      accessor: (str) => "orderDetails",
      Cell: (row) => <>{this.renderOrderStatus(row.original.Lot)}</>,
      style: {
        textAlign: "center",
      },
      sortable: false,
    });

    if (multiSelectOption == true) {
      columns.push({
        Header: (
          <button
            className="btn btn-danger btn-sm btn-delete mb-0 b-r-4"
            onClick={(e) => {
              if (window.confirm("Are you sure you wish to delete this item?"))
                this.handleRemoveRow();
            }}
          >
            Delete
          </button>
        ),
        id: "delete",
        accessor: (str) => "delete",
        sortable: false,
        style: {
          textAlign: "center",
        },
        Cell: (row) => (
          <div>
            <span>
              <input
                type="checkbox"
                name={row.original.id}
                defaultChecked={this.state.checkedValues.includes(
                  row.original.id
                )}
                onChange={(e) => this.selectRow(e, row.original.id)}
              />
            </span>
          </div>
        ),
        accessor: key,
        style: {
          textAlign: "center",
        },
      });
    } else {
      columns.push({
        Header: <b>Inspect</b>,
        id: "delete",
        accessor: (str) => "delete",
        Cell: (row) => (
          <div>
            <button
              className="btn btn-secondary"
              onClick={() =>
                this.props.history.push(
                  `${process.env.PUBLIC_URL}/delivery/d2d-freight/${this.props.match.params.shipmentMethod}-${row.original.Lot}`
                )
              }
            >
              view
            </button>
          </div>
        ),
        style: {
          textAlign: "center",
        },
        sortable: false,
      });
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
export default withRouter(connect(mapStateToProps, null)(Datatable));
