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
          Name: userObj ? userObj.displayName : null,
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

  handleInvoiceButtonClick = async (parcelObj) => {
    const ratePerKg = this.state[parcelObj.parcelId];
    console.log(ratePerKg);
    if (ratePerKg) {
      const updatedOrder = await this.props.updateOrderRedux({
        ...parcelObj,
        ratePerKg,
        invoiceGenerated: true,
        invoiceStatus: "Not Paid",
      });
      if (updatedOrder) {
        toast.success(
          `Successfully generated invoice for ${parcelObj.parcelId}`
        );
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
      order.ratePerKg = this.state[order.parcelId];
      order.invoiceGenerated = true;
      order.invoiceStatus = "Not Paid";
      return order;
    });
    updatedArrayOfOrder.forEach(async (order) => {
      await this.props.updateOrderRedux(order);
    });
    console.log(updatedArrayOfOrder);
  };

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
                this.handleInvoiceButtonClick(parcelObj);
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
                this.handleInvoiceButtonClick(parcelObj);
              }}
            >
              <i className="icofont-spinner">&nbsp;generate</i>
            </div>
          </div>
        );
      }
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
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
          Name: userObj ? userObj.displayName : null,
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
      columns.push(
        {
          Header: <b>Price/kg</b>,
          id: "delete",
          accessor: (str) => "delete",
          Cell: (row) => {
            const [
              shipmentMethod,
              lotNo,
            ] = this.props.match.params.shipmentMethodLotNo.split("-");
            const parcelId = `${lotNo}-${row.original.Carton}`;
            return (
              // <input
              //   type="number"
              //   name={`${parcelId}`}
              //   value={this.state[parcelId]}
              //   onChange={this.handleChange}
              // />
              <input
                id={parcelId}
                type="number"
                ref={this.input}
                defaultValue={this.state[parcelId]}
              />
            );
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
