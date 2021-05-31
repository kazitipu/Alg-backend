import React, { Component, Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Datatable from "./d2dRatesDatatable";
import { getAllD2DRatesRedux } from "../../actions/index";
import { Link } from "react-router-dom";
import D2DRatesModal from "./d2dRatesModal";
import { connect } from "react-redux";

export class D2DRates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      toggleModal: true,
      singleLot: null,
    };
  }
  // onOpenModal = () => {
  //     this.setState({ open: true });
  // };

  // onCloseModal = () => {
  //     this.setState({ open: false });
  // };
  componentDidMount = async () => {
    const [freightType, country] = this.props.match.params.country.split("-");
    this.props.getAllD2DRatesRedux(freightType, country);
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.match.params.country !== this.props.match.params.country) {
      const [freightType, country] = nextProps.match.params.country.split("-");
      this.props.getAllD2DRatesRedux(freightType, country);
    }
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

  render() {
    const { open } = this.state;
    const [freightType, country] = this.props.match.params.country.split("-");

    console.log(this.props);
    return (
      <Fragment>
        <D2DRatesModal
          toggleModal={this.state.toggleModal}
          startToggleModal={this.startToggleModal}
          singleLot={this.state.singleLot}
          {...this.props}
        />
        <Breadcrumb
          title={
            this.props.match.params.country.includes("air") ? "air" : "sea"
          }
          parent="d2d-rates"
        />
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
                    <i
                      className="icofont-money"
                      style={{
                        fontSize: "130%",
                        marginRight: "5px",
                        color: "#ff8084",
                      }}
                    ></i>
                    D2D Rates{" "}
                    <span
                      style={{
                        color: "#ff8084",
                        fontWeight: "bold",
                        fontSize: "130%",
                      }}
                    >
                      {" "}
                      {country}
                    </span>
                  </h5>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => this.startToggleModal(null)}
                  >
                    Create Rate
                  </button>
                </div>
                <div className="card-body">
                  <div className="clearfix"></div>
                  <div id="basicScenario" className="product-physical">
                    <Datatable
                      startToggleModal={this.startToggleModal}
                      history={this.props.history}
                      multiSelectOption={false}
                      myData={this.props.allD2DRates}
                      pageSize={10}
                      pagination={true}
                      class="-striped -highlight"
                      {...this.props}
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
    allD2DRates: state.d2dRates.d2dRates,
  };
};

export default connect(mapStateToProps, { getAllD2DRatesRedux })(D2DRates);
