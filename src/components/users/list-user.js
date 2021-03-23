import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/listUser";
import Datatable from "./usersDatatable";
import { getAllUsers } from "../../firebase/firebase.utils";
import { Search } from "react-feather";
import ChangeUserStatusModal from "./changeUserStatusModal";
import { connect } from "react-redux";
import { getAllUsersRedux } from "../../actions/index";

export class List_user extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
      toggleModal: true,
      userObj: null,
    };
  }

  componentDidMount = async () => {
    await this.props.getAllUsersRedux();
    this.setState({ allUsers: this.props.allUsers });
  };
  componentWillReceiveProps = (nextProps) => {
    this.setState({ allUsers: nextProps.allUsers });
  };

  startToggleModal = async (userObj) => {
    if (userObj == null) {
      this.setState({ toggleModal: !this.state.toggleModal, userObj: null });
    } else {
      this.setState({
        toggleModal: !this.state.toggleModal,
        userObj,
      });
    }
  };

  render() {
    const { allUsers } = this.state;
    return (
      <Fragment>
        <ChangeUserStatusModal
          toggleModal={this.state.toggleModal}
          startToggleModal={this.startToggleModal}
          userObj={this.state.userObj}
        />
        <Breadcrumb title="User List" parent="User" />
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
                      className="icofont-user"
                      style={{
                        fontSize: "180%",
                        marginRight: "5px",
                        marginTop: "5px",
                        color: "#ff8084",
                      }}
                    ></i>
                    User List
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
                      myData={allUsers}
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

        {/* <!-- Container-fluid Ends--> */}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allUsers: state.users.users,
  };
};
export default connect(mapStateToProps, { getAllUsersRedux })(List_user);
