import React, { Component, Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Datatable from "./rechargeRequestDatatable";
import { getAllRechargeRequestRedux } from "../../../actions/index";
import { Link } from "react-router-dom";
import TextOrMailModal from "../textOrmailModal";
import { connect } from "react-redux";
import { Search } from "react-feather";

export class RechargeRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFor: "",
      open: false,

      toggleModal: true,
      singleLot: null,
    };
  }

  componentDidMount = async () => {
    this.props.getAllRechargeRequestRedux();
  };

  startToggleModal = async (lotObj) => {
    if (lotObj == null) {
      this.setState({ toggleModal: !this.state.toggleModal, singleLot: null });
    } else {
      console.log(lotObj);
      this.setState({
        toggleModal: !this.state.toggleModal,
        singleLot: lotObj,
      });
    }
  };

  handleSearchBarChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  getRechargeRequestArray = () => {
    if (!this.state.searchFor) {
      return this.props.allRechargeRequests;
    }

    let filterByStatus = this.props.allRechargeRequests.filter(
      (rechargeRequest) =>
        rechargeRequest.status.toLowerCase().includes(this.state.searchFor)
    );
    let filterByMethod = this.props.allRechargeRequests.filter(
      (rechargeRequest) =>
        rechargeRequest.method.toLowerCase().includes(this.state.searchFor)
    );
    return [...filterByStatus, ...filterByMethod];
  };

  render() {
    const { open } = this.state;

    console.log(this.props);
    return (
      <Fragment>
        <TextOrMailModal
          toggleModal={this.state.toggleModal}
          startToggleModal={this.startToggleModal}
          singleLot={this.state.singleLot}
        />
        <Breadcrumb title="Recharge Request" parent="Recharge" />
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
                      className="fas fa-money-check-alt"
                      style={{
                        fontSize: "180%",
                        marginRight: "5px",
                        marginTop: "5px",
                        color: "#ff8084",
                      }}
                    ></i>
                    Recharge Request
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
                            placeholder="Search recharge Request"
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
                    <li></li>
                  </div>
                </div>
                <div className="card-body">
                  <div className="clearfix"></div>
                  <div id="basicScenario" className="product-physical">
                    <Datatable
                      startToggleModal={this.startToggleModal}
                      history={this.props.history}
                      multiSelectOption={false}
                      myData={this.getRechargeRequestArray()}
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
    allRechargeRequests: state.recharge.rechargeRequestArray,
    allUser: state.users.users,
  };
};

export default connect(mapStateToProps, {
  getAllRechargeRequestRedux,
})(RechargeRequest);
