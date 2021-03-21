import React, { Component, Fragment } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import "./refundRequestDatatable.css";
import { updateBookingRedux } from "../../actions/index";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
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
      return selectedValues.indexOf(el["Booking Id"]) < 0;
    });
    this.setState({
      myData: updatedData,
    });
    toast.success("Successfully Deleted !");
  };
  changeStatusOfSelectedRow = async () => {
    const selectedValues = this.state.checkedValues;
    console.log(selectedValues);
    selectedValues.forEach((bookingId) =>
      this.props.updateBookingRedux(bookingId)
    );

    this.setState({ checkedValues: [] });
  };

  renderEditable = (cellInfo) => {
    const { myData } = this.props;
    if (myData.length > 0) {
      const newData = [];
      myData.forEach((parcel) => {
        newData.push({
          "Parcel Id": parcel.parcelId,
          Products: parcel.productName,
          Weight: parcel.grossWeight,
          "Per Kg": parcel.ratePerKg,
          "Total Bill": parcel.invoiceTotal,
        });
      });
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

  render() {
    const { pageSize, myClass, multiSelectOption, pagination } = this.props;
    console.log(this.props);
    const { myData } = this.props;
    console.log(myData);
    const newData = [];
    if (myData.length > 0) {
      myData.forEach((parcel) => {
        newData.push({
          "Parcel Id": parcel.parcelId,
          Products: parcel.productName,
          Weight: parcel.grossWeight,
          "Per Kg": parcel.ratePerKg,
          "Total Bill": parcel.invoiceTotal,
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
    columns.push(
      {
        Header: <b>Refund Note</b>,
        id: "orderDetails",
        accessor: (str) => "orderDetails",
        Cell: (row) => {
          const parcelObj = myData.find(
            (refund) => refund.parcelId === row.original["Parcel Id"]
          );
          return (
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={
                <Popover
                  id={`popover-positioned-bottom`}
                  style={{ minWidth: "20%" }}
                >
                  <Popover.Title
                    style={{ backgroundColor: "#ff8084", color: "white" }}
                    as="h3"
                  >
                    Refund Note
                  </Popover.Title>
                  <Popover.Content className="popover-body-container">
                    <div>{parcelObj.note}</div>
                  </Popover.Content>
                </Popover>
              }
            >
              <button className="btn btn-primary">show</button>
            </OverlayTrigger>
          );
        },
        style: {
          textAlign: "center",
        },
        sortable: false,
      },

      {
        Header: (
          <button
            className="btn btn-sm btn-delete mb-0 b-r-4"
            style={{ background: "rgb(68 0 97)", color: "white" }}
            onClick={(e) => {
              if (this.state.checkedValues.length > 0) {
                const parcelArray = myData.filter((parcel) =>
                  this.state.checkedValues.includes(parcel.parcelId)
                );
                this.props.startToggleModal(
                  this.state.checkedValues,
                  parcelArray
                );
              } else {
                alert("Select a Booking first to change its status");
              }

              //   this.changeStatusOfSelectedRow();
            }}
          >
            Change Status
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
                name={row.original["Parcel Id"]}
                defaultChecked={this.state.checkedValues.includes(
                  row.original["Parcel Id"]
                )}
                onChange={(e) => this.selectRow(e, row.original["Parcel Id"])}
              />
            </span>
          </div>
        ),
        accessor: key,
        style: {
          textAlign: "center",
        },
      }
    );

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

export default withRouter(connect(null, { updateBookingRedux })(Datatable));
