import React, { Component } from "react";
import "./createOrderModal.css";
import "./selectLotModal.css";
import { uploadOrderRedux, updateLotRedux } from "../../actions/index";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { getAllOrdersInvoiceRateSingleLot } from "../../firebase/firebase.utils";

class CreateOrderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: "",
      customerUid: "",
      shippingMark: "",
      cartonNo: "",
      productName: "",
      quantity: "",
      grossWeight: "",
      cbm_height: "",
      cbm_width: "",
      cbm_length: "",
      productType: "",
      trackingNo: "",
      showSuggestion: true,
      chineseNote: "",
      cAndFBill: "",
      freightCharge: "",
      otherCharge: "",
      cursor: -1,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    const { singleLot, calculation } = nextProps;
    console.log(singleLot);
    console.log("create Lot modal component will receive props is called");
    if (calculation && singleLot) {
      this.setState({
        cAndFBill: singleLot.cAndFBill ? singleLot.cAndFBill : "",
        freightCharge: singleLot.freightCharge ? singleLot.freightCharge : "",
        otherCharge: singleLot.otherCharge ? singleLot.otherCharge : "",
      });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const {
      cbm_height,
      cbm_width,
      cbm_length,
      customer,
      customerUid,
      shippingMark,
      cartonNo,
      productName,
      quantity,
      grossWeight,
      productType,
      trackingNo,
      chineseNote,
    } = this.state;
    if (customerUid === "") {
      alert("please select a customer first");
      return;
    }

    const dateofWarehouseReceive = new Date().toLocaleDateString();
    const uploadedOrder = await this.props.uploadOrderRedux({
      shipmentMethod: this.props.singleLot.shipmentMethod.includes("D2D")
        ? "D2D"
        : "Freight",
      lotNo: this.props.singleLot.lotNo,
      parcelId: `${this.props.singleLot.lotNo}-${this.state.cartonNo}`,
      customer,
      customerUid,
      shippingMark,
      cartonNo,
      productName,
      quantity,
      grossWeight,
      cbm_height,
      cbm_width,
      cbm_length,
      productType,
      trackingNo,
      chineseNote,
      totalCbm: (cbm_height * cbm_width * cbm_length) / 1000000,
      dateofWarehouseReceive: dateofWarehouseReceive,
      invoiceStatus: "Not Created",
    });
    if (uploadedOrder) {
      toast.success("Successfully added order");
    }
    this.setState({
      cartonNo: "",
      showSuggestion: true,
      cursor: -1,
    });
  };

  handleSubmitForExpense = async (event) => {
    event.preventDefault();
    const { cAndFBill, freightCharge, otherCharge } = this.state;
    const { singleLot } = this.props;
    console.log(singleLot);
    console.log(this.props.singleLot);
    console.log(this.props.singleLot.lotNo);
    console.log(this.props.singleLot.shipmentMethod);
    const totalRevenue = await getAllOrdersInvoiceRateSingleLot(singleLot);
    let totalLoss;
    let totalProfit;
    let expense =
      parseInt(cAndFBill ? cAndFBill : 0) +
      parseInt(freightCharge ? freightCharge : 0) +
      parseInt(otherCharge ? otherCharge : 0);
    let totalExpense = expense;
    if (totalRevenue && parseInt(totalRevenue) > totalExpense) {
      totalProfit = parseInt(totalRevenue) - totalExpense;
    } else {
      totalLoss = totalExpense - (totalRevenue ? parseInt(totalRevenue) : 0);
    }

    this.props.updateLotRedux({
      ...singleLot,
      cAndFBill,
      freightCharge,
      otherCharge,
      expense: expense,
      totalExpense,
      totalRevenue,
      ...(totalProfit ? { totalProfit } : { totalLoss }),
    });
    toast.success(`Expense updated for lot:${this.props.singleLot.lotNo}`);
    this.setState({
      cAndFBill: "",
      freightCharge: "",
      otherCharge: "",
      cursor: -1,
    });
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleChangeCustomer = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, showSuggestion: true, cursor: -1 });
  };

  renderShowSuggestion = () => {
    let suggestionArray = [];
    console.log(this.state.customer);
    if (this.state.customer) {
      console.log(this.state.customer);
      const suggestionById = this.props.allUsers.filter((user) =>
        user.userId.includes(this.state.customer)
      );
      const suggestionByName = this.props.allUsers.filter(
        (user) =>
          user.displayName &&
          user.displayName
            .toLowerCase()
            .includes(this.state.customer.toLowerCase())
      );
      suggestionArray = [...suggestionByName, ...suggestionById];
      const uniqueUser = [...new Set(suggestionArray)];
      console.log(suggestionArray);
      return uniqueUser.slice(0, 10).map((user, index) => (
        <li
          key={user.userId}
          style={{
            minWidth: "195px",
            backgroundColor: this.state.cursor == index ? "gainsboro" : "white",
          }}
          onClick={() =>
            this.setState({
              customer: user.userId,
              customerUid: user.uid,
              showSuggestion: false,
            })
          }
        >
          {user.userId}-{user.displayName ? user.displayName.slice(0, 13) : ""}
        </li>
      ));
    }
  };

  handleKeyDown = (e) => {
    const { cursor } = this.state;
    let result = [];
    if (this.state.customer) {
      const suggestionById = this.props.allUsers.filter((user) =>
        user.userId.includes(this.state.customer)
      );
      const suggestionByName = this.props.allUsers.filter(
        (user) =>
          user.displayName &&
          user.displayName
            .toLowerCase()
            .includes(this.state.customer.toLowerCase())
      );
      result = [...suggestionByName, ...suggestionById].slice(0, 10);

      // arrow up/down button should select next/previous list element
      if (e.keyCode === 38 && cursor > -1) {
        this.setState((prevState) => ({
          cursor: prevState.cursor - 1,
        }));
      } else if (e.keyCode === 40 && cursor < result.length - 1) {
        this.setState((prevState) => ({
          cursor: prevState.cursor + 1,
        }));
      } else if (e.keyCode === 13 && cursor > -1) {
        this.setState({
          customer: result[cursor].userId,
          customerUid: result[cursor].uid,
          showSuggestion: false,
        });
      }
    } else {
      result = [];
    }
  };
  render() {
    return (
      <>
        <div
          className={
            this.props.toggleModalCreateOrder
              ? "modal fade show"
              : "modal fade show visible-modal"
          }
          id="request_popup"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered request_popup"
            role="document"
          >
            <div
              className="modal-content visible-modal-content-3"
              style={{ backgroundColor: "rgb(68 0 97)" }}
            >
              <div className="modal-body p-0">
                <section className="pos-rel bg-light-gray">
                  <div className="container-fluid p-3">
                    <a
                      onClick={() => {
                        this.setState({
                          lotNo: "",
                          customer: "",
                          customerUid: "",
                          shippingMark: "",
                          cartonNo: "",
                          productName: "",
                          quantity: "",
                          grossWeight: "",
                          cbm_height: "",
                          cbm_width: "",
                          cbm_length: "",
                          total_cbm: "",
                          productType: "",
                          trackingNo: "",
                          showSuggestion: true,
                          chineseNote: "",
                          cursor: -1,
                        });
                        this.props.startToggleModalCreateOrder(null);
                      }}
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <i
                        className="icofont-close-line"
                        style={{ color: "white", fontWeight: "bolder" }}
                      ></i>
                    </a>
                    <div className="d-lg-flex justify-content-end no-gutters mb-spacer-md">
                      <div className="col">
                        <div className="px-3 m-5">
                          <h2
                            className="h2-xl mb-3 fw-6 pb-2"
                            style={{
                              color: "white",
                              textTransform: "none",
                              fontSize: "200%",
                              borderBottom: "2px dotted white",
                            }}
                          >
                            <span>
                              <i className="icofont-ship"></i>
                            </span>
                            Lot Number
                            <span style={{ color: "#13c9ca" }}>
                              &nbsp;
                              {this.props.singleLot
                                ? this.props.singleLot.lotNo
                                : ""}
                            </span>
                          </h2>
                          {!this.props.calculation ? (
                            <form
                              onSubmit={this.handleSubmit}
                              className="rounded-field mt-4"
                            >
                              <div className="form-row mb-4">
                                <div className="col">
                                  <label
                                    style={{
                                      color: "white",
                                      marginBottom: "5px",
                                      fontSize: "130%",
                                    }}
                                  >
                                    Tracking No:
                                  </label>
                                  <input
                                    type="text"
                                    name="trackingNo"
                                    className="form-control"
                                    placeholder="Enter tracking No"
                                    style={{ fontSize: "1rem" }}
                                    onChange={this.handleChange}
                                    value={this.state.trackingNo}
                                    required
                                  />
                                </div>
                              </div>

                              <div className="form-row mb-4">
                                <div className="col">
                                  <label
                                    style={{
                                      color: "white",
                                      marginBottom: "5px",
                                      fontSize: "130%",
                                    }}
                                  >
                                    Select Customer:
                                  </label>
                                  <input
                                    title="Please choose a package"
                                    type="text"
                                    name="customer"
                                    className="form-control"
                                    placeholder="Enter customer Id"
                                    aria-required="true"
                                    aria-invalid="false"
                                    onChange={this.handleChangeCustomer}
                                    value={this.state.customer}
                                    required
                                    autoComplete="off"
                                    onKeyDown={this.handleKeyDown}
                                  />
                                  {this.state.customer && (
                                    <ul
                                      className="below-searchbar-recommendation"
                                      style={{
                                        display: this.state.showSuggestion
                                          ? "flex"
                                          : "none",
                                      }}
                                    >
                                      {this.renderShowSuggestion()}
                                    </ul>
                                  )}
                                </div>
                                <div className="col">
                                  <label
                                    style={{
                                      color: "white",
                                      marginBottom: "5px",
                                      fontSize: "130%",
                                    }}
                                  >
                                    Shipping Mark:
                                  </label>
                                  <input
                                    type="text"
                                    name="shippingMark"
                                    className="form-control"
                                    placeholder="Enter Shipping Mark"
                                    style={{ fontSize: "1rem" }}
                                    onChange={this.handleChange}
                                    value={this.state.shippingMark}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="form-row mb-4">
                                <div className="col">
                                  <label
                                    style={{
                                      color: "white",
                                      marginBottom: "5px",
                                      fontSize: "130%",
                                    }}
                                  >
                                    Carton No:
                                  </label>
                                  <input
                                    type="text"
                                    name="cartonNo"
                                    className="form-control"
                                    placeholder="Enter Carton No"
                                    style={{ fontSize: "1rem" }}
                                    onChange={this.handleChange}
                                    value={this.state.cartonNo}
                                    required
                                  />
                                </div>
                                <div className="col">
                                  <label
                                    style={{
                                      color: "white",
                                      marginBottom: "5px",
                                      fontSize: "130%",
                                    }}
                                  >
                                    Product Name:
                                  </label>
                                  <input
                                    type="text"
                                    name="productName"
                                    className="form-control"
                                    placeholder="Enter Product Name"
                                    style={{ fontSize: "1rem" }}
                                    onChange={this.handleChange}
                                    value={this.state.productName}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="form-row mb-4">
                                <div className="col">
                                  <label
                                    style={{
                                      color: "white",
                                      marginBottom: "5px",
                                      fontSize: "130%",
                                    }}
                                  >
                                    Quantity:
                                  </label>
                                  <input
                                    type="text"
                                    name="quantity"
                                    className="form-control"
                                    placeholder="Enter Product Quantity"
                                    style={{ fontSize: "1rem" }}
                                    onChange={this.handleChange}
                                    value={this.state.quantity}
                                    required
                                  />
                                </div>
                                <div className="col">
                                  <label
                                    style={{
                                      color: "white",
                                      marginBottom: "5px",
                                      fontSize: "130%",
                                    }}
                                  >
                                    Gross Weight:
                                  </label>
                                  <input
                                    type="text"
                                    name="grossWeight"
                                    className="form-control"
                                    placeholder="Total Weight"
                                    style={{ fontSize: "1rem" }}
                                    onChange={this.handleChange}
                                    value={this.state.grossWeight}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="form-row">
                                {" "}
                                <label
                                  style={{
                                    color: "white",
                                    marginBottom: "5px",
                                    fontSize: "130%",
                                  }}
                                >
                                  Carton Size:
                                </label>
                              </div>
                              <div
                                className="form-row mb-3"
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-around",
                                  flexWrap: "nowrap",
                                }}
                              >
                                <div>
                                  <input
                                    type="number"
                                    name="cbm_height"
                                    className="form-control"
                                    placeholder="height"
                                    style={{ fontSize: "1rem" }}
                                    onChange={this.handleChange}
                                    value={this.state.cbm_height}
                                    required
                                  />
                                </div>
                                <div
                                  style={{
                                    fontSize: "130%",
                                    marginTop: "5px",
                                    color: "white",
                                  }}
                                >
                                  {" "}
                                  X
                                </div>
                                <div>
                                  <input
                                    type="number"
                                    name="cbm_width"
                                    className="form-control"
                                    placeholder="width"
                                    style={{ fontSize: "1rem" }}
                                    onChange={this.handleChange}
                                    value={this.state.cbm_width}
                                    required
                                  />
                                </div>
                                <div
                                  style={{
                                    fontSize: "130%",
                                    marginTop: "5px",
                                    color: "white",
                                  }}
                                >
                                  {" "}
                                  X
                                </div>
                                <div>
                                  <input
                                    type="number"
                                    name="cbm_length"
                                    className="form-control"
                                    placeholder="length"
                                    style={{ fontSize: "1rem" }}
                                    onChange={this.handleChange}
                                    value={this.state.cbm_length}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="form-row mb-3">
                                <div className="col">
                                  <label
                                    style={{
                                      color: "white",
                                      marginBottom: "5px",
                                      fontSize: "130%",
                                    }}
                                  >
                                    Total CBM:
                                  </label>
                                  <input
                                    type="number"
                                    name="total_cbm"
                                    className="form-control"
                                    placeholder="Total CBM"
                                    value={
                                      (this.state.cbm_height *
                                        this.state.cbm_width *
                                        this.state.cbm_length) /
                                      1000000
                                    }
                                    readOnly
                                  />
                                </div>
                              </div>

                              <div className="form-row mb-3">
                                <div className="col">
                                  <label
                                    style={{
                                      color: "white",
                                      marginBottom: "5px",
                                      fontSize: "130%",
                                    }}
                                  >
                                    Product Type:
                                  </label>
                                  <select
                                    title="Please choose a package"
                                    required
                                    name="productType"
                                    className="custom-select"
                                    aria-required="true"
                                    aria-invalid="false"
                                    onChange={this.handleChange}
                                    value={this.state.productType}
                                    required
                                  >
                                    <option value="">
                                      Select Product Type
                                    </option>
                                    <option value="Liquid">Liquid</option>
                                    <option value="Battery">Battery</option>
                                    <option value="Powder">Powder</option>
                                    <option value="Copy">Copy</option>
                                    <option value="None">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="form-row mb-3">
                                <div className="col">
                                  <label
                                    style={{
                                      color: "white",
                                      marginBottom: "5px",
                                      fontSize: "130%",
                                    }}
                                  >
                                    Note:
                                  </label>
                                  <textarea
                                    type="text"
                                    name="chineseNote"
                                    className="form-control"
                                    placeholder="Add additional Note"
                                    value={this.state.chineseNote}
                                    onChange={this.handleChange}
                                  />
                                </div>
                              </div>

                              <div className="form-row">
                                <div
                                  className="col pt-3"
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                  }}
                                >
                                  <button
                                    type="submit"
                                    className="btn btn-secondary"
                                  >
                                    Add
                                    <i className="icofont-rounded-right"></i>
                                  </button>
                                </div>
                              </div>
                            </form>
                          ) : (
                            <form
                              onSubmit={this.handleSubmitForExpense}
                              className="rounded-field mt-4"
                            >
                              <div className="form-row mb-4">
                                <div className="col">
                                  <label
                                    style={{
                                      color: "white",
                                      marginBottom: "5px",
                                    }}
                                  >
                                    C&F Bill
                                  </label>
                                  <input
                                    type="number"
                                    name="cAndFBill"
                                    className="form-control"
                                    placeholder="C&F Bill"
                                    style={{ fontSize: "1rem" }}
                                    onChange={this.handleChange}
                                    value={this.state.cAndFBill}
                                  />
                                </div>
                              </div>
                              <div className="form-row mb-4">
                                <div className="col">
                                  <label
                                    style={{
                                      color: "white",
                                      marginBottom: "5px",
                                    }}
                                  >
                                    Freight Charge
                                  </label>
                                  <input
                                    type="number"
                                    name="freightCharge"
                                    className="form-control"
                                    placeholder="Freight Charge"
                                    style={{ fontSize: "1rem" }}
                                    onChange={this.handleChange}
                                    value={this.state.freightCharge}
                                  />
                                </div>
                              </div>
                              <div className="form-row mb-4">
                                <div className="col">
                                  <label
                                    style={{
                                      color: "white",
                                      marginBottom: "5px",
                                    }}
                                  >
                                    Other Charge
                                  </label>
                                  <input
                                    type="number"
                                    name="otherCharge"
                                    className="form-control"
                                    placeholder="Other Charge"
                                    style={{ fontSize: "1rem" }}
                                    onChange={this.handleChange}
                                    value={this.state.otherCharge}
                                  />
                                </div>
                              </div>
                              <div className="form-row">
                                <div
                                  className="col pt-3"
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                  }}
                                >
                                  <button
                                    type="submit"
                                    className="btn btn-secondary"
                                  >
                                    Update Expense
                                    <i className="icofont-rounded-right"></i>
                                  </button>
                                </div>
                              </div>
                            </form>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allUsers: state.users.users,
  };
};
export default connect(mapStateToProps, {
  uploadOrderRedux,
  updateLotRedux,
})(CreateOrderModal);
