import React, { Component, Fragment } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateExpressOrderStatusRedux } from "../../actions/index";
import { withRouter } from "react-router-dom";
import "./pendingOrdersDatatable.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { connect } from "react-redux";

export class Datatable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedValues: [],
      myData: this.props.myData,
      orderStatus: "",
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
          Id: order.id,
          Parcel_Type: order.parcelType,
          Local_Address: order.localAddress,
          Abraod_Address: order.abroadAddress,
          Chargeable_Weight: order.chargeableWeight,
          Product_Name: order.productName,
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

  getStatus = (productQuantity) => {
    if (productQuantity < 10) {
      return <i className="fa fa-circle font-danger f-12" />;
    } else if (productQuantity > 50) {
      return <i className="fa fa-circle font-success f-12" />;
    } else {
      return <i className="fa fa-circle font-warning f-12" />;
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, id, month) => {
    event.preventDefault();
    this.props.updateExpressOrderStatusRedux(id, month);
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
          Id: order.id,
          Parcel_Type: order.parcelType,
          Local_Address: order.localAddress,
          Abraod_Address: order.abroadAddress,
          Chargeable_Weight: order.chargeableWeight,
          Product_Name: order.productName,
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
        Header: <b>details</b>,
        id: "orderDetails",
        accessor: (str) => "orderDetails",
        Cell: (row) => (
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={
              <Popover
                id={`popover-positioned-bottom`}
                style={{ minWidth: "35%" }}
              >
                <Popover.Title
                  style={{ backgroundColor: "#ff8084", color: "white" }}
                  as="h3"
                >{`Order Id: ${row.original.Id}`}</Popover.Title>
                <Popover.Content className="popover-body-container">
                  <div
                    style={{
                      paddingBottom: "10px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      borderBottom: "2px solid gainsboro",
                    }}
                  >
                    <div>
                      <h3>Pick Up</h3>
                      <p style={{ marginBottom: "0px" }}>
                        Pick Up By:&nbsp;
                        <span style={{ color: "#ff8084", fontSize: "130%" }}>
                          {myData.length > 0
                            ? myData.find(
                                (order) => order.id === row.original.Id
                              ).pickUpBy
                            : ""}
                        </span>
                      </p>
                      <p style={{ marginBottom: "0px" }}>
                        Tracking No:&nbsp;{" "}
                        <span style={{ color: "#ff8084", fontSize: "130%" }}>
                          {myData.length > 0
                            ? myData.find(
                                (order) => order.id === row.original.Id
                              ).pickUpTrackingNo
                            : ""}
                        </span>
                      </p>
                      <p style={{ marginBottom: "0px" }}>
                        Pick Up Cost:&nbsp;{" "}
                        <span style={{ color: "#ff8084", fontSize: "130%" }}>
                          {myData.length > 0
                            ? myData.find(
                                (order) => order.id === row.original.Id
                              ).pickUpCost
                            : ""}
                          tk
                        </span>
                      </p>
                    </div>
                    <div
                      style={{
                        minHeight: "100%",
                        borderRight: "2px solid gainsboro",
                      }}
                    ></div>
                    <div>
                      <h3>Delivery</h3>
                      <p style={{ marginBottom: "0px" }}>
                        Delivery By:&nbsp;
                        <span
                          style={{ color: "rgb(18 201 202)", fontSize: "130%" }}
                        >
                          {myData.length > 0
                            ? myData.find(
                                (order) => order.id === row.original.Id
                              ).deliveryBy
                            : ""}
                        </span>
                      </p>
                      <p style={{ marginBottom: "0px" }}>
                        Tracking No:&nbsp;
                        <span
                          style={{ color: "rgb(18 201 202)", fontSize: "130%" }}
                        >
                          {myData.length > 0
                            ? myData.find(
                                (order) => order.id === row.original.Id
                              ).deliveryTrackingNo
                            : ""}
                        </span>
                      </p>
                      <p style={{ marginBottom: "0px" }}>
                        Delivery Cost:&nbsp;
                        <span
                          style={{ color: "rgb(18 201 202)", fontSize: "130%" }}
                        >
                          {myData.length > 0
                            ? myData.find(
                                (order) => order.id === row.original.Id
                              ).deliveryCost
                            : ""}
                          tk
                        </span>
                      </p>
                    </div>
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <h4
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        color: "gray",
                      }}
                    >
                      Total Shipping Cost:{" "}
                      <span
                        style={{
                          color: "#ff8084",
                        }}
                      >
                        &nbsp;
                        {myData.length > 0
                          ? myData.find((order) => order.id === row.original.Id)
                              .totalCost
                          : ""}
                        Tk
                      </span>
                    </h4>
                  </div>
                </Popover.Content>
              </Popover>
            }
          >
            <button className="btn btn-primary">show</button>
          </OverlayTrigger>
        ),
        style: {
          textAlign: "center",
        },
        sortable: false,
      },
      {
        Header: <b>Status</b>,
        id: "orderDetails",
        accessor: (str) => "orderDetails",
        Cell: (row) => (
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={
              <Popover
                id={`popover-positioned-bottom`}
                style={{ minWidth: "25%" }}
              >
                <Popover.Title
                  style={{ backgroundColor: "#13c9ca", color: "white" }}
                  as="h3"
                >
                  OrderId: {row.original.Id}
                </Popover.Title>
                <Popover.Content className="popover-body-container">
                  <div style={{ marginBottom: "5px" }}>
                    <h4 style={{ marginBottom: "0px", color: "gray" }}>
                      Order Status
                    </h4>
                    <div
                      style={{
                        fontSize: "250%",
                        color: "#13c9ca",
                        padding: "0px",
                      }}
                    >
                      {
                        myData.find((order) => order.id === row.original.Id)
                          .order_status
                      }
                    </div>
                  </div>

                  <form
                    onSubmit={(event) =>
                      this.handleSubmit(
                        event,
                        row.original.Id,
                        row.original.Month
                      )
                    }
                    noValidate="novalidate"
                    className="rounded-field mt-0"
                  >
                    <div className="form-row mb-4">
                      <div className="col">
                        <label
                          style={{
                            color: "black",
                            marginBottom: "0px",
                            fontSize: "130%",
                            color: "gray",
                            marginBottom: "10px",
                          }}
                        >
                          Update Status
                        </label>
                        <select
                          title="Please choose a package"
                          required
                          name="customer"
                          className="custom-select"
                          aria-required="true"
                          aria-invalid="false"
                          onChange={this.handleChange}
                          value={this.state.customer}
                          required
                        >
                          <option value="">Select Order Status</option>
                          <option value="Wait For Pickup">
                            Wait For Pickup
                          </option>
                          <option value="Local Warehouse">
                            Local Warehouse
                          </option>
                          <option value="Ready to Fly">Ready to Fly</option>
                          <option value="Shipping">Shipping</option>
                          <option value="Abroad Customs">Abroad Customs</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-row mb-3">
                      <div
                        className="col"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <button className="btn btn-secondary">Update</button>
                      </div>
                    </div>
                  </form>
                </Popover.Content>
              </Popover>
            }
          >
            <button className="btn btn-secondary">status</button>
          </OverlayTrigger>
        ),
        style: {
          textAlign: "center",
        },
        sortable: false,
      }
    );

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
    orderStatus: state,
  };
};
export default withRouter(
  connect(mapStateToProps, { updateExpressOrderStatusRedux })(Datatable)
);
