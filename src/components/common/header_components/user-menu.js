import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { auth } from "../../../firebase/firebase.utils";
import { connect } from "react-redux";
//images import
import man from "../../../assets/images/dashboard/user2.jpg";
export class User_menu extends Component {
  render() {
    const { currentAdmin } = this.props;
    return (
      <Fragment>
        <li className="onhover-dropdown">
          <div className="media align-items-center">
            {currentAdmin && currentAdmin.imageUrl ? (
              <img
                className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded"
                style={{
                  maxWidth: "50px",
                  maxHeight: "50px",
                }}
                src={currentAdmin.imageUrl}
                alt="header-user"
              />
            ) : (
              <img
                className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded"
                src={man}
                alt="header-user"
              />
            )}
            <div className="dotted-animation">
              <span className="animate-circle"></span>
              <span className="main-circle"></span>
            </div>
          </div>
          <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
            <li>
              <Link to={`${process.env.PUBLIC_URL}/settings/profile`}>
                <i data-feather="user"></i>Profile
              </Link>
            </li>

            <li
              style={{ cursor: "pointer" }}
              onClick={() => {
                auth.signOut();
                this.props.history.push("/");
              }}
            >
              <i data-feather="log-out"></i>Logout
            </li>
          </ul>
        </li>
      </Fragment>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    currentAdmin: state.admins.currentAdmin,
  };
};
export default withRouter(connect(mapStateToProps, null)(User_menu));
