import React, { Component, Fragment } from "react";

import Breadcrumb from "../../common/breadcrumb";
import TextOrMailModal from "../textOrmailModal";
import Datatable from "./customerListDatatable";
import { getAllUsers } from "../../../firebase/firebase.utils";
import { Search } from "react-feather";
export class CommunicationByCustomers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFor: "",
      allUsers: [],
      toggleModal: true,
      singleLot: null,
    };
  }

  componentDidMount = async () => {
    const allUsers = await getAllUsers();
    this.setState({ allUsers });
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

  render() {
    const { allUsers, searchFor } = this.state;
    return (
      <Fragment>
        <TextOrMailModal
          toggleModal={this.state.toggleModal}
          startToggleModal={this.startToggleModal}
          singleLot={this.state.singleLot}
        />
        <Breadcrumb title="User List" parent="Users" />
        <div className="container-fluid">
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
                Text or Mail
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
                        placeholder="Search customer"
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
                <li>
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "#67000a",
                      color: "white",
                    }}
                    type="button"
                    onClick={() =>
                      this.startToggleModal({
                        action: "text",
                        from: "customers",
                        allCustomers: true,
                      })
                    }
                  >
                    Text
                  </button>
                </li>
                <li>
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "rgb(22 67 140)",
                      color: "white",
                      marginLeft: "5px",
                    }}
                    type="button"
                    onClick={() =>
                      this.startToggleModal({
                        action: "mail",
                        from: "customers",
                        allCustomers: true,
                      })
                    }
                  >
                    Mail
                  </button>
                </li>
              </div>
            </div>
            <div className="card-body">
              <div className="clearfix"></div>
              <div
                id="batchDelete"
                className="category-table user-list order-table coupon-list-delete"
              >
                <Datatable
                  startToggleModal={this.startToggleModal}
                  history={this.props.history}
                  multiSelectOption={false}
                  myData={
                    !searchFor
                      ? allUsers
                      : allUsers.filter(
                          (user) =>
                            user.userId.includes(searchFor) ||
                            user.displayName
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
      </Fragment>
    );
  }
}

export default CommunicationByCustomers;
