import React, { Component, Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb";
import "react-toastify/dist/ReactToastify.css";
import Datatable from "../../common/datatable";
import { getAllLots, getSingleLot } from "../../../firebase/firebase.utils";
import { Link } from "react-router-dom";
import CreateLotModal from "./createLotModal";

export class LotList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      allLots: [],
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
    const allLots = await getAllLots();

    this.setState({ allLots });
  };

  startToggleModal = async (lot) => {
    if (lot == null) {
      this.setState({ toggleModal: !this.state.toggleModal, singleLot: null });
    } else {
      const singleLot = await getSingleLot(lot);
      console.log(singleLot);
      this.setState({
        toggleModal: !this.state.toggleModal,
        singleLot: singleLot,
      });
    }
  };

  render() {
    const { open, allLots } = this.state;
    console.log(allLots);
    console.log(this.props);
    return (
      <Fragment>
        <CreateLotModal
          toggleModal={this.state.toggleModal}
          startToggleModal={this.startToggleModal}
          singleLot={this.state.singleLot}
        />
        <Breadcrumb title="Lot List" parent="Lot" />
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
                  <h5>Lot List</h5>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => this.startToggleModal(null)}
                  >
                    Create Lot
                  </button>
                </div>
                <div className="card-body">
                  <div className="clearfix"></div>
                  <div id="basicScenario" className="product-physical">
                    <Datatable
                      startToggleModal={this.startToggleModal}
                      history={this.props.history}
                      multiSelectOption={false}
                      myData={allLots}
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

export default LotList;
