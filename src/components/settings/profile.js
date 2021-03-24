import React, { Component, Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import Tabset_profile from "./tabset-profile";
import { connect } from "react-redux";
import man from "../../assets/images/dashboard/user2.jpg";
import UpdateProfileModal from "./updateProfileModal";
import { uploadImageRedux } from "../../actions/index";

export class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [man],
      file: "",
      toggleModal: true,
      currentAdmin: null,
    };
  }

  _handleImgChange = async (e, i) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    const { pictures } = this.state;

    reader.onloadend = () => {
      pictures[i] = reader.result;
      this.setState({
        file: file,
        pictures,
        currentAdmin: null,
      });
    };
    if (file) {
      const { currentAdmin } = this.props;
      reader.readAsDataURL(file);
      const imgUrl = await this.props.uploadImageRedux(currentAdmin, file);
      console.log(imgUrl);
      pictures[i] = imgUrl;
      this.setState({
        pictures,
      });
      console.log(pictures);
    }
  };
  startToggleModal = async (currentAdmin) => {
    if (currentAdmin == null) {
      this.setState({
        toggleModal: !this.state.toggleModal,
        currentAdmin: null,
      });
    } else {
      this.setState({
        toggleModal: !this.state.toggleModal,
        currentAdmin: currentAdmin,
      });
    }
  };

  render() {
    const { currentAdmin } = this.props;
    console.log(currentAdmin);
    return (
      <Fragment>
        <UpdateProfileModal
          toggleModal={this.state.toggleModal}
          startToggleModal={this.startToggleModal}
          currentAdmin={this.state.currentAdmin}
        />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <div
                    className="box-input-file"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    {currentAdmin && currentAdmin.imageUrl ? (
                      <img
                        className="img-60 rounded-circle lazyloaded blur-up"
                        src={currentAdmin.imageUrl}
                        alt="#"
                        style={{ zIndex: 10, cursor: "pointer" }}
                        onClick={() => {
                          document.getElementById("upload-image-input").click();
                        }}
                      />
                    ) : (
                      <img
                        className="img-60 rounded-circle lazyloaded blur-up"
                        src={this.state.pictures[0]}
                        alt="#"
                        style={{ zIndex: 10, cursor: "pointer" }}
                        onClick={() => {
                          document.getElementById("upload-image-input").click();
                        }}
                      />
                    )}
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
                      onChange={(e) => this._handleImgChange(e, 0)}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "200%",
                      marginTop: "10px",
                      textTransform: "capitalize",
                    }}
                  >
                    {currentAdmin && currentAdmin.displayName}
                  </div>
                </div>
                <div className="card-body">
                  <Tabset_profile
                    currentAdmin={currentAdmin}
                    startToggleModal={this.startToggleModal}
                  />
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
    currntAdmin: state.admins.currentAdmin,
  };
};

export default connect(mapStateToProps, { uploadImageRedux })(MyProfile);
