import React, { Component, Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import Tabset_user from "./tabset-user";
import { connect } from "react-redux";
import man from "../../assets/images/dashboard/user2.jpg";
import {
  getAllBookingsOfSingleUserRedux,
  getAllParcelsOfSingleUserRedux,
  getAllRechargeRequestsOfSingleUserRedux,
} from "../../actions";
export class DetailUser extends Component {
  componentDidMount = () => {
    const {
      user,
      getAllBookingsOfSingleUserRedux,
      getAllParcelsOfSingleUserRedux,
      getAllRechargeRequestsOfSingleUserRedux,
    } = this.props;
    if (user) {
      getAllBookingsOfSingleUserRedux(user.uid);
      getAllParcelsOfSingleUserRedux(user.uid);
      getAllRechargeRequestsOfSingleUserRedux(user.uid);
    }
  };
  componentWillReceiveProps = (nextProps) => {
    const {
      user,
      getAllBookingsOfSingleUserRedux,
      getAllParcelsOfSingleUserRedux,
      getAllRechargeRequestsOfSingleUserRedux,
    } = nextProps;
    if (user) {
      getAllBookingsOfSingleUserRedux(user.uid);
      getAllParcelsOfSingleUserRedux(user.uid);
      getAllRechargeRequestsOfSingleUserRedux(user.uid);
    }
  };
  render() {
    const { user, rechargesArray, parcelsArray, bookingsArray } = this.props;
    console.log(user);
    return (
      <Fragment>
        {/* <Breadcrumb title={user && user.displayName} parent="Users" /> */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {user && user.imageUrl ? (
                      <img
                        className="img-60 rounded-circle lazyloaded blur-up"
                        src={user.imageUrl}
                        alt="#"
                      />
                    ) : (
                      <img
                        className="img-60 rounded-circle lazyloaded blur-up"
                        src={man}
                        alt="#"
                      />
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "200%",
                      marginTop: "10px",
                      textTransform: "capitalize",
                    }}
                  >
                    {user && user.displayName}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10px",
                      color: "#ff8084",
                    }}
                  >
                    Wallet balance: {user && user.myWallet} Tk
                  </div>
                </div>
                <div className="card-body">
                  <Tabset_user
                    user={user}
                    rechargesArray={rechargesArray}
                    bookingsArray={bookingsArray}
                    parcelsArray={parcelsArray}
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

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps.match.params.userId);
  return {
    user: state.users.users.find(
      (user) => user.uid === ownProps.match.params.userId
    ),
    parcelsArray: state.users.parcelsArray,
    bookingsArray: state.users.bookingsArray,
    rechargesArray: state.users.rechargesArray,
  };
};

export default connect(mapStateToProps, {
  getAllBookingsOfSingleUserRedux,
  getAllParcelsOfSingleUserRedux,
  getAllRechargeRequestsOfSingleUserRedux,
})(DetailUser);
