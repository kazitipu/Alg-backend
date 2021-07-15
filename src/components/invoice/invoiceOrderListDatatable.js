import React, { Component, Fragment } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withRouter } from "react-router-dom";
import InvoiceModal from "./invoiceModal.jsx";
import { connect } from "react-redux";
import { updateOrderRedux } from "../../actions";
export class Datatable extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {
      checkedValues: [],
      myData: this.props.myData,
      toggleModalInvoice: true,
      parcelObj: null,
    };
  }

  componentDidMount = () => {
    const { myData } = this.props;
    if (myData.length > 0) {
      myData.forEach((order) => {
        this.setState({ [order.parcelId]: order.ratePerKg }, () => {
          console.log(this.state);
        });
      });
    }
  };
  componentWillReceiveProps = (nextProps) => {
    const { myData } = nextProps;
    if (myData.length > 0) {
      myData.forEach((order) => {
        this.setState({ [order.parcelId]: order.ratePerKg }, () => {
          console.log(this.state);
        });
      });
    }
  };

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
        const userObj = this.props.allUser.find(
          (user) => user.uid === order.customerUid
        );
        newData.push({
          CustomerId: order.customer,
          Name: userObj && userObj.displayName,
          Carton: order.cartonNo,
          booking: order.bookingId ? order.bookingId : "None",
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

  handleInvoiceButtonClick = async (parcelObj) => {
    const ratePerKg = this.state[parcelObj.parcelId];
    const total = parseInt(
      parseInt(ratePerKg) * parseFloat(parcelObj.grossWeight)
    );
    console.log(total);
    console.log(ratePerKg);
    if (ratePerKg) {
      const insurance =
        parcelObj.insurance && parcelObj.insurance !== ""
          ? parseInt(parseInt(parcelObj.productsValue) * (3 / 100))
          : 0;
      console.log(insurance);
      const total = parseInt(
        parseInt(ratePerKg) * parseFloat(parcelObj.grossWeight)
      );
      const qcCheck =
        parcelObj.qcCheck && parcelObj.qcCheck === "true" ? 100 : 0;
      const updatedOrder = await this.props.updateOrderRedux({
        ...parcelObj,
        ratePerKg,
        invoiceGenerated: true,
        invoiceStatus: "Not Paid",
        total,
        insurance,
        subTotal:
          parseInt(insurance) +
          parseInt(total) +
          parseInt(parcelObj.packagingCost ? parcelObj.packagingCost : 0) +
          parseInt(parcelObj.deliveryCost ? parcelObj.deliveryCost : 0) +
          qcCheck,
        finalTotal:
          parseInt(insurance) +
          parseInt(total) +
          parseInt(parcelObj.packagingCost ? parcelObj.packagingCost : 0) +
          parseInt(parcelObj.deliveryCost ? parcelObj.deliveryCost : 0) +
          qcCheck,
      });
      if (updatedOrder) {
        console.log(updatedOrder.subTotal);
        console.log(updatedOrder.finalTotal);
        this.props.history.push(
          `${process.env.PUBLIC_URL}/invoice-by-orderId/${parcelObj.shipmentMethod}-${parcelObj.parcelId}`
        );
      } else {
        alert("An error occured. try again later.");
      }
    } else {
      alert("Before generating invoice first set the rate.");
    }
  };

  handleUpdatePriceClick = async () => {
    console.log("handle update price is clicked");
    const parcelIdArray = Object.keys(this.state);
    console.log(parcelIdArray);
    const { myData } = this.props;
    const filteredArray = myData.filter((order) =>
      parcelIdArray.includes(order.parcelId)
    );
    console.log(filteredArray);
    const updatedArrayOfOrder = filteredArray.map((order) => {
      if (this.state[order.parcelId]) {
        const qcCheck =
          this.state[order.parcelId].qcCheck &&
          this.state[order.parcelId].qcCheck === "true"
            ? 100
            : 0;
        order.ratePerKg = this.state[order.parcelId];
        order.invoiceGenerated = true;
        order.invoiceStatus = "Not Paid";
        order.total = parseInt(
          parseInt(order.ratePerKg) * parseInt(order.grossWeight)
        );
        order.insurance =
          order.insurance && order.insurance !== ""
            ? parseInt(parseInt(order.productsValue) * (3 / 100))
            : 0;
        order.subTotal =
          parseInt(order.insurance) +
          parseInt(order.total) +
          parseInt(order.packagingCost ? order.packagingCost : 0) +
          parseInt(order.deliveryCost ? order.deliveryCost : 0) +
          qcCheck;
        order.finalTotal =
          parseInt(order.insurance) +
          parseInt(order.total) +
          parseInt(order.packagingCost ? order.packagingCost : 0) +
          parseInt(order.deliveryCost ? order.deliveryCost : 0) +
          qcCheck;
        return order;
      } else {
        return order;
      }
    });
    updatedArrayOfOrder.forEach(async (order) => {
      if (order.ratePerKg) {
        await this.props.updateOrderRedux(order);
      }
    });
    toast.success("Successfully generated invoices");
    console.log(updatedArrayOfOrder);
  };

  renderButton = (row, array) => {
    if (array.length > 0) {
      const lotNo = this.props.match.params.shipmentMethodLotNo.split("-")[1];
      const parcelId = `${lotNo}-${row.original.Carton}`;
      const parcelObj = array.find((parcel) => parcel.parcelId == parcelId);
      if (
        parcelObj.deliveryAddress === "ALG Office" ||
        !parcelObj.deliveryAddress
      ) {
        if (parcelObj.invoiceStatus === "Not Paid") {
          return (
            <div>
              <div
                style={{
                  cursor: "pointer",
                  padding: "7px 5px",
                  color: "white",
                  backgroundColor: "purple",
                  border: "1px solid white",
                  borderRadius: "1rem",
                }}
                onClick={() => {
                  this.handleInvoiceButtonClick(parcelObj);
                }}
              >
                <i className="icofont-tick-mark">&nbsp;ready to pay</i>
              </div>
            </div>
          );
        } else if (parcelObj.invoiceStatus === "Not Created") {
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
                  this.handleInvoiceButtonClick(parcelObj);
                }}
              >
                <i className="icofont-spinner">&nbsp;generate</i>
              </div>
            </div>
          );
        } else if (parcelObj.invoiceStatus === "Paid") {
          return (
            <div>
              <div
                style={{
                  cursor: "pointer",
                  padding: "7px 5px",
                  color: "white",
                  backgroundColor: "green",
                  border: "1px solid white",
                  borderRadius: "1rem",
                }}
                onClick={() => {
                  this.props.history.push(
                    `${process.env.PUBLIC_URL}/invoice-by-orderId/${parcelObj.shipmentMethod}-${parcelObj.parcelId}`
                  );
                }}
              >
                <i className="icofont-money">&nbsp;paid</i>
              </div>
            </div>
          );
        }
      } else if (parcelObj.deliveryCost) {
        if (parcelObj.invoiceStatus === "Not Paid") {
          return (
            <div>
              <div
                style={{
                  cursor: "pointer",
                  padding: "7px 5px",
                  color: "white",
                  backgroundColor: "purple",
                  border: "1px solid white",
                  borderRadius: "1rem",
                }}
                onClick={() => {
                  this.handleInvoiceButtonClick(parcelObj);
                }}
              >
                <i className="icofont-tick-mark">&nbsp;ready to pay</i>
              </div>
            </div>
          );
        } else if (parcelObj.invoiceStatus === "Not Created") {
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
                  this.handleInvoiceButtonClick(parcelObj);
                }}
              >
                <i className="icofont-spinner">&nbsp;generate</i>
              </div>
            </div>
          );
        } else if (parcelObj.invoiceStatus === "Paid") {
          return (
            <div>
              <div
                style={{
                  cursor: "pointer",
                  padding: "7px 5px",
                  color: "white",
                  backgroundColor: "green",
                  border: "1px solid white",
                  borderRadius: "1rem",
                }}
                onClick={() => {
                  this.props.history.push(
                    `${process.env.PUBLIC_URL}/invoice-by-orderId/${parcelObj.shipmentMethod}-${parcelObj.parcelId}`
                  );
                }}
              >
                <i className="icofont-money">&nbsp;paid</i>
              </div>
            </div>
          );
        }
      } else {
        return (
          <div>
            <div
              style={{
                cursor: "pointer",
                padding: "7px 5px",
                color: "white",
                backgroundColor: "gray",
                border: "1px solid white",
                borderRadius: "1rem",
              }}
              onClick={() => {
                alert("Update delivery Cost before generating invoice.");
              }}
            >
              <i className="icofont-money">&nbsp;Cost</i>
            </div>
          </div>
        );
      }
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        console.log(this.state);
      }
    );
  };

  renderInputButton = (parcelObj) => {
    if (
      parcelObj.deliveryAddress === "ALG Office" ||
      !parcelObj.deliveryAddress
    ) {
      return (
        <input
          name={parcelObj.parcelId}
          type="number"
          defaultValue={this.state[parcelObj.parcelId]}
          onChange={this.handleChange}
        />
      );
    } else if (parcelObj.deliveryCost) {
      return (
        <input
          name={parcelObj.parcelId}
          type="number"
          defaultValue={this.state[parcelObj.parcelId]}
          onChange={this.handleChange}
        />
      );
    } else {
      return null;
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
        const userObj = this.props.allUser.find(
          (user) => user.uid === order.customerUid
        );
        newData.push({
          CustomerId: order.customer,
          Name: userObj && userObj.displayName,
          Carton: order.cartonNo,
          booking: order.bookingId ? order.bookingId : "None",
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
      columns.push(
        {
          Header: <b>Price/kg</b>,
          id: "delete",
          accessor: (str) => "delete",
          Cell: (row) => {
            const [shipmentMethod, lotNo] =
              this.props.match.params.shipmentMethodLotNo.split("-");
            const parcelId = `${lotNo}-${row.original.Carton}`;
            const parcelObj = myData.find(
              (parcel) => parcel.parcelId === parcelId
            );

            return <>{this.renderInputButton(parcelObj)}</>;
          },
          style: {
            textAlign: "center",
          },
          sortable: false,
        },
        {
          Header: <b>Invoice</b>,
          id: "delete",
          accessor: (str) => "delete",
          Cell: (row) => this.renderButton(row, myData),
          style: {
            textAlign: "center",
          },
          sortable: false,
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
        <InvoiceModal
          startToggleModalInvoice={this.startToggleModalInvoice}
          parcelObj={this.state.parcelObj}
        />
        <button
          className="btn btn-secondary"
          onClick={this.handleUpdatePriceClick}
          style={{
            position: "absolute",
            marginTop: "40px",
            right: "40px",
          }}
        >
          Update
        </button>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allUser: state.users.users,
  };
};
export default withRouter(
  connect(mapStateToProps, { updateOrderRedux })(Datatable)
);
