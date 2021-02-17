import React, { Component, Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Datatable from "./documentDatatable";
import { getAllLots, getSingleLot } from "../../../firebase/firebase.utils";
import { getAllDocumentExpressRatesRedux } from "../../../actions/index";
import { Link } from "react-router-dom";
import CreateDocumentModal from "./createDocumentModal";
import { connect } from "react-redux";

export class Document extends Component {
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
    this.props.getAllDocumentExpressRatesRedux();
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

    console.log(this.props);
    return (
      <Fragment>
        <CreateDocumentModal
          toggleModal={this.state.toggleModal}
          startToggleModal={this.startToggleModal}
          singleLot={this.state.singleLot}
        />
        <Breadcrumb title="document" parent="express-rates" />
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
                    Document Rates
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
                      myData={this.props.allExpressDocumentsRates}
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
    allExpressDocumentsRates: state.expressRatesDocuments.expressRatesDocuments,
  };
};

export default connect(mapStateToProps, { getAllDocumentExpressRatesRedux })(
  Document
);
