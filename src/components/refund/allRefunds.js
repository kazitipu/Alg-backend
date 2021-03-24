import React, { Component, Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Datatable from "./allRefundsDatatable";
import { getAllRefundRequestRedux } from "../../actions/index";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Search } from "react-feather";

export class AllRefunds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFor: "",
      open: false,
      lotsArray: [],
      toggleModal: true,
    };
  }

  componentDidMount = async () => {
    await this.props.getAllRefundRequestRedux();
    const { allRefunds } = this.props;
    if (allRefunds.length > 0) {
      const lotsArray = [
        ...new Set(
          allRefunds
            .filter((refund) => refund.refundStatus !== "Pending")
            .map((refund) => refund.lotNo)
        ),
      ];
      this.setState({ lotsArray });
    }
  };

  componentWillReceiveProps = (nextProps) => {
    const { allRefunds } = nextProps;
    if (allRefunds.length > 0) {
      const lotsArray = [
        ...new Set(
          allRefunds
            .filter((refund) => refund.refundStatus !== "Pending")
            .map((refund) => refund.lotNo)
        ),
      ];
      this.setState({ lotsArray });
    }
  };

  handleSearchBarChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { open, lotsArray, searchFor } = this.state;

    console.log(this.props);
    return (
      <Fragment>
        <Breadcrumb title="All Refunds" parent="Refund" />
        {/* <!-- Container-fluid starts--> */}
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
                    {" "}
                    <i
                      className="icofont-zigzag"
                      style={{
                        fontSize: "180%",
                        marginRight: "5px",
                        marginTop: "5px",
                        color: "#ff8084",
                      }}
                    ></i>
                    All Refunds
                  </h5>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    {" "}
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
                            placeholder="Search Refund"
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
                <div className="card-body">
                  <div className="clearfix"></div>
                  <div id="basicScenario" className="product-physical">
                    <Datatable
                      history={this.props.history}
                      multiSelectOption={false}
                      myData={
                        !searchFor
                          ? lotsArray
                          : lotsArray.filter((lot) =>
                              lot
                                .toLowerCase()
                                .includes(searchFor.toLowerCase())
                            )
                      }
                      pageSize={10}
                      pagination={true}
                      class="-striped -highlight"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
        {/* <!-- Container-fluid Ends--> */}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allRefunds: state.refunds.refunds,
  };
};

export default connect(mapStateToProps, { getAllRefundRequestRedux })(
  AllRefunds
);
