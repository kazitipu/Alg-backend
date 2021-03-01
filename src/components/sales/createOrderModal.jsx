import React, { Component } from "react";
import "./createOrderModal.css";
import { uploadOrderRedux } from "../../actions/index";
import { connect } from "react-redux";
import { toast } from "react-toastify";

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
    };
  }

  componentWillReceiveProps = (nextProps) => {
    const { singleLot } = nextProps;
    console.log(singleLot);
    console.log("create Lot modal component will receive props is called");
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log(this.props.singleLot.lotNo);

    const { cbm_height, cbm_width, cbm_length } = this.state;
    const uploadedOrder = await this.props.uploadOrderRedux({
      shipmentMethod: this.props.singleLot.shipmentMethod.includes("D2D")
        ? "D2D"
        : "Freight",
      lotNo: this.props.singleLot.lotNo,
      ...this.state,
      totalCbm: (cbm_height * cbm_width * cbm_length) / 1000000,
    });
    if (uploadedOrder) {
      toast.success("Successfully added order");
    }
    this.setState({
      cartonNo: "",
      showSuggestion: true,
    });
    // this.props.startToggleModalCreateOrder(null);
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
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
              className="modal-content visible-modal-content"
              style={{ backgroundColor: "#ff8084" }}
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
                          <form
                            onSubmit={this.handleSubmit}
                            className="rounded-field mt-4"
                          >
                            <div className="form-row mb-4">
                              <div className="col">
                                <label
                                  style={{
                                    color: "white",
                                    marginBottom: "0px",
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
                                  onChange={this.handleChange}
                                  value={this.state.customer}
                                  required
                                  autoComplete="off"
                                />

                                <ul
                                  className="below-searchbar-recommendation"
                                  style={{
                                    display: this.state.showSuggestion
                                      ? "flex"
                                      : "none",
                                  }}
                                >
                                  {this.state.customer
                                    ? this.props.allUsers
                                        .filter((user) =>
                                          user.userId.includes(
                                            this.state.customer
                                          )
                                        )
                                        .slice(0, 5)
                                        .map((user) => (
                                          <li
                                            key={user.userId}
                                            onClick={() =>
                                              this.setState({
                                                customer: user.userId,
                                                shippingMark: `${user.userId}-${user.displayName}`,
                                                customerUid: user.uid,
                                                showSuggestion: false,
                                              })
                                            }
                                          >
                                            {user.userId} &nbsp;{" "}
                                            {user.displayName
                                              ? user.displayName.slice(0, 13)
                                              : ""}
                                          </li>
                                        ))
                                    : null}
                                </ul>
                              </div>
                              <div className="col">
                                <label
                                  style={{
                                    color: "white",
                                    marginBottom: "0px",
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
                                    marginBottom: "0px",
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
                                    marginBottom: "0px",
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
                                    marginBottom: "0px",
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
                                    marginBottom: "0px",
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
                                  marginBottom: "0px",
                                  fontSize: "130%",
                                }}
                              >
                                CBM centimeter:
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
                              <label
                                style={{
                                  color: "white",
                                  marginBottom: "0px",
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

                            <div className="form-row mb-3">
                              <div className="col">
                                <label
                                  style={{
                                    color: "white",
                                    marginBottom: "0px",
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
                                  <option value="">Select Product Type</option>
                                  <option value="Bags">Bags</option>
                                  <option value="Shoes">Shoes</option>
                                  <option value="Toys">Toys</option>
                                  <option value="Mixed">Mixed</option>
                                  <option value="Others">Others</option>
                                </select>
                              </div>
                              <div>
                                <label
                                  style={{
                                    color: "white",
                                    marginBottom: "0px",
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
export default connect(mapStateToProps, { uploadOrderRedux })(CreateOrderModal);
