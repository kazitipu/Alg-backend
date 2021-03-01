import React, { Component, Fragment } from "react";
import Breadcrumb from "../../components/common/breadcrumb";
import data from "../../assets/data/invoice";
import Datatable from "../../components/invoice/invoiceDatatable";
import { getAllLotsRedux } from "../../actions/index";
import { connect } from "react-redux";
import { Search } from "react-feather";
export class Invoice extends Component {
  state = {};
  componentDidMount = async () => {
    this.props.getAllLotsRedux();
  };

  render() {
    return (
      <Fragment>
        <Breadcrumb title="Invoice" parent="Invoice" />
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
                  <h5>Invoice List</h5>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
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
                            placeholder="Search Lot"
                            onChange={this.handleChange}
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
                  <div id="basicScenario" className="product-list">
                    <Datatable
                      multiSelectOption={false}
                      myData={this.props.allLots}
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
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allLots: state.lots.lots,
  };
};
export default connect(mapStateToProps, { getAllLotsRedux })(Invoice);
