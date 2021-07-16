import React, { Component, Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Datatable from "./rechargeWalletDatatable";
import { Link } from "react-router-dom";
import RechargeWalletModal from "./rechargeWalletModal";
import { connect } from "react-redux";
import { Search } from "react-feather";

export class RechargeWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFor: "",
      open: false,
      toggleModal: true,
      userObj: null,
    };
  }

  componentDidMount = async () => {};

  startToggleModal = async (userObj) => {
    if (userObj == null) {
      this.setState({ toggleModal: !this.state.toggleModal, userObj: null });
    } else {
      this.setState({
        toggleModal: !this.state.toggleModal,
        userObj: userObj,
      });
    }
  };

  handleSearchBarChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { open } = this.state;

    console.log(this.props);
    return (
      <Fragment>
        <RechargeWalletModal
          toggleModal={this.state.toggleModal}
          startToggleModal={this.startToggleModal}
          userObj={this.state.userObj}
        />
        <Breadcrumb title="Recharge wallet" parent="Recharge" />
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
                      className="icofont-send-mail"
                      style={{
                        fontSize: "180%",
                        marginRight: "5px",
                        marginTop: "5px",
                        color: "#ff8084",
                      }}
                    ></i>
                    Recharge Wallet
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
                            placeholder="Search user"
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
                      myData={
                        !this.state.searchFor
                          ? this.props.allUser
                          : this.props.allUser.filter(
                              (user) =>
                                (user.displayName &&
                                  user.displayName
                                    .toLowerCase()
                                    .includes(
                                      this.state.searchFor.toLowerCase()
                                    )) ||
                                user.userId.includes(this.state.searchFor)
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
    allUser: state.users.users,
  };
};

export default connect(mapStateToProps)(RechargeWallet);
