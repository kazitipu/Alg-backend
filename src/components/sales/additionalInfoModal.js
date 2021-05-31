import React, { Component } from "react";
import "./createOrderModal.css";
import { updateOrderRedux } from "../../actions/index";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import man from "./assets/plus image.jpeg";
import { uploadImageQcCheck } from "../../firebase/firebase.utils";
class CreateOrderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: man,
      file: "",
    };
  }

  componentWillReceiveProps = (nextProps) => {
    const { parcelObj } = nextProps;
    if (parcelObj && parcelObj.editApproved) {
      this.setState({
        imageUrl: parcelObj.imageUrl ? parcelObj.imageUrl : man,
      });
    }
  };

  _handleImgChange = async (e, i) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    const { imageUrl } = this.state;

    reader.onloadend = () => {
      this.setState({
        file: file,
        imageUrl,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
      const imgUrl = await uploadImageQcCheck(file);
      console.log(imgUrl);

      this.setState({
        imageUrl: imgUrl,
      });
      console.log(imageUrl);
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { parcelObj } = this.props;

    const updatedOrder = await this.props.updateOrderRedux({
      ...parcelObj,
      imageUrl: this.state.imageUrl,
    });
    if (updatedOrder) {
      toast.success(
        `Successfully approved Additionl information for Parcel ${parcelObj.parcelId}`
      );
    }

    this.setState({
      imageUrl: man,
      file: "",
    });

    window.document.getElementById();
  };

  render() {
    const { parcelObj } = this.props;
    return (
      <>
        {parcelObj ? (
          <>
            <div
              className={
                this.props.toggleModalAdditionalInfo
                  ? "modal fade show"
                  : "modal fade show visible-modal"
              }
              id="request_popup"
              tabIndex="-1"
              role="dialog"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered request_popup"
                role="document"
              >
                <div
                  className="modal-content visible-modal-content-3"
                  style={{ backgroundColor: "rgb(68 0 97)" }}
                >
                  <div className="modal-body p-0">
                    <section className="pos-rel bg-light-gray">
                      <div className="container-fluid p-3">
                        <a
                          onClick={() => {
                            this.props.startToggleModalAdditionalInfo(null);
                          }}
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <i
                            className="icofont-close-line"
                            style={{ color: "white", fontWeight: "bolder" }}
                          ></i>
                        </a>
                        <div className="d-lg-flex justify-content-end no-gutters mb-spacer-md">
                          <div className="col">
                            <div className="px-3 m-5">
                              <h2
                                className="h2-xl mb-3 fw-6 pb-2"
                                style={{
                                  color: "white",
                                  textTransform: "none",
                                  fontSize: "200%",
                                  borderBottom: "2px dotted white",
                                }}
                              >
                                <span>
                                  <i className="icofont-ship"></i>
                                </span>
                                Parcel Id:
                                <span style={{ color: "#13c9ca" }}>
                                  &nbsp;
                                  {parcelObj ? parcelObj.parcelId : ""}
                                </span>
                              </h2>
                              <form
                                onSubmit={this.handleSubmit}
                                className="rounded-field mt-4"
                              >
                                <div className="form-row mb-4">
                                  <label
                                    style={{
                                      color: "white",
                                      marginBottom: "0px",
                                      fontSize: "130%",
                                    }}
                                  >
                                    Products value:
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      parcelObj.productsValue
                                        ? parcelObj.productsValue
                                        : ""
                                    }
                                    required
                                    readOnly
                                  />
                                </div>
                                <div className="form-row mb-4">
                                  <div className="col">
                                    <label
                                      style={{
                                        color: "white",
                                        marginBottom: "0px",
                                        fontSize: "130%",
                                      }}
                                    >
                                      Packaging Needed:
                                    </label>
                                    <input
                                      className="form-control"
                                      aria-required="true"
                                      aria-invalid="false"
                                      value={
                                        parcelObj.packaging
                                          ? parcelObj.packaging
                                          : ""
                                      }
                                      readOnly
                                    />
                                  </div>
                                  <div className="col">
                                    <label
                                      style={{
                                        color: "white",
                                        marginBottom: "0px",
                                        fontSize: "130%",
                                      }}
                                    >
                                      Packaging Cost:
                                    </label>
                                    <input
                                      className="form-control"
                                      value={
                                        parcelObj.packagingCost
                                          ? parcelObj.packagingCost
                                          : ""
                                      }
                                      readOnly
                                    />
                                  </div>
                                </div>
                                <div className="form-row mb-4">
                                  <div className="col">
                                    <label
                                      style={{
                                        color: "white",
                                        marginBottom: "0px",
                                        fontSize: "130%",
                                      }}
                                    >
                                      Packaging Chosed:
                                    </label>
                                    <input
                                      className="form-control"
                                      value={
                                        parcelObj.packagingChosed
                                          ? parcelObj.packagingChosed
                                          : "No Packaging"
                                      }
                                      readOnly
                                      required
                                    />
                                  </div>
                                  <div className="col">
                                    <label
                                      style={{
                                        color: "white",
                                        marginBottom: "0px",
                                        fontSize: "130%",
                                      }}
                                    >
                                      Insurance:
                                    </label>
                                    <input
                                      className="form-control"
                                      value={
                                        parcelObj.insurance
                                          ? parcelObj.insurance
                                          : "No"
                                      }
                                      required
                                      readOnly
                                    />
                                  </div>
                                </div>
                                <div className="form-row mb-4">
                                  <label
                                    style={{
                                      color: "white",
                                      marginBottom: "0px",
                                      fontSize: "130%",
                                    }}
                                  >
                                    Delivery Address:
                                  </label>
                                  <textarea
                                    type="text"
                                    className="form-control"
                                    value={
                                      parcelObj.deliveryAddress
                                        ? parcelObj.deliveryAddress
                                        : "Alg office"
                                    }
                                    required
                                    readOnly
                                  />
                                </div>
                                <div className="form-row mb-4">
                                  <label
                                    style={{
                                      color: "white",
                                      marginBottom: "0px",
                                      fontSize: "130%",
                                    }}
                                  >
                                    Any Problem:
                                  </label>
                                  <textarea
                                    type="text"
                                    className="form-control"
                                    value={
                                      parcelObj.problem
                                        ? parcelObj.problem
                                        : "No"
                                    }
                                    readOnly
                                    required
                                  />
                                </div>
                                <div className="form-row mb-4">
                                  <label
                                    style={{
                                      color: "white",
                                      marginBottom: "0px",
                                      fontSize: "130%",
                                    }}
                                  >
                                    QC check:
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      parcelObj.qcCheck ? parcelObj.qcCheck : ""
                                    }
                                    required
                                    readOnly
                                  />
                                </div>
                                {parcelObj.qcCheck &&
                                parcelObj.qcCheck == "true" ? (
                                  <>
                                    <label
                                      style={{
                                        color: "white",
                                        marginBottom: "0px",
                                        fontSize: "130%",
                                      }}
                                    >
                                      Products Image:
                                    </label>
                                    <div className="form-row mb-4">
                                      <div
                                        className="box-input-file"
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <img
                                          className="img-100 lazyloaded blur-up"
                                          src={this.state.imageUrl}
                                          alt="#"
                                          style={{
                                            zIndex: 10,
                                            cursor: "pointer",
                                          }}
                                          onClick={() => {
                                            document
                                              .getElementById(
                                                "upload-image-input"
                                              )
                                              .click();
                                          }}
                                        />

                                        <input
                                          id="upload-image-input"
                                          className="upload"
                                          type="file"
                                          style={{
                                            position: "absolute",
                                            zIndex: 5,
                                            maxWidth: "50px",
                                            marginTop: "20px",
                                          }}
                                          onChange={(e) =>
                                            this._handleImgChange(e, 0)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </>
                                ) : null}

                                <div className="form-row">
                                  <div
                                    className="col pt-3"
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-end",
                                    }}
                                  >
                                    {!parcelObj.editApproved ? (
                                      <button
                                        type="submit"
                                        className="btn btn-secondary"
                                      >
                                        Approve
                                        <i className="icofont-rounded-right"></i>
                                      </button>
                                    ) : null}
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     allUsers: state.users.users,
//   };
// };
export default connect(null, { updateOrderRedux })(CreateOrderModal);
