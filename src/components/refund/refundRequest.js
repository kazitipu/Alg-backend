import React, { Component, Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Datatable from "./refundRequestDatatable";
import ChangeStatusModal from "./changeStatusModal";
import { getAllRefundRequestRedux } from "../../actions/index";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Search } from "react-feather";

export class RefundRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFor: "",
      open: false,
      refundsArray: [],
      toggleModal: true,
      singleLot: null,
      refundIdArray: [],
      parcelArray: [],
    };
  }

  componentDidMount = async () => {
    await this.props.getAllRefundRequestRedux("Pending");
    const { allRefunds } = this.props;
    if (allRefunds.length > 0) {
      this.setState({ refundsArray: allRefunds });
    }
  };

  componentWillReceiveProps = (nextProps) => {
    const { allRefunds } = nextProps;
    if (
      allRefunds.length > 0 &&
      allRefunds.length !== this.props.allRefunds.length
    ) {
      this.setState({ refundsArray: allRefunds });
    }
  };

  startToggleModal = async (refundIdArray, parcelArray) => {
    if (refundIdArray && refundIdArray.length > 0) {
      this.setState({
        toggleModal: !this.state.toggleModal,
        refundIdArray: refundIdArray,
        parcelArray,
      });
    } else {
      this.setState({
        toggleModal: !this.state.toggleModal,
      });
    }
  };

  handleSearchBarChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { open, searchFor, refundsArray } = this.state;

    console.log(this.props);
    return (
      <Fragment>
        <ChangeStatusModal
          toggleModal={this.state.toggleModal}
          startToggleModal={this.startToggleModal}
          refundIdArray={this.state.refundIdArray}
          parcelArray={this.state.parcelArray}
        />
        <Breadcrumb title="Refund Request" parent="Refund" />
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
                    Refund Requests
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
                            placeholder="Search Refund Request"
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
                      startToggleModal={this.startToggleModal}
                      history={this.props.history}
                      multiSelectOption={false}
                      myData={
                        !searchFor
                          ? refundsArray
                          : refundsArray.filter((parcel) =>
                              parcel.parcelId
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
  RefundRequest
);
