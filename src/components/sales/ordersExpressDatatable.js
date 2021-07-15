import React, { Component, Fragment } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import "./bookingDatatable.css";
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

  renderEditable = (cellInfo) => {
    const { myData } = this.props;
    if (myData.length > 0) {
      const newData = [];
      myData.forEach((booking) => {
        //  this is not affecting my output see line 104
        newData.push({
          "Booking Id": booking.bookingId,
          "Shipment Method": booking.shipmentMethod,
          "Booking Date": booking.date,
          "Received At": booking.receivedAt.replaceAll("/", "-"),
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

  renderProductName = (array, row) => {
    if (array.length > 0) {
      const bookingObj = array.find(
        (booking) => booking.bookingId === row.original["Booking Id"]
      );
      if (row.original["Shipment Method"] == "D2D") {
        return bookingObj.productType;
      } else {
        return bookingObj.productName;
      }
    } else {
      return "";
    }
  };

  renderOtherInformation = (array, row) => {
    if (array.length > 0) {
      const bookingObj = array.find(
        (booking) => booking.bookingId === row.original["Booking Id"]
      );
      if (row.original["Shipment Method"] == "D2D") {
        return (
          <div>
            <p style={{ marginBottom: "0px" }}>
              Ship By:&nbsp;
              <span style={{ color: "rgb(18 201 202)", fontSize: "130%" }}>
                {bookingObj.shipBy}
              </span>
            </p>
            <p style={{ marginBottom: "0px" }}>
              Ship From:&nbsp;
              <span style={{ color: "rgb(18 201 202)", fontSize: "130%" }}>
                {bookingObj.shipFrom}
              </span>
            </p>
            <p style={{ marginBottom: "0px" }}>
              Per Kg:&nbsp;
              <span style={{ color: "rgb(18 201 202)", fontSize: "130%" }}>
                {bookingObj.perKg}Tk
              </span>
            </p>
            <p style={{ marginBottom: "0px" }}>
              Total Cost:&nbsp;
              <span style={{ color: "rgb(18 201 202)", fontSize: "130%" }}>
                {bookingObj.result}
                Tk
              </span>
            </p>
            <img
              style={{
                maxHeight: "200px",
                maxWidth: "200px",
                marginTop: "20px",
              }}
              src={bookingObj.imageUrl}
            />
          </div>
        );
      }
      if (row.original["Shipment Method"] == "Express") {
        return (
          <div>
            <p style={{ marginBottom: "0px" }}>
              Parcel To:&nbsp;
              <span style={{ color: "rgb(18 201 202)", fontSize: "130%" }}>
                {bookingObj.parcelTo}
              </span>
            </p>
            <p style={{ marginBottom: "0px" }}>
              Parcel Type:&nbsp;
              <span style={{ color: "rgb(18 201 202)", fontSize: "130%" }}>
                {bookingObj.parcelType}
              </span>
            </p>
            <p style={{ marginBottom: "0px" }}>
              Parcel Box:&nbsp;
              <span style={{ color: "rgb(18 201 202)", fontSize: "130%" }}>
                {bookingObj.parcelBox}
              </span>
            </p>
            <p style={{ marginBottom: "0px" }}>
              Total Cost:&nbsp;
              <span style={{ color: "rgb(18 201 202)", fontSize: "130%" }}>
                {bookingObj.total} TK
              </span>
            </p>
            <img
              style={{
                maxHeight: "200px",
                maxWidth: "200px",
                marginTop: "20px",
              }}
              src={bookingObj.imageUrl}
            />
          </div>
        );
      }
      if (row.original["Shipment Method"] == "Freight") {
        return (
          <div>
            <p style={{ marginBottom: "0px" }}>
              Ship By:&nbsp;
              <span style={{ color: "rgb(18 201 202)", fontSize: "130%" }}>
                {bookingObj.shipBy}
              </span>
            </p>
            <p style={{ marginBottom: "0px" }}>
              Ship From:&nbsp;
              <span style={{ color: "rgb(18 201 202)", fontSize: "130%" }}>
                {bookingObj.shipFrom}
              </span>
            </p>
            <p style={{ marginBottom: "0px" }}>
              Ship To:&nbsp;
              <span style={{ color: "rgb(18 201 202)", fontSize: "130%" }}>
                {bookingObj.shipToFreight}
              </span>
            </p>
            <p style={{ marginBottom: "0px" }}>
              Port of Origin:&nbsp;
              <span style={{ color: "rgb(18 201 202)", fontSize: "130%" }}>
                {bookingObj.portOfOrigin}
              </span>
            </p>
            <p style={{ marginBottom: "0px" }}>
              Port of Destination:&nbsp;
              <span style={{ color: "rgb(18 201 202)", fontSize: "130%" }}>
                {bookingObj.portOfDestination}
              </span>
            </p>
            <div className="row ">
              <div className="col">
                <div
                  className="center-head"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: "0px",
                  }}
                >
                  <span
                    className="bg-light-gray"
                    style={{
                      fontSize: "130%",
                      fontWeight: "bold",
                      marginBottom: "0px",
                      padding: "0px",
                      color: bookingObj.pick_up ? "white" : "gainsboro",
                    }}
                  >
                    <i
                      className="icofont-truck-loaded"
                      style={{
                        fontSize: "100%",
                        border: bookingObj.pick_up
                          ? "1px solid white"
                          : "1px solid gainsboro",
                        borderRadius: "10rem",
                        padding: "5px",
                        backgroundColor: bookingObj.pick_up
                          ? "orange"
                          : "white",
                      }}
                    ></i>
                  </span>
                  <span
                    className="bg-light-gray"
                    style={{
                      fontSize: "130%",
                      fontWeight: "bold",
                      marginBottom: "0px",
                      padding: "0px",
                      color: bookingObj.port_of_origin ? "white" : "gainsboro",
                    }}
                  >
                    <i
                      className="icofont-home"
                      style={{
                        fontSize: "100%",
                        border: bookingObj.port_of_origin
                          ? "1px solid white"
                          : "1px solid gainsboro",
                        borderRadius: "10rem",
                        padding: "5px",
                        backgroundColor: bookingObj.port_of_origin
                          ? "orange"
                          : "white",
                      }}
                    ></i>
                  </span>
                  <span
                    className="bg-light-gray"
                    style={{
                      fontSize: "130%",
                      fontWeight: "bold",
                      marginBottom: "0px",
                      padding: "0px",
                      color: bookingObj.port_of_destination
                        ? "white"
                        : "gainsboro",
                    }}
                  >
                    <i
                      className="icofont-ui-home"
                      style={{
                        fontSize: "100%",
                        border: bookingObj.port_of_destination
                          ? "1px solid white"
                          : "1px solid gainsboro",
                        borderRadius: "10rem",
                        padding: "5px",
                        backgroundColor: bookingObj.port_of_destination
                          ? "orange"
                          : "white",
                      }}
                    ></i>
                  </span>
                  <span
                    className="bg-light-gray"
                    style={{
                      fontSize: "130%",
                      fontWeight: "bold",
                      marginBottom: "0px",
                      padding: "0px",
                      color: bookingObj.delivery ? "white" : "gainsboro",
                    }}
                  >
                    <i
                      className="icofont-truck-alt"
                      style={{
                        fontSize: "100%",
                        border: bookingObj.delivery
                          ? "1px solid white"
                          : "1px solid gainsboro",
                        borderRadius: "10rem",
                        padding: "5px",
                        backgroundColor: bookingObj.delivery
                          ? "orange"
                          : "white",
                      }}
                    ></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      }
    } else {
      return "";
    }
  };

  renderOrderStatus = (myData, bookingId) => {
    if (myData.length > 0) {
      const bookingObj = myData.find(
        (booking) => booking.bookingId === bookingId
      );
      console.log(bookingObj);
      let backgroundColor;
      let icofont;
      if (bookingObj.orderStatus === "Bangladesh Customs") {
        backgroundColor = "#f99322";
        icofont = "icofont-hand";
      }
      if (bookingObj.orderStatus === "Local Warehouse") {
        backgroundColor = "darkgreen";
        icofont = "icofont-tick-boxed";
      }
      if (bookingObj.orderStatus === "Ready to Fly") {
        backgroundColor = "#b11ad8";
        icofont = "icofont-airplane-alt";
      }
      if (bookingObj.orderStatus === "Abroad Customs") {
        backgroundColor = "#ffbc58";
        icofont = "icofont-police";
      }
      if (bookingObj.orderStatus === "Abroad Warehouse") {
        backgroundColor = "#13c9ca";
        icofont = "icofont-building-alt";
      }
      if (bookingObj.orderStatus === "Delivered") {
        backgroundColor = "green";
        icofont = "icofont-checked";
      }
      if (bookingObj.orderStatus === "Rejected") {
        backgroundColor = "#13c9ca";
        icofont = "icofont-close";
      }
      return (
        <div
          className=" icon-left no-shadow align-self-center my_parcel_update_button"
          style={{
            fontSize: "85%",
            fontFamily: "sans-serif",

            padding: "7px",
            color: backgroundColor,
          }}
        >
          <i className={icofont}></i> {bookingObj.orderStatus}
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
      myData.forEach((booking) => {
        newData.push({
          "Booking Id": booking.bookingId,
          "Shipment Method": booking.shipmentMethod,
          "Booking Date": booking.date,
          "Received At": booking.receivedAt.replaceAll("/", "-"),
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
        Header: <b>Booking Details</b>,
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
                >{`Booking Id: ${row.original["Booking Id"]}`}</Popover.Title>
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
                    {row.original["Shipment Method"] !== "Express" ? (
                      <div>
                        <p style={{ marginBottom: "0px" }}>
                          Product Name:&nbsp;
                          <span style={{ color: "#ff8084", fontSize: "130%" }}>
                            {this.renderProductName(myData, row)}
                          </span>
                        </p>
                        <p style={{ marginBottom: "0px" }}>
                          Total Weight:&nbsp;
                          <span style={{ color: "#ff8084", fontSize: "130%" }}>
                            {myData.length > 0
                              ? myData.find(
                                  (booking) =>
                                    booking.bookingId ===
                                    row.original["Booking Id"]
                                ).weight
                              : ""}
                            kg
                          </span>
                        </p>
                        <p style={{ marginBottom: "0px" }}>
                          Total CBM:&nbsp;
                          <span style={{ color: "#ff8084", fontSize: "130%" }}>
                            {myData.length > 0
                              ? myData.find(
                                  (booking) =>
                                    booking.bookingId ===
                                    row.original["Booking Id"]
                                ).totalCbm
                              : ""}
                          </span>
                        </p>
                        <p style={{ marginBottom: "0px" }}>
                          Product Quantity:&nbsp;{" "}
                          <span style={{ color: "#ff8084", fontSize: "130%" }}>
                            {myData.length > 0
                              ? myData.find(
                                  (booking) =>
                                    booking.bookingId ===
                                    row.original["Booking Id"]
                                ).productQuantity
                              : ""}
                          </span>
                        </p>
                        <p style={{ marginBottom: "0px" }}>
                          Carton Quantity:&nbsp;{" "}
                          <span style={{ color: "#ff8084", fontSize: "130%" }}>
                            {myData.length > 0
                              ? myData.find(
                                  (booking) =>
                                    booking.bookingId ===
                                    row.original["Booking Id"]
                                ).ctnQuantity
                              : ""}
                          </span>
                        </p>
                        {row.original["Shipment Method"] === "Freight" ? (
                          <>
                            <p style={{ marginBottom: "0px" }}>
                              Container Size:&nbsp;{" "}
                              <span
                                style={{ color: "#ff8084", fontSize: "130%" }}
                              >
                                {myData.length > 0
                                  ? myData.find(
                                      (booking) =>
                                        booking.bookingId ===
                                        row.original["Booking Id"]
                                    ).containerSize
                                  : ""}
                              </span>
                            </p>
                            <p style={{ marginBottom: "0px" }}>
                              CNF Service:&nbsp;{" "}
                              <span
                                style={{ color: "#ff8084", fontSize: "130%" }}
                              >
                                {myData.length > 0
                                  ? myData.find(
                                      (booking) =>
                                        booking.bookingId ===
                                        row.original["Booking Id"]
                                    ).cnfService
                                  : ""}
                              </span>
                            </p>
                          </>
                        ) : (
                          <p style={{ marginBottom: "0px" }}>
                            Brand/Non-Brand:&nbsp;{" "}
                            <span
                              style={{ color: "#ff8084", fontSize: "130%" }}
                            >
                              {myData.length > 0
                                ? myData.find(
                                    (booking) =>
                                      booking.bookingId ===
                                      row.original["Booking Id"]
                                  ).productBrand
                                : ""}
                            </span>
                          </p>
                        )}

                        <p style={{ marginBottom: "0px" }}>
                          Product Contains:&nbsp;{" "}
                          <span style={{ color: "#ff8084", fontSize: "130%" }}>
                            {myData.length > 0
                              ? myData.find(
                                  (booking) =>
                                    booking.bookingId ===
                                    row.original["Booking Id"]
                                ).productContains
                              : ""}
                          </span>
                        </p>
                      </div>
                    ) : (
                      <div style={{ maxWidth: "40%" }}>
                        <p style={{ marginBottom: "0px" }}>
                          Product Name:&nbsp;
                          <span style={{ color: "#ff8084", fontSize: "130%" }}>
                            {this.renderProductName(myData, row)}
                          </span>
                        </p>

                        <p style={{ marginBottom: "0px" }}>
                          Product Total Cost:&nbsp;
                          <span style={{ color: "#ff8084", fontSize: "130%" }}>
                            {myData.length > 0
                              ? myData.find(
                                  (booking) =>
                                    booking.bookingId ===
                                    row.original["Booking Id"]
                                ).productsTotalCost
                              : ""}{" "}
                            TK
                          </span>
                        </p>
                        <p style={{ marginBottom: "0px" }}>
                          Carton Quantity:&nbsp;{" "}
                          <span style={{ color: "#ff8084", fontSize: "130%" }}>
                            {myData.length > 0
                              ? myData.find(
                                  (booking) =>
                                    booking.bookingId ===
                                    row.original["Booking Id"]
                                ).ctnQuantity
                              : ""}
                          </span>
                        </p>
                        <p style={{ marginBottom: "0px" }}>
                          Used/New:&nbsp;{" "}
                          <span style={{ color: "#ff8084", fontSize: "130%" }}>
                            {myData.length > 0
                              ? myData.find(
                                  (booking) =>
                                    booking.bookingId ===
                                    row.original["Booking Id"]
                                ).usedOrNew
                              : ""}
                          </span>
                        </p>
                        <p style={{ marginBottom: "0px" }}>
                          Product Contains:&nbsp;{" "}
                          <span style={{ color: "#ff8084", fontSize: "130%" }}>
                            {myData.length > 0
                              ? myData.find(
                                  (booking) =>
                                    booking.bookingId ===
                                    row.original["Booking Id"]
                                ).productContains
                              : ""}
                          </span>
                        </p>
                        <div
                          style={{ marginTop: "20px", paddingBottom: "20px" }}
                        >
                          <h3 style={{ color: "#ff8084" }}>
                            Receiver's Information
                          </h3>
                          <p style={{ marginBottom: "0px" }}>
                            Name:&nbsp;
                            <span
                              style={{
                                color: "rgb(18 201 202)",
                                fontSize: "130%",
                              }}
                            >
                              {myData.length > 0
                                ? myData.find(
                                    (booking) =>
                                      booking.bookingId ===
                                      row.original["Booking Id"]
                                  ).receiversName
                                : ""}
                            </span>
                          </p>
                          <p style={{ marginBottom: "0px" }}>
                            Mobile No:&nbsp;
                            <span
                              style={{
                                color: "rgb(18 201 202)",
                                fontSize: "130%",
                              }}
                            >
                              {myData.length > 0
                                ? myData.find(
                                    (booking) =>
                                      booking.bookingId ===
                                      row.original["Booking Id"]
                                  ).receiversMobileNo
                                : ""}
                            </span>
                          </p>
                          <p style={{ marginBottom: "0px" }}>
                            Postcode:&nbsp;
                            <span
                              style={{
                                color: "rgb(18 201 202)",
                                fontSize: "130%",
                              }}
                            >
                              {myData.length > 0
                                ? myData.find(
                                    (booking) =>
                                      booking.bookingId ===
                                      row.original["Booking Id"]
                                  ).receiversPostcode
                                : ""}
                            </span>
                          </p>
                          <p style={{ marginBottom: "0px" }}>
                            Address:&nbsp;
                            <span
                              style={{
                                color: "rgb(18 201 202)",
                                fontSize: "130%",
                              }}
                            >
                              {myData.length > 0
                                ? myData.find(
                                    (booking) =>
                                      booking.bookingId ===
                                      row.original["Booking Id"]
                                  ).receiversAddress
                                : ""}
                            </span>
                          </p>
                        </div>
                      </div>
                    )}

                    <div
                      style={{
                        minHeight: "100%",
                        borderRight: "2px solid gainsboro",
                      }}
                    ></div>
                    {this.renderOtherInformation(myData, row)}
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
        Header: <b>Order Status</b>,
        id: "orderDetails",
        accessor: (str) => "orderDetails",
        Cell: (row) => (
          <>{this.renderOrderStatus(myData, row.original["Booking Id"])}</>
        ),
        style: {
          textAlign: "center",
        },
        sortable: false,
      },
      {
        Header: <b>Change Status</b>,
        id: "delete",
        accessor: (str) => "delete",
        Cell: (row) => (
          <div>
            {/* <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                let data = myData;
                data.splice(row.index, 1);
                this.setState({ myData: data });
                console.log(row);

                toast.success("Successfully Deleted !");
              }}
            >
              <i
                className="fa fa-trash"
                style={{
                  width: 35,
                  fontSize: 20,
                  padding: 11,
                  color: "#e4566e",
                }}
              ></i>
            </span> */}

            <span
              style={{ cursor: "pointer" }}
              onClick={() => this.props.startToggleModal(row.original)}
            >
              <i
                className="fa fa-pencil"
                style={{
                  width: 35,
                  fontSize: 20,
                  padding: 11,
                  color: "rgb(68 0 97)",
                }}
              ></i>
            </span>
          </div>
        ),
        style: {
          textAlign: "center",
        },
        sortable: false,
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
