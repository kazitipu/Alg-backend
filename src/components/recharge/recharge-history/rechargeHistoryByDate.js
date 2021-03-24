import React, { Component, Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb";
import Datatable from "./rechargeHistoryByDateDatatable";
import { getAllRechargesOfSingleDateRedux } from "../../../actions/index";

import { connect } from "react-redux";
import { Search } from "react-feather";
import { ExportCSV } from "./exportCsv";
import { withRouter } from "react-router-dom";

export class RechargeHistoryByDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFor: "",
      allRecharges: [],
      toggleModalSelectLot: true,
      toggleModalCreateOrder: true,
      toggleModalAdditionalInfo: true,
      singleLot: null,
      parcelObj: null,
    };
  }

  componentDidMount = async () => {
    const { date } = this.props.match.params;
    await this.props.getAllRechargesOfSingleDateRedux(date);
    this.setState({ allRecharges: this.props.recharges });
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({ allRecharges: nextProps.recharges });
  };

  startToggleModalCreateOrder = async (lotObj) => {
    if (lotObj == null) {
      this.setState({
        toggleModalCreateOrder: !this.state.toggleModalCreateOrder,
        singleLot: null,
      });
    } else {
      console.log(lotObj);
      this.setState({
        toggleModalCreateOrder: !this.state.toggleModalCreateOrder,
        singleLot: lotObj,
      });
    }
  };
  startToggleModalAdditionalInfo = async (parcelObj) => {
    if (parcelObj) {
      this.setState({
        toggleModalAdditionalInfo: !this.state.toggleModalAdditionalInfo,
        parcelObj,
      });
    } else {
      this.setState({
        toggleModalAdditionalInfo: !this.state.toggleModalAdditionalInfo,
        parcelObj: null,
      });
    }
  };

  startToggleModalSelectLot = async (fixedLot) => {
    this.setState(
      {
        toggleModalSelectLot: !this.state.toggleModalSelectLot,
        fixedLot,
      },
      console.log(fixedLot)
    );
  };

  handleSearchBarChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  getMydata = () => {
    const { searchFor, allRecharges } = this.state;
    if (!searchFor) {
      return allRecharges;
    }
    const filterByUserNameAndId = allRecharges.filter(
      (recharge) =>
        recharge.Name.toLowerCase().includes(searchFor.toLowerCase()) ||
        recharge.Id.includes(searchFor.toLowerCase())
    );
    const filterByReceitNoAndPaymentMethod = allRecharges.filter(
      (recharge) =>
        recharge.paymentMethod
          .toLowerCase()
          .includes(searchFor.toLowerCase()) ||
        recharge.receitNo.toLowerCase().includes(searchFor.toLowerCase())
    );
    return [...filterByReceitNoAndPaymentMethod, ...filterByUserNameAndId];
  };

  render() {
    const { allRecharges } = this.state;
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
                        className="icofont-dollar"
                        style={{ color: "black" }}
                      ></i>
                      All Recharges: {date}
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
                            onChange={this.handleSearchBarChange}
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
                {allRecharges.length > 0 ? (
                  <ExportCSV
                    csvData={allRecharges}
                    fileName={`Recharges-${date}`}
                  />
                ) : null}

                <div className="card-body order-datatable">
                  <Datatable
                    startToggleModalAdditionalInfo={
                      this.startToggleModalAdditionalInfo
                    }
                    multiSelectOption={false}
                    myData={this.getMydata()}
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
    recharges: state.recharge.rechargeHistoryArray,
  };
};

export default withRouter(
  connect(mapStateToProps, { getAllRechargesOfSingleDateRedux })(
    RechargeHistoryByDate
  )
);
