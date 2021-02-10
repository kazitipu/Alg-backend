import React, { Component, Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb";
import Modal from "react-responsive-modal";
import "react-toastify/dist/ReactToastify.css";
import data from "../../../assets/data/category";
import Datatable from "../../common/datatable";
import {
  getAllProducts,
  getAllAliProducts,
} from "../../../firebase/firebase.utils";
import { Link } from "react-router-dom";
import CreateLotModal from "./createLotModal";

export class LotList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      allProducts: [],
      toggleModal: true,
    };
  }
  // onOpenModal = () => {
  //     this.setState({ open: true });
  // };

  // onCloseModal = () => {
  //     this.setState({ open: false });
  // };
  componentDidMount = async () => {
    const allProducts = await getAllProducts();
    const allAliProducts = await getAllAliProducts();

    this.setState({ allProducts: [...allProducts, ...allAliProducts] });
  };

  startToggleModal = () => {
    this.setState({ toggleModal: !this.state.toggleModal });
  };

  render() {
    const { open, allProducts } = this.state;
    console.log(allProducts);
    console.log(this.props);
    return (
      <Fragment>
        <CreateLotModal
          toggleModal={this.state.toggleModal}
          startToggleModal={this.startToggleModal}
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
                    onClick={() =>
                      this.setState({ toggleModal: !this.state.toggleModal })
                    }
                  >
                    Create Lot
                  </button>
                </div>
                <div className="card-body">
                  <div className="clearfix"></div>
                  <div id="basicScenario" className="product-physical">
                    <Datatable
                      history={this.props.history}
                      multiSelectOption={false}
                      myData={allProducts}
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
