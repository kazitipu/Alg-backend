import React, { Component, Fragment } from "react";
import LoginTabset from "./loginTabset";
import { ArrowLeft, Sliders } from "react-feather";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import stats from "../../assets/images/dashboard/14.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./login.css";

export class Login extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      arrows: false,
    };
    return (
      <Fragment>
        <div className="page-wrapper">
          <div className="authentication-box">
            <div className="container">
              <div className="row">
                <div className="col-md-5 p-0 card-left">
                  <div
                    className="card bg-primary card-background-color"
                    style={{
                      backgroundColor: "#a989e8",
                      boxShadow: "1px 5px 24px 0 #a989e8",
                    }}
                  >
                    <div className="svg-icon">
                      <img src={stats} className="Img-fluid" />
                    </div>
                    <Slider className="single-item" {...settings}>
                      <div>
                        <div>
                          <h3>Welcome to Alg Cargos and logistics ltd</h3>
                          <p>
                            Best door to door,freight and express solution for
                            every consumers around the world.
                          </p>
                        </div>
                      </div>
                      <div>
                        <div>
                          <h3>Why use Alg Cargos and logistics ltd?</h3>
                          <p>
                            We just don't receive your product and deliver it to
                            you. We check product quality,condition.packaging.
                            Our agents check your suppliers physical location
                            and check if everythings ok.
                          </p>
                        </div>
                      </div>
                      <div>
                        <div>
                          <h3>from Alg cargos team</h3>
                          <p>
                            For better experience in shipping and 24/7 support,
                            stay with us.
                          </p>
                        </div>
                      </div>
                    </Slider>
                  </div>
                </div>
                <div className="col-md-7 p-0 card-right">
                  <div className="card tab2-card">
                    <div className="card-body">
                      <LoginTabset
                        setCurrentAdmin={this.props.setCurrentAdmin}
                        currentAdmin={this.props.currentAdmin}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Login;
