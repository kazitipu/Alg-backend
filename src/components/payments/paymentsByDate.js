import React, { Component, Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import Datatable from "./paymentsByDateDatatable";
import { getAllPaymentsOfSingleDateRedux } from "../../actions/index";
import { connect } from "react-redux";
import { Search } from "react-feather";
import { ExportCSV } from "./exportCsv";
import { withRouter } from "react-router-dom";

export class PaymentsByDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPayments: [],
    };
  }

  componentDidMount = async () => {
    const { date } = this.props.match.params;
    await this.props.getAllPaymentsOfSingleDateRedux(date);
    this.setState({ allPayments: this.props.payments });
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({ allPayments: nextProps.payments });
  };

  render() {
    const { allPayments } = this.state;
    const { date } = this.props.match.params;
    return (
      <Fragment>
        <Breadcrumb title="Recharge-history" parent="Recharge" />

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
                    <span
                      style={{
                        color: "#5ec3db",
                        fontSize: "150%",
                        fontWeight: "bold",
                        textTransform: "none",
                      }}
                    >
                      <i
                        className="icofont-ship"
                        style={{ color: "black" }}
                      ></i>
                      All Payments: {date}
                    </span>
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
                            placeholder="Search Recharge"
                            onChange={this.handleChange}
                          />
                          <span
                            // className="d-sm-none mobile-search"
                            onClick={() => this.handleSearchClick()}
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
                {allPayments.length > 0 ? (
                  <ExportCSV
                    csvData={allPayments}
                    fileName={`Payments-${date}`}
                  />
                ) : null}

                <div className="card-body order-datatable">
                  <Datatable
                    startToggleModalAdditionalInfo={
                      this.startToggleModalAdditionalInfo
                    }
                    multiSelectOption={false}
                    myData={allPayments}
                    pageSize={10}
                    pagination={true}
                    class="-striped -highlight"
                  />
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
    payments: state.payments.paymentHistoryArray,
  };
};

export default withRouter(
  connect(mapStateToProps, { getAllPaymentsOfSingleDateRedux })(PaymentsByDate)
);
