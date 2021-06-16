import React, { Component, Fragment } from "react";
import { Users } from "react-feather";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { updateRechargeRequestStatusRedux } from "../../../actions/index";

export class Datatable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedValues: [],
      myData: this.props.myData,
    };
  }

  selectRow = (e, i) => {
    if (!e.target.checked) {
      this.setState({
        checkedValues: this.state.checkedValues.filter((item, j) => i !== item),
      });
    } else {
      this.state.checkedValues.push(i);
      this.setState({
        checkedValues: this.state.checkedValues,
      });
    }
  };

  handleRemoveRow = () => {
    const selectedValues = this.state.checkedValues;
    const updatedData = this.state.myData.filter(function (el) {
      return selectedValues.indexOf(el.id) < 0;
    });
    this.setState({
      myData: updatedData,
    });
    toast.success("Successfully Deleted !");
  };

  renderEditable = (cellInfo) => {
    const { myData } = this.props;
    if (myData.length > 0) {
      const newData = [];
      myData.forEach((rechargeRequest) => {
        //  this is not affecting my output see line 104
        const userObj = this.props.allUser.find(
          (user) => user.uid === rechargeRequest.userId
        );
        newData.push({
          "Recharge Id": rechargeRequest ? rechargeRequest.rechargeId : "",
          "SL No": userObj ? userObj.userId : "",
          Name: userObj ? userObj.displayName : "",
          Method: rechargeRequest ? rechargeRequest.method : "",
          Amount: rechargeRequest ? rechargeRequest.amount : "",
          image: (
            <a
              target="_blank"
              href={rechargeRequest ? rechargeRequest.imageUrl : ""}
            >
              <img
                style={{ width: "150px", height: "100px" }}
                src={rechargeRequest ? rechargeRequest.imageUrl : ""}
              ></img>
            </a>
          ),
        });
      });
      return (
        <div
          style={{ backgroundColor: "#fafafa" }}
          onBlur={(e) => {
            const data = [...newData];
            data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
            this.setState({ myData: data });
          }}
          dangerouslySetInnerHTML={{
            __html: newData[cellInfo.index][cellInfo.column.id],
          }}
        />
      );
    } else {
      return null;
    }
  };

  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  getStatus = (productQuantity) => {
    if (productQuantity < 10) {
      return <i className="fa fa-circle font-danger f-12" />;
    } else if (productQuantity > 50) {
      return <i className="fa fa-circle font-success f-12" />;
    } else {
      return <i className="fa fa-circle font-warning f-12" />;
    }
  };

  render() {
    const { pageSize, myClass, multiSelectOption, pagination } = this.props;
    console.log(this.props);
    const { myData } = this.props;
    console.log(myData);
    const newData = [];
    if (myData.length > 0) {
      myData.forEach((rechargeRequest) => {
        console.log(this.props.allUser);
        console.log(rechargeRequest.userId);
        const userObj = this.props.allUser.find(
          (user) => user.uid === rechargeRequest.userId
        );
        console.log(userObj);
        newData.push({
          "Recharge Id": rechargeRequest ? rechargeRequest.rechargeId : "",
          "SL No": userObj ? userObj.userId : "",
          Name: userObj ? userObj.displayName : "",
          Method: rechargeRequest ? rechargeRequest.method : "",
          Amount: rechargeRequest ? rechargeRequest.amount : "",
          image: (
            <a
              target="_blank"
              href={rechargeRequest ? rechargeRequest.imageUrl : ""}
            >
              <img
                style={{ width: "150px", height: "100px" }}
                src={rechargeRequest ? rechargeRequest.imageUrl : ""}
              ></img>
            </a>
          ),
        });
      });
    }
    const columns = [];
    for (var key in newData[0]) {
      let editable = this.renderEditable;
      if (key == "image") {
        editable = null;
      }
      if (key == "status") {
        editable = null;
      }
      if (key === "avtar") {
        editable = null;
      }
      if (key === "vendor") {
        editable = null;
      }
      if (key === "order_status") {
        editable = null;
      }

      columns.push({
        Header: <b>{this.Capitalize(key.toString())}</b>,
        accessor: key,
        Cell: editable,
        style: {
          textAlign: "center",
        },
      });
    }

    if (multiSelectOption == true) {
      columns.push({
        Header: (
          <button
            className="btn btn-danger btn-sm btn-delete mb-0 b-r-4"
            onClick={(e) => {
              if (window.confirm("Are you sure you wish to delete this item?"))
                this.handleRemoveRow();
            }}
          >
            Delete
          </button>
        ),
        id: "delete",
        accessor: (str) => "delete",
        sortable: false,
        style: {
          textAlign: "center",
        },
        Cell: (row) => (
          <div>
            <span>
              <input
                type="checkbox"
                name={row.original.id}
                defaultChecked={this.state.checkedValues.includes(
                  row.original.id
                )}
                onChange={(e) => this.selectRow(e, row.original.id)}
              />
            </span>
          </div>
        ),
        accessor: key,
        style: {
          textAlign: "center",
        },
      });
    } else {
      columns.push(
        {
          Header: <b>status</b>,
          id: "delete",
          accessor: (str) => "delete",
          Cell: (row) => {
            if (myData.length > 0) {
              const rechargeRequest = myData.find(
                (rechargeRequest) =>
                  rechargeRequest.rechargeId === row.original["Recharge Id"]
              );
              if (rechargeRequest.status === "pending") {
                return (
                  <div style={{ color: "orange" }}>
                    <i className="icofont-spinner-alt-3"></i>&nbsp;
                    {rechargeRequest.status}
                  </div>
                );
              }
              if (rechargeRequest.status === "recharged") {
                return (
                  <div style={{ color: "green" }}>
                    <i className="icofont-like"></i>&nbsp;
                    {rechargeRequest.status}
                  </div>
                );
              }
              if (rechargeRequest.status === "rejected") {
                return (
                  <div style={{ color: "red" }}>
                    <i className="icofont-close-squared"></i>&nbsp;
                    {rechargeRequest.status}
                  </div>
                );
              }
            }
          },
          style: {
            textAlign: "center",
          },
          sortable: false,
        },
        {
          Header: <b>Action</b>,
          id: "delete",
          accessor: (str) => "delete",
          Cell: (row) => {
            const rechargeRequest =
              myData.length > 0
                ? myData.find(
                    (rechargeRequest) =>
                      rechargeRequest.rechargeId === row.original["Recharge Id"]
                  )
                : null;
            return (
              <div>
                {rechargeRequest && rechargeRequest.status === "pending" ? (
                  <>
                    <span style={{ cursor: "pointer", padding: "5px" }}>
                      <button
                        // className="btn"
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          fontSize: "70%",
                          maxWidth: "80px",
                          padding: "10px",
                          border: "none",
                        }}
                        type="button"
                        onClick={() => {
                          if (myData.length > 0) {
                            this.props.startToggleModal(rechargeRequest);
                          }
                        }}
                      >
                        {" "}
                        <i className="icofont-checked"></i>&nbsp; Recharge
                      </button>
                    </span>

                    <span style={{ cursor: "pointer" }}>
                      <button
                        // className="btn"
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          fontSize: "70%",
                          maxWidth: "80px",
                          padding: "10px",
                          border: "none",
                        }}
                        type="button"
                        onClick={() => {
                          if (myData.length > 0) {
                            const rechargeRequest = myData.find(
                              (rechargeRequest) =>
                                rechargeRequest.rechargeId ===
                                row.original["Recharge Id"]
                            );
                            this.props.updateRechargeRequestStatusRedux({
                              ...rechargeRequest,
                              status: "rejected",
                            });
                          }
                        }}
                      >
                        {" "}
                        <i className="icofont-close-squared"></i>&nbsp; Reject
                      </button>
                    </span>
                  </>
                ) : null}
              </div>
            );
          },
          style: {
            textAlign: "center",
          },
          sortable: false,
        }
      );
    }

    return (
      <Fragment>
        <ReactTable
          data={newData}
          columns={columns}
          defaultPageSize={pageSize}
          className={myClass}
          showPagination={pagination}
        />
        <ToastContainer />
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    allUser: state.users.users,
  };
};
export default connect(mapStateToProps, { updateRechargeRequestStatusRedux })(
  Datatable
);
