import React, { Component, Fragment } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { User, Unlock } from "react-feather";
import { withRouter } from "react-router-dom";
import {
  auth,
  createAdminProfileDocument,
  firestore,
} from "../../firebase/firebase.utils";
import "./login.css";

export class LoginTabset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeShow: true,
      startDate: new Date(),
      loginEmail: "",
      loginPassword: "",
      registerEmail: "",
      registerPassword: "",
      registerConfirmPassword: "",
      registerStatus: "",
      registerMobileNo: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  clickActive = (event) => {
    document.querySelector(".nav-link").classList.remove("show");
    event.target.classList.add("show");
  };
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleLoginSubmit = async (event) => {
    event.preventDefault();

    const { loginEmail, loginPassword } = this.state;

    try {
      await auth.signInWithEmailAndPassword(loginEmail, loginPassword);
      this.setState({ loginEmail: "", loginPassword: "" });
      auth.onAuthStateChanged(async (userAuth) => {
        if (userAuth) {
          const adminRef = firestore.doc(`admins/${userAuth.uid}`);
          const snapShot = await adminRef.get();
          if (snapShot.exists) {
            this.props.setCurrentAdmin({ id: snapShot.id, ...snapShot.data() });
            this.props.history.push(`${process.env.PUBLIC_URL}/dashboard`);
          } else {
            alert("you are not an admin");
          }
        } else {
          alert("your email is not authenticated");
        }
      });
    } catch (error) {
      alert(error);
    }
  };

  handleRegisterSubmit = async (event) => {
    event.preventDefault();
    const {
      registerEmail,
      registerPassword,
      registerConfirmPassword,
      registerStatus,
      registerDisplayName,
      registerMobileNo,
    } = this.state;
    if (registerPassword !== registerConfirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        registerEmail,
        registerPassword
      );

      await createAdminProfileDocument(user, {
        name: registerDisplayName,
        status: registerStatus,
        mobileNo: registerMobileNo,
        adminId: user.uid,
      });

      this.setState({
        registerDisplayName: "",
        registerEmail: "",
        registerPassword: "",
        registerConfirmPassword: "",
        registerMobileNo: "",
      });
      console.log(this.props.currentAdmin);
      this.props.history.push("/dashboard");
    } catch (error) {
      alert(error);
    }
  };

  render() {
    console.log(this.props.currentAdmin);
    return (
      <div>
        <Fragment>
          <Tabs>
            <TabList className="nav nav-tabs tab-coupon">
              <Tab className="nav-link" onClick={(e) => this.clickActive(e)}>
                <User />
                Login
              </Tab>
              {this.props.currentAdmin && (
                <Tab className="nav-link" onClick={(e) => this.clickActive(e)}>
                  <Unlock />
                  Register
                </Tab>
              )}
            </TabList>

            <TabPanel>
              <form
                className="form-horizontal auth-form"
                onSubmit={this.handleLoginSubmit}
              >
                <div className="form-group">
                  <input
                    required=""
                    name="loginEmail"
                    value={this.state.loginEmail}
                    onChange={this.handleChange}
                    type="email"
                    className="form-control"
                    placeholder="Username"
                    id="exampleInputEmail1"
                  />
                </div>
                <div className="form-group">
                  <input
                    required=""
                    name="loginPassword"
                    value={this.state.loginPassword}
                    onChange={this.handleChange}
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <div className="form-terms">
                  <div className="custom-control custom-checkbox mr-sm-2">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customControlAutosizing"
                    />
                    <label className="d-block">
                      <input
                        className="checkbox_animated"
                        id="chk-ani2"
                        type="checkbox"
                      />
                      Reminder Me{" "}
                      <span className="pull-right">
                        {" "}
                        <a href="#" className="btn btn-default forgot-pass p-0">
                          lost your password
                        </a>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="form-button">
                  <button className="btn btn-primary" type="submit">
                    Login
                  </button>
                </div>
              </form>
            </TabPanel>
            {this.props.currentAdmin && (
              <TabPanel>
                <form
                  className="form-horizontal auth-form"
                  onSubmit={this.handleRegisterSubmit}
                >
                  <div className="form-group">
                    <input
                      required
                      name="registerDisplayName"
                      value={this.state.registerDisplayName}
                      onChange={this.handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      required
                      name="registerMobileNo"
                      value={this.state.registerMobileNo}
                      onChange={this.handleChange}
                      type="number"
                      className="form-control"
                      placeholder="Mobile No"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      required
                      name="registerEmail"
                      value={this.state.registerEmail}
                      onChange={this.handleChange}
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      id="exampleInputEmail12"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      required
                      name="registerPassword"
                      value={this.state.registerPassword}
                      onChange={this.handleChange}
                      type="password"
                      className="form-control"
                      placeholder="Password"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      required
                      name="registerConfirmPassword"
                      value={this.state.registerConfirmPassword}
                      onChange={this.handleChange}
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                    />
                  </div>
                  <div className="form-group">
                    <select
                      className="custom-select"
                      name="registerStatus"
                      value={this.state.registerStatus}
                      onChange={this.handleChange}
                      required
                      style={{
                        borderRadius: "10rem",
                        paddingLeft: "25px",
                        color: "gray",
                      }}
                    >
                      <option value="">Select admin status</option>
                      <option value="Admin">Admin</option>
                      <option value="Accounts">Accounts</option>
                      <option value="Employee">Employee</option>
                      <option value="Officer">Officer</option>
                    </select>
                  </div>
                  <div className="form-terms">
                    <div className="custom-control custom-checkbox mr-sm-2">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customControlAutosizing"
                      />
                      <label className="d-block">
                        <input
                          className="checkbox_animated"
                          id="chk-ani2"
                          type="checkbox"
                        />
                        I agree all statements in
                        <span>
                          <a href="">Terms &amp; Conditions</a>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="form-button">
                    <button className="btn btn-primary" type="submit">
                      Register
                    </button>
                  </div>
                </form>
              </TabPanel>
            )}
          </Tabs>
        </Fragment>
      </div>
    );
  }
}

export default withRouter(LoginTabset);
