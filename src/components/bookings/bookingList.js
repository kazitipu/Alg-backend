import React, { Component, Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Datatable from "./bookingListDatatable";
import ChangeStatusModal from "./changeStatusModal";
import { getAllBookingsRedux } from "../../actions/index";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Search } from "react-feather";

export class BookingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      bookingsArray: [],
      toggleModal: true,
      singleLot: null,
      bookingIdArray: [],
      searchFor: "",
    };
  }

  componentDidMount = async () => {
    await this.props.getAllBookingsRedux();
    if (this.props.allBookings.length > 0) {
      if (this.props.match.params.bookingStatus === "Pending") {
        const bookingsArray = this.props.allBookings.filter(
          (booking) => booking.bookingStatus === "Pending"
        );
        this.setState({ bookingsArray });
      }
      if (this.props.match.params.bookingStatus === "Success") {
        const bookingsArray = this.props.allBookings.filter(
          (booking) => booking.bookingStatus === "Success"
        );
        this.setState({ bookingsArray });
      }
    }
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.allBookings.length > 0) {
      if (nextProps.match.params.bookingStatus === "Pending") {
        const bookingsArray = nextProps.allBookings.filter(
          (booking) => booking.bookingStatus === "Pending"
        );
        this.setState({ bookingsArray });
      }
      if (nextProps.match.params.bookingStatus === "Success") {
        const bookingsArray = nextProps.allBookings.filter(
          (booking) => booking.bookingStatus === "Success"
        );
        this.setState({ bookingsArray });
      }
    }
  };

  startToggleModal = async (bookingIdArray) => {
    if (bookingIdArray && bookingIdArray.length > 0) {
      this.setState({
        toggleModal: !this.state.toggleModal,
        bookingIdArray: bookingIdArray,
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
    const { open } = this.state;

    console.log(this.props);
    return (
      <Fragment>
        <ChangeStatusModal
          toggleModal={this.state.toggleModal}
          startToggleModal={this.startToggleModal}
          bookingIdArray={this.state.bookingIdArray}
        />
        <Breadcrumb title="Booking Request" parent="Booking" />
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
                    {this.props.match.params.bookingStatus === "Pending"
                      ? "Pending Booking Request"
                      : "Approved Booking Request"}
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
                            placeholder="Search Booking"
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
                        !this.state.searchFor
                          ? this.state.bookingsArray
                          : this.state.bookingsArray.filter((bookingObj) =>
                              bookingObj.bookingId
                                .toString()
                                .includes(this.state.searchFor)
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
    allBookings: state.bookings.bookings,
  };
};

export default connect(mapStateToProps, { getAllBookingsRedux })(BookingList);
