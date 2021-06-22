import React, { Component } from "react";
import Sidebar from "./common/sidebar_components/sidebar";
import Right_sidebar from "./common/right-sidebar";
import Footer from "./common/footer";
import Header from "./common/header_components/header";
import { auth } from "../firebase/firebase.utils";
import { connect } from "react-redux";
import {
  getAllAdminsRedux,
  getAllBookingsRedux,
  getAllRechargeRequestRedux,
  getAllRefundRequestRedux,
  setCurrentAdmin,
  getAllUsersRedux,
  getAllLotsRedux,
  getAllPaymentDayRedux,
} from "../actions";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ltr: true,
      divName: "RTL",
      loading: true,
    };
  }

  componentDidMount = async () => {
    await this.props.getAllRechargeRequestRedux();
    await this.props.getAllRefundRequestRedux("Pending");
    await this.props.getAllAdminsRedux();
    await this.props.getAllUsersRedux();
    await this.props.getAllLotsRedux();
    await this.props.getAllBookingsRedux("Pending");
    await this.props.getAllPaymentDayRedux();
    auth.onAuthStateChanged((adminAuth) => {
      if (adminAuth) {
        console.log(adminAuth);
        if (this.props.currentAdmin) {
          return;
        } else {
          var admin = this.props.admins.find(
            (admin) => admin.adminId == adminAuth.uid
          );
          this.props.setCurrentAdmin(admin);
        }
      }
    });
    this.setState({
      loading: false,
    });
  };
  ChangeRtl(divName) {
    if (divName === "RTL") {
      document.body.classList.add("rtl");
      this.setState({ divName: "LTR" });
    } else {
      document.body.classList.remove("rtl");
      this.setState({ divName: "RTL" });
    }
  }
  render() {
    return (
      <div>
        <div className="page-wrapper">
          <Header />
          <div className="page-body-wrapper">
            <Sidebar />
            <Right_sidebar />
            <div className="page-body">
              {this.state.loading && (
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    zIndex: "999",
                    backgroundColor: "white",
                    position: "absolute",
                  }}
                >
                  <div
                    className="text-center align-items-center"
                    style={{ marginTop: "300px" }}
                  >
                    <div
                      className="spinner-grow "
                      role="status"
                      style={{
                        width: "4rem",
                        height: "4rem",
                        zIndex: "1000",
                        color: "#ff8084",
                      }}
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                </div>
              )}

              {this.props.children}
            </div>
            <Footer />
          </div>
        </div>
        <div
          className="btn-light custom-theme"
          onClick={() => this.ChangeRtl(this.state.divName)}
        >
          {this.state.divName}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    admins: state.admins.admins,
    currentAdmin: state.admins.currentAdmin,
    allBookingRequest: [],
    allRefundRequest: [],
    allRechargeRequest: [],
  };
};
export default connect(mapStateToProps, {
  getAllAdminsRedux,
  getAllBookingsRedux,
  getAllRechargeRequestRedux,
  getAllRefundRequestRedux,
  setCurrentAdmin,
  getAllUsersRedux,
  getAllLotsRedux,
  getAllPaymentDayRedux,
})(App);
