import React from "react";
import OnlyInvoieToPrint from "./onlyInvoiceToPrint";
import ReactToPrint from "react-to-print";

class PrintableInvoice extends React.PureComponent {
  render() {
    return (
      <div>
        <OnlyInvoieToPrint />
      </div>
    );
  }
}

class Print extends React.PureComponent {
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
        <PrintableInvoice ref={(el) => (this.componentRef = el)} />
      </div>
    );
  }
}

export default Print;
