import React, { Component, Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import Datatable from "./paymentsDatatable";
import { connect } from "react-redux";
import { getAllPaymentDayRedux } from "../../actions/index";
import { Search } from "react-feather";
export class Payments extends Component {
  state = { searchFor: "", searchbar: "" };
  componentDidMount = async () => {
    await this.props.getAllPaymentDayRedux();
  };

  handleSearchBarChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Fragment>
        <Breadcrumb title="Payments Days" parent="Payments" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div
                  className="card-header"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <h5>
                    <i
                      className="icofont-send-mail"
                      style={{
                        fontSize: "180%",
                        marginRight: "5px",
                        marginTop: "5px",
                        color: "#ff8084",
                      }}
                    ></i>
                    Payment History
                  </h5>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <li
                      style={{
                        border: "1px solid gainsboro",
                        borderRadius: "5rem",
                        padding: "0px 20px",
                        background: "whitesmoke",
                        marginRight: "20px",
                      }}
                    >
                      <form
                        className="form-inline search-form"
                        onSubmit={this.handleSubmit}
                      >
                        <div
                          // className="form-group"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                          }}
                        >
                          <input
                            className={
                              "form-control-plaintext " +
                              (this.state.searchbar ? "open" : "")
                            }
                            name="searchFor"
                            value={this.state.searchFor}
                            type="search"
                            placeholder="Search Day"
                            onChange={this.handleSearchBarChange}
                          />
                          <span
                          // className="d-sm-none mobile-search"
                          >
                            <Search
                              style={{
                                marginTop: "5px",
                                borderLeft: "1px solid gainsboro",
                                paddingLeft: "7px",
                                color: "gray",
                              }}
                            />
                          </span>
                        </div>
                      </form>
                    </li>
                  </div>
                </div>
                <div className="card-body">
                  <div
                    id="batchDelete"
                    className="category-table order-table coupon-list-delete"
                  >
                    <Datatable
                      multiSelectOption={false}
                      myData={
                        !this.state.searchFor
                          ? this.props.allPaymentDays
                          : this.props.allPaymentDays.filter((day) =>
                              day.date.includes(this.state.searchFor)
                            )
                      }
                      pageSize={10}
                      pagination={true}
                      class="-striped -highlight"
                      {...this.props}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    allPaymentDays: state.payments.paymentDaysArray,
  };
};
export default connect(mapStateToProps, { getAllPaymentDayRedux })(Payments);
