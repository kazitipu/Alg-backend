import React from "react";
import OnlyStickerToPrint from "./onlyStickerToPrint";
import ReactToPrint from "react-to-print";

class PrintableSticker extends React.PureComponent {
  render() {
    return (
      <div>
        <OnlyStickerToPrint cartonNo={this.props.cartonNo} />
      </div>
    );
  }
}

class PrintSticker extends React.PureComponent {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            return (
              <button
                className="btn"
                style={{ backgroundColor: "#8a0368", color: "white" }}
                href="#"
              >
                <i className="icofont-printer"></i>&nbsp;Print
              </button>
            );
          }}
          content={() => this.componentRef}
        />
        <div style={{ display: "none" }}>
          <PrintableSticker
            cartonNo={this.props.cartonNo}
            ref={(el) => (this.componentRef = el)}
          />
        </div>
      </div>
    );
  }
}

export default PrintSticker;
