import React, { Component, Fragment } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteOrder } from "../../firebase/firebase.utils";
import { withRouter } from "react-router-dom";
import InvoiceModal from "./invoiceModal";
export class Datatable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedValues: [],
      myData: this.props.myData,
      toggleModalInvoice: true,
      parcelObj: null,
    };
  }

  startToggleModalInvoice = async (parcelObj) => {
    if (parcelObj) {
      this.setState({
        toggleModalInvoice: !this.state.toggleModalInvoice,
        parcelObj,
      });
    } else {
      this.setState({
        toggleModalInvoice: !this.state.toggleModalInvoice,
        parcelObj: null,
      });
    }
  };

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
          Customer: order.shippingMark,
          Carton: order.cartonNo,
          Product: order.productName,
          Quantity: order.quantity,
          CBM: order.totalCbm,
          grossWeight: `${order.grossWeight}kg`,
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
      const parcelObj = array.find((parcel) => parcel.parcelId == parcelId);

      if (parcelObj.invoiceGenerated) {
        return (
          <div>
            <div
              style={{
                cursor: "pointer",
                padding: "7px 5px",
                color: "white",
                backgroundColor: "darkgreen",
                border: "1px solid white",
                borderRadius: "1rem",
              }}
              onClick={() => {
                this.startToggleModalInvoice(parcelObj);
              }}
            >
              <i className="icofont-tick-mark">&nbsp;ready to pay</i>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <div
              style={{
                cursor: "pointer",
                padding: "7px 5px",
                color: "white",
                backgroundColor: "darkorange",
                border: "1px solid white",
                borderRadius: "1rem",
              }}
              onClick={() => {
                this.startToggleModalInvoice(parcelObj);
              }}
            >
              <i className="icofont-spinner">&nbsp;generate</i>
            </div>
          </div>
        );
      }
    }
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
          Customer: order.shippingMark,
          Carton: order.cartonNo,
          Product: order.productName,
          Quantity: order.quantity,
          CBM: order.totalCbm,
          grossWeight: `${order.grossWeight}kg`,
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

    if (multiSelectOption == true) {
      columns.push({
        Header: (
          <button
            className="btn btn-danger btn-sm btn-delete mb-0 b-r-4"
            onClick={(e) => {
              if (window.confirm("Are you sure you wish to delete this order?"))
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
                name={row.original.orderId}
                defaultChecked={this.state.checkedValues.includes(
                  row.original.orderId
                )}
                onChange={(e) => this.selectRow(e, row.original.orderId)}
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
        Header: <b>Invoice</b>,
        id: "delete",
        accessor: (str) => "delete",
        Cell: (row) => this.renderButton(row, myData),
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
        <InvoiceModal
          startToggleModalInvoice={this.startToggleModalInvoice}
          parcelObj={this.state.parcelObj}
        />
      </Fragment>
    );
  }
}

export default withRouter(Datatable);
